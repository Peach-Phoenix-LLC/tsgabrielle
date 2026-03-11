"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Eye, Trash2 } from "lucide-react";

export default function OrderSection() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (e) {} finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-light">Recent Orders</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 text-[10px] uppercase tracking-widest text-black/40">
              <th className="pb-4 font-bold">Order ID</th>
              <th className="pb-4 font-bold">Customer</th>
              <th className="pb-4 font-bold">Date</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold">Total</th>
              <th className="pb-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-black/20 uppercase tracking-widest">No orders found</td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors group">
                  <td className="py-4 font-mono text-[10px]">{o.id.split('-')[0]}</td>
                  <td className="py-4">{o.users?.email || "Guest"}</td>
                  <td className="py-4 text-black/40">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-tighter ${
                      o.status === "paid" ? "bg-green-100 text-green-700" : 
                      o.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 font-light">${(o.total_cents / 100).toFixed(2)}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:text-[#a932bd] bg-white border border-black/5 rounded shadow-sm"><Eye size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
