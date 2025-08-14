"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export default function ProductsCategoriesPage() {
  // You can append more categories; square images will all display fully (object-contain)
  const categories = [
    {
      slug: "cups",
      title: "Paper Cups",
      image: "/cups/12oz.png",
      // optional: bg color fallback if image has transparency
      bg: "bg-[#F5F7FA]",
    },
    // Future example:
    // { slug: "lids", title: "Cup Lids", image: "/lids/lid.png", bg: "bg-white" },
  ];

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
        <div
          className={clsx(
            "grid gap-5 sm:gap-6",
            // Responsive columns: adapt based on count
            categories.length === 1
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              aria-label={`Browse ${cat.title}`}
              className={clsx(
                "group relative block w-full overflow-hidden rounded-2xl",
                "ring-1 ring-black/5 hover:ring-black/10 hover:shadow-md shadow-sm transition",
                cat.bg || "bg-gray-50"
              )}
            >
              {/* Square aspect so square product artwork is fully visible; adjust for larger screens if desired */}
              <div className="relative aspect-square flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="
                    object-contain
                    p-4 sm:p-5
                    transition-transform duration-300
                    group-hover:scale-[1.06]
                  "
                  priority
                />
                {/* Bottom gradient only on hover for subtle readability (kept minimal since we use object-contain) */}
                <div
                  className="
                    pointer-events-none absolute inset-x-0 bottom-0 h-1/2
                    bg-gradient-to-t from-black/40 via-black/10 to-transparent
                    opacity-90
                  "
                />
              </div>

              {/* Title badge */}
              <div className="absolute bottom-3 left-3 right-3 flex">
                <h2
                  className="
                    text-white text-lg sm:text-xl font-semibold
                    drop-shadow
                    line-clamp-2
                  "
                >
                  {cat.title}
                </h2>
              </div>

              {/* Focus outline */}
              <span className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-visible:ring-black/30 transition pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
