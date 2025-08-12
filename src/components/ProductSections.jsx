"use client";

import CupCard from "./CupCard";
import { cups } from "../data/cups";

export default function ProductSections() {
  return (
    <div
      className="
        grid
        grid-cols-2          /* 2 cols on mobile */
        lg:grid-cols-4       /* 4 cols on desktop */
        gap-3 lg:gap-6
        lg:auto-rows-fr      /* match homepage: only on lg */
      "
    >
      {cups.map((cup) => (
        <CupCard key={cup.slug} cup={cup} />
      ))}
    </div>
  );
}
