"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const MIN_QTY = 500;
  const pricePerCup = cup.priceCase / cup.qtyCase;

  const goToDetails = () => router.push(`/products/${cup.slug}`);

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
      {/* Image */}
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
        {/* Price */}
        <div className="flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-xs text-gray-700 font-medium sm:text-sm">From</span>
            <span className="text-[15px] sm:text-xl font-semibold leading-tight tracking-tight text-gray-900">
            ${pricePerCup.toFixed(3)}/cup
          </span>
        </div>

        {/* MOQ */}
        <span className="text-xs sm:text-sm text-gray-500">MOQ {MIN_QTY}</span>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="
            inline-flex items-center justify-center
            rounded-md
            bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]
            text-white
            text-[13px] font-medium tracking-tight
            px-4 py-2 sm:px-5 sm:py-2.5
            w-full xs:w-auto sm:self-start
            shadow-sm hover:shadow
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
            transition-colors
          "
          aria-label={`Add ${cup.size} cup to cart`}
        >
          Add to Cart
        </button>

        <span className="sr-only">{cup.size} Cup</span>
      </div>
    </div>
  );
}
