import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryProductsPage({ params }) {
  const { category } = await params;


  const categoryData = await client.fetch(`
    *[_type == "category" && slug.current == $category][0]{
      _id,
      title
    }
  `, { category });

  if (!categoryData) {
    return <div className="text-center py-20 text-gray-600">Category not found.</div>;
  }

  const products = await client.fetch(`
  *[_type == "product" && references($catId)] | order(title desc){
    _id,
    title,
    desc,
    "slug": slug.current,
    "image": image.asset->url
  }
`, { catId: categoryData._id });


  return (
    <main className="bg-white min-h-screen">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">{categoryData.title}</h1>
        <p className="text-gray-600 mt-2">
          Discover our range of {categoryData.title.toLowerCase()}.
        </p>
      </div>

      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-20">
        {products.map((p) => (
          <Link
            key={p._id}
            href={`/catalog/${category}/${p.slug}`}
            className="block border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {p.image && (
              <Image
                src={p.image}
                alt={p.title}
                width={400}
                height={400}
                className="w-full h-72 object-cover"
              />
            )}
            <div className="p-4 text-center">
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{p.desc}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
