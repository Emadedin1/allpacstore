"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductsCategoriesPage() {
  const categories = [
    {
      slug: "cups",
      title: "Paper Cups",
      image: "/cups/12oz.png",
    },
    // Add more categories here when ready...
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

      {/* Categories Grid: 2 cols on mobile, 4 on desktop */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              aria-label={`Browse ${cat.title}`}
              className="group relative block w-full overflow-hidden rounded-2xl bg-gray-50 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:ring-black/10 transition"
            >
              {/* Slightly taller on small screens for better readability */}
              <div className="relative aspect-[4/5] sm:aspect-[16/9]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold drop-shadow-md">
                  {cat.title}
                </h2>
              </div>
              <span className="absolute inset-0 ring-2 ring-transparent group-focus-visible:ring-black/30 rounded-2xl pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
