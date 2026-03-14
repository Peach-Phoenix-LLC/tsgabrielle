"use client";

import React, { useState, useEffect } from 'react';

export default function MediaLibrarySection() {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/media');
            const data = await res.json();
            if (Array.isArray(data)) {
                setMedia(data);
            } else {
                setMedia([]);
            }
        } catch (err) {
            console.error("Failed to load media", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                await fetchMedia();
            } else {
                alert('Failed to upload file');
            }
        } catch (err) {
            console.error(err);
            alert('Error during upload');
        } finally {
            setUploading(false);
            if (e.target) e.target.value = ''; // Reset input
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm(`Are you sure you want to delete ${filename}? This action is irreversible and will break any pages using this image.`)) return;

        try {
            const res = await fetch(`/api/admin/media?filename=${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await fetchMedia();
            } else {
                alert('Failed to delete file');
            }
        } catch (err) {
            console.error(err);
            alert('Error during deletion');
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('Copied URL to clipboard!');
    };

    const formatSize = (bytes: string | number) => {
        const b = typeof bytes === 'string' ? parseInt(bytes) : bytes;
        if (isNaN(b)) return '0 B';
        if (b < 1024) return `${b} B`;
        if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
        return `${(b / (1024 * 1024)).toFixed(2)} MB`;
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Media Library</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage all permanently hosted Google Cloud Storage assets.</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                    />
                    <button
                        disabled={uploading}
                        className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full shadow-sm hover:bg-neutral-800 transition-all disabled:opacity-50"
                    >
                        {uploading ? 'Uploading to Cloud...' : 'Upload New File'}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <div className="size-8 border-2 border-black/10 border-t-[#a932bd] rounded-full animate-spin" />
                </div>
            ) : media.length === 0 ? (
                <div className="p-20 border border-black/10 rounded-2xl bg-neutral-50 text-center space-y-4">
                    <span className="material-symbols-outlined text-4xl text-[#1a1a1a]/20">cloud_upload</span>
                    <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Your media bucket is empty</p>
                    <p className="text-xs text-[#1a1a1a]/40">Upload files here to manage your global assets.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {media.map((file, idx) => (
                        <div key={idx} className="group relative bg-neutral-50 border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="aspect-square bg-black/5 relative overflow-hidden flex items-center justify-center">
                                <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-3 backdrop-blur-sm">
                                    <button
                                        onClick={() => copyToClipboard(file.url)}
                                        className="px-4 py-2 bg-white text-black text-[9px] uppercase tracking-widest font-bold rounded-full hover:scale-105 transition-transform"
                                    >
                                        Copy URL
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className="px-4 py-2 bg-red-600 text-white text-[9px] uppercase tracking-widest font-bold rounded-full hover:bg-red-700 hover:scale-105 transition-transform"
                                    >
                                        Delete Forever
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 space-y-1">
                                <p className="text-[10px] font-bold text-[#1a1a1a] truncate" title={file.name}>{file.name}</p>
                                <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-[#1a1a1a]/40">
                                    <span>{formatSize(file.size)}</span>
                                    <span>{new Date(file.created).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
