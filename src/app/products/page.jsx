"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductsCategoriesPage() {
  const categories = [
    {
      slug: "cups",
      title: "Paper Cups",
      image: "/cups/12oz.png", // ensure this is at least 660px x 660px for retina crispness
    },
    // Add more categories as needed
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

      {/* Category Grid: 2 cols mobile, 4 cols large */}
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
              overflow-hidden
            "
          >
            <div className="relative w-full aspect-square bg-gray-50">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                priority
                quality={100}
                // Expanded desktop size hint for sharper source selection
                sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 330px"
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.02]
                  transform-gpu
                "
              />
              {/* Gradient for legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
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
