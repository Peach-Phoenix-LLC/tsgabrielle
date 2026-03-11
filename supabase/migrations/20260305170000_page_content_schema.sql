-- Site Settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Content table for editable texts and images per page
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path VARCHAR(255) NOT NULL,
  content_key VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'text', 'image', 'html'
  content_value TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_path, content_key)
);

-- Hero Slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  subtitle TEXT,
  image_url VARCHAR(500),
  link_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read page_content" ON page_content FOR SELECT USING (true);
CREATE POLICY "Public read hero_slides" ON hero_slides FOR SELECT USING (true);

-- Admin write policies (service role only)
CREATE POLICY "Admin write site_settings" ON site_settings FOR ALL USING (true);
CREATE POLICY "Admin write page_content" ON page_content FOR ALL USING (true);
CREATE POLICY "Admin write hero_slides" ON hero_slides FOR ALL USING (true);

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES 
  ('site_name', 'tsgabrielle®'),
  ('site_tagline', 'Transcendent Inclusive Luxury'),
  ('site_logo', '/images/tsgabrielle-logo-white.png'),
  ('site_favicon', '/favicon.png'),
  ('contact_email', 'contact@tsgabrielle.us'),
  ('facebook_url', 'https://facebook.com'),
  ('instagram_url', 'https://instagram.com'),
  ('tiktok_url', 'https://tiktok.com'),
  ('youtube_url', 'https://youtube.com')
ON CONFLICT (key) DO NOTHING;

-- Insert default hero slides
INSERT INTO hero_slides (title, subtitle, image_url, link_url, sort_order, active) VALUES
  ('Arizona', 'Desert elegance meets holographic luxury', '/images/slides/tsgabrielle-Slide1.png', '/arizona', 1, true),
  ('Made In USA', 'Ethically crafted in America', '/images/slides/tsgabrielle-Slide2.png', '/made-in-usa', 2, true),
  ('TransLove', 'Inclusive collections for all', '/images/slides/tsgabrielle-Slide3.png', '/translove', 3, true),
  ('Paris', 'The essence of haute couture', '/images/slides/tsgabrielle-Slide4.png', '/paris', 4, true)
ON CONFLICT DO NOTHING;
