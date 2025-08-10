"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-0">
      <div className="
        max-w-7xl mx-auto px-4
        flex flex-col sm:flex-row justify-between items-start
        gap-10
      ">
        {/* Logo & Tagline */}
        <div className="flex-1 min-w-[200px] pt-2 pb-6">
          <h3 className="text-xl font-bold text-white mb-2">Allpac</h3>
          <p className="text-sm leading-relaxed">
            Wholesale paper cups delivered fast. <br />
            Eco-friendly options. Built with quality.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 min-w-[200px] pt-2 pb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[200px] pt-2 pb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm mb-1">📍 Windsor, Ontario, Canada</p>
          <p className="text-sm">✉️ <a href="mailto:info@allpacgroup.com" className="hover:text-white">info@allpacgroup.com</a></p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-0 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Allpac. All rights reserved.
      </div>
    </footer>
  );
}
