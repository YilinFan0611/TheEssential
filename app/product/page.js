// app/product/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Image as ImageIcon,
  Minus, Plus, ChevronDown, Calendar, RefreshCcw, MessageSquare, Truck
} from "lucide-react";
import { useCart } from "../context/CartContext"; 

function ProductContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  
  // --- STATE ---
  const [selectedColor, setSelectedColor] = useState("Onyx");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0); 
  
  const [activeSection, setActiveSection] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // --- IMAGE MAP ---
  const imageMap = {
    "Onyx":   ["/Variant1.PNG", "/Variant1_2.PNG", "/Variant1_3.PNG", "/Variant1_4.PNG"],
    "Moss":   ["/Variant2.PNG", "/Variant2_2.PNG", "/Variant2_3.PNG", "/Variant2_4.PNG"],
    "Abyss":  ["/Variant3.PNG", "/Variant3_2.PNG", "/Variant3_3.PNG", "/Variant3_4.PNG"],
    "Sable":  ["/Variant4.PNG", "/Variant4_2.PNG", "/Variant4_3.PNG", "/Variant4_4.PNG"],
    "Terra":  ["/Variant5.PNG", "/Variant5_2.PNG", "/Variant5_3.PNG", "/Variant5_4.PNG"]
  };

  const currentImages = imageMap[selectedColor] || imageMap["Onyx"];

  useEffect(() => {
    const colorFromUrl = searchParams.get("color");
    if (colorFromUrl) {
      const decodedColor = decodeURIComponent(colorFromUrl);
      setSelectedColor(decodedColor);
      setActiveImageIndex(0); 
    }
  }, [searchParams]);

  // --- DATA ---
  const productColors = [
    { name: "Onyx", hex: "#1F1E1E" },
    { name: "Moss", hex: "#4C6949" },
    { name: "Abyss", hex: "#1E2549" },
    { name: "Sable", hex: "#56392D" },
    { name: "Terra", hex: "#9E4F32" },
  ];

  const detailedFeatures = [ 
    { id: 1, title: "Detailed Feature 1", desc: "Lorem ipsum dolor sit amet..." },
    { id: 2, title: "Detailed Feature 2", desc: "Lorem ipsum dolor sit amet..." },
    { id: 3, title: "Detailed Feature 3", desc: "Lorem ipsum dolor sit amet..." },
  ];

  const productInfo = [
    { 
      title: "DESCRIPTION", 
      content: `A multifunctional phone case designed for the modern minimalist. By utilizing smart storage mapping, we eliminate the 'wallet case vibe' to offer stable, secure storage in a sleek form factor. Experience double the capacity of standard cases with zero wasted space, ensuring your items are always organized, accessible, and safely hidden from view.` 
    },
    { 
      title: "FEATURES", 
      content: `• Daily Essentials Storage
• Emergency Ready
• Built-in Sturdy Stand` 
    },
    { 
      title: "SIZE & WEIGHT & COMPATIBILITY", 
      content: `Dimensions: 150mm x 76mm x 24mm
Weight: 40-55g
Compatibility: Designed for iPhone 17, fits for all buttons, ports and camera layouts` 
    },
    { 
      title: "MATERIALS", 
      content: `TPU (Shore A 85-95)
Polycarbonate (PC) - PC-ABS Blend
Elastic Silicone Rubber (VMQ)` 
    },
    { 
      title: "WARRANTY", 
      content: `Includes a 1-year limited warranty.
Covers manufacturing defects.` 
    },
    { 
      title: "FREQUENTLY ASKED QUESTIONS", 
      content: `Q: What specific items can fit inside the storage compartment?
A: It is designed to hold daily essentials such as 1-2 credit cards, a house key, a SIM card, or emergency items like a singular pill or flat medication. It can also fit a single AdraCard-Epipen.

Q: Will wireless charging work with the case on?
A: Yes, the case is compatible with standard wireless chargers. However, for the best connection and to protect your cards, we recommend removing credit cards before charging.

Q: Is the stand adjustable?
A: The built-in kickstand is sturdy and supports both vertical and horizontal viewing angles, perfect for video calls or watching movies.` 
    },
  ];

  const policies = [
    { icon: <Calendar size={48} strokeWidth={1.5} className="text-[#0F141A]" />, title: "30-Day Return Policy", desc: "Not satisfied? Return within 30 days." },
    { icon: <RefreshCcw size={48} strokeWidth={1.5} className="text-[#0F141A]" />, title: "Easy Returns", desc: "Simple return process." },
    { icon: <MessageSquare size={48} strokeWidth={1.5} className="text-[#0F141A]" />, title: "Response in 24 Hrs", desc: "Our customer support team responds." },
    { icon: <Truck size={48} strokeWidth={1.5} className="text-[#0F141A]" />, title: "Prepared Ship in 3 Days", desc: "Orders are processed within 3 days." },
  ];

  // --- HANDLERS ---
  const handleQuantityChange = (type) => { 
    if (type === "decrease" && quantity > 1) {
        setQuantity(quantity - 1);
      } else if (type === "increase") {
        setQuantity(quantity + 1);
      }
  };

  const toggleSection = (title) => {
    setActiveSection(activeSection === title ? null : title);
  };

  const handleAddToCart = () => {
    const productData = {
        name: "The Essential", 
        price: "45.99 $",
    };
    addToCart(productData, selectedColor, quantity);
  };

  return (
    <div className="w-full bg-[#ffffff] min-h-screen">
      
      {/* --- SECTION 1: PRODUCT PURCHASE --- */}
      <section className="p-[120px]">
       <div className="grid grid-cols-12 gap-6">
          {/* Left Side: Images */}
          <div className="col-span-7 flex gap-6 h-[600px]">
              <div className="flex flex-col gap-6 w-[84px] h-full overflow-y-auto no-scrollbar">
                  {currentImages.map((imgSrc, index) => (
                      <button 
                        key={index} 
                        onClick={() => setActiveImageIndex(index)} 
                        className={`
                            relative w-[84px] h-[104px] shrink-0 bg-[#E4E4E7] 
                            flex items-center justify-center overflow-hidden
                            transition-all duration-200 
                            ${activeImageIndex === index ? "border-4 border-[#006CE0]" : "border border-transparent hover:border-[#DBDBDE]"}
                        `}
                      >
                         <Image src={imgSrc} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                      </button>
                  ))}
              </div>
              <div className="flex-1 bg-[#DBDBDE] relative flex items-center justify-center overflow-hidden">
                   <Image 
                        src={currentImages[activeImageIndex]} 
                        alt={`${selectedColor} Product View`} 
                        fill 
                        className="object-cover"
                        priority 
                   />
              </div>
          </div>

          {/* Right Side: Info */}
          <div className="col-span-5 flex flex-col justify-between h-full">
              <div>
                  <div className="flex flex-col gap-6 mb-6">
                      <h1 className="text-[42px] font-bold font-open-sans text-[#0F141A] leading-[48px] tracking-[-1.26px]">The Essential</h1>
                      <p className="text-[24px] font-bold text-[#006CE0] font-open-sans leading-[30px] tracking-[-0.48px]">45.99 $</p>
                      <div className="flex flex-col gap-2">
                          <p className={`text-[#424650] text-sm font-regular font-open-sans leading-[20px] tracking-[0px] ${isExpanded ? "" : "line-clamp-3"}`}>
                          Ditch the bulk and the mess. Unlike traditional wallet cases that are awkward to use and leave your cards exposed, The Essential features smart, predetermined slot placement that maximizes storage without wasting space. We’ve doubled the capacity while keeping the profile slim and comfortable—giving you a clean, sophisticated look that keeps your essentials secure and fully covered.
                          </p>
                          <button onClick={() => setIsExpanded(!isExpanded)} className="text-[#803FA5] text-sm font-bold font-open-sans leading-[20px] tracking-[0px] self-start hover:underline">
                              {isExpanded ? "Read less" : "Read more"}
                          </button>
                      </div>
                  </div>

                  <div className="flex flex-col gap-6">
                      <div>
                          <p className="text-[24px] font-open-sans font-bold text-[#0F141A] mb-6 tracking-[-0.48px] leading-[30px]">Variant - <span className="font-bold font-open-sans text-[20px] leading-[24px] tracking-[-0.3px] text-[#424650]">{selectedColor}</span></p>
                          <div className="flex gap-6">
                              {productColors.map((color) => (
                                  <button key={color.name} onClick={() => {
                                      setSelectedColor(color.name);
                                      setActiveImageIndex(0); 
                                  }} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 relative" style={{ backgroundColor: color.hex }}>
                                      {selectedColor === color.name && <div className="absolute inset-0 rounded-full border-[3px] border-white ring-1 ring-[#0F141A] w-full h-full transform scale-110" />}
                                  </button>
                              ))}
                          </div>
                      </div>
                      <div>
                          <p className="text-[24px] font-open-sans font-bold text-[#0F141A] mb-6 tracking-[-0.48px] leading-[30px]">Amount</p>
                          <div className="flex items-center justify-between w-[300px] h-[56px] rounded-full border-2 border-[#006CE0] px-4">
                              <button onClick={() => handleQuantityChange("decrease")} className="p-2 text-[#006CE0]"><Minus size={20} /></button>
                              <span className="text-[24px] font-bold text-[#0F141A] font-open-sans leading-[30px] tracking-[-0.48px]">x{quantity}</span>
                              <button onClick={() => handleQuantityChange("increase")} className="p-2 text-[#006CE0]"><Plus size={20} /></button>
                          </div>
                      </div>
                  </div>
              </div>

              <button onClick={handleAddToCart} className="w-full h-[64px] bg-[#006CE0] text-[#ffffff] text-sm font-bold font-open-sans leading-[20px] tracking-[0px] rounded-full hover:bg-[#3389E6] hover:scale-105 active:scale-[0.95] active:bg-[#002B66] transition-all duration-200 shadow-md mt-16">
                  Add to Cart - {(45.99 * quantity).toFixed(2)} $
              </button>
          </div>
       </div>
    </section>

    {/* --- SECTION 2: DETAILED FEATURES --- */}
    <section className="w-full bg-[#ECF3FA] p-[120px]">
         <div className="flex flex-col gap-[64px]">
            <h2 className="text-[42px] font-open-sans font-bold text-[#0F141A] leading-[48px] tracking-[-1.26px]">Detailed Features</h2>
            <div className="grid grid-cols-3 gap-6">
                {detailedFeatures.map((feature) => (
                    <div key={feature.id} className="flex flex-col bg-white rounded-[16px] overflow-hidden">
                        <div className="h-[320px] bg-[#DBDBDE] flex items-center justify-center"><ImageIcon size={64} className="text-gray-500" strokeWidth={1.5} /></div>
                        <div className="p-4 flex flex-col gap-2">
                            <h3 className="text-[24px] font-bold text-[#0F141A] font-open-sans leading-[30px] tracking-[-0.48px]">{feature.title}</h3>
                            <p className="text-sm font-regular text-[#424650] font-open-sans leading-[20px] tracking-[0px]">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 3: PRODUCT INFORMATION --- */}
      <section className="w-full bg-white p-[120px]">
        <h2 className="text-[42px] font-bold font-open-sans text-[#0F141A] leading-[48px] tracking-[-1.26px] mb-16">
          Product Information
        </h2>
        <div className="grid grid-cols-12 gap-[60px]">
          
          {/* Left Accordion List */}
          <div className="col-span-6 flex flex-col">
            <div className="w-full h-[1px] bg-[#0F141A]" />
            {productInfo.map((item) => {
              const isOpen = activeSection === item.title;
              return (
                <div key={item.title} className="flex flex-col">
                  <button onClick={() => toggleSection(item.title)} className="flex items-center justify-between w-full py-8">
                    <span className={`text-[24px] font-bold font-open-sans leading-[30px] tracking-[-0.48px] uppercase ${isOpen ? "text-[#006CE0]" : "text-[#424650]"}`}>
                      {item.title}
                    </span>
                    <ChevronDown size={40} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#006CE0]" : "text-[#424650]"}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"}`}>
                    <p className="text-[#0F141A] text-sm font-regular font-open-sans leading-[20px] tracking-[0px] whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-[#0F141A]" />
                </div>
              );
            })}
          </div>

          {/* --- RIGHT IMAGE UPDATED HERE --- */}
          <div className="col-span-6 min-h-[600px] h-full relative overflow-hidden">
            <Image 
                src="/ProductInformation.png" 
                alt="Product Information Diagram" 
                fill 
                className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* --- SECTION 4: POLICIES --- */}
      <section className="w-full bg-[#ffffff] p-[120px]">
        <div className="grid grid-cols-4 gap-6">
          {policies.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-6 px-[24px] py-[32px]">
              <div>{item.icon}</div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[24px] font-open-sans font-bold tracking-[-0.48px] leading-[30px] text-[#0F141A]">{item.title}</h3>
                <p className="text-sm text-[#0F141A] font-open-sans font-regular tracking-[0px] leading-[20px] text-[#8C8C94]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}