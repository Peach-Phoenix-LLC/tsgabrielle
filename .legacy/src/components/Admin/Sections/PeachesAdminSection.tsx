"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function PeachesAdminSection() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [adjustment, setAdjustment] = useState({ amount: 0, reason: '' });

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/peaches');
            const data = await res.json();
            setCustomers(data.customers || []);
        } catch (error) {
            console.error("Fetch customers failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleAdjustment = async () => {
        if (!selectedCustomer || adjustment.amount === 0) return;

        try {
            const res = await fetch('/api/admin/peaches', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: selectedCustomer.id,
                    amount: adjustment.amount,
                    description: adjustment.reason || 'Admin adjustment'
                }),
            });

            if (res.ok) {
                alert('Adjustment applied successfully.');
                setAdjustment({ amount: 0, reason: '' });
                fetchCustomers();
                // Refresh selected customer profile for history
                const updated = await fetch(`/api/admin/peaches?userId=${selectedCustomer.id}`).then(r => r.json());
                setSelectedCustomer(updated.customer);
            }
        } catch (error) {
            alert('Failed to apply adjustment.');
        }
    };

    const totalInCirculation = customers.reduce((acc, c) => acc + (c.peaches_balance || 0), 0);

    if (loading) return <div className="py-20 flex justify-center"><div className="size-8 border-2 border-black/5 border-t-primary rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Peaches Management</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Circulation: <span className="text-primary font-bold">🍑 {totalInCirculation}</span> Peaches across {customers.length} customers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Customer List */}
                <div className="lg:col-span-1 bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 bg-neutral-50 border-b border-black/5">
                        <h3 className="text-[10px] uppercase tracking-widest font-bold">Customers</h3>
                    </div>
                    <div className="divide-y divide-black/5 max-h-[600px] overflow-y-auto">
                        {customers.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedCustomer(c)}
                                className={`w-full text-left p-4 hover:bg-primary/5 transition-colors flex justify-between items-center ${selectedCustomer?.id === c.id ? 'bg-primary/5 ring-1 ring-inset ring-primary/20' : ''}`}
                            >
                                <div>
                                    <p className="text-sm font-medium">{c.full_name || 'Anonymous'}</p>
                                    <p className="text-[10px] text-black/40">{c.email}</p>
                                </div>
                                <span className="text-primary font-bold text-xs">🍑 {c.peaches_balance}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Details & Management */}
                <div className="lg:col-span-2 space-y-8">
                    {selectedCustomer ? (
                        <>
                            <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-lg font-light mb-6">Adjust Balance: <span className="text-primary">{selectedCustomer.full_name}</span></h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest opacity-40">Amount (+/-)</label>
                                        <input
                                            type="number"
                                            value={adjustment.amount}
                                            onChange={(e) => setAdjustment({ ...adjustment, amount: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest opacity-40">Note</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Service adjustment"
                                            value={adjustment.reason}
                                            onChange={(e) => setAdjustment({ ...adjustment, reason: e.target.value })}
                                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none"
                                        />
                                    </div>
                                    <div className="sm:col-span-2 pt-4">
                                        <button
                                            onClick={handleAdjustment}
                                            className="w-full py-4 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-800 transition-all"
                                        >
                                            Apply Adjustment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-4 bg-neutral-50 border-b border-black/5">
                                    <h3 className="text-[10px] uppercase tracking-widest font-bold">Transaction History</h3>
                                </div>
                                <div className="divide-y divide-black/5">
                                    {selectedCustomer.peach_history?.length > 0 ? (
                                        selectedCustomer.peach_history.map((tx: any) => (
                                            <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-neutral-50 transition-colors">
                                                <div>
                                                    <p className="text-xs font-medium">{tx.description || tx.type}</p>
                                                    <p className="text-[9px] text-black/40 uppercase tracking-widest">{format(new Date(tx.created_at), 'MMM dd, yyyy')}</p>
                                                </div>
                                                <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-primary'}`}>
                                                    {tx.amount > 0 ? '+' : ''}{tx.amount} 🍑
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-xs text-black/20 italic">No history found.</div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-neutral-50 border border-dashed border-black/10 rounded-2xl h-full flex items-center justify-center p-12 text-center">
                            <div>
                                <span className="material-symbols-outlined text-4xl text-black/10 mb-4 font-light">person_search</span>
                                <p className="text-sm text-black/40 font-light">Select a customer to view their<br />Peaches balance and history.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
