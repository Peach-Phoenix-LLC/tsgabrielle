"use client";

import React, { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  X,
  Eye,
  Loader2,
  Layers,
  Palette,
  ImageIcon,
  Layout,
  Undo2,
  Redo2,
  Plus,
  UploadCloud,
  Search,
} from "lucide-react";
import { useVisualBuilder } from "./VisualBuilderProvider";

export function VisualBuilderToolbar() {
  const {
    isEditMode,
    setIsEditMode,
    pendingChanges,
    saveChanges,
    isSaving,
    undo,
    redo,
    canUndo,
    canRedo,
    exitBuilder,
  } = useVisualBuilder();
  const [activePanel, setActivePanel] = useState<null | "sections" | "design" | "media" | "structure" | "pages" | "seo">(null);
  const [structureKeys, setStructureKeys] = useState<string[]>([]);

  const hasChanges = Object.keys(pendingChanges).length > 0;
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    if (activePanel !== "structure") return;
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/admin/page-content?page_path=${encodeURIComponent(currentPath)}`);
        if (!res.ok) return;
        const data = await res.json();
        const keys = Array.isArray(data) ? data.map((item) => item.content_key) : [];
        if (isMounted) setStructureKeys(keys);
      } catch {
        // ignore
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [activePanel, currentPath]);

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-[#111111] text-white px-3 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20">
        <button
          onClick={() => setIsEditMode(true)}
          className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            isEditMode ? "bg-[#a932bd] text-white shadow" : "text-white/60 hover:text-white"
          }`}
        >
          <Edit3 size={14} /> Edit Page
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActivePanel(activePanel === "sections" ? null : "sections")}
            className="px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
          >
            <Plus size={14} /> Add Section
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "pages" ? null : "pages")}
            className="px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
          >
            <Layers size={14} /> New Page
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "seo" ? null : "seo")}
            className="px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
          >
            <Search size={14} /> SEO
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "design" ? null : "design")}
            className="px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
          >
            <Palette size={14} /> Design
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "media" ? null : "media")}
            className="px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
          >
            <ImageIcon size={14} /> Media Manager
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "structure" ? null : "structure")}
            className="px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
          >
            <Layout size={14} /> Page Structure
          </button>
        </div>

        <div className="w-px h-6 bg-white/20 mx-2" />

        <button
          onClick={undo}
          disabled={!canUndo}
          className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            canUndo ? "bg-white/10 hover:bg-white/20" : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <Undo2 size={14} /> Undo
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            canRedo ? "bg-white/10 hover:bg-white/20" : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <Redo2 size={14} /> Redo
        </button>

        <button
          onClick={() => setIsEditMode(false)}
          className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            !isEditMode ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
          }`}
        >
          <Eye size={14} /> Preview
        </button>

        <button
          onClick={saveChanges}
          disabled={!hasChanges || isSaving}
          className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            hasChanges
              ? "bg-green-500 hover:bg-green-600 text-white shadow"
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {isSaving ? "Saving..." : `Save Draft ${hasChanges ? `(${Object.keys(pendingChanges).length})` : ""}`}
        </button>

        <button
          onClick={async () => {
            await saveChanges();
          }}
          disabled={!hasChanges || isSaving}
          className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            hasChanges
              ? "bg-[#a932bd] hover:bg-[#921fa6] text-white shadow"
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          <UploadCloud size={14} /> Publish
        </button>

        <button
          onClick={() => {
            if (!hasChanges || confirm("Exit builder? Unsaved changes will be lost.")) {
              exitBuilder();
            }
          }}
          className="px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
        >
          <X size={14} /> Exit Builder
        </button>
      </div>

      {activePanel && (
        <div className="fixed right-6 bottom-24 z-[9998] w-[360px] rounded-2xl border border-white/10 bg-[#111111] text-white shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">
              {activePanel === "sections" && "Add Section"}
              {activePanel === "design" && "Design Settings"}
              {activePanel === "media" && "Media Manager"}
              {activePanel === "structure" && "Page Structure"}
              {activePanel === "pages" && "Manage Pages"}
              {activePanel === "seo" && "SEO & Meta"}
            </span>
            <button
              onClick={() => setActivePanel(null)}
              className="text-white/50 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-4 text-sm text-white/70 space-y-3">
            {activePanel === "pages" && (
              <div className="space-y-4">
                <button className="w-full bg-[#a932bd] py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest text-white">
                  + Create New CMS Page
                </button>
                <div className="space-y-2">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Active Store Pages</p>
                  {["Home", "The Brand", "About", "Sustainability", "FAQ"].map(p => (
                    <div key={p} className="flex items-center justify-between p-2 rounded bg-white/5 text-xs">
                      <span>{p}</span>
                      <span className="text-[#a932bd] cursor-pointer">Edit</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activePanel === "seo" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">URL Handle</label>
                  <input type="text" value={currentPath} readOnly className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none focus:border-[#a932bd]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">SEO Title</label>
                  <input type="text" placeholder="Enter SEO Title" className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none focus:border-[#a932bd]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Meta Description</label>
                  <textarea rows={3} placeholder="Enter description..." className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none focus:border-[#a932bd]" />
                </div>
                <button className="w-full bg-green-600 py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest text-white">
                  Save Meta Data
                </button>
              </div>
            )}
            {activePanel === "sections" && (
              <>
                <p>Add sections will be enabled once section templates are defined for this page type.</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-widest">
                  {[
                    "Hero",
                    "Image + Text",
                    "Text Block",
                    "Product Grid",
                    "Collection Grid",
                    "Slider",
                    "Banner",
                    "Announcement",
                    "Video",
                    "Newsletter",
                    "Custom HTML",
                  ].map((label) => (
                    <span key={label} className="rounded-full bg-white/5 px-3 py-2 text-center text-white/40">
                      {label}
                    </span>
                  ))}
                </div>
              </>
            )}
            {activePanel === "design" && (
              <>
                <p>Global design controls will sync with your existing theme settings.</p>
                <div className="space-y-2 text-[10px] uppercase tracking-widest">
                  <div className="flex items-center justify-between">
                    <span>Primary Color</span>
                    <span className="rounded-full bg-[#a932bd] px-2 py-1 text-white">#a932bd</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Font Family</span>
                    <span className="rounded-full bg-white/5 px-2 py-1 text-white/60">Lato / Space Grotesk</span>
                  </div>
                </div>
              </>
            )}
            {activePanel === "media" && (
              <>
                <p>Use inline image edit controls to upload or swap imagery.</p>
                <p className="text-white/40 text-xs">Advanced media library integration is ready for next iteration.</p>
              </>
            )}
            {activePanel === "structure" && (
              <>
                <p>Editable blocks detected on this page:</p>
                <div className="space-y-2">
                  {(structureKeys.length > 0 ? structureKeys : Object.keys(pendingChanges)).map((key) => (
                    <div key={key} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                      <span className="truncate">{key}</span>
                      <Layers size={12} className="text-white/40" />
                    </div>
                  ))}
                  {structureKeys.length === 0 && Object.keys(pendingChanges).length === 0 && (
                    <div className="rounded-lg border border-dashed border-white/10 px-3 py-4 text-xs text-white/40">
                      No editable blocks found yet. Click text to start editing.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
