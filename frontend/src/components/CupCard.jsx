'use client'

import React from 'react'

export default function CupCard({ size, type, desc, qty, price, image }) {
  const pricePerCup = (price / qty).toFixed(3)

  return (
    <div className="flex bg-blue-50 rounded-xl shadow-md overflow-hidden w-[500px] h-[270px]">
      {/* Left: Image */}
      <div className="flex items-center justify-center bg-white w-[260px] h-[270px]">
        <img
          src={image}
          alt={`${size} ${type} cup`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Text */}
      <div className="p-3 flex flex-col justify-between flex-1 text-sm">
        <div>
          <h2 className="text-3xl font-bold">{size}</h2>
          <p className="text-base text-gray-700">{type} Cup</p>
          <p className="text-sm text-gray-600 mt-1">{desc}</p>

          <div className="text-sm font-semibold mt-2 space-y-1">
            <p><span className="font-bold">Qty/Case:</span> {qty}</p>
            <p><span className="font-bold">Price/Case:</span> ${price}</p>
            <p><span className="font-bold">Price/Cup:</span> ${pricePerCup}</p>
          </div>
        </div>

        <div className="mt-2">
          <input
            type="number"
            placeholder="Enter Case Quantity"
            className="w-full p-1 border border-gray-300 rounded mb-1 text-sm"
          />
          <button className="w-full bg-[#FFD814] text-black py-1 rounded hover:bg-blue-700 transition text-sm font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
