"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import type { Product, ProductVariant, ProductImage } from "@/lib/types";

export function ProductClientView({
  product,
  variants,
  images
}: {
  product: Product;
  variants: ProductVariant[];
  images: ProductImage[];
}) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState("description");

  const variant = variants.find((v) => v.id === selectedVariant) ?? variants[0];

  const handleAddToCart = () => {
    if (!variant) return;
    addItem({
      variantId: variant.id,
      title: variant.title,
      qty: 1,
      priceCents: variant.price_cents
    });
  };

  return (
    <div className="bg-white pb-32">
      {/* Fullscreen Slides Gallery */}
      <section className="relative w-full h-[85vh] md:h-screen bg-[#f9f9f9]">
        {images.length > 0 ? (
          <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            {images.map((img) => (
              <div key={img.id} className="min-w-full h-full snap-start relative">
                <img
                  src={img.url}
                  alt={img.alt || product.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center border-b border-[#e7e7e7]">
             <span className="text-xs font-light text-[#555555] tracking-widest uppercase">No Image Available</span>
          </div>
        )}
        
        {/* Scroll Indicator (if multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <div key={i} className="h-1 w-8 bg-white/50 rounded-full" />
            ))}
          </div>
        )}
      </section>

      {/* Product Information */}
      <section className="container-luxe max-w-4xl mx-auto pt-16 md:pt-24 space-y-12 text-center">
        {/* Head Title & Price */}
        <header className="space-y-6">
          <nav className="text-[10px] tracking-[0.3em] text-[#a932bd] uppercase font-medium">
            tsgabrielle® · Official Catalogue
          </nav>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#111111] leading-tight capitalize">
            {product.title}
          </h1>
          <div className="text-2xl font-light text-[#111111]">
            ${variant ? (variant.price_cents / 100).toFixed(2) : (product.price_cents / 100).toFixed(2)}
          </div>
        </header>

        {/* Variants Selection */}
        {variants.length > 0 && (
          <div className="max-w-md mx-auto space-y-4">
             <label className="block text-xs font-light tracking-[0.2em] text-[#555555] uppercase">
                Select Option
             </label>
             <div className="relative">
                <select
                  className="w-full appearance-none border border-[#e7e7e7] bg-white px-5 py-4 text-sm font-light text-[#111111] focus:border-[#a932bd] focus:outline-none transition-colors text-center"
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#555555]">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor">
                    <path d="M1 1L6 6L11 1" strokeWidth="1.5" />
                  </svg>
                </div>
             </div>
          </div>
        )}

        {/* Actions (Add to Cart, Buy Now, Wishlist) */}
        <div className="max-w-md mx-auto space-y-6 pt-4">
          <button
            type="button"
            disabled={!variant}
            onClick={handleAddToCart}
            className="w-full btn-holographic-outline text-center flex items-center justify-center !py-5"
          >
            Add to Bag
          </button>

          <div className="grid grid-cols-2 gap-4">
             {/* Apple Pay & Google Pay (Styled as native-like buttons) */}
             <button className="w-full bg-black text-white px-4 py-4 rounded-md flex items-center justify-center gap-2 hover:opacity-90">
                <span className="text-sm font-medium">Apple Pay</span>
             </button>
             <button className="w-full bg-white border border-[#e7e7e7] text-black px-4 py-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#f9f9f9]">
                <span className="text-sm font-medium">Google Pay</span>
             </button>
             {/* PayPal & Venmo */}
             <button className="w-full bg-[#ffc439] text-[#003087] px-4 py-4 rounded-md flex items-center justify-center font-bold italic hover:opacity-90">
                PayPal
             </button>
             <button className="w-full bg-[#008cff] text-white px-4 py-4 rounded-md flex items-center justify-center font-bold italic hover:opacity-90">
                venmo
             </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-4 text-[10px] tracking-[0.2em] uppercase font-light text-[#555555] hover:text-[#a932bd] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z" />
            </svg>
            Add to Wishlist
          </button>
        </div>

        {/* Tabs section */}
        <div className="pt-16 border-t border-[#e7e7e7] text-left">
           <div className="flex items-center justify-center gap-8 border-b border-[#e7e7e7] pb-4">
              {['description', 'specifications', 'shipping'].map((tab) => (
                 <button 
                  key={tab}
                  className={`text-[10px] tracking-[0.2em] uppercase font-light pb-4 -mb-[17px] border-b-2 transition-colors ${activeTab === tab ? 'border-[#a932bd] text-[#111111]' : 'border-transparent text-[#555555] hover:text-[#111111]'}`}
                  onClick={() => setActiveTab(tab)}
                 >
                    {tab.replace('-', ' ')}
                 </button>
              ))}
           </div>
           
           <div className="mt-8 text-sm font-light leading-relaxed text-[#555555] max-w-2xl mx-auto">
              {activeTab === 'description' && (
                 <div className="animate-fade-in space-y-4">
                    <p>{product.description}</p>
                    <p>Designed with inclusive luxury in mind, this piece offers an unparalleled aesthetic experience tailored for any environment.</p>
                 </div>
              )}
              {activeTab === 'specifications' && (
                 <div className="animate-fade-in space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                       <li>Premium globally sourced materials</li>
                       <li>Available in exclusive tsgabrielle sizing</li>
                       <li>Care instructions: Dry clean or cold wash only</li>
                       <li>SKU: {variant?.sku || 'N/A'}</li>
                    </ul>
                    <div className="flex gap-2 pt-4">
                       <span className="px-3 py-1 bg-[#f9f9f9] border border-[#e7e7e7] text-[10px] uppercase tracking-widest text-[#111111]">Luxury</span>
                       <span className="px-3 py-1 bg-[#f9f9f9] border border-[#e7e7e7] text-[10px] uppercase tracking-widest text-[#111111]">Inclusive</span>
                       <span className="px-3 py-1 bg-[#f9f9f9] border border-[#e7e7e7] text-[10px] uppercase tracking-widest text-[#111111]">2026 Collection</span>
                    </div>
                 </div>
              )}
              {activeTab === 'shipping' && (
                 <div className="animate-fade-in space-y-4 text-center">
                    <p><strong>Complimentary Global Delivery</strong></p>
                    <p>We offer seamless worldwide shipping on all tsgabrielle luxury orders.</p>
                    <p>Returns are elegantly accepted within 30 days of receipt, provided items are returned in their original, ethereal condition.</p>
                 </div>
              )}
           </div>
        </div>
      </section>

      {/* Global CSS for hiding scrollbar if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
