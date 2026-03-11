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

const COOKIE_POLICY_TEXT = `## COMPREHENSIVE COOKIE POLICY

**Effective Date:** February 21, 2026

This Comprehensive Cookie Policy (the "Policy") delineates the manner in which tsgabrielle®, operated exclusively by Peach Phoenix, LLC. (hereinafter referred to as "the Company," "we," "us," or "our"), utilizes cookies, web beacons, tracking pixels, and other analogous tracking technologies across our digital infrastructure. By accessing and navigating our website, you expressly acknowledge and consent to the data collection practices described within this Policy.

---

### 1. Definition and Function of Cookies

Cookies are small, encrypted text files that are deployed to and stored upon your designated device (e.g., computer, smartphone, or tablet) by your web browser when you access a digital property. These files function as an identification mechanism, allowing the website to recognize your device upon subsequent visits. They are universally employed across the digital landscape to facilitate efficient website operation, enhance user experience, and seamlessly transmit essential analytical data back to the website administrators.

### 2. Categorization of Utilized Cookies

To ensure full transparency regarding our data operations, we classify the cookies deployed on our website into the following distinct categories:

* **Strictly Necessary (Essential) Cookies:** These cookies are architecturally indispensable for the fundamental operation and security of the website. They facilitate core functionalities such as network management, page navigation, and secure area access. Because the website cannot function optimally without them, these cookies cannot be systematically disabled through our primary systems.
* **Analytical and Performance Cookies:** These tracking mechanisms allow the Company to recognize and quantify the volume of total visitors, as well as to observe how users navigate the website's infrastructure. By utilizing industry-standard tools, such as Google Analytics, we aggregate this data to objectively measure operational performance, rectify architectural bottlenecks, and optimize the overall user journey.
* **Functional and Preference Cookies:** These cookies enable the website to recall explicit choices you have previously made (such as your preferred language, region, or customized display settings). By retaining these localized preferences, the website can deliver a highly personalized and expedited browsing experience.
* **Targeting and Advertising (Marketing) Cookies:** These cookies may be implemented through our website by authorized advertising partners. They uniquely identify your browser and internet device to systematically build a comprehensive profile of your documented interests. This data is subsequently utilized to deliver highly relevant and targeted promotional content to you across external third-party domains.

### 3. Third-Party Cookies and Embedded Content

Our digital properties frequently integrate embedded content and functional APIs from established third-party platforms, including but not limited to YouTube, Instagram, TikTok, Facebook, X, Pinterest, LinkedIn, and Snapchat. When you interact with this integrated content, these external entities may autonomously deploy their own respective cookies onto your device.

The Company exercises zero operational jurisdiction or administrative control over the generation, deployment, or management of these third-party cookies. We strongly advise users to independently consult the official privacy and cookie policies of these respective platforms to comprehend their specific data processing methodologies.

### 4. User Control, Management, and Disabling of Cookies

You retain the ultimate authority to dictate, manage, restrict, or outright delete cookies at your sole discretion utilizing your web browser's overarching security settings. While you possess the technical capability to systematically reject all cookies, you are hereby advised that disabling Strictly Necessary or Functional cookies may severely degrade the website's performance and render certain secure features entirely inaccessible.

Furthermore, if you wish to specifically preclude your data from being aggregated and utilized by Google Analytics across all websites, you may install the official Google Analytics Opt-out Browser Add-on, securely available at: **[tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)**.

### 5. Modifications and Amendments to This Policy

The Company reserves the unilateral right to amend, revise, or fundamentally restructure this Cookie Policy at any time and at its sole discretion, ensuring ongoing compliance with evolving legal frameworks and technological standards. Any formalized modifications will be immediately published to this specific web page and appended with an updated "Effective Date." Continued utilization of the website following such publications constitutes your legally binding acceptance of the revised Policy.

### 6. Official Contact Information

For any formal inquiries, technical clarifications, or compliance-related questions regarding this Policy, please direct your communications to our official corporate channels:

* **Company Entity:** Peach Phoenix, LLC.
* **Operating/Trading Name:** tsgabrielle®
* **Email Communication:** contact@tsgabrielle.us
* **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
* **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
* **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

async function updateCookiePolicy() {
  console.log("🚀 Starting Cookie Policy update...");

  try {
    const { data, error } = await supabase
      .from("page_content")
      .upsert({
        page_path: "/cookie-policy",
        content_key: "body",
        content_type: "text",
        content_value: COOKIE_POLICY_TEXT
      }, { onConflict: "page_path, content_key" });

    if (error) {
      console.error("❌ Error updating Cookie Policy body:", error);
      process.exit(1);
    } 
    
    console.log("✅ Body updated.");

    const { error: titleError } = await supabase
      .from("page_content")
      .upsert({
        page_path: "/cookie-policy",
        content_key: "title",
        content_type: "text",
        content_value: "Cookie Policy"
      }, { onConflict: "page_path, content_key" });

    if (titleError) {
      console.error("❌ Error updating title:", titleError);
      process.exit(1);
    }
    
    console.log("✅ Title updated.");
    console.log("✨ Update complete. Exiting...");
    process.exit(0);
  } catch (err) {
    console.error("💥 Fatal error during update:", err);
    process.exit(1);
  }
}

updateCookiePolicy().catch(err => {
  console.error("🔥 Global error:", err);
  process.exit(1);
});
