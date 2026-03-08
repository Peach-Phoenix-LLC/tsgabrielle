import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const PAGE_PATH = "/the-brand";
const HTML_BODY = `
<p>
  <strong>tsgabrielle&reg; &mdash; The Brand</strong>
</p>

<p>
  tsgabrielle&reg; is a modern fashion brand created to celebrate freedom, elegance, and self-expression.
</p>

<p>
  Founded by Peach Phoenix, LLC, the brand blends contemporary design with a spirit of inclusivity, creating clothing and accessories that empower individuals to express who they are without limits.
</p>

<p>
  At the heart of tsgabrielle&reg; lies a simple but powerful idea: style is identity. Fashion is not just about appearance&mdash;it is a language. Through color, texture, and form, every piece becomes a way to communicate confidence, individuality, and pride.
</p>

<p>
  Inspired by global culture&mdash;from the elegance of Parisian fashion to the vibrant energy of Arizona&mdash;tsgabrielle&reg; creates collections that feel both modern and timeless. Clean silhouettes, minimalist aesthetics, and symbolic elements such as the peach and phoenix reflect renewal, authenticity, and transformation.
</p>

<p>
  The brand&rsquo;s philosophy centers on respect, dignity, solidarity, and inclusion. While proudly connected to the spirit of the transgender community, tsgabrielle&reg; is designed for everyone&mdash;women, men, and anyone who believes fashion should be a space of freedom.
</p>

<p>
  Each product is developed with attention to quality, comfort, and design harmony. The goal is simple: create pieces that feel good to wear, look refined, and carry a deeper message of positivity.
</p>

<div class="py-8 my-8 border-y border-[#e7e7e7] text-center">
  <span class="text-2xl italic tracking-wide text-[#111111]">
    "tsgabrielle&reg; is more than apparel.<br/>
    It is a movement of style, confidence, and good energy."
  </span>
</div>

<p class="text-center">
  <strong>tsgabrielle&reg;</strong><br/>
  The French Trans Touch&trade;
</p>
`;

async function main() {
  console.log('Updating page content for', PAGE_PATH);
  
  const entries = [
    { page_path: PAGE_PATH, content_key: 'title', content_value: 'The Brand', content_type: 'text' },
    { page_path: PAGE_PATH, content_key: 'subtitle', content_value: 'Freedom, elegance, and self-expression', content_type: 'text' },
    { page_path: PAGE_PATH, content_key: 'body', content_value: HTML_BODY, content_type: 'html' },
  ];

  for (const entry of entries) {
    const { data, error } = await supabase
      .from('page_content')
      .upsert(entry, { onConflict: 'page_path, content_key' });
      
    if (error) {
      console.error('Error upserting', entry.content_key, error);
    } else {
      console.log('Successfully updated', entry.content_key);
    }
  }
}

main();
