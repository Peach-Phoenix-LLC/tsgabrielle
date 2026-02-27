"use client";

import React from 'react';
import ImagePicker from './ImagePicker';

interface Variant {
    id?: string | number;
    variant_sku: string;
    variant_mpn: string;
    size_label: string;
    color: string;
    inventory: string;
    msrp: string;
    image_url?: string;
    image_alt?: string;
    height?: string;
    diameter?: string;
}

interface ProductVariantManagerProps {
    variants: Variant[];
    onChange: (variants: Variant[]) => void;
}

export default function ProductVariantManager({ variants, onChange }: ProductVariantManagerProps) {
    const addVariant = () => {
        onChange([...variants, { variant_sku: '', variant_mpn: '', size_label: '', color: '', inventory: 'In Stock', msrp: '0.00', height: '', diameter: '' }]);
    };

    const removeVariant = (idx: number) => {
        const newVariants = [...variants];
        newVariants.splice(idx, 1);
        onChange(newVariants);
    };

    const updateVariant = (idx: number, field: keyof Variant, value: any) => {
        const newVariants = [...variants];
        newVariants[idx] = { ...newVariants[idx], [field]: value };
        onChange(newVariants);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]">Variant Architecture</h4>
                <button
                    type="button"
                    onClick={addVariant}
                    className="px-6 py-2 border border-black/10 text-[9px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-50"
                >
                    + Add Variant SKU
                </button>
            </div>

            <div className="space-y-4">
                {variants.map((variant, idx) => (
                    <div key={idx} className="bg-neutral-50 border border-black/5 rounded-2xl p-6 relative group">
                        <button
                            type="button"
                            onClick={() => removeVariant(idx)}
                            className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Variant Image */}
                            <div className="md:col-span-3">
                                <ImagePicker
                                    label="Variant Photo"
                                    value={variant.image_url || ''}
                                    altValue={variant.image_alt || ''}
                                    onChange={(url) => updateVariant(idx, 'image_url', url)}
                                    onAltChange={(alt) => updateVariant(idx, 'image_alt', alt)}
                                />
                            </div>

                            {/* Variant Details */}
                            <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">SKU</label>
                                    <input
                                        type="text"
                                        value={variant.variant_sku}
                                        onChange={(e) => updateVariant(idx, 'variant_sku', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">MPN</label>
                                    <input
                                        type="text"
                                        value={variant.variant_mpn}
                                        onChange={(e) => updateVariant(idx, 'variant_mpn', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">Size</label>
                                    <input
                                        type="text"
                                        value={variant.size_label}
                                        onChange={(e) => updateVariant(idx, 'size_label', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">Color</label>
                                    <input
                                        type="text"
                                        value={variant.color}
                                        onChange={(e) => updateVariant(idx, 'color', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">MSRP</label>
                                    <input
                                        type="text"
                                        value={variant.msrp}
                                        onChange={(e) => updateVariant(idx, 'msrp', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">Inventory Status</label>
                                    <select
                                        value={variant.inventory}
                                        onChange={(e) => updateVariant(idx, 'inventory', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                        <option value="Pre-order">Pre-order</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">Height</label>
                                    <input
                                        type="text"
                                        value={variant.height}
                                        onChange={(e) => updateVariant(idx, 'height', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-widest text-black/40">Diameter</label>
                                    <input
                                        type="text"
                                        value={variant.diameter}
                                        onChange={(e) => updateVariant(idx, 'diameter', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-xs focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {variants.length === 0 && (
                    <div className="py-12 border border-dashed border-black/10 rounded-2xl text-center">
                        <p className="text-[10px] uppercase tracking-widest opacity-30 italic">No variants defined. Add a SKU to split inventory.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
