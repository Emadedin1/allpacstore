"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu on outside click — but ignore clicks on menu or icon
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start mb-3 sm:mb-0">
          <Link href="/">
            <img src="/images/allpac-logo.png" alt="Allpac Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Nav & Icons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto sm:justify-end">
          <nav className="flex justify-center gap-4 text-sm sm:text-base text-allpac">
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>

          <div className="flex justify-center sm:justify-end gap-4 items-center relative">
            <Link href="/cart" className="text-allpac hover:text-red-600">
              <ShoppingCart size={20} />
            </Link>

            {/* 👤 User Icon */}
            <button
              ref={buttonRef}
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="text-allpac hover:text-red-600"
            >
              <User size={20} />
            </button>

            {/* Menu */}
            {userMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-10 right-0 bg-white border shadow-md rounded-md p-4 z-50 min-w-[180px] text-sm"
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
                    <button className="w-full text-left" onClick={() => {/* logout */}}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
