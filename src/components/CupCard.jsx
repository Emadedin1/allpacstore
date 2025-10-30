"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

const CASE_PRICE_BY_SIZE = {
  "10 oz": 51.50,
  "12 oz": 56.50,
  "16 oz": 65.00,
  "22 oz": 88.00,
  "32 oz": 124.50,
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

  const goToDetails = () => router.push("/catalog");


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
        w-full max-w-[180px] mx-auto
      "
      aria-label={`${cup.size} details`}
    >
      {/* Image container */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-t-2xl overflow-hidden max-w-[180px] mx-auto">
        <img
          src={cup.image}
          alt={`${cup.size} cup`}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          draggable={false}
          loading="lazy"
        />
      </div>

      <div className="p-2 flex flex-col gap-1">
        <p className="text-[12px] sm:text-sm font-medium text-gray-900 leading-snug text-center">
          {qtyPerCase} cups | {cup.size}
          <span className="font-normal text-gray-700 block text-[11px] sm:text-xs">
            {cup.description || DEFAULT_DESCRIPTOR}
          </span>
        </p>

        <p className="text-sm sm:text-base font-semibold text-gray-900 text-center">
          ${effectiveCasePrice.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            mt-auto inline-flex h-8 sm:h-9 w-full items-center justify-center
            rounded-md bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34]
            text-white text-[13px] sm:text-[14px] font-medium
            hover:shadow-sm focus:outline-none
            focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
            transition-colors
            cursor-pointer
          "
          aria-label={`Add 1 case of ${cup.size} cups to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
