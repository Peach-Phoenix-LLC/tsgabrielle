"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImagePickerProps {
    label: string;
    value: string;
    altValue?: string;
    onChange: (url: string) => void;
    onAltChange?: (alt: string) => void;
    placeholder?: string;
}

export default function ImagePicker({
    label,
    value,
    altValue = '',
    onChange,
    onAltChange,
    placeholder = "Enter URL or upload"
}: ImagePickerProps) {
    const [uploading, setUploading] = useState(false);
    const [customName, setCustomName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        if (customName) {
            formData.append('filename', customName);
        }

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                onChange(data.url);
            } else if (data.error) {
                alert(`Upload failed: ${data.error}`);
            }
        } catch (error) {
            console.error('UPLOAD ERROR:', error);
            alert('Upload failed. Check console for details.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4 bg-neutral-50/50 p-6 rounded-2xl border border-black/5">
            <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/60">{label}</label>
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="text-[9px] uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                    >
                        Remove
                    </button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Preview */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white border border-black/10 rounded-xl overflow-hidden shadow-inner group">
                    {value ? (
                        <img
                            src={value}
                            alt={altValue || label}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                            <span className="material-symbols-outlined text-4xl mb-2">image</span>
                            <span className="text-[10px] uppercase tracking-widest">No Image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white text-black px-4 py-2 rounded-full text-[9px] uppercase font-bold tracking-widest"
                        >
                            {value ? 'Change' : 'Upload'}
                        </button>
                    </div>
                </div>

                <div className="flex-grow space-y-4">
                    {/* URL Input */}
                    <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest opacity-40">Direct URL</span>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] text-[#1a1a1a]"
                        />
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest opacity-40">ALT Text</span>
                            <input
                                type="text"
                                value={altValue}
                                onChange={(e) => onAltChange?.(e.target.value)}
                                placeholder="Descriptive text for SEO"
                                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] text-[#1a1a1a]"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest opacity-40">Custom Filename (for upload)</span>
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                placeholder="e.g. hero-summer-2026"
                                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] text-[#1a1a1a]"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-3 bg-white border border-black/10 text-[9px] uppercase font-bold tracking-[0.2em] rounded-xl hover:bg-neutral-50 transition-all shadow-sm"
                        >
                            {uploading ? 'Processing Architecture...' : 'Upload from Device'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
