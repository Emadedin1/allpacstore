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

  useEffect(() => {
    function updateUserName() {
      const name = localStorage.getItem("name");
      setUserName(name || "");
    }
    updateUserName();
    window.addEventListener("storage", updateUserName);
    window.addEventListener("focus", updateUserName);
    window.addEventListener("userNameChanged", updateUserName);
    return () => {
      window.removeEventListener("storage", updateUserName);
      window.removeEventListener("focus", updateUserName);
      window.removeEventListener("userNameChanged", updateUserName);
    };
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(e) {
      const isInMenu = menuRef.current && menuRef.current.contains(e.target);
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

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenuOpen((prev) => !prev);
  };

  function UserDropdown() {
    const dropdownItemClass =
      "block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus-visible:bg-gray-100";
    return (
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white"
        style={{ top: "100%" }}
      >
        <div className="py-1 flex flex-col" role="menu" aria-label="User menu">
          {!userName && (
            <>
              <Link
                href="/login"
                className={dropdownItemClass}
                onClick={() => setUserMenuOpen(false)}
                role="menuitem"
              >
                Login
              </Link>
              <Link
                href="/register"
                className={dropdownItemClass}
                onClick={() => setUserMenuOpen(false)}
                role="menuitem"
              >
                Create Account
              </Link>
            </>
          )}
          {userName && (
            <button
              className={`${dropdownItemClass} text-left w-full`}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                setUserMenuOpen(false);
                setUserName("");
                window.dispatchEvent(new Event("userNameChanged"));
              }}
              role="menuitem"
              type="button"
            >
              Logout
            </button>
          )}
          <Link
            href="/order-history"
            className={dropdownItemClass}
            onClick={() => setUserMenuOpen(false)}
            role="menuitem"
          >
            Order History
          </Link>
        </div>
      </div>
    );
  }

  // Small vertical adjustment for nav links (push down by 2px)
  const navFontClass = "font-medium tracking-tight text-[1.08rem]";
  // Light brand-green hover with rounded background
  const navBtnClass =
    "px-3 py-1 rounded-lg flex items-center transition-colors hover:bg-[#1F8248]/10 hover:text-[#1F8248] focus-visible:bg-[#1F8248]/15 focus-visible:text-[#1F8248] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F8248]/40";
  const navLinkStyle = { position: "relative", top: "2px" }; // pushes links down by 2px

  return (
    <header
      className="bg-white shadow-md relative"
      style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop navbar - logo, then right section */}
        <div className="hidden sm:flex items-center justify-between w-full relative">
          {/* Left: logo */}
          <Link href="/">
            <img
              src="/images/allpac-logo.png"
              alt="Allpac Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Right: nav links, cart, user */}
          <div className="flex items-center gap-x-8">
            <Link
              href="/products"
              className={`${navFontClass} ${navBtnClass}`}
              style={navLinkStyle}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`${navFontClass} ${navBtnClass}`}
              style={navLinkStyle}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`${navFontClass} ${navBtnClass}`}
              style={navLinkStyle}
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
                className="group text-allpac hover:text-red-600 cursor-pointer flex items-center"
                aria-label="Account"
                type="button"
              >
                <User size={24} />
                {userName && (
                  <span
                    className="ml-2 font-semibold text-gray-800 max-w-[120px] truncate group-hover:text-red-600"
                    title={userName}
                  >
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
          {/* Top row: logo, cart, user */}
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
                  className="group text-allpac hover:text-red-600 cursor-pointer flex items-center"
                  aria-label="Account"
                  type="button"
                >
                  <User size={24} />
                  {userName && (
                    <span
                      className="ml-2 font-semibold text-gray-800 max-w-[80px] truncate group-hover:text-red-600"
                      title={userName}
                    >
                      {userName}
                    </span>
                  )}
                </button>
                {userMenuOpen && <UserDropdown />}
              </div>
            </div>
          </div>

          {/* Thin horizontal line for mobile only */}
          <hr className="border-t border-gray-300 mt-4 mb-0" />

          {/* Second row: main nav links */}
          <nav className="flex justify-center space-x-7 mt-2 text-allpac w-full">
            <Link href="/products" className={`${navFontClass} ${navBtnClass}`}>
              Products
            </Link>
            <Link href="/about" className={`${navFontClass} ${navBtnClass}`}>
              About
            </Link>
            <Link href="/contact" className={`${navFontClass} ${navBtnClass}`}>
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
