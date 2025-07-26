'use client'

import React from 'react'
import CupCard from './CupCard'

const cupList = [
  {
    size: '10 oz',
    type: 'Hot',
    desc: 'Double-wall insulated hot cup for coffee or tea.',
    qty: 1000,
    price: 92,
    image: '/cups/10oz.png',
    pricePerCup: (92 / 1000).toFixed(3)
  },
  {
    size: '12 oz',
    type: 'Hot',
    desc: 'Most popular size for cafes. Double-wall for insulation.',
    qty: 1000,
    price: 94,
    image: '/cups/12oz.png',
    pricePerCup: (94 / 1000).toFixed(3)
  },
  {
    size: '16 oz',
    type: 'Hot',
    desc: 'Larger size for lattes and premium hot beverages.',
    qty: 1000,
    price: 96,
    image: '/cups/16oz.png',
    pricePerCup: (96 / 1000).toFixed(3)
  },
  {
    size: '22 oz',
    type: 'Cold',
    desc: 'Perfect for soft drinks, smoothies, and cold beverages.',
    qty: 1000,
    price: 88,
    image: '/cups/22oz.png',
    pricePerCup: (88 / 1000).toFixed(3)
  },
  {
    size: '32 oz',
    type: 'Cold',
    desc: 'Extra large cold cup, great for events or promotions.',
    qty: 1000,
    price: 90,
    image: '/cups/32oz.png',
    pricePerCup: (90 / 1000).toFixed(3)
  }
]

export default function ProductSections() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">All Our Cups</h2>
      <div className="flex flex-wrap justify-center gap-6">


        {cupList.map((cup, idx) => (
          <CupCard
            key={idx}
            size={cup.size}
            type={cup.type}
            description={cup.desc}
            qtyPerCase={cup.qty}
            pricePerCase={cup.price}
            pricePerCup={cup.pricePerCup}
            imageSrc={cup.image}
          />
        ))}
      </div>
    </div>
  )
}
