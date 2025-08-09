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
    e.stopPropagation(); // prevent card click navigation
    addItem(cup, MIN_QTY, null, "", "Plain White", pricePerCup);
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
      {/* Image */}
      <div className="relative w-full h-40 sm:h-44 md:h-48 bg-gray-50 rounded-t-2xl overflow-hidden">
        <img
          src={cup.image}
          alt={`${cup.size} cup`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {/* Size badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
          {cup.size}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-3">
        <div className="text-left">
          <h3 className="text-sm font-semibold text-gray-900">{cup.size} Cup</h3>
        </div>

        <div className="space-y-0.5">
          <p className="text-lg font-bold text-gray-900">
            ${pricePerCup.toFixed(3)}/Cup
          </p>
          <span className="text-xs text-gray-500">MOQ {MIN_QTY}</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-2 rounded-md font-semibold bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
