"use client";

import ProductSections from "../../components/ProductSections";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <div className="p-6 space-y-8">
        {/* Heading Row */}
        <div className="max-w-4xl mx-auto flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold mb-2">Our Cup Selection</h1>
          <Link href="/" className="text-blue-600 hover:underline whitespace-nowrap">
            &larr; Back to Home
          </Link>
        </div>
        {/* Intro Paragraph */}
        <section className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-lg text-gray-700">
            Discover our full range of sustainable, custom-printed cups. Whether you need hot or cold cups, we have the perfect size and style to make your brand stand out.
          </p>
        </section>
        {/* Product Grid */}
        <section id="product-sections" className="max-w-7xl mx-auto">
          <ProductSections />
        </section>
      </div>
      {/* Steps Section OUTSIDE of padded container */}
      <section className="bg-gray-100 text-black py-16 px-4">
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
    </>
  );
}
