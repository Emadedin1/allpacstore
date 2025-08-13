"use client";

import { pricing } from "../../../utils/pricing";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import { getProductBySlug, products } from "../../../data/products";
import Cup3DPreview from "../../../components/Cup3DPreview";

export default function ProductPage({ params: { slug } }) {
  // 1️⃣ Lookup product
  const product = getProductBySlug(slug);
  if (!product) return <div className="p-4">Product not found.</div>;

  // 2️⃣ Cart & UI state
  const { addItem, openCart, isOpen } = useCart();
  const [designType, setDesignType] = useState("Plain White");
  const [designFile, setDesignFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [qty, setQty] = useState(""); // quantity in cups

  // 3️⃣ Pricing & texture/model URLs
  const { plain, custom } = pricing[slug];
  const pricePerCup = designType === "Plain White" ? plain : custom;
  const subtotal = qty ? (pricePerCup * Number(qty)).toFixed(2) : "0.00";

  // Cases (match cart control behavior)
  const caseQty = product.qtyCase || 1000; // cups per case
  const currentCases = Math.max(
    1,
    Math.round(((Number(qty) || 0) || 0) / caseQty) || (qty ? 1 : 1)
  );

  const TEXTURES = {
    "Plain White": "/textures/plain-white.png",
    "Preset A": "/textures/preset-a.png",
    "Preset B": "/textures/preset-b.png",
  };

  // load `<slug>.glb` from your `/public/models` folder
  const modelURL = `/models/${slug}.glb`;
  // if custom, use blob preview; otherwise pick from your presets
  const textureURL =
    designType === "Custom" ? previewURL : TEXTURES[designType];

  // 4️⃣ Handlers
  const handleAdd = () => {
    addItem(
      product,
      Number(qty),
      designFile,
      previewURL,
      designType,
      pricePerCup
    );
    // only open the drawer if it’s currently closed
    if (!isOpen) openCart();
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      setDesignFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  // 5️⃣ Specs panels
  const specs = [
    { label: "Description", content: product.desc.split(". ").filter(Boolean) },
    { label: "Material", content: [product.type] },
    { label: "Case Qty", content: [`${product.qtyCase} cups per case`] },
  ];
  const [openSections, setOpenSections] = useState(
    specs.reduce((acc, s) => ({ ...acc, [s.label]: false }), {})
  );
  const toggle = (label) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* ── TOP SECTION ── */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image + desktop Overview */}
        <div className="md:w-1/2 space-y-4">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg object-cover w-full"
            priority
          />
          <div className="hidden md:block bg-gray-100 rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-700 mb-2">{product.desc}</p>
            <p className="text-gray-700 mb-1">
              <strong>Material:</strong> {product.type}
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

          {/* Pricing Breakdown Table under Overview */}
          <div className="hidden md:block bg-white rounded-lg p-6 shadow mt-6">
            <h3 className="text-lg font-semibold mb-3">Pricing Breakdown</h3>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-3 py-2 text-left">Size</th>
                  <th className="border px-3 py-2 text-left">Plain White</th>
                  <th className="border px-3 py-2 text-left">Custom Design</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(pricing).map(([key, { plain, custom }]) => (
                  <tr key={key}>
                    <td className="border px-3 py-2">
                      {key.replace(/(\d+)(oz)/, '$1 oz')}
                    </td>
                    <td className="border px-3 py-2">${plain.toFixed(3)}/cup</td>
                    <td className="border px-3 py-2">${custom.toFixed(3)}/cup</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Form + 3D + panels + mobile Overview */}
        <div className="md:w-1/2 space-y-6">
          {/* Title & Price */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 text-sm">{product.desc}</p>
            <p className="text-lg font-semibold">
              ${pricePerCup.toFixed(3)}/cup — ${product.priceCase}/case
            </p>
          </div>

          {/* Design Type */}
          <fieldset className="space-y-2">
            <legend className="font-medium">Design Type</legend>
            <div className="flex gap-6">
              {['Plain White', 'Preset A', 'Preset B', 'Custom'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="design"
                    value={opt}
                    checked={designType === opt}
                    onChange={() => {
                      setDesignType(opt);
                      setPreviewURL("");
                      setDesignFile(null);
                    }}
                    className="w-5 h-5 border-2 rounded-full checked:bg-yellow-400"
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>

            {designType === 'Custom' && (
              <div className="mt-2 space-y-2">
                <label className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 cursor-pointer text-sm">
                  Upload Design
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-red-600 text-sm font-medium">
                  Notice: For best results, upload an image sized 1024×864 (or similar 6:5 ratio).
                </p>
                {previewURL && (
                  <div className="flex items-center gap-2">
                    <img src={previewURL} className="w-10 h-10 rounded" />
                    <span className="text-sm">{designFile.name}</span>
                  </div>
                )}
              </div>
            )}
          </fieldset>

          {/* Quantity & Add */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Quantity</label>

            {/* Quantity modifier (exactly like cart: cases +/-) */}
            <div
              className="
                inline-flex items-center overflow-hidden rounded-full
                shadow-sm
              "
              role="group"
              aria-label="Change quantity in cases"
            >
              <button
                type="button"
                aria-label="Decrease quantity (one case)"
                onClick={() => {
                  const next = Math.max(1, currentCases - 1);
                  setQty(next * caseQty);
                }}
                disabled={currentCases <= 1 || !qty}
                className={`
                  w-10 h-10 grid place-items-center
                  text-white text-lg select-none
                  ${
                    currentCases <= 1 || !qty
                      ? "bg-[#1F8248]/60 cursor-not-allowed"
                      : "bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633] cursor-pointer"
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                `}
              >
                −
              </button>

              <div
                aria-live="polite"
                className="
                  w-12 h-10 grid place-items-center
                  bg-white text-[#1F8248] font-semibold
                  font-mono tabular-nums select-none
                "
              >
                {qty ? currentCases : 1}
              </div>

              <button
                type="button"
                aria-label="Increase quantity (one case)"
                onClick={() => {
                  if (!qty) {
                    // first click sets to one case
                    setQty(caseQty);
                  } else {
                    const next = currentCases + 1;
                    setQty(next * caseQty);
                  }
                }}
                className="
                  w-10 h-10 grid place-items-center
                  bg-[#1F8248] text-white text-lg select-none
                  hover:bg-[#196D3D] active:bg-[#145633]
                  cursor-pointer
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                "
              >
                +
              </button>
            </div>

            <p className="text-xs text-gray-600">
              {caseQty.toLocaleString()} cups per case
            </p>

            <p className="font-semibold text-sm">Subtotal: ${subtotal}</p>
            <button
              onClick={handleAdd}
              disabled={
                !qty ||
                Number(qty) < 500 ||
                (designType === 'Custom' && !designFile)
              }
              className={`w-full py-2 rounded-lg text-sm font-semibold ${
                qty &&
                Number(qty) >= 500 &&
                (designType !== 'Custom' || designFile)
                  ? 'bg-[#196D3D] text-white hover:bg-[#145633] active:bg-[#145633]'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
          </div>

          {/* 3D Canvas */}
          <div className="w-full h-64 md:h-96">
            <Cup3DPreview modelURL={modelURL} textureURL={textureURL} />
          </div>

          {/* Collapsible Specs */}
          <div className="space-y-4">
            {specs.map(({ label, content }) => (
              <div key={label} className="border rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => toggle(label)}
                  className="w-full flex justify-between items-center px-4 py-2 bg-white hover:bg-gray-50 transition text-sm"
                >
                  <span className="font-medium">{label}</span>
                  <span
                    className={`transform transition-transform duration-200 ${openSections[label] ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-4 overflow-hidden transition-[max-height] duration-300 ${openSections[label] ? 'max-h-48 py-3' : 'max-h-0 py-0'
                    }`}
                >
                  {content.map((line, i) => (
                    <p key={i} className="text-gray-700 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Overview */}
          <div className="md:hidden bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 mb-2">{product.desc}</p>
            <p className="text-gray-700 mb-1">
              <strong>Material:</strong> {product.type}
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

      {/* ── OTHER PRODUCTS CAROUSEL ── */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Other Products</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {products
            .filter((p) => p.slug !== slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="flex flex-col bg-blue-50 rounded-xl shadow-md flex-shrink-0 w-60 hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-[180px]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={320}
                    height={180}
                    className="object-cover w-full h-full rounded-t-xl"
                  />
                </div>
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
