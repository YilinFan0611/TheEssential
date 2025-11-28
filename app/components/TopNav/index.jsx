// app/components/TopNav.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, ShoppingBag, X, CheckCircle } from "lucide-react"; 
import { useWishlist } from "../../context/WishlistContext"; 
import { useCart } from "../../context/CartContext"; 
import WishlistItemCard from "../WishlistItemCard";
import CartItemCard from "../CartItemCard"; 

export default function TopNav() {
  const pathname = usePathname();
  const [activeOverlay, setActiveOverlay] = useState(null);
  
  // 1. Rename vars to avoid conflict: showFlashbar -> showWishlistFlashbar
  const { savedItems, showFlashbar: showWishlistFlashbar } = useWishlist();
  
  // 2. Rename vars to avoid conflict: showFlashbar -> showCartFlashbar
  const { cartItems, cartTotal, showFlashbar: showCartFlashbar } = useCart(); 

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "Support", href: "/support" },
  ];

  const closeOverlay = () => setActiveOverlay(null);

  const getDrawerContent = () => {
    if (activeOverlay === "wishlist") {
      return {
        title: "Saved",
        hasItems: savedItems.length > 0,
        emptyText: "Your wishlist is empty",
        icon: <Heart size={64} strokeWidth={1.5} className="text-[#8C8C94]" /> 
      };
    }
    if (activeOverlay === "cart") {
      return {
        title: "Shopping Cart",
        hasItems: cartItems.length > 0, 
        emptyText: "Your cart is empty",
        icon: <ShoppingBag size={64} strokeWidth={1.5} className="text-[#8C8C94]" />
      };
    }
    return { title: "", hasItems: false, emptyText: "", icon: null };
  };

  const drawerContent = getDrawerContent();

  return (
    <>
      {/* --- FLASHBAR: WISHLIST --- */}
      <div 
        className={`fixed top-30 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out
          ${showWishlistFlashbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}
        `}
      >
        <div className="bg-[#0F141A] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
          <CheckCircle size={20} className="text-[#006CE0]" />
          <span className="font-open-sans font-bold text-sm">Item saved to wishlist</span>
        </div>
      </div>

      {/* --- FLASHBAR: CART (New) --- */}
      {/* Positioned slightly lower (top-24) or same place if you prefer them to overlap */}
      <div 
        className={`fixed top-30 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out
          ${showCartFlashbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}
        `}
      >
        <div className="bg-[#0F141A] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
          <CheckCircle size={20} className="text-[#006CE0]" />
          <span className="font-open-sans font-bold text-sm">Item added to cart</span>
        </div>
      </div>

      {/* --- MAIN NAVIGATION BAR --- */}
      <nav className="w-full h-[96px] bg-[#0f141a] flex items-center justify-between px-[120px] relative z-50 shadow-[0px_4px_20px_1px_rgba(0,7,22,0.1)]">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6 h-full font-open-sans font-bold">
          <div className="w-24 h-10 bg-[#006CE0] rounded-lg flex items-center justify-center text-[#ffffff] font-bold">
            Logo
          </div>
          <div className="flex items-center gap-6 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative h-full flex items-center justify-center w-24 text-sm transition-colors duration-200 
                    ${isActive ? "text-[#EBEBF0]" : "text-[#C6C6CD]/60 hover:text-[#EBEBF0]"}
                  `}
                >
                  {link.name}
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EBEBF0]" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-[60px]">
          {/* Wishlist Button */}
          <button onClick={() => setActiveOverlay("wishlist")} className="text-[#C6C6CD]/60 hover:text-[#EBEBF0] transition-colors relative">
            <Heart size={24} />
            {savedItems.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#006CE0] rounded-full" />}
          </button>

          {/* Cart Button */}
          <button onClick={() => setActiveOverlay("cart")} className="text-[#C6C6CD]/60 hover:text-[#EBEBF0] transition-colors relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#006CE0] rounded-full" />}
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {activeOverlay && (
        <div className="fixed inset-0 bg-[#000000]/25 z-[60]" onClick={closeOverlay} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#ffffff] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
          ${activeOverlay ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="h-[96px] bg-[#0f141a] flex items-center justify-between px-6 shrink-0">
          <h2 className="text-[24px] font-open-sans font-bold text-[#EBEBF0] capitalize tracking-[-0.48px]">
            {drawerContent.title}
          </h2>
          <button onClick={closeOverlay} className="text-[#C6C6CD]/60 hover:text-[#EBEBF0] transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {/* BODY */}
        <div className="flex-1 bg-[#ffffff] overflow-y-auto flex flex-col">
            
            {/* WISHLIST LOGIC */}
            {activeOverlay === 'wishlist' && (
                drawerContent.hasItems ? (
                    <div className="flex flex-col">
                        {savedItems.map((item) => (
                            <WishlistItemCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <EmptyState content={drawerContent} />
                )
            )}

            {/* CART LOGIC */}
            {activeOverlay === 'cart' && (
                drawerContent.hasItems ? (
                    <>
                        <div className="flex flex-col flex-1">
                            {cartItems.map((item) => (
                                <CartItemCard key={item.uniqueId} item={item} />
                            ))}
                        </div>
                        
                        {/* CHECKOUT BUTTON */}
                        <div className="p-6 border-t border-[#DBDBDE] bg-white">
                          <div className="flex justify-between mb-4">
                              <span className="font-bold text-[#0F141A]">Total</span>
                              <span className="font-bold text-[#006CE0]">{cartTotal.toFixed(2)} $</span>
                          </div>

                          {/* UPDATE: Changed to Link, added href, added onClick to close overlay */}
                          <Link 
                              href="/checkout"
                              onClick={closeOverlay} // Important: Close the cart drawer when navigating
                              className="
                                  flex items-center justify-center w-full h-[56px] 
                                  bg-[#006CE0] text-white font-bold rounded-full 
                                  hover:bg-[#3389E6] active:bg-[#002B66] transition-colors
                              "
                          >
                              Checkout
                          </Link>
                      </div>
                    </>
                ) : (
                    <EmptyState content={drawerContent} />
                )
            )}
        </div>
      </div>
    </>
  );
}

function EmptyState({ content }) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="flex flex-col items-center gap-4">
                <div>{content.icon}</div>
                <p className="text-[#424650] font-open-sans font-bold text-sm">
                    {content.emptyText}
                </p>
            </div>
        </div>
    );
}