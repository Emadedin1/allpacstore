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

  // Load/display stored user name
  useEffect(() => {
    const updateUserName = () =>
      setUserName(localStorage.getItem("name") || "");
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

  // Close menu when clicking outside
  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(e) {
      const insideMenu = menuRef.current?.contains(e.target);
      const insideDesktopBtn = desktopUserButtonRef.current?.contains(e.target);
      const insideMobileBtn = mobileUserButtonRef.current?.contains(e.target);
      if (!insideMenu && !insideDesktopBtn && !insideMobileBtn) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenuOpen((p) => !p);
  };

  function UserDropdown() {
    const itemCls =
      "block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer focus:outline-none focus-visible:bg-gray-100";
    return (
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5"
        style={{ top: "100%" }}
        role="menu"
        aria-label="User menu"
      >
        <div className="py-1 flex flex-col">
          {!userName && (
            <>
              <Link
                href="/login"
                className={itemCls}
                role="menuitem"
                onClick={() => setUserMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={itemCls}
                role="menuitem"
                onClick={() => setUserMenuOpen(false)}
              >
                Create Account
              </Link>
            </>
          )}
          {userName && (
            <button
              type="button"
              role="menuitem"
              className={`${itemCls} text-left w-full`}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                setUserMenuOpen(false);
                setUserName("");
                window.dispatchEvent(new Event("userNameChanged"));
              }}
            >
              Logout
            </button>
          )}
          <Link
            href="/order-history"
            className={itemCls}
            role="menuitem"
            onClick={() => setUserMenuOpen(false)}
          >
            Order History
          </Link>
        </div>
      </div>
    );
  }

  // Explicit black base text
  const navFontClass =
    "font-medium tracking-tight text-[1.08rem] text-black leading-none";
  const navBtnClass =
    "px-3 py-1 rounded-lg flex items-center transition-colors text-black hover:text-black/70 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30";

  return (
    <header
      className="relative z-50 bg-white/70 backdrop-blur-md shadow-sm"
      style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop navbar */}
        <div className="hidden sm:flex items-center justify-between w-full">
          <Link href="/">
            <img
              src="/images/allpac-logo.png"
              alt="Allpac Logo"
              className="h-12 w-auto"
            />
          </Link>

            <div className="flex items-center gap-6">
            <Link
              href="/products"
              className={`${navFontClass} ${navBtnClass} relative top-[2px]`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`${navFontClass} ${navBtnClass} relative top-[2px]`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`${navFontClass} ${navBtnClass} relative top-[2px]`}
            >
              Contact
            </Link>

            <button
              onClick={openCart}
              aria-label="View cart"
              type="button"
              className="text-black hover:text-black/70 transition-colors flex items-center"
            >
              <ShoppingCart size={24} />
            </button>

            <div className="relative flex items-center">
              <button
                ref={desktopUserButtonRef}
                onClick={toggleUserMenu}
                aria-label="Account"
                type="button"
                className="group text-black hover:text-black/70 transition-colors flex items-center"
              >
                <User size={24} />
                {userName && (
                  <span
                    className="ml-2 font-semibold text-gray-800 max-w-[140px] truncate group-hover:text-black/70"
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
        <div className="flex flex-col sm:hidden w-full">
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
                aria-label="View cart"
                type="button"
                className="text-black hover:text-black/70 transition-colors flex items-center"
              >
                <ShoppingCart size={24} />
              </button>
              <div className="relative flex items-center">
                <button
                  ref={mobileUserButtonRef}
                  onClick={toggleUserMenu}
                  aria-label="Account"
                  type="button"
                  className="group text-black hover:text-black/70 transition-colors flex items-center"
                >
                  <User size={24} />
                  {userName && (
                    <span
                      className="ml-2 font-semibold text-gray-800 max-w-[80px] truncate group-hover:text-black/70"
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

          <hr className="border-t border-gray-300 mt-4 mb-0" />

          <nav className="flex justify-center space-x-7 mt-2 w-full">
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
