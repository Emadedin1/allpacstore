"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  // Separate refs for desktop and mobile user buttons
  const desktopUserButtonRef = useRef(null);
  const mobileUserButtonRef = useRef(null);
  const { openCart } = useCart();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        (!desktopUserButtonRef.current || !desktopUserButtonRef.current.contains(e.target)) &&
        (!mobileUserButtonRef.current || !mobileUserButtonRef.current.contains(e.target))
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="bg-white shadow-md relative"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
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
          <nav className="flex space-x-4 text-allpac text-base font-semibold">
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
            ref={desktopUserButtonRef}
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-allpac hover:text-red-600 cursor-pointer ml-2"
            style={{ padding: "10px" }}
            aria-label="Account"
          >
            <User size={20} />
          </button>
        </div>

        {/* Mobile: nav links + icons */}
        <div className="flex flex-col sm:hidden items-center w-full">
          <nav className="flex flex-col items-center w-full">
            <Link
              href="/products"
              className="py-2 w-full text-center hover:bg-gray-100 transition text-base font-semibold"
              style={{ letterSpacing: "0.01em" }}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="py-2 w-full text-center hover:bg-gray-100 transition text-base font-semibold"
              style={{ letterSpacing: "0.01em" }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="py-2 w-full text-center hover:bg-gray-100 transition text-base font-semibold"
              style={{ letterSpacing: "0.01em" }}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-6 mt-2">
            <button
              onClick={openCart}
              className="text-allpac hover:text-red-600 no-close cursor-pointer"
              aria-label="View cart"
            >
              <ShoppingCart size={22} />
            </button>
            <button
              ref={mobileUserButtonRef}
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="text-allpac hover:text-red-600 cursor-pointer"
              aria-label="Account"
            >
              <User size={28} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
