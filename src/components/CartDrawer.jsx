"use client";
import { useCart } from "../context/CartContext";
import { X } from "lucide-react";
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
    activeEditKey,
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
      const ppc = item.pricePerCup ?? item.priceCase / caseQty;
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
              item.pricePerCup ?? (item.priceCase && caseQty ? item.priceCase / caseQty : 0);
            const casePrice =
              item.priceCase ?? (pricePerCup && caseQty ? pricePerCup * caseQty : 0);

            // Normalize quantity to whole cases for display and math
            const currentCases = Math.max(
              1,
              Math.round((item.quantity || caseQty) / caseQty)
            );
            const normalizedQty = currentCases * caseQty;

            const isEditing = activeEditKey === item.key;
            const designLabel = resolveDesignLabel(item);

            const descriptor = item.description || DEFAULT_DESCRIPTOR;

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

                      {/* Subtitle: only cups-per-case */}
                      <p className="text-sm mb-1 text-gray-700">
                        {caseQty} cups per case
                      </p>

                      {/* Design line if meaningful */}
                      {designLabel && (
                        <p className="text-xs text-gray-600">Design: {designLabel}</p>
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

                  {/* Quantity + actions */}
                  <div className="mt-2 flex items-center gap-4">
                    {isEditing ? (
                      <>
                        {/* Step by FULL CASES (cannot go below 1 case) */}
                        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white shadow-sm h-9">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => {
                              const nextCases = Math.max(1, currentCases - 1);
                              updateItemQty(item.key, nextCases * caseQty);
                            }}
                            disabled={currentCases <= 1}
                            className={`w-9 h-9 rounded-l-full text-base font-semibold
                              ${
                                currentCases <= 1
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                              }`}
                          >
                            −
                          </button>

                          <div className="px-3 text-center select-none leading-tight">
                            <div className="text-[10px] text-gray-500">Qty</div>
                            <div className="text-sm font-medium text-gray-900">
                              {currentCases} {currentCases === 1 ? "case" : "cases"}
                            </div>
                          </div>

                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => {
                              const nextCases = currentCases + 1;
                              updateItemQty(item.key, nextCases * caseQty);
                            }}
                            className="w-9 h-9 rounded-r-full text-base font-semibold text-gray-800 hover:bg-gray-100 active:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveEditKey(null)}
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
                        {/* Show cases only (no raw cup counts) */}
                        <span className="text-sm">
                          Qty: {currentCases} {currentCases === 1 ? "case" : "cases"}
                        </span>
                        <button
                          onClick={() => setActiveEditKey(item.key)}
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
