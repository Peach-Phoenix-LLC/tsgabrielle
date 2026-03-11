"use client";

import { useState } from "react";
import { BRAND } from "@/lib/brand";

// ─── TEST DEFINITIONS ────────────────────────────────────────────────────────
const TESTS = [
  // TYPOGRAPHY
  {
    category: "Typography",
    id: "typo-01",
    name: "Brand name uses Lato Bold Italic",
    run: () => BRAND.typography.primary === "Lato Bold Italic",
    detail: `Expected: "Lato Bold Italic" · Got: "${BRAND.typography.primary}"`,
  },
  {
    category: "Typography",
    id: "typo-02",
    name: "Brand name is lowercase",
    run: () =>
      BRAND.name.replace("®", "").replace(/[^a-z]/g, "") ===
      BRAND.name
        .replace("®", "")
        .replace(/[^a-z]/g, "")
        .toLowerCase(),
    detail: `"${BRAND.name}" — all alphabetic chars must be lowercase`,
  },
  {
    category: "Typography",
    id: "typo-03",
    name: "® symbol uses Lato Regular (not bold/italic)",
    run: () =>
      !BRAND.typography.primary.includes("Regular") &&
      BRAND.typography.secondary === "Lato Regular",
    detail: "® is rendered in secondary typeface (Lato Regular)",
  },
  {
    category: "Typography",
    id: "typo-04",
    name: "Secondary typeface is Lato Regular",
    run: () => BRAND.typography.secondary === "Lato Regular",
    detail: `Expected: "Lato Regular" · Got: "${BRAND.typography.secondary}"`,
  },
  {
    category: "Typography",
    id: "typo-05",
    name: "Editorial typeface is Playfair Display Italic",
    run: () => BRAND.typography.editorial === "Playfair Display Italic",
    detail: `Expected: "Playfair Display Italic" · Got: "${BRAND.typography.editorial}"`,
  },
  // COLOR PALETTE
  {
    category: "Color Palette",
    id: "color-01",
    name: "Primary brand color is Royal Orchid #a932bd",
    run: () =>
      BRAND.primaryColor === "#a932bd" &&
      BRAND.colors.primary["Royal Orchid"] === "#a932bd",
    detail: `Primary HEX: ${BRAND.primaryColor}`,
  },
  {
    category: "Color Palette",
    id: "color-02",
    name: "Deep Shade is Velvet Plum #6d1e86",
    run: () => BRAND.colors.primary["Velvet Plum"] === "#6d1e86",
    detail: `Velvet Plum HEX: ${BRAND.colors.primary["Velvet Plum"]}`,
  },
  {
    category: "Color Palette",
    id: "color-03",
    name: "Highlight Glow is Electric Lilac #d86cf3",
    run: () => BRAND.colors.primary["Electric Lilac"] === "#d86cf3",
    detail: `Electric Lilac HEX: ${BRAND.colors.primary["Electric Lilac"]}`,
  },
  {
    category: "Color Palette",
    id: "color-04",
    name: "Soft Accent is Aurora Pink #ff8adf",
    run: () => BRAND.colors.primary["Aurora Pink"] === "#ff8adf",
    detail: `Aurora Pink HEX: ${BRAND.colors.primary["Aurora Pink"]}`,
  },
  {
    category: "Color Palette",
    id: "color-05",
    name: "All 4 primary brand colors are defined",
    run: () => Object.keys(BRAND.colors.primary).length === 4,
    detail: `Found ${Object.keys(BRAND.colors.primary).length}/4 primary colors`,
  },
  {
    category: "Color Palette",
    id: "color-06",
    name: "Primary background is Jet Black #000000",
    run: () => BRAND.colors.neutral["Jet Black"] === "#000000",
    detail: `Jet Black HEX: ${BRAND.colors.neutral["Jet Black"]}`,
  },
  {
    category: "Color Palette",
    id: "color-07",
    name: "All 4 neutral colors are defined",
    run: () => Object.keys(BRAND.colors.neutral).length === 4,
    detail: `Found ${Object.keys(BRAND.colors.neutral).length}/4 neutral colors`,
  },
  {
    category: "Color Palette",
    id: "color-08",
    name: "All 3 holographic accents are defined",
    run: () => Object.keys(BRAND.colors.holographic).length === 3,
    detail: `Found ${Object.keys(BRAND.colors.holographic).length}/3 holographic accents`,
  },
  {
    category: "Color Palette",
    id: "color-09",
    name: "All HEX values use valid 6-digit format",
    run: () => {
      const all = [
        ...Object.values(BRAND.colors.primary),
        ...Object.values(BRAND.colors.neutral),
        ...Object.values(BRAND.colors.holographic),
      ];
      return all.every((h) => /^#[0-9a-fA-F]{6}$/.test(h));
    },
    detail: "All HEX values must match pattern #RRGGBB",
  },
  {
    category: "Color Palette",
    id: "color-10",
    name: "Cyber Cyan is #38e1ff",
    run: () => BRAND.colors.holographic["Cyber Cyan"] === "#38e1ff",
    detail: `Cyber Cyan HEX: ${BRAND.colors.holographic["Cyber Cyan"]}`,
  },
  // LOGO SYSTEM
  {
    category: "Logo System",
    id: "logo-01",
    name: "Brand has exactly 4 logo versions",
    run: () => BRAND.logo.versions.length === 4,
    detail: `Versions: ${BRAND.logo.versions.join(", ")}`,
  },
  {
    category: "Logo System",
    id: "logo-02",
    name: "Monogram is 'ts' (lowercase)",
    run: () => BRAND.logo.monogram === "ts",
    detail: `Monogram value: "${BRAND.logo.monogram}"`,
  },
  {
    category: "Logo System",
    id: "logo-03",
    name: "Primary logo version exists",
    run: () => (BRAND.logo.versions as readonly string[]).includes("Primary"),
    detail: `Logo versions: ${BRAND.logo.versions.join(", ")}`,
  },
  {
    category: "Logo System",
    id: "logo-04",
    name: "Symbol logo version exists",
    run: () => (BRAND.logo.versions as readonly string[]).includes("Symbol"),
    detail: `Logo versions: ${BRAND.logo.versions.join(", ")}`,
  },
  // BRAND IDENTITY
  {
    category: "Brand Identity",
    id: "brand-01",
    name: "Brand name includes registered trademark ®",
    run: () => BRAND.name.includes("®"),
    detail: `Brand name: "${BRAND.name}"`,
  },
  {
    category: "Brand Identity",
    id: "brand-02",
    name: "Slogan is 'The French Trans Touch™'",
    run: () => BRAND.slogan === "The French Trans Touch™",
    detail: `Slogan: "${BRAND.slogan}"`,
  },
  {
    category: "Brand Identity",
    id: "brand-03",
    name: "Slogan includes ™ symbol",
    run: () => BRAND.slogan.includes("™"),
    detail: `Slogan: "${BRAND.slogan}"`,
  },
  {
    category: "Brand Identity",
    id: "brand-04",
    name: "Slogan contains all three brand signals (French, Trans, Touch)",
    run: () => ["French", "Trans", "Touch"].every((w) => BRAND.slogan.includes(w)),
    detail: `Checking for: French, Trans, Touch in "${BRAND.slogan}"`,
  },
  // EMBROIDERY
  {
    category: "Embroidery",
    id: "emb-01",
    name: "Min stitch thickness is 1.2mm",
    run: () => BRAND.embroidery.minStitchMm === 1.2,
    detail: `Min stitch: ${BRAND.embroidery.minStitchMm}mm`,
  },
  {
    category: "Embroidery",
    id: "emb-02",
    name: "Max stitch thickness is 1.6mm",
    run: () => BRAND.embroidery.maxStitchMm === 1.6,
    detail: `Max stitch: ${BRAND.embroidery.maxStitchMm}mm`,
  },
  {
    category: "Embroidery",
    id: "emb-03",
    name: "Stitch range is valid (min < max)",
    run: () => BRAND.embroidery.minStitchMm < BRAND.embroidery.maxStitchMm,
    detail: `${BRAND.embroidery.minStitchMm}mm < ${BRAND.embroidery.maxStitchMm}mm`,
  },
  {
    category: "Embroidery",
    id: "emb-04",
    name: "Embroidery uses exactly 2 thread colors",
    run: () => BRAND.embroidery.threadColors.length === 2,
    detail: `Thread colors: ${BRAND.embroidery.threadColors.join(", ")}`,
  },
  {
    category: "Embroidery",
    id: "emb-05",
    name: "Purple thread matches primary brand color",
    run: () => (BRAND.embroidery.threadColors as readonly string[]).includes(BRAND.primaryColor),
    detail: `Primary color ${BRAND.primaryColor} must be a thread color`,
  },
  // ANIMATION
  {
    category: "Animation",
    id: "anim-01",
    name: "Logo animation loop is 4 seconds",
    run: () => BRAND.animation.loopDurationSec === 4,
    detail: `Loop duration: ${BRAND.animation.loopDurationSec}s`,
  },
  // CLOTHING TAG
  {
    category: "Clothing Tag",
    id: "tag-01",
    name: "Tag front contains brand name",
    run: () => (BRAND.tag.front as readonly string[]).includes("tsgabrielle®"),
    detail: `Front elements: ${BRAND.tag.front.join(", ")}`,
  },
  {
    category: "Clothing Tag",
    id: "tag-02",
    name: "Tag back contains slogan",
    run: () => (BRAND.tag.back as readonly string[]).includes("The French Trans Touch™"),
    detail: `Back elements: ${BRAND.tag.back.join(", ")}`,
  },
  {
    category: "Clothing Tag",
    id: "tag-03",
    name: "Tag front contains peach icon reference",
    run: () => (BRAND.tag.front as readonly string[]).includes("peach icon"),
    detail: `Front elements: ${BRAND.tag.front.join(", ")}`,
  },
];

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const CATEGORIES = [...new Set(TESTS.map((t) => t.category))];
const CAT_ICONS: Record<string, string> = {
  Typography: "Tt",
  "Color Palette": "◈",
  "Logo System": "⬡",
  "Brand Identity": "✦",
  Embroidery: "⌇",
  Animation: "◎",
  "Clothing Tag": "⊟",
};

type TestResult = { pass: boolean; error: string | null };
type ResultsMap = Record<string, TestResult>;

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function BrandTestSuite() {
  const [results, setResults] = useState<ResultsMap | null>(null);
  const [running, setRunning] = useState(false);
  const [filter, setFilter] = useState("All");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const runTests = () => {
    setRunning(true);
    setResults(null);
    setTimeout(() => {
      const res: ResultsMap = {};
      TESTS.forEach((t) => {
        try {
          res[t.id] = { pass: t.run(), error: null };
        } catch (e) {
          res[t.id] = { pass: false, error: (e as Error).message };
        }
      });
      setResults(res);
      setRunning(false);
    }, 800);
  };

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visibleTests =
    filter === "All" ? TESTS : TESTS.filter((t) => t.category === filter);
  const passed = results ? TESTS.filter((t) => results[t.id]?.pass).length : 0;
  const failed = results ? TESTS.filter((t) => !results[t.id]?.pass).length : 0;
  const total = TESTS.length;
  const pct = results ? Math.round((passed / total) * 100) : 0;

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        fontFamily: "'Lato', sans-serif",
        color: "#e7e7e7",
        padding: "0 0 60px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
          borderBottom: "1px solid #2a2a2a",
          padding: "36px 40px 28px",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#a932bd",
                boxShadow: "0 0 12px #a932bd",
              }}
            />
            <span
              style={{
                fontFamily: "'Lato', sans-serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#a932bd",
              }}
            >
              Brand Integrity Suite
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 38,
              margin: "0 0 4px",
              background:
                "linear-gradient(90deg, #d86cf3, #a932bd, #ff8adf)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            tsgabrielle
            <span
              style={{ fontStyle: "normal", fontWeight: 400, fontSize: 28 }}
            >
              ®
            </span>
          </h1>
          <p
            style={{
              margin: "0 0 24px",
              color: "#888",
              fontSize: 13,
              fontStyle: "italic",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            The French Trans Touch™
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={runTests}
              disabled={running}
              style={{
                background: running
                  ? "#2a2a2a"
                  : "linear-gradient(135deg, #a932bd, #6d1e86)",
                border: "none",
                borderRadius: 6,
                color: "#fff",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.08em",
                padding: "12px 28px",
                cursor: running ? "not-allowed" : "pointer",
                transition: "opacity .2s",
                opacity: running ? 0.6 : 1,
              }}
            >
              {running ? "Running…" : results ? "↺ Re-run All Tests" : "▶ Run All Tests"}
            </button>
            <span style={{ color: "#555", fontSize: 13 }}>
              {total} tests · {CATEGORIES.length} categories
            </span>
            {results && (
              <span
                style={{
                  marginLeft: "auto",
                  fontWeight: 700,
                  fontSize: 14,
                  color:
                    pct === 100
                      ? "#38e1ff"
                      : pct >= 80
                      ? "#a932bd"
                      : "#ff2bd6",
                }}
              >
                {passed}/{total} passed ({pct}%)
              </span>
            )}
          </div>
          {/* SCORE BAR */}
          {results && (
            <div
              style={{
                marginTop: 16,
                height: 4,
                background: "#222",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background:
                    pct === 100
                      ? "linear-gradient(90deg,#38e1ff,#6df0ff)"
                      : "linear-gradient(90deg,#a932bd,#d86cf3)",
                  borderRadius: 4,
                  transition: "width .8s ease",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 40px 0" }}>
        {/* SUMMARY CARDS */}
        {results && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 12,
              marginBottom: 32,
            }}
          >
            {[
              { label: "Passed", value: passed, color: "#38e1ff" },
              { label: "Failed", value: failed, color: "#ff2bd6" },
              { label: "Coverage", value: `${pct}%`, color: "#a932bd" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  background: "#111",
                  border: `1px solid #222`,
                  borderRadius: 8,
                  padding: "16px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    marginBottom: 6,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORY FILTER */}
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}
        >
          {["All", ...CATEGORIES].map((cat) => {
            const isActive = filter === cat;
            const catTests =
              cat === "All" ? TESTS : TESTS.filter((t) => t.category === cat);
            const catPassed = results
              ? catTests.filter((t) => results[t.id]?.pass).length
              : null;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: isActive ? "#a932bd" : "#111",
                  border: `1px solid ${isActive ? "#a932bd" : "#2a2a2a"}`,
                  borderRadius: 20,
                  color: isActive ? "#fff" : "#888",
                  fontSize: 12,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "'Lato', sans-serif",
                  letterSpacing: "0.05em",
                  transition: "all .15s",
                }}
              >
                {cat === "All" ? cat : `${CAT_ICONS[cat]} ${cat}`}
                {results && (
                  <span style={{ marginLeft: 6, opacity: 0.7 }}>
                    {catPassed}/{catTests.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TEST LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {visibleTests.map((test) => {
            const r = results ? results[test.id] : null;
            const isOpen = expandedIds.has(test.id);
            const statusColor = !r ? "#444" : r.pass ? "#38e1ff" : "#ff2bd6";
            const statusLabel = !r ? "PENDING" : r.pass ? "PASS" : "FAIL";
            return (
              <div
                key={test.id}
                style={{
                  background: "#111",
                  border: `1px solid ${
                    r ? (r.pass ? "#1a3a3a" : "#3a1a1a") : "#1e1e1e"
                  }`,
                  borderRadius: 8,
                  overflow: "hidden",
                  transition: "border-color .2s",
                }}
              >
                <button
                  onClick={() => toggle(test.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: statusColor,
                      flexShrink: 0,
                      boxShadow: r ? `0 0 6px ${statusColor}` : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      color: "#444",
                      fontFamily: "monospace",
                      flexShrink: 0,
                      width: 60,
                    }}
                  >
                    {test.id}
                  </span>
                  <span style={{ flex: 1, fontSize: 13, color: "#ccc" }}>
                    {test.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      color: "#555",
                      background: "#1a1a1a",
                      borderRadius: 4,
                      padding: "2px 8px",
                      flexShrink: 0,
                    }}
                  >
                    {test.category}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: statusColor,
                      flexShrink: 0,
                      width: 50,
                      textAlign: "right",
                    }}
                  >
                    {statusLabel}
                  </span>
                  <span style={{ color: "#444", fontSize: 10 }}>
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      borderTop: "1px solid #1e1e1e",
                      padding: "10px 16px 12px 36px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: "#666",
                        fontFamily: "monospace",
                      }}
                    >
                      {test.detail}
                    </p>
                    {r?.error && (
                      <p style={{ margin: "6px 0 0", fontSize: 11, color: "#ff2bd6" }}>
                        Error: {r.error}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* COLOR SWATCHES */}
        <div
          style={{
            marginTop: 40,
            padding: "24px",
            background: "#111",
            borderRadius: 10,
            border: "1px solid #1e1e1e",
          }}
        >
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#555",
            }}
          >
            Color Reference ·{" "}
            {
              Object.values({
                ...BRAND.colors.primary,
                ...BRAND.colors.neutral,
                ...BRAND.colors.holographic,
              }).length
            }{" "}
            values tested
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries({
              ...BRAND.colors.primary,
              ...BRAND.colors.neutral,
              ...BRAND.colors.holographic,
            }).map(([name, hex]) => (
              <div
                key={name}
                title={`${name}: ${hex}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: hex,
                    border: "1px solid #2a2a2a",
                    boxShadow: `0 0 8px ${hex}44`,
                  }}
                />
                <span
                  style={{ fontSize: 9, color: "#444", fontFamily: "monospace" }}
                >
                  {hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
