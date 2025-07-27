"use client";
import { useCart } from "../context/CartContext";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CartDrawer() {
    const {
        cartItems,
        updateItemQty,
        removeItem,
        isOpen,
        closeCart,
    } = useCart();
    const drawerRef = useRef(null);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    useEffect(() => {
        function handleClickOutside(e) {
            // if drawer is open, and click is neither inside drawer nor on a .no-close element:
            if (
                isOpen &&
                drawerRef.current &&
                !drawerRef.current.contains(e.target) &&
                !e.target.closest(".no-close")
            ) {
                closeCart();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeCart]);
    // total price
    const total = cartItems.reduce(
        (sum, item) =>
            sum + (item.priceCase / item.qtyCase) * item.quantity,
        0
    ).toFixed(2);

    

    return (



        <div
            ref={drawerRef}
            className={`
                fixed z-50 bg-white shadow-xl transform transition-transform duration-300 flex flex-col
                        
                ${isMobile
                    ? `${isOpen ? "translate-y-0" : "translate-y-full"} bottom-0 w-full h-1/2`
                    : `${isOpen ? "translate-x-0" : "translate-x-full"} top-0 right-0 w-80 h-full`
                }
              `}
        >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button onClick={closeCart}>
                    <X size={20} />
                </button>
            </div>

            {/* Items */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => {
                        const pricePerCup = item.priceCase / item.qtyCase;
                        return (
                            <div key={item.slug} className="flex items-start space-x-3">
                                <img
                                    src={item.image}
                                    alt={`${item.size} cup`}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.size} Cup</h3>
                                    <p className="text-sm mb-1">
                                        ${(pricePerCup).toFixed(3)}/cup
                                    </p>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            min="300"
                                            step="100"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateItemQty(item.slug, Number(e.target.value))
                                            }
                                            className="w-20 p-1 border rounded text-sm"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                            onClick={() => removeItem(item.slug)}
                                            className="text-red-600 text-xs hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <p className="font-semibold">
                                    ${(pricePerCup * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
                <div className="flex justify-between mb-4 font-semibold">
                    <span>Total:</span>
                    <span>${total}</span>
                </div>
                <Link href="/checkout">
                    <button className="w-full bg-[#FFD814] py-2 rounded font-semibold">
                        Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
}
