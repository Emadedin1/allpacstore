"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react"; // Make sure you're using lucide-react or another icon lib

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <img src="/images/allpac-logo.png" alt="Allpac Logo" className="h-15 w-auto" />
        </Link>


        <button
          className="sm:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <nav className={`sm:flex items-center gap-6 ${isOpen ? "block mt-4" : "hidden"} sm:mt-0`}>
          <Link href="/" className="text-gray-700 hover:text-red-600">Home</Link>
          <Link href="/products" className="text-gray-700 hover:text-red-600">Products</Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-600">Contact</Link>
          <Link href="/checkout" className="text-gray-700 hover:text-red-600">Checkout</Link>
          <Link href="/cart" className="flex items-center gap-1 text-gray-700 hover:text-red-600">
            <ShoppingCart size={18} />
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
