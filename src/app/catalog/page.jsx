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

      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/products/${cat.slug}`}
            className="group block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            {cat.thumbnail && (
              <Image
                src={cat.thumbnail}
                alt={cat.title}
                width={400}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform"
              />
            )}
            <div className="bg-gray-50 py-3 text-center font-semibold text-lg">
              {cat.title}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
