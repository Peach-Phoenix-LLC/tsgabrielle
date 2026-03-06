"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";

export function HeroBannerSection() {
  return (
    <div className="space-y-10 max-w-2xl">
      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Main Headline</label>
          <input type="text" defaultValue="Transcendent Inclusive Luxury" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Sub-headline</label>
          <input type="text" defaultValue="The Pink Flamingo Noir Collection" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Primary Button Text</label>
            <input type="text" defaultValue="Shop Collection" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Primary Button Link</label>
            <input type="text" defaultValue="/collections/flamant-rose" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Background Type</label>
          <select className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none">
            <option>Static Image</option>
            <option>3D Spatial Scene</option>
            <option>Video Loop</option>
          </select>
        </div>
      </div>
      <button className="px-12 py-4 bg-[#a932bd] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all">Save Hero</button>
    </div>
  );
}

export function AboutPageSection() {
  const [team, setTeam] = useState(["Gabrielle Phoenix - Founder & Creative Director", "Chris Work - Lead Systems Architect"]);

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">About Title</label>
            <input type="text" defaultValue="Transcending Boundaries" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Our Mission</label>
            <textarea rows={4} className="w-full bg-[#f8f8f8] border border-black/10 px-4 py-3 text-xs outline-none resize-none" defaultValue="To build a universe of inclusive luxury where every individual feels seen, heard, and transcendent." />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase tracking-widest font-bold">Team Management</label>
            <button className="text-[8px] uppercase tracking-widest font-bold text-[#a932bd]">+ Add Member</button>
          </div>
          <div className="space-y-3">
            {team.map((member, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-[#f8f8f8] rounded-lg">
                <span className="text-[10px] font-medium">{member}</span>
                <button className="text-red-400 hover:text-red-600"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="px-12 py-4 bg-[#a932bd] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all">Save About Page</button>
    </div>
  );
}

export function NavigationSection() {
  const [settings, setSettings] = useState({
    announcement_text: "Free Worldwide Shipping on all orders over $150",
    announcement_bg: "#a932bd",
    announcement_color: "#ffffff",
    announcement_active: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.navigation_settings) {
        setSettings(JSON.parse(data.navigation_settings));
      }
    } catch (e) {} finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "navigation_settings",
          value: JSON.stringify(settings),
        }),
      });
      alert("Navigation settings saved!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center p-12"><Plus className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-10 max-w-2xl">
      <div className="p-8 bg-[#fdfcf5] rounded-xl border border-black/5 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a932bd]">Announcement Bar</h4>
          <button 
            onClick={() => setSettings({...settings, announcement_active: !settings.announcement_active})}
            className={`w-10 h-5 rounded-full relative transition-all ${settings.announcement_active ? "bg-[#a932bd]" : "bg-black/10"}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.announcement_active ? "right-1" : "left-1"}`} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Announcement Text</label>
            <input 
              type="text" 
              value={settings.announcement_text} 
              onChange={e => setSettings({...settings, announcement_text: e.target.value})}
              className="w-full bg-white border border-black/5 px-4 py-2 text-xs outline-none" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Background Color</label>
              <input 
                type="color" 
                value={settings.announcement_bg} 
                onChange={e => setSettings({...settings, announcement_bg: e.target.value})}
                className="w-full h-10 rounded-lg cursor-pointer border-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Text Color</label>
              <input 
                type="color" 
                value={settings.announcement_color} 
                onChange={e => setSettings({...settings, announcement_color: e.target.value})}
                className="w-full h-10 rounded-lg cursor-pointer border-none" 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-widest font-bold">Global Links</label>
        <p className="text-[8px] uppercase tracking-widest text-black/40">Navigation links are managed via the Navigation Configuration module (Stage 3).</p>
      </div>
      <button 
        onClick={handleSave}
        disabled={saving}
        className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Navigation"}
      </button>
    </div>
  );
}

export function SEOAnalyticsSection() {
  return (
    <div className="space-y-12 max-w-4xl">
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">Tracking Pixels</h4>
          <div className="space-y-6">
             <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Google Analytics (GA4)</label>
              <input type="text" placeholder="G-XXXXXXXXXX" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
            </div>
             <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Meta Pixel</label>
              <input type="text" placeholder="ID Number" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">Indexing & Robots</h4>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-[#f8f8f8] rounded-lg">
              <span className="text-[10px] uppercase tracking-widest font-medium">Auto-generate Sitemap</span>
              <button className="w-10 h-5 bg-[#a932bd] rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"/></button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Canonical Base URL</label>
              <input type="text" defaultValue="https://tsgabrielle.us" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none" />
            </div>
          </div>
        </div>
      </div>
      <button className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all">Save SEO Settings</button>
    </div>
  );
}
