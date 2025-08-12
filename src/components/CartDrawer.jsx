"use client";
import { useCart } from "../context/CartContext";
import { X, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Default descriptor if none is stored on the item
const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

// Helper: decide whether to show a design label
const resolveDesignLabel = (item) => {
  let candidate =
    item?.designType === "Custom"
      ? (item?.designName && String(item.designName)) || "Custom"
      : item?.designType;

  if (typeof candidate !== "string") return null;

  const d = candidate.trim();
  if (!d) return null;

  const lowered = d.toLowerCase();
  if (["plain white", "plain", "none", "n/a", "default"].includes(lowered)) {
    return null;
  }

  return d;
};

export default function CartDrawer() {
  const {
    cartItems,
    updateItemQty,
    removeItem,
    isOpen,
    closeCart,
    activeEditKey, // kept though unused, harmless
    setActiveEditKey,
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
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        !e.target.closest(".no-close")
      ) {
        setActiveEditKey(null);
        closeCart();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeCart, setActiveEditKey]);

  // Cart total uses normalized case multiples
  const total = cartItems
    .reduce((sum, item) => {
      const caseQty = item.qtyCase || 1000;
      const ppc =
        item.pricePerCup ??
        (item.priceCase && caseQty ? item.priceCase / caseQty : 0);
      const cases = Math.max(1, Math.round((item.quantity || caseQty) / caseQty));
      return sum + ppc * (cases * caseQty);
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
            setActiveEditKey(null);
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
            const caseQty = item.qtyCase || 1000;
            const pricePerCup =
              item.pricePerCup ??
              (item.priceCase && caseQty ? item.priceCase / caseQty : 0);

            // Normalize quantity to whole cases for display and math
            const currentCases = Math.max(
              1,
              Math.round((item.quantity || caseQty) / caseQty)
            );
            const normalizedQty = currentCases * caseQty;

            const designLabel = resolveDesignLabel(item);
            const descriptor = item.description || item.desc || DEFAULT_DESCRIPTOR;

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
                      {/* Bold product title: "1000pcs | 10 oz Blank Single-Walled Paper Cup" */}
                      <h3 className="font-semibold text-gray-900">
                        {caseQty}pcs | {item.size} {descriptor}
                      </h3>

                      {/* Subheader: Quantity per case */}
                      <p className="text-sm mb-2 text-gray-700">
                        Quantity: {caseQty} pcs/case
                      </p>

                      {/* Design line if meaningful */}
                      {designLabel && (
                        <p className="text-xs text-gray-600 -mt-1 mb-1">Design: {designLabel}</p>
                      )}

                      {item.previewURL && (
                        <img
                          src={item.previewURL}
                          alt="Design Preview"
                          className="w-12 h-12 object-contain mt-1 border rounded"
                        />
                      )}
                    </div>

                    {/* Line total based on normalized cases */}
                    <p className="font-semibold whitespace-nowrap">
                      ${(pricePerCup * normalizedQty).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls and actions — pill-style, always visible */}
                  <div className="mt-2 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-lg overflow-hidden shadow-sm border border-transparent">
                      <button
                        type="button"
                        aria-label="Decrease quantity (one case)"
                        onClick={() => {
                          const nextCases = Math.max(1, currentCases - 1);
                          updateItemQty(item.key, nextCases * caseQty);
                        }}
                        disabled={currentCases <= 1}
                        className={`w-10 h-10 grid place-items-center text-white
                          ${
                            currentCases <= 1
                              ? "bg-[#1F8248]/60 cursor-not-allowed"
                              : "bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]"
                          }`}
                      >
                        −
                      </button>

                      <div
                        aria-live="polite"
                        className="h-10 min-w-[44px] grid place-items-center bg-white text-[#1F8248] font-semibold px-3 tabular-nums select-none"
                      >
                        {currentCases}
                      </div>

                      <button
                        type="button"
                        aria-label="Increase quantity (one case)"
                        onClick={() => {
                          const nextCases = currentCases + 1;
                          updateItemQty(item.key, nextCases * caseQty);
                        }}
                        className="w-10 h-10 grid place-items-center bg-[#1F8248] text-white hover:bg-[#196D3D] active:bg-[#145633]"
                      >
                        +
                      </button>
                    </div>

                    {/* Trash icon to remove item */}
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label="Remove item"
                      title="Remove"
                      className="ml-1 p-2 rounded hover:bg-red-50 text-red-600 hover:text-red-700"
                    >
                      <Trash size={18} />
                    </button>
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
