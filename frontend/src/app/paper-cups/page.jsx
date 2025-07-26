"use client";

import React from "react";

export default function PaperCupsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ULINE PAPER HOT CUPS</h1>
      <table className="w-full border border-collapse mb-10 text-sm">
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
          <tr>
            <td className="border p-2 text-blue-600">S-25080</td>
            <td className="border p-2" rowSpan={2}>White</td>
            <td className="border p-2">4 oz.</td>
            <td className="border p-2">1,000</td>
            <td className="border p-2">$98 / $94</td>
            <td className="border p-2"><input type="number" className="w-12 border mr-2" defaultValue={1} /><button className="border px-2">ADD</button></td>
          </tr>
          <tr>
            <td className="border p-2 text-blue-600">S-25081</td>
            <td className="border p-2">6 oz.</td>
            <td className="border p-2">1,000</td>
            <td className="border p-2">$104 / $100</td>
            <td className="border p-2"><input type="number" className="w-12 border mr-2" defaultValue={1} /><button className="border px-2">ADD</button></td>
          </tr>

          {/* Specify Color Cups */}
          {[
            ["S-20104", "8 oz.", "1,000", "$113 / $109"],
            ["S-20105", "10 oz.", "1,000", "$125 / $120"],
            ["S-20106", "12 oz.", "1,000", "$152 / $145"],
            ["S-20107", "16 oz.", "1,000", "$180 / $172"],
            ["S-23127", "20 oz.", "800", "$218 / $210"],
            ["S-25957", "24 oz.", "500", "$153 / $146"],
          ].map(([model, size, qty, price], i) => (
            <tr key={model}>
              <td className="border p-2 text-blue-600">{model}</td>
              {i === 0 && <td className="border p-2" rowSpan={6}>Specify Color</td>}
              <td className="border p-2">{size}</td>
              <td className="border p-2">{qty}</td>
              <td className="border p-2">{price}</td>
              <td className="border p-2 text-blue-600 underline cursor-pointer">Specify Color</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* HOT CUP LIDS */}
      <h1 className="text-2xl font-bold mb-4">ULINE PAPER HOT CUP LIDS</h1>
      <table className="w-full border border-collapse mb-10 text-sm">
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
          {[
            ["S-25083", "White Lid", "6 oz.", "1,000", "$67 / $65"],
            ["S-20108", "White Lid", "8 oz.", "1,000", "$78 / $76"],
            ["S-20109", "White Lid", "10–24 oz.", "1,200", "$104 / $101"],
          ].map(([model, desc, size, qty, price]) => (
            <tr key={model}>
              <td className="border p-2 text-blue-600">{model}</td>
              <td className="border p-2">{desc}</td>
              <td className="border p-2">{size}</td>
              <td className="border p-2">{qty}</td>
              <td className="border p-2">{price}</td>
              <td className="border p-2"><input type="number" className="w-12 border mr-2" defaultValue={1} /><button className="border px-2">ADD</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* HOT CUP SLEEVES */}
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
          <tr>
            <td className="border p-2 text-blue-600">S-18443</td>
            <td className="border p-2">Kraft Sleeve</td>
            <td className="border p-2">12–20 oz. cups</td>
            <td className="border p-2">500</td>
            <td className="border p-2">$56 / $52</td>
            <td className="border p-2"><input type="number" className="w-12 border mr-2" defaultValue={1} /><button className="border px-2">ADD</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
