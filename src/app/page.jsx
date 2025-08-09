'use client'

import React from 'react'
import ProductSections from '../components/ProductSections'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-allpac">
      {/* Hero Section */}
      <section
        className="relative text-center py-14 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-cups.png')" }}
      >
        <div className="absolute inset-0 bg-white/80 sm:bg-white/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
            Wholesale Paper Cups Delivered&nbsp;Fast
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto text-black">
            Based in Canada 🇨🇦 — Paper cups delivered fast, with low minimums and premium quality.
          </p>

          <a
            href="#product-sections"
            className="inline-block bg-[#FFD814] text-black px-6 py-3 rounded-md font-semibold hover:bg-Yellow-700 transition"
          >
            Browse Products
          </a>
        </div>
      </section>

      {/* Product Sections */}
      <section id="product-sections" className="py-12 px-4">
        <ProductSections />
      </section>

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
    </main>
  )
}
