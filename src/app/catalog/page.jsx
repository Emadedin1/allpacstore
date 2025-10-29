import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

export default async function ProductsCategoriesPage() {
  const categories = await client.fetch(`
    *[_type == "category"]{
      _id,
      title,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url
    }
  `);

  return (
    <main className="bg-white min-h-screen">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">Shop by Category</h1>
        <p className="text-gray-600 mt-2">
          Choose one of our product categories to start exploring.
        </p>
      </div>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 pb-20">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/catalog/${cat.slug}`}
            className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-gray-50"
          >
            <div className="flex items-center justify-center h-40 sm:h-48 md:h-52 bg-white">
              {cat.thumbnail ? (
                <Image
                  src={cat.thumbnail}
                  alt={cat.title}
                  width={300}
                  height={300}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="text-gray-400 text-sm">No Image</div>
              )}
            </div>

            <div className="py-3 text-center font-semibold text-base sm:text-lg bg-gray-50 border-t border-gray-100">
              {cat.title}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
