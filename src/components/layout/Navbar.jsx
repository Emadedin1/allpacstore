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

  // Fetch user name from localStorage on mount and when storage changes
  useEffect(() => {
    function updateUserName() {
      const name = localStorage.getItem("name");
      setUserName(name || "");
    }
    updateUserName();

    // Listen for changes to localStorage from other tabs/windows
    window.addEventListener("storage", updateUserName);
    window.addEventListener("focus", updateUserName);
    // Listen for our custom event for instant update after login
    window.addEventListener("userNameChanged", updateUserName);

    return () => {
      window.removeEventListener("storage", updateUserName);
      window.removeEventListener("focus", updateUserName);
      window.removeEventListener("userNameChanged", updateUserName);
    };
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
    return (
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white"
        style={{ top: "100%" }}
      >
        <div className="py-1 flex flex-col">
          {!userName && (
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
            </>
          )}
          {userName && (
            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                setUserMenuOpen(false);
                setUserName("");
                // Optionally, window.location.reload();
                window.dispatchEvent(new Event("userNameChanged"));
              }}
            >
              Logout
            </button>
          )}
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
                  <span className="ml-2 font-semibold text-gray-800 max-w-[120px] truncate" title={userName}>
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
                    <span className="ml-2 font-semibold text-gray-800 max-w-[80px] truncate" title={userName}>
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
