"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const MIN_QTY = 500;
  const STEP = 100;

  const [qty, setQty] = useState(MIN_QTY);

  const pricePerCup = cup.priceCase / cup.qtyCase;
  const subtotal = (qty * pricePerCup).toFixed(2);

  const goToDetails = (e) => {
    e.stopPropagation();
    router.push(`/products/${cup.slug}`);
  };

  const increment = (e) => {
    e.stopPropagation();
    setQty((q) => q + STEP);
  };

  const decrement = (e) => {
    e.stopPropagation();
    setQty((q) => Math.max(MIN_QTY, q - STEP));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Keep signature compatible with your CartContext (placeholders for removed design fields)
    addItem(cup, qty, null, "", "Plain White");
    openCart();
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition flex flex-col h-full">
      {/* Image */}
      <button
        type="button"
        onClick={goToDetails}
        className="w-full h-40 sm:h-44 md:h-48 bg-gray-50"
        aria-label={`${cup.size} ${cup.type} details`}
      >
        <img
          src={cup.image}
          alt={`${cup.size} ${cup.type}`}
          className="w-full h-full object-cover"
        />
      </button>

      {/* Bottom content */}
      <div className="p-3 flex flex-col gap-3">
        {/* Small title (optional, can remove to be even tighter) */}
        <button type="button" onClick={goToDetails} className="text-left">
          <h3 className="text-sm font-semibold text-gray-900">
            {cup.size} {cup.type}
          </h3>
        </button>

        {/* Price */}
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold text-gray-900">
            ${pricePerCup.toFixed(3)}/Cup
          </p>
          <span className="text-[11px] text-gray-500">MOQ {MIN_QTY}</span>
        </div>

        {/* Quantity stepper */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrement}
            disabled={qty <= MIN_QTY}
            className={`h-9 w-9 rounded-md border flex items-center justify-center text-lg leading-none
              ${qty <= MIN_QTY ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-50"}
            `}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            readOnly
            value={qty}
            aria-label="Quantity"
            className="h-9 w-20 text-center border rounded-md bg-white text-sm"
          />
          <button
            type="button"
            onClick={increment}
            className="h-9 w-9 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center text-lg leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Tiny subtotal (remove if you want even smaller) */}
        <p className="text-xs text-gray-600">Subtotal: ${subtotal}</p>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-2 rounded-md font-semibold bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
