"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // retained in case you reuse it

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Logo always at the top on mobile */}
        <div className="flex justify-center sm:justify-start mb-3 sm:mb-0">
          <Link href="/">
            <img src="/images/allpac-logo.png" alt="Allpac Logo" className="h-15 w-auto" />
          </Link>
        </div>

        {/* Menu items always shown, stacked on mobile */}
        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm sm:text-base">
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
