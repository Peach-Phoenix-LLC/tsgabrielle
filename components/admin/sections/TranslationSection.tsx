"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Loader2, Save, Search, ChevronDown, ChevronRight,
  RotateCcw, Check, Globe, Languages, Eye, EyeOff, X
} from "lucide-react";
import { TRANSLATIONS } from "@/components/admin/ClaudeTextEditor";

const LOCALE_LABELS: Record<string, { flag: string; name: string }> = {
  "en-US": { flag: "🇬🇧", name: "English" },
  "es-ES": { flag: "🇪🇸", name: "Spanish" },
  "fr-FR": { flag: "🇫🇷", name: "French" },
  "it-IT": { flag: "🇮🇹", name: "Italian" },
  "de-DE": { flag: "🇩🇪", name: "German" },
  "nl-NL": { flag: "🇳🇱", name: "Dutch" },
  "pt-PT": { flag: "🇵🇹", name: "Portuguese" },
  "nb-NO": { flag: "🇳🇴", name: "Norwegian" },
  "da-DK": { flag: "🇩🇰", name: "Danish" },
  "sv-SE": { flag: "🇸🇪", name: "Swedish" },
  "fi-FI": { flag: "🇫🇮", name: "Finnish" },
  "pl-PL": { flag: "🇵🇱", name: "Polish" },
};

// Group translation keys by category for better UX
const KEY_GROUPS: Record<string, string[]> = {
  "General": ["appTitle"],
  "Editor UI": ["yourText", "sample", "copy", "characters"],
  "Formatting": [
    "fontFamily", "fontSize", "bold", "italic", "underline",
    "textColor", "textHighlightColor"
  ],
  "Links": ["addLink", "addLinkTitle", "enterUrl", "add", "cancel"],
  "Alignment": ["alignLeft", "alignCenter", "alignRight"],
  "Spacing & Lists": [
    "lineSpacing", "bulletList", "numberedList",
    "decreaseIndent", "increaseIndent"
  ],
  "Analysis": [
    "analyzeText", "analyzing", "suggestions", "all",
    "grammar", "spelling", "punctuation", "style", "clarity"
  ],
  "Suggestions": [
    "clickAnalyzeText", "noSuggestionsCategory",
    "applySuggestion", "applyAllSuggestions",
    "dismiss", "reject", "accept"
  ],
  "Errors": [
    "pleaseEnterText", "failedToAnalyze", "failedToParse"
  ],
};

