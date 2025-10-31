'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'

/* =======================
   PRICE MAPS + HELPERS
======================= */

// Single-wall: given by you (per case, est.)
const PRICE_SINGLE = {
  '10 oz': 36.02,
  '12 oz': 40.22,
  '16 oz': 47.14, // default for 16 oz cold/iced or unspecified
  '22 oz': 68.24,
  '32 oz': 99.92,
}

// Double-wall: slightly higher (competitive but realistic, per case, est.)
const PRICE_DOUBLE = {
  '10 oz': 40.50,
  '12 oz': 45.25,
  '16 oz': 51.77, // 16 oz HOT override you requested
  '22 oz': 74.99,
  '32 oz': 109.90,
}

// Lids (per case, est.) by common diameters
const PRICE_LIDS_MM = {
  '80': 22.90,
  '90': 24.90,
  '98': 27.90,
  '100': 27.90,
  '105': 31.90,
}

// Extract “12 oz”, “16oz”, “16-oz”, etc.
function extractOzFromTitle(title) {
  if (!title) return null
  const m = String(title).match(/(\d+(?:\.\d+)?)\s*oz/i)
  return m ? `${m[1]} oz` : null
}

// Extract lid diameter like “90 mm”, “90mm”, etc.
function extractMmFromTitle(title) {
  if (!title) return null
  const m = String(title).match(/\b(80|90|98|100|105)\s*mm\b/i)
  return m ? m[1] : null
}

// Format money
function fmt(price) {
  return `$${Number(price).toFixed(2)}`
}

// Decide estimated price for a card
function getEstimatedPrice({ kind, title }) {
  const t = String(title || '').toLowerCase()

  // Lids: match by diameter first
  if (kind === 'lids') {
    const mm = extractMmFromTitle(title)
    if (mm && PRICE_LIDS_MM[mm] != null) return PRICE_LIDS_MM[mm]
    // fallback competitive lid price if no diameter found
    return 24.90
  }

  // Cups: use oz + hot/cold logic
  const sizeKey = extractOzFromTitle(title)
  if (!sizeKey) return undefined

  // Special handling for 16 oz hot vs cold/iced
  if (sizeKey === '16 oz') {
    if (/\b(cold|iced)\b/.test(t)) {
      // cold/iced: use single-wall default 16 oz if kind is 'single', else DW baseline
      return kind === 'double' ? PRICE_SINGLE['16 oz'] : PRICE_SINGLE['16 oz']
    }
    if (/\bhot\b/.test(t)) {
      // hot: prefer double-wall price when kind is 'double'
      return kind === 'double' ? PRICE_DOUBLE['16 oz'] : PRICE_DOUBLE['16 oz']
    }
    // unclear: choose by section kind
    return kind === 'double'
      ? (PRICE_DOUBLE['16 oz'] ?? PRICE_SINGLE['16 oz'])
      : PRICE_SINGLE['16 oz']
  }

  // Other sizes by section kind, with sensible fallback
  if (kind === 'double') {
    return PRICE_DOUBLE[sizeKey] ?? PRICE_SINGLE[sizeKey]
  }
  // single-wall (default)
  return PRICE_SINGLE[sizeKey]
}

/* =======================
          PAGE
======================= */

export default function Home() {
  const [singleWall, setSingleWall] = useState([])
  const [doubleWall, setDoubleWall] = useState([])
  const [lids, setLids] = useState([])

  useEffect(() => {
    async function fetchAll() {
      try {
        const query = `
          *[_type == "product" && category->slug.current == $cat]
          | order(title asc)[0...3]{
            _id,
            title,
            description,
            "slug": slug.current,
            "image": coalesce(highResImage.asset->url, mainImage.asset->url),
            variants[]{ size, topDia, packing }
          }
        `
        const [sw, dw, ld] = await Promise.all([
          client.fetch(query, { cat: 'single-wall-cups' }),
          client.fetch(query, { cat: 'double-wall-cups' }),
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
      {/* Hero Section */}
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

      {/* Single Wall Cups */}
      <HomeCatalogSection
        title="Single Wall Cups"
        items={singleWall}
        seeMoreHref="/catalog/single-wall-cups"
        seeMoreText="See all single wall cups"
        itemHrefBase="/catalog/single-wall-cups"
        kind="single"
      />

      {/* Double Wall Cups */}
      <HomeCatalogSection
        title="Double Wall Cups"
        items={doubleWall}
        seeMoreHref="/catalog/double-wall-cups"
        seeMoreText="See all double wall cups"
        itemHrefBase="/catalog/double-wall-cups"
        kind="double"
      />

      {/* Lids */}
      <HomeCatalogSection
        title="Lids"
        items={lids}
        seeMoreHref="/catalog/lids"
        seeMoreText="See all lids"
        itemHrefBase="/catalog/lids"
        imageBgClass="bg-white"
        kind="lids"
      />
    </main>
  )
}

/* =======================
  SECTION + CARD RENDER
======================= */

function HomeCatalogSection({
  title,
  items,
  seeMoreHref,
  seeMoreText,
  itemHrefBase,
  imageBgClass = 'bg-gray-50',
  kind = 'single', // 'single' | 'double' | 'lids'
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

      {/* Grid: mini cards with price badge */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {items?.map((p) => {
          const est = getEstimatedPrice({ kind, title: p.title })

          return (
            <Link
              key={p._id}
              href={`${itemHrefBase}/${p.slug}`}
              className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition
                         ring-1 ring-black/5 hover:ring-black/10 overflow-hidden"
            >
              <div className={`relative w-full aspect-square ${imageBgClass} overflow-hidden`}>
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="230px"
                    className="object-cover"
                  />
                )}

                {/* Price tag badge (hide if no estimate) */}
                {est !== undefined && (
                  <div className="absolute left-2 bottom-2 rounded-md bg-black/80 text-white text-[12px] px-2 py-1 shadow-sm">
                    {fmt(est)} <span className="opacity-80">est.</span>
                  </div>
                )}
              </div>

              <div className="p-3 text-center">
                <p className="text-[14px] font-medium text-gray-900 leading-snug">
                  {p.title}
                </p>
              </div>
            </Link>
          )
        })}

        {/* See More card */}
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
