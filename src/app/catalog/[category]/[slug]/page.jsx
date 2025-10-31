import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { category, slug } = await params;  // ✅ must await here



  // Fetch product
  const product = await client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      description,
      "image": mainImage.asset->url,
      "imageHiRes": highResImage.asset->url,
      specifications,
      variants,
      notes,
      category->{
        _id,
        title,
        "slug": slug.current
      }
    }
  `,
    { slug }
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        Product not found.
      </div>
    );
  }

  // Fetch other products from the same category
  const otherProducts = await client.fetch(
    `
    *[_type == "product" && category._ref == $catId && slug.current != $slug]{
      _id,
      title,
      "image": mainImage.asset->url,
      "slug": slug.current
    }
  `,
    { catId: product.category?._id, slug }
  );

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: IMAGE + OVERVIEW */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Product Image */}
          <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden ring-1 ring-black/5 shadow-sm">
            {product.image && (
              <Image
                src={product.imageHiRes || product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Overview */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* RIGHT: INFO + VARIANTS + SPECS */}
        <div className="md:w-1/2 flex flex-col justify-start space-y-6">
          {/* Title + Description */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-gray-700 mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 mt-4 text-sm font-medium text-white
             bg-[#239356] hover:bg-[#1F844C] rounded-md transition-all duration-200"
          >
            Request a Quote
          </Link>
          {/* VARIANTS TABLE */}
          {product.variants?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="border-b border-gray-200 px-4 py-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Product Specifications
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-600">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">
                        Top Dia
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">
                        Packing
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">
                        GSM
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {product.variants.map((variant, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {variant.size || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {variant.topDia || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {variant.packing || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {variant.gsm || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {variant.notes || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* COLLAPSIBLE DETAILS (SPECS + NOTES) */}
          <div className="space-y-4">
            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <details className="group" open>
                  <summary className="cursor-pointer px-4 py-3 font-medium flex justify-between items-center hover:bg-gray-50">
                    Specifications
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <ul className="px-4 pb-3 text-sm text-gray-700 list-disc list-inside">
                    {Object.entries(product.specifications).map(
                      ([key, value]) =>
                        value && (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                    )}
                  </ul>
                </details>
              </div>
            )}

            {/* Notes */}
            {product.notes?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <details className="group">
                  <summary className="cursor-pointer px-4 py-3 font-medium flex justify-between items-center hover:bg-gray-50">
                    Additional Notes
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <ul className="px-4 pb-3 text-sm text-gray-700 list-disc list-inside">
                    {product.notes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OTHER PRODUCTS */}
      {otherProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-5">Other Products</h2>
          <div className="flex gap-5 overflow-x-auto pb-3 hide-scrollbar snap-x snap-mandatory scroll-smooth">
            {otherProducts.map((p) => (
              <div
                key={p._id}
                className="snap-start flex-shrink-0 w-[200px] bg-white rounded-2xl shadow-sm hover:shadow-md transition ring-1 ring-black/5 hover:ring-black/10 flex flex-col"
              >
                <Link
                  href={`/catalog/${product.category?.slug}/${p.slug}`}
                  className="flex-1 rounded-2xl overflow-hidden"
                >
                  <div className="relative w-full aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="230px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-[14px] font-medium text-gray-900 leading-snug">
                      {p.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
