"use client";

import ProductSections from "../../../components/ProductSections";

export default function PaperCupsPage() {
  return (
    <main className="bg-white">
      {/* Header + intro — same container as Contact, tighter spacing */}
      <div className="p-6 max-w-4xl mx-auto space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight mb-1 sm:mb-2">Paper Cups</h1>
        </div>

        <section>
          <p className="text-lg text-gray-700 leading-relaxed">
            Discover our full range of sustainable, Canadian-made paper cups. From small to large, we have the perfect size and style to make your brand stand out.
          </p>
        </section>
      </div>

      {/* Product grid — unified gutters */}
      <section id="product-sections" className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <ProductSections />
      </section>

      {/* Steps section — same gutters as grid */}
      <section className="bg-gray-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 text-left">
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
