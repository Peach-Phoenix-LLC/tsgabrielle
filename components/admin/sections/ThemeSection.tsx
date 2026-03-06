"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export default function ThemeSection() {
  const [colors, setColors] = useState({
    primary: "#a932bd",
    secondary: "#cb5c31",
    background: "#ffffff",
    text: "#111111",
    accent: "#fdfcf5",
    button: "#000000",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTheme();
  }, []);

  async function fetchTheme() {
    try {
      const res = await fetch("/api/admin/settings");
      const settings = await res.json();
      if (settings.theme_colors) {
        setColors(JSON.parse(settings.theme_colors));
      }
    } catch (error) {
      console.error("Error fetching theme:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "theme_colors",
          value: JSON.stringify(colors),
        }),
      });

      if (!res.ok) throw new Error("Failed to save theme");
      
      setMessage("Theme saved successfully!");
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving theme:", error);
      alert("Error saving theme");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl">
      {message && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          <span className="text-xs font-medium">{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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

      <button 
        onClick={handleSave}
        disabled={saving}
        className="flex items-center justify-center gap-2 px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all disabled:opacity-50"
      >
        {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
        {saving ? "Saving..." : "Save Theme"}
      </button>
    </div>
  );
}
