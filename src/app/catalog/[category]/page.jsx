import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

/* =======================
   PRICE MAPS + HELPERS
======================= */

// Single-wall: your estimates (per case)
const PRICE_SINGLE = {
  "10 oz": 36.02,
  "12 oz": 40.22,
  "16 oz": 47.14, // default for 16 oz cold/iced or unspecified
  "22 oz": 68.24,
  "32 oz": 99.92,
};

// Double-wall: modest premium (per case)
const PRICE_DOUBLE = {
  "10 oz": 40.50,
  "12 oz": 45.25,
  "16 oz": 51.77, // 16 oz HOT override
  "22 oz": 74.99,
  "32 oz": 109.90,
};

// Lids (per case) by diameter
const PRICE_LIDS_MM = {
  "80": 22.90,
  "90": 24.90,
  "98": 27.90,
  "100": 27.90,
  "105": 31.90,
};

const CASE_QTY = 1000;
const fmtInt = (n: number | string) => Number(n).toLocaleString("en-US");
const money = (price: number | string) => `$${Number(price).toFixed(2)}`;

// Extract “12 oz”, “16oz”, etc.
function extractOzFromTitle(title?: string | null) {
  if (!title) return null;
  const m = String(title).match(/(\d+(?:\.\d+)?)\s*oz/i);
  return m ? `${m[1]} oz` : null;
}

// Extract lid diameter “90 mm”, “90mm”, etc.
function extractMmFromTitle(title?: string | null) {
  if (!title) return null;
  const m = String(title).match(/\b(80|90|98|100|105)\s*mm\b/i);
  return m ? m[1] : null;
}

// Decide estimated price per card
function getEstimatedPrice({ kind, title }: { kind: "single" | "double" | "lids"; title: string }) {
  const t = String(title || "").toLowerCase();

  // Lids by diameter
  if (kind === "lids") {
    const mm = extractMmFromTitle(title);
    if (mm && PRICE_LIDS_MM[mm] != null) return PRICE_LIDS_MM[mm];
    return 24.90; // fallback competitive lid price
  }

  // Cups use oz + hot/cold logic
  const sizeKey = extractOzFromTitle(title);
  if (!sizeKey) return undefined;

  if (sizeKey === "16 oz") {
    if (/\b(cold|iced)\b/.test(t)) {
      return kind === "double" ? PRICE_SINGLE["16 oz"] : PRICE_SINGLE["16 oz"];
    }
    if (/\bhot\b/.test(t)) {
      return kind === "double" ? PRICE_DOUBLE["16 oz"] : PRICE_DOUBLE["16 oz"];
    }
    return kind === "double"
      ? PRICE_DOUBLE["16 oz"] ?? PRICE_SINGLE["16 oz"]
      : PRICE_SINGLE["16 oz"];
  }

  if (kind === "double") {
    return PRICE_DOUBLE[sizeKey] ?? PRICE_SINGLE[sizeKey];
  }
  return PRICE_SINGLE[sizeKey];
}

// Infer kind from category slug
function inferKindFromSlug(slug?: string) {
  if (!slug) return "single" as const;
  if (slug.includes("double")) return "double" as const;
  if (slug.includes("lid")) return "lids" as const;
  if (slug.includes("single")) return "single" as const;
  return "single" as const;
}

/* =======================
   DISPLAY TITLE (B2B)
======================= */

function inferAttrsFromTitle(title?: string | null) {
  const t = String(title || "").toLowerCase();
  const sizeMatch = t.match(/(\d+(?:\.\d+)?)\s*oz/);
  const size = sizeMatch ? `${sizeMatch[1]} oz` : null;

  const wall = /double/.test(t) ? "Double-Walled" : /single/.test(t) ? "Single-Walled" : null;
  const temp = /\bhot\b/.test(t) ? "Hot" : /\b(cold|iced)\b/.test(t) ? "Cold" : null;
  const isBlank = /\bblank\b/.test(t) || !/\bprint|custom|logo\b/.test(t); // default Blank if not explicitly custom
  const mmMatch = t.match(/\b(80|90|98|100|105)\s*mm\b/);
  const mm = mmMatch ? `${mmMatch[1]} mm` : null;
  const isLid = /\blid\b/.test(t);
  const lidType = /\bdome\b/.test(t) ? "Dome Lid" : /\bsip\b/.test(t) ? "Sip Lid" : isLid ? "Lid" : null;

  return { size, wall, temp, isBlank, mm, lidType, isLid };
}

