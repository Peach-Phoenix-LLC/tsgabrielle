"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, Share2, ChevronLeft, ChevronRight, Maximize2, 
  Minus, Plus, ShieldCheck, Truck, RefreshCw, Award, 
  Star, ShoppingBag, CreditCard, X, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

// Types for strict verification
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
  };
}

export default function ProductClientView({ product }: ProductProps) {
  const { addItem, items } = useCart();
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addItem({
      variantId: selectedSize.variantId,
      title: `${product.title} - ${selectedColor} / ${selectedSize.name}`,
      qty: quantity,
      priceCents: product.price,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Animation Constants per Directives
  const easing = [0.165, 0.84, 0.44, 1];

  return (
    <div className="min-h-screen bg-[#fdfcf5] text-[#111] font-light selection:bg-[#a932bd]/20">
      {/* Sticky Header Nav */}
      <nav className="sticky top-0 z-50 glass-header border-b border-black/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-widest uppercase font-medium">tsgabrielle™</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setShowShare(true)} className="hover:text-[#a932bd] transition-colors"><Share2 size={18} /></button>
          <button onClick={() => setIsWishlisted(!isWishlisted)} className={`transition-colors ${isWishlisted ? "text-[#a932bd] fill-[#a932bd]" : "hover:text-[#a932bd]"}`}>
            <Heart size={18} />
          </button>
          <div className="relative">
            <ShoppingBag size={18} />
            <span className="absolute -top-2 -right-2 bg-[#a932bd] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
              {items.reduce((acc, i) => acc + i.qty, 0)}
            </span>
          </div>
        </div>
      </nav>

      <main className="container-luxe py-12 lg:grid lg:grid-cols-12 lg:gap-16">
        
        {/* Left: Sticky Image Gallery */}
        <section className="lg:col-span-7 relative">
          <div className="sticky top-24 flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentImg(i)}
                  className={`aspect-[3/4] border transition-all duration-500 overflow-hidden ${currentImg === i ? "border-[#a932bd]" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Viewport */}
            <div className="relative flex-1 aspect-[3/4] bg-white overflow-hidden zero-gravity-element">
              {product.ribbon && (
                <div className="absolute top-6 left-6 z-10 holographic-border px-4 py-1">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#a932bd] uppercase italic">{product.ribbon}</span>
                </div>
              )}
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImg}
                  src={product.images[currentImg]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: easing }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
                <button onClick={() => setCurrentImg(prev => Math.max(0, prev - 1))} className="p-3 bg-white/80 rounded-full backdrop-blur-sm"><ChevronLeft size={20}/></button>
                <button onClick={() => setCurrentImg(prev => Math.min(product.images.length - 1, prev + 1))} className="p-3 bg-white/80 rounded-full backdrop-blur-sm"><ChevronRight size={20}/></button>
              </div>

              <button 
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-6 right-6 p-3 bg-white/80 rounded-full backdrop-blur-sm"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Right: Product Details */}
        <section className="lg:col-span-5 mt-12 lg:mt-0 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-black/40">
              <span>Home</span> / <span>Collections</span> / <span className="text-[#a932bd]">Flamant Rose</span>
            </div>
            
            {/* GIF Title Head */}
            <h1 className={`text-5xl md:text-6xl font-serif tracking-tight leading-tight ${product.gifTitleUrl ? "holographic-text" : ""}`}
                style={product.gifTitleUrl ? { backgroundImage: `url(${product.gifTitleUrl})` } : {}}>
              {product.title}
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(product.rating) ? "fill-[#a932bd] text-[#a932bd]" : "text-black/10"} />)}
                <span className="text-[10px] ml-2 font-medium">{product.rating} ({product.reviewCount} Reviews)</span>
              </div>
              <div className="h-4 w-px bg-black/10"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-medium uppercase tracking-wider">{product.soldCount} Sold • Limited Stock</span>
              </div>
            </div>
            
            <p className="text-3xl font-light text-[#a932bd]">${(product.price / 100).toFixed(2)}</p>
          </header>

          {/* Color Selection */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest font-bold">Color: <span className="font-light">{selectedColor}</span></p>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button 
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${selectedColor === color.name ? "border-[#a932bd]" : "border-transparent"}`}
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-widest font-bold">Size: <span className="font-light">{selectedSize?.name || "Select"}</span></p>
              <button className="text-[10px] uppercase tracking-widest underline decoration-[#a932bd]/30">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button 
                  key={size.variantId}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs border transition-all ${selectedSize?.variantId === size.variantId ? "bg-black text-white border-black" : "border-black/10 hover:border-black"}`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex items-center border border-black/10 px-4">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14}/></button>
                <input type="number" value={quantity} readOnly className="w-12 text-center bg-transparent text-sm focus:outline-none" />
                <button onClick={() => setQuantity(q => q + 1)}><Plus size={14}/></button>
              </div>
              <button 
                onClick={handleAddToBag}
                className={`flex-1 py-5 text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${isAdded ? "bg-green-600 text-white" : "bg-[#a932bd] text-white hover:bg-black"}`}
              >
                {isAdded ? "Added to Bag" : "Add to Bag"}
              </button>
            </div>
            <button className="w-full py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#a932bd] transition-all flex items-center justify-center gap-3">
              <CreditCard size={16} /> Buy Now
            </button>
            <div className="grid grid-cols-2 gap-4">
               <button className="py-4 border border-black/5 bg-white rounded-md flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-80">Apple Pay</button>
               <button className="py-4 border border-black/5 bg-white rounded-md flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-80">Google Pay</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="pt-8 border-t border-black/5 space-y-6">
            <div className="flex gap-8 border-b border-black/5">
              {["description", "details", "care", "shipping"].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[10px] uppercase tracking-widest font-bold transition-all relative ${activeTab === tab ? "text-[#a932bd]" : "text-black/40"}`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a932bd]" />}
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: easing }}
                className="text-xs leading-relaxed text-black/60"
              >
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "details" && (
                  <ul className="space-y-3">
                    {product.details.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-[#a932bd] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "care" && <p>{product.care}</p>}
                {activeTab === "shipping" && <p>{product.shipping}</p>}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"><RefreshCw size={18} className="text-[#a932bd]" /></div>
              <span className="text-[8px] uppercase tracking-tighter">Free Returns</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"><ShieldCheck size={18} className="text-[#a932bd]" /></div>
              <span className="text-[8px] uppercase tracking-tighter">Secure Pay</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"><Award size={18} className="text-[#a932bd]" /></div>
              <span className="text-[8px] uppercase tracking-tighter">Authentic</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"><Truck size={18} className="text-[#a932bd]" /></div>
              <span className="text-[8px] uppercase tracking-tighter">Worldwide</span>
            </div>
          </div>
        </section>
      </main>

      {/* Share Modal */}
      <AnimatePresence>
        {showShare && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowShare(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl"
            >
              <button onClick={() => setShowShare(false)} className="absolute top-6 right-6"><X size={20}/></button>
              <h3 className="text-xl font-serif mb-8 text-[#a932bd]">Share with your universe</h3>
              <div className="grid grid-cols-3 gap-8 mb-8">
                {/* Social icons placeholder */}
                {['Pinterest', 'Instagram', 'WhatsApp'].map(social => (
                  <div key={social} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-14 h-14 rounded-full bg-[#fdfcf5] border border-black/5 flex items-center justify-center group-hover:bg-[#a932bd] group-hover:text-white transition-all"><Share2 size={20}/></div>
                    <span className="text-[10px] uppercase font-bold tracking-widest">{social}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 border border-black/10 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all">Copy Link</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-black/5 flex flex-col items-center gap-4">
        <p className="text-[10px] tracking-[0.5em] uppercase font-medium">tsgabrielle™</p>
        <p className="text-[8px] text-black/40">© 2026 Peach Phoenix, LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
