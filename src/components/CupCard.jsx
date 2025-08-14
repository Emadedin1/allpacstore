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

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

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
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
      aria-label={`${cup.size} details`}
    >
      {/* SQUARE IMAGE WELL (structure fix) */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
        {/* OPTION A: object-cover (square source => no crop) */}
        <img
            src={cup.image}
            alt={`${cup.size} cup`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            draggable={false}
            loading="lazy"
        />
        {/*
          OPTION B (swap the <img> above for this one if you want breathing room):
          <img
            src={cup.image}
            alt={`${cup.size} cup`}
            className="absolute inset-0 w-full h-full object-contain p-4 sm:p-5 transition-transform duration-300 group-hover:scale-[1.03]"
            draggable={false}
            loading="lazy"
          />
        */}
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        <p className="text-sm font-medium text-gray-900 leading-snug text-center">
          {qtyPerCase} cups | {cup.size}{" "}
          <span className="font-normal text-gray-700 block sm:inline">
            {cup.description || DEFAULT_DESCRIPTOR}
          </span>
        </p>

        <p className="text-lg font-semibold text-gray-900 text-center">
          ${effectiveCasePrice.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-md bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633] text-white text-base font-medium hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1 transition-colors"
          aria-label={`Add 1 case of ${cup.size} cups to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
