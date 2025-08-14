"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pricing } from "../../../utils/pricing"; // still imported if you reference elsewhere
import { useCart } from "../../../context/CartContext";
import { getProductBySlug, products } from "../../../data/products";
import Cup3DPreview from "../../../components/Cup3DPreview";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";

// Case prices you specified
const CASE_PRICE_OVERRIDE = {
  "10 oz": 41.50,
  "12 oz": 46.50,
  "16 oz": 60.0,
  "22 oz": 78.0,
  "32 oz": 114.50,
};

function getSizeText(entity) {
  if (entity?.size) return /oz/i.test(entity.size) ? entity.size : `${entity.size} oz`;
  const fromName = entity?.name?.match(/(\d+)\s*oz/i);
  if (fromName?.[1]) return `${fromName[1]} oz`;
  const fromSlug = entity?.slug?.match(/(\d+)/);
  if (fromSlug?.[1]) return `${fromSlug[1]} oz`;
  return "";
}

function buildTitle(entity) {
  const sizeText = getSizeText(entity);
  const qtyPerCase = entity?.qtyCase || 1000;
  return `${qtyPerCase} cups | ${sizeText} ${DEFAULT_DESCRIPTOR}`.replace("  ", " ").trim();
}

export default function ProductPage({ params: { slug } }) {
  const product = getProductBySlug(slug);
  if (!product) return <div className="p-4">Product not found.</div>;

  const caseQty = product.qtyCase || 1000;
  const sizeText = getSizeText(product);

  const casePrice =
    CASE_PRICE_OVERRIDE[sizeText] !== undefined
      ? CASE_PRICE_OVERRIDE[sizeText]
      : product.priceCase || 0;

  const pricePerCup = caseQty ? casePrice / caseQty : 0;

  const { addItem, openCart, isOpen } = useCart();

  // qty stored in cups
  const [qty, setQty] = useState(caseQty);
  const [caseInput, setCaseInput] = useState("1"); // buffer allowing blank

  const selectedCases = Math.max(1, Math.round(qty / caseQty));
  const subtotal = (casePrice * selectedCases).toFixed(2);

  function commitCases(raw) {
    let v = parseInt(raw, 10);
    if (isNaN(v) || v < 1) v = 1;
    setQty(v * caseQty);
    setCaseInput(String(v));
  }
  function handleCasesChange(e) {
    const raw = e.target.value.replace(/[^\d]/g, "");
    setCaseInput(raw);
  }
  function handleCasesBlur() {
    commitCases(caseInput);
  }
  function handleCasesKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitCases(caseInput);
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setCaseInput(String(selectedCases));
      e.currentTarget.blur();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const base = caseInput === "" ? selectedCases : parseInt(caseInput || "0", 10) || 0;
      const next = (base < 1 ? 1 : base) + 1;
      setQty(next * caseQty);
      setCaseInput(String(next));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const base = caseInput === "" ? selectedCases : parseInt(caseInput || "0", 10) || 0;
      const next = Math.max(1, (base < 1 ? 1 : base) - 1);
      setQty(next * caseQty);
      setCaseInput(String(next));
    }
  }
  function bump(delta) {
    const next = Math.max(1, selectedCases + delta);
    setQty(next * caseQty);
    setCaseInput(String(next));
  }

  function handleAdd() {
    const normalized = {
      ...product,
      size: sizeText,
      qtyCase: caseQty,
      priceCase: casePrice,
      pricePerCup,
      name: buildTitle({ ...product, size: sizeText, qtyCase: caseQty }),
      cases: selectedCases,
    };
    addItem(normalized, selectedCases * caseQty, null, "", undefined, pricePerCup);
    if (!isOpen) openCart();
  }

  function addCaseToCart(cup) {
    const sizeTextInner = getSizeText(cup);
    const qtyPerCase = cup.qtyCase || 1000;
    const effectiveCasePrice =
      CASE_PRICE_OVERRIDE[sizeTextInner] !== undefined
        ? CASE_PRICE_OVERRIDE[sizeTextInner]
        : cup.priceCase;
    const perCup = qtyPerCase ? effectiveCasePrice / qtyPerCase : 0;
    const normalized = {
      ...cup,
      size: sizeTextInner,
      qtyCase: qtyPerCase,
      priceCase: effectiveCasePrice,
      pricePerCup: perCup,
      name: buildTitle({ ...cup, size: sizeTextInner, qtyCase: qtyPerCase }),
      cases: 1,
    };
    addItem(normalized, qtyPerCase, null, "", undefined, perCup);
    openCart();
  }

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

  const pageTitle = buildTitle(product);

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
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
              <strong>Case Price:</strong> ${casePrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Minimum order quantity is 500 cups.</p>
          </div>
          <div className="hidden md:block bg-white rounded-lg p-6 shadow mt-6">
            <h3 className="text-lg font-semibold mb-3">Pricing Breakdown</h3>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-3 py-2 text-left">Size</th>
                  <th className="border px-3 py-2 text-left">Case Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(CASE_PRICE_OVERRIDE).map(([size, value]) => (
                  <tr key={size}>
                    <td className="border px-3 py-2">{size}</td>
                    <td className="border px-3 py-2">${value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 space-y-6">
          {/* Heading + Price + (moved) Quantity */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{pageTitle}</h1>
              <p className="text-gray-600 text-sm">{product.desc}</p>
              <p className="text-lg font-semibold">${casePrice.toFixed(2)}/case</p>
            </div>

            {/* Quantity moved up directly below price */}
            <div className="space-y-1">
              <label className="block font-medium text-sm">Quantity (cases)</label>
              <div
                className="inline-flex items-center overflow-hidden rounded-full shadow-sm"
                role="group"
                aria-label="Change quantity in cases"
              >
                <button
                  type="button"
                  aria-label="Decrease quantity (one case)"
                  onClick={() => bump(-1)}
                  disabled={selectedCases <= 1}
                  className={`w-10 h-10 grid place-items-center text-white text-lg select-none ${
                    selectedCases <= 1
                      ? "bg-[#1F8248]/60 cursor-not-allowed"
                      : "bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]"
                  } focus:outline-none`}
                >
                  −
                </button>

                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label="Number of cases"
                  value={caseInput}
                  onChange={handleCasesChange}
                  onBlur={handleCasesBlur}
                  onKeyDown={handleCasesKey}
                  className="
                    no-spinner appearance-none
                    w-12 h-10
                    text-center bg-white text-[#1F8248]
                    font-semibold font-mono tabular-nums text-base
                    leading-none p-0
                    outline-none focus:outline-none focus:ring-0
                    cursor-text
                    selection:bg-[#1F8248]/20
                  "
                />

                <button
                  type="button"
                  aria-label="Increase quantity (one case)"
                  onClick={() => bump(1)}
                  className="w-10 h-10 grid place-items-center bg-[#1F8248] text-white text-lg select-none hover:bg-[#196D3D] active:bg-[#145633] cursor-pointer focus:outline-none"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-600">
                {caseQty.toLocaleString()} cups per case (total cups: {qty.toLocaleString()})
              </p>
              <p className="font-semibold text-sm">
                Subtotal: ${subtotal}
              </p>
              <button
                onClick={handleAdd}
                className="w-full mt-1 py-2 rounded-lg text-sm font-semibold bg-[#196D3D] text-white hover:bg-[#145633] active:bg-[#145633]"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* 3D Preview */}
          <div className="w-full h-64 md:h-96">
            <Cup3DPreview
              modelURL={`/models/${slug}.glb`}
              textureURL={"/textures/plain-white.png"}
            />
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
              <strong>Case Price:</strong> ${casePrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Minimum order quantity is 500 cups.</p>
          </div>
        </div>
      </div>

      {/* OTHER PRODUCTS SLIDER */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Other Products</h2>
        <div
          className="
            flex gap-5
            overflow-x-auto hide-scrollbar
            pb-2
            snap-x snap-mandatory
            scroll-smooth
            [-webkit-overflow-scrolling:touch]
            [--other-card:195px]
            sm:[--other-card:198px]
            md:[--other-card:200px]
            lg:[--other-card:205px]
          "
        >
          {products
            .filter((p) => p.slug !== slug)
            .map((p) => {
              const sizeTextInner = getSizeText(p);
              const qtyPerCase = p.qtyCase || 1000;
              const effectiveCasePrice =
                CASE_PRICE_OVERRIDE[sizeTextInner] !== undefined
                  ? CASE_PRICE_OVERRIDE[sizeTextInner]
                  : p.priceCase;
              const displayTitle = buildTitle({ ...p, size: sizeTextInner });

              return (
                <div
                  key={p.slug}
                  className="
                    snap-start flex-shrink-0
                    w-[var(--other-card)]
                    bg-white rounded-2xl shadow-sm hover:shadow-md transition
                    ring-1 ring-black/5 hover:ring-black/10
                    focus-within:ring-2 focus-within:ring-black/10
                    flex flex-col
                  "
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex-1 rounded-2xl overflow-hidden focus:outline-none"
                  >
                    <div className="relative w-full aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
                      <Image
                        src={p.image}
                        alt={displayTitle}
                        fill
                        sizes="(max-width: 640px) 48vw, (max-width: 1024px) 200px, 205px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={false}
                      />
                    </div>
                    <div className="p-3 flex flex-col gap-2">
                      <p className="text-sm font-medium text-gray-900 leading-snug text-center">
                        {displayTitle}
                      </p>
                      <p className="text-base font-semibold text-gray-900 text-center">
                        ${effectiveCasePrice.toFixed(2)}
                      </p>
                    </div>
                  </Link>
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
                        rounded-md bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633]
                        text-white text-sm font-medium
                        hover:shadow-sm
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1
                        transition-colors
                      "
                      aria-label={`Add 1 case of ${sizeTextInner} cups to cart`}
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
