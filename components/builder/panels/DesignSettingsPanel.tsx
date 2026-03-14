"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DEFAULT_THEME } from "@/lib/builder-types";
import type { ThemeSettings } from "@/lib/builder-types";

interface DesignSettingsPanelProps {
  onThemeChange?: (theme: ThemeSettings) => void;
}

export default function DesignSettingsPanel({ onThemeChange }: DesignSettingsPanelProps) {
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/builder/theme");
        if (res.ok) {
          const data = await res.json();
          if (data && data.colors) {
            setTheme(data);
          }
        }
      } catch {
        // use defaults
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const updateColor = (key: string, value: string) => {
    setTheme((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const updateTypography = (key: string, value: string) => {
    setTheme((prev) => ({
      ...prev,
      typography: { ...prev.typography, [key]: value },
    }));
  };

  const updateLayout = (key: string, value: string) => {
    setTheme((prev) => ({
      ...prev,
      layout: { ...prev.layout, [key]: value },
    }));
  };

  const saveTheme = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/builder/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      });
      if (!res.ok) throw new Error("Failed to save theme");
      onThemeChange?.(theme);
    } catch (e) {
      console.error(e);
      alert("Failed to save theme settings");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={16} className="animate-spin text-white/40" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Colors */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
          Colors
        </p>
        <div className="space-y-2">
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-xs capitalize">{key}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-20 bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/70 outline-none focus:border-[#a932bd]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
          Typography
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs">Body Font</span>
            <select
              value={theme.typography.fontFamily}
              onChange={(e) => updateTypography("fontFamily", e.target.value)}
              className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/70 outline-none"
            >
              <option value="var(--font-lato)">Lato</option>
              <option value="var(--font-space-grotesk)">Space Grotesk</option>
              <option value="system-ui">System UI</option>
              <option value="Georgia, serif">Georgia</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Heading Font</span>
            <select
              value={theme.typography.headingFont}
              onChange={(e) => updateTypography("headingFont", e.target.value)}
              className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/70 outline-none"
            >
              <option value="var(--font-space-grotesk)">Space Grotesk</option>
              <option value="var(--font-lato)">Lato</option>
              <option value="system-ui">System UI</option>
              <option value="Georgia, serif">Georgia</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Body Size</span>
            <input
              type="text"
              value={theme.typography.bodySize}
              onChange={(e) => updateTypography("bodySize", e.target.value)}
              className="w-20 bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/70 outline-none focus:border-[#a932bd]"
            />
          </div>
        </div>
      </div>

      {/* Layout */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
          Layout
        </p>
        <div className="space-y-2">
          {Object.entries(theme.layout).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-xs capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <input
                type="text"
                value={value}
                onChange={(e) => updateLayout(key, e.target.value)}
                className="w-24 bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/70 outline-none focus:border-[#a932bd]"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={saveTheme}
        disabled={saving}
        className="w-full bg-[#a932bd] hover:bg-[#921fa6] py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest text-white transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Design Settings"}
      </button>
    </div>
  );
}
