"use client";

import React, { useState, useEffect } from 'react';
import { triggerSocialPostAction, getProductSocialHistory } from '@/app/actions/social';

interface SocialLog {
    id: string;
    platform: string;
    status: string;
    created_at: string | Date;
    error_log?: string;
}

interface SocialPostingManagerProps {
    productId?: number;
    autoPost: boolean;
    selectedPlatforms: string[];
    onAutoPostChange: (val: boolean) => void;
    onPlatformsChange: (platforms: string[]) => void;
}

const ALL_PLATFORMS = [
    { id: 'instagram', label: 'Instagram', icon: 'photo_camera' },
    { id: 'facebook', label: 'Facebook', icon: 'facebook' },
    { id: 'twitter', label: 'X/Twitter', icon: 'close' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'work' },
    { id: 'pinterest', label: 'Pinterest', icon: 'push_pin' },
    { id: 'tiktok', label: 'TikTok', icon: 'music_note' },
    { id: 'threads', label: 'Threads', icon: 'alternate_email' }
];

export default function SocialPostingManager({
    productId,
    autoPost,
    selectedPlatforms,
    onAutoPostChange,
    onPlatformsChange
}: SocialPostingManagerProps) {
    const [history, setHistory] = useState<SocialLog[]>([]);
    const [isPosting, setIsPosting] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        if (productId) {
            loadHistory();
        }
    }, [productId]);

    const loadHistory = async () => {
        if (!productId) return;
        setLoadingHistory(true);
        try {
            const data = await getProductSocialHistory(productId);
            setHistory(data as any);
        } catch (e) {
            console.error("Failed to load social history", e);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handlePostNow = async () => {
        if (!productId) return;
        if (!confirm(`Broadcast this product to ${selectedPlatforms.length} platforms now?`)) return;

        setIsPosting(true);
        try {
            const result = await triggerSocialPostAction(productId, selectedPlatforms);
            if (result.success) {
                alert("Omnichannel Broadcast Initiated Successfully.");
                loadHistory();
            } else {
                alert(`Broadcast Failed: ${result.error}`);
            }
        } catch (e: any) {
            alert(`Error: ${e.message}`);
        } finally {
            setIsPosting(true); // Wait, setting to true? No, false.
            setIsPosting(false);
        }
    };

    const togglePlatform = (pId: string) => {
        if (selectedPlatforms.includes(pId)) {
            onPlatformsChange(selectedPlatforms.filter(p => p !== pId));
        } else {
            onPlatformsChange([...selectedPlatforms, pId]);
        }
    };

    return (
        <div className="space-y-8 bg-neutral-50/50 p-8 rounded-3xl border border-black/5">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]">Social Intelligence (Ayrshare)</h4>
                    <p className="text-[9px] text-black/40 mt-1 uppercase">Automated Omnichannel Publishing Engine</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] uppercase tracking-widest text-black/40">Auto-post on publish</span>
                    <button
                        type="button"
                        onClick={() => onAutoPostChange(!autoPost)}
                        className={`w-10 h-5 rounded-full transition-all relative ${autoPost ? 'bg-[#a932bd]' : 'bg-neutral-200'}`}
                    >
                        <div className={`absolute top-1 size-3 rounded-full bg-white transition-all ${autoPost ? 'right-1' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {ALL_PLATFORMS.map((platform) => (
                    <button
                        key={platform.id}
                        type="button"
                        onClick={() => togglePlatform(platform.id)}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${selectedPlatforms.includes(platform.id)
                                ? 'bg-white border-[#a932bd] shadow-md shadow-purple-500/10'
                                : 'bg-white/50 border-black/5 opacity-40 hover:opacity-100'
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">{platform.icon}</span>
                        <span className="text-[9px] uppercase font-bold tracking-tighter">{platform.label}</span>
                    </button>
                ))}
            </div>

            {productId && (
                <div className="pt-6 border-t border-black/5 space-y-6">
                    <div className="flex justify-between items-center">
                        <h5 className="text-[9px] uppercase tracking-widest font-bold text-black/40">Broadcast History</h5>
                        <button
                            type="button"
                            onClick={handlePostNow}
                            disabled={isPosting || selectedPlatforms.length === 0}
                            className="px-6 py-2 bg-[#1a1a1a] text-white text-[9px] uppercase font-bold tracking-widest rounded-full hover:bg-[#a932bd] disabled:opacity-30 flex items-center gap-2 transition-all"
                        >
                            {isPosting ? 'Broadcasting...' : 'Manual Broadcast Now'}
                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                        </button>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                        {loadingHistory ? (
                            <p className="text-[9px] uppercase italic text-black/20 text-center py-4">Synchronizing history...</p>
                        ) : history.length > 0 ? (
                            history.map((log) => (
                                <div key={log.id} className="flex items-center justify-between p-3 bg-white border border-black/5 rounded-xl text-[10px]">
                                    <div className="flex items-center gap-3">
                                        <span className={`size-1.5 rounded-full ${log.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className="font-bold uppercase">{log.platform}</span>
                                        <span className="text-black/40">{new Date(log.created_at).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`uppercase font-bold tracking-widest ${log.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'}`}>
                                            {log.status === 'SUCCESS' ? 'Posted ✓' : 'Failed ✗'}
                                        </span>
                                        {log.status === 'FAILED' && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onPlatformsChange([log.platform]);
                                                    setTimeout(handlePostNow, 100);
                                                }}
                                                className="text-primary hover:underline font-bold uppercase tracking-widest"
                                            >
                                                Retry
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-[9px] uppercase italic text-black/20 text-center py-4">No broadcast logs detected for this asset.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
