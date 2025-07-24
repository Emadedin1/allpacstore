"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-12 py-6 text-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Allpac. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
