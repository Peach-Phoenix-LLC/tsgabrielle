import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing env vars. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const ABOUT_GABRIELLE_TEXT = `## ABOUT GABRIELLE

Gabrielle, the visionary behind tsgabrielle®, is a French creator, builder, and entrepreneur who enriches the modern American landscape with a uniquely inclusive perspective. Blending Parisian elegance with bold innovation, Gabrielle has sculpted a brand that champions diversity, authenticity, and the liberating freedom to transcend traditional boundaries.

As a proud trans individual, Gabrielle deeply embeds a commitment to representation and empowerment into tsgabrielle®. This identity serves not as a mere label, but as a profound wellspring of strength, fueling a creative ethos built on visibility, resilience, and the powerful belief that everyone deserves to see themselves reflected in the realms of fashion and entrepreneurship.

Through tsgabrielle®, Gabrielle masterfully transforms concepts into impactful ventures, crafting projects that boldly challenge convention while consistently delivering tangible, practical value. The brand stands as a testament to the conviction that potent ideas—when harmonized with curiosity, discipline, and thoughtful design—can blossom into enduring opportunities.

Gabrielle’s entrepreneurial journey is anchored in relentless learning, agile adaptability, and an intrepid willingness to forge new paths. By keenly embracing emerging technologies, cultural shifts, and evolving market trends, Gabrielle continually broadens the vision and expands the influence of tsgabrielle®.

Ultimately, tsgabrielle® embodies a steadfast commitment to creation, experimentation, and growth—metamorphosing ideas into lasting experiences through ingenuity, persistence, and deliberate action. It is a vibrant space where identity is celebrated, innovation flourishes, and inclusivity is intricately woven into every fiber of its being.`;

async function seedAboutGabrielle() {
  console.log("🚀 Seeding About Gabrielle content...");

  const content = [
    { path: "/about-gabrielle", key: "title", value: "Meet Gabrielle" },
    { path: "/about-gabrielle", key: "subtitle", value: "Visionary & Founder" },
    { path: "/about-gabrielle", key: "body", value: ABOUT_GABRIELLE_TEXT },
    { path: "/about-gabrielle", key: "hero_video", value: "/videos/Gabrielle.mp4" }
  ];

  for (const item of content) {
    const { error } = await supabase
      .from("page_content")
      .upsert({
        page_path: item.path,
        content_key: item.key,
        content_type: "text",
        content_value: item.value
      }, { onConflict: "page_path, content_key" });

    if (error) {
      console.error(`❌ Error seeding ${item.path} ${item.key}:`, error);
    } else {
      console.log(`✅ Seeded ${item.path} ${item.key}`);
    }
  }

  console.log("✨ Seeding complete.");
  process.exit(0);
}

seedAboutGabrielle().catch(err => {
    console.error("🔥 Fatal error:", err);
    process.exit(1);
});
