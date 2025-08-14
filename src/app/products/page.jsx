"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductsCategoriesPage() {
  // Single category (Shop by Category) – simple card: image + small label.
  const categories = [
    {
      slug: "cups",
      title: "Paper Cups",
      image: "/cups/12oz.png", // using 12 oz as the example image
    },
  ];

  return (
    <main className="p-6 space-y-10">
      {/* Heading */}
      <header className="max-w-4xl mx-auto text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Shop by Category</h1>
        <p className="text-lg text-gray-700">
          Choose a category to start exploring products.
        </p>
      </header>

      {/* Categories (very simple grid) */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              aria-label={`Browse ${cat.title}`}
              className="
                group relative overflow-hidden rounded-2xl
                bg-white ring-1 ring-black/5 hover:ring-black/10
                shadow-sm hover:shadow-md transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20
                flex flex-col
              "
            >
              {/* Square image area; object-contain so the whole cup shows */}
              <div className="relative aspect-square w-full bg-gray-50 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width:640px) 45vw, (max-width:1024px) 25vw, 220px"
                  className="
                    object-contain
                    p-6 sm:p-7
                    transition-transform duration-300
                    group-hover:scale-[1.05]
                  "
                  priority
                />
                {/* Soft gradient at bottom for text legibility (light, since text is small) */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                <span
                  className="
                    absolute left-3 bottom-2
                    text-white text-sm font-semibold tracking-tight
                    drop-shadow-sm
                  "
                >
                  {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
