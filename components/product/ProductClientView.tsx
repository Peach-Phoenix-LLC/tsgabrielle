"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heart, ChevronLeft, ChevronRight,
  Minus, Plus, ShieldCheck, RefreshCw,
  Star, ShoppingBag, CreditCard, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePostHog } from "posthog-js/react";
import { useCart } from "@/hooks/useCart";
import { usePeaches } from "@/hooks/usePeaches";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackProductViewed } from "@/lib/posthog-events";
import { CATEGORIES } from "@/lib/menu";
import Link from "next/link";

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
  const { addItem } = useCart();
  const posthog = usePostHog();
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("premium");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setUserEmail(data.user.email);
    });

    // Track product view
    trackProductViewed({
      id: product.id,
      title: product.title,
      price: product.price / 100,
      category: product.tags?.[0],
      image: product.images[0],
    });
  }, [product.id, product.title, product.price, product.tags, product.images]);

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

  const displayCategories = CATEGORIES.slice(0, 9);

  // Format product title with tsgabrielle® handling
  const formatProductTitle = (title: string) => {
    const brandMatch = title.toLowerCase().startsWith('tsgabrielle');
    if (brandMatch) {
      const rest = title.substring(12).trim(); // Skip "tsgabrielle" + maybe space/®
      return (
        <>
          <span className="italic font-bold">tsgabrielle®</span>{" "}
          <span className="capitalize">{rest}</span>
        </>
      );
    }
    return <span className="capitalize">{title}</span>;
  };

  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-lato font-light selection:bg-[#a932bd]/20">
      
      {/* Fullscreen Hero Gallery */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image 
              src={product.images[currentImg]} 
              fill
              className="h-full w-full object-contain" 
              alt={product.title}
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <button 
          onClick={() => setCurrentImg(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 group h-14 w-14 flex items-center justify-center rounded-full border border-black/10 bg-white/50 backdrop-blur-md transition-all hover:bg-white"
        >
          <ChevronLeft className="text-black" size={24} />
        </button>
        <button 
          onClick={() => setCurrentImg(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 group h-14 w-14 flex items-center justify-center rounded-full border border-black/10 bg-white/50 backdrop-blur-md transition-all hover:bg-white"
        >
          <ChevronRight className="text-black" size={24} />
        </button>

        {/* Miniatures Row */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-4 overflow-x-auto px-8 no-scrollbar">
          {product.images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentImg(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${currentImg === i ? "border-[#a932bd] scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              <Image src={img} fill className="object-cover" alt={`Thumb ${i}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Breadcrumbs & Title */}
      <div className="container-luxe py-8 space-y-4">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium text-black/50">
          <Link href="/" className="hover:text-[#a932bd] transition-colors">Welcome</Link>
          <span>•</span>
          <span className="text-black/30">{toTitleCase(product.tags[0] || "Luxury")}</span>
          <span>•</span>
          <span className="text-black">{product.title}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">{formatProductTitle(product.title)}</h1>
      </div>

      {/* Main Content Split Section */}
      <section className="container-luxe pb-24 lg:grid lg:grid-cols-2 gap-24 items-start border-t border-[#f0f0f0] pt-12">
        
        {/* Left Column: Tabs */}
        <div className="space-y-12">
          <div className="flex gap-10 border-b border-[#f0f0f0]">
            {["premium", "shipping", "specifications"].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative ${activeTab === tab ? "text-[#a932bd]" : "text-black/30 hover:text-black"}`}
              >
                {tab === "premium" ? "Premium Features" : tab === "shipping" ? "Shipping Info" : "Specifications"}
                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a932bd]" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="min-h-[250px]"
            >
              {activeTab === "premium" && (
                <ul className="space-y-6">
                  {product.details.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-[#a932bd] flex-shrink-0" />
                      <span className="text-sm text-[#111] leading-relaxed uppercase tracking-wider font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-6 text-sm text-[#555] uppercase tracking-wider leading-relaxed">
                  <p className="font-medium text-[#111]">{product.shipping}</p>
                  <p>{product.care}</p>
                </div>
              )}
              {activeTab === "specifications" && (
                <div className="grid grid-cols-2 gap-8 text-[10px] uppercase tracking-[0.2em]">
                  <div className="space-y-2">
                    <p className="font-bold text-[#a932bd]">SKU</p>
                    <p className="text-[#111]">{product.id}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-[#a932bd]">Category</p>
                    <p className="text-[#111]">{product.tags[0] || "Collection"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-[#a932bd]">Material</p>
                    <p className="text-[#111]">Luxury Blend</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-[#a932bd]">Inventory</p>
                    <p className="text-[#111]">{product.stock > 0 ? "In Stock" : "Limited Edition"}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Pickers & Payments */}
        <div className="space-y-12">
          {/* Price */}
          <div className="flex items-center gap-6">
            <p className="text-4xl font-light text-[#a932bd]">${(product.price / 100).toFixed(2)}</p>
            <div className="h-6 w-px bg-[#e7e7e7]" />
            <div className="flex items-center gap-2">
              <Star size={16} className="fill-[#a932bd] text-[#a932bd]" />
              <span className="text-xs font-bold tracking-widest uppercase">{product.rating} Editorial</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Color Picker with small photo thumbnails if possible */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-bold">Selection: <span className="font-light">{selectedColor}</span></p>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      posthog?.capture("product_variant_selected", {
                        product_id: product.id,
                        variant_type: "color",
                        variant_value: color.name,
                      });
                    }}
                    className={`group relative w-12 h-12 rounded-full border-2 p-1 transition-all ${selectedColor === color.name ? "border-[#a932bd]" : "border-transparent"}`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Variant Picker */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-bold">Size / Fit: <span className="font-light">{selectedSize?.name || "Choose Size"}</span></p>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size.variantId}
                    onClick={() => {
                      setSelectedSize(size);
                      posthog?.capture("product_variant_selected", {
                        product_id: product.id,
                        variant_type: "size",
                        variant_value: size.name,
                        variant_id: size.variantId,
                      });
                    }}
                    className={`py-4 text-[10px] tracking-widest uppercase transition-all rounded-lg border ${selectedSize?.variantId === size.variantId ? "bg-[#111] text-white border-black" : "bg-white text-[#111] border-black/10 hover:border-[#a932bd]"}`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-bold">Quantity</p>
              <div className="flex items-center w-32 bg-[#f9f9f9] px-4 py-2 rounded-lg border border-black/5 justify-between">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-[#a932bd]"><Minus size={16}/></button>
                <span className="text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="hover:text-[#a932bd]"><Plus size={16}/></button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleAddToBag}
                  className={`py-5 text-[10px] uppercase tracking-[0.3em] font-bold rounded-xl transition-all border-2 ${isAdded ? "bg-green-600 border-green-600 text-white" : "bg-black text-white border-black hover:bg-[#a932bd] hover:border-[#a932bd]"}`}
                >
                  {isAdded ? "Added to Universe" : "Add to Bag"}
                </button>
                <button
                  onClick={() => {
                    const newWishlistState = !isWishlisted;
                    setIsWishlisted(newWishlistState);
                    posthog?.capture("product_wishlist_toggled", {
                      product_id: product.id,
                      product_title: product.title,
                      action: newWishlistState ? "added" : "removed",
                    });
                  }}
                  className={`py-5 text-[10px] uppercase tracking-[0.3em] font-bold rounded-xl transition-all border-2 flex items-center justify-center gap-2 ${isWishlisted ? "bg-[#a932bd]/10 border-[#a932bd] text-[#a932bd]" : "bg-white border-black/10 hover:border-black"}`}
                >
                  <Heart size={14} className={isWishlisted ? "fill-[#a932bd]" : ""} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
              </div>

              {/* Express Payments with Original Colors */}
              <div className="space-y-4 pt-4 border-t border-[#f0f0f0]">
                <p className="text-[10px] uppercase tracking-widest font-bold text-center text-black/40">Express Checkout</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-14 bg-black text-white rounded-xl flex items-center justify-center gap-2 font-bold hover:opacity-90 transition-opacity">
                    <span className="text-lg"></span> Pay
                  </button>
                  <button className="h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors">
                    <Image src="https://www.gstatic.com/images/branding/product/1x/gpay_32dp.png" width={40} height={20} alt="GPay" className="object-contain" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="h-14 bg-[#FFC439] text-[#003087] rounded-xl flex items-center justify-center font-bold hover:bg-[#f2ba34] transition-colors">
                    PayPal
                  </button>
                  <button className="h-14 bg-[#008CFF] text-white rounded-xl flex items-center justify-center font-bold hover:bg-[#007ce6] transition-colors">
                    Venmo
                  </button>
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
