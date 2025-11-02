import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'

/* =======================
   PRICING + TITLE HELPERS
======================= */

const PRICE_SINGLE = {
  '10 oz': 36.02,
  '12 oz': 40.22,
  '16 oz': 47.14,
  '22 oz': 68.24,
  '32 oz': 99.92,
}
const PRICE_DOUBLE = {
  '10 oz': 40.5,
  '12 oz': 45.25,
  '16 oz': 51.77,
  '22 oz': 74.99,
  '32 oz': 109.9,
}
const PRICE_LIDS_MM = {
  '80': 22.9,
  '90': 24.9,
  '98': 27.9,
  '100': 27.9,
  '105': 31.9,
}

// 💰 CAD → USD conversion
const CAD_TO_USD = 0.73

const money = (n) => `$${(Number(n) * CAD_TO_USD).toFixed(2)} USD`

const extractOz = (t) => String(t || '').match(/(\d+(?:\.\d+)?)\s*oz/i)?.[0]
const extractMm = (t) => String(t || '').match(/\b(80|90|98|100|105)\s*mm\b/i)?.[1]
const detectTemp = (t) => {
  const s = String(t || '').toLowerCase()
  if (/\b(cold|iced)\b/.test(s)) return 'Cold'
  if (/\bhot\b/.test(s)) return 'Hot'
  return 'Hot'
}
const isBlankCup = (t) => {
  const s = String(t || '').toLowerCase()
  return /\bblank\b/.test(s) || !/\b(custom|print|logo)\b/.test(s)
}

function getEstimatedPrice({ kind, title }) {
  if (kind === 'lids') {
    const mm = extractMm(title)
    return PRICE_LIDS_MM[mm] ?? 24.9
  }
  const oz = extractOz(title)
  if (!oz) return undefined
  return kind === 'double'
    ? PRICE_DOUBLE[oz] ?? PRICE_SINGLE[oz]
    : PRICE_SINGLE[oz]
}

function inferKindFromCategorySlug(slug = '') {
  if (slug.includes('double')) return 'double'
  if (slug.includes('lid')) return 'lids'
  return 'single'
}

function buildDisplayTitle(originalTitle, kind) {
  const qty = '1000pcs'
  const t = String(originalTitle || '')
  const size = extractOz(t) ? `${extractOz(t)}.` : null
  const temp = detectTemp(t)
  const blank = isBlankCup(t)

  if (kind === 'lids' || /\blid\b/i.test(t)) {
    const mm = extractMm(t)
    if (mm === '80') return `${qty} | 90mm White Dome Lid For 8oz Cups`
    if (mm === '90') return `${qty} | 90mm White Dome Lid For 10–22oz Cups`
    return `${qty} | ${mm ? `${mm}mm ` : ''}White Dome Lid`
  }

  const wall =
    kind === 'double' ? 'Double-Walled' :
    kind === 'single' ? 'Single-Walled' :
    /double/i.test(t) ? 'Double-Walled' : 'Single-Walled'

  const parts = [
    size,
    blank ? 'Blank' : null,
    wall,
    kind === 'double' ? null : temp,
    'Paper Cup',
  ].filter(Boolean)

  return `${qty} | ${parts.join(' ')}`
}

/* =======================
   PRODUCT PAGE
======================= */

