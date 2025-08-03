"use client";

import { getProductBySlug } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";
import Image from "next/image";


export default function ProductPage({ params: { slug } }) {
  
  const product = getProductBySlug(slug);
  if (!product) return <div className="p-6">Product not found.</div>;

  // 3️⃣ Local UI state
  const [qty, setQty] = useState(500);
  const [designType, setDesignType] = useState("Plain White");
  const [designFile, setDesignFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const { addItem, openCart } = useCart();

  const pricePerCup = product.priceCase / product.qtyCase;
  const subtotal = qty * pricePerCup;

  // 4️⃣ Handlers
  const handleAdd = () => {
    addItem(product, qty, designFile, previewURL, designType);
    openCart();
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      setDesignFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* … your JSX here (image, details, select, input, button) … */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-md object-cover"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.desc}</p>
          <p className="text-lg font-semibold">
            ${pricePerCup.toFixed(3)}/cup — ${product.priceCase}/case
          </p>

          <div>
            <label className="block mb-1">Design Type</label>
            <select
              value={designType}
              onChange={(e) => {
                setDesignType(e.target.value);
                setDesignFile(null);
                setPreviewURL("");
              }}
              className="w-full border p-2 rounded-md"
            >
              <option>Plain White</option>
              <option>Preset A</option>
              <option>Preset B</option>
              <option>Custom</option>
            </select>

            {designType === "Custom" && (
              <div className="mt-2">
                <input type="file" accept="image/*" onChange={handleFileUpload} />
                {previewURL && (
                  <div className="flex items-center gap-2 mt-2">
                    <img src={previewURL} className="w-10 h-10 rounded" />
                    <span className="text-sm">{designFile.name}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              min={500}
              step={100}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full border p-2 rounded-md"
            />
            {qty < 500 && (
              <p className="text-red-600 text-sm mt-1">Minimum order is 500</p>
            )}
          </div>

          <p className="font-semibold">
            Subtotal: ${subtotal.toFixed(2)}
          </p>

          <button
            onClick={handleAdd}
            disabled={qty < 500 || (designType === "Custom" && !designFile)}
            className={`w-full py-2 rounded-md text-white font-semibold ${qty >= 500 && (designType !== "Custom" || designFile)
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
