"use client";

import CupCard from "./CupCard";
import { cups } from "../data/cups";

export default function ProductSections() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 lg:auto-rows-fr w-full">
        {cups.map((cup) => (
          <CupCard key={cup.slug} cup={cup} />
        ))}
      </div>
    </div>
  );
}
