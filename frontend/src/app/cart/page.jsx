// app/cart/page.jsx
"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { X, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cartItems, updateItemQty, removeItem } = useCart();

  const handleQtyChange = (slug, delta) => {
    const item = cartItems.find((item) => item.slug === slug);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty > 0) updateItemQty(slug, newQty);
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link href="/products" className="text-blue-500 underline mt-4 inline-block">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={`${item.slug}-${index}`}
            className="border p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.size} Cup</h3>
              <p className="text-sm text-gray-500">
                ${(item.priceCase / item.qtyCase).toFixed(3)}/cup
              </p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => handleQtyChange(item.slug, -100)}
                  disabled={item.quantity <= 300}
                  className={`p-1 border rounded ${item.quantity <= 300 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQtyChange(item.slug, 100)}
                  className="p-1 border rounded cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">
                ${((item.priceCase / item.qtyCase) * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeItem(item.slug)}
                className="text-red-500 mt-2 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <div className="mt-10 text-right">
        <Link href="/checkout">
          <button
            disabled={cartItems.some((item) => item.quantity < 300)}
            className={`px-6 py-2 rounded text-white ${cartItems.some((item) => item.quantity < 300)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 cursor-pointer"
              }`}
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
