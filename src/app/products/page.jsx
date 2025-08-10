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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              aria-label={`Browse ${cat.title}`}
              className="group relative w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:ring-black/10 transition"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-md">
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