function buildDisplayTitle(originalTitle: string, kind: "single" | "double" | "lids") {
  const { size, wall, temp, isBlank, mm, lidType, isLid } = inferAttrsFromTitle(originalTitle);

  const qtyLabel = "1000pcs"; // exact text
  const sizeWithDot = size ? (/\.$/.test(size) ? size : `${size}.`) : null;

  if (kind === "lids" || isLid) {
    // Lids example: "1000pcs | 90 mm Dome Lid (Hot/Cold)"
    const right = [mm, lidType || "Lid", temp ? `(${temp})` : null].filter(Boolean).join(" ");
    return `${qtyLabel} | ${right}`;
  }

  // Cups example: "1000pcs | 12 oz. Blank Single-Walled Hot Paper Cup"
  const resolvedWall =
    kind === "double" ? "Double-Walled" : kind === "single" ? "Single-Walled" : wall || "Single-Walled";

  const parts = [sizeWithDot, isBlank ? "Blank" : null, resolvedWall, temp || "Hot", "Paper Cup"]
    .filter(Boolean)
    .join(" ");

  return `${qtyLabel} | ${parts}`;
}

/* =======================
          PAGE
======================= */

export default async function CategoryProductsPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; // ✅ await it here
  const kind = inferKindFromSlug(category);

  // Get category by slug
  const categoryData = await client.fetch(
    `
    *[_type == "category" && slug.current == $category][0]{
      _id,
      title,
      "slug": slug.current
    }
  `,
    { category }
  );

  if (!categoryData) {
    return (
      <div className="text-center py-20 text-gray-600">
        Category not found.
      </div>
    );
  }

  // Fetch all products that reference this category
  const products = await client.fetch(
    `
    *[_type == "product" && references($catId)] | order(title asc){
      _id,
      title,
      description,
      "slug": slug.current,
      "image": coalesce(highResImage.asset->url, mainImage.asset->url)
    }
  `,
    { catId: categoryData._id }
  );

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">{categoryData.title}</h1>
        <p className="text-gray-600 mt-2">
          Discover our range of {categoryData.title.toLowerCase()}.
        </p>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-20">
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No products found for this category.
          </div>
        )}

        {products.map((p: any) => {
          const est = getEstimatedPrice({ kind, title: p.title });
          const displayTitle = buildDisplayTitle(p.title, kind);

          return (
            <div
              key={p._id}
              className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition
                         ring-1 ring-black/5 hover:ring-black/10 overflow-hidden"
            >
              {/* Image + Title link to product detail */}
              <Link
                href={`/catalog/${category}/${p.slug}`}
                className="rounded-t-2xl overflow-hidden"
              >
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      No image available
                    </div>
                  )}
                </div>
                <div className="px-3 pt-3 text-center">
                  <h2 className="text-[14px] font-medium text-gray-900 leading-snug">
                    {displayTitle}
                  </h2>
                </div>
              </Link>

              {/* Price + CTA */}
              <div className="px-3 pb-4 pt-1 text-center">
                {est !== undefined && (
                  <div className="mt-1">
                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                      {money(est)}
                      <span className="ml-1 tracking-wide text-[11px] sm:text-xs text-gray-500 align-middle">est</span>
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center h-9 sm:h-10 px-3 sm:px-5 mt-3
                             text-[13px] sm:text-sm font-medium text-white
                             bg-[#239356] hover:bg-[#1F844C] rounded-md transition-all duration-200"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* page-level estimate note */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <p className="text-center text-xs text-gray-500">
          Prices shown are <span className="font-medium">estimates per case</span>. Each cup case contains {fmtInt(CASE_QTY)} cups. Final quotes may vary by spec and quantity.
        </p>
      </div>
    </main>
  );
}
