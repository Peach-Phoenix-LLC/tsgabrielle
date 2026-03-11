"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Heart, Share2, ChevronLeft, ChevronRight, Maximize2, 
  Minus, Plus, ShieldCheck, Truck, RefreshCw, Award, 
  Star, ShoppingBag, CreditCard, X, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { usePeaches } from "@/hooks/usePeaches";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { CATEGORIES, COLLECTIONS } from "@/lib/menu";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

interface ProductProps {
  product: {
    id: string;
    title: string;
    price: number;
    description: string;
    details: string[];
    care: string;
    shipping: string;
    images: string[];
    colors: { name: string; hex: string }[];
    sizes: { name: string; variantId: string }[];
    rating: number;
    reviewCount: number;
    soldCount: number;
    stock: number;
    tags: string[];
    ribbon?: "NEW" | "EXCLUSIVE" | "SALE";
    gifTitleUrl?: string;
    metafields?: any;
  };
}

export default function ProductClientView({ product }: ProductProps) {
  const { addItem, items } = useCart();
  const { tier, points } = usePeaches();
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("premium");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setUserEmail(data.user.email);
    });
  }, []);

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    const item = {
      variantId: selectedSize.variantId,
      title: `${product.title} - ${selectedColor} / ${selectedSize.name}`,
      qty: quantity,
      priceCents: product.price,
    };

    addItem(item);

    if (userEmail) {
      fetch("/api/klaviyo/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          eventName: "Added to Cart",
          properties: {
            "Product Name": product.title,
            "Product ID": product.id,
            "Variant ID": item.variantId,
            "Price": item.priceCents / 100,
            "Quantity": item.qty,
            "Image URL": product.images[0],
          },
        }),
      }).catch(err => console.error("Klaviyo tracking error:", err));
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const easing = [0.165, 0.84, 0.44, 1] as const;
  const displayCategories = CATEGORIES.slice(0, 9);

  return (
    <div className="min-h-screen bg-white text-[#111] font-lato font-light selection:bg-[#a932bd]/20">
      
      {/* Fullscreen Hero Gallery */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={product.images[currentImg]} 
              fill
              className="h-full w-full object-contain" 
              alt={product.title}
            />
            {/* Dark overlay removed to fulfill visibility requirement */}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Controls */}
        <div className="absolute bottom-12 left-0 right-0 z-20 container-luxe flex justify-between items-end">
          <div className="flex gap-4">
             {product.images.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setCurrentImg(i)}
                 className={`h-0.5 transition-all duration-700 ${currentImg === i ? "w-16 bg-white" : "w-4 bg-white/20"}`}
               />
             ))}
          </div>
          <div className="flex gap-4">
             <button 
               onClick={() => setCurrentImg(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
               className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-all hover:bg-white hover:border-white"
             >
               <ChevronLeft className="text-white group-hover:text-black transition-colors" size={24} />
             </button>
             <button 
               onClick={() => setCurrentImg(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
               className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-all hover:bg-white hover:border-white"
             >
               <ChevronRight className="text-white group-hover:text-black transition-colors" size={24} />
             </button>
          </div>
        </div>
      </section>

      {/* Breadcrumbs after Hero Image */}
      <div className="bg-white">
        <Breadcrumbs />
      </div>

      {/* Purchase & Details Section */}
      <section className="bg-white border-b border-[#e7e7e7]">
        <div className="container-luxe py-24 lg:grid lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium">Curated Masterpiece</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight capitalize">{product.title}</h2>
              <div className="flex items-center gap-6 py-2 border-y border-[#f0f0f0]">
                <p className="text-3xl font-light text-[#a932bd]">${(product.price / 100).toFixed(2)}</p>
                <div className="h-4 w-px bg-[#e7e7e7]" />
                <div className="flex items-center gap-2">
                  <Star size={14} className="fill-[#a932bd] text-[#a932bd]" />
                  <span className="text-xs font-medium tracking-widest uppercase">{product.rating} Editorial Score</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
               {/* Color */}
               <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest font-bold">Palette: <span className="font-light">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${selectedColor === color.name ? "border-[#a932bd]" : "border-transparent"}`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                    </button>
                  ))}
                </div>
              </div>

               {/* Size */}
               <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold">Measurement: <span className="font-light">{selectedSize?.name || "Unselected"}</span></p>
                  <button className="text-[8px] uppercase tracking-[0.3em] text-[#a932bd] hover:opacity-60">Architectural Guide</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size.variantId}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 text-[10px] tracking-widest uppercase transition-all duration-500 rounded-xl ${selectedSize?.variantId === size.variantId ? "bg-[#111111] text-white" : "bg-[#f9f9f9] text-[#111111] hover:bg-[#a932bd]/10 hover:text-[#a932bd]"}`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex items-center bg-[#f9f9f9] px-6 rounded-full border border-black/5">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-[#a932bd]"><Minus size={16}/></button>
                    <input type="number" value={quantity} readOnly className="w-14 text-center bg-transparent text-sm font-medium focus:outline-none" />
                    <button onClick={() => setQuantity(q => q + 1)} className="hover:text-[#a932bd]"><Plus size={16}/></button>
                  </div>
                  <button 
                    onClick={handleAddToBag}
                    className={`flex-1 btn-holographic-outline !py-6 uppercase tracking-[0.4em] font-bold text-xs ${isAdded ? "!text-green-600 !border-green-600/20" : ""}`}
                  >
                    {isAdded ? "Secured in Bag" : "Add to Universe"}
                  </button>
                </div>
                <button className="w-full bg-[#111111] text-white py-6 rounded-[15px] uppercase tracking-[0.4em] font-bold text-xs hover:bg-[#a932bd] transition-all duration-700 flex items-center justify-center gap-3">
                   Instant Acquisition
                </button>
              </div>

              {/* Security Logos */}
              <div className="pt-6 border-t border-[#f0f0f0] flex justify-between items-center px-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" width={24} height={24} className="h-6 w-auto" />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" width={20} height={20} className="h-5 w-auto" />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={20} height={20} className="h-5 w-auto" />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Venmo_logo.svg" alt="Venmo" width={24} height={24} className="h-6 w-auto" />
              </div>
            </div>
          </div>

          {/* Right: Feature Tabs */}
          <div className="lg:pt-2">
             <div className="flex flex-col gap-10">
               <div className="flex flex-col gap-8">
                 <div className="flex gap-10 border-b border-[#f0f0f0]">
                    {["premium", "tags", "narrative"].map(tab => (
                      <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative ${activeTab === tab ? "text-[#a932bd]" : "text-black/30 hover:text-black"}`}
                      >
                        {tab === "premium" ? "Features" : tab === "tags" ? "Universe" : "Narrative"}
                        {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a932bd]" />}
                      </button>
                    ))}
                 </div>

                 <AnimatePresence mode="wait">
                   <motion.div 
                     key={activeTab}
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -15 }}
                     transition={{ duration: 0.6, ease: easing }}
                     className="min-h-[300px]"
                   >
                     {activeTab === "premium" && (
                       <ul className="space-y-6">
                         {product.details.map((item, i) => (
                           <li key={i} className="flex items-start gap-4">
                             <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#a932bd]" />
                             <span className="text-sm text-[#555555] leading-relaxed uppercase tracking-wider font-medium">{item}</span>
                           </li>
                         ))}
                       </ul>
                     )}
                     {activeTab === "tags" && (
                        <div className="flex flex-wrap gap-3">
                          {product.tags.map((tag, i) => (
                            <span key={i} className="px-5 py-2.5 bg-[#f9f9f9] text-[9px] uppercase tracking-widest font-bold border border-black/5 rounded-full text-[#a932bd]">
                              {tag}
                            </span>
                          ))}
                        </div>
                     )}
                     {activeTab === "narrative" && (
                        <div className="text-black/70 leading-loose">
                           <p className="whitespace-pre-line text-xs uppercase tracking-widest">{product.description}</p>
                        </div>
                     )}
                   </motion.div>
                 </AnimatePresence>
               </div>

               <div className="grid grid-cols-2 gap-8 py-10 border-t border-[#f0f0f0]">
                  <div className="flex flex-col gap-3">
                    <RefreshCw className="text-[#a932bd]" size={20} />
                    <h4 className="text-[10px] font-bold capitalize tracking-widest">Ethereal Returns</h4>
                    <p className="text-[10px] text-black/50 leading-relaxed uppercase">Returns accepted within 14 cycles of arrival.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <ShieldCheck className="text-[#a932bd]" size={20} />
                    <h4 className="text-[10px] font-bold capitalize tracking-widest">Secured Core</h4>
                    <p className="text-[10px] text-black/50 leading-relaxed uppercase">Quantum encryption for every acquisition.</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories Grid (Homepage Style) */}
      <section className="bg-[#f9f9f9] py-32 border-t border-[#e7e7e7]">
        <div className="container-luxe">
          <div className="mb-24 text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium">Shop by Department</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">Categories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayCategories.map((category, idx) => {
              return (
                <div key={idx} className="group flex flex-col gap-6">
                  <div className="holographic-card-border aspect-[3/4] overflow-hidden bg-[#f9f9f9] rounded-[3rem]">
                  <Image
                    src={category.image || "/images/placeholder.jpg"}
                    alt={category.label}
                    fill
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  </div>
                  
                  <div className="flex flex-col items-center gap-4 text-center">
                    <h3 className="text-xl font-light tracking-wide text-[#111111] capitalize">{category.label}</h3>
                    <div className="h-px w-8 bg-[#a932bd]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#a932bd]" />
                    <Link
                      href={category.href}
                      className="btn-holographic-outline"
                    >
                      Discover
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox / Zoom (Remains for usability) */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-black/5">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Editorial {currentImg + 1} / {product.images.length}</span>
              <button 
                onClick={() => setIsZoomOpen(false)}
                className="p-4 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 overflow-hidden">
              <motion.div 
                key={currentImg}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-full max-h-full"
              >
                  <Image 
                    src={product.images[currentImg]} 
                    alt={product.title}
                    width={800}
                    height={800}
                    className="object-contain"
                  />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

