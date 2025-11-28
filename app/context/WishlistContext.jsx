// app/context/WishlistContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [savedItems, setSavedItems] = useState([]);
  const [showFlashbar, setShowFlashbar] = useState(false);

  // Logic: Toggle item in wishlist
  const toggleWishlist = (item) => {
    const exists = savedItems.find((i) => i.id === item.id);

    if (exists) {
      // REMOVE: Filter it out. Do NOT show flashbar (Req #2)
      setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      // ADD: Push to array. SHOW flashbar (Req #1)
      setSavedItems((prev) => [...prev, item]);
      setShowFlashbar(true);
      
      // Hide flashbar after 3 seconds
      setTimeout(() => setShowFlashbar(false), 3000);
    }
  };

  return (
    <WishlistContext.Provider value={{ savedItems, toggleWishlist, showFlashbar }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}