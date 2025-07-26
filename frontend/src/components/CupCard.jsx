// src/components/CupCard.jsx
'use client'
import React from 'react'

export default function CupCard({ size, type, desc, qty, price, image }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white border border-gray-200 rounded-2xl shadow p-6 mb-8">
      <img
        src={image}
        alt={`${size} ${type} Cup`}
        className="w-32 h-32 object-contain"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{size} {type} Cup</h2>
        <p className="text-sm text-gray-600 mb-2">{desc}</p>
        <ul className="text-sm text-gray-700 mb-4">
          <li><strong>Quantity per case:</strong> {qty}</li>
          <li><strong>Price per case:</strong> ${price}</li>
          <li><strong>Price per cup:</strong> ${(price / qty).toFixed(3)}</li>
        </ul>
        <button
          className="bg-black text-white text-sm px-5 py-2 rounded hover:bg-gray-800 mr-3"
          onClick={() => {
            const section = document.getElementById('upload-section')
            if (section) section.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Upload Design
        </button>
        <button className="text-sm underline text-gray-700 hover:text-black">
          Request a Free Design
        </button>
      </div>
    </div>
  )
}
