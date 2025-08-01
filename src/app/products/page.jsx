"use client";

import ProductSections from "../../components/ProductSections";
import Link from "next/link";

export default function ProductsPage() {
  return (
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

      {/* Product Grid - use a wide container */}
      <section id="product-sections" className="max-w-7xl mx-auto">
        <ProductSections />
      </section>

      {/* How It Works - matches About style */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          {/* Step 1 */}
          <div className="space-y-2">
            <h3 className="font-semibold">1. Choose Cup Size</h3>
            <p>Pick from hot or cold cups in 5 size options.</p>
          </div>
          {/* Step 2 */}
          <div className="space-y-2">
            <h3 className="font-semibold">2. Upload Your Design</h3>
            <p>Easily upload your logo or artwork — we’ll take care of the rest.</p>
          </div>
          {/* Step 3 */}
          <div className="space-y-2">
            <h3 className="font-semibold">3. Add to Cart</h3>
            <p>Select your quantity and checkout — we print & deliver.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
