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

const COPYRIGHT_NOTICE_TEXT = `## COPYRIGHT AND TRADEMARK NOTICE

**Effective Date:** February 21, 2026

**© 2026 tsgabrielle® — All Rights Reserved.**

This Comprehensive Copyright and Trademark Notice (the "Notice") serves as a formal, legally binding declaration of the intellectual property rights exclusively held by Peach Phoenix, LLC. (hereinafter referred to as "the Company," "we," "us," or "our"), operating under the registered trading name tsgabrielle®.

---

### 1. Explicit Declaration of Copyright Ownership

All content, structural architecture, and operational media published, displayed, or otherwise made accessible on this website—including, but strictly not limited to, all written text, editorial content, custom graphics, user interfaces, visual interfaces, high-resolution photographs, digital illustrations, audio clips, video recordings, proprietary software code, and the overarching design, structure, selection, coordination, expression, and arrangement of such content—is the exclusive, proprietary property of tsgabrielle® and Peach Phoenix, LLC.

This collective body of work is comprehensively protected under the United States Copyright Act (Title 17 of the United States Code), alongside all applicable international copyright treaties, conventions, and other fundamental intellectual property laws.

### 2. Registered Trademark and Trade Dress Protection

The tsgabrielle® brand identity is a fiercely protected corporate asset. The tsgabrielle® name, primary corporate logos, secondary marks, slogans, service marks, trade names, and the distinctive visual trade dress associated with all tsgabrielle® products, digital services, and packaging are the legally registered, exclusive trademarks of Peach Phoenix, LLC.

Our intellectual property portfolio operates under the explicit legal protection of the United States Patent and Trademark Office (**USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310**). Any unauthorized, deceptive, or confusingly similar use of any tsgabrielle® trademark, logo, or brand identity element is strictly and unequivocally prohibited. Such unauthorized utilization constitutes actionable trademark infringement, trademark dilution, and unfair competition, subjecting the offending party to severe civil liability and potential criminal prosecution under applicable United States federal law and international statutes.

### 3. Strict Prohibition of Unauthorized Use and Exploitation

Peach Phoenix, LLC. grants users a limited, non-exclusive, non-transferable, and revocable license to access the website for personal, non-commercial use only. Outside of this strictly defined scope, you are expressly prohibited from engaging in any of the following actions without the prior, explicit, formally executed written permission of an authorized corporate officer of Peach Phoenix, LLC.:

*   **Reproduction**: Copying, reproducing, or duplicating any website content in any physical or digital medium.
*   **Distribution**: Distributing, broadcasting, publishing, or publicly displaying any proprietary text, media, or design elements.
*   **Derivatives**: Modifying, altering, reverse-engineering, or creating derivative works based upon any portion of the website's content or underlying architecture.
*   **Commercial Exploitation**: Commercially exploiting, monetizing, or utilizing the content to train artificial intelligence models, data-mining algorithms, or automated scraping tools.

### 4. Third-Party Intellectual Property and Non-Endorsement

The Company acknowledges the intellectual property rights of external entities. All other independent trademarks, corporate logos, and brand names referenced, displayed, or mentioned on this website that are not explicitly owned or licensed by Peach Phoenix, LLC. remain the exclusive property of their respective owners.

The incidental reference to any third-party products, digital services, proprietary processes, or corporate organizations by trade name, trademark, manufacturer, or otherwise, does not necessarily constitute or formally imply any endorsement, sponsorship, or recommendation by tsgabrielle® or Peach Phoenix, LLC.

### 5. Official Contact Information and Legal Identifiers

For formal requests regarding licensing, usage permissions, or intellectual property inquiries, please direct all communications to our designated corporate channels:

*   **Company Entity:** Peach Phoenix, LLC.
*   **Operating/Trading Name:** tsgabrielle®
*   **Email Communication:** contact@tsgabrielle.us
*   **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
*   **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
*   **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

async function seedCopyrightTrademark() {
  console.log("🚀 Seeding Copyright and Trademark Notice...");

  const content = [
    { path: "/copyright-trademark", key: "title", value: "Copyright and Trademark Notice" },
    { path: "/copyright-trademark", key: "body", value: COPYRIGHT_NOTICE_TEXT }
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

seedCopyrightTrademark().catch(err => {
    console.error("🔥 Fatal error:", err);
    process.exit(1);
});
