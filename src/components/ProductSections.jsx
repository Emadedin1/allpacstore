"use client";

import CupCard from "./CupCard";
import { cups } from "../data/cups";

export default function ProductSections() {
  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-2 sm:gap-3 lg:gap-5
          justify-items-center
        "
      >
        {cups.map((cup) => (
          <div key={cup.slug} className="w-full max-w-[170px] sm:max-w-[200px]">
            <CupCard cup={cup} />
          </div>
        ))}
      </div>
    </div>
  );
}
