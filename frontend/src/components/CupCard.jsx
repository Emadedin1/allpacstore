// src/components/CupCard.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CupCard({ cup }) {
  // ─── State & router ───
  const [caseQty, setCaseQty] = useState("");
  const router = useRouter();

  // ─── Pricing logic ───
  const pricePerCup = cup.priceCase / cup.qtyCase;
  const subtotal = caseQty
    ? (caseQty * pricePerCup).toFixed(2)
    : "0.00";

  // ─── Stubbed cart actions ───
  const addItem = (item, qty) => {
    console.log("ADD TO CART:", item.slug, "×", qty);
  };
  const openCart = () => {
    console.log("OPEN CART PANEL");
  };

  // ─── Handlers ───
  const handleCardClick = () => {
    router.push(`/products/${cup.slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();             // prevent the outer click
    addItem(cup, Number(caseQty) || 1);
    openCart();
  };

  // ─── JSX ───
  return (
    <div
      onClick={handleCardClick}
      className="
        m-0 flex bg-blue-50 rounded-xl shadow-md
        overflow-hidden w-[500px] max-w-3xl
        cursor-pointer hover:shadow-lg transition-shadow
      "
    >
      {/* Left: product image */}
      <img
        src={cup.image}
        alt={`${cup.size} Cup`}
        className="w-[220px] h-[300px] object-cover"
      />

      {/* Right: all the text, price, input + button */}
      <div className="p-4 flex flex-col justify-between flex-1">
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
          min="0"
          value={caseQty}
          onChange={(e) => setCaseQty(e.target.value)}
          placeholder="Enter Case Quantity"
          className="mt-2 p-2 border border-gray-300 rounded-md text-sm"

        />

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="
            w-full py-2 mt-2
            bg-[#FFD814] rounded-md
            font-semibold text-sm
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
