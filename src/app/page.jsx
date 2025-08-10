'use client'

import React from 'react'
import HomeProductPreview from '../components/HomeProductPreview'

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

      {/* Paper Cups Section */}
      <section id="product-sections" className="py-12">
        {/* Modern header above the row */}
        <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 ring-1 ring-black/5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFD814]" />
                <span className="text-xs font-medium text-gray-800">Featured</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-black">
                Paper Cups
              </h2>
              <div aria-hidden className="mt-2 h-px w-16 rounded bg-gradient-to-r from-[#FFD814] to-transparent" />
            </div>

            {/* Optional "See all" link (desktop only) */}
            <a
              href="/products/cups"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              See all <span className="text-base">→</span>
            </a>
          </div>
        </div>

        {/* Home preview grid: first 3 products + blurred "See More" tile */}
        <HomeProductPreview />
      </section>
    </main>
  )
}
