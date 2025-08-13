"use client";

import { pricing } from "../../../utils/pricing";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import { getProductBySlug, products } from "../../../data/products";
import Cup3DPreview from "../../../components/Cup3DPreview";

// Match CupCard's behavior for case pricing overrides
const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";
const CASE_PRICE_BY_SIZE = {
  "10 oz": 92,
  "12 oz": 94,
  "16 oz": 96,
  "22 oz": 88,
  "32 oz": 90,
};

// Robust size extraction: prefer entity.size, else parse name, else slug
function getSizeText(entity) {
  if (entity?.size) {
    // Ensure it includes "oz"
    return /oz/i.test(entity.size) ? entity.size : `${entity.size} oz`;
  }
  const fromName = entity?.name?.match(/(\d+)\s*oz/i);
  if (fromName?.[1]) return `${fromName[1]} oz`;
  const fromSlug = entity?.slug?.match(/(\d+)/);
  if (fromSlug?.[1]) return `${fromSlug[1]} oz`;
  return "";
}

function buildTitle(entity) {
  const sizeText = getSizeText(entity);
  const qtyPerCase = entity?.qtyCase || 1000;
  return `${qtyPerCase} cups | ${sizeText} ${DEFAULT_DESCRIPTOR}`.replace("  ", " ");
}

