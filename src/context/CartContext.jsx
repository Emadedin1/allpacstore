// src/context/CartContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Which item should be in "edit" mode in the cart drawer
  const [activeEditKey, setActiveEditKey] = useState(null);

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
   * @param {Object} item           - product object (must have slug, size, image, priceCase, qtyCase)
   * @param {number} qty            - number of cups to add (MOQ on first add)
   * @param {File|null} uploadedDesign
   * @param {string} previewURL
   * @param {string} designType     - "Plain White" or custom preset name
   * @param {number|undefined} pricePerCup    - price per cup (pass when you know it)
   */
  function addItem(
    item,
    qty = 1,
    uploadedDesign = null,
    previewURL = "",
    designType = "Plain White",
    pricePerCup = undefined
  ) {
    // Safe price-per-cup fallback from the item itself
    const computedPpc =
      pricePerCup ??
      (item?.priceCase && item?.qtyCase ? item.priceCase / item.qtyCase : undefined);

    const designName = uploadedDesign?.name || designType;
    const uniqueKey = `${item.slug}-${designType}-${designName}`;

    setCartItems((cur) => {
      const idx = cur.findIndex((c) => c.key === uniqueKey);

      if (idx !== -1) {
        // Item already in cart: keep existing quantity (do NOT add qty again)
        const updated = [...cur];
        const exists = updated[idx];

        // If existing item had no pricePerCup but we computed one now, fill it in
        const maybeUpdate =
          exists.pricePerCup == null && computedPpc != null
            ? { pricePerCup: computedPpc }
            : {};

        updated[idx] = { ...exists, ...maybeUpdate };
        return updated;
      }

      // First time adding this unique item: add with provided qty (e.g., MOQ)
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
          pricePerCup: computedPpc,
          // Store case info for reliable fallback in UI
          priceCase: item.priceCase,
          qtyCase: item.qtyCase,
        },
      ];
    });

    // Always open the cart with this item in edit mode
    setActiveEditKey(uniqueKey);
  }

  function updateItemQty(key, quantity) {
    setCartItems((cur) =>
      cur.map((c) => (c.key === key ? { ...c, quantity } : c))
    );
  }

  const removeItem = (key) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
    // Clear edit if you removed the actively edited item
    setActiveEditKey((curr) => (curr === key ? null : curr));
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
        activeEditKey,
        setActiveEditKey,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
