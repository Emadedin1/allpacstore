// src/app/products/page.jsx
"use client";

import ProductSections from "../../components/ProductSections";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-black py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Our Cup Selection</h1>
        <Link href="/" className="text-blue-600 hover:underline whitespace-nowrap">
          &larr; Back to Home
        </Link>
      </div>

      {/* Product Grid */}
      <section id="product-sections">
        <ProductSections />
      </section>

      <section className="mt-10 bg-gray-100 text-black py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-left">

          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">1</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Choose Cup Size</h3>
              <p className="text-sm">Pick from hot or cold cups in 5 size options.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">2</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Upload Your Design</h3>
              <p className="text-sm">Easily upload your logo or artwork — we’ll take care of the rest.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">3</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Add to Cart</h3>
              <p className="text-sm">Select your quantity and checkout — we print & deliver.</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
