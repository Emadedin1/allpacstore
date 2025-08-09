"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const MIN_QTY = 500; // MOQ
  const pricePerCup = cup.priceCase / cup.qtyCase;

  const goToDetails = (e) => {
    e.stopPropagation();
    router.push(`/products/${cup.slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // IMPORTANT: pass pricePerCup as the 6th argument
    addItem(cup, MIN_QTY, null, "", "Plain White", pricePerCup);
    openCart();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition h-full flex flex-col">
      {/* Image with size badge (no outlines) */}
      <div className="relative w-full h-40 sm:h-44 md:h-48 bg-gray-50 rounded-t-2xl overflow-hidden">
        <button
          type="button"
          onClick={goToDetails}
          className="absolute inset-0 w-full h-full focus:outline-none focus:ring-0"
          aria-label={`${cup.size} details`}
        >
          <img
            src={cup.image}
            alt={`${cup.size} cup`}
            className="w-full h-full object-cover"
          />
        </button>

        {/* Size badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
          {cup.size}
        </div>
      </div>

      {/* Minimal content: size label, price, MOQ, Add to Cart */}
      <div className="p-3 flex flex-col gap-3">
        {/* Product size (clickable) */}
        <button
          type="button"
          onClick={goToDetails}
          className="text-left focus:outline-none focus:ring-0"
          aria-label={`${cup.size} details`}
        >
          <h3 className="text-sm font-semibold text-gray-900">
            {cup.size} Cup
          </h3>
          {/* Keep removed: any extra type text for a cleaner look */}
        </button>

        {/* Price with MOQ stacked underneath */}
        <div className="space-y-0.5">
          <p className="text-lg font-bold text-gray-900">
            ${pricePerCup.toFixed(3)}/Cup
          </p>
          <span className="text-xs text-gray-500">MOQ {MIN_QTY}</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-2 rounded-md font-semibold bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 focus:outline-none focus:ring-0"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
