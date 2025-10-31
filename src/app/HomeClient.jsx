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
        | order(title asc)[0...3]{
          _id,
          title,
          description,
          "slug": slug.current,
          "image": coalesce(highResImage.asset->url, mainImage.asset->url),
          variants[]{ size, topDia, packing }
        }
      `;
      
      const [sw, dw, ld] = await Promise.all([
        client.fetch(query, { cat: 'single-wall-cups' }),   // <-- updated
        client.fetch(query, { cat: 'double-wall-cups' }),   // <-- updated
        client.fetch(query, { cat: 'lids' }),
      ]);
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

      {/* Single Wall Cups */}
      <HomeCatalogSection
        title="Single Wall Cups"                 // <-- updated
        items={singleWall}
        seeMoreHref="/catalog/single-wall-cups"
        seeMoreText="See all single wall cups"   // <-- updated label
        itemHrefBase="/catalog/single-wall-cups"
      />
      
      {/* Double Wall Cups */}
      <HomeCatalogSection
        title="Double Wall Cups"                 // <-- updated
        items={doubleWall}
        seeMoreHref="/catalog/double-wall-cups"
        seeMoreText="See all double wall cups"   // <-- updated label
        itemHrefBase="/catalog/double-wall-cups"
      />

      {/* Lids */}
      <HomeCatalogSection
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

function HomeCatalogSection({
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

      {/* Grid: mini cards like "Other Products" */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {items?.map((p) => (
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
            </div>
            <div className="p-3 text-center">
              <p className="text-[14px] font-medium text-gray-900 leading-snug">
                {p.title}
              </p>
            </div>
          </Link>
        ))}

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
  );
}
