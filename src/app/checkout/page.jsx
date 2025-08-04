// src/app/checkout/page.jsx
"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // compute subtotal using pricePerCup (with fallback to priceCase/qtyCase)
  const subtotal = cartItems
    .reduce((sum, item) => {
      const ppc = item.pricePerCup ?? (item.priceCase / item.qtyCase);
      return sum + ppc * item.quantity;
    }, 0)
    .toFixed(2);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const stripe = await stripePromise;
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        shipping: form,
      }),
    });

    const { sessionId } = await res.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* — Shipping Form — */}
        <div className="flex-1 space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={submitting || cartItems.length === 0}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {submitting ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>

        {/* — Order Summary — */}
        <div className="lg:w-80 border rounded p-4 space-y-2 sticky top-24">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          {cartItems.map((item, idx) => {
            const ppc = item.pricePerCup ?? (item.priceCase / item.qtyCase);
            return (
              <div key={idx} className="mb-2">
                <div className="flex justify-between">
                  <span>
                    {item.quantity}× {item.size} oz cup
                  </span>
                  <span>${(ppc * item.quantity).toFixed(2)}</span>
                </div>
                {item.designName && (
                  <p className="text-xs text-gray-500 ml-1">
                    Design: {item.designName}
                  </p>
                )}
              </div>
            );
          })}

          <div className="flex justify-between font-semibold mt-2">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <p className="text-sm text-gray-500">
            Tax and shipping calculated on Stripe
          </p>
        </div>
      </form>
    </div>
  );
}
