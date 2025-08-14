"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

const CASE_PRICE_BY_SIZE = {
  "10 oz": 41.50,
  "12 oz": 46.50,
  "16 oz": 60.00,
  "22 oz": 78.00,
  "32 oz": 114.50,
};

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const effectiveCasePrice =
    CASE_PRICE_BY_SIZE[cup.size] !== undefined
      ? CASE_PRICE_BY_SIZE[cup.size]
      : cup.priceCase;

  const qtyPerCase = cup.qtyCase || 1000;
  const pricePerCup = effectiveCasePrice / qtyPerCase;

  const goToDetails = () => router.push(`/products/${cup.slug}`);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetails();
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(
      { ...cup, priceCase: effectiveCasePrice, qtyCase: qtyPerCase },
      qtyPerCase,
      null,
      "",
      undefined,
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
      className="
        group bg-white rounded-2xl shadow-sm hover:shadow-md transition
        flex flex-col cursor-pointer focus:outline-none
        focus-visible:ring-2 focus-visible:ring-black/10
        w-[var(--card-min)]
      "
      aria-label={`${cup.size} details`}
    >
      {/* Square image well */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
        <img
          src={cup.image}
          alt={`${cup.size} cup`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          draggable={false}
          loading="lazy"
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <p className="text-[13px] sm:text-sm font-medium text-gray-900 leading-snug text-center">
          {qtyPerCase} cups | {cup.size}
          <span className="font-normal text-gray-700 block">
            {cup.description || DEFAULT_DESCRIPTOR}
          </span>
        </p>

        <p className="text-base sm:text-lg font-semibold text-gray-900 text-center">
          ${effectiveCasePrice.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            mt-auto inline-flex h-9 sm:h-10 w-full items-center justify-center
            rounded-md bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34]
            text-white text-[14px] sm:text-[15px] font-medium
            hover:shadow-sm focus:outline-none
            focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
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