export default async function ProductPage({ params }) {
  const { category, slug } = await params

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
  )

  if (!product)
    return <div className="text-center py-20 text-gray-600">Product not found.</div>

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
  )

  const kind = inferKindFromCategorySlug(product.category?.slug || '')
  const displayTitle = buildDisplayTitle(product.title, kind)
  const est = getEstimatedPrice({ kind, title: product.title })

  const extraNote = kind !== 'lids' ? ['Optional custom printing available.'] : []
  const notesToShow = [
  ...(product.notes || []).filter(
    (note) => !/supports custom printing/i.test(note)
  ),
  ...extraNote,
]

  function staticSpecs(title) {
    const t = title.toLowerCase()
    const base = { case: '18.5″ × 15″ × 23″', pack: '1000 pcs/ctn' }
    if (t.includes('10 oz')) return { ...base, top: '90 mm', height: '94 mm', cap: '353 ml (11.9 oz)' }
    if (t.includes('12 oz')) return { ...base, top: '90 mm', height: '112 mm', cap: '420 ml (14.2 oz)' }
    if (t.includes('16 oz')) return { ...base, top: '90 mm', height: '137 mm', cap: '502 ml (17 oz)' }
    if (t.includes('22 oz')) return { ...base, top: '90 mm', height: '160 mm', cap: '660 ml (22.3 oz)' }
    if (t.includes('32 oz')) return { ...base, top: '105 mm', height: '179 mm', cap: '966 ml (32.7 oz)' }
    return base
  }

  const staticData = staticSpecs(product.title)

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-12">
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT */}
        <div className="md:w-1/2 flex flex-col gap-6">
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

          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description.replace(/(\d+(\.\d+)?\s*(gsm|mm|ml))/gi, '').trim()}  
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{displayTitle}</h1>

            {typeof est !== 'undefined' && (
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {money(est)}{' '}
                <span className="ml-1 text-xs text-gray-500 align-middle">est</span>
              </p>
            )}

            <p className="text-gray-700 mt-4 leading-relaxed">
              {product.description.split('.').slice(0, 2).join('. ')}.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 mt-2 text-sm font-medium text-white bg-[#239356] hover:bg-[#1F844C] rounded-md transition-all duration-200"
          >
            Request a Quote
          </Link>

          {/* SPEC TABLE */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="border-b border-gray-200 px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-900">Product Specifications</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Size', 'Top Dia', 'Height', 'Capacity', 'Packing', 'Case Dimensions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-gray-600">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{extractOz(product.title)}</td>
                    <td className="px-4 py-3 text-gray-700">{staticData.top}</td>
                    <td className="px-4 py-3 text-gray-700">{staticData.height}</td>
                    <td className="px-4 py-3 text-gray-700">{staticData.cap}</td>
                    <td className="px-4 py-3 text-gray-700">{staticData.pack}</td>
                    <td className="px-4 py-3 text-gray-700">{staticData.case}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TECHNICAL SPECS */}
          {product.specifications && (
            <details className="group bg-white border border-gray-200 rounded-lg shadow-sm" open>
              <summary className="cursor-pointer px-4 py-3 font-medium flex justify-between items-center hover:bg-gray-50">
                Technical Specifications{' '}
                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
              </summary>

              <ul className="px-4 pb-3 text-sm text-gray-700 list-disc list-inside">
                {Object.entries(product.specifications).map(([key, value]) => {
                  if (!value) return null

                  const labelMap = {
                    compatibleLid: 'Compatible Lid',
                    material: 'Material',
                    topDiameterRange: 'Top Diameter',
                    bottomDiameterRange: 'Bottom Diameter',
                    height: 'Height',
                    capacity: 'Capacity',
                    use: 'Use',
                    wallType: 'Wall Type',
                    caseDimensions: 'Case Dimensions',
                    machine: 'Machine',
                    paperType: 'Paper Type',
                    gsm: 'GSM',
                  }

                  const formattedKey =
                    labelMap[key] ||
                    key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (s) => s.toUpperCase())
                      .trim()

                  return (
                    <li key={key}>
                      <strong>{formattedKey}:</strong> {value}
                    </li>
                  )
                })}

                {kind !== 'lids' && (
                  <li><strong>Case Dimensions:</strong> 18.5″ × 15″ × 23″</li>
                )}
              </ul>
            </details>
          )}

          {/* ADDITIONAL NOTES */}
          {notesToShow.length > 0 && (
            <details className="group bg-white border border-gray-200 rounded-lg shadow-sm">
              <summary className="cursor-pointer px-4 py-3 font-medium flex justify-between items-center hover:bg-gray-50">
                Additional Notes{' '}
                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
              </summary>
              <ul className="px-4 pb-3 text-sm text-gray-700 list-disc list-inside">
                {notesToShow.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </details>
          )}
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
                      {buildDisplayTitle(p.title, inferKindFromCategorySlug(product.category?.slug || ''))}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
