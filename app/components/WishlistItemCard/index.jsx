// app/components/WishlistItemCard.js
"use client";

import Image from "next/image"; // 1. Import Image
import { Heart } from "lucide-react"; 
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext"; 

export default function WishlistItemCard({ item }) {
  const { toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Consistency Fix
    addToCart(
       { 
         name: "The Essential", 
         price: "16.99 $" 
       }, 
       item.name, 
       1 
    );
 };

  // 2. Define Image Map
  const imageMap = {
    "Onyx": "/Variant1.PNG",
    "Moss":   "/Variant2.PNG",
    "Abyss":  "/Variant3.PNG",
    "Sable":    "/Variant4.PNG",
    "Terra": "/Variant5.PNG"
  };

  // 3. Get image based on item name (which is the color name in your data structure)
  const imageSrc = imageMap[item.name] || "/Variant1.PNG";

  return (
    <div className="w-full flex flex-row gap-4 p-4 border-b border-[#DBDBDE]">
      {/* 4. Picture Area */}
      <div className="w-[80px] h-[80px] bg-[#DBDBDE] rounded-lg shrink-0 flex items-center justify-center relative overflow-hidden">
        <Image 
            src={imageSrc} 
            alt={item.name} 
            fill 
            className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col">
            <h4 className="text-[#0F141A] font-open-sans font-bold text-sm leading-[20px]">
              “{item.name}” Case
            </h4>
            <p className="text-[#424650] text-xs font-open-sans font-bold mt-1">
              {item.price}
            </p>
          </div>

          <button 
            onClick={() => toggleWishlist(item)}
            className="text-[#006CE0] hover:text-[#002B66] transition-colors"
          >
            <Heart size={20} fill="#006CE0" />
          </button>
        </div>

        <button 
            onClick={handleAddToCart} 
            className="
              mt-2 w-full h-[32px] flex items-center justify-center gap-2 
              bg-[#0F141A] text-white text-xs font-bold rounded-full
              transition-all duration-200 ease-out
              hover:bg-[#424650] hover:scale-[1.02]
              active:scale-95
            "
          >
              <span>Add to Cart</span>
          </button>
      </div>
    </div>
  );
}