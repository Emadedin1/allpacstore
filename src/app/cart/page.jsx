// src/app/cart/page.jsx
"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { X, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cartItems, updateItemQty, removeItem } = useCart();

  const handleQtyChange = (key, delta) => {
    const item = cartItems.find((i) => i.key === key);
    if (!item) return;
    const nextQty = item.quantity + delta;
    if (nextQty >= 300) updateItemQty(slug, nextQty);
  };

  // Calculate subtotal
  const subtotal = cartItems
    .reduce((sum, i) => sum + (i.priceCase / i.qtyCase) * i.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header with continue shopping link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <Link href="/products" className="text-blue-600 hover:underline">
          &larr; Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ─── Left: Items List ─────────────────────────────── */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item, idx) => {
            const pricePerCup = item.priceCase / item.qtyCase;
            const lineTotal = (pricePerCup * item.quantity).toFixed(2);

            return (
              <div
                key={item.key}
                className="border rounded-lg p-4 flex gap-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={`${item.size} oz cup`}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Info & Quantity Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.size} oz Cup</h3>
                    <p className="text-sm text-gray-500">
                      ${pricePerCup.toFixed(3)}/cup · {item.qtyCase} per case
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
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

                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQtyChange(item.key, -100)}
                      disabled={item.quantity <= 300}
                      className={`p-1 border rounded ${item.quantity <= 300
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                        }`}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(item.key, 100)}
                      className="p-1 border rounded cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <span className="font-semibold">${lineTotal}</span>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-red-600 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Right: Sticky Summary ───────────────────────── */}
        <div className="lg:w-80">
          <div className="sticky top-24 border rounded p-4 bg-white space-y-2">
            <div className="text-lg font-semibold">Subtotal</div>
            <div className="text-2xl font-bold">${subtotal}</div>
            <p className="text-sm text-gray-600">Tax: Calculated at checkout</p>
            <p className="text-sm text-gray-600">Shipping: Calculated at checkout</p>
            <p className="text-xs text-gray-500 italic">
              Final total and charges shown at checkout
            </p>
            <Link href="/checkout">
              <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 cursor-pointer">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
