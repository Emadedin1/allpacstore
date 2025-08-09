"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const MIN_QTY = 500; // MOQ
  const STEP = 100;    // kept here for cart logic; stepper is not shown on the card

  const pricePerCup = cup.priceCase / cup.qtyCase;

  const goToDetails = (e) => {
    e.stopPropagation();
    router.push(`/products/${cup.slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add default MOQ, no design fields on the tile
    addItem(cup, MIN_QTY, null, "", "Plain White");
    // Open the cart where users can adjust quantity (+/- by 100, min 500)
    openCart();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition h-full flex flex-col">
      {/* Image (no black focus outline) */}
      <button
        type="button"
        onClick={goToDetails}
        className="w-full h-40 sm:h-44 md:h-48 bg-gray-50 focus:outline-none"
        aria-label={`${cup.size} ${cup.type} details`}
      >
        <img
          src={cup.image}
          alt={`${cup.size} ${cup.type}`}
          className="w-full h-full object-cover"
        />
      </button>

      {/* Bottom content — minimal: price + Add to Cart */}
      <div className="p-3 flex flex-col gap-3">
        {/* Price only */}
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold text-gray-900">
            ${pricePerCup.toFixed(3)}/Cup
          </p>
          <span className="text-[11px] text-gray-500">MOQ {MIN_QTY}</span>
        </div>

        {/* No quantity UI here; it appears in the cart after adding */}
        {/* No subtotal on the card */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-2 rounded-md font-semibold bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 focus:outline-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
