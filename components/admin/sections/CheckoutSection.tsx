"use client";

import React from "react";

export default function CheckoutSection() {
  return (
    <div className="space-y-12 max-w-2xl">
      <div className="grid gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Free Shipping Threshold (USD)</label>
          <input type="number" defaultValue={150} className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Tax Rate (%)</label>
          <input type="number" defaultValue={8.25} step="0.01" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Order Prefix</label>
          <input type="text" defaultValue="TSG-" className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" />
        </div>
        
        <div className="space-y-6 pt-6">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Business Rules</h4>
          <div className="space-y-4">
            {[
              { label: "Allow Guest Checkout", active: true },
              { label: "Require Phone Number", active: false },
              { label: "Enable Coupons & Gift Cards", active: true },
              { label: "Show Estimated Delivery", active: true },
            ].map((rule, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-[#f8f8f8] rounded-lg">
                <span className="text-[10px] uppercase tracking-widest font-medium">{rule.label}</span>
                <button className={`w-10 h-5 rounded-full relative transition-all ${rule.active ? "bg-[#a932bd]" : "bg-black/10"}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${rule.active ? "right-1" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Thank You Message</label>
          <textarea rows={4} defaultValue="Welcome to the universe of tsgabrielle®. Your order has been received and is now in transcendence." className="w-full bg-[#f8f8f8] border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] resize-none" />
        </div>
      </div>

      <button className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all">
        Save Checkout Settings
      </button>
    </div>
  );
}
