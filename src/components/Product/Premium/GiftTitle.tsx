"use client";

import React from 'react';

interface GiftTitleProps {
    text: string;
    gifUrl?: string;
}

export const GiftTitle = ({ text, gifUrl }: GiftTitleProps) => {
    if (!gifUrl) {
        return (
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-text-dark leading-tight">
                {text}
            </h1>
        );
    }

    return (
        <div className="relative group">
            <h1
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none select-none text-transparent bg-clip-text"
                style={{
                    backgroundImage: `url("${gifUrl}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitTextStroke: '0.5px rgba(26, 26, 26, 0.1)',
                }}
            >
                {text}
            </h1>
            {/* Subtle overlay for better accessibility if needed */}
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
        </div>
    );
};
