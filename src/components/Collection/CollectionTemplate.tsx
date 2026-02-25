"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ChevronDown,
    X,
    ShoppingBag,
    Send,
} from 'lucide-react';
import { ProductCard, PublicProduct } from './ProductCard';
import { StoryData } from '@/lib/collection-data';

interface CollectionTemplateProps {
    slug: string;
    type: 'collection' | 'category';
    story: StoryData;
    products: PublicProduct[];
}

const SORT_OPTIONS = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Name: A-Z', value: 'name_asc' },
    { label: 'Newest', value: 'newest' }
];

const MarqueeStrip = ({ text }: { text: string }) => (
    <div className="bg-[#a932bd] py-3 overflow-hidden whitespace-nowrap border-y border-white/10 relative z-30">
        <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="inline-block"
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="text-white text-xs font-light tracking-[0.4em] uppercase mx-8">
                    {text}
                </span>
            ))}
        </motion.div>
    </div>
);

export default function CollectionTemplate({ slug, type, story, products }: CollectionTemplateProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [scrolled, setScrolled] = useState(false);

    const categories = useMemo(() => {
        const cats = new Set<string>(['All']);
        products.forEach(p => {
            if (p.product_type) cats.add(p.product_type);
        });
        return Array.from(cats);
    }, [products]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProducts = useMemo(() => {
        let items = [...products];

        // Filter
        if (selectedCategory !== 'All') {
            items = items.filter(p => p.product_type?.toLowerCase().includes(selectedCategory.toLowerCase()) || p.subtitle?.toLowerCase().includes(selectedCategory.toLowerCase()));
        }
        if (searchQuery) {
            items = items.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        switch (sortBy) {
            case 'price_asc':
                items.sort((a, b) => {
                    const priceA = parseFloat(a.msrp_display.replace(/[^0-9.]/g, ''));
                    const priceB = parseFloat(b.msrp_display.replace(/[^0-9.]/g, ''));
                    return priceA - priceB;
                });
                break;
            case 'price_desc':
                items.sort((a, b) => {
                    const priceA = parseFloat(a.msrp_display.replace(/[^0-9.]/g, ''));
                    const priceB = parseFloat(b.msrp_display.replace(/[^0-9.]/g, ''));
                    return priceB - priceA;
                });
                break;
            case 'name_asc': items.sort((a, b) => a.title.localeCompare(b.title)); break;
            default: break;
        }

        return items;
    }, [products, searchQuery, selectedCategory, sortBy]);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#a932bd] selection:text-white overflow-x-hidden">
            {/* --- Sticky Navbar --- */}
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-8'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#a932bd] rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:rotate-[360deg] duration-1000">
                            <img src="https://tsgabriell.us/images/logo.png" className="w-6 h-6 invert" alt="Logo" />
                        </div>
                        <span className="text-xl font-light tracking-[0.4em] uppercase">tsgabrielle®</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-12">
                        {['Collections', 'Shop', 'Atelier'].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#a932bd] transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-8">
                        <button className="text-white/60 hover:text-white transition-colors"><Search size={20} /></button>
                        <button className="relative text-white/60 hover:text-white transition-colors">
                            <ShoppingBag size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Section: Hero (Full Screen) --- */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={story.hero.image}
                        alt={story.hero.titleMain}
                        fill
                        className="object-cover brightness-50 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </div>

                {/* Animated Decorative Rings */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[800px] h-[800px] border border-white/5 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[600px] h-[600px] border border-[#a932bd]/10 rounded-full"
                    />
                </div>

                <div className="relative z-20 text-center space-y-8 max-w-4xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-4"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#a932bd]">{story.hero.subtitle}</p>
                        <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-none">
                            {story.hero.titleMain} <br />
                            <span className="italic font-serif">{story.hero.titleItalic}</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        <Link href="#collection" className="group relative px-12 py-5 bg-[#a932bd] text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full overflow-hidden transition-transform hover:scale-105 inline-block">
                            <span className="relative z-10">Shop the Edit</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>
                        <Link href="/about" className="px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white/10 transition-colors">
                            The Narrative
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <Link href="#collection" className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 group">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Scroll to curated</span>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 80] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-transparent via-[#a932bd] to-transparent"
                        />
                    </div>
                </Link>
            </section>

            {/* --- Section: Title filled by GIF --- */}
            <section className="py-20 flex items-center justify-center bg-black overflow-hidden">
                <div className="relative group">
                    <h2 className="text-[15vw] font-black tracking-tighter leading-none select-none text-transparent"
                        style={{
                            WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                            backgroundImage: `url("${story.gifTitle.gifUrl}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text'
                        }}
                    >
                        {story.gifTitle.text}
                    </h2>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 rounded-full" />
                </div>
            </section>

            <MarqueeStrip text={story.marqueeText} />

            {/* --- Section: Story --- */}
            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
                    <div className="flex-1 space-y-12">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#a932bd]">{story.narrative.label}</span>
                        <h2 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
                            {story.narrative.heading} <span className="italic">{story.narrative.italicWord}</span> {story.narrative.headingSuffix}
                        </h2>
                        <p className="text-xl text-white/40 font-light leading-relaxed max-w-xl">
                            {story.narrative.content}
                        </p>
                        <div className="pt-8">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#a932bd]">
                                    <Send size={20} />
                                </div>
                                <p className="text-xs uppercase tracking-[0.3em] font-medium">Shipped Globally</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={story.narrative.image}
                                alt="Story Image"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Accent Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 w-48 h-48 bg-white p-1 rounded-3xl rotate-12 flex items-center justify-center overflow-hidden shadow-2xl"
                        >
                            <div className="w-full h-full bg-[#a932bd] rounded-2xl flex flex-col items-center justify-center text-center p-4">
                                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{story.narrative.badgeText}</span>
                                <span className="text-2xl font-serif text-white italic">{story.narrative.badgeValue}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Second Fullscreen Section --- */}
            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <Image
                    src={story.quote.image}
                    alt="Atmosphere"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center max-w-2xl px-6">
                    <p className="text-4xl md:text-5xl font-light italic text-white/90 tracking-tight leading-snug">
                        {story.quote.text}
                    </p>
                    <p className="mt-8 text-[10px] uppercase tracking-[0.8em] font-bold text-[#a932bd]">— {story.quote.author}</p>
                </div>
            </section>

            {/* --- Sorting & Filtering Bar (Sticky) --- */}
            <div id="collection" className="sticky top-[80px] z-[90] bg-black/60 backdrop-blur-2xl border-y border-white/5 py-6">
                <div className="max-w-7xl mx-auto px-6 space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* Search & Categories */}
                        <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                            <div className="relative group max-w-sm w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#a932bd] transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search pieces..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm outline-none focus:border-[#a932bd]/50 focus:ring-1 focus:ring-[#a932bd]/50 transition-all placeholder:text-white/20"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                {categories.map((cat: string) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[#a932bd] text-white' : 'bg-white/5 text-white/40 hover:text-white border border-white/10'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dropdown */}
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <select
                                    className="appearance-none bg-zinc-900 border border-white/10 rounded-xl py-3.5 pl-5 pr-12 text-[10px] uppercase tracking-widest font-bold outline-none cursor-pointer focus:border-[#a932bd] transition-colors"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Product Grid --- */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProducts.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-40 text-center">
                            <h3 className="text-3xl font-light text-white/20 italic">No pieces found in the current edit.</h3>
                        </div>
                    )}
                </div>
            </section>

            {/* --- Footer Footer --- */}
            <footer className="py-40 bg-zinc-950 border-t border-white/5 text-center">
                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-8 h-[1px] bg-white/20" />
                        <span className="text-[10px] uppercase tracking-[1em] text-white/40">The End of the Promenade</span>
                        <div className="w-8 h-[1px] bg-white/20" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-light italic">Stay in the Light.</h2>
                        <p className="text-white/40 text-sm font-light tracking-widest uppercase">Paris • Phoenix • Worldwide</p>
                    </div>
                    <div className="pt-20">
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.5em]">&copy; 2026 tsgabrielle® All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
