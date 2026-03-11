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

const COMMUNITY_GUIDELINES_TEXT = `## COMPREHENSIVE COMMUNITY GUIDELINES

**Effective Date:** February 21, 2026

At tsgabrielle®, operated under the exclusive ownership of Peach Phoenix, LLC. (hereinafter referred to as "the Company," "we," "us," or "our"), we are fundamentally committed to cultivating and maintaining a respectful, inclusive, and positive digital ecosystem. These Comprehensive Community Guidelines (the "Guidelines") govern all user interactions, communications, and engagements with our brand across our primary website and all officially managed social media platforms, including but not limited to Facebook, Instagram, X, YouTube, TikTok, Pinterest, LinkedIn, and Snapchat.

By engaging with our digital properties, you expressly agree to adhere to the standards set forth below.

---

### 1. Standards of Respect and Decorum

We mandate that all individuals treat one another with the utmost kindness, dignity, and respect. The Company maintains a strict zero-tolerance policy regarding harassment, bullying, hate speech, discriminatory remarks, or personal attacks of any nature. Any conduct that targets, marginalizes, or belittles an individual or group based on race, ethnicity, gender identity, sexual orientation, religious affiliation, or disability is strictly prohibited and will be addressed immediately.

### 2. Relevance and Content Integrity

To ensure our community spaces remain valuable and constructive for all participants, we require that all comments, direct messages, and public interactions remain contextually relevant to the specific topic or published content. The dissemination of spam, unsolicited off-topic promotions, automated bot activity, or intentionally repetitive content disrupts the user experience and will be promptly removed from our platforms without prior notification.

### 3. Prohibition of Harmful and Deceptive Material

The Company strictly forbids the sharing, posting, or transmission of any content that is violent, sexually explicit, graphically disturbing, or inherently threatening. Furthermore, users must not disseminate deliberate misinformation, fraudulent links, or any content systematically designed to deceive, manipulate, or exploit other members of the tsgabrielle® community.

### 4. Protection of Intellectual Property Rights

We staunchly defend the intellectual property rights of creators and expect our community to do the same. Users are expressly prohibited from sharing, redistributing, or reproducing content that belongs to third parties without securing proper, documented permission or providing appropriate legal credit. This restriction applies comprehensively to all forms of media, including copyrighted music, proprietary photographs, video assets, and published written content.

### 5. Restriction on Unauthorized Solicitations

Our community platforms are not to be utilized as secondary marketplaces or unauthorized advertising spaces. The posting of unsolicited advertisements, personal affiliate links, third-party promotional material, or multi-level marketing solicitations without the prior, explicit written authorization of Peach Phoenix, LLC. is strictly forbidden and subject to immediate deletion.

### 6. Enforcement Mechanisms and Disciplinary Actions

Peach Phoenix, LLC. reserves the absolute and unilateral right to moderate its digital spaces. We retain the authority to permanently remove any content that violates these Guidelines and to restrict, suspend, or permanently ban users who exhibit a pattern of non-compliance, entirely at our discretion and without prior notice. Severe or repeated violations will definitively result in a permanent expulsion from all tsgabrielle® community spaces and platforms.

### 7. Official Contact Information

* **Company Entity:** Peach Phoenix, LLC.
* **Operating/Trading Name:** tsgabrielle®
* **Email Communication:** contact@tsgabrielle.us
* **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
* **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
* **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

const AFFILIATE_DISCLOSURE_TEXT = `## FORMAL AFFILIATE DISCLOSURE STATEMENT

**Effective Date:** February 21, 2026

In the interest of total operational transparency and to ensure full compliance with regulatory standards, tsgabrielle®, operated exclusively by Peach Phoenix, LLC. (hereinafter referred to as "the Company," "we," "us," or "our"), hereby provides this Formal Affiliate Disclosure Statement. This document clearly outlines our participation in various affiliate marketing programs and the nature of the financial relationships we maintain with third-party vendors and service providers.

---

### 1. Mechanics of Affiliate Marketing and Commissions

Certain outbound hyperlinks embedded within the tsgabrielle® website and across our official digital platforms are classified as affiliate links. This signifies that if you choose to click on one of these designated links and subsequently finalize a purchase or register for a service, Peach Phoenix, LLC. may earn a financial commission or referral fee directly from the partnered retailer.

Please be explicitly aware that this commission is paid entirely by the third-party vendor; utilizing our affiliate links incurs absolutely **no additional cost to you**. The revenue generated through these partnerships is instrumental in supporting the operational infrastructure of tsgabrielle®, allowing us to continuously deliver high-quality content, services, and digital experiences to our audience.

### 2. Editorial Independence and Unbiased Recommendations

The Company operates under a strict code of editorial integrity. We categorically commit to endorsing and recommending only those products, services, and digital tools that we have thoroughly vetted, genuinely believe in, and confidently determine will provide tangible value to our audience. The presence of an affiliate relationship or the potential for financial compensation does not dictate, alter, or influence our independent evaluations. Our professional opinions, reviews, and endorsements remain entirely our own.

### 3. Engagement with Third-Party Affiliate Networks

The affiliate marketing programs in which the Company participates may include, but are not strictly limited to, established networks such as Amazon Associates, ShareASale, and select direct brand partnerships. Each independent network and third-party vendor operates under its own distinct privacy policies, cookie directives, and data collection frameworks. We strongly advise our users to independently review the legal documentation of these external platforms to fully understand their respective operational practices.

### 4. Strict Compliance with Federal Trade Commission (FTC) Regulations

This formalized disclosure is proactively published in strict accordance with the regulations set forth by the United States Federal Trade Commission (FTC), specifically the *Guides Concerning the Use of Endorsements and Testimonials in Advertising* (codified at **16 C.F.R. Part 255**). Peach Phoenix, LLC. takes its regulatory obligations seriously and guarantees that any financial, employment, personal, or familial relationship that could materially affect the weight or credibility of an endorsement will be clearly and conspicuously disclosed to our users.

### 5. Official Contact Information

* **Company Entity:** Peach Phoenix, LLC.
* **Operating/Trading Name:** tsgabrielle®
* **Email Communication:** contact@tsgabrielle.us
* **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
* **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
* **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

async function seedGuidelines() {
  console.log("🚀 Seeding more legal content...");

  const content = [
    { path: "/community-guidelines", key: "title", value: "Community Guidelines" },
    { path: "/community-guidelines", key: "body", value: COMMUNITY_GUIDELINES_TEXT },
    { path: "/affiliate-disclosure", key: "title", value: "Affiliate Disclosure" },
    { path: "/affiliate-disclosure", key: "body", value: AFFILIATE_DISCLOSURE_TEXT }
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

seedGuidelines().catch(err => {
    console.error("🔥 Fatal error:", err);
    process.exit(1);
});
