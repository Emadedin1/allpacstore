// src/app/checkout/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const [submitting, setSubmitting] = useState(false);

  const isFormValid =
    cartItems.length > 0 &&
    fullName &&
    address &&
    city &&
    postalCode &&
    paymentMethod;

  // subtotal
  const subtotal = cartItems
    .reduce((sum, i) => sum + (i.priceCase / i.qtyCase) * i.quantity, 0)
    .toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);

    // 1) Create Stripe Checkout Session
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        shipping: { fullName, address, city, postalCode },
        paymentMethod,
      }),
    });
    const { sessionId, error } = await res.json();
    if (error) {
      console.error(error);
      setSubmitting(false);
      return;
    }

    // 2) Redirect to Stripe-hosted checkout
    const stripe = await stripePromise;
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (stripeError) {
      console.error(stripeError);
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ─── Left: Shipping & Payment ───────────────── */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-6"
        >
          {/* Shipping */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold">Shipping Information</legend>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-32 border p-2 rounded"
                required
              />
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="space-y-2">
            <legend className="text-xl font-semibold">Payment Method</legend>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="credit">Credit Card</option>
              <option value="e-transfer">E-Transfer</option>
              <option value="invoice">Invoice</option>
            </select>
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className={`w-full px-4 py-2 rounded text-white ${
              !isFormValid || submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 cursor-pointer"
            }`}
          >
            {submitting ? "Redirecting…" : "Proceed to Payment"}
          </button>
        </form>

        {/* ─── Right: Order Summary ───────────────────── */}
        <aside className="lg:w-80">
          <div className="sticky top-24 border rounded p-4 bg-white space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <ul className="space-y-1 text-gray-700 text-sm">
              {cartItems.map((i, idx) => (
                <li
                  key={`${i.slug}-${idx}`}
                  className="flex justify-between"
                >
                  <span>
                    {i.quantity}× {i.size} oz cup
                  </span>
                  <span>
                    ${((i.priceCase / i.qtyCase) * i.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <p className="text-sm text-gray-500">
              Tax & shipping calculated on Stripe’s secure page
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
