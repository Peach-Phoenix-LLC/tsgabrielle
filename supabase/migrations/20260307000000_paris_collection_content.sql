-- Add brand content columns to collections table
ALTER TABLE public.collections
  ADD COLUMN IF NOT EXISTS meta_title        text,
  ADD COLUMN IF NOT EXISTS meta_description  text,
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS slogans           text[],
  ADD COLUMN IF NOT EXISTS seo_tags          text[];

-- ─── Paris Collection — full brand content ───────────────────────────────────
UPDATE public.collections
SET
  meta_title        = 'Paris Collection • tsgabrielle®',
  meta_description  = 'Discover Paris by tsgabrielle® — a luxury streetwear collection blending French elegance, identity, and modern design. The French Trans Touch™ at its finest.',
  description       = 'The Paris collection isn''t just clothing; it''s the very soul of tsgabrielle® rendered tangible. It''s where the timeless allure of French elegance, the defiant courage of trans identity, and our signature meticulous craftsmanship converge. Drawing inspiration from the profound intimacy of Paris at twilight, the ethereal shimmer of streetlights on rain-kissed cobblestones, and the innate, effortless confidence of true Parisian style, this collection channels our iconic royal-purple identity into wearable poetry.

Every sculpted silhouette and intentional detail is a direct reflection of The French Trans Touch™ philosophy: an insistence on elegance without fear, identity without apology, and luxury without compromise.

Paris seamlessly marries minimalist couture lines with the dynamic structure of modern streetwear, resulting in pieces that are at once timelessly chic and futuristically daring — a true reflection of the city itself. Soft, grounding neutrals provide a sophisticated canvas for our iconic purple spectrum, while subtle holographic accents weave in the digital glow and transformative spirit central to the tsgabrielle® universe.

This is far beyond a collection. It is an audacious declaration of presence. A profound love letter to authenticity. A potent reminder that true elegance is not inherited — it is always chosen.

Adorn yourself in Paris, and effortlessly carry the city''s inherent fire, its delicate softness, its unwavering rebellion, and its undeniable beauty in every single step.',
  short_description = 'Parisian elegance redefined for the modern age, fused with luxury streetwear. Refined, bold, and unmistakably tsgabrielle®.',
  slogans           = ARRAY[
    'Paris. Reimagined by The French Trans Touch™.',
    'Elegance, unboxed with an edge.',
    'Born in Paris. Defined by you.',
    'Luxury that whispers in lower-case.',
    'Where couture finds its courage.',
    'Purple-powered Parisian attitude.',
    'The city of light, brilliantly rewritten.'
  ],
  seo_tags          = ARRAY[
    'tsgabrielle paris',
    'paris streetwear',
    'french luxury fashion',
    'parisian style clothing',
    'trans designer brand',
    'luxury purple apparel',
    'french trans touch',
    'paris couture streetwear',
    'royal purple fashion',
    'paris capsule collection',
    'paris aesthetic clothing',
    'luxury streetwear brand',
    'french identity fashion',
    'paris inspired apparel',
    'modern paris fashion',
    'paris chic outfits',
    'paris designer collection',
    'paris luxury wear',
    'french elegance clothing',
    'paris premium apparel',
    'paris fashion statement',
    'trans luxury brand',
    'future paris fashion',
    'high-end parisian',
    'gender-fluid luxury'
  ]
WHERE slug = 'paris';
