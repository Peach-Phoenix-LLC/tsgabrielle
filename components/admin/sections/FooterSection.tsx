"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { ClaudeTextEditor } from "../ClaudeTextEditor";

export default function FooterSection() {
  const [settings, setSettings] = useState({
    footer_text: "tsgabrielle® USA the tsgabrielle logo and names and trademarks associated with tsgabrielle products are registered trademarks of Peach Phoenix, LLC.",
    footer_copyright: "© 2026 Peach Phoenix, LLC.",
    footer_bg_color: "#bc2ab7"
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
      if (data.footer_settings) {
        setSettings(JSON.parse(data.footer_settings));
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
          key: "footer_settings",
          value: JSON.stringify(settings),
        }),
      });
      setMessage("Footer settings saved!");
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-8 max-w-2xl">
      {message && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          <span className="text-xs font-medium">{message}</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Background Color</label>
          <input 
            type="color" 
            value={settings.footer_bg_color} 
            onChange={e => setSettings({...settings, footer_bg_color: e.target.value})}
            className="w-full h-10 rounded-lg cursor-pointer border-none" 
          />
        </div>
        <div className="space-y-4">
          <ClaudeTextEditor
            label="Legal Text"
            initialValue={settings.footer_text}
            onChange={(val: string) => setSettings({...settings, footer_text: val})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Copyright Line</label>
          <input 
            type="text" 
            value={settings.footer_copyright}
            onChange={e => setSettings({...settings, footer_copyright: e.target.value})}
            className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
          />
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={saving}
        className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all disabled:opacity-50"
      >
        {saving ? <Loader2 className="animate-spin inline mr-2" size={14} /> : null}
        Save Footer Settings
      </button>
    </div>
  );
}