export default function TranslationSection() {
  const [editedTranslations, setEditedTranslations] = useState<Record<string, Record<string, string>>>({});
  const [savedOverrides, setSavedOverrides] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocale, setSelectedLocale] = useState("en-US");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(Object.keys(KEY_GROUPS).map(k => [k, true]))
  );
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const allLocales = Object.keys(TRANSLATIONS);
  const allKeys = Object.keys(TRANSLATIONS["en-US"]);

  // Load saved overrides from site_settings
  useEffect(() => {
    const loadOverrides = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Failed to load");
        const settings = await res.json();
        const overridesRaw = settings["translations_overrides"];
        if (overridesRaw) {
          const parsed = JSON.parse(overridesRaw);
          setSavedOverrides(parsed);
          setEditedTranslations(JSON.parse(JSON.stringify(parsed)));
        }
      } catch (err) {
        console.error("Error loading translation overrides:", err);
      } finally {
        setLoading(false);
      }
    };
    loadOverrides();
  }, []);

  // Get the effective value for a key (override > default)
  const getEffectiveValue = (locale: string, key: string): string => {
    return editedTranslations[locale]?.[key]
      || TRANSLATIONS[locale]?.[key]
      || TRANSLATIONS["en-US"]?.[key]
      || key;
  };

  // Get the default value
  const getDefaultValue = (locale: string, key: string): string => {
    return TRANSLATIONS[locale]?.[key] || TRANSLATIONS["en-US"]?.[key] || key;
  };

  // Check if a key has been modified
  const isModified = (locale: string, key: string): boolean => {
    return !!editedTranslations[locale]?.[key]
      && editedTranslations[locale][key] !== getDefaultValue(locale, key);
  };

  // Update a translation value
  const updateTranslation = (locale: string, key: string, value: string) => {
    setEditedTranslations(prev => {
      const updated = { ...prev };
      if (!updated[locale]) updated[locale] = {};

      // If value matches default, remove the override
      if (value === getDefaultValue(locale, key)) {
        delete updated[locale][key];
        if (Object.keys(updated[locale]).length === 0) {
          delete updated[locale];
        }
      } else {
        updated[locale][key] = value;
      }

      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Reset a single key to default
  const resetKey = (locale: string, key: string) => {
    setEditedTranslations(prev => {
      const updated = { ...prev };
      if (updated[locale]) {
        delete updated[locale][key];
        if (Object.keys(updated[locale]).length === 0) {
          delete updated[locale];
        }
      }
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Reset all overrides for a locale
  const resetLocale = (locale: string) => {
    if (!confirm(`Reset all custom translations for ${LOCALE_LABELS[locale]?.name || locale}?`)) return;
    setEditedTranslations(prev => {
      const updated = { ...prev };
      delete updated[locale];
      return updated;
    });
    setHasUnsavedChanges(true);
  };

  // Save to database
  const saveTranslations = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "translations_overrides",
          value: JSON.stringify(editedTranslations),
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSavedOverrides(JSON.parse(JSON.stringify(editedTranslations)));
      setSaveSuccess(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving translations:", err);
      alert("Failed to save translations. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Filter keys by search
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return KEY_GROUPS;

    const query = searchQuery.toLowerCase();
    const filtered: Record<string, string[]> = {};

    Object.entries(KEY_GROUPS).forEach(([group, keys]) => {
      const matchingKeys = keys.filter(key => {
        const keyMatches = key.toLowerCase().includes(query);
        const valueMatches = getEffectiveValue(selectedLocale, key).toLowerCase().includes(query);
        const enValueMatches = TRANSLATIONS["en-US"]?.[key]?.toLowerCase().includes(query);
        return keyMatches || valueMatches || enValueMatches;
      });
      if (matchingKeys.length > 0) {
        filtered[group] = matchingKeys;
      }
    });

    return filtered;
  }, [searchQuery, selectedLocale, editedTranslations]);

  // Count overrides per locale
  const overrideCount = (locale: string): number => {
    return Object.keys(editedTranslations[locale] || {}).length;
  };

  // Toggle group expansion
  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-[#a932bd]" size={24} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#a932bd] flex items-center gap-2">
            <Languages size={14} />
            Text Editor Translations
          </h3>
          <p className="text-[9px] uppercase tracking-widest text-black/40 mt-1">
            Customize translation strings for the Claude Writing Assistant across {allLocales.length} languages
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <span className="text-[8px] uppercase tracking-widest text-amber-600 font-bold animate-pulse">
              Unsaved changes
            </span>
          )}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-2 rounded-lg text-[9px] uppercase tracking-widest font-bold flex items-center gap-2 border border-black/10 hover:border-[#a932bd]/30 transition-colors"
          >
            {showPreview ? <EyeOff size={12} /> : <Eye size={12} />}
            Preview
          </button>
          <button
            onClick={saveTranslations}
            disabled={saving || !hasUnsavedChanges}
            className={`px-4 py-2 rounded-lg text-[9px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
              saving || !hasUnsavedChanges
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : saveSuccess
                ? "bg-green-500 text-white"
                : "bg-[#a932bd] text-white hover:bg-black"
            }`}
          >
            {saving ? (
              <Loader2 size={12} className="animate-spin" />
            ) : saveSuccess ? (
              <Check size={12} />
            ) : (
              <Save size={12} />
            )}
            {saving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Locale Tabs + Search */}
      <div className="flex flex-col gap-4">
        {/* Locale Selector */}
        <div className="flex flex-wrap gap-2">
          {allLocales.map(locale => {
            const info = LOCALE_LABELS[locale];
            const count = overrideCount(locale);
            return (
              <button
                key={locale}
                onClick={() => setSelectedLocale(locale)}
                className={`px-3 py-2 rounded-lg text-[9px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all border ${
                  selectedLocale === locale
                    ? "bg-[#a932bd]/10 text-[#a932bd] border-[#a932bd]/30"
                    : "border-transparent hover:bg-black/5 text-black/50 hover:text-black"
                }`}
              >
                <span className="text-sm">{info?.flag || "🌐"}</span>
                <span>{info?.name || locale}</span>
                {count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#a932bd] text-white text-[7px]">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search + Actions Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keys or values..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#a932bd]/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => resetLocale(selectedLocale)}
            disabled={overrideCount(selectedLocale) === 0}
            className={`px-3 py-2.5 rounded-lg text-[9px] uppercase tracking-widest font-bold flex items-center gap-2 border transition-colors ${
              overrideCount(selectedLocale) === 0
                ? "border-black/5 text-black/20 cursor-not-allowed"
                : "border-red-200 text-red-500 hover:bg-red-50"
            }`}
          >
            <RotateCcw size={12} />
            Reset All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-[#fdfcf5]/50 rounded-xl border border-black/5">
          <p className="text-[7px] uppercase tracking-widest text-black/40">Total Keys</p>
          <p className="text-xl font-serif mt-1">{allKeys.length}</p>
        </div>
        <div className="p-4 bg-[#fdfcf5]/50 rounded-xl border border-black/5">
          <p className="text-[7px] uppercase tracking-widest text-black/40">Languages</p>
          <p className="text-xl font-serif mt-1">{allLocales.length}</p>
        </div>
        <div className="p-4 bg-[#fdfcf5]/50 rounded-xl border border-black/5">
          <p className="text-[7px] uppercase tracking-widest text-black/40">Custom Overrides</p>
          <p className="text-xl font-serif mt-1">{overrideCount(selectedLocale)}</p>
        </div>
        <div className="p-4 bg-[#fdfcf5]/50 rounded-xl border border-black/5">
          <p className="text-[7px] uppercase tracking-widest text-black/40">Total Overrides</p>
          <p className="text-xl font-serif mt-1">
            {Object.values(editedTranslations).reduce((sum, loc) => sum + Object.keys(loc).length, 0)}
          </p>
        </div>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className="p-6 bg-gradient-to-br from-[#fdfcf5] to-white rounded-xl border border-[#a932bd]/10">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={14} className="text-[#a932bd]" />
            <h4 className="text-[9px] uppercase tracking-widest font-bold text-[#a932bd]">
              Live Preview ({LOCALE_LABELS[selectedLocale]?.name})
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {allKeys.slice(0, 15).map(key => (
              <div key={key} className="space-y-0.5">
                <p className="text-[8px] uppercase tracking-widest text-black/30">{key}</p>
                <p className={`text-xs ${isModified(selectedLocale, key) ? "text-[#a932bd] font-bold" : "text-black/70"}`}>
                  {getEffectiveValue(selectedLocale, key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Translation Groups */}
      <div className="space-y-3">
        {Object.entries(filteredGroups).map(([group, keys]) => (
          <div key={group} className="border border-black/5 rounded-xl overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between px-5 py-3 bg-[#fdfcf5]/50 hover:bg-[#fdfcf5] transition-colors"
            >
              <div className="flex items-center gap-3">
                {expandedGroups[group] ? (
                  <ChevronDown size={14} className="text-[#a932bd]" />
                ) : (
                  <ChevronRight size={14} className="text-black/30" />
                )}
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/70">
                  {group}
                </span>
                <span className="text-[8px] text-black/30">
                  ({keys.length} keys)
                </span>
              </div>
              {keys.some(key => isModified(selectedLocale, key)) && (
                <span className="text-[7px] uppercase tracking-widest font-bold text-[#a932bd] px-2 py-0.5 bg-[#a932bd]/10 rounded-full">
                  Modified
                </span>
              )}
            </button>

            {/* Group Content */}
            {expandedGroups[group] && (
              <div className="divide-y divide-black/5">
                {keys.map(key => {
                  const defaultVal = getDefaultValue(selectedLocale, key);
                  const currentVal = getEffectiveValue(selectedLocale, key);
                  const modified = isModified(selectedLocale, key);
                  const enVal = TRANSLATIONS["en-US"]?.[key] || key;

                  return (
                    <div
                      key={key}
                      className={`px-5 py-3 flex items-start gap-4 transition-colors ${
                        modified ? "bg-[#a932bd]/[0.02]" : ""
                      }`}
                    >
                      {/* Key + English reference */}
                      <div className="w-52 flex-shrink-0 pt-1">
                        <p className="text-[9px] font-mono font-bold text-black/60">{key}</p>
                        {selectedLocale !== "en-US" && (
                          <p className="text-[8px] text-black/30 mt-0.5 italic truncate" title={enVal}>
                            EN: {enVal}
                          </p>
                        )}
                      </div>

                      {/* Input */}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={currentVal}
                          onChange={(e) => updateTranslation(selectedLocale, key, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-1 ${
                            modified
                              ? "border-[#a932bd]/30 focus:ring-[#a932bd]/30 bg-white"
                              : "border-black/10 focus:ring-black/10 bg-transparent"
                          }`}
                          placeholder={defaultVal}
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 pt-1">
                        {modified && (
                          <button
                            onClick={() => resetKey(selectedLocale, key)}
                            className="p-1.5 rounded text-black/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Reset to default"
                          >
                            <RotateCcw size={12} />
                          </button>
                        )}
                        {modified && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#a932bd]" title="Modified" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(filteredGroups).length === 0 && (
        <div className="text-center py-12">
          <Search size={24} className="mx-auto text-black/20 mb-3" />
          <p className="text-[10px] uppercase tracking-widest text-black/40">
            No keys match your search
          </p>
        </div>
      )}

      {/* Bottom Save Bar (sticky) */}
      {hasUnsavedChanges && (
        <div className="sticky bottom-0 -mx-10 -mb-10 px-10 py-4 bg-white/90 backdrop-blur-sm border-t border-black/10 flex justify-between items-center">
          <p className="text-[9px] uppercase tracking-widest text-amber-600 font-bold">
            You have unsaved translation changes
          </p>
          <button
            onClick={saveTranslations}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-[#a932bd] text-white text-[9px] uppercase tracking-widest font-bold hover:bg-black transition-colors flex items-center gap-2"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
