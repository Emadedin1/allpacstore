// src/context/CartContext.jsx
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

  /**
   * @param {Object} item           - product object (must have slug, size, image, etc.)
   * @param {number} qty            - number of cups to add
   * @param {File|null} uploadedDesign
   * @param {string} previewURL
   * @param {string} designType     - "Plain White" or custom preset name
   * @param {number} pricePerCup    - price per cup based on designType
   */
  function addItem(
    item,
    qty = 1,
    uploadedDesign = null,
    previewURL = "",
    designType = "Plain White",
    pricePerCup = 0
  ) {
    const designName = uploadedDesign?.name || designType;
    const uniqueKey = `${item.slug}-${designType}-${designName}`;

    setCartItems((cur) => {
      const exists = cur.find((c) => c.key === uniqueKey);

      if (exists) {
        return cur.map((c) =>
          c.key === uniqueKey
            ? { ...c, quantity: c.quantity + qty }
            : c
        );
      }

      return [
        ...cur,
        {
          key: uniqueKey,
          slug: item.slug,
          size: item.size,
          image: item.image,
          quantity: qty,
          uploadedDesign,
          previewURL,
          designType,
          designName: uploadedDesign?.name || "",
          pricePerCup,
        },
      ];
    });
  }

  function updateItemQty(key, quantity) {
    setCartItems((cur) =>
      cur.map((c) =>
        c.key === key
          ? { ...c, quantity }
          : c
      )
    );
  }

  const removeItem = (key) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.key !== key)
    );
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
