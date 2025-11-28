// app/components/Footer.js
"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react"; // Only importing LinkedIn

export default function Footer() {
  
  // LinkedIn URL provided
  const linkedInUrl = "https://www.bing.com/ck/a?!&&p=d006463fa7acdfe03199f258d233c928c6ee898584dac6ce4956b265dbf83095JmltdHM9MTc2NDExNTIwMA&ptn=3&ver=2&hsh=4&fclid=0533dce8-31b9-6d3d-0beb-c953301f6cd3&u=a1aHR0cHM6Ly9hdS5saW5rZWRpbi5jb20vaW4vbGlhbS1tYWhvbnktM2E0OTU5MWEz";

  return (
    <footer className="w-full bg-[#0F141A] pt-[80px] pb-[40px] px-[120px]">
      
      {/* --- TOP SECTION --- */}
      <div className="flex flex-row justify-between items-start mb-[80px]">
        
        {/* Left Column: Brand & Subscribe */}
        <div className="flex flex-col gap-8 max-w-[400px]">
            {/* Logo */}
            <div className="w-24 h-10 bg-[#006CE0] rounded-lg flex items-center justify-center text-[#ffffff] font-open-sans font-bold">
              Logo
            </div>

            {/* Description */}
            <p className="text-[#C6C6CD] text-sm font-open-sans leading-[24px]">
              The only multifunctional phone case you'll ever need. Store your essentials and protect your phone in style.
            </p>

            {/* Subscribe Input */}
            <div className="flex flex-col gap-4 mt-4">
                <h4 className="text-[#ffffff] font-open-sans font-bold uppercase tracking-[0.5px]">
                    Keep Updated
                </h4>
                <div className="flex flex-row gap-4">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="
                            flex-1 h-[48px] bg-transparent border border-[#424650] rounded-[8px] 
                            px-4 text-[#ffffff] placeholder-[#555961] focus:outline-none focus:border-[#006CE0]
                        "
                    />
                    <button className="h-[48px] px-6 bg-[#006CE0] hover:bg-[#3389E6] text-[#ffffff] font-bold rounded-[30px] transition-colors duration-200">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>

        {/* Right Columns: Navigation Links */}
        <div className="flex flex-row gap-[100px]">
            
            {/* Product Column */}
            <div className="flex flex-col gap-6">
                <h4 className="text-[#ffffff] font-open-sans font-bold text-lg">Product</h4>
                <div className="flex flex-col gap-4">
                    {/* Req #1: Route to Home -> Variants Section */}
                    <Link href="/#variants" className="text-[#8C8C94] hover:text-[#006CE0] text-sm font-open-sans transition-colors">
                        Pricing
                    </Link>
                    {/* Req #2: Route to Home -> Features Section */}
                    <Link href="/#features" className="text-[#8C8C94] hover:text-[#006CE0] text-sm font-open-sans transition-colors">
                        Features
                    </Link>
                </div>
            </div>

            {/* Support Column */}
            <div className="flex flex-col gap-6">
                <h4 className="text-[#ffffff] font-open-sans font-bold text-lg">Support</h4>
                <div className="flex flex-col gap-4">
                    {/* Req #3, 4, 5: Route to Support Page */}
                    <Link href="/support" className="text-[#8C8C94] hover:text-[#006CE0] text-sm font-open-sans transition-colors">
                        Terms of Service
                    </Link>
                    <Link href="/support" className="text-[#8C8C94] hover:text-[#006CE0] text-sm font-open-sans transition-colors">
                        Legal
                    </Link>
                    <Link href="/support" className="text-[#8C8C94] hover:text-[#006CE0] text-sm font-open-sans transition-colors">
                        Privacy Policy
                    </Link>
                    {/* Req #6: Route to Support -> Help Center Section */}
                    <Link href="/support#help-center" className="text-[#8C8C94] hover:text-[#006CE0] text-sm font-open-sans transition-colors">
                        Help Center
                    </Link>
                </div>
            </div>

        </div>
      </div>

      {/* --- DIVIDER --- */}
      <div className="w-full h-[1px] bg-[#22262C] mb-[32px]" />

      {/* --- BOTTOM SECTION --- */}
      <div className="flex flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-[#555961] text-sm font-open-sans">
            © 2025 Company / Brand Name. All rights reserved.
        </p>

        {/* Req #7: Single LinkedIn Icon */}
        <a 
            href={linkedInUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#555961] hover:text-[#006CE0] transition-colors"
        >
            <Linkedin size={24} />
        </a>
      </div>

    </footer>
  );
}