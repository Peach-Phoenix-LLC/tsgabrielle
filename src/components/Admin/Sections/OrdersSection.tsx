"use client";

import React, { useState, useEffect } from 'react';

export default function OrdersSection() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            if (Array.isArray(data)) setOrders(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="space-y-12 bg-white text-[#1a1a1a]">
            <div>
                <h2 className="text-3xl font-light tracking-tight">Order Fulfilment</h2>
                <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage logistics, track Printful production, and delivery status.</p>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <div className="size-8 border-2 border-black/10 border-t-[#a932bd] rounded-full animate-spin" />
                </div>
            ) : orders.length === 0 ? (
                <div className="p-20 border border-black/10 rounded-2xl bg-neutral-50 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">No Orders Found</p>
                </div>
            ) : (
                <div className="border border-black/10 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-black/10">
                                <th className="px-6 py-4 text-[9px] uppercase tracking-widest font-bold text-black/40">Order</th>
                                <th className="px-6 py-4 text-[9px] uppercase tracking-widest font-bold text-black/40">Product</th>
                                <th className="px-6 py-4 text-[9px] uppercase tracking-widest font-bold text-black/40">Printful Status</th>
                                <th className="px-6 py-4 text-[9px] uppercase tracking-widest font-bold text-black/40">Logistics</th>
                                <th className="px-6 py-4 text-[9px] uppercase tracking-widest font-bold text-black/40 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-6">
                                        <p className="text-xs font-bold uppercase tracking-tight">#{order.id.substring(0, 8)}</p>
                                        <p className="text-[10px] text-black/30 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-xs font-light">{order.mainProductName}</p>
                                        <p className="text-[10px] text-black/30 mt-1">{order.guestEmail}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`size-2 rounded-full ${order.status === 'SHIPPED' ? 'bg-green-500' :
                                                order.status === 'PAID' ? 'bg-blue-500' : 'bg-neutral-300'
                                                }`} />
                                            <p className="text-[11px] font-bold uppercase tracking-widest">{order.status}</p>
                                        </div>
                                        {order.printfulId && (
                                            <p className="text-[9px] text-[#a932bd] mt-1 font-serif">Printful ID: #{order.printfulId}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-6">
                                        {order.trackingNumber ? (
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest">{order.carrier}</p>
                                                <a href={order.trackingUrl} target="_blank" rel="noreferrer" className="text-[10px] text-[#a932bd] underline font-mono">
                                                    {order.trackingNumber}
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="text-[10px] text-black/20 font-light italic">Waiting for tracking...</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <p className="text-sm font-light">${Number(order.total).toFixed(2)}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
