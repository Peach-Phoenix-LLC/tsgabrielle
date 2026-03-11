"use client";

import { useState, useEffect } from "react";
import { BarChart3, Save, Loader2, CheckCircle2, Globe, Search } from "lucide-react";

export default function AnalyticsSection() {
  const [settings, setSettings] = useState({
    ga_measurement_id: "G-02TDH8YYH",
    gtm_id: "GT-PL3T58PK",
    meta_pixel_id: "",
    canonical_url: "https://tsgabrielle.us",
    auto_sitemap: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.seo_settings) {
        setSettings(JSON.parse(data.seo_settings));
      }
    } catch (e) {} finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "seo_settings",
          value: JSON.stringify(settings),
        }),
      });
      setMessage("SEO & Analytics settings saved!");
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-12">
      {message && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          <span className="text-xs font-medium">{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Tracking Pixels */}
        <div className="space-y-8">
          <header className="flex items-center gap-3 text-[#a932bd]">
            <Globe size={18} />
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Tracking Pixels</h4>
          </header>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Google Analytics (GA4)</label>
              <input 
                type="text" 
                value={settings.ga_measurement_id}
                onChange={e => setSettings({...settings, ga_measurement_id: e.target.value})}
                placeholder="G-XXXXXXXXXX" 
                className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Google Tag Manager (GTM)</label>
              <input 
                type="text" 
                value={settings.gtm_id}
                onChange={e => setSettings({...settings, gtm_id: e.target.value})}
                placeholder="GT-XXXXXXX" 
                className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Meta Pixel</label>
              <input 
                type="text" 
                value={settings.meta_pixel_id}
                onChange={e => setSettings({...settings, meta_pixel_id: e.target.value})}
                placeholder="ID Number" 
                className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
              />
            </div>
          </div>
        </div>

        {/* Indexing & Robots */}
        <div className="space-y-8">
          <header className="flex items-center gap-3 text-[#a932bd]">
            <Search size={18} />
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Indexing & Robots</h4>
          </header>

          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-[#f8f8f8] rounded-lg">
              <span className="text-[10px] uppercase tracking-widest font-medium">Auto-generate Sitemap</span>
              <button 
                onClick={() => setSettings({...settings, auto_sitemap: !settings.auto_sitemap})}
                className={`w-10 h-5 rounded-full relative transition-all ${settings.auto_sitemap ? "bg-[#a932bd]" : "bg-black/10"}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.auto_sitemap ? "right-1" : "left-1"}`} />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Canonical Base URL</label>
              <input 
                type="text" 
                value={settings.canonical_url}
                onChange={e => setSettings({...settings, canonical_url: e.target.value})}
                className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-black/5">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin inline mr-2" size={14} /> : <Save size={14} className="inline mr-2" />}
          Save SEO & Analytics
        </button>
      </div>

      {/* External Link */}
      <div className="bg-[#fdfcf5] p-8 rounded-2xl border border-black/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#a932bd] shadow-sm">
            <BarChart3 size={24} />
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold">Google Analytics Dashboard</h5>
            <p className="text-[8px] uppercase text-black/40 mt-1">External view of real-time traffic and performance.</p>
          </div>
        </div>
        <a 
          href={`https://analytics.google.com/analytics/web/`} 
          target="_blank" 
          className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd] border-b border-[#a932bd]/20 pb-1 hover:border-[#a932bd] transition-all"
        >
          Launch Console
        </a>
      </div>
    </div>
  );
}
