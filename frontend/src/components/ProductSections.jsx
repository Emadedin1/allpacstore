// src/components/ProductSections.jsx
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
    image: '/cups/10oz.png'
  },
  {
    size: '12 oz',
    type: 'Hot',
    desc: 'Most popular size for cafes. Double-wall for insulation.',
    qty: 1000,
    price: 94,
    image: '/cups/12oz.png'
  },
  {
    size: '16 oz',
    type: 'Hot',
    desc: 'Larger size for lattes and premium hot beverages.',
    qty: 1000,
    price: 96,
    image: '/cups/16oz.png'
  },
  {
    size: '22 oz',
    type: 'Cold',
    desc: 'Perfect for soft drinks, smoothies, and cold beverages.',
    qty: 1000,
    price: 88,
    image: '/cups/22oz.png'
  },
  {
    size: '32 oz',
    type: 'Cold',
    desc: 'Extra large cold cup, great for events or promotions.',
    qty: 1000,
    price: 90,
    image: '/cups/32oz.png'
  }
]

export default function ProductSections() {
  return (
    <section className="px-4 md:px-20 py-12 bg-gray-50">
      <h1 className="text-3xl font-bold mb-10 text-center">All Our Cups</h1>
      {cupList.map((cup, i) => (
        <CupCard key={i} {...cup} />
      ))}
    </section>
  )
}
