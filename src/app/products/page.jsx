"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductsCategoriesPage() {
  // Add more categories as you expand
  const categories = [
    {
      slug: "cups",
      title: "Paper Cups",
      image: "/cups/12oz.png",
    },
  ];

  // Keep your original 2-col (mobile) / 4-col (desktop) intent.
  // If only one category, still let it size nicely.
  const gridCols =
    categories.length === 1
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-2 lg:grid-cols-4";

  return (
    <main className="p-6 space-y-8">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">Shop by Category</h1>
        <p className="text-lg text-gray-700">
          Choose a category to start exploring products.
        </p>
      </div>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto">
        <div className={`grid gap-5 sm:gap-6 ${gridCols}`}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              aria-label={`Browse ${cat.title}`}
              className={`
                group relative block w-full overflow-hidden rounded-2xl
                ring-1 ring-black/5 hover:ring-black/10 hover:shadow-md shadow-sm transition
                bg-gray-50
              `}
            >
              {/* Square container so square images show fully (no cropping) */}
              <div className="relative aspect-square flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="
                    object-contain
                    p-5
                    transition-transform duration-300
                    group-hover:scale-[1.05]
                  "
                  priority
                />
                {/* Bottom fade (matches CupCard style) */}
                <div
                  className="
                    pointer-events-none absolute inset-x-0 bottom-0 h-1/2
                    bg-gradient-to-t from-black/45 via-black/15 to-transparent
                  "
                />
              </div>

              {/* Title */}
              <div className="absolute bottom-3 left-4 right-4">
                <h2
                  className="
                    text-white text-lg sm:text-xl font-semibold
                    tracking-tight drop-shadow
                  "
                >
                  {cat.title}
                </h2>
              </div>

              {/* Accessible focus outline */}
              <span className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-visible:ring-black/30 transition pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
