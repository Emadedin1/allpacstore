"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const desktopUserButtonRef = useRef(null);
  const { openCart } = useCart();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        (!desktopUserButtonRef.current || !desktopUserButtonRef.current.contains(e.target))
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md relative" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Top row: logo left, icons right */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/allpac-logo.png"
            alt="Allpac Logo"
            className="h-12 w-auto"
          />
        </Link>
        {/* Right-side icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={openCart}
            className="text-allpac hover:text-red-600 no-close cursor-pointer"
            aria-label="View cart"
          >
            <ShoppingCart size={24} />
          </button>
          <button
            ref={desktopUserButtonRef}
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-allpac hover:text-red-600 cursor-pointer"
            aria-label="Account"
          >
            <User size={22} />
          </button>
        </div>
      </div>
      {/* Second row: nav links centered */}
      <div className="max-w-7xl mx-auto px-4 pb-4 flex justify-center w-full">
        <nav className="flex space-x-6 text-allpac text-base font-semibold">
          <Link
            href="/products"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 transition text-base"
            style={{ letterSpacing: "0.01em" }}
          >
            Products
          </Link>
          <Link
            href="/about"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 transition text-base"
            style={{ letterSpacing: "0.01em" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 transition text-base"
            style={{ letterSpacing: "0.01em" }}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