export default function ProductPage({ params: { slug } }) {
  // 1) Lookup product
  const product = getProductBySlug(slug);
  if (!product) return <div className="p-4">Product not found.</div>;

  // Cups per case
  const caseQty = product.qtyCase || 1000;

  // 2) Cart & UI state
  const { addItem, openCart, isOpen } = useCart();
  const [designType, setDesignType] = useState("Plain White");
  const [designFile, setDesignFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  // Default to one full case so Add to Cart is clickable immediately
  const [qty, setQty] = useState(caseQty);

  // 3) Pricing & texture/model URLs
  const { plain, custom } = pricing[slug];
  const pricePerCup = designType === "Plain White" ? plain : custom;
  const subtotal = qty ? (pricePerCup * Number(qty)).toFixed(2) : "0.00";

  const currentCases = Math.max(1, Math.round((Number(qty) || 0) / caseQty));

  const TEXTURES = {
    "Plain White": "/textures/plain-white.png",
    "Preset A": "/textures/preset-a.png",
    "Preset B": "/textures/preset-b.png",
  };

  const modelURL = `/models/${slug}.glb`;
  const textureURL = designType === "Custom" ? previewURL : TEXTURES[designType];

  // 4) Handlers
  const handleAdd = () => {
    // Normalize product before adding to cart so size is always present and title is correct
    const sizeText = getSizeText(product);
    const normalized = {
      ...product,
      size: sizeText,
      qtyCase: caseQty,
      // Set the name to the desired display for cart
      name: buildTitle({ ...product, size: sizeText, qtyCase: caseQty }),
    };

    addItem(
      normalized,
      Number(qty),
      designFile,
      previewURL,
      designType,
      pricePerCup
    );
    if (!isOpen) openCart();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image/")) {
      setDesignFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  // Helper: add ONE CASE for a given product card (like CupCard)
  const addCaseToCart = (cup) => {
    const sizeText = getSizeText(cup);
    const qtyPerCase = cup.qtyCase || 1000;

    const effectiveCasePrice =
      CASE_PRICE_BY_SIZE[sizeText] !== undefined
        ? CASE_PRICE_BY_SIZE[sizeText]
        : cup.priceCase;

    const perCup = effectiveCasePrice / qtyPerCase;

    const normalized = {
      ...cup,
      size: sizeText,
      qtyCase: qtyPerCase,
      priceCase: effectiveCasePrice,
      // Ensure cart shows desired title
      name: buildTitle({ ...cup, size: sizeText, qtyCase: qtyPerCase }),
    };

    addItem(
      normalized,
      qtyPerCase, // add one full case
      null,
      "",
      undefined,
      perCup
    );
    openCart();
  };

  // 5) Specs panels
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

  // Build display title in requested format for this product page
  const pageTitle = buildTitle(product);

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* ── TOP SECTION ── */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image + desktop Overview */}
        <div className="md:w-1/2 space-y-4">
          <Image
            src={product.image}
            alt={pageTitle}
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

          {/* Pricing Breakdown Table */}
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
                      {key.replace(/(\d+)(oz)/, "$1 oz")}
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
            <h1 className="text-2xl sm:text-3xl font-bold">{pageTitle}</h1>
            <p className="text-gray-600 text-sm">{product.desc}</p>
            <p className="text-lg font-semibold">
              ${pricePerCup.toFixed(3)}/cup — ${product.priceCase}/case
            </p>
          </div>

          {/* Design Type */}
          <fieldset className="space-y-2">
            <legend className="font-medium">Design Type</legend>
            <div className="flex gap-6">
              {["Plain White", "Preset A", "Preset B", "Custom"].map((opt) => (
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

            {designType === "Custom" && (
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
                    <span className="text-sm">{designFile?.name}</span>
                  </div>
                )}
              </div>
            )}
          </fieldset>

          {/* Quantity & Add */}
          <div className="space-y-2">
            <label className="block font-medium text-sm">Quantity</label>

            <div
              className="inline-flex items-center overflow-hidden rounded-full shadow-sm"
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
                disabled={currentCases <= 1}
                className={`w-10 h-10 grid place-items-center text-white text-lg select-none ${
                  currentCases <= 1
                    ? "bg-[#1F8248]/60 cursor-not-allowed"
                    : "bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633] cursor-pointer"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1`}
              >
                −
              </button>

              <div
                aria-live="polite"
                className="w-12 h-10 grid place-items-center bg-white text-[#1F8248] font-semibold font-mono tabular-nums select-none"
              >
                {currentCases}
              </div>

              <button
                type="button"
                aria-label="Increase quantity (one case)"
                onClick={() => {
                  const next = currentCases + 1;
                  setQty(next * caseQty);
                }}
                className="w-10 h-10 grid place-items-center bg-[#1F8248] text-white text-lg select-none hover:bg-[#196D3D] active:bg-[#145633] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1"
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
              disabled={designType === "Custom" && !designFile}
              className={`w-full py-2 rounded-lg text-sm font-semibold ${
                designType !== "Custom" || designFile
                  ? "bg-[#196D3D] text-white hover:bg-[#145633] active:bg-[#145633]"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
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
                    className={`transform transition-transform duration-200 ${
                      openSections[label] ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-4 overflow-hidden transition-[max-height] duration-300 ${
                    openSections[label] ? "max-h-48 py-3" : "max-h-0 py-0"
                  }`}
                >
                  {content.map((line, i) => (
                    <p key={i} className="text-gray-700 text-sm">
                      {line}
                    </p>
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

      {/* ── OTHER PRODUCTS CAROUSEL (reverted look + Add to Cart in each card) ── */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Other Products</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {products
            .filter((p) => p.slug !== slug)
            .map((p) => {
              const sizeText = getSizeText(p);
              const qtyPerCase = p.qtyCase || 1000;
              const effectiveCasePrice =
                CASE_PRICE_BY_SIZE[sizeText] !== undefined
                  ? CASE_PRICE_BY_SIZE[sizeText]
                  : p.priceCase;

              const displayTitle = buildTitle({ ...p, size: sizeText });

              return (
                <div
                  key={p.slug}
                  className="
                    snap-start group flex-shrink-0 w-56
                    bg-white rounded-2xl shadow-sm hover:shadow-md transition
                    ring-1 ring-black/5 hover:ring-black/10
                    focus-within:ring-2 focus-within:ring-black/10
                    flex flex-col
                  "
                >
                  {/* Clickable area to go to details */}
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex-1 rounded-2xl overflow-hidden focus:outline-none"
                  >
                    {/* Image well — matches main CupCard */}
                    <div className="relative w-full h-44 sm:h-48 bg-gray-50 rounded-t-2xl overflow-hidden">
                      <Image
                        src={p.image}
                        alt={displayTitle}
                        fill
                        sizes="(max-width: 640px) 224px, 224px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        priority={false}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 leading-snug text-center">
                        {displayTitle}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 text-center mt-2">
                        ${effectiveCasePrice.toFixed(2)}
                      </p>
                    </div>
                  </Link>

                  {/* Add Case Button — same style as CupCard, stops navigation */}
                  <div className="px-3 pb-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addCaseToCart(p);
                      }}
                      className="
                        inline-flex h-10 w-full items-center justify-center
                        rounded-md
                        bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]
                        text-white text-base font-medium
                        hover:shadow-sm
                        cursor-pointer
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                        transition-colors
                      "
                      aria-label={`Add 1 case of ${sizeText} cups to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
