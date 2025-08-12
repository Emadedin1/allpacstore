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
          /* Only force equal heights on large screens to avoid mobile weirdness */
          lg:auto-rows-fr
        "
      >
        {preview.map((cup, i) => {
          if (i < 3) {
            return <CupCard key={cup.slug} cup={cup} />;
          }

          // 4th tile: brand-tinted "See more" card with clearer subheader
          return (
            <Link
              key="see-more"
              href="/products/cups" // change to "/products" for the full catalog
              aria-label="See all paper cup sizes"
              className="
                group relative block h-full
                rounded-2xl border border-[#1F8248]/20
                bg-[#1F8248]/10
                shadow-sm hover:shadow-md
                transition-all duration-200 hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F8248]/30
                cursor-pointer
              "
              style={{ touchAction: "manipulation" }}
            >
              {/* Keep a sensible minimum height so it doesn't feel cramped on phones */}
              <div className="relative flex h-full min-h-[140px] sm:min-h-[160px] items-center justify-center p-5 sm:p-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="inline-flex items-center gap-3">
                    <span className="text-sm sm:text-base font-medium text-gray-900">
                      See more
                    </span>

                    {/* Arrow in a white pill for contrast */}
                    <span
                      className="
                        inline-flex h-9 w-9 items-center justify-center rounded-full
                        bg-white text-[#1F8248] ring-1 ring-[#1F8248]/20
                        transition-transform duration-200
                        group-hover:translate-x-0.5
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

                  {/* Clearer subheader */}
                  <span className="text-xs sm:text-[13px] text-gray-700">
                    See all paper cup sizes
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
