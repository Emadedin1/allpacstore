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

  const pageTitle = buildTitle(product);

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-6 space-y-8">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden">
        <Image
          src={product.imageHiRes || product.image}
          alt={pageTitle}
          fill
          priority
          quality={100}
          sizes="(max-width: 640px) 90vw, 600px"
          className="object-cover w-full h-full select-none transition-opacity duration-300"
        />
      </div>

      {/* Title, Price, Quantity, Add to Cart */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">{pageTitle}</h1>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-[#28a745]">${casePrice.toFixed(2)}</span>
          <span className="text-base font-medium text-gray-500">per case</span>
        </div>
        <span className="block text-sm text-gray-400">
          ({caseQty} cups per case · ${pricePerCup.toFixed(3)}/cup)
        </span>

        {/* Quantity Selector */}
        <div className="flex flex-col items-start gap-1 mt-4 w-full max-w-xs">
          <label className="block font-medium text-sm mb-1">Quantity (cases)</label>
          <div className="flex items-center gap-2 w-full">
            <div className="inline-flex items-center rounded-full overflow-hidden border bg-white shadow w-28">
              <button
                type="button"
                aria-label="Decrease quantity (one case)"
                onClick={() => bump(-1)}
                disabled={selectedCases <= 1}
                className={`w-9 h-9 grid place-items-center text-white text-lg select-none ${
                  selectedCases <= 1
                    ? "bg-[#28a745]/60 cursor-not-allowed"
                    : "bg-[#28a745] hover:bg-[#218838] active:bg-[#1e7e34]"
                } focus:outline-none transition`}
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
                className="appearance-none w-10 h-9 text-center bg-white text-[#28a745] font-semibold font-mono tabular-nums text-base outline-none"
              />
              <button
                type="button"
                aria-label="Increase quantity (one case)"
                onClick={() => bump(1)}
                className="w-9 h-9 grid place-items-center bg-[#28a745] text-white text-lg select-none hover:bg-[#218838] active:bg-[#1e7e34] cursor-pointer focus:outline-none transition"
              >
                +
              </button>
            </div>
            {/* Case info beside on desktop, below on mobile */}
            <span className="hidden sm:inline text-xs text-gray-600">
              {caseQty} cups per case (total: {qty.toLocaleString()} cups)
            </span>
          </div>
          {/* Show case info below controls on mobile */}
          <span className="sm:hidden text-xs text-gray-600">
            {caseQty} cups per case (total: {qty.toLocaleString()} cups)
          </span>
          <span className="font-semibold text-sm text-gray-800 mt-1">
            Subtotal: ${subtotal}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-3 py-3 rounded-lg text-base font-semibold bg-[#28a745] text-white hover:bg-[#218838] active:bg-[#1e7e34] cursor-pointer transition"
        >
          Add to Cart
        </button>
      </section>

      {/* Overview Section */}
      <section className="bg-gray-100 rounded-lg p-6 shadow">
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
        <p className="text-sm text-gray-600">
          Minimum order quantity is 1 case.
        </p>
      </section>

      {/* Description/Specs Section */}
      <section className="bg-white rounded-lg p-6 shadow">
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
      </section>

      {/* 3D Preview */}
      <section className="rounded-xl bg-gray-50 p-0 min-h-[200px] flex items-center justify-center shadow">
        <Cup3DPreview
          modelURL={`/models/${slug}.glb`}
          textureURL={"/textures/plain-white.png"}
        />
      </section>

      {/* Other Products */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Other Products</h2>
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
                        className="object-cover w-full h-full transform-gpu transition-transform duration-300"
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
                      className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#1F8248] hover:bg-[#196D3D] active:bg-[#145633] text-white text-sm font-medium hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145633] focus-visible:ring-offset-1 transition-colors cursor-pointer"
                      aria-label={`Add 1 case of ${sizeTextInner} cups to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
}
