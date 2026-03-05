"use client";

import React, { useState } from "react";
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
  return (
    <div className="space-y-10 max-w-2xl">
      <div className="p-8 bg-[#fdfcf5] rounded-xl border border-black/5 space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a932bd]">Announcement Bar</h4>
          <button className="w-10 h-5 bg-[#a932bd] rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"/></button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Announcement Text</label>
            <input type="text" defaultValue="Free Worldwide Shipping on all orders over $150" className="w-full bg-white border border-black/5 px-4 py-2 text-xs outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Background Color</label>
              <input type="color" defaultValue="#a932bd" className="w-full h-10 rounded-lg cursor-pointer border-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Text Color</label>
              <input type="color" defaultValue="#ffffff" className="w-full h-10 rounded-lg cursor-pointer border-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-widest font-bold">Global Links</label>
        <p className="text-[8px] uppercase tracking-widest text-black/40">Navigation links are managed via the Navigation Configuration module (Stage 3).</p>
      </div>
      <button className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all">Save Navigation</button>
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
