-- Migration: Create page_layouts table for visual builder
CREATE TABLE IF NOT EXISTS public.page_layouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path TEXT UNIQUE NOT NULL,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    theme_overrides JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.page_layouts ENABLE ROW LEVEL SECURITY;

-- Select policy: Anyone can read layouts
CREATE POLICY "Anyone can read layouts" ON public.page_layouts
    FOR SELECT USING (true);

-- Admin policy: Only admins can update layouts
CREATE POLICY "Admins can manage layouts" ON public.page_layouts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = true
        )
    );

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_page_layouts_updated_at
    BEFORE UPDATE ON public.page_layouts
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
