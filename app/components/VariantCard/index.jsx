// app/components/VariantCard.js
"use client";

import Link from "next/link";
import Image from "next/image"; // 1. Import Image
import { Heart } from "lucide-react"; // Removed ImageIcon
import { useWishlist } from "../../context/WishlistContext"; 

export default function VariantCard({ data }) {
  const { savedItems, toggleWishlist } = useWishlist();

  // Check if THIS card is in the savedItems array
  const isLiked = savedItems.some((item) => item.id === data.id);

  // Toggle Heart Click
  const handleHeartClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    toggleWishlist(data); 
  };

  // 2. Map Color Names to File Paths
  // Ensure "data.name" matches these keys (e.g., "Orange", "Blue")
  // If your data uses "Colour 1", change "Orange" to "Colour 1" below.
  const imageMap = {
    "Onyx": "/Variant1.PNG",
    "Moss":   "/Variant2.PNG",
    "Abyss":  "/Variant3.PNG",
    "Sable":    "/Variant4.PNG",
    "Terra": "/Variant5.PNG"
  };

  // Fallback if name doesn't match
  const imageSrc = imageMap[data.name] || "/Variant1.PNG";

  return (
    <Link
      href={`/product?color=${data.name}`}
      className="
        group relative flex flex-col shrink-0 
        w-[calc(25%-18px)] min-w-[300px] 
        bg-[#ffffff] rounded-[16px] overflow-hidden 
        shadow-[0px_4px_20px_1px_rgba(0,7,22,0.1)]
      "
    >
        {/* 3. Image Area */}
        {/* Added 'relative' so the Image 'fill' prop works */}
        <div className="h-[320px] bg-[#DBDBDE] relative flex items-center justify-center">
            <Image 
              src={imageSrc} 
              alt={`${data.name} Case`}
              fill // Automagically fills the container
              className="object-cover group-hover:scale-105 transition-transform duration-500" // Added a nice hover zoom effect
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw"
            />
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-0">
            {/* Header */}
            <div className="p-4 flex flex-row gap-0 justify-between items-start">
                <div className="flex flex-col gap-0 justify-between items-start">
                    <div className="flex flex-col gap-0">
                        <h3 className="text-[18px] font-open-sans font-bold tracking-[-0.18px] leading-[22px] text-[#0F141A]">
                            “{data.name}” The Essential
                        </h3>
                    </div>
                </div>

                <button
                    onClick={handleHeartClick}
                    className="relative z-10 text-[#8C8C94] hover:text-[#006CE0] transition-colors"
                >
                    <Heart 
                        size={24} 
                        fill={isLiked ? "#006CE0" : "none"} 
                        className={isLiked ? "text-[#006CE0]" : "text-[#8C8C94]"}
                    />
                </button>
            </div>

            {/* Price & Link */}
            <div className="p-4 flex flex-col gap-2 items-start">
                <div>
                    <p className="text-[#0F141A] font-open-sans font-bold tracking-[0px] leading-[20px] text-sm">
                        {data.price}
                    </p>
                </div>
                <span className="text-[#803FA5] text-sm font-open-sans font-bold tracking-[0px] leading-[20px] hover:underline">
                    Learn more &gt;
                </span>
            </div>
        </div>
    </Link>
  );
}