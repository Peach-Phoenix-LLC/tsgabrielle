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

const LEGAL_DISCLAIMER_TEXT = `## COMPREHENSIVE LEGAL DISCLAIMER

**Effective Date:** February 21, 2026

This Comprehensive Legal Disclaimer (the "Disclaimer") governs your access to and use of the tsgabrielle® website, a digital property exclusively owned and operated by Peach Phoenix, LLC. (hereinafter referred to as "the Company," "we," "us," or "our"). By accessing, browsing, or utilizing this website in any capacity, you acknowledge that you have read, understood, and irrevocably agreed to be bound by the terms set forth herein.

---

### 1. General Information and Website Purpose

All content, materials, and media published on the tsgabrielle® website are provided strictly for general informational, educational, and entertainment purposes. While the Company endeavors to ensure that the information presented is reasonably accurate, current, and reliable, we make no representations, warranties, or guarantees of any kind, whether express or implied, regarding the absolute completeness, accuracy, reliability, suitability, or availability of the website's content, products, services, or related graphical elements for any purpose whatsoever. Any reliance you place on such information is strictly and entirely at your own risk.

### 2. Absence of Professional Advice

The information contained within this website is not intended to be a substitute for, nor does it constitute, formal professional advice. Absolutely nothing on this website establishes a fiduciary relationship or serves as professional legal, financial, medical, psychological, or business counsel. You are strongly advised to seek the independent counsel of a certified and qualified professional tailored to your specific circumstances before making any operational, financial, or personal decisions based on the content consumed on this platform.

### 3. Earnings, Results, and Testimonials Disclaimer

Any references to specific results, operational outcomes, or user testimonials featured on this website are provided strictly as illustrative examples and do not constitute a guarantee, warranty, or prediction regarding the outcome of any future endeavor. Individual results are highly subjective and will inherently vary based on a multitude of dynamic factors, including but not limited to individual effort, prior experience, market conditions, and numerous other variables that remain entirely outside of the Company's control.

### 4. Third-Party Links and External Resources

The tsgabrielle® website may contain outbound hyperlinks directing users to external, third-party websites or digital resources. The Company categorically disclaims any responsibility for the content, accuracy, privacy practices, or operational integrity of these independent entities. The inclusion of any external link within our digital infrastructure is provided solely as a convenience and does not imply, suggest, or constitute an endorsement, sponsorship, or formal approval by Peach Phoenix, LLC. of the external site or its operators.

### 5. Absolute Limitation of Liability

To the maximum extent permitted by applicable law, Peach Phoenix, LLC., its affiliates, officers, and employees shall not be held liable for any direct, indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of data, loss of revenue, or business interruption, arising directly or indirectly out of your access to, use of, or strict reliance upon any content, materials, or services provided on this website.

### 6. Official Contact Information

*   **Company Entity:** Peach Phoenix, LLC.
*   **Operating/Trading Name:** tsgabrielle®
*   **Email Communication:** contact@tsgabrielle.us
*   **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
*   **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
*   **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

const ACCESSIBILITY_STATEMENT_TEXT = `## DIGITAL ACCESSIBILITY STATEMENT

**Effective Date:** February 21, 2026

Peach Phoenix, LLC., operating under the registered trademark tsgabrielle®, is fundamentally committed to fostering an inclusive digital environment and ensuring comprehensive digital accessibility for all individuals, including those with visual, auditory, physical, speech, cognitive, and neurological disabilities. We continuously evaluate and enhance the user experience to ensure our digital infrastructure is universally navigable and compliant with established accessibility standards.

---

### 1. Our Formal Commitment to Accessibility

The Company is actively dedicated to designing, developing, and maintaining a website that conforms to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These internationally recognized guidelines provide a robust framework for making web content significantly more accessible and user-friendly for individuals with a diverse range of disabilities, thereby promoting equitable access to our digital storefront and informational resources.

### 2. Proactive Measures and Implementation

To actualize our commitment to digital inclusivity, Peach Phoenix, LLC. implements and maintains the following technical and structural measures across the tsgabrielle® website:

*   **Keyboard Navigation:** Ensuring the entirety of the website is fully operable and navigable utilizing standard keyboard interfaces.
*   **Screen Reader Optimization:** Optimizing website architecture for seamless compatibility with industry-standard screen reader technologies.
*   **Color Contrast Standards:** Applying rigorous color contrast ratios to all text and interactive elements to guarantee maximum readability for visually impaired users.
*   **Alternative Text:** Providing comprehensive, descriptive alternative text (alt-text) for all non-decorative imagery and multimedia elements.
*   **Seizure Prevention:** Strictly prohibiting the use of flashing, strobing, or rapidly altering content that possesses the potential to trigger seizures or cause physical discomfort.

### 3. Acknowledgment of Known Limitations

While the Company directs substantial resources toward achieving universal accessibility compliance, we acknowledge that the digital landscape is continuously evolving. Consequently, certain legacy content, third-party integrations, or newly deployed features may not yet fully satisfy all optimal accessibility standards. We are actively engaged in auditing our systems to identify and systematically rectify any remaining accessibility barriers.

### 4. Feedback Mechanism and Contact Protocol

We genuinely value the feedback of our users and view it as a critical component of our ongoing accessibility initiatives. Should you encounter any technical barriers, experience difficulty accessing specific content, or require materials to be presented in an alternative, accessible format, we strongly encourage you to contact our dedicated support team directly at **contact@tsgabrielle.us**. The Company is committed to acknowledging your request and actively working to provide a suitable resolution within five (5) business days.

### 5. Regulatory Enforcement and User Rights

The Company maintains a posture of total compliance and transparency. If you are not entirely satisfied with our response to an accessibility inquiry or feel that your concerns have not been adequately addressed, you retain the fundamental right to escalate the matter by contacting the relevant digital accessibility authority or regulatory body operating within your specific legal jurisdiction.

### 6. Official Contact Information

*   **Company Entity:** Peach Phoenix, LLC.
*   **Operating/Trading Name:** tsgabrielle®
*   **Email Communication:** contact@tsgabrielle.us
*   **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
*   **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
*   **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

async function seedAdditionalLegal() {
  console.log("🚀 Seeding Additional Legal Content...");

  const content = [
    { path: "/legal-disclaimer", key: "title", value: "Legal Disclaimer" },
    { path: "/legal-disclaimer", key: "body", value: LEGAL_DISCLAIMER_TEXT },
    { path: "/accessibility-statement", key: "title", value: "Accessibility Statement" },
    { path: "/accessibility-statement", key: "body", value: ACCESSIBILITY_STATEMENT_TEXT }
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

seedAdditionalLegal().catch(err => {
    console.error("🔥 Fatal error:", err);
    process.exit(1);
});
