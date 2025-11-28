// app/support/page.js
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SupportPage() {
  // --- STATE ---
  const [activeSection, setActiveSection] = useState(null);
  
  // State for Help Center (Rating & Hover)
  const [comment, setComment] = useState("");

  // --- DATA ---
  const supportItems = [
    {
      title: "TERMS OF SERVICE",
      content: `Welcome to The Essential. By accessing our website and purchasing our products, you agree to the following terms:

1. General Conditions: We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, or exploit any portion of the Service without express written permission by us.

2. Products & Pricing: Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service (or any part thereof) without notice at any time.

3. Billing & Account Info: We reserve the right to refuse any order you place with us. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.

4. Governing Law: These Terms of Service shall be governed by and construed in accordance with the laws of Australia.`
    },
    {
      title: "LEGAL",
      content: `Intellectual Property:
All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of The Essential or its content suppliers and protected by international copyright laws.

Trademarks:
The Essential name and logo are trademarks of The Essential. They may not be used in connection with any product or service that is not ours, in any manner that is likely to cause confusion among customers.

Limitation of Liability:
The Essential shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products, even if The Essential has been advised of the possibility of such damages.`
    },
    {
      title: "PRIVACY POLICY",
      content: `Information We Collect:
When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.

How We Use Your Information:
• To fulfill orders placed through the Site (processing payment, shipping, invoices).
• To communicate with you regarding your order.
• To screen our orders for potential risk or fraud.
• To provide you with information or advertising relating to our products (only if you opted in).

Data Protection:
We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except to trusted third parties who assist us in operating our website (e.g., payment processors, shipping partners), so long as those parties agree to keep this information confidential.`
    }
  ];

  const toggleSection = (title) => {
    setActiveSection(activeSection === title ? null : title);
  };

  return (
    <div className="w-full bg-[#ffffff] min-h-screen">
      
      {/* --- SECTION 1: SUPPORT ACCORDION (Existing) --- */}
      <section className="p-[120px]">
        <h1 className="text-[42px] font-bold font-open-sans text-[#0F141A] leading-[48px] tracking-[-1.26px] mb-16">
          Support
        </h1>
        <div className="w-full flex flex-col">
          <div className="w-full h-[1px] bg-[#0F141A]" />
          {supportItems.map((item) => {
            const isOpen = activeSection === item.title;
            return (
              <div key={item.title} className="flex flex-col">
                <button
                  onClick={() => toggleSection(item.title)}
                  className="flex items-center justify-between w-full py-8 group hover:text-[#006CE0] transition-colors"
                >
                  <span className={`text-[24px] font-bold font-open-sans uppercase tracking-[-0.48px] leading-[30px] ${isOpen ? "text-[#006CE0]" : "text-[#424650]"}`}>
                    {item.title}
                  </span>
                  <ChevronDown 
                    size={40} 
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#006CE0]" : "text-[#424650]"}`} 
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#0F141A] text-sm leading-[20px] tracking-[0px] whitespace-pre-line font-open-sans max-w-[800px]">
                    {item.content}
                  </p>
                </div>
                <div className="w-full h-[1px] bg-[#0F141A]" />
              </div>
            );
          })}
        </div>
      </section>

      {/* --- SECTION 2: HELP CENTER (New) --- */}
      <section id="help-center" className="w-full bg-[#ECF3FA] p-[120px]">
        <div className="grid grid-cols-12 gap-[60px]">
          
          {/* Left Text Content */}
          <div className="col-span-5 flex flex-col justify-center">
            <h2 className="text-[42px] font-bold font-open-sans text-[#0F141A] leading-[48px] tracking-[-1.26px] mb-6">
              Help Center
            </h2>
            <p className="text-[#0F141A] font-bold font-open-sans text-[16px] leading-[20px] tracking-[-0.08px]">
            We are committed to providing you with the best experience possible. If you have any questions regarding your Essential Case or need help with a return, simply let us know below.
            </p>
          </div>

          {/* Right Interaction Form */}
          <div className="col-span-7 flex flex-col gap-6">
            
            {/* Top Row: Stars and Submit Button */}
            <div className="flex items-center justify-end">

              {/* Submit Button */}
              <button className="h-[48px] px-8 bg-[#006CE0] text-[#ffffff] text-sm font-bold font-open-sans leading-[20px] tracking-[0px] rounded-full hover:bg-[#3389E6] hover:scale-105 active:scale-[0.95] active:bg-[#002B66] transition-all duration-200 shadow-sm">
                Submit
              </button>
            </div>

            {/* Comment Text Area */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment here"
              className="w-full h-[160px] p-6 rounded-[24px] border border-[#8C8C94]/30 bg-white text-[#0F141A] text-[14px] font-regular font-open-sans leading-[20px] tracking-[0px] placeholder-[#C6C6CD] focus:outline-none focus:border-[#006CE0] focus:border-2 resize-none shadow-sm transition-colors"
            />
          </div>

        </div>
      </section>

    </div>
  );
}