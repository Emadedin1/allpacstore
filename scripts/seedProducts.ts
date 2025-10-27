import 'dotenv/config'
import { client } from '@sanity/lib/client'

interface SizeOption {
  size: string
  topDiameterMM: number
  wall: 'Single' | 'Double'
}

interface ProductData {
  _type: 'product'
  _id?: string
  _createdAt?: string
  _updatedAt?: string
  _rev?: string
  title: string
  description: string
  material: string
  liningMaterial: string
  foodGrade: boolean
  quantityPerCase: string
  sizes: SizeOption[]
  specs: {
    use: string
    recyclable: boolean
    madeIn: string
  }
}

const products: ProductData[] = [
  {
    _type: 'product',
    title: 'Single Wall Paper Cup',
    description:
      'High-quality paperboard cups suitable for both hot and cold beverages. These single-wall cups are lined with PE or PLA for superior leak resistance and are ideal for cafes, restaurants, and events.',
    material: 'Paperboard',
    liningMaterial: 'PE/PLA',
    foodGrade: true,
    quantityPerCase: '1000pcs/case',
    sizes: [
      { size: '4oz', topDiameterMM: 62, wall: 'Single' },
      { size: '8oz', topDiameterMM: 80, wall: 'Single' },
      { size: '10oz', topDiameterMM: 90, wall: 'Single' },
      { size: '12oz', topDiameterMM: 90, wall: 'Single' },
      { size: '16oz', topDiameterMM: 90, wall: 'Single' },
      { size: '20oz', topDiameterMM: 90, wall: 'Single' },
      { size: '24oz', topDiameterMM: 90, wall: 'Single' },
      { size: '22oz', topDiameterMM: 90, wall: 'Single' },
      { size: '32oz', topDiameterMM: 105, wall: 'Single' },
    ],
    specs: {
      use: 'Hot & Cold Drinks',
      recyclable: true,
      madeIn: 'Canada',
    },
  },
  {
    _type: 'product',
    title: 'Double Wall Paper Cup',
    description:
      'Premium double-wall paper cups with two layers for superior insulation and comfort. Designed to keep beverages hot while maintaining a cool exterior surface. Ideal for coffee shops and high-temperature drinks.',
    material: 'Paperboard',
    liningMaterial: 'PE/PLA',
    foodGrade: true,
    quantityPerCase: '1000pcs/case',
    sizes: [
      { size: '8oz', topDiameterMM: 80, wall: 'Double' },
      { size: '10oz', topDiameterMM: 90, wall: 'Double' },
      { size: '12oz', topDiameterMM: 90, wall: 'Double' },
      { size: '16oz', topDiameterMM: 90, wall: 'Double' },
      { size: '20oz', topDiameterMM: 90, wall: 'Double' },
    ],
    specs: {
      use: 'Hot Drinks',
      recyclable: true,
      madeIn: 'Canada',
    },
  },
]

async function seedProducts(): Promise<void> {
  try {
    for (const product of products) {
      await client.create(product)
      console.log(`✅ Created product: ${product.title}`)
    }
    console.log('🎉 Done seeding products!')
  } catch (err: any) {
    console.error('❌ Error seeding products:', err.message)
  }
}

seedProducts()

