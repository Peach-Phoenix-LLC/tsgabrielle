"use client";

import React from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

interface ResponsivePreviewPanelProps {
  currentViewport: "desktop" | "tablet" | "mobile";
  onViewportChange: (viewport: "desktop" | "tablet" | "mobile") => void;
}

const viewports = [
  { key: "desktop" as const, icon: Monitor, label: "Desktop", width: "100%" },
  { key: "tablet" as const, icon: Tablet, label: "Tablet", width: "768px" },
  { key: "mobile" as const, icon: Smartphone, label: "Mobile", width: "375px" },
];

export default function ResponsivePreviewPanel({
  currentViewport,
  onViewportChange,
}: ResponsivePreviewPanelProps) {
  return (
    <div className="flex items-center gap-1">
      {viewports.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => onViewportChange(key)}
          className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            currentViewport === key
              ? "bg-[#a932bd] text-white shadow"
              : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20"
          }`}
          title={label}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
