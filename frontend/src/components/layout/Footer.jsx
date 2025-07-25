"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Allpac</h3>
          <p className="text-sm">
            Custom-printed paper cups delivered fast. Eco-friendly options. Built with quality.
          </p>
        </div>

        <div>
          <h4 className="text-md font-semibold text-white mb-2">Navigation</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/checkout" className="hover:text-white">Checkout</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold text-white mb-2">Contact</h4>
          <p className="text-sm">Windsor, ON, Canada</p>
          <p className="text-sm">Email: info@allpacgroup.com</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Allpac. All rights reserved.
      </div>
    </footer>
  );
}
