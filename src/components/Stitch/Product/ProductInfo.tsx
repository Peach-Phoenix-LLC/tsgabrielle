"use client";
import React, { useState } from 'react';
import ProductSpecs from './ProductSpecs';
import { useCartStore } from '@/lib/store';

export interface ProductType {
    id: string | number;
    title?: string;
    name?: string; // Fallback
    short_description?: string;
    description?: string; // Fallback
    price: number | any;
    msrp_display?: string;
    catalogue_category?: string;
    category?: string; // Fallback
    media_primary_url?: string | null;
    image_url?: string | null; // Fallback
}

export default function ProductInfo({ product }: { product: ProductType }) {
    const { addItem } = useCartStore();
    const [selectedSize, setSelectedSize] = useState('48');
    const [selectedColor, setSelectedColor] = useState('Sandstone');
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    // Normalize data
    const title = product.title || product.name || 'Unknown Product';
    const description = product.short_description || product.description || '';
    const category = product.catalogue_category || product.category || 'Atelier';
    const imageUrl = product.media_primary_url || product.image_url || '';
    const displayPrice = product.msrp_display || (product.price ? `$${Number(product.price).toFixed(2)}` : '');

    const handleAddToBag = () => {
        addItem({
            id: product.id.toString(),
            name: title,
            price: Number(product.price) || 0,
            image: imageUrl,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col h-full md:pl-8 lg:pl-12 pt-8 md:pt-0">

            {/* Headers */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                    <span>tsgabrielle®</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-accent-blue">{category}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
                    {title}
                </h1>

                <div className="flex items-baseline gap-4">
                    <p className="text-3xl font-medium text-gray-900">{displayPrice}</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 font-light leading-relaxed mb-10 text-lg">
                {description}
            </p>

            {/* Selectors */}
            <div className="space-y-8 mb-10">

                {/* Color Selection */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></label>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setSelectedColor('Sandstone')} className={`w-10 h-10 rounded-full bg-[#d4c6b8] border-2 transition-all ${selectedColor === 'Sandstone' ? 'border-accent-blue ring-2 ring-transparent ring-offset-2' : 'border-transparent hover:ring-2 hover:ring-gray-300 ring-offset-2'}`}></button>
                        <button onClick={() => setSelectedColor('Obsidian')} className={`w-10 h-10 rounded-full bg-[#1a1a1a] border-2 transition-all ${selectedColor === 'Obsidian' ? 'border-accent-blue ring-2 ring-transparent ring-offset-2' : 'border-transparent hover:ring-2 hover:ring-gray-300 ring-offset-2'}`}></button>
                        <button onClick={() => setSelectedColor('Slate')} className={`w-10 h-10 rounded-full bg-[#3d4554] border-2 transition-all ${selectedColor === 'Slate' ? 'border-accent-blue ring-2 ring-transparent ring-offset-2' : 'border-transparent hover:ring-2 hover:ring-gray-300 ring-offset-2'}`}></button>
                    </div>
                </div>

                {/* Size Selection */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Size (IT)</label>
                        <button className="text-sm text-accent-blue hover:text-blue-900 font-medium underline-offset-4 hover:underline transition-all">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                        {['44', '46', '48', '50', '52', '54'].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`py-3 border rounded-xl text-sm font-medium transition-all ${selectedSize === size
                                    ? 'border-accent-blue bg-accent-blue text-white shadow-md'
                                    : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Local Quantity Control */}
                <div>
                    <label className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 block">Quantity</label>
                    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-32">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-accent-blue transition-colors focus:outline-none"><span className="material-symbols-outlined text-[18px]">remove</span></button>
                        <span className="font-semibold text-gray-900 min-w-[20px] text-center flex-1">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-accent-blue transition-colors focus:outline-none"><span className="material-symbols-outlined text-[18px]">add</span></button>
                    </div>
                </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                    onClick={handleAddToBag}
                    className={`flex-1 text-white py-4 md:py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_4px_15px_rgba(17,17,212,0.3)] ${isAdded ? 'bg-green-600 hover:bg-green-700 shadow-[0_4px_15px_rgba(22,163,74,0.3)]' : 'bg-accent-blue hover:bg-blue-800 hover:shadow-[0_6px_20px_rgba(17,17,212,0.4)] hover:-translate-y-0.5'}`}
                >
                    {isAdded ? 'Added to Bag!' : 'Add to Bag'}
                </button>
                <button className="sm:w-20 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-4 md:py-5 rounded-xl flex items-center justify-center transition-all group">
                    <span className="material-symbols-outlined text-[24px] group-hover:text-red-500 transition-colors">favorite_border</span>
                </button>
            </div>

            {/* Value Props */}
            <div className="flex items-center gap-6 py-4 border-y border-gray-100 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-gray-400 text-[18px]">verified</span>Authentic</div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-gray-400 text-[18px]">public</span>Global</div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-gray-400 text-[18px]">eco</span>Conscious</div>
            </div>

            <ProductSpecs />

        </div>
    );
}
