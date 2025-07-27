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
            Custom-Printed Paper Cups Delivered Fast
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto text-black">
            Print your brand on hot and cold paper cups with quick turnaround and low minimums.
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
    </main>
  )
}
