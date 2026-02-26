"use client";

import React, { useState } from 'react';

interface ColorSwatchesProps {
    colors: { name: string; hex: string }[];
}

export const ColorSwatches = ({ colors }: ColorSwatchesProps) => {
    const [selected, setSelected] = useState(0);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <span className="text-[12px] uppercase tracking-widest font-bold text-text-dark">Color</span>
                <span className="text-text-dark/40">—</span>
                <span className="text-[12px] uppercase tracking-widest text-text-dark/40">{colors[selected].name}</span>
            </div>
            <div className="flex gap-4">
                {colors.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`w-10 h-10 rounded-full border transition-all p-1 ${selected === i ? 'border-[#a932bd]' : 'border-transparent'
                            }`}
                    >
                        <div
                            className="w-full h-full rounded-full border border-black/5"
                            style={{ backgroundColor: c.hex }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
