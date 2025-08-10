'use client'

import React from 'react'
import Link from 'next/link'
import HomeProductPreview from '../components/HomeProductPreview'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-allpac">
      {/* Hero Section */}
      <section
        className="relative text-center py-14 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-cups.png')" }}
      >
        <div className="absolute inset-0 bg-white/80 sm:bg-white/60 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
            Wholesale Paper Cups Delivered&nbsp;Fast
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto text-black">
            Based in Canada 🇨🇦 — Paper cups delivered fast, with low minimums and premium quality.
          </p>

          {/* Link directly to the paper cups product grid */}
          <Link
            href="/products/cups"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg
                       bg-[#FFD814] text-black text-base font-semibold tracking-[0.005em] leading-none
                       border border-[#D4B300]
                       shadow-[inset_0_-2px_0_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.06)]
                       hover:bg-[#F7C600] active:bg-[#E6B800]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
                       transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Paper Cups Section */}
      <section id="product-sections" className="py-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                Paper Cups
              </h2>
              {/* Subtle yellow hairline accent */}
              <div
                aria-hidden
                className="mt-1 h-px w-20 sm:w-24 rounded-full
                           bg-gradient-to-r from-[#FFD814]/40 via-[#FFD814]/20 to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Home preview grid: first 3 products + blurred "See More" tile */}
        <HomeProductPreview />
      </section>
    </main>
  )
}
