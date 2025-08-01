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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedDesign, setUploadedDesign] = useState(null); // file
  const [previewURL, setPreviewURL] = useState("");           // object URL
  const [confirmed, setConfirmed] = useState(false);          // confirmation flag
  const [isDragging, setIsDragging] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedDesign(file);
      setPreviewURL(URL.createObjectURL(file)); // show preview
    }
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

          {designType === "Custom" && confirmed && uploadedDesign && (
            <div className="mt-2 p-2 bg-white border rounded shadow-sm text-sm flex items-center gap-2">
              <img src={previewURL} alt="Design Preview" className="w-10 h-10 object-contain rounded border" />
              <span className="truncate max-w-[150px]">{uploadedDesign.name}</span>
            </div>
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
          disabled={
            caseQty < 500 ||
            (designType === "Custom" && !uploadedFile)
          }
          className={`
    w-full py-2 mt-2 rounded-md font-semibold text-sm no-close
    ${caseQty >= 500 && (designType !== "Custom" || uploadedFile)
              ? "bg-[#FFD814] cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
            }
  `}
        >
          Add to Cart
        </button>

        {showUploadPopup && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">

              {/* Close button */}
              <button
                onClick={() => setShowUploadPopup(false)}
                className="absolute top-3 right-4 text-gray-400 text-2xl font-bold hover:text-black cursor-pointer"
              >
                ×
              </button>

              {/* Popup content */}
              <h2 className="text-2xl font-semibold mb-4">Upload Your Custom Design</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please upload a square image (e.g. <strong>1000 x 1000 px</strong>) that will wrap around the paper cup.
              </p>

              {/* Upload Box */}
              <div
                className={`border-2 border-dashed rounded-md p-6 text-center min-h-[180px] mb-6 transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
                  }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setUploadedFile(file);
                    setPreviewURL(URL.createObjectURL(file));
                  }
                }}
              >
                {!previewURL ? (
                  <>
                    <p className="text-sm mb-2">Drop your design here</p>
                    <p className="text-xs text-gray-500 mb-1">
                      Required: <strong>1000 x 1000 px</strong>
                    </p>
                    <label
                      htmlFor="design-upload"
                      className="text-blue-600 text-sm cursor-pointer underline"
                    >
                      or Upload
                      <input
                        type="file"
                        id="design-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.type.startsWith("image/")) {
                            setUploadedFile(file);
                            setUploadedDesign(file);
                            setPreviewURL(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="w-100 h-100 object-contain mx-auto border rounded"
                    />
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setPreviewURL("");
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {designType === "Custom" && !uploadedFile && (
                <p className="text-xs text-red-600 mt-2">
                  Please upload a design before adding to cart.
                </p>
              )}

              {/* Placeholder for 3D Preview */}
              <div className="w-full h-48 bg-gray-100 rounded-md mb-6 flex items-center justify-center text-gray-400">
                (3D Preview Coming Soon)
              </div>

              {/* Confirm Button */}
              <button
                onClick={() => {
                  if (uploadedDesign) {
                    setConfirmed(true);             // ✅ mark design as confirmed
                    setShowUploadPopup(false);     // ✅ close popup
                  }
                }}
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Confirm Upload
              </button>


            </div>
          </div>
        )}

      </div>
    </div>
  );
}
