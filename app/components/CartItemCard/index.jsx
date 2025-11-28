// app/components/CartItemCard.js
"use client";

import Image from "next/image"; // 1. Import Image
import { Minus, Plus } from "lucide-react"; // Removed ImageIcon
import { useCart } from "../../context/CartContext";

export default function CartItemCard({ item }) {
  const { updateQuantity } = useCart();

  // 2. Define Image Map (Must match VariantCard/ProductPage)
  const imageMap = {
    "Onyx": "/Variant1.PNG",
    "Moss":   "/Variant2.PNG",
    "Abyss":  "/Variant3.PNG",
    "Sable":    "/Variant4.PNG",
    "Terra": "/Variant5.PNG"
  };

  // 3. Get image based on variant name (e.g. "Green")
  const imageSrc = imageMap[item.variant] || "/Variant1.PNG";

  return (
    <div className="w-full flex flex-row gap-4 p-4 border-b border-[#DBDBDE]">
      {/* 4. Picture Area */}
      {/* Added 'relative' and 'overflow-hidden' for the fill image */}
      <div className="w-[80px] h-[80px] bg-[#DBDBDE] rounded-lg shrink-0 flex items-center justify-center relative overflow-hidden">
        <Image 
            src={imageSrc} 
            alt={item.name} 
            fill 
            className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Name & Variant */}
          <h4 className="text-[#0F141A] font-open-sans font-bold text-sm leading-[20px]">
            The Essential
          </h4>
          <p className="text-[#8C8C94] text-xs font-open-sans font-regular mt-1">
            Color: {item.variant}
          </p>
        </div>

        <div className="flex flex-row items-end justify-between mt-2">
          {/* Price */}
          <p className="text-[#0F141A] font-open-sans font-bold text-sm">
            {item.price}
          </p>

          {/* Amount Editor */}
          <div className="flex items-center gap-3 bg-[#ECF3FA] rounded-full px-2 py-1">
             <button 
                onClick={() => updateQuantity(item.uniqueId, "decrease")}
                className="p-1 text-[#006CE0] hover:bg-white rounded-full transition-colors"
             >
                <Minus size={14} />
             </button>
             
             <span className="text-xs font-bold text-[#0F141A] w-4 text-center">
                {item.quantity}
             </span>

             <button 
                onClick={() => updateQuantity(item.uniqueId, "increase")}
                className="p-1 text-[#006CE0] hover:bg-white rounded-full transition-colors"
             >
                <Plus size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}