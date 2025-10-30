'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'

export default function Home() {
  const [singleWall, setSingleWall] = useState([])
  const [doubleWall, setDoubleWall] = useState([])
  const [lids, setLids] = useState([])

  useEffect(() => {
    async function fetchAll() {
      try {
        // Adjust 'single-wall' / 'double-wall' / 'lids' to match your Category slugs.
        const query = `
          *[_type == "product" && category->slug.current == $cat]
          | order(title asc)[0...12]{
            _id,
            title,
            description,
            "slug": slug.current,
            // Prefer highRes if present; else mainImage
            "image": coalesce(highResImage.asset->url, mainImage.asset->url),
            variants[]{ size, topDia, packing }
          }
        `
        const [sw, dw, ld] = await Promise.all([
          client.fetch(query, { cat: 'single-wall' }),
          client.fetch(query, { cat: 'double-wall' }),
          client.fetch(query, { cat: 'lids' }),
        ])
        setSingleWall(sw)
        setDoubleWall(dw)
        setLids(ld)
      } catch (err) {
        console.error('Error fetching products:', err)
      }
    }
    fetchAll()
  }, [])

  return (
    <main className="min-h-screen bg-white text-allpac">
      {/* Hero Section (unchanged) */}
      <section
        className="relative text-center py-14 px-4 bg-cover bg-[40%_center] sm:bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-cups.png')" }}
      >
        <div className="absolute inset-0 bg-white/80 sm:bg-white/60 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
            Wholesale Paper Cup Manufacturer
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto text-black">
            Based in Windsor, ON
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg"
              alt="Canadian Flag"
              className="inline-block w-5 h-5 sm:w-6 sm:h-6 object-contain mx-1"
            />
            — Paper cups delivered fast, with low minimums and premium quality.
          </p>

          <Link
            href="/catalog"
            className="inline-flex h-11 px-6 items-center justify-center rounded-md
                       bg-[#239356] text-white text-base font-bold
                       hover:bg-[#1F844C] active:bg-[#176C3F]
                       focus:outline-none transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Single-Wall Paper Cups */}
      <CatalogSection
        title="Single-Wall Paper Cups"
        items={singleWall}
        seeMoreHref="/catalog/single-wall-cups"
        seeMoreText="See all single-wall cups"
        itemHrefBase="/catalog/single-wall-cups"
      />

      {/* Double-Wall Paper Cups */}
      <CatalogSection
        title="Double-Wall Paper Cups"
        items={doubleWall}
        seeMoreHref="/catalog/double-wall-cups"
        seeMoreText="See all double-wall cups"
        itemHrefBase="/catalog/double-wall-cups"
      />

      {/* Lids */}
      <CatalogSection
        title="Lids"
        items={lids}
        seeMoreHref="/catalog/lids"
        seeMoreText="See all lids"
        itemHrefBase="/catalog/lids"
        imageBgClass="bg-white"
      />
    </main>
  )
}

/* ---------- Reusable section with size chips ---------- */
function CatalogSection({
  title,
  items,
  seeMoreHref,
  seeMoreText,
  itemHrefBase,
  imageBgClass = 'bg-gray-50',
}) {
  return (
    <section className="py-12" id={title.toLowerCase().replace(/\s+/g, '-')}>
      {/* Header */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 mb-6 sm:mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">{title}</h2>
            <div
              aria-hidden
              className="mt-1 h-px w-20 sm:w-24 rounded-full
                         bg-gradient-to-r from-[#FFD814]/40 via-[#FFD814]/20 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {items?.map((p) => {
          // Build size list from variants[].size
          const rawSizes = Array.isArray(p.variants)
            ? p.variants.map(v => v?.size).filter(Boolean)
            : []
          // Format (ensure "oz" suffix if numeric)
          const sizes = rawSizes.map(s => (/\boz\b/i.test(s) ? s : `${s}`))

          return (
            <Link
              key={p._id}
              href={`${itemHrefBase}/${p.slug}`}
              className="flex flex-col justify-between rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  width={400}
                  height={400}
                  className={`w-full h-60 object-contain ${imageBgClass}`}
                />
              )}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-base sm:text-lg">{p.title}</h3>
                {p.description ? (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{p.description}</p>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">&nbsp;</p>
                )}

                {/* size chips (only render if we have sizes) */}
                {sizes.length > 0 && (
                  <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {sizes.slice(0, 6).map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-700"
                      >
                        {s}
                      </li>
                    ))}
                    {sizes.length > 6 && (
                      <li className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-700">
                        +{sizes.length - 6} more
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </Link>
          )
        })}

        {/* See More Card */}
        <Link
          href={seeMoreHref}
          className="flex flex-col items-center justify-center bg-[#F2F8F5]
                    rounded-2xl border border-[#DCEFE4] text-center
                    hover:bg-[#E7F3ED] transition-all p-6"
        >
          <h4 className="flex items-center gap-2 text-lg font-semibold text-[#0D1B2A] mb-1">
            See More
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={2} stroke="#239356" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </h4>
          <p className="text-sm text-[#0D1B2A]/70">{seeMoreText}</p>
        </Link>
      </div>
    </section>
  )
}
