"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "../data/products";

export default function HomeProductPreview() {
  const preview = (products || []).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-3 lg:gap-6
          auto-rows-fr
        "
      >
        {preview.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            aria-label={`View ${p.name}`}
            className="group relative block overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md hover:ring-black/10 transition"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/9]">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white text-base sm:text-lg font-semibold drop-shadow">
                {p.name}
              </h3>
              {p.qtyCase && p.priceCase ? (
                <p className="text-white/85 text-xs">
                  {(p.priceCase / p.qtyCase).toFixed(3)}/cup
                </p>
              ) : null}
            </div>
            <span className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-visible:ring-black/30 pointer-events-none" />
          </Link>
        ))}

        {/* Modern frosted "See More" tile */}
        <Link
          href="/products"
          aria-label="See more products"
          className="
            group relative flex items-center justify-center overflow-hidden
            rounded-2xl ring-1 ring-black/5 border border-white/20
            bg-gradient-to-br from-gray-100/70 via-gray-200/50 to-gray-300/40
            shadow-sm hover:shadow-md hover:ring-black/10 transition
            backdrop-blur-md
          "
        >
          {/* subtle texture for premium feel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.6) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-sm sm:text-base font-medium text-gray-800">
              See More
            </span>
            <span
              className="
                inline-flex h-9 w-9 items-center justify-center rounded-full
                bg-white/70 text-gray-900 ring-1 ring-black/10 backdrop-blur
                group-hover:bg-white transition
              "
            >
              <span className="text-xl leading-none transform transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
            <span className="text-[11px] text-gray-600">Browse all products</span>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </Link>
      </div>
    </div>
  );
}
