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

  function addItem(item, qty = 1, uploadedDesign = null, previewURL = "", designType = "Plain White") {
    const designName = uploadedDesign?.name || designType;
    const uniqueKey = `${item.slug}-${designType}-${designName}`;

    setCartItems((cur) => {
      const exists = cur.find((c) => c.key === uniqueKey);

      if (exists) {
        return cur.map((c) =>
          c.key === uniqueKey ? { ...c, quantity: c.quantity + qty } : c
        );
      }

      return [
        ...cur,
        {
          ...item,
          quantity: qty,
          uploadedDesign,
          previewURL,
          designName: uploadedDesign?.name || "",
          designType,
          key: uniqueKey,
        },
      ];
    });
  }

  function updateItemQty(key, quantity) {
    setCartItems((cur) =>
      cur.map((c) => (c.key === key ? { ...c, quantity } : c))
    );
  }

  const removeItem = (key) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };


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
