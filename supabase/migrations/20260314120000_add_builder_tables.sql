-- Builder Pages: stores page layouts with draft/publish workflow
CREATE TABLE IF NOT EXISTS builder_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  seo_title TEXT,
  seo_description TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
  published_layout JSONB,
  draft_layout JSONB,
  version INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- Builder Sections: individual sections belonging to a page
CREATE TABLE IF NOT EXISTS builder_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES builder_pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  props JSONB NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_builder_sections_page_id ON builder_sections(page_id);

-- Builder Section Versions: version history for published pages
CREATE TABLE IF NOT EXISTS builder_section_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES builder_pages(id) ON DELETE CASCADE,
  version INT NOT NULL,
  layout_snapshot JSONB NOT NULL,
  published_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_builder_versions_page_id ON builder_section_versions(page_id);

-- Theme Settings: global design configuration
CREATE TABLE IF NOT EXISTS theme_settings (
  id INT PRIMARY KEY DEFAULT 1,
  colors JSONB,
  typography JSONB,
  layout JSONB,
  shadows JSONB,
  custom_css TEXT,
  is_draft BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Media Library: centralized image/asset management
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  mime_type TEXT NOT NULL,
  file_size INT NOT NULL DEFAULT 0,
  width INT,
  height INT,
  folder TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] NOT NULL DEFAULT '{}',
  uploaded_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_library_folder ON media_library(folder);

-- Section Templates: reusable section presets
CREATE TABLE IF NOT EXISTS section_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  section_type TEXT NOT NULL,
  preview_image TEXT,
  default_props JSONB NOT NULL DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'content',
  is_global BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default theme settings
INSERT INTO theme_settings (id, colors, typography, layout, shadows)
VALUES (
  1,
  '{"primary":"#a932bd","secondary":"#7f6783","accent":"#cb5c31","background":"#ffffff","text":"#0f1720","muted":"#f8f2e7"}',
  '{"fontFamily":"var(--font-lato)","headingFont":"var(--font-space-grotesk)","headingSizes":{"h1":"3rem","h2":"2.25rem","h3":"1.5rem","h4":"1.25rem"},"bodySize":"1rem","lineHeight":"1.6"}',
  '{"containerWidth":"1280px","sectionPadding":"4rem 0","spacing":"1.5rem","borderRadius":"0.5rem"}',
  '{"card":"0 4px 12px rgba(0,0,0,0.08)","button":"0 2px 8px rgba(169,50,189,0.2)","section":"none"}'
)
ON CONFLICT (id) DO NOTHING;
