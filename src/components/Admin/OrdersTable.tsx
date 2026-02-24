"use client";

import React from 'react';

interface Order {
    id: string;
    customer: {
        name: string;
        avatar?: string;
    };
    product: string;
    date: string;
    total: string;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
}

interface OrdersTableProps {
    orders: Order[];
    onViewAll: () => void;
}

const STATUS_CLASSES = {
    Processing: 'bg-purple-100 text-[#a932bd] border-purple-200',
    Shipped: 'bg-blue-100 text-blue-700 border-blue-200',
    Delivered: 'bg-green-100 text-green-700 border-green-200',
    Pending: 'bg-amber-100 text-amber-700 border-amber-200'
};

export default function OrdersTable({ orders, onViewAll }: OrdersTableProps) {
    return (
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-6 flex-1 flex flex-col shadow-xl shadow-purple-500/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
                <button onClick={onViewAll} className="text-sm text-[#a932bd] font-semibold hover:text-purple-700 transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Order ID</th>
                            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer</th>
                            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</th>
                            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="py-4 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {orders.map((order) => (
                            <tr key={order.id} className="group hover:bg-slate-50/80 transition-colors">
                                <td className="py-4 px-4 text-sm font-medium text-slate-900 font-mono">#{order.id.slice(-6).toUpperCase()}</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden border border-white shadow-sm">
                                            {order.customer.avatar
                                                ? <img src={order.customer.avatar} alt={order.customer.name} className="w-full h-full object-cover" />
                                                : order.customer.name.charAt(0)
                                            }
                                        </div>
                                        <span className="text-sm text-slate-700 font-medium">{order.customer.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm text-slate-500">{order.product}</td>
                                <td className="py-4 px-4 text-sm text-slate-500">{order.date}</td>
                                <td className="py-4 px-4 text-sm font-semibold text-slate-900">{order.total}</td>
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_CLASSES[order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button className="text-slate-400 hover:text-[#a932bd] transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
