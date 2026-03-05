-- Update Hats Category in the main categories table
UPDATE public.categories
SET description = 'Top off your style with our versatile collection of hats. Whether you are looking for vital sun protection, winter warmth, or a bold fashion-forward statement, find the ideal headwear for any season. Each piece combines structural integrity with enduring style.'
WHERE slug = 'hats';

-- Update/Insert Hats Content in page_content for specific SEO and display overrides
INSERT INTO public.page_content (page_path, content_key, content_type, content_value)
VALUES 
  ('/categories/hats', 'seo_title', 'text', 'Stylish Hats & Headwear | Caps, Beanies & Fedoras | tsgabrielle®'),
  ('/categories/hats', 'seo_description', 'text', 'Browse our extensive collection of hats for every season. Shop caps, beanies, sun hats, and fedoras designed for style, comfort, and protection.'),
  ('/categories/hats', 'keywords', 'text', 'hats, headwear, caps, beanies, fedoras, sun hats, winter hats, summer hats, stylish hats, fashion hats, designer hats, casual headwear, mens hats, womens hats, unisex hats, bucket hats, snapbacks, knit hats, warm headwear, protective headwear, trendy hats, classic headwear, sports caps, outdoor hats, statement headwear'),
  ('/categories/hats', 'description', 'text', 'Top off your style with our versatile collection of hats. Whether you are looking for vital sun protection, winter warmth, or a bold fashion-forward statement, find the ideal headwear for any season. Each piece combines structural integrity with enduring style.')
ON CONFLICT (page_path, content_key) 
DO UPDATE SET 
  content_value = EXCLUDED.content_value,
  updated_at = NOW();
