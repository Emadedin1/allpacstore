"use client";
import { useCart } from "../context/CartContext";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function CartDrawer() {
  const { cartItems, updateItemQty, removeItem, isOpen, closeCart } = useCart();

  const drawerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(null);
  const [editingKey, setEditingKey] = useState(null);

  const MIN_QTY = 500;
  const STEP = 100;

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        !e.target.closest(".no-close")
      ) {
        setEditingKey(null);
        closeCart();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeCart]);

  const total = cartItems
    .reduce((sum, item) => {
      const ppc = item.pricePerCup ?? item.priceCase / item.qtyCase;
      return sum + ppc * item.quantity;
    }, 0)
    .toFixed(2);

  if (isMobile === null) return null;

  return (
    <div
      ref={drawerRef}
      className={`fixed z-50 bg-white shadow-xl transform transition-transform duration-300 flex flex-col overflow-x-hidden
        ${
          isMobile
            ? `${isOpen ? "translate-y-0" : "translate-y-full"} bottom-0 w-full h-1/2`
            : `${isOpen ? "translate-x-0" : "translate-x-full"} top-[64px] right-0 w-[400px] h-[calc(100%-64px)]`
        }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button
          onClick={() => {
            setEditingKey(null);
            closeCart();
          }}
          className="cursor-pointer"
          aria-label="Close cart"
        >
          <X size={20} />
        </button>
      </div>

      {/* Items */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => {
            const pricePerCup = item.pricePerCup ?? item.priceCase / item.qtyCase;
            const isEditing = editingKey === item.key;

            return (
              <div key={item.key} className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={`${item.size} cup`}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.size} Cup</h3>
                      <p className="text-sm mb-1">${pricePerCup.toFixed(3)}/cup</p>
                      <p className="text-xs text-gray-600">
                        Design: {item.designType === "Custom" ? item.designName || "Custom" : item.designType}
                      </p>
                      {item.previewURL && (
                        <img
                          src={item.previewURL}
                          alt="Design Preview"
                          className="w-12 h-12 object-contain mt-1 border rounded"
                        />
                      )}
                    </div>

                    <p className="font-semibold whitespace-nowrap">
                      ${(pricePerCup * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity + actions in one row */}
                  <div className="mt-2 flex items-center gap-4">
                    {isEditing ? (
                      <>
                        {/* Compact, centered stepper */}
                        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white shadow-sm h-9">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => {
                              const next = Math.max(MIN_QTY, item.quantity - STEP);
                              if (next !== item.quantity) updateItemQty(item.key, next);
                            }}
                            disabled={item.quantity <= MIN_QTY}
                            className={`w-9 h-9 rounded-l-full text-base font-semibold
                              ${
                                item.quantity <= MIN_QTY
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                              }`}
                          >
                            −
                          </button>

                          <div className="px-3 text-center select-none leading-tight">
                            <div className="text-[10px] text-gray-500">Qty</div>
                            <div className="text-sm font-medium text-gray-900">{item.quantity}</div>
                          </div>

                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateItemQty(item.key, item.quantity + STEP)}
                            className="w-9 h-9 rounded-r-full text-base font-semibold text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        {/* Actions sit to the right of the stepper */}
                        <button
                          type="button"
                          onClick={() => setEditingKey(null)}
                          className="text-xs text-gray-700 hover:text-black underline"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-red-600 text-xs hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <button
                          onClick={() => setEditingKey(item.key)}
                          className="text-blue-600 text-xs underline cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-red-600 text-xs hover:underline cursor-pointer ml-auto"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4">
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
