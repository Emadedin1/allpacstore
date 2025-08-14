"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductsCategoriesPage() {
  // Single category (extend this array as you add more)
  const categories = [
    {
      slug: "cups",
      title: "Paper Cups",
      image: "/cups/12oz.png",
    },
  ];

  const cardMin = 205;

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-10">
      {/* Heading */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Shop by Category</h1>
        <p className="text-lg text-gray-600">
          Choose a category to start exploring products.
        </p>
      </header>

      {/* Category Grid */}
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
            {/* Image well */}
            <div className="relative w-full aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                priority
                quality={100}
                // You can bump the last fixed size value if the card appears larger on desktop
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 260px"
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.035]
                  will-change-transform
                "
              />
              {/* Gradient overlay for text legibility */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t from-black/65 via-black/10 to-transparent
                  opacity-90
                "
              />
              {/* Bottom anchored title with stronger shadow / glow */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex justify-center">
                <span
                  className="
                    text-white text-base sm:text-lg font-semibold tracking-tight
                    drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.7),0_4px_14px_rgba(0,0,0,0.4)]
                    select-none
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
