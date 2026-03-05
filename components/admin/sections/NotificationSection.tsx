"use client";

import React from "react";
import { Mail, Bell, AlertTriangle } from "lucide-react";

export default function NotificationSection() {
  const notifications = [
    { id: "order_email", label: "Order Confirmation Email", type: "email", icon: Mail, delay: "Instant" },
    { id: "welcome_email", label: "Welcome Email", type: "email", icon: Mail, delay: "5 mins" },
    { id: "abandoned_cart", label: "Abandoned Cart Recovery", type: "email", icon: Mail, delay: "2 hours" },
    { id: "newsletter", label: "Newsletter Confirmation", type: "email", icon: Mail, delay: "Instant" },
    { id: "low_stock", label: "Low Stock Alert", type: "admin", icon: Bell, delay: "Instant" },
  ];

  return (
    <div className="space-y-12 max-w-4xl">
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">Automated Workflows (Klaviyo)</h4>
        <div className="grid gap-4">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="flex items-center justify-between p-6 bg-[#f8f8f8] rounded-xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#a932bd] shadow-sm">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold">{n.label}</p>
                    <p className="text-[8px] uppercase text-black/40 mt-1">Status: Active • Delay: {n.delay}</p>
                  </div>
                </div>
                <button className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd] underline decoration-[#a932bd]/20">Edit Template</button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8 bg-[#fdfcf5] rounded-xl border border-black/5 space-y-6">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle size={16} />
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Inventory Thresholds</h4>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Low Stock Warning (Units)</label>
            <input type="number" defaultValue={5} className="w-full bg-white border border-black/5 px-4 py-2 text-xs outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Admin Alert Email</label>
            <input type="email" defaultValue="ops@peachphoenix.com" className="w-full bg-white border border-black/5 px-4 py-2 text-xs outline-none" />
          </div>
        </div>
      </div>

      <button className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all">
        Save Notification Settings
      </button>
    </div>
  );
}
