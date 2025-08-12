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
            return <CupCard key={cup.slug} cup={cup} />;
          }

          // 4th tile: subtle brand-tinted "See more" card (not plain white)
          return (
            <Link
              key="see-more"
              href="/products/cups" // change to "/products" if you want the full grid
              aria-label="See more products"
              className="
                group relative block h-full
                rounded-2xl border border-[#1F8248]/20
                bg-[#1F8248]/10
                shadow-sm hover:shadow-md
                transition-all duration-200 hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F8248]/30
                cursor-pointer
              "
            >
              {/* inner wrapper to preserve rounded border radius visually */}
              <div className="absolute inset-px rounded-[calc(theme(borderRadius.2xl)-1px)]" />

              <div className="relative h-full flex items-center justify-center p-6">
                <div className="inline-flex items-center gap-3">
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    See more
                  </span>

                  {/* Arrow button */}
                  <span
                    className="
                      inline-flex h-9 w-9 items-center justify-center rounded-full
                      bg-white text-[#1F8248] ring-1 ring-[#1F8248]/20
                      transition-all duration-200
                      group-hover:translate-x-0.5
                      group-hover:ring-[#1F8248]/30
                    "
                    aria-hidden="true"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
