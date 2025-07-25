"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-red-600">
          Allpac
        </Link>

        <button
          className="sm:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <nav className={`sm:flex gap-6 ${isOpen ? "block mt-4" : "hidden"} sm:mt-0`}>
          <Link href="/" className="block py-1 text-gray-700 hover:text-red-600">Home</Link>
          <Link href="/products" className="block py-1 text-gray-700 hover:text-red-600">Products</Link>
          <Link href="/paper-cups" className="block py-1 text-gray-700 hover:text-red-600">Paper Cups</Link>
          <Link href="/about" className="block py-1 text-gray-700 hover:text-red-600">About</Link>
          <Link href="/contact" className="block py-1 text-gray-700 hover:text-red-600">Contact</Link>
          <Link href="/cart" className="block py-1 text-gray-700 hover:text-red-600">Cart</Link>
          <Link href="/checkout" className="block py-1 text-gray-700 hover:text-red-600">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
