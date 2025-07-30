import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/CartContext";

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
        <div className="hidden sm:flex items-center space-x-6">
          <nav className="flex space-x-2 text-allpac text-base font-semibold">
            <Link
              href="/products"
              className="px-2 py-1 rounded-lg hover:bg-gray-100 transition text-base"
              style={{ letterSpacing: "0.01em" }}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="px-2 py-1 rounded-lg hover:bg-gray-100 transition text-base"
              style={{ letterSpacing: "0.01em" }}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-2 py-1 rounded-lg hover:bg-gray-100 transition text-base"
              style={{ letterSpacing: "0.01em" }}
            >
              Contact
            </Link>
          </nav>
          <button
            onClick={openCart}
            className="text-allpac hover:text-red-600 no-close cursor-pointer ml-2"
            style={{ padding: "6px" }}
            aria-label="View cart"
          >
            <ShoppingCart size={22} />
          </button>
          <button
            ref={desktopUserButtonRef}
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="text-allpac hover:text-red-600 cursor-pointer ml-2"
            style={{ padding: "6px" }}
            aria-label="Account"
          >
            <User size={20} />
          </button>
        </div>

        {/* Mobile: icons only */}
        <div className="flex sm:hidden items-center space-x-4">
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
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
