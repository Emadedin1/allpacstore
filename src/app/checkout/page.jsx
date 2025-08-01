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

  const subtotal = cartItems
    .reduce((sum, i) => sum + (i.priceCase / i.qtyCase) * i.quantity, 0)
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
        {/* Left: Shipping form */}
        <div className="flex-1 space-y-4">
          <input name="fullName" placeholder="Full Name" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input name="address" placeholder="Address" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input name="city" placeholder="City" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input name="postalCode" placeholder="Postal Code" className="w-full border p-2 rounded" onChange={handleChange} required />

          <button type="submit" disabled={submitting} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            {submitting ? "Redirecting…" : "Proceed to Payment"}
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-80 border rounded p-4 space-y-2 sticky top-24">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          {cartItems.map((item, i) => (
            <div key={`${item.slug}-${i}`} className="flex justify-between text-sm text-gray-700">
              <span>{item.quantity}× {item.size} oz cup</span>
              <span>${((item.priceCase / item.qtyCase) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-2">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <p className="text-sm text-gray-500">Tax and shipping calculated on Stripe</p>
        </div>
      </form>
    </div>
  );
}
