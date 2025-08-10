"use client";

import ProductSections from "../../../components/ProductSections";

export default function PaperCupsPage() {
  return (
    <>
      <div className="p-6 space-y-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold mb-2">Paper Cups</h1>
        </div>

        <section className="max-w-4xl mx-auto mb-8">
          <p className="text-lg text-gray-700">
            Discover our full range of sustainable, custom-printed paper cups. Whether you need hot or cold cups, we have the perfect size and style to make your brand stand out.
          </p>
        </section>

        <section id="product-sections" className="max-w-7xl mx-auto">
          <ProductSections />
        </section>
      </div>

      <section className="bg-gray-100 text-black py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-left">
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">1</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Choose Cup Size</h3>
              <p className="text-sm">Pick from hot or cold cups in 5 size options.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-7xl font-bold leading-none">2</span>
            <div>
              <h3 className="text-xl font-semibold mb-1">Upload Your Design</h3>
              <p className="text-sm">Easily upload your logo or artwork — we’ll take care of the rest.</p>
            </div>
          </div>
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
