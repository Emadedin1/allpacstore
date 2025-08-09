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
    // Add default MOQ; quantity adjustments happen in the cart
    addItem(cup, MIN_QTY, null, "", "Plain White");
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
          aria-label={`${cup.size} ${cup.type} details`}
        >
          <img
            src={cup.image}
            alt={`${cup.size} ${cup.type}`}
            className="w-full h-full object-cover"
          />
        </button>

        {/* Size badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
          {cup.size}
        </div>
      </div>

      {/* Minimal content: label, price, MOQ, Add to Cart */}
      <div className="p-3 flex flex-col gap-3">
        {/* Product label (clickable) */}
        <button
          type="button"
          onClick={goToDetails}
          className="text-left focus:outline-none focus:ring-0"
          aria-label={`${cup.size} ${cup.type} details`}
        >
          <h3 className="text-sm font-semibold text-gray-900">
            {cup.size} Cup
          </h3>
          {cup.type ? (
            <p className="text-xs text-gray-500 mt-0.5">{cup.type}</p>
          ) : null}
        </button>

        {/* Price with MOQ stacked underneath (clean on mobile) */}
        <div className="space-y-0.5">
          <p className="text-lg font-bold text-gray-900">
            ${pricePerCup.toFixed(3)}/Cup
          </p>
          <span className="text-xs text-gray-500">MOQ {MIN_QTY}</span>
        </div>

        {/* No quantity controls or subtotal on the card */}
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
