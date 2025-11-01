'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'

/* =======================
   PRICE MAPS + HELPERS
======================= */

// Single-wall: your estimates (per case)
const PRICE_SINGLE = {
  '10 oz': 36.02,
  '12 oz': 40.22,
  '16 oz': 47.14, // default for 16 oz cold/iced or unspecified
  '22 oz': 68.24,
  '32 oz': 99.92,
}

// Double-wall: modest premium (per case)
const PRICE_DOUBLE = {
  '10 oz': 40.50,
  '12 oz': 45.25,
  '16 oz': 51.77, // 16 oz HOT override
  '22 oz': 74.99,
  '32 oz': 109.90,
}

// Lids (per case) by diameter
const PRICE_LIDS_MM = {
  '80': 22.90,
  '90': 24.90,
  '98': 27.90,
  '100': 27.90,
  '105': 31.90,
}

const CASE_QTY = 1000
const fmtInt = (n) => Number(n).toLocaleString('en-US')
const money = (price) => `$${Number(price).toFixed(2)}`

// Extract “12 oz”, “16oz”, etc.
function extractOzFromTitle(title) {
  if (!title) return null
  const m = String(title).match(/(\d+(?:\.\d+)?)\s*oz/i)
  return m ? `${m[1]} oz` : null
}

// Extract lid diameter “90 mm”, “90mm”, etc.
function extractMmFromTitle(title) {
  if (!title) return null
  const m = String(title).match(/\b(80|90|98|100|105)\s*mm\b/i)
  return m ? m[1] : null
}

// Decide estimated price per card
function getEstimatedPrice({ kind, title }) {
  const t = String(title || '').toLowerCase()

  // Lids by diameter
  if (kind === 'lids') {
    const mm = extractMmFromTitle(title)
    if (mm && PRICE_LIDS_MM[mm] != null) return PRICE_LIDS_MM[mm]
    return 24.90 // fallback competitive lid price
  }

  // Cups use oz + hot/cold logic
  const sizeKey = extractOzFromTitle(title)
  if (!sizeKey) return undefined

  if (sizeKey === '16 oz') {
    if (/\b(cold|iced)\b/.test(t)) {
      return kind === 'double' ? PRICE_SINGLE['16 oz'] : PRICE_SINGLE['16 oz']
    }
    if (/\bhot\b/.test(t)) {
      return kind === 'double' ? PRICE_DOUBLE['16 oz'] : PRICE_DOUBLE['16 oz']
    }
    return kind === 'double'
      ? (PRICE_DOUBLE['16 oz'] ?? PRICE_SINGLE['16 oz'])
      : PRICE_SINGLE['16 oz']
  }

  if (kind === 'double') {
    return PRICE_DOUBLE[sizeKey] ?? PRICE_SINGLE[sizeKey]
  }
  return PRICE_SINGLE[sizeKey]
}

/* =======================
   DISPLAY TITLE (B2B)
======================= */

// Infer attributes from stored title
function inferAttrsFromTitle(title) {
  const t = String(title || '').toLowerCase()
  const sizeMatch = t.match(/(\d+(?:\.\d+)?)\s*oz/)
  const size = sizeMatch ? `${sizeMatch[1]} oz` : null

  const wall = /double/.test(t) ? 'Double-Walled' : /single/.test(t) ? 'Single-Walled' : null
  const temp = /\bhot\b/.test(t) ? 'Hot' : /\b(cold|iced)\b/.test(t) ? 'Cold' : null
  const isBlank = /\bblank\b/.test(t) || !/\bprint|custom|logo\b/.test(t) // default Blank if not explicitly custom
  const mmMatch = t.match(/\b(80|90|98|100|105)\s*mm\b/)
  const mm = mmMatch ? `${mmMatch[1]} mm` : null
  const isLid = /\blid\b/.test(t)
  const lidType = /\bdome\b/.test(t) ? 'Dome Lid' : /\bsip\b/.test(t) ? 'Sip Lid' : (isLid ? 'Lid' : null)

  return { size, wall, temp, isBlank, mm, lidType, isLid }
}

