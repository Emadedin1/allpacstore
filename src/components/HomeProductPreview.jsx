"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import CupCard from "./CupCard";
import { cups } from "../data/cups";

export default function HomeProductPreview() {
  // First 4 items: 3 real cards + 1 "See More"
  const preview = cups.slice(0, 4);

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
        {preview.map((cup, i) => {
          if (i < 3) {
            // Same card as products grid, retains Add to Cart, etc.
            return <CupCard key={cup.slug} cup={cup} />;
          }

          // 4th tile: blurred image of the 4th product with "See More"
          return (
            <Link
              key={`see-more-${cup.slug}`}
              href="/products/cups"  // change to /products if that's your full grid
              aria-label="See more products"
              className="
                group relative block overflow-hidden rounded-2xl
                ring-1 ring-black/5 border border-white/20
                bg-gray-100/60 backdrop-blur
                shadow-sm hover:shadow-md hover:ring-black/10 transition
                h-full
              "
            >
              {/* Background: 4th product image, blurred and dimmed */}
              <div className="relative w-full h-full min-h-48">
                <Image
                  src={cup.image}
                  alt={`${cup.size} cup`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center scale-105 blur-sm brightness-75"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
                {/* subtle texture */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.6) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    See More
                  </span>
                  <span
                    className="
                      inline-flex h-9 w-9 items-center justify-center rounded-full
                      bg-white/80 text-gray-900 ring-1 ring-black/10 backdrop-blur
                      group-hover:bg-white transition
                    "
                  >
                    <span className="text-xl leading-none transform transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span className="text-[11px] text-gray-700">Browse all paper cups</span>
                </div>
              </div>

              <span className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-visible:ring-black/30 pointer-events-none" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
