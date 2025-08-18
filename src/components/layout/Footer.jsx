"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-0">
      <div
        className="
          max-w-7xl mx-auto px-4
          flex flex-col sm:flex-row justify-between items-start
          gap-4 sm:gap-10
        "
      >
        {/* Logo & Tagline */}
        <div className="flex-1 min-w-[200px] pt-2 pb-6 sm:pb-8">
          <h3 className="text-xl font-bold text-white mb-2">Allpac</h3>
          <p className="text-sm leading-relaxed">
            Wholesale paper cups delivered fast. <br />
            Eco-friendly options. Built with quality.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 min-w-[200px] pt-2 pb-6 sm:pb-8">
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[200px] pt-2 pb-6 sm:pb-8">
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <address className="not-italic text-sm mb-1">
            <a
              href="https://maps.google.com/?q=3324%20Marentette%20Ave%2C%20Windsor%2C%20ON%20N8X%204G4"
              className="hover:text-white cursor-pointer"
              aria-label="Open address in Google Maps"
            >
              <div className="flex items-start gap-1">
                <span aria-hidden="true" className="leading-none mt-[1px]">📍</span>
                <div className="-ml-0.5">
                  <span className="block">3324 Marentette Ave</span>
                  <span className="block">Windsor, ON N8X 4G4</span>
                </div>
              </div>
            </a>
          </address>
          <p className="text-sm">
            ✉️{" "}
            <a href="mailto:info@allpacgroup.com" className="hover:text-white">
              info@allpacgroup.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-0 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Allpac. All rights reserved.
      </div>
    </footer>
  );
}
