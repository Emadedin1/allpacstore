"use client";

import CupCard from "../../components/CupCard";
import { products } from "../../data/products";

export default function ProductsPageGrid() {
  // Adjustable card min width; CupCard uses w-[var(--card-min)]
  const cardMin = 210; // tweak (e.g. 200, 220) to fit your layout preference

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
      {/* Heading */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">All Paper Cups</h1>
        <p className="text-lg text-gray-600">
          Browse our available cup sizes and add cases directly to your cart.
        </p>
      </header>

      {/* Product Grid */}
      <section
        className="grid gap-5 sm:gap-6"
        style={{
          // Responsive auto-fitting columns; CupCard keeps its own width
          // We still define --card-min for the width utility inside CupCard.
          gridTemplateColumns: "repeat(auto-fill, minmax(var(--card-min), 1fr))",
          ["--card-min"]: `${cardMin}px`,
        }}
      >
        {products.map((cup) => (
          <CupCard key={cup.slug} cup={cup} />
        ))}
      </section>
    </main>
  );
}
