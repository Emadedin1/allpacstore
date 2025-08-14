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
    // Add more categories here as needed
  ];

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-10">
      {/* Heading */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Shop by Category</h1>
        <p className="text-lg text-gray-600">
          Choose a category to start exploring products.
        </p>
      </header>

      {/* Category Grid: 2 columns on mobile, 4 on large screens */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            aria-label={`Browse ${cat.title}`}
            className="
              group bg-white rounded-2xl shadow-sm hover:shadow-md transition
              flex flex-col cursor-pointer focus:outline-none
              focus-visible:ring-2 focus-visible:ring-black/10
              overflow-hidden        /* ensures bottom corners show rounded */
            "
          >
            {/* Full card is just the image well with overlay + text */}
            <div className="relative w-full aspect-square bg-gray-50">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                priority
                quality={100}
                sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 250px"
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.035]
                  will-change-transform
                "
              />
              {/* Gradient for text legibility */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t from-black/65 via-black/10 to-transparent
                "
              />
              {/* Title */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 flex justify-center">
                <span
                  className="
                    text-white text-sm sm:text-base font-semibold tracking-tight
                    drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.7),0_4px_14px_rgba(0,0,0,0.4)]
                    text-center select-none
                  "
                >
                  {cat.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
