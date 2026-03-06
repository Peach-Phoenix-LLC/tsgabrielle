"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export default function CheckoutSection() {
  const [settings, setSettings] = useState({
    free_shipping_threshold: 150,
    tax_rate: 8.25,
    order_prefix: "TSG-",
    allow_guest_checkout: true,
    require_phone: false,
    enable_coupons: true,
    show_estimated_delivery: true,
    thank_you_message: "Welcome to the universe of tsgabrielle®. Your order has been received and is now in transcendence."
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
      if (data.checkout_settings) {
        setSettings(JSON.parse(data.checkout_settings));
      }
    } catch (e) {
      console.error("Error fetching checkout settings:", e);
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
          key: "checkout_settings",
          value: JSON.stringify(settings),
        }),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-12 max-w-2xl">
      {message && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          <span className="text-xs font-medium">{message}</span>
        </div>
      )}

      <div className="grid gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Free Shipping Threshold (USD)</label>
          <input 
            type="number" 
            value={settings.free_shipping_threshold} 
            onChange={e => setSettings({...settings, free_shipping_threshold: parseInt(e.target.value)})}
            className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Tax Rate (%)</label>
          <input 
            type="number" 
            value={settings.tax_rate} 
            onChange={e => setSettings({...settings, tax_rate: parseFloat(e.target.value)})}
            step="0.01" 
            className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Order Prefix</label>
          <input 
            type="text" 
            value={settings.order_prefix} 
            onChange={e => setSettings({...settings, order_prefix: e.target.value})}
            className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" 
          />
        </div>
        
        <div className="space-y-6 pt-6">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Business Rules</h4>
          <div className="space-y-4">
            {[
              { id: "allow_guest_checkout", label: "Allow Guest Checkout" },
              { id: "require_phone", label: "Require Phone Number" },
              { id: "enable_coupons", label: "Enable Coupons & Gift Cards" },
              { id: "show_estimated_delivery", label: "Show Estimated Delivery" },
            ].map((rule) => {
              const isActive = (settings as any)[rule.id];
              return (
                <div key={rule.id} className="flex justify-between items-center p-4 bg-[#f8f8f8] rounded-lg">
                  <span className="text-[10px] uppercase tracking-widest font-medium">{rule.label}</span>
                  <button 
                    onClick={() => setSettings({...settings, [rule.id]: !isActive})}
                    className={`w-10 h-5 rounded-full relative transition-all ${isActive ? "bg-[#a932bd]" : "bg-black/10"}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isActive ? "right-1" : "left-1"}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Thank You Message</label>
          <textarea 
            rows={4} 
            value={settings.thank_you_message}
            onChange={e => setSettings({...settings, thank_you_message: e.target.value})}
            className="w-full bg-[#f8f8f8] border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] resize-none rounded-lg" 
          />
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={saving}
        className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all disabled:opacity-50"
      >
        {saving ? <Loader2 className="animate-spin inline mr-2" size={14} /> : null}
        Save Checkout Settings
      </button>
    </div>
  );
}
