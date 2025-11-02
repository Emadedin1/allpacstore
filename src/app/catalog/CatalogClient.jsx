import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

export default async function CatalogClient() {
  const categories =
    (await client.fetch(`
      *[_type == "category"]{
        _id,
        title,
        "slug": slug.current,
        "thumbnail": coalesce(thumbnail.asset->url, "")
      } | order(title desc)
    `)) || [];

    
  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">Shop by Category</h1>
        <p className="text-gray-600 mt-2">
          Choose one of our product categories to start exploring.
        </p>
      </div>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 pb-20">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/catalog/${cat.slug}`}
              className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition ring-1 ring-black/5 hover:ring-black/10 overflow-hidden"
            >
              <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                {cat.thumbnail ? (
                  <Image
                    src={cat.thumbnail}
                    alt={cat.title || "Allpac category"}
                    fill
                    sizes="230px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-3 text-center">
                <p className="text-[14px] font-medium text-gray-900 leading-snug">
                  {cat.title}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">
            No categories available.
          </div>
        )}
      </section>
    </main>
  );
}
