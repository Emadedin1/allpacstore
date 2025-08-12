"use client";

import ProductSections from "../../../components/ProductSections";

export default function PaperCupsPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center py-6">
        <h1 className="text-4xl font-bold mb-2">Paper Cups</h1>
        <p className="text-lg text-gray-700">
          Discover our full range of sustainable, Canadian-made paper cups.
        </p>
      </div>

      {/* Product grid — identical wrapping to homepage */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ProductSections />
        </div>
      </section>

      {/* Steps section */}
      <section className="bg-gray-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-12 text-left">
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">1</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Choose Cup Size</h3>
              <p className="text-sm">Pick from 5 available sizes.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">2</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Choose Quantity</h3>
              <p className="text-sm">Select how many cups you need.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">3</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Add to Cart</h3>
              <p className="text-sm">Review your selection and add to your order.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
