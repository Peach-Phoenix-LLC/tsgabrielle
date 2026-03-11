"use client";

import React, { useState, useEffect } from "react";
import { Mail, Bell, AlertTriangle, Save, Loader2, CheckCircle2 } from "lucide-react";

export default function NotificationSection() {
  const [settings, setSettings] = useState({
    low_stock_threshold: 5,
    admin_alert_email: "ops@tsgabrielle.us",
    workflows: {
      order_email: true,
      welcome_email: true,
      abandoned_cart: true,
      newsletter: true,
    }
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
      if (data.notification_settings) {
        setSettings(JSON.parse(data.notification_settings));
      }
    } catch (e) {
      console.error("Error fetching notification settings:", e);
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
          key: "notification_settings",
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

  const notifications = [
    { id: "order_email", label: "Order Confirmation Email", type: "email", icon: Mail, delay: "Instant" },
    { id: "welcome_email", label: "Welcome Email", type: "email", icon: Mail, delay: "5 mins" },
    { id: "abandoned_cart", label: "Abandoned Cart Recovery", type: "email", icon: Mail, delay: "2 hours" },
    { id: "newsletter", label: "Newsletter Confirmation", type: "email", icon: Mail, delay: "Instant" },
  ];

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-12 max-w-4xl">
      {message && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          <span className="text-xs font-medium">{message}</span>
        </div>
      )}

      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">Automated Workflows (Klaviyo)</h4>
        <div className="grid gap-4">
          {notifications.map((n) => {
            const Icon = n.icon;
            const isActive = (settings.workflows as any)[n.id];
            return (
              <div key={n.id} className="flex items-center justify-between p-6 bg-[#f8f8f8] rounded-xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${isActive ? "bg-white text-[#a932bd]" : "bg-gray-100 text-gray-400"}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold">{n.label}</p>
                    <p className="text-[8px] uppercase text-black/40 mt-1">Status: {isActive ? "Active" : "Disabled"} • Delay: {n.delay}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSettings({...settings, workflows: {...settings.workflows, [n.id]: !isActive}})}
                  className={`text-[8px] uppercase tracking-widest font-bold px-4 py-1 rounded-full border transition-all ${isActive ? "border-[#a932bd] text-[#a932bd] hover:bg-[#a932bd] hover:text-white" : "border-black/10 text-black/40 hover:border-black hover:text-black"}`}
                >
                  {isActive ? "Disable" : "Enable"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8 bg-[#fdfcf5] rounded-xl border border-black/5 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle size={16} />
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Inventory Thresholds</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Low Stock Warning (Units)</label>
            <input 
              type="number" 
              value={settings.low_stock_threshold}
              onChange={e => setSettings({...settings, low_stock_threshold: parseInt(e.target.value)})}
              className="w-full bg-white border border-black/5 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Admin Alert Email</label>
            <input 
              type="email" 
              value={settings.admin_alert_email}
              onChange={e => setSettings({...settings, admin_alert_email: e.target.value})}
              className="w-full bg-white border border-black/5 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg" 
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={saving}
        className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all disabled:opacity-50"
      >
        {saving ? <Loader2 className="animate-spin inline mr-2" size={14} /> : null}
        Save Notification Settings
      </button>
    </div>
  );
}