function buildDisplayTitle(originalTitle, kind) {
  const { size, wall, temp, isBlank, mm, lidType, isLid } = inferAttrsFromTitle(originalTitle)
  const qtyLabel = '1000pcs'

  // ---- LIDS ----
  if (kind === 'lids' || isLid) {
    if (mm === '80 mm') {
      return `${qtyLabel} | 80mm White Dome Lid For 10oz Cups`
    }
    if (mm === '90 mm') {
      return `${qtyLabel} | 90mm White Dome Lid For 12-32oz Cups`
    }
    // fallback for other lid sizes if ever added
    return `${qtyLabel} | ${mm || ''} White Dome Lid`
  }

  // ---- CUPS ----
  const sizeWithDot = size ? (/\.$/.test(size) ? size : `${size}.`) : null
  const resolvedWall =
    kind === 'double' ? 'Double-Walled' :
    kind === 'single' ? 'Single-Walled' :
    (wall || 'Single-Walled')

  const parts = [
    sizeWithDot,
    isBlank ? 'Blank' : null,
    resolvedWall,
    temp || 'Hot',
    'Paper Cup',
  ].filter(Boolean)

  return `${qtyLabel} | ${parts.join(' ')}`
}

/* =======================
          PAGE
======================= */

export default function HomeClient() {
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
      {/* Hero */}
      <section
        className="relative text-center py-14 px-4 bg-cover bg-[40%_center] sm:bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-cups.png')" }}
      >
        <div className="absolute inset-0 bg-white/80 sm:bg-white/60 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
            Canada’s Most Trusted Wholesale Paper Cup Manufacturer
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto text-black">
            Based in Windsor, ON
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg"
              alt="Canadian Flag"
              className="inline-block w-5 h-5 sm:w-6 sm:h-6 object-contain mx-1"
            />
            — reliable partner for paper cups and lids, serving wholesale and foodservice distributors across North America.
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

      {/* Sections */}
      <HomeCatalogSection
        title="Single Wall Cups"
        items={singleWall}
        seeMoreHref="/catalog/single-wall-cups"
        seeMoreText="See all single wall cups"
        itemHrefBase="/catalog/single-wall-cups"
        kind="single"
      />

      <HomeCatalogSection
        title="Double Wall Cups"
        items={doubleWall}
        seeMoreHref="/catalog/double-wall-cups"
        seeMoreText="See all double wall cups"
        itemHrefBase="/catalog/double-wall-cups"
        kind="double"
      />

      <HomeCatalogSection
        title="Lids"
        items={lids}
        seeMoreHref="/catalog/lids"
        seeMoreText="See all lids"
        itemHrefBase="/catalog/lids"
        imageBgClass="bg-white"
        kind="lids"
      />

      {/* page-level estimate note */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 pb-12">
        <p className="text-center text-xs text-gray-500">
          Prices shown are <span className="font-medium">estimates per case</span>. Each cup case contains {fmtInt(CASE_QTY)} cups. Final quotes may vary by spec and quantity.
        </p>
      </div>
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

      {/* Grid: compact card w/ big price + slim CTA on mobile */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {items?.map((p) => {
          const est = getEstimatedPrice({ kind, title: p.title })
          const displayTitle = buildDisplayTitle(p.title, kind)

          return (
            <div
              key={p._id}
              className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition
                         ring-1 ring-black/5 hover:ring-black/10 overflow-hidden"
            >
              {/* Image + Title link to product detail */}
              <Link href={`${itemHrefBase}/${p.slug}`} className="rounded-t-2xl overflow-hidden">
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
                </div>
                <div className="px-3 pt-3 text-center">
                  <p className="text-[13px] sm:text-[14px] font-medium text-gray-900 leading-snug">
                    {displayTitle}
                  </p>
                </div>
              </Link>

              {/* Price + CTA */}
              <div className="px-3 pb-3 pt-1 text-center">
                {est !== undefined && (
                  <div className="mt-1">
                    <div className="text-[15px] sm:text-lg font-semibold text-gray-900">
                      {money(est)}
                      <span className="ml-1 tracking-wide text-[11px] sm:text-xs text-gray-500 align-middle">est</span>
                    </div>
                  </div>
                )}

                {/* Compact mobile CTA (full-width, fixed height) */}
                <Link
                  href="/contact"
                  className="mt-3 inline-flex w-full items-center justify-center
                             h-9 sm:h-10 px-3 sm:px-5
                             text-[13px] sm:text-sm font-medium text-white
                             bg-[#239356] hover:bg-[#1F844C] rounded-md
                             transition-all duration-200"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
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
