export interface BuilderSection {
  id: string;
  type: string;
  props: Record<string, any>;
  visible: boolean;
}

export interface BuilderPageLayout {
  page: string;
  title: string;
  sections: BuilderSection[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

export interface ThemeTypography {
  fontFamily: string;
  headingFont: string;
  headingSizes: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
  };
  bodySize: string;
  lineHeight: string;
}

export interface ThemeLayout {
  containerWidth: string;
  sectionPadding: string;
  spacing: string;
  borderRadius: string;
}

export interface ThemeShadows {
  card: string;
  button: string;
  section: string;
}

export interface ThemeSettings {
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  shadows: ThemeShadows;
  customCss?: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  folder: string;
  tags: string[];
  created_at: string;
}

export const DEFAULT_THEME: ThemeSettings = {
  colors: {
    primary: "#a932bd",
    secondary: "#7f6783",
    accent: "#cb5c31",
    background: "#ffffff",
    text: "#0f1720",
    muted: "#f8f2e7",
  },
  typography: {
    fontFamily: "var(--font-lato)",
    headingFont: "var(--font-space-grotesk)",
    headingSizes: { h1: "3rem", h2: "2.25rem", h3: "1.5rem", h4: "1.25rem" },
    bodySize: "1rem",
    lineHeight: "1.6",
  },
  layout: {
    containerWidth: "1280px",
    sectionPadding: "4rem 0",
    spacing: "1.5rem",
    borderRadius: "0.5rem",
  },
  shadows: {
    card: "0 4px 12px rgba(0,0,0,0.08)",
    button: "0 2px 8px rgba(169,50,189,0.2)",
    section: "none",
  },
};
