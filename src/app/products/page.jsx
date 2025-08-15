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
    // Add more categories...
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

      {/* Category Grid */}
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
                sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 330px"
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-[1.02]
                  transform-gpu
                "
              />

              {/* Bottom-only soft gradient */}
              <div
                className="
                  pointer-events-none
                  absolute inset-x-0 bottom-0
                  h-[38%]
                  bg-gradient-to-t
                  from-black/50 via-black/20 to-transparent
                "
              />

              {/* Title */}
              <div className="absolute inset-x-0 bottom-0 pb-3 pt-2 flex justify-center">
                <span
                  className="
                    text-base sm:text-lg xl:text-xl
                    font-semibold tracking-tight
                    text-white text-center select-none
                    leading-snug
                    px-2
                    /* Optional subtle backdrop for busy images */
                    backdrop-blur-sm
                    /* Refined single shadow (removes double stacking) */
                    drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]
                  "
                  style={{
                    // Slight negative letter spacing to tighten bold caps if needed
                    letterSpacing: "-0.5px",
                  }}
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
