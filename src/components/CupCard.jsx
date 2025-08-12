"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const MIN_QTY = 500; // MOQ
  const pricePerCup = cup.priceCase / cup.qtyCase;

  const goToDetails = () => {
    router.push(`/products/${cup.slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetails();
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(cup, MIN_QTY, null, "", null, pricePerCup);
    openCart();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={handleKeyDown}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition h-full flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
      aria-label={`${cup.size} details`}
    >
      {/* Image with size badge */}
      <div className="relative w-full h-36 sm:h-44 md:h-48 bg-gray-50 rounded-t-2xl overflow-hidden">
        <img
          src={cup.image}
          alt={`${cup.size} cup`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
          {cup.size}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        {/* Price (single line on mobile) */}
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-xs text-gray-700 font-medium sm:text-base">From</span>
            <span className="text-[15px] sm:text-2xl font-semibold leading-tight tracking-[-0.01em] text-gray-900">
              ${pricePerCup.toFixed(3)}/cup
            </span>
        </div>

        {/* MOQ */}
        <span className="text-xs sm:text-sm text-gray-500">MOQ {MIN_QTY}</span>

        {/* CTA – fixed color across states */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex h-10 w-full items-center justify-center rounded-md font-semibold
                     bg-[#27AE60] text-white
                     hover:bg-[#27AE60] active:bg-[#27AE60]
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#27AE60]/50
                     shadow-sm hover:shadow transition-colors transition-shadow
                     active:scale-[0.985] mt-1"
        >
          Add to Cart
        </button>

        {/* Hidden accessible text */}
        <span className="sr-only">{cup.size} Cup</span>
      </div>
    </div>
  );
}
