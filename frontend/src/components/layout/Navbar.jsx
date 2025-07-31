"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userButtonRef = useRef(null);
  const menuRef = useRef(null);
  const { openCart } = useCart();

  // Handle outside click for dropdown
  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  // Dropdown menu component
  function UserDropdown() {
    return (
      <div
        ref={menuRef}
        className="absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white transition"
        style={{ top: "100%" }}
      >
        <div className="py-1 flex flex-col">
          <Link
            href="/login"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setUserMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setUserMenuOpen(false)}
          >
            Create Account
          </Link>
          <Link
            href="/order-history"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setUserMenuOpen(false)}
          >
            Order History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <header className="bg-white shadow-md relative" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop navbar */}
        <div className="hidden sm:flex items-center justify-between w-full relative">
          {/* Logo */}
          <Link href="/">
            <img src="/images/allpac-logo.png" alt="Allpac Logo" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/products"
              className="px-3 py-2 rounded-lg hover:bg-gray-100 transition text-base font-semibold"
              style={{ letterSpacing: "0.01em" }}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-lg hover:bg-gray-100 transition text-base font-semibold"
              style={{ letterSpacing: "0.01em" }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-lg hover:bg-gray-100 transition text-base font-semibold"
              style={{ letterSpacing: "0.01em" }}
            >
              Contact
            </Link>
            <button
              onClick={openCart}
              className="text-allpac hover:text-red-600 cursor-pointer flex items-center"
              aria-label="View cart"
              type="button"
            >
              <ShoppingCart size={24} />
            </button>
            <div className="relative flex items-center">
              <button
                ref={userButtonRef}
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="text-allpac hover:text-red-600 cursor-pointer flex items-center mt-[2px]"
                aria-label="Account"
                type="button"
              >
                <User size={24} />
              </button>
              {userMenuOpen && <UserDropdown />}
            </div>
          </div>
        </div>
        {/* Mobile navbar */}
        <div className="flex flex-col sm:hidden w-full relative">
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <img src="/images/allpac-logo.png" alt="Allpac Logo" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={openCart}
                className="text-allpac hover:text-red-600 cursor-pointer flex items-center"
                aria-label="View cart"
                type="button"
              >
                <ShoppingCart size={24} />
              </button>
              <div className="relative flex items-center">
                <button
                  ref={userButtonRef}
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="text-allpac hover:text-red-600 cursor-pointer flex items-center mt-[2px]"
                  aria-label="Account"
                  type="button"
                >
                  <User size={24} />
                </button>
                {userMenuOpen && <UserDropdown />}
              </div>
            </div>
          </div>
          {/* Second row: centered nav links */}
          <nav className="flex justify-center space-x-6 mt-2 text-allpac text-base font-semibold w-full">
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
      </div>
    </header>
  );
}
