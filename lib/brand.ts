// ─── TSGABRIELLE BRAND SPEC — source of truth ───────────────────────────────
// DO NOT modify these values without explicit brand approval.
// Referenced by BrandTestSuite and any brand-constrained components.

export const BRAND = {
  name: "tsgabrielle®",
  slogan: "The French Trans Touch™",
  primaryColor: "#a932bd",
  typography: {
    primary: "Lato Bold Italic",
    secondary: "Lato Regular",
    editorial: "Playfair Display Italic",
  },
  colors: {
    primary: {
      "Royal Orchid": "#a932bd",
      "Velvet Plum": "#6d1e86",
      "Electric Lilac": "#d86cf3",
      "Aurora Pink": "#ff8adf",
    },
    neutral: {
      "Jet Black": "#000000",
      "Midnight Graphite": "#1a1a1a",
      "Pearl Gray": "#e7e7e7",
      "Pure White": "#ffffff",
    },
    holographic: {
      "Cyber Cyan": "#38e1ff",
      "Prism Blue": "#6df0ff",
      "Neon Magenta": "#ff2bd6",
    },
  },
  logo: {
    versions: ["Primary", "Secondary", "Monogram", "Symbol"] as const,
    monogram: "ts",
  },
  embroidery: {
    minStitchMm: 1.2,
    maxStitchMm: 1.6,
    threadColors: ["#a932bd", "#ffffff"],
  },
  animation: {
    loopDurationSec: 4,
  },
  tag: {
    front: ["peach icon", "tsgabrielle®"],
    back: ["The French Trans Touch™"],
  },
} as const;

export type Brand = typeof BRAND;
