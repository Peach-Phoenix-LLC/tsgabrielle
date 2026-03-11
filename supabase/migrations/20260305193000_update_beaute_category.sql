begin;

-- Step 1: Add SEO and Tags columns to the categories table
alter table public.categories add column if not exists seo_title text;
alter table public.categories add column if not exists seo_description text;
alter table public.categories add column if not exists tags text[];

-- Step 2: Update the 'Beauté Beauty' category with the new data
update public.categories
set
  description = 'Discover a radiant you with our Beauté Beauty collection. Featuring high-performance skincare, luxurious cosmetics, and essential beauty tools, this collection is engineered to enhance your natural glow. Experience formulations that prioritize skin health alongside flawless aesthetic results.',
  seo_title = 'Beauté Beauty Collection | Premium Skincare & Cosmetics | tsgabrielle®',
  seo_description = 'Explore our Beauté Beauty collection for premium skincare, makeup, and beauty tools. Enhance your natural radiance with high-performance beauty essentials.',
  tags = array[
    'beauty', 'beaute', 'skincare', 'cosmetics', 'makeup', 'beauty essentials', 'natural glow',
    'premium beauty', 'luxury skincare', 'beauty products', 'beauty routine', 'healthy skin',
    'radiant skin', 'beauty tools', 'self-care', 'beauty regimen', 'makeup essentials', 'clean beauty',
    'anti-aging', 'hydration', 'complexion', 'beauty accessories', 'cruelty-free beauty', 'glow up', 'daily beauty'
  ]
where
  slug = 'beaute-beauty';

commit;
