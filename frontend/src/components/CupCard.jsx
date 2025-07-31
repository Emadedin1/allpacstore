// src/components/CupCard.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CupCard({ cup }) {
  // ─── State & router ───
  const [caseQty, setCaseQty] = useState("");
  const [designType, setDesignType] = useState("Plain White");
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [showUploadPopup, setShowUploadPopup] = useState(false);




  // ─── Pricing logic ───
  const pricePerCup = cup.priceCase / cup.qtyCase;
  const subtotal = caseQty
    ? (caseQty * pricePerCup).toFixed(2)
    : "0.00";

  // ─── Stubbed cart actions ───
  function handleAddToCart(e) {
    e.stopPropagation();
    addItem(cup, Number(caseQty) || 1);
    openCart();
  }

  // design/navigation dropdown
  const designOptions = ["Plain White", "Preset A", "Preset B", "Custom"];

  // ─── Handlers ───
  const handleCardClick = () => {
    router.push(`/products/${cup.slug}`);
  };

  // ─── JSX ───
  return (

    <div className="
    flex flex-col md:flex-row items-stretch
    bg-blue-50 rounded-xl shadow-md overflow-hidden
    w-full max-w-[620px] sm:max-w-full
     hover:shadow-lg transition-shadow
  "
    >
      {/* Left: product image */}
      <div
        onClick={handleCardClick}
        className="w-full h-[220px] md:w-[220px] md:h-auto cursor-pointer"
      >
        <img
          src={cup.image}
          alt={`${cup.size} Cup`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right: all the text, price, input + button */}
      <div className="p-3 pr-10 flex flex-col justify-between flex-1 min-w-0">
        {/* Title / type / description */}
        <div>
          <h2
            onClick={handleCardClick}
            className="text-lg font-bold mb-1 cursor-pointer"
          >
            {cup.size} Cup
          </h2>
          <p
            onClick={handleCardClick}
            className="text-base mb-1 cursor-pointer">{cup.type}</p>
          <p
            onClick={handleCardClick}
            className="text-sm mb-4 cursor-pointer">{cup.desc}</p>
        </div>


        {/* Design selector */}
        <div className="p-1 pl-0" onClick={(e) => e.stopPropagation()}>
          <label htmlFor={`design-${cup.slug}`} className="block font-medium mb-1">
            Choose Design
          </label>
          <select
            id={`design-${cup.slug}`}
            value={designType}
            onChange={(e) => setDesignType(e.target.value)}
            className="w-full border p-2 rounded-md text-sm"
          >
            {designOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {designType === "Custom" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUploadPopup(true);
              }}
              className="mt-3 w-full bg-gray-600 text-white py-2 rounded-md hover:bg-green-700 cursor-pointer"
            >
              Upload Design
            </button>
          )}

        </div>

        {/* Price per cup & subtotal */}
        <div>
          <p className="text-2xl font-bold mb-1">
            ${pricePerCup.toFixed(3)}/Cup
          </p>
          <p className="text-sm font-semibold">
            Subtotal: ${subtotal}
          </p>
        </div>

        {/* Quantity input */}
        <input
          onClick={(e) => e.stopPropagation()}
          type="number"
          min={500}
          step={100}
          value={caseQty}
          onChange={(e) => setCaseQty(e.target.value)}
          placeholder="Qty (Min. 500)"
          className="mt-2 p-2 border border-gray-300 rounded-md text-sm"
        />

        {/* Show warning if less than 500 and not empty */}
        {caseQty && caseQty < 500 && (
          <p className="text-xs text-red-600 mt-1">Minimum order is 500 cups.</p>
        )}

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={caseQty < 500}
          className={`
    w-full py-2 mt-2 rounded-md font-semibold text-sm no-close
    ${caseQty >= 500 ? "bg-[#FFD814] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}
  `}
        >
          Add to Cart
        </button>

        {showUploadPopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-7xl max-h-3xl p-6 rounded-lg shadow-lg relative">
              {/* Close button */}
              <button
                onClick={() => setShowUploadPopup(false)}
                className="absolute top-2 right-3 text-gray-500 text-2xl font-bold hover:text-black"
              >
                ×
              </button>

              {/* Popup content */}
              <h2 className="text-xl font-semibold mb-4">Upload Your Custom Design</h2>
              <p className="text-sm text-gray-600">[Upload form will go here in the next steps]</p>
              {/* Upload Box */}
              <div
                className="border-2 border-dashed border-gray-300 h-100 rounded-md p-6 text-center relative bg-white hover:border-blue-400 transition"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    // TODO: handleFileUpload(file)
                    console.log("Dropped file:", file);
                  }
                }}
              >
                <p className="text-gray-600 mb-2">Drop your design here</p>

                <p className="text-sm text-gray-500 mb-2">
                  Required: <span className="font-semibold">1000 x 1000 px</span>
                </p>

                <label
                  htmlFor="file-upload"
                  className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                >
                  or Upload
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // TODO: handleFileUpload(file)
                      console.log("Selected file:", file);
                    }
                  }}
                />
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
