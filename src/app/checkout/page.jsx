"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Helper to resolve per‑cup pricing
function linePrice(item) {
  const caseQty = item.qtyCase || 1000;
  const ppc = item.pricePerCup ?? (item.priceCase && caseQty ? item.priceCase / caseQty : 0);
  return ppc * item.quantity;
}

export default function ReviewCartPage() {
  const { cartItems } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Calculate subtotal
  const subtotal = cartItems
    .reduce((sum, item) => sum + linePrice(item), 0)
    .toFixed(2);

  const hasItems = cartItems.length > 0;

  const handleProceed = async () => {
    if (!hasItems || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        setError("Stripe failed to load.");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Shipping intentionally left empty for this review step
        body: JSON.stringify({ cartItems, shipping: {} }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to create checkout session.");
      }

      const { sessionId } = await res.json();
      if (!sessionId) {
        throw new Error("No session ID returned.");
      }

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        throw new Error(result.error.message || "Stripe redirection failed.");
      }
    } catch (err) {
      setError(err.message || "Unexpected error.");
      setSubmitting(false);
    }
  };

  // Basic currency format (avoid locale grouping for uniformity)
  const nf = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
        Review Cart
      </h1>

      {!hasItems && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <p className="text-gray-600 mb-6">Your cart is currently empty.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#28a745] text-white font-semibold shadow-sm hover:bg-[#218838] active:bg-[#1e7e34] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {hasItems && (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Items List */}
            <div className="flex-1 space-y-5">
            {cartItems.map((item, idx) => {
              const caseQty = item.qtyCase || 1000;
              const ppc = item.pricePerCup ?? (item.priceCase && caseQty ? item.priceCase / caseQty : 0);
              const lineTotal = ppc * item.quantity;
              const designLabel = resolveDesignLabel(item);

              return (
                <div
                  key={item.key || idx}
                  className="flex gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`${item.size} cup`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-xs text-gray-400">No Image</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="font-semibold text-gray-900 leading-snug truncate">
                          {item.size} oz Cup
                        </h2>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} cup{item.quantity === 1 ? "" : "s"}
                        </p>
                        {designLabel && (
                          <p className="text-xs text-gray-500 mt-1">
                            Design: {designLabel}
                          </p>
                        )}
                        {item.previewURL && (
                          <img
                            src={item.previewURL}
                            alt="Design Preview"
                            className="w-12 h-12 object-contain border rounded mt-2"
                          />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold font-mono tabular-nums">
                          ${nf.format(lineTotal)}
                        </div>
                        <div className="text-xs text-gray-500">
                          (${nf.format(ppc)} ea)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium font-mono tabular-nums">
                    ${subtotal}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Taxes & shipping calculated at checkout.
                </div>

                {error && (
                  <div className="text-red-600 bg-red-50 border border-red-200 text-xs rounded-md px-3 py-2 mb-3">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleProceed}
                  disabled={!hasItems || submitting}
                  className={`
                    w-full inline-flex items-center justify-center h-12 rounded-full
                    font-semibold text-white shadow-sm transition-colors
                    ${submitting
                      ? "bg-[#28a745]/70 cursor-not-allowed"
                      : "bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34] cursor-pointer"
                    }
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                  `}
                >
                  {submitting ? "Processing..." : "Proceed to Checkout"}
                </button>

                <Link
                  href="/"
                  className="block mt-3 text-center text-sm text-[#28a745] hover:text-[#1e7e34] font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

/* Reuse logic from cart drawer to clean design labels */
function resolveDesignLabel(item) {
  let candidate =
    item?.designType === "Custom"
      ? (item?.designName && String(item.designName)) || "Custom"
      : item?.designType;
  if (typeof candidate !== "string") return null;
  const d = candidate.trim();
  if (!d) return null;
  const lowered = d.toLowerCase();
  if (["plain white", "plain", "none", "n/a", "default"].includes(lowered)) return null;
  return d;
}
