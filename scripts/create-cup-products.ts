import { client } from 'src/sanity/lib/client'

// =============================================
// CATEGORY DEFINITIONS
// =============================================
const categories = [
  { title: 'Single Wall', slug: 'single-wall' },
  { title: 'Double Wall', slug: 'double-wall' },
  { title: 'Lids', slug: 'lids' },
]

// =============================================
// PRODUCT DATA
// =============================================
const products = [
  // ========================
  // SINGLE WALL CUPS
  // ========================
  {
    title: 'Single Wall Paper Cups',
    category: 'single-wall',
    description:
      'High-quality single wall paper cups made from food-grade paper with PE or PLA lining. Suitable for both hot and cold beverages. Compatible with 90 mm and 105 mm dome lids.',
    mainImage: null,
    highResImage: null,
    variants: [
      { size: '10 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '300 gsm', notes: 'Hot cup' },
      { size: '12 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '300 gsm', notes: 'Hot cup' },
      { size: '16 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Hot cup' },
      { size: '20 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Hot cup' },
      { size: '22 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Cold cup' },
      { size: '32 oz', topDia: '105 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Cold cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Single Wall',
      use: 'Hot / Cold',
      compatibleLid: '90 mm Dome Lid / 105 mm Flat Lid',
      topDiameterRange: '90 mm – 105 mm',
    },
    notes: [
      'Supports custom printing and branding',
      'Ideal for takeaway coffee, soft drinks, or smoothies',
      'Eco-friendly and recyclable materials',
    ],
  },

  // ========================
  // DOUBLE WALL CUPS
  // ========================
  {
    title: 'Double Wall Paper Cups',
    category: 'double-wall',
    description:
      'Double wall paper cups provide superior insulation for hot drinks. Made with two layers of high-quality paper and PE/PLA lining, offering a premium feel for cafés and restaurants.',
    mainImage: null,
    highResImage: null,
    variants: [
      { size: '10 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '300 gsm + outer sleeve', notes: 'Hot cup' },
      { size: '12 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm total', notes: 'Hot cup' },
      { size: '16 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm total', notes: 'Hot cup' },
      { size: '20 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm total', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Double Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: [
      'Extra insulation for hot beverages',
      'Eliminates need for cup sleeves',
      'Supports custom printing and branding',
    ],
  },

  // ========================
  // LIDS
  // ========================
  {
    title: 'Dome Lid',
    category: 'lids',
    description:
      'Universal dome lids and flat lids designed to fit standard Allpac paper cups. Made from durable PS, PP, or PET material. Available in 80 mm, 90 mm, and 105 mm diameters.',
    mainImage: null,
    highResImage: null,
    variants: [],
    specifications: {
      material: 'PS / PP / PET',
      wallType: '—',
      use: 'Hot / Cold',
      compatibleLid: 'Fits Allpac Single & Double Wall Cups',
      topDiameterRange: '80 mm / 90 mm / 105 mm',
    },
    notes: [
      '80 mm – Fits 8 oz cups',
      '90 mm – Fits 10 oz – 20 oz cups',
      '105 mm – Fits 32 oz cups',
      'Available in dome or flat lid styles',
    ],
  },
]

// =============================================
// SEED FUNCTION
// =============================================
async function seed() {
  console.log('🟡 Creating categories...')
  const categoryRefs: Record<string, string> = {}

  for (const cat of categories) {
    const created = await client.createOrReplace({
      _type: 'category',
      _id: cat.slug,
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
    })
    categoryRefs[cat.slug] = created._id
    console.log(`✓ Category created: ${cat.title}`)
  }

  console.log('\n🟢 Creating products...')
  for (const p of products) {
    await client.create({
      _type: 'product',
      title: p.title,
      description: p.description,
      mainImage: p.mainImage,
      highResImage: p.highResImage,
      variants: p.variants,
      specifications: p.specifications,
      notes: p.notes,
      category: { _type: 'reference', _ref: categoryRefs[p.category] },
    })
    console.log(`→ Added product: ${p.title}`)
  }

  console.log('\n✅ All products and categories successfully imported!')
}

seed().catch(console.error)
