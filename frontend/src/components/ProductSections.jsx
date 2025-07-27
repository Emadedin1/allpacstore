// src/components/ProductSections.jsx
"use client";

import CupCard from "./CupCard";

const cups = [
  {
    slug: "10oz",
    size: "10 oz",
    type: "Hot Cup",
    desc: "Double-wall insulated hot cup for coffee or tea.",
    image: "/cups/10oz.png",
    qtyCase: 1000,
    priceCase: 92,       // total $/case
  },
  {
    slug: "12oz",
    size: "12 oz",
    type: "Hot Cup",
    desc: "Most popular size for cafes. Double-wall for insulation.",
    image: "/cups/12oz.png",
    qtyCase: 1000,
    priceCase: 94,
  },
  {
    slug: "16oz",
    size: "16 oz",
    type: "Hot Cup",
    desc: "Larger size for lattes and premium hot beverages.",
    image: "/cups/16oz.png",
    qtyCase: 1000,
    priceCase: 96,
  },
  {
    slug: "22oz",
    size: "22 oz",
    type: "Cold Cup",
    desc: "Perfect for soft drinks, smoothies, and cold beverages.",
    image: "/cups/22oz.png",
    qtyCase: 1000,
    priceCase: 88,
  },
  {
    slug: "32oz",
    size: "32 oz",
    type: "Cold Cup",
    desc: "Extra large cold cup, great for events or promotions.",
    image: "/cups/32oz.png",
    qtyCase: 1000,
    priceCase: 90,
  },
];

export default function ProductSections() {
  return (
    <div
      className={`
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-x-80 gap-y-6 max-w-7xl mx-auto px-4 place-items-center
      `}
    >
      {cups.map((cup) => (
        <CupCard key={cup.slug} cup={cup} />
      ))}
    </div>
  );
}
