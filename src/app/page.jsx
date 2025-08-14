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
            Based in Windsor, ON 🇨🇦 — Paper cups delivered fast, with low minimums and premium quality.
          </p>

          {/* Flat, modern CTA (now bold) */}
          <Link
            href="/products/cups"
            className="inline-flex h-11 px-6 items-center justify-center rounded-md
                       bg-[#239356] text-white text-base font-bold
                       hover:bg-[#1F844C] active:bg-[#176C3F]
                       focus:outline-none transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Paper Cups Section */}
      <section id="product-sections" className="py-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                Paper Cups
              </h2>
              <div
                aria-hidden
                className="mt-1 h-px w-20 sm:w-24 rounded-full
                           bg-gradient-to-r from-[#FFD814]/40 via-[#FFD814]/20 to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Home preview grid wrapped with the same gutters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <HomeProductPreview />
        </div>
      </section>
    </main>
  )
}
