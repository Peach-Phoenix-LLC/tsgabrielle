"use client";

import React from "react";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Trash2,
  GripVertical,
} from "lucide-react";
import { getSectionDefinition } from "@/lib/section-registry";
import type { BuilderSection } from "@/lib/builder-types";

interface PageStructurePanelProps {
  sections: BuilderSection[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  onDelete: (sectionId: string) => void;
  onToggleVisibility: (sectionId: string) => void;
  currentPage?: string;
}

export default function PageStructurePanel({
  sections,
  onReorder,
  onDelete,
  onToggleVisibility,
  currentPage = "/",
}: PageStructurePanelProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-white/40 uppercase tracking-widest">
          Page: {currentPage}
        </p>
        <span className="text-[10px] text-white/30">
          {sections.length} section{sections.length !== 1 ? "s" : ""}
        </span>
      </div>

      {sections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center">
          <p className="text-xs text-white/40">No sections on this page.</p>
          <p className="text-[10px] text-white/30 mt-1">
            Use &quot;Add Section&quot; to start building.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {sections.map((section, index) => {
            const def = getSectionDefinition(section.type);
            return (
              <div
                key={section.id}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  section.visible
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white/[0.02] opacity-50"
                }`}
              >
                <GripVertical
                  size={12}
                  className="text-white/30 cursor-grab flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium truncate block">
                    {def?.label || section.type}
                  </span>
                  <span className="text-[10px] text-white/30">
                    {section.type}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => onReorder(index, index - 1)}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    onClick={() => onReorder(index, index + 1)}
                    disabled={index === sections.length - 1}
                    className="p-1 rounded hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <ChevronDown size={12} />
                  </button>
                  <button
                    onClick={() => onToggleVisibility(section.id)}
                    className="p-1 rounded hover:bg-white/10"
                  >
                    {section.visible ? (
                      <Eye size={12} />
                    ) : (
                      <EyeOff size={12} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${def?.label || section.type}"?`)) {
                        onDelete(section.id);
                      }
                    }}
                    className="p-1 rounded hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
