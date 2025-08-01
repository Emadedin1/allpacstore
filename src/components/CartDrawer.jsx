"use client";
import { useCart } from "../context/CartContext";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";


export default function CartDrawer() {
    const {
        cartItems,
        updateItemQty,
        removeItem,
        isOpen,
        closeCart,
    } = useCart();
    const drawerRef = useRef(null);

    const [isMobile, setIsMobile] = useState(null);

    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth < 640);
        }
    }, []);



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

    if (isMobile === null) return null;

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
                <button onClick={closeCart}
                    className="cursor-pointer">
                    <X size={20} />
                </button>
            </div>
            <Link
                href="/cart"
                onClick={closeCart}
                className="mt-4 bg-black text-white text-center py-3 rounded hover:bg-gray-800 mx-4 mb-4"
            >
                Go to Cart
            </Link>
            {/* Items */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => {
                        const pricePerCup = item.priceCase / item.qtyCase;
                        return (
                            <div key={item.key} className="flex items-start space-x-3">
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

                                    <p className="text-xs text-gray-600">
                                        Design: {item.designType === "Custom"
                                            ? item.designName || "Custom"
                                            : item.designType}
                                    </p>
                                    {item.previewURL && (
                                        <img
                                            src={item.previewURL}
                                            alt="Design Preview"
                                            className="w-12 h-12 object-contain mt-1 border rounded"
                                        />
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            min="500"
                                            step="100"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateItemQty(item.key, Number(e.target.value))
                                            }

                                            className="w-20 p-1 border rounded text-sm"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                            onClick={() => removeItem(item.key)}
                                            className="text-red-600 text-xs hover:underline cursor-pointer"
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
                    <button className="w-full bg-[#FFD814] py-2 rounded font-semibold cursor-pointer">
                        Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
}
