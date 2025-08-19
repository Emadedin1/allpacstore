"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function ReviewCartPage() {
  const { cartItems } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hasItems = cartItems.length > 0;

  const subtotal = cartItems
    .reduce((sum, item) => {
      const caseQty = item.qtyCase || 1000;
      const ppc =
        item.pricePerCup ??
        (item.priceCase && caseQty ? item.priceCase / caseQty : 0);
      return sum + ppc * item.quantity;
    }, 0)
    .toFixed(2);

  const nf = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function resolveDesignLabel(item) {
    let candidate =
      item?.designType === "Custom"
        ? (item?.designName && String(item.designName)) || "Custom"
        : item?.designType;
    if (typeof candidate !== "string") return null;
    const d = candidate.trim();
    if (!d) return null;
    const lowered = d.toLowerCase();
    if (["plain white", "plain", "none", "n/a", "default"].includes(lowered))
      return null;
    return d;
  }

  function linePricing(item) {
    const caseQty = item.qtyCase || 1000;
    const ppc =
      item.pricePerCup ??
      (item.priceCase && caseQty ? item.priceCase / caseQty : 0);
    return { ppc, lineTotal: ppc * item.quantity };
  }

  // Avoid "10 oz oz Cup" -> detect if size already contains 'oz'
  function sizeLabel(rawSize) {
    if (!rawSize) return "Cup";
    const s = String(rawSize).trim();
    return /oz/i.test(s) ? `${s} Cup` : `${s} oz Cup`;
  }

  async function handleProceed() {
    if (!hasItems || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load.");

      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, shipping: {} }), // no shipping inputs here
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed to create checkout session.");
      }
      const { sessionId } = await res.json();
      if (!sessionId) throw new Error("No session ID returned.");

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) throw new Error(result.error.message || "Redirect failed.");
    } catch (err) {
      setError(err.message || "Unexpected error.");
      setSubmitting(false);
    }
  }

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
          {/* Unified Items Card */}
          <div className="flex-1">
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Items ({cartItems.length})</h2>
              </div>

              <ul className="divide-y divide-gray-100">
                {cartItems.map((item, idx) => {
                  const { ppc, lineTotal } = linePricing(item);
                  const designLabel = resolveDesignLabel(item);

                  return (
                    <li
                      key={item.key || idx}
                      className="flex gap-4 px-5 py-4 items-start group transition-colors"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center shrink-0 ring-1 ring-gray-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.size} cup`}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-[10px] text-gray-400">No Image</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 leading-snug truncate">
                              {sizeLabel(item.size)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} cup
                              {item.quantity === 1 ? "" : "s"}
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
                                className="w-10 h-10 object-contain border border-gray-200 rounded mt-2"
                              />
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-semibold font-mono tabular-nums">
                              ${nf.format(lineTotal)}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              (${nf.format(ppc)} ea)
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
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
