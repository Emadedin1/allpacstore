'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(`
          *[_type == "product"] | order(_createdAt desc)[0...3]{
            _id,
            title,
            desc,
            "slug": slug.current,
            "image": image.asset->url
          }
        `)
        setProducts(data)
      } catch (err) {
        console.error('Error fetching Sanity products:', err)
      }
    }
    fetchProducts()
  }, [])

  return (
    <main className="min-h-screen bg-white text-allpac">
      {/* Hero Section */}
      <section
        className="relative text-center py-14 px-4 bg-cover bg-[40%_center] sm:bg-center bg-no-repeat"
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

        {/* Sanity Products + Original See More Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Link
              key={p._id}
              href={`/products/cups/${p.slug}`}
              className="flex flex-col justify-between rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  width={400}
                  height={400}
                  className="w-full h-72 object-cover"
                />
              )}
              <div className="p-4 text-center">
                <h2 className="font-semibold text-lg">{p.title}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{p.desc}</p>
              </div>
            </Link>
          ))}

          {/* 🟢 Original “See More” Card (arrow beside text, old colors) */}
          <Link
            href="/products"
            className="flex flex-col items-center justify-center bg-[#F2F8F5]
             rounded-2xl border border-[#DCEFE4] text-center
             hover:bg-[#E7F3ED] transition-all p-6"
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#0D1B2A] mb-1">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#239356"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </h3>
            <p className="text-sm text-[#0D1B2A]/70">See all paper cup sizes</p>
          </Link>


        </div>
      </section>
    </main>
  )
}
