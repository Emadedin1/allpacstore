"use client";

import React from "react";
import Link from "next/link";
import CupCard from "./CupCard";
import { cups } from "../data/cups";

export default function HomeProductPreview() {
  const preview = cups.slice(0, 4); // Show first 4 items

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          lg:grid-cols-3
          gap-2 sm:gap-3 lg:gap-5
          justify-items-center
        "
      >
        {preview.map((cup, i) => {
          if (i < 3) {
            return (
              <div key={cup.slug} className="w-full max-w-[170px] sm:max-w-[200px]">
                <CupCard cup={cup} />
              </div>
            );
          }

          // 4th tile: "See More" card
          return (
            <Link
              key="see-more"
              href="/products"
              aria-label="See all packaging products"
              className="
                group relative block h-full
                rounded-2xl border border-[#1F8248]/20
                bg-[#1F8248]/10
                shadow-sm hover:shadow-md
                transition-all duration-200 hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F8248]/30
                cursor-pointer
                w-full max-w-[170px] sm:max-w-[200px]
              "
              style={{ touchAction: "manipulation" }}
            >
              <div className="relative flex h-full min-h-[140px] items-center justify-center p-4 sm:p-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-3">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      See More
                    </span>

                    <span
                      className="
                        inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full
                        bg-white text-[#1F8248] ring-1 ring-[#1F8248]/20
                        transition-transform duration-200
                        group-hover:translate-x-0.5
                      "
                      aria-hidden="true"
                    >
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5"
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

                  <span className="text-xs sm:text-[13px] text-gray-700">
                    Explore all products
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
