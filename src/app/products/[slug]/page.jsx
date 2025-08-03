"use client";

import { getProductBySlug, products } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({ params: { slug } }) {
  const product = getProductBySlug(slug);
  if (!product) return <div className="p-4">Product not found.</div>;

  const { addItem, openCart } = useCart();
  const [designType, setDesignType] = useState("Plain White");
  const [designFile, setDesignFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [qty, setQty] = useState("");

  const pricePerCup = product.priceCase / product.qtyCase;
  const subtotal = qty ? (pricePerCup * Number(qty)).toFixed(2) : "0.00";

  const handleAdd = () => {
    addItem(product, Number(qty), designFile, previewURL, designType);
    openCart();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      setDesignFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  // dynamic specs panels
  const specs = Object.entries(product.specs).map(
    ([label, lines]) => ({ label, content: lines })
  );
  const [openSections, setOpenSections] = useState(
    specs.reduce((acc, s) => ({ ...acc, [s.label]: false }), {})
  );
  const toggle = (label) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      {/* ————————————— Top: Image + Overview + Form ————————————— */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* LEFT: Image + desktop-only Overview */}
        <div className="md:w-1/2 space-y-4">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg object-cover w-full"
          />
          {/* Desktop Overview */}
          <div className="hidden md:block mt-6 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-700 mb-2">{product.desc}</p>
            <p className="text-gray-700 mb-1">
              <strong>Material:</strong> {product.specs.Material.join(", ")}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Case Qty:</strong> {product.qtyCase} cups
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Price / Case:</strong> ${product.priceCase.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Minimum order quantity is 500 cups.
            </p>
          </div>
        </div>

        {/* RIGHT: Form + panels + mobile Overview */}
        <div className="md:w-1/2 space-y-4">
          {/* Title & Price */}
          <h1 className="text-2xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm md:text-base">{product.desc}</p>
          <p className="text-lg md:text-xl font-semibold">
            ${pricePerCup.toFixed(3)}/cup — ${product.priceCase}/case
          </p>

          {/* Design Type */}
          <fieldset className="space-y-2">
            <legend className="font-medium">Design Type</legend>
            <div className="flex flex-wrap gap-4">
              {["Plain White", "Preset A", "Preset B", "Custom"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="design"
                    value={opt}
                    checked={designType === opt}
                    onChange={() => {
                      setDesignType(opt);
                      setDesignFile(null);
                      setPreviewURL("");
                    }}
                    className="w-5 h-5 border-2 rounded-full checked:bg-yellow-400"
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
            {designType === "Custom" && (
              <div className="mt-2">
                <label className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 cursor-pointer text-sm">
                  Upload Design
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </label>
                {previewURL && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={previewURL} className="w-10 h-10 rounded" />
                    <span className="text-sm">{designFile.name}</span>
                  </div>
                )}
              </div>
            )}
          </fieldset>

          {/* Qty + Add */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Quantity</label>
            <input
              type="number"
              min={500}
              step={100}
              value={qty}
              placeholder="Qty (Min. 500)"
              onChange={(e) => setQty(e.target.value)}
              className="w-24 md:w-32 border rounded p-2 text-sm"
            />
            <p className="font-semibold text-sm">Subtotal: ${subtotal}</p>
            <button
              onClick={handleAdd}
              disabled={
                !qty ||
                Number(qty) < 500 ||
                (designType === "Custom" && !designFile)
              }
              className={`w-full py-2 md:py-3 rounded-lg font-semibold text-sm ${
                qty &&
                Number(qty) >= 500 &&
                (designType !== "Custom" || designFile)
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
          </div>

          {/* 3D Preview */}
          <div className="mt-4 md:mt-6 w-full h-48 md:h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
            3D Preview Coming Soon
          </div>

          {/* Panels */}
          <div className="space-y-4 mt-6 md:mt-8">
            {specs.map(({ label, content }) => (
              <div
                key={label}
                className="border rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(label)}
                  className="w-full px-4 py-2 md:py-3 bg-white flex justify-between items-center hover:bg-gray-50 transition text-sm md:text-base"
                >
                  <span className="font-medium">{label}</span>
                  <span
                    className={`transform transition-transform duration-200 ${
                      openSections[label] ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-4 overflow-hidden transition-[max-height] duration-300 ${
                    openSections[label] ? "max-h-60 py-3" : "max-h-0 py-0"
                  }`}
                >
                  {content.map((line, i) => (
                    <p key={i} className="text-gray-700 text-sm md:text-base">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Overview (below panels) */}
          <div className="md:hidden mt-6 bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 mb-2">{product.desc}</p>
            <p className="text-gray-700 mb-1">
              <strong>Material:</strong> {product.specs.Material.join(", ")}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Case Qty:</strong> {product.qtyCase} cups
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Price / Case:</strong> ${product.priceCase.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Minimum order quantity is 500 cups.
            </p>
          </div>
        </div>
      </div>

      {/* ————————————— Bottom: Other Products Carousel ————————————— */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Other Products
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {products
            .filter((p) => p.slug !== slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="flex flex-col bg-blue-50 rounded-xl shadow-md flex-shrink-0 w-60 hover:shadow-lg transition-shadow"
              >
                {/* image */}
                <div className="w-full h-[180px] cursor-pointer">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={320}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* text */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-sm font-semibold mt-2">
                    ${(p.priceCase / p.qtyCase).toFixed(3)}/cup
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
