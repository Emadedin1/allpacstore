"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // load from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) setCartItems(JSON.parse(data));
  }, []);

  // save to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addItem(item, qty = 1) {
    setCartItems((cur) => {
      const exists = cur.find((c) => c.slug === item.slug);
      if (exists) {
        return cur.map((c) =>
          c.slug === item.slug
            ? { ...c, quantity: c.quantity + qty }
            : c
        );
      }
      return [...cur, { ...item, quantity: qty }];
    });
  }

  function updateItemQty(slug, quantity) {
    setCartItems((cur) =>
      cur.map((c) => (c.slug === slug ? { ...c, quantity } : c))
    );
  }

  function removeItem(slug) {
    setCartItems((cur) => cur.filter((c) => c.slug !== slug));
  }

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        updateItemQty,
        removeItem,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
