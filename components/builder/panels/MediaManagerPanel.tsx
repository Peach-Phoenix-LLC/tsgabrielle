"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Upload, Trash2, Copy, Loader2, Search, FolderOpen } from "lucide-react";
import type { MediaItem } from "@/lib/builder-types";

interface MediaManagerPanelProps {
  onSelect?: (url: string) => void;
}

export default function MediaManagerPanel({ onSelect }: MediaManagerPanelProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("all");

  const loadMedia = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (folder !== "all") params.set("folder", folder);
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/builder/media?${params}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [folder, search]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder === "all" ? "general" : folder);

        const res = await fetch("/api/admin/builder/media", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
      }
      await loadMedia();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await fetch(`/api/admin/builder/media?id=${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const FOLDERS = ["all", "general", "builder", "products", "collections", "hero"];

  return (
    <div className="space-y-3">
      {/* Upload */}
      <label
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-white/20 cursor-pointer hover:border-[#a932bd] hover:bg-[#a932bd]/10 transition-all ${
          uploading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {uploading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Upload size={14} />
        )}
        <span className="text-[10px] uppercase tracking-widest font-bold">
          {uploading ? "Uploading..." : "Upload Images"}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>

      {/* Search */}
      <div className="relative">
        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media..."
          className="w-full bg-white/5 border border-white/10 pl-8 pr-3 py-2 rounded-lg text-xs text-white/70 outline-none focus:border-[#a932bd]"
        />
      </div>

      {/* Folders */}
      <div className="flex gap-1 flex-wrap">
        {FOLDERS.map((f) => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest transition-colors ${
              folder === f
                ? "bg-[#a932bd] text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10"
            }`}
          >
            <FolderOpen size={10} className="inline mr-1" />
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 size={16} className="animate-spin text-white/40" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-6 text-white/30 text-xs">
          No images found
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-lg overflow-hidden aspect-square bg-white/5 cursor-pointer"
              onClick={() => onSelect?.(item.url)}
            >
              <Image
                src={item.url}
                alt={item.alt_text || item.filename}
                fill
                className="object-cover"
                sizes="100px"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUrl(item.url);
                  }}
                  className="p-1.5 rounded bg-white/20 hover:bg-white/30"
                  title="Copy URL"
                >
                  <Copy size={10} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="p-1.5 rounded bg-red-500/30 hover:bg-red-500/50"
                  title="Delete"
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
