// src/components/CupCard.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CupCard({ cup }) {
  // ─── State & router ───
  const [caseQty, setCaseQty] = useState("300");
  const router = useRouter();
  const { addItem, openCart } = useCart();

  // ─── Pricing logic ───
  const pricePerCup = cup.priceCase / cup.qtyCase;
  const subtotal = caseQty
    ? (caseQty * pricePerCup).toFixed(2)
    : "0.00";

  // ─── Stubbed cart actions ───
  function handleAddToCart(e) {
    e.stopPropagation();
    addItem(cup, Number(caseQty) || 1);
    openCart();
  }

  // ─── Handlers ───
  const handleCardClick = () => {
    router.push(`/products/${cup.slug}`);
  };

  // ─── JSX ───
  return (
    <div
      onClick={handleCardClick}
      className="
    flex flex-col md:flex-row items-stretch
    bg-blue-50 rounded-xl shadow-md overflow-hidden
    w-full max-w-[620px] sm:max-w-full
    cursor-pointer hover:shadow-lg transition-shadow
  "
    >
      {/* Left: product image */}
      <div className="w-full h-[220px] md:w-[220px] md:h-auto">
        <img
          src={cup.image}
          alt={`${cup.size} Cup`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right: all the text, price, input + button */}
      <div className="p-3 pr-10 flex flex-col justify-between flex-1 min-w-0">
        {/* Title / type / description */}
        <div>
          <h2 className="text-lg font-bold mb-1">
            {cup.size} Cup
          </h2>
          <p className="text-base mb-1">{cup.type}</p>
          <p className="text-sm mb-4">{cup.desc}</p>
        </div>

        {/* Price per cup & subtotal */}
        <div>
          <p className="text-2xl font-bold mb-1">
            ${pricePerCup.toFixed(3)}/Cup
          </p>
          <p className="text-sm font-semibold">
            Subtotal: ${subtotal}
          </p>
        </div>

        {/* Quantity input */}
        <input
          onClick={e => e.stopPropagation()}
          type="number"
          min={300}
          step={100}
          value={caseQty}
          onChange={(e) => setCaseQty(e.target.value)}
          placeholder="Enter Cup Quantity"
          className="mt-2 p-2 border border-gray-300 rounded-md text-sm"

        />

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="
            w-full py-2 mt-2
            bg-[#FFD814] rounded-md
            font-semibold text-sm no-close
            cursor-pointer
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
