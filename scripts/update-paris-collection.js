import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase env vars missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const PARIS_CONTENT = {
  title: "Paris Collection",
  subtitle: "Parisian elegance redefined for the modern age, fused with luxury streetwear. Refined, bold, and unmistakably tsgabrielle®.",
  description: `The Paris collection isn't just clothing; it's the very soul of tsgabrielle® rendered tangible. It's where the timeless allure of French elegance, the defiant courage of trans identity, and our signature meticulous craftsmanship converge. Drawing inspiration from the profound intimacy of Paris at twilight, the ethereal shimmer of streetlights on rain-kissed cobblestones, and the innate, effortless confidence of true Parisian style, this collection channels our iconic royal-purple identity into wearable poetry.\n\nEvery sculpted silhouette and intentional detail is a direct reflection of The French Trans Touch™ philosophy: an insistence on elegance without fear, identity without apology, and luxury without compromise.\n\nParis seamlessly marries minimalist couture lines with the dynamic structure of modern streetwear, resulting in pieces that are at once timelessly chic and futuristically daring — a true reflection of the city itself. Soft, grounding neutrals provide a sophisticated canvas for our iconic purple spectrum, while subtle holographic accents weave in the digital glow and transformative spirit central to the tsgabrielle® universe.\n\nThis is far beyond a collection. It is an audacious declaration of presence. A profound love letter to authenticity. A potent reminder that true elegance is not inherited — it is always chosen.\n\nAdorn yourself in Paris, and effortlessly carry the city’s inherent fire, its delicate softness, its unwavering rebellion, and its undeniable beauty in every single step.`,
  seo_title: "Paris Collection • tsgabrielle®",
  seo_description: "Discover Paris by tsgabrielle® — a luxury streetwear collection blending French elegance, identity, and modern design. The French Trans Touch™ at its finest.",
  slogans: [
    "Paris. Reimagined by The French Trans Touch™.",
    "Elegance, unboxed with an edge.",
    "Born in Paris. Defined by you.",
    "Luxury that whispers in lower-case.",
    "Where couture finds its courage.",
    "Purple-powered Parisian attitude.",
    "The city of light, brilliantly rewritten."
  ],
  tags: [
    "tsgabrielle paris", "paris streetwear", "french luxury fashion", "parisian style clothing", 
    "trans designer brand", "luxury purple apparel", "french trans touch", "paris couture streetwear", 
    "royal purple fashion", "paris capsule collection", "paris aesthetic clothing", "luxury streetwear brand", 
    "french identity fashion", "paris inspired apparel", "modern paris fashion", "paris chic outfits", 
    "paris designer collection", "paris luxury wear", "french elegance clothing", "paris premium apparel", 
    "paris fashion statement", "trans luxury brand", "future paris fashion", "high-end parisian", "gender-fluid luxury"
  ],
  background_color: "#0a0a0c", // Deep charcoal/midnight
  text_color: "#ffffff",
  product_grid_background_color: "#0a0a0c",
  product_grid_text_color: "#ffffff",
  product_grid_accent_color: "#6b21a8", // Royal Purple
  hero_overlay_color: "rgba(0,0,0,0.4)"
};

async function updateParis() {
  console.log("Updating Paris collection info in Supabase...");
  
  const { data, error } = await supabase
    .from("collections")
    .update(PARIS_CONTENT)
    .eq("slug", "paris")
    .select();

  if (error) {
    console.error("Error updating Paris collection:", error);
    console.log("\nTIP: If you get a column not found error, ensure you have applied the latest migrations in Supabase Studio.");
    return;
  }

  if (!data || data.length === 0) {
    console.log("Collection 'paris' not found, creating it...");
    const { error: insertError } = await supabase
      .from("collections")
      .insert({ ...PARIS_CONTENT, name: "Paris", slug: "paris" });
    
    if (insertError) {
      console.error("Error creating Paris collection:", insertError);
      return;
    }
  }

  console.log("✅ Paris collection integrated successfully.");
}

updateParis().catch(err => {
  console.error("Uncaught error:", err);
});
