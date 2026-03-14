import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from 'date-fns';

export default async function PeachesPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect('/login');

    const profile = await prisma.profile.findUnique({
        where: { email: session.user.email! },
        include: {
            peach_history: {
                orderBy: { created_at: 'desc' }
            }
        }
    });

    if (!profile) return <div>Profile not found.</div>;

    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            <div className="mb-12">
                <h1 className="text-4xl font-light text-text-dark mb-4">My Peaches</h1>
                <p className="text-text-dark/50 font-light tracking-wide uppercase text-[10px]">Maison Loyalty Program</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white border border-primary/10 p-10 flex flex-col items-center justify-center text-center rounded-sm">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-text-dark/40 mb-4">Current Balance</span>
                    <div className="text-6xl font-light text-primary flex items-center gap-4">
                        <span className="text-4xl">🍑</span>
                        {profile.peaches_balance}
                    </div>
                </div>
                <div className="bg-primary/5 p-10 flex flex-col justify-center rounded-sm">
                    <h3 className="text-sm font-medium text-text-dark mb-4 uppercase tracking-widest">Rewards Guide</h3>
                    <ul className="space-y-3 text-[12px] text-text-dark/60 font-light">
                        <li className="flex justify-between"><span>100 Peaches</span> <span className="font-medium text-primary">$1.00 Discount</span></li>
                        <li className="flex justify-between"><span>$1 Spent</span> <span className="font-medium text-primary">1 Peach Earned</span></li>
                        <li className="flex justify-between"><span>Account Creation</span> <span className="font-medium text-primary">50 Peaches</span></li>
                        <li className="flex justify-between"><span>Product Review</span> <span className="font-medium text-primary">25 Peaches</span></li>
                    </ul>
                </div>
            </div>

            <h2 className="text-lg font-light text-text-dark mb-8 border-b border-primary/10 pb-4 uppercase tracking-widest">Activity History</h2>

            <div className="space-y-4">
                {profile.peach_history.length > 0 ? (
                    profile.peach_history.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center py-6 border-b border-primary/5 group hover:bg-neutral-50 px-4 transition-colors">
                            <div>
                                <p className="text-sm font-medium text-text-dark mb-1">{tx.description || tx.type}</p>
                                <p className="text-[10px] text-text-dark/30 uppercase tracking-widest">{format(new Date(tx.created_at), 'MMM dd, yyyy')}</p>
                            </div>
                            <div className={`text-lg font-light ${tx.amount > 0 ? 'text-green-600' : 'text-primary'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount} 🍑
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 text-text-dark/30 font-light italic">
                        No transactions recorded yet.
                    </div>
                )}
            </div>
        </div>
    );
}
