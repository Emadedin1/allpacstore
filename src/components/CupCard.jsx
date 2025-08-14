"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

// Prices you provided (authoritative for cups)
const CASE_PRICE_BY_SIZE = {
  "10 oz": 92,
  "12 oz": 94,
  "16 oz": 96,
  "22 oz": 88,
  "32 oz": 90,
};

// Normalize assorted size formats to "## oz"
function normalizeSize(raw) {
  if (!raw) return "";
  const m = String(raw).match(/(\d+)\s*oz/i);
  return m ? `${m[1]} oz` : String(raw).trim();
}

export default function CupCard({ cup }) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const sizeKey = normalizeSize(cup.size);
  const qtyPerCase = cup.qtyCase || 1000;

  const effectiveCasePrice =
    CASE_PRICE_BY_SIZE[sizeKey] !== undefined
      ? CASE_PRICE_BY_SIZE[sizeKey]
      : (cup.priceCase ?? 0);

  const pricePerCup = qtyPerCase ? effectiveCasePrice / qtyPerCase : 0;

  function goToDetails() {
    router.push(`/products/${cup.slug}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetails();
    }
  }

  function handleAddToCart(e) {
    e.stopPropagation();
    addItem(
      {
        ...cup,
        size: sizeKey || cup.size,
        priceCase: effectiveCasePrice,
        qtyCase: qtyPerCase,
      },
      qtyPerCase,
      null,
      "",
      undefined,
      pricePerCup
    );
    openCart();
  }

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
      aria-label={`${sizeKey} cup details`}
    >
      {/* Square image */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={cup.image}
          alt={`${sizeKey} cup`}
            fill
          quality={100}
          sizes="(max-width:640px) 45vw, (max-width:1024px) 25vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] transform-gpu"
          draggable={false}
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <p className="text-[13px] sm:text-sm font-medium text-gray-900 leading-snug text-center">
          {qtyPerCase.toLocaleString()} cups | {sizeKey || cup.size}
          <span className="font-normal text-gray-700 block">
            {cup.description || DEFAULT_DESCRIPTOR}
          </span>
        </p>

        <p className="text-base sm:text-lg font-semibold text-gray-900 text-center">
          ${effectiveCasePrice.toFixed(2)}
          {/* Uncomment if you want to show per-cup:
          <span className="ml-1 text-xs text-gray-500">
            (${pricePerCup.toFixed(4)}/cup)
          </span>
          */}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            mt-auto inline-flex h-9 sm:h-10 w-full items-center justify-center
            rounded-md bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]
            text-white text-[14px] sm:text-[15px] font-medium
            hover:shadow-sm focus:outline-none
            focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
            transition-colors
          "
          aria-label={`Add 1 case of ${sizeKey} cups to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
