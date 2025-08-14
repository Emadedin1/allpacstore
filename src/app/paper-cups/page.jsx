"use client";

import React from "react";

// Core case prices you provided earlier
const CASE_PRICE_BY_SIZE = {
  "10 oz": 92.0,
  "12 oz": 94.0,
  "16 oz": 96.0,
  "22 oz": 88.0,
  "32 oz": 90.0,
};

// Helper to format a price if we have it, otherwise fall back to the original string
function formatPrice(size, fallback) {
  const key = size.replace(/\.$/, ""); // remove trailing period in table size labels
  const price = CASE_PRICE_BY_SIZE[key];
  if (price == null) return fallback; // keep original if no override
  return `$${price.toFixed(2)}`; // single price display
}

export default function PaperCupsPage() {
  // Original rows (model, size, qty, originalPriceString)
  const whiteRows = [
    ["S-25080", "4 oz.", "1,000", "$98 / $94"],
    ["S-25081", "6 oz.", "1,000", "$104 / $100"],
  ];

  const specifyColorRows = [
    ["S-20104", "8 oz.", "1,000", "$113 / $109"],
    ["S-20105", "10 oz.", "1,000", "$125 / $120"],
    ["S-20106", "12 oz.", "1,000", "$152 / $145"],
    ["S-20107", "16 oz.", "1,000", "$180 / $172"],
    ["S-23127", "20 oz.", "800", "$218 / $210"],
    ["S-25957", "24 oz.", "500", "$153 / $146"],
  ];

  const lidRows = [
    ["S-25083", "White Lid", "6 oz.", "1,000", "$67 / $65"],
    ["S-20108", "White Lid", "8 oz.", "1,000", "$78 / $76"],
    ["S-20109", "White Lid", "10–24 oz.", "1,200", "$104 / $101"],
  ];

  const sleeveRows = [
    ["S-18443", "Kraft Sleeve", "12–20 oz. cups", "500", "$56 / $52"],
  ];

  return (
    <div className="p-6 space-y-10">
      {/* PAPER HOT CUPS */}
      <section>
        <h1 className="text-2xl font-bold mb-4">ULINE PAPER HOT CUPS</h1>
        <table className="w-full border border-collapse mb-6 text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">MODEL NO.</th>
              <th className="border p-2">DESCRIPTION</th>
              <th className="border p-2">SIZE</th>
              <th className="border p-2">QTY./CASE</th>
              <th className="border p-2">PRICE PER CASE</th>
              <th className="border p-2">ADD TO CART</th>
            </tr>
          </thead>
          <tbody>
            {/* White Cups */}
            {whiteRows.map(([model, size, qty, original], idx) => (
              <tr key={model}>
                <td className="border p-2 text-blue-600">{model}</td>
                {idx === 0 && (
                  <td className="border p-2" rowSpan={whiteRows.length}>
                    White
                  </td>
                )}
                <td className="border p-2">{size}</td>
                <td className="border p-2">{qty}</td>
                <td className="border p-2">
                  {formatPrice(size, original)}
                </td>
                <td className="border p-2">
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-14 border mr-2 rounded px-1 py-0.5"
                      defaultValue={1}
                      min={1}
                    />
                    <button className="border px-2 py-0.5 rounded bg-white hover:bg-gray-100 text-xs">
                      ADD
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Specify Color Cups */}
            {specifyColorRows.map(([model, size, qty, original], idx) => (
              <tr key={model}>
                <td className="border p-2 text-blue-600">{model}</td>
                {idx === 0 && (
                  <td className="border p-2" rowSpan={specifyColorRows.length}>
                    Specify Color
                  </td>
                )}
                <td className="border p-2">{size}</td>
                <td className="border p-2">{qty}</td>
                <td className="border p-2">
                  {formatPrice(size, original)}
                </td>
                <td className="border p-2 text-blue-600 underline cursor-pointer">
                  Specify Color
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend / Note */}
        <p className="text-xs text-gray-600">
          Prices shown reflect your current standard case pricing. Sizes without updated values retain original list pricing.
          Provide prices for 4 oz, 6 oz, 8 oz, 20 oz, 24 oz if you would like those overridden too (and a second discount tier if needed).
        </p>
      </section>

      {/* HOT CUP LIDS */}
      <section>
        <h1 className="text-2xl font-bold mb-4">ULINE PAPER HOT CUP LIDS</h1>
        <table className="w-full border border-collapse mb-6 text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">MODEL NO.</th>
              <th className="border p-2">DESCRIPTION</th>
              <th className="border p-2">SIZE</th>
              <th className="border p-2">QTY./CASE</th>
              <th className="border p-2">PRICE PER CASE</th>
              <th className="border p-2">ADD TO CART</th>
            </tr>
          </thead>
          <tbody>
            {lidRows.map(([model, desc, size, qty, original]) => (
              <tr key={model}>
                <td className="border p-2 text-blue-600">{model}</td>
                <td className="border p-2">{desc}</td>
                <td className="border p-2">{size}</td>
                <td className="border p-2">{qty}</td>
                <td className="border p-2">
                  {/* If lids share pricing logic later, add a mapping similar to cups */}
                  {original}
                </td>
                <td className="border p-2">
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-14 border mr-2 rounded px-1 py-0.5"
                      defaultValue={1}
                      min={1}
                    />
                    <button className="border px-2 py-0.5 rounded bg-white hover:bg-gray-100 text-xs">
                      ADD
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* HOT CUP SLEEVES */}
      <section>
        <h1 className="text-2xl font-bold mb-4">HOT CUP SLEEVES</h1>
        <table className="w-full border border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">MODEL NO.</th>
              <th className="border p-2">DESCRIPTION</th>
              <th className="border p-2">FITS</th>
              <th className="border p-2">QTY./CASE</th>
              <th className="border p-2">PRICE PER CASE</th>
              <th className="border p-2">ADD TO CART</th>
            </tr>
          </thead>
            <tbody>
              {sleeveRows.map(([model, desc, fits, qty, price]) => (
                <tr key={model}>
                  <td className="border p-2 text-blue-600">{model}</td>
                  <td className="border p-2">{desc}</td>
                  <td className="border p-2">{fits}</td>
                  <td className="border p-2">{qty}</td>
                  <td className="border p-2">{price}</td>
                  <td className="border p-2">
                    <div className="flex items-center">
                      <input
                        type="number"
                        className="w-14 border mr-2 rounded px-1 py-0.5"
                        defaultValue={1}
                        min={1}
                      />
                      <button className="border px-2 py-0.5 rounded bg-white hover:bg-gray-100 text-xs">
                        ADD
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </section>
    </div>
  );
}
