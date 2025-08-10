"use client";

import ProductSections from "../../../components/ProductSections";

export default function PaperCupsPage() {
  return (
    <main className="bg-white">
      {/* Header + intro with consistent gutters */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Paper Cups</h1>
        </div>
        <p className="mt-3 text-lg text-gray-700 max-w-3xl">
          Discover our full range of sustainable, custom-printed paper cups. Whether you need hot or cold cups, we have the perfect size and style to make your brand stand out.
        </p>
      </section>

      {/* Product grid — uses same container so left edge aligns with header */}
      <section id="product-sections" className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        {/* If ProductSections already adds its own max-w/px, remove px here or inside the component to avoid double padding. */}
        <ProductSections />
      </section>

      {/* Steps section with the same gutters for alignment */}
      <section className="bg-gray-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-12 text-left">
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
