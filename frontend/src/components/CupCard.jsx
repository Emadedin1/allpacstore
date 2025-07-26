'use client'

import React, { useState } from 'react'

export default function CupCard({
  size,
  type,
  description,
  qtyPerCase,
  pricePerCase,
  pricePerCup,
  imageSrc,
}) {
  const [cupCount, setCupCount] = useState('')

  const handleAddToCart = () => {
    const totalCups = parseInt(cupCount)
    if (!isNaN(totalCups) && totalCups > 0) {
      const totalCases = Math.ceil(totalCups / qtyPerCase)
      console.log(`✅ Added ${totalCups} cups (${totalCases} cases) of ${size} ${type} to cart`)
      // TODO: hook this up to backend/cart system
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-10 w-90 text-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`${size} ${type} Cup`}
          className="w-20 h-20 object-contain mx-auto mb-4"
        />
      )}

      <h2 className="text-xl font-bold mb-1">{size}</h2>
      <p className="text-sm text-gray-600 mb-2">{type} Cup</p>
      <p className="text-xs text-gray-500 mb-4">{description}</p>

      <div className="text-sm text-left mb-4">
        <p><strong>Qty/Case:</strong> {qtyPerCase}</p>
        <p><strong>Price/Case:</strong> ${pricePerCase}</p>
        <p><strong>Price/Cup:</strong> ${pricePerCup}</p>
      </div>

      <input
        type="number"
        placeholder="Enter total cups"
        className="border border-gray-300 rounded-md px-3 py-1 w-full mb-2 text-sm"
        value={cupCount}
        onChange={(e) => setCupCount(e.target.value)}
      />

      <button
        onClick={handleAddToCart}
        className="bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md w-full hover:bg-red-700"
      >
        Add to Cart
      </button>

      <div className="mt-2">
        <a href="/contact" className="text-xs text-blue-600 underline">
          Request a Free Design
        </a>
      </div>
    </div>
  )
}
