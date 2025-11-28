// app/page.js
"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Image as ImageIcon,
  Play,
  Calendar,
  RefreshCcw,
  MessageSquare,
  Truck,
} from "lucide-react"; 
import VariantCard from "./components/VariantCard";

export default function Home() {
  // selling points section changes
  const [activePoint, setActivePoint] = useState(1);
  const sellingPoints = [
    {
      id: 1,
      title: "Contribute to daily life",
      description:
        "Carry your daily essentials like keys, access cards, SIM cards, and more in a secure and convenient way.",
    },
    {
      id: 2,
      title: "Contribute to emergency",
      description:
        "Carry your emergency essentails like pills, AdraCard-Epipen, necessary cards, and more in a secure and convenient way.",
    },
    {
      id: 3,
      title: "Stand for good",
      description:
        "It can become your sturdy phone stand anytime you want.",
    },
  ];
  const policies = [
    {
      icon: <Calendar size={48} strokeWidth={1.5} className="text-[#0F141A]" />,
      title: "30-Day Return Policy",
      desc: "Not satisfied? Return within 30 days for a full refund."
    },
    {
      icon: <RefreshCcw size={48} strokeWidth={1.5} className="text-[#0F141A]" />,
      title: "Easy Returns",
      desc: "Simple return process with prepaid shipping labels."
    },
    {
      icon: <MessageSquare size={48} strokeWidth={1.5} className="text-[#0F141A]" />,
      title: "Response in 24 Hrs",
      desc: "Our customer support team responds within 24 hours."
    },
    {
      icon: <Truck size={48} strokeWidth={1.5} className="text-[#0F141A]" />,
      title: "Prepared Ship in 3 Days",
      desc: "Orders are processed and shipped within 3 business days."
    },
  ];

  const variants = [
    { id: 1, name: "Onyx", price: "45.99 $" },
    { id: 2, name: "Moss", price: "45.99 $" },
    { id: 3, name: "Abyss", price: "45.99 $" },
    { id: 4, name: "Sable", price: "45.99 $" },
    { id: 5, name: "Terra", price: "45.99 $" }, 
  ];
  
  return (
    <div>
      {/* hero section */}
      <section className="relative w-full h-[75vh] bg-[#DBDBDE] overflow-hidden">
        
        {/* --- BACKGROUND IMAGE --- */}
        <Image 
          src="/HeroSectionBackground.jpg" 
          alt="The Only Case You Need Hero Background"
          fill 
          className="object-cover"
          priority 
        />

        {/* --- HERO CONTENT --- */}
        <div className="absolute top-[120px] right-[120px] flex flex-col items-end z-10">
          
          {/* TEXT GROUP */}
          <div className="flex flex-col items-end gap-4 text-right">
            <h1 className="flex flex-col items-end text-[42px] font-open-sans font-bold text-[#0F141A] leading-[48px] tracking-[-1.26px]">
              <span>
                The <span className="text-[#006CE0]">Only</span> Case
              </span>
              <span>You Need</span>
            </h1>

            <div className="flex flex-col items-end text-sm font-open-sans font-regular text-[#0F141A] leading-[20px] tracking-[0px]">
              <span>A multifunctional phone case</span>
              <span>that solve every need in your daily life.</span>
            </div>
          </div>

          {/* --- CTA BUTTON --- */}
          <Link
            href="/product"
            className="mt-[40px] flex items-center justify-center w-[192px] h-[40px] bg-[#006CE0] text-[#ffffff] text-sm font-open-sans leading-[20px] tracking-[0px] font-bold rounded-full transition-all duration-300 ease-out 
            hover:scale-105 hover:bg-[#3389E6] 
            active:scale-95 active:bg-[#002B66]
            "
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* selling points section */}
      <section className="w-full h-[80vh] bg-white p-[120px]">
        <div className="w-full h-full grid grid-cols-2 gap-[120px]">
          
          {/* LEFT: Dynamic Image Display */}
          {/* Replaced placeholder with Next.js Image component */}
          <div className="relative w-full h-full bg-[#DBDBDE] flex items-center justify-center transition-all duration-500 overflow-hidden">
             <Image 
                // Uses key to force re-render animation if needed, or simply switches src
                key={activePoint} 
                src={`/SellingPoint${activePoint}.jpg`} // SellingPoint1.jpg, SellingPoint2.jpg, etc.
                alt={`Selling Point ${activePoint}`}
                fill
                className="object-cover"
             />
          </div>

          {/* RIGHT: Selling Points List */}
          <div className="flex flex-col justify-between h-full">
            {sellingPoints.map((point) => {
              const isActive = activePoint === point.id;

              return (
                <div 
                    key={point.id} 
                    className="flex flex-row gap-6 cursor-pointer group"
                    onClick={() => setActivePoint(point.id)}
                >
                  {/* Number Circle */}
                  <div
                    className={`flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center text-[42px] font-open-sans font-bold transition-colors duration-300
                      ${
                        isActive
                          ? "bg-[#006CE0] text-[#ffffff]" // Active Styles
                          : "bg-[#DBDBDE] text-[#8C8C94] group-hover:bg-[#ECF3FA]" // Inactive Styles
                      }
                    `}
                  >
                    {point.id}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col pt-4">
                    <h3
                      className={`text-[24px] font-open-sans font-bold tracking-[-0.48px] leading-[30px] mb-2 transition-colors duration-300 ${
                        isActive ? "text-[#0F141A]" : "text-[#8C8C94]"
                      }`}
                    >
                      {point.title}
                    </h3>
                    <p className={`text-sm font-open-sans font-regular tracking-[0px] leading-[20px] ${
                        isActive ? "text-[#0F141A]" : "text-[#8C8C94]"
                      }`}
                    >
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* vairants section */}
      <section id="variants" className="w-full bg-[#ECF3FA] p-[120px]">
        <div className="flex flex-col gap-[64px]">
          
          {/* Title */}
          <h2 className="text-[42px] font-open-sans font-bold text-[#0F141A] leading-[48px] tracking-[-1.26px]">
            Variants
          </h2>

          {/* Cards Container */}
          <div className="flex flex-row gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {variants.map((variant) => (
              <VariantCard key={variant.id} data={variant} />
            ))}
          </div>

        </div>
      </section>

      {/* feature section */}
      <section id="features" className="w-full bg-white p-[120px]">
        <div className="flex flex-col gap-[64px]">
            
          {/* Title */}
          <h2 className="text-[42px] font-open-sans font-bold text-[#0F141A] leading-[48px] tracking-[-1.26px]">
            Features
          </h2>

          {/* Video Placeholder */}
          <div className="w-full h-[80vh] bg-[#DBDBDE] rounded-[24px] flex items-center justify-center relative cursor-pointer group shadow-sm">
             
             {/* Play Button Circle */}
             <div className="w-20 h-20 rounded-full border-[3px] border-[#0F141A] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Play size={32} fill="#0F141A" className="text-[#0F141A] ml-1" />
             </div>

             <span className="absolute bottom-8 text-[#8C8C94] font-medium text-sm">
                Video Render Placeholder
             </span>
          </div>

        </div>
      </section>

      {/* policies section */}
      <section className="w-full bg-[#ffffff] p-[120px]">
        <div className="grid grid-cols-4 gap-6">
          {policies.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-6 px-[24px] py-[32px]">
              <div>
                {item.icon}
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-[24px] font-open-sans font-bold tracking-[-0.48px] leading-[30px] text-[#0F141A]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#0F141A] font-open-sans font-regular tracking-[0px] leading-[20px] text-[#8C8C94]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}