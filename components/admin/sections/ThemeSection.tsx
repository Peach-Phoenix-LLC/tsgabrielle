"use client";

import React, { useState } from "react";

export default function ThemeSection() {
  const [colors, setColors] = useState({
    primary: "#a932bd",
    secondary: "#cb5c31",
    background: "#ffffff",
    text: "#111111",
    accent: "#fdfcf5",
    button: "#000000",
  });

  return (
    <div className="space-y-12 max-w-4xl">
      <div className="grid grid-cols-2 gap-16">
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">Brand Colors</h4>
          <div className="space-y-6">
            {Object.entries(colors).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-[#f8f8f8] rounded-lg">
                <span className="text-[10px] uppercase tracking-widest font-bold capitalize">{key}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-black/40">{val}</span>
                  <input 
                    type="color" 
                    value={val} 
                    onChange={e => setColors({...colors, [key]: e.target.value})}
                    className="w-8 h-8 rounded-full cursor-pointer overflow-hidden border-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">Typography & Styling</h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Heading Font</label>
              <select className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none">
                <option>Lato Light (Signature)</option>
                <option>Playfair Display</option>
                <option>Inter</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Body Font</label>
              <select className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none">
                <option>Lato Light</option>
                <option>Inter</option>
                <option>Georgia</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Button Radius</label>
              <div className="flex gap-4">
                {["None", "Small", "Large", "Full"].map(r => (
                  <button key={r} className="flex-1 py-2 text-[8px] uppercase font-bold border border-black/10 hover:border-black transition-all">{r}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all">
        Save Theme
      </button>
    </div>
  );
}
