"use client";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const desktopUserButtonRef = useRef(null);
  const mobileUserButtonRef = useRef(null);
  const menuRef = useRef(null);
  const { openCart } = useCart();

  // Check for logged in user on component mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!userMenuOpen) return;

    function handleClickOutside(e) {
      const isInMenu =
        menuRef.current && menuRef.current.contains(e.target);
      const isInDesktopBtn =
        desktopUserButtonRef.current &&
        desktopUserButtonRef.current.contains(e.target);
      const isInMobileBtn =
        mobileUserButtonRef.current &&
        mobileUserButtonRef.current.contains(e.target);
      if (!isInMenu && !isInDesktopBtn && !isInMobileBtn) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userMenuOpen]);

  function UserDropdown() {
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      setUserName("");
      setUserMenuOpen(false);
      // Optionally redirect to home or login page
      window.location.href = "/";
    };

    return (
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white"
        style={{ top: "100%" }}
      >
        <div className="py-1 flex flex-col">
          {userName ? (
            // Logged in user options
            <>
              <div className="px-4 py-2 text-gray-700 font-medium border-b">
                Welcome, {userName}
              </div>
              <Link
                href="/order-history"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setUserMenuOpen(false)}
              >
                Order History
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            // Not logged in options
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenuOpen((prev) => !prev);
  };

  return (
    <header
      className="bg-white shadow-md relative"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop navbar */}
        <div className="hidden sm:flex items-center justify-between w-full relative">
          {/* Logo */}
          <Link href="/">
            <img
              src="/images/allpac-logo.png"
              alt="Allpac Logo"
              className="h-12 w-auto"
            />
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
                ref={desktopUserButtonRef}
                onClick={toggleUserMenu}
                className="text-allpac hover:text-red-600 cursor-pointer flex items-center mt-[2px]"
                aria-label="Account"
                type="button"
              >
                <User size={24} />
                {userName && (
                  <span className="ml-2 text-sm font-medium">
                    {userName}
                  </span>
                )}
              </button>
              {userMenuOpen && <UserDropdown />}
            </div>
          </div>
        </div>

        {/* Mobile navbar */}
        <div className="flex flex-col sm:hidden w-full relative">
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <img
                src="/images/allpac-logo.png"
                alt="Allpac Logo"
                className="h-12 w-auto"
              />
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
                  ref={mobileUserButtonRef}
                  onClick={toggleUserMenu}
                  className="text-allpac hover:text-red-600 cursor-pointer flex items-center mt-[2px]"
                  aria-label="Account"
                  type="button"
                >
                  <User size={24} />
                  {userName && (
                    <span className="ml-1 text-sm font-medium">
                      {userName}
                    </span>
                  )}
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
