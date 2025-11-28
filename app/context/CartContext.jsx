// app/context/CartContext.js
"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  
  // 1. New State for Flashbar
  const [showFlashbar, setShowFlashbar] = useState(false);

  // Add to Cart Logic
  const addToCart = (product, variant, quantity = 1) => {
    setCartItems((prev) => {
      const uniqueId = `${product.name}-${variant}`;
      const existingItem = prev.find((item) => item.uniqueId === uniqueId);

      if (existingItem) {
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            uniqueId,
            ...product,
            variant, 
            quantity,
          },
        ];
      }
    });

    // 2. Trigger Flashbar
    setShowFlashbar(true);
    // Hide after 3 seconds
    setTimeout(() => setShowFlashbar(false), 3000);
  };

  const updateQuantity = (uniqueId, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.uniqueId === uniqueId) {
          if (type === "increase") return { ...item, quantity: item.quantity + 1 };
          if (type === "decrease") return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const priceVal = parseFloat(item.price.toString().replace(/[^0-9.]/g, ""));
    return total + priceVal * item.quantity;
  }, 0);

  return (
    // 3. Export showFlashbar
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, cartTotal, showFlashbar }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}