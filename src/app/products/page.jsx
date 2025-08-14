"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductsCategoriesPage() {
  // Single category for now
  const categories = [
    {
      slug: "cups",
      title: "Paper Cups",
      image: "/cups/12oz.png",
    },
  ];

  // Card min width (matches style philosophy of CupCard)
  const cardMin = 205; // tweak if you need tighter / wider layout

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-10">
      {/* Heading */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Shop by Category</h1>
        <p className="text-lg text-gray-600">
          Choose a category to start exploring products.
        </p>
      </header>

      {/* Category Grid (same square image well & cover behavior as CupCard) */}
      <section
        className="grid gap-5 sm:gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(var(--card-min), 1fr))",
          ["--card-min"]: `${cardMin}px`,
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            aria-label={`Browse ${cat.title}`}
            className="
              group bg-white rounded-2xl shadow-sm hover:shadow-md transition
              flex flex-col cursor-pointer focus:outline-none
              focus-visible:ring-2 focus-visible:ring-black/10
              w-full
            "
          >
            {/* Square image well (object-cover like CupCard) */}
            <div className="relative w-full aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                priority
                sizes="(max-width:640px) 45vw, (max-width:1024px) 25vw, 220px"
                className="
                  object-cover
                  transition-transform duration-300
                  group-hover:scale-[1.03]
                "
              />
            </div>

            {/* Text area (minimal, like a simplified CupCard bottom section) */}
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 text-center leading-snug">
                {cat.title}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
