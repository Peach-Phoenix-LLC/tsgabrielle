"use client";

import React from "react";
import { Edit3, Save, X, Eye, Loader2 } from "lucide-react";
import { useVisualBuilder } from "./VisualBuilderProvider";

export function VisualBuilderToolbar() {
  const { isEditMode, setIsEditMode, pendingChanges, saveChanges, isSaving, setPendingChanges } = useVisualBuilder();

  const hasChanges = Object.keys(pendingChanges).length > 0;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-[#111111] text-white p-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20">
      <div className="flex bg-white/10 rounded-full p-1">
        <button
          onClick={() => setIsEditMode(false)}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            !isEditMode ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
          }`}
        >
          <Eye size={14} /> Preview
        </button>
        <button
          onClick={() => setIsEditMode(true)}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            isEditMode ? "bg-[#a932bd] text-white shadow" : "text-white/60 hover:text-white"
          }`}
        >
          <Edit3 size={14} /> Edit Mode
        </button>
      </div>

      <div className="w-px h-6 bg-white/20 mx-2" />

      <button
        onClick={saveChanges}
        disabled={!hasChanges || isSaving}
        className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
          hasChanges
            ? "bg-green-500 hover:bg-green-600 text-white shadow"
            : "bg-white/5 text-white/30 cursor-not-allowed"
        }`}
      >
        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        {isSaving ? "Saving..." : `Save ${hasChanges ? `(${Object.keys(pendingChanges).length})` : ""}`}
      </button>

      {hasChanges && (
        <button
          onClick={() => {
            if (confirm("Discard all unsaved changes?")) setPendingChanges({});
          }}
          className="p-2 rounded-full text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors"
          title="Discard changes"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
