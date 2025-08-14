"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

const CASE_PRICE_BY_SIZE = {
  "10 oz": 92,
  "12 oz": 94,
  "16 oz": 96,
  "22 oz": 88,
  "32 oz": 90,
};

export default function CupCard({ cup, compact = true }) {
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

  // Compact mode tweaks (desktop only) -> smaller text, tighter padding.
  const textSizeTitle = compact
    ? "text-sm lg:text-[13px]"
    : "text-sm";
  const priceTextSize = compact
    ? "text-lg lg:text-base"
    : "text-lg";
  const cardPadding = compact
    ? "p-3 sm:p-3.5 lg:p-3"
    : "p-3 sm:p-4";
  const buttonHeight = compact ? "h-9 lg:h-8" : "h-10";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={handleKeyDown}
      className={`
        group bg-white rounded-2xl shadow-sm hover:shadow-md transition
        flex flex-col cursor-pointer focus:outline-none
        focus-visible:ring-2 focus-visible:ring-black/10
        max-w-[210px] md:max-w-[200px] lg:max-w-[190px] xl:max-w-[185px]
      `}
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

      {/* Content */}
      <div className={`${cardPadding} flex flex-col gap-2 flex-1`}>
        <p
          className={`
            ${textSizeTitle} font-medium text-gray-900 leading-snug text-center
          `}
        >
          {qtyPerCase} cups | {cup.size}{" "}
          <span className="font-normal text-gray-700 block">
            {cup.description || DEFAULT_DESCRIPTOR}
          </span>
        </p>

        <p
          className={`
            ${priceTextSize} font-semibold text-gray-900 text-center
          `}
        >
          ${effectiveCasePrice.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`
            mt-auto inline-flex ${buttonHeight} w-full items-center justify-center
            rounded-md bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]
            text-white text-[15px] lg:text-[14px] font-medium
            hover:shadow-sm focus:outline-none
            focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
            transition-colors
          `}
          aria-label={`Add 1 case of ${cup.size} cups to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
