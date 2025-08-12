"use client";
import { useCart } from "../context/CartContext";
import { X, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

const nf = new Intl.NumberFormat("en-US", { useGrouping: false });
const fmt = (n) => nf.format(Number(n || 0));

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
      const setFlag = () => setIsMobile(window.innerWidth < 640);
      setFlag();
      window.addEventListener("resize", setFlag);
      return () => window.removeEventListener("resize", setFlag);
    }
  }, []);

  // Body scroll lock on mobile when drawer is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isMobile) return;

    let previousScrollY = 0;
    if (isOpen) {
      previousScrollY = window.scrollY || 0;
      // Robust iOS-friendly body lock
      const body = document.body;
      body.style.position = "fixed";
      body.style.top = `-${previousScrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overscrollBehavior = "none"; // prevent rubber-band behind
      return () => {
        const y = -parseInt(body.style.top || "0", 10) || 0;
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        body.style.overscrollBehavior = "";
        window.scrollTo(0, y);
      };
    }
  }, [isOpen, isMobile]);

  // Click outside to close (desktop); on mobile we use the overlay for this
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

  // Cart total
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
    <>
      {/* Backdrop overlay (helps prevent background scroll and provides touch target to close) */}
      <div
        aria-hidden="true"
        className={`
          fixed inset-0 z-40 transition-opacity duration-200
          ${isOpen ? "bg-black/30 opacity-100" : "bg-transparent opacity-0 pointer-events-none"}
        `}
        onClick={() => {
          setActiveEditKey(null);
          closeCart();
        }}
      />

      <div
        ref={drawerRef}
        className={`
          fixed z-50 bg-white shadow-xl transform transition-transform duration-300 ease-out
          flex flex-col overflow-x-hidden
          ${isMobile
            ? `
              inset-x-0 bottom-0 w-full rounded-t-2xl border-t border-gray-100
              ${isOpen ? "translate-y-0" : "translate-y-full"}
            `
            : `
              top-[64px] right-0 w-[400px] h-[calc(100%-64px)]
              ${isOpen ? "translate-x-0" : "translate-x-full"}
            `
          }
        `}
        style={{
          willChange: "transform",
          // Bottom sheet sizing on mobile: stable min/max using svh with vh fallback
          ...(isMobile
            ? {
                // Use max height; let content define min height
                maxHeight: "80vh",
                // svh overrides in modern browsers to avoid sudden jumps
                // (later declaration wins)
                // @ts-ignore
                maxHeight: "80svh",
              }
            : {}),
          // Improve scrollbars to avoid layout shift when they appear
          scrollbarGutter: "stable",
          touchAction: "pan-y",
        }}
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

        {/* Items (scroll container) */}
        <div
          className="
            px-4 pb-4 flex-1 overflow-y-auto space-y-4
            overscroll-contain
          "
          // Prevent scroll chaining on some browsers
          style={{ overscrollBehavior: "contain" }}
        >
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const caseQty = item.qtyCase || 1000;
              const pricePerCup =
                item.pricePerCup ??
                (item.priceCase && caseQty ? item.priceCase / caseQty : 0);
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

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0 pr-1">
                        <h3 className="font-semibold text-gray-900">
                          {fmt(caseQty)} cups | {item.size} {descriptor}
                        </h3>

                        <p className="text-sm mb-2 text-gray-700">
                          Quantity: {fmt(caseQty)} cups/case
                        </p>

                        {designLabel && (
                          <p className="text-xs text-gray-600 -mt-1 mb-1">
                            Design: {designLabel}
                          </p>
                        )}

                        {item.previewURL && (
                          <img
                            src={item.previewURL}
                            alt="Design Preview"
                            className="w-12 h-12 object-contain mt-1 border rounded"
                          />
                        )}
                      </div>

                      <div
                        className="
                          ml-2 shrink-0
                          w-[9ch] sm:w-[10ch]
                          text-right font-semibold
                          font-mono tabular-nums
                          whitespace-nowrap
                        "
                        aria-label="Line item total"
                      >
                        ${(pricePerCup * normalizedQty).toFixed(2)}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                      <div
                        className="
                          inline-flex items-center overflow-hidden rounded-full
                          shadow-sm
                        "
                        role="group"
                        aria-label="Change quantity in cases"
                      >
                        <button
                          type="button"
                          aria-label="Decrease quantity (one case)"
                          onClick={() => {
                            const nextCases = Math.max(1, currentCases - 1);
                            updateItemQty(item.key, nextCases * caseQty);
                          }}
                          disabled={currentCases <= 1}
                          className={`
                            w-10 h-10 grid place-items-center
                            text-white text-lg select-none
                            ${
                              currentCases <= 1
                                ? "bg-[#1F8248]/60 cursor-not-allowed"
                                : "bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633] cursor-pointer"
                            }
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                          `}
                        >
                          −
                        </button>

                        <div
                          aria-live="polite"
                          className="
                            w-12 h-10 grid place-items-center
                            bg-white text-[#1F8248] font-semibold
                            font-mono tabular-nums select-none
                          "
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
                          className="
                            w-10 h-10 grid place-items-center
                            bg-[#1F8248] text-white text-lg select-none
                            hover:bg-[#196D3D] active:bg-[#145633]
                            cursor-pointer
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                          "
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label="Remove item"
                        title="Remove"
                        className="ml-1 p-2 rounded hover:bg-red-50 text-red-600 hover:text-red-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
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

        {/* Footer (safe-area padding to avoid home indicator overlap) */}
        <div className="p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <div className="flex justify-between mb-4 font-semibold">
            <span>Total:</span>
            <span className="font-mono tabular-nums">${total}</span>
          </div>

          <Link
            href="/checkout"
            onClick={() => {
              setActiveEditKey(null);
              closeCart();
            }}
            className="no-close w-full inline-flex items-center justify-center h-11 rounded-full bg-[#1F8248] text-white font-semibold shadow-sm
                       hover:bg-[#196D3D] active:bg-[#145633]
                       cursor-pointer
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                       transition-colors"
            aria-label="Go to checkout"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
