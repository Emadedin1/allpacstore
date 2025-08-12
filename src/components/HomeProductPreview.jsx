"use client";

import React from "react";
import Link from "next/link";
import CupCard from "./CupCard";
import { cups } from "../data/cups";

export default function HomeProductPreview() {
  // First 4 items: 3 real cards + 1 "See more"
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

          // 4th tile: clean, modern, plain white "See more" card
          return (
            <Link
              key="see-more"
              href="/products/cups" // change to "/products" if that's your full grid
              aria-label="See more products"
              className="
                group relative block h-full
                rounded-2xl border border-gray-200 bg-white
                shadow-sm hover:shadow-md
                transition-all duration-200 hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                cursor-pointer
              "
            >
              <div className="absolute inset-px rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white" />
              <div className="relative h-full flex items-center justify-center p-6">
                <div className="inline-flex items-center gap-2 text-gray-900 font-medium">
                  <span>See more</span>
                  <svg
                    className="h-5 w-5 text-gray-700 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
