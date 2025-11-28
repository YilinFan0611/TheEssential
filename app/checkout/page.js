// app/checkout/page.js
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { ChevronLeft, Lock, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  
  // Fake shipping cost logic
  const shippingCost = 5.00;
  const finalTotal = cartTotal + shippingCost;

  // --- IMAGE MAP (For consistent thumbnails) ---
  const imageMap = {
    "Onyx":   "/Variant1.PNG",
    "Moss":   "/Variant2.PNG",
    "Abyss":  "/Variant3.PNG",
    "Sable":  "/Variant4.PNG",
    "Terra":  "/Variant5.PNG"
  };

  // If cart is empty, show a simple message
  if (cartItems.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-[#F5F5F7]">
        <h1 className="text-2xl font-bold text-[#0F141A]">Your cart is empty</h1>
        <Link href="/" className="text-[#006CE0] font-bold hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#ffffff] flex flex-col lg:flex-row font-open-sans">
      
      {/* --- LEFT SIDE: FORMS (Main Content) --- */}
      <div className="w-full lg:w-[55%] px-[24px] lg:px-[120px] py-[60px] flex flex-col">
        
        {/* Header / Logo Area */}
        <div className="flex items-center justify-between mb-8">
            <div className="w-24 h-10 bg-[#006CE0] rounded-lg flex items-center justify-center text-[#ffffff] font-bold">
                Logo
            </div>
            <Link href="/" className="text-[#006CE0] text-sm font-bold flex items-center gap-1 hover:underline">
                <ChevronLeft size={16} /> Return to Store
            </Link>
        </div>

        {/* Breadcrumbs (Visual Only) */}
        <div className="flex gap-2 text-sm text-[#424650] mb-8">
            <span className="text-[#006CE0] font-bold">Cart</span> 
            <span>&gt;</span>
            <span className="text-[#0F141A] font-bold">Information</span>
            <span>&gt;</span>
            <span>Shipping</span>
            <span>&gt;</span>
            <span>Payment</span>
        </div>

        {/* --- FORM SECTION --- */}
        <form className="flex flex-col gap-8 max-w-[600px]">
            
            {/* Contact Info */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-[#0F141A]">Contact Information</h2>
                </div>
                <input type="email" placeholder="Email address" className="w-full h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                <div className="flex gap-2 items-center">
                    <input type="checkbox" id="news" className="accent-[#006CE0] w-4 h-4" />
                    <label htmlFor="news" className="text-sm text-[#424650]">Email me with news and offers</label>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-[#0F141A]">Shipping address</h2>
                
                <div className="flex gap-4">
                    <input type="text" placeholder="First name" className="flex-1 h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                    <input type="text" placeholder="Last name" className="flex-1 h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                </div>
                
                <input type="text" placeholder="Address" className="w-full h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />

                <div className="flex gap-4">
                    <input type="text" placeholder="City" className="flex-1 h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                    <input type="text" placeholder="Postal code" className="flex-1 h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                </div>
            </div>

            {/* Payment (Visual Placeholder) */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-[#0F141A]">Payment</h2>
                <p className="text-sm text-[#424650] mb-2">All transactions are secure and encrypted.</p>
                
                <div className="border border-[#DBDBDE] rounded-[8px] overflow-hidden">
                    <div className="bg-[#F5F5F7] p-4 border-b border-[#DBDBDE] flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <CreditCard size={20} className="text-[#0F141A]"/>
                            <span className="font-bold text-sm text-[#0F141A]">Credit Card</span>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4 bg-white">
                        <input type="text" placeholder="Card number" className="w-full h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                        <div className="flex gap-4">
                            <input type="text" placeholder="Expiration date (MM / YY)" className="flex-1 h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                            <input type="text" placeholder="Security code" className="flex-1 h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                        </div>
                        <input type="text" placeholder="Name on card" className="w-full h-[48px] border border-[#DBDBDE] rounded-[8px] px-4 focus:outline-none focus:border-[#006CE0]" />
                    </div>
                </div>
            </div>

            {/* Pay Button */}
            <button className="w-full h-[64px] bg-[#006CE0] text-white font-bold rounded-full hover:bg-[#3389E6] active:bg-[#002B66] transition-all duration-200 mt-4 shadow-lg flex items-center justify-center gap-2">
                <Lock size={18} />
                Pay Now - {finalTotal.toFixed(2)} $
            </button>

        </form>
      </div>

      {/* --- RIGHT SIDE: ORDER SUMMARY (Gray Background) --- */}
      <div className="w-full lg:w-[45%] bg-[#F5F5F7] px-[24px] lg:px-[80px] py-[60px] border-l border-[#DBDBDE]">
        <div className="flex flex-col gap-6 max-w-[500px]">
            
            {/* List of Items */}
            <div className="flex flex-col gap-4 mb-6">
                {cartItems.map((item) => {
                     const imageSrc = imageMap[item.variant] || "/Variant1.PNG";
                     return (
                        <div key={item.uniqueId} className="flex gap-4 items-center justify-between">
                            <div className="flex gap-4 items-center">
                                {/* Thumbnail with Quantity Badge */}
                                <div className="relative w-[64px] h-[64px] bg-white border border-[#DBDBDE] rounded-lg flex items-center justify-center overflow-hidden">
                                    <Image src={imageSrc} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-[#0F141A] text-sm">The Essential</span>
                                    <span className="text-xs text-[#424650]">{item.variant}</span>
                                </div>
                            </div>
                            <span className="font-bold text-[#0F141A] text-sm">
                                {((parseFloat(item.price) || 16.99) * item.quantity).toFixed(2)} $
                            </span>
                        </div>
                     );
                })}
            </div>

            <div className="w-full h-[1px] bg-[#DBDBDE]" />

            {/* Calculations */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                    <span className="text-[#424650]">Subtotal</span>
                    <span className="font-bold text-[#0F141A]">{cartTotal.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[#424650]">Shipping</span>
                    <span className="font-bold text-[#0F141A]">{shippingCost.toFixed(2)} $</span>
                </div>
            </div>

            <div className="w-full h-[1px] bg-[#DBDBDE]" />

            {/* Total */}
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#0F141A]">Total</span>
                <div className="flex items-end gap-2">
                    <span className="text-xs text-[#424650] mb-1">AUD</span>
                    <span className="text-2xl font-bold text-[#006CE0]">{finalTotal.toFixed(2)} $</span>
                </div>
            </div>

        </div>
      </div>

    </div>
  );
}