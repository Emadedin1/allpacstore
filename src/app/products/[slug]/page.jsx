"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pricing } from "../../../utils/pricing";
import { useCart } from "../../../context/CartContext";
import { getProductBySlug, products } from "../../../data/products";
import Cup3DPreview from "../../../components/Cup3DPreview";

const DEFAULT_DESCRIPTOR = "Blank Single-Walled Paper Cup";
const CASE_PRICE_OVERRIDE = {
  "10 oz": 51.5,
  "12 oz": 56.5,
  "16 oz": 65.0,
  "22 oz": 88.0,
  "32 oz": 124.5,
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

// Modern swipeable gallery for image/3D with arrows
function ProductGallery({ imageSrc, imageAlt, slug }) {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      type: "image",
      content: (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          quality={100}
          sizes="(max-width: 640px) 90vw, (max-width: 1100px) 50vw, 600px"
          className="object-cover w-full h-full select-none transition-opacity duration-300"
        />
      ),
    },
    {
      type: "3d",
      content: (
        <Cup3DPreview
          modelURL={`/models/${slug}.glb`}
          textureURL={"/textures/plain-white.png"}
        />
      ),
    },
  ];

  // Touch swipe handlers
  let touchStartX = null;
  let touchEndX = null;
  function onTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  function onTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX !== null && touchEndX !== null) {
      if (touchEndX - touchStartX > 40) setIndex((p) => Math.max(0, p - 1));
      if (touchStartX - touchEndX > 40) setIndex((p) => Math.min(slides.length - 1, p + 1));
    }
    touchStartX = null;
    touchEndX = null;
  }
  function goTo(idx) {
    setIndex(idx);
  }
  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setIndex((i) => Math.min(slides.length - 1, i + 1));
  }

  return (
    <div className="relative w-full aspect-square bg-gray-50 rounded-xl ring-1 ring-black/5 overflow-hidden mb-3 select-none">
      <div
        className="absolute inset-0 flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides[index].content}
      </div>
      {/* Arrows */}
      <button
        aria-label="Previous image"
        onClick={prev}
        disabled={index === 0}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full shadow-md border border-gray-200 w-9 h-9 flex items-center justify-center transition
        ${index === 0 ? "opacity-60 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
        style={{ backdropFilter: "blur(4px)" }}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M13.75 17.417 8.333 12l5.417-5.417" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button
        aria-label="Next image"
        onClick={next}
        disabled={index === slides.length - 1}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full shadow-md border border-gray-200 w-9 h-9 flex items-center justify-center transition
        ${index === slides.length - 1 ? "opacity-60 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
        style={{ backdropFilter: "blur(4px)" }}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M8.25 17.417 13.667 12 8.25 6.583" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full border border-gray-300 transition ${index === i ? "bg-[#28a745]" : "bg-white"}`}
            aria-label={i === 0 ? "Product image" : "3D Preview"}
          />
        ))}
      </div>
    </div>
  );
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
  const [caseInput, setCaseInput] = useState("1");

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

  // Description/Material/Dimensions drop-downs
  const specs = [
    { label: "Description", content: product.specs.Description || [] },
    { label: "Material", content: product.specs.Material || [] },
    { label: "Dimensions", content: product.specs.Dimensions || [] },
  ];
  const [openSections, setOpenSections] = useState(
    specs.reduce((acc, s) => ({ ...acc, [s.label]: false }), {})
  );
  const toggle = (label) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  const pageTitle = buildTitle(product);

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/2 space-y-4">
          {/* Product gallery with main image & 3D as swipeable */}
          <ProductGallery
            imageSrc={product.imageHiRes || product.image}
            imageAlt={pageTitle}
            slug={slug}
          />
          {/* Pricing table stays below for desktop */}
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
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{pageTitle}</h1>
              <p className="text-gray-600 text-sm">{product.desc}</p>
              <p className="text-lg font-semibold">${casePrice.toFixed(2)}/case</p>
            </div>

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
                      ? "bg-[#28a745]/60 cursor-not-allowed"
                      : "bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34]"
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
                    text-center bg-white text-[#28a745]
                    font-semibold font-mono tabular-nums text-base
                    leading-none p-0
                    outline-none focus:outline-none focus:ring-0
                    cursor-text
                    selection:bg-[#28a745]/20
                  "
                />

                <button
                  type="button"
                  aria-label="Increase quantity (one case)"
                  onClick={() => bump(1)}
                  className="w-10 h-10 grid place-items-center bg-[#28a745] text-white text-lg select-none hover:bg-[#196D3D] active:bg-[#145633] cursor-pointer focus:outline-none"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-600">
                {caseQty} cups per case (total cups: {qty.toLocaleString()})
              </p>
              <p className="font-semibold text-sm">Subtotal: ${subtotal}</p>
              <button
                onClick={handleAdd}
                className="w-full mt-1 py-2 rounded-lg text-sm font-semibold bg-[#28a745] text-white hover:bg-[#218838] active:bg-[#1e7e34] cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* OVERVIEW - now right below Add to Cart */}
          <div className="bg-gray-100 rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-700 mb-2">{product.desc}</p>
            <p className="text-gray-700 mb-1">
              <strong>Material:</strong> Food-grade paperboard with PLA lining
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Case Qty:</strong> {product.qtyCase} cups
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Case Price:</strong> ${casePrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Minimum order quantity is 1 case.</p>
          </div>

          {/* Collapsible Specs - clean with fully rounded bottom */}
<div className="space-y-4">
  {specs.map(({ label, content }) => {
    const isOpen = openSections[label];
    return (
      <div
        key={label}
        className={`bg-white border border-gray-200 shadow-sm transition ${
          isOpen
            ? "rounded-t-lg rounded-b-lg"
            : "rounded-lg"
        }`}
      >
        <button
          onClick={() => toggle(label)}
          className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 transition text-base rounded-lg"
          style={{ border: "none" }}
        >
          <span className="font-medium">{label}</span>
          <span
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        <div
          className={`px-4 overflow-hidden transition-[max-height] duration-300 text-gray-700 text-sm bg-white ${
            isOpen ? "max-h-48 py-3 rounded-b-lg" : "max-h-0 py-0"
          }`}
          style={{
            borderTop: "1px solid #f3f4f6",
          }}
        >
          {content.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    );
  })}
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
                        src={p.imageHiRes || p.image}
                        alt={displayTitle}
                        fill
                        quality={100}
                        sizes="230px"
                        className="
                          object-cover
                          w-full h-full
                          transform-gpu
                          transition-transform duration-300
                        "
                        priority={false}
                      />
                    </div>
                    <div className="p-3 flex flex-col gap-2">
                      <p className="text-[13px] font-medium text-gray-900 leading-snug text-center">
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
                        cursor-pointer
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
