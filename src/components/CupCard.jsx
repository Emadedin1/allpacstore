"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

// Override map (use your case prices here)
const CASE_PRICE_BY_SIZE = {
  "10 oz": 92,
  "12 oz": 94,
  "16 oz": 96,
  "22 oz": 88,
  "32 oz": 90,
};

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  // Case price + case qty
  const effectiveCasePrice =
    CASE_PRICE_BY_SIZE[cup.size] !== undefined
      ? CASE_PRICE_BY_SIZE[cup.size]
      : cup.priceCase;

  const qtyPerCase = cup.qtyCase || 1000;
  const pricePerCup = effectiveCasePrice / qtyPerCase;

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
    // Add ONE FULL CASE so the cart shows the case total (e.g., $92)
    addItem(
      { ...cup, priceCase: effectiveCasePrice, qtyCase: qtyPerCase },
      qtyPerCase,           // quantity in cups = 1 case
      null,
      "",
      undefined,            // let designType default internally
      pricePerCup
    );
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
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        {/* Spec line */}
        <p className="text-sm font-medium text-gray-900 leading-snug text-center">
          {qtyPerCase} cups | {cup.size}{" "}
          <span className="font-normal text-gray-700 block sm:inline">
            {cup.description || DEFAULT_DESCRIPTOR}
          </span>
        </p>

        {/* Centered Case Price (no "/case") */}
        <p className="text-lg font-semibold text-gray-900 text-center">
          ${effectiveCasePrice.toFixed(2)}
        </p>

        {/* Add Case Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="
            inline-flex h-10 w-full items-center justify-center
            rounded-md
            bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]
            text-white text-base font-medium
            hover:shadow-sm
            cursor-pointer
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
            transition-colors
          "
          aria-label={`Add 1 case of ${cup.size} cups to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
