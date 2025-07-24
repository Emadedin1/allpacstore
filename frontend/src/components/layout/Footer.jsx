// src/components/layout/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Allpac. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <Link href="/about" className="hover:text-red-600">About</Link>
          <Link href="/contact" className="hover:text-red-600">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
