"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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
      {/* Row 1: logo + (desktop: nav+icons) or (mobile: icons) */}
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
        <div className="hidden sm:flex items-center space-x-6">
          <nav className="flex space-x-6 text-allpac text-sm">
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
          <Link href="/cart" className="text-allpac hover:text-red-600">
            <ShoppingCart size={20} />
          </Link>
          <button
            ref={buttonRef}
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-allpac hover:text-red-600"
          >
            <User size={20} />
          </button>
        </div>

        {/* Mobile: icons only */}
        <div className="flex sm:hidden items-center space-x-4">
          <Link href="/cart" className="text-allpac hover:text-red-600">
            <ShoppingCart size={20} />
          </Link>
          <button
            ref={buttonRef}
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-allpac hover:text-red-600"
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Row 2: mobile-only nav links */}
      <nav className="sm:hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 pb-4 flex justify-center space-x-6 text-allpac text-sm">
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </nav>

      {/* User dropdown */}
      {userMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 right-4 bg-white border shadow-md rounded-md p-4 z-50 min-w-[180px] text-sm"
        >
          <ul className="space-y-2 text-allpac">
            <li>
              <Link href="/login" onClick={() => setUserMenuOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" onClick={() => setUserMenuOpen(false)}>
                Create Account
              </Link>
            </li>
            <li>
              <Link href="/account" onClick={() => setUserMenuOpen(false)}>
                My Account
              </Link>
            </li>
            <li>
              <Link href="/order-tracking" onClick={() => setUserMenuOpen(false)}>
                Order Tracking
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left"
                onClick={() => {
                  /* logout */
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
