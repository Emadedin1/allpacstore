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
      const isInDesktopBtn = desktopUserButtonRef.current && desktopUserButtonRef.current.contains(e.target);
      const isInMobileBtn = mobileUserButtonRef.current && mobileUserButtonRef.current.contains(e.target);
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
              <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Login</Link>
              <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Create Account</Link>
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
                window.dispatchEvent(new Event("userNameChanged"));
              }}
            >Logout</button>
          )}
          <Link href="/order-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>Order History</Link>
        </div>
      </div>
    );
  }

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenuOpen((prev) => !prev);
  };

  // Font choices for nav links
  const navFontClass = "font-medium tracking-tight text-[1.05rem] sm:text-[1.08rem]";
  const navBtnClass = "px-2.5 py-2 rounded hover:bg-gray-100 transition";

  return (
    <header className="bg-white shadow-md relative" style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop navbar - logo, then right section */}
        <div className="hidden sm:flex items-center justify-between w-full relative">
          {/* Left: logo */}
          <Link href="/">
            <img src="/images/allpac-logo.png" alt="Allpac Logo" className="h-12 w-auto" />
          </Link>
          {/* Right section: nav links + cart + user */}
          <div className="flex items-center space-x-8">
            {/* Nav links next to cart and user */}
            <Link href="/products" className={`${navFontClass} ${navBtnClass}`}>Products</Link>
            <Link href="/about" className={`${navFontClass} ${navBtnClass}`}>About</Link>
            <Link href="/contact" className={`${navFontClass} ${navBtnClass}`}>Contact</Link>
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
                className="text-allpac hover:text-red-600 cursor-pointer flex items-center"
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
          {/* Top row: logo, cart, user */}
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <img src="/images/allpac-logo.png" alt="Allpac Logo" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center space-x-4">
              <button onClick={openCart} className="text-allpac hover:text-red-600 cursor-pointer flex items-center" aria-label="View cart" type="button">
                <ShoppingCart size={24} />
              </button>
              <div className="relative flex items-center">
                <button ref={mobileUserButtonRef} onClick={toggleUserMenu} className="text-allpac hover:text-red-600 cursor-pointer flex items-center" aria-label="Account" type="button">
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
          {/* Thin horizontal line for mobile only */}
          <hr className="border-t border-gray-300 mt-4 mb-0" />
          {/* Second row: main nav links */}
          <nav className="flex justify-center space-x-7 mt-2 text-allpac w-full">
            <Link href="/products" className={`${navFontClass} ${navBtnClass}`}>Products</Link>
            <Link href="/about" className={`${navFontClass} ${navBtnClass}`}>About</Link>
            <Link href="/contact" className={`${navFontClass} ${navBtnClass}`}>Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
