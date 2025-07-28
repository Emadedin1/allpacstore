"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { openCart } = useCart();

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/allpac-logo.png"
            alt="Allpac Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop: nav links + icons */}
        <div className="hidden sm:flex items-center space-x-8">
          <nav className="flex space-x-8 text-allpac text-base font-semibold">
            <Link
              href="/products"
              className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-lg"
              style={{ letterSpacing: "0.01em" }}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-lg"
              style={{ letterSpacing: "0.01em" }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-lg"
              style={{ letterSpacing: "0.01em" }}
            >
              Contact
            </Link>
          </nav>
          <button
            onClick={openCart}
            className="text-allpac hover:text-red-600 no-close cursor-pointer ml-2"
            style={{ padding: "10px" }}
            aria-label="View cart"
          >
            <ShoppingCart size={30} />
          </button>
          <button
            ref={buttonRef}
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-allpac hover:text-red-600 cursor-pointer ml-2"
            style={{ padding: "10px" }}
            aria-label="Account"
          >
            <User size={28} />
          </button>
        </div>

        {/* Mobile: icons only, stay on logo's row */}
        <div className="flex sm:hidden items-center space-x-6">
          <button
            onClick={openCart}
            className="text-allpac hover:text-red-600 no-close cursor-pointer"
            aria-label="View cart"
          >
            <ShoppingCart size={30} />
          </button>
          <button
            ref={buttonRef}
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-allpac hover:text-red-600 cursor-pointer"
            aria-label="Account"
          >
            <User size={28} />
          </button>
        </div>
      </div>

      {/* Row 2: mobile-only nav links */}
      <nav className="sm:hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 pb-4 flex justify-center space-x-6 text-allpac text-base font-semibold">
          <Link
            href="/products"
            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-lg"
            style={{ letterSpacing: "0.01em" }}
          >
            Products
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-lg"
            style={{ letterSpacing: "0.01em" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition text-lg"
            style={{ letterSpacing: "0.01em" }}
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* User dropdown */}
      {userMenuOpen && (
        <div
          ref={menuRef}
          // ...rest of your dropdown logic
        />
      )}
    </header>
  );
}
