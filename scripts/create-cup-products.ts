import { client } from 'src/sanity/lib/client'

// =============================================
// CATEGORY DEFINITIONS (FINAL)
// =============================================
const categories = [
  { title: 'Single Wall Cups', slug: 'single-wall-cups' },
  { title: 'Double Wall Cups', slug: 'double-wall-cups' },
  { title: 'Lids', slug: 'lids' },
]

// =============================================
// PRODUCT DATA (1 PRODUCT PER SIZE)
// =============================================
const products = [
  // ========================
  // SINGLE WALL CUPS
  // ========================
  {
    title: '10 oz Single Wall Hot Cup',
    category: 'single-wall-cups',
    description:
      '10 oz single wall paper hot cup made from food-grade paper with PE/PLA lining. Ideal for coffee and other hot drinks.',
    variants: [
      { size: '10 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '300 gsm', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Single Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Supports custom printing', 'Eco-friendly and recyclable'],
  },
  {
    title: '12 oz Single Wall Hot Cup',
    category: 'single-wall-cups',
    description:
      '12 oz single wall paper hot cup with 90 mm rim. Made with durable paper for everyday beverage service.',
    variants: [
      { size: '12 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '300 gsm', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Single Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Perfect for takeaway beverages', 'Available in white or custom print'],
  },
  {
    title: '16 oz Single Wall Hot Cup',
    category: 'single-wall-cups',
    description:
      '16 oz single wall paper hot cup with 90 mm rim. Made from premium 320 gsm paper, suitable for large hot drinks.',
    variants: [
      { size: '16 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Single Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Strong cup for hot drinks', 'Popular size for coffee shops'],
  },
  {
    title: '20 oz Single Wall Hot Cup',
    category: 'single-wall-cups',
    description:
      '20 oz single wall hot cup made with thick 320 gsm paper and PE/PLA lining. Designed for large hot drinks.',
    variants: [
      { size: '20 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Single Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Large volume hot cup', 'Ideal for specialty beverages'],
  },
  {
    title: '22 oz Single Wall Cold Cup',
    category: 'single-wall-cups',
    description:
      '22 oz single wall cold cup for cold beverages such as smoothies, iced coffee, or soft drinks.',
    variants: [
      { size: '22 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Cold cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Single Wall',
      use: 'Cold',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Durable cup for cold drinks', 'Printable design available'],
  },
  {
    title: '32 oz Single Wall Cold Cup',
    category: 'single-wall-cups',
    description:
      '32 oz single wall cold cup with 105 mm rim, ideal for large cold beverages. Made with heavy-duty paper and PE/PLA lining.',
    variants: [
      { size: '32 oz', topDia: '105 mm', packing: '1000 pcs/ctn', gsm: '320 gsm', notes: 'Cold cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Single Wall',
      use: 'Cold',
      compatibleLid: '105 mm Flat Lid',
      topDiameterRange: '105 mm',
    },
    notes: ['Designed for cold beverages', 'Compatible with 105 mm flat lid'],
  },

  // ========================
  // DOUBLE WALL CUPS
  // ========================
  {
    title: '10 oz Double Wall Hot Cup',
    category: 'double-wall-cups',
    description:
      '10 oz double wall paper hot cup offering superior insulation. No sleeve required. Made from PE/PLA lined paper.',
    variants: [
      { size: '10 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '300 gsm + outer layer', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Double Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Great heat insulation', 'No sleeve required'],
  },
  {
    title: '12 oz Double Wall Hot Cup',
    category: 'double-wall-cups',
    description:
      '12 oz double wall hot cup designed for superior heat protection. Ideal for takeaway coffee.',
    variants: [
      { size: '12 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm total', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Double Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Comfortable to hold', 'Excellent for hot beverages'],
  },
  {
    title: '16 oz Double Wall Hot Cup',
    category: 'double-wall-cups',
    description:
      '16 oz double wall paper cup with 90 mm rim. Provides extra insulation for hot drinks.',
    variants: [
      { size: '16 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm total', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Double Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Durable and comfortable', 'Popular size for takeaway coffee'],
  },
  {
    title: '20 oz Double Wall Hot Cup',
    category: 'double-wall-cups',
    description:
      '20 oz double wall paper cup for large hot beverages. Made from premium quality food-grade paper.',
    variants: [
      { size: '20 oz', topDia: '90 mm', packing: '1000 pcs/ctn', gsm: '320 gsm total', notes: 'Hot cup' },
    ],
    specifications: {
      material: 'Food-grade paper + PE/PLA',
      wallType: 'Double Wall',
      use: 'Hot',
      compatibleLid: '90 mm Dome Lid',
      topDiameterRange: '90 mm',
    },
    notes: ['Ideal for larger coffee servings', 'Strong double wall insulation'],
  },

  // ========================
  // LIDS
  // ========================
  {
    title: 'Dome Lid',
    category: 'lids',
    description:
      'Universal dome lid available in 80 mm, 90 mm, and 105 mm diameters. Designed to fit Allpac paper cups for hot and cold beverages.',
    variants: [],
    specifications: {
      material: 'PS / PP / PET',
      wallType: '-',
      use: 'Hot / Cold',
      compatibleLid: 'Fits 8 oz – 32 oz paper cups',
      topDiameterRange: '80 mm / 90 mm / 105 mm',
    },
    notes: [
      '80 mm – fits 8 oz cups',
      '90 mm – fits 10 oz–20 oz cups',
      '105 mm – fits 32 oz cold cups',
      'Available in dome and flat styles',
    ],
  },
]

// =============================================
// SEED FUNCTION
// =============================================
async function seed() {
  console.log('🟡 Creating categories...')
  const categoryRefs = {}

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
