import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const PRIVACY_POLICY_TEXT = `## PRIVACY POLICY

**Last Updated:** March 7, 2026
**Effective Date:** February 21, 2026

This Privacy Policy describes how tsgabrielle®, operated by Peach Phoenix, LLC. ("we," "us," or "our"), collects, uses, and discloses your personal information. tsgabrielle® is a registered trademark of Peach Phoenix, LLC. (USPTO Reg. No. 7,924,799).

We are committed to protecting your privacy in accordance with the California Consumer Privacy Act (CCPA), the California Privacy Rights Act (CPRA), and other applicable US state privacy laws.

---

### 1. Notice at Collection: Categories of Information We Collect

In the past 12 months, we have collected the following categories of personal information as defined by California law:

*   **Identifiers**: Name, alias, email, IP address, unique personal identifier (via GitHub/Supabase).
*   **Commercial Information**: Records of products purchased, obtained, or considered; payment confirmation (via PayPal).
*   **Internet/Network Activity**: Browsing history, search history, and interactions with our website (via Vercel/Google).
*   **Geolocation Data**: General location based on IP address.
*   **Sensitive Personal Info**: Account log-in credentials for your tsgabrielle® account.

### 2. Our Use of Third-Party Service Providers

We utilize industry-leading US-based infrastructure to ensure your data is processed securely. Each provider acts as a "Service Provider" or "Contractor" under the CCPA:
- **Hosting & Deployment (Vercel)**: Processes network traffic and site usage data.
- **Database & Authentication (Supabase)**: Securely stores your profile data.
- **Payment Processing (PayPal)**: Processes all financial transactions securely.
- **Analytics & Marketing (Google)**: Helps us understand site traffic and optimize performance.

### 3. California Privacy Rights (CCPA/CPRA)

If you are a California resident, you have the following expanded rights:

*   **Right to Know and Access**: Request disclosure of what personal information we collect and share.
*   **Right to Delete**: Request deletion of personal information, subject to legal exceptions.
*   **Right to Correct**: Request correction of inaccurate personal information.
*   **Right to Opt-Out**: Opt-out of the "sharing" of information for targeted advertising.
*   **Right to Non-Discrimination**: We will not discriminate against you for exercising your rights.

### 4. Data Retention and Security

We retain your information for as long as necessary to fulfill business objectives or comply with legal obligations. Account data is retained as long as your account is active, and transaction records are kept for 7 years for tax compliance.

### 5. Official Contact Information

To exercise your rights, please contact us:
- **Email**: contact@tsgabrielle.us
- **Address**: 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States

**Peach Phoenix, LLC.**
EIN: 37-2084706 | AZ ID: 21533137
Trademark: USPTO Reg. No. 7,924,799`;

async function updatePrivacyPolicy() {
  console.log("Updating Privacy Policy with user provided text...");
  
  const { error } = await supabase
    .from("page_content")
    .upsert({
      page_path: "/privacy-policy",
      content_key: "body",
      content_type: "text",
      content_value: PRIVACY_POLICY_TEXT
    }, { onConflict: "page_path, content_key" });

  if (error) {
    console.error("Error updating Privacy Policy:", error);
  } else {
    console.log("✅ Privacy Policy updated successfully.");
  }
}

updatePrivacyPolicy().catch(console.error);
