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

const PRIVACY_POLICY_TEXT = `PRIVACY POLICY
Last Updated: March 7, 2026
Effective Date: February 21, 2026

This Privacy Policy describes how tsgabrielle®, operated by Peach Phoenix, LLC. ("we," "us," or "our"), collects, uses, and discloses your personal information. tsgabrielle® is a registered trademark of Peach Phoenix, LLC. (USPTO Reg. No. 7,924,799).

We are committed to protecting your privacy in accordance with the California Consumer Privacy Act (CCPA), the California Privacy Rights Act (CPRA), and other applicable US state privacy laws.

1. Notice at Collection: Categories of Information We Collect
In the past 12 months, we have collected the following categories of personal information as defined by California law:

Category: Identifiers
Examples: Name, alias, email, IP address, unique personal identifier (via GitHub/Supabase).
Purpose: Account creation, security, and communication.

Category: Commercial Information
Examples: Records of products purchased, obtained, or considered; payment confirmation (via PayPal).
Purpose: Order fulfillment and business analytics.

Category: Internet/Network Activity
Examples: Browsing history, search history, and interactions with our website (via Vercel/Google).
Purpose: Website optimization and performance monitoring.

Category: Geolocation Data
Examples: General location based on IP address.
Purpose: Fraud prevention and regional marketing.

Category: Sensitive Personal Info
Examples: Account log-in credentials for your tsgabrielle® account.
Purpose: Maintaining account access and security.

2. Our Use of Third-Party Service Providers
We utilize industry-leading US-based infrastructure to ensure your data is processed securely. Each provider acts as a "Service Provider" or "Contractor" under the CCPA:
- Hosting & Deployment (Vercel): Processes network traffic and site usage data to deliver our dynamic web application.
- Database & Authentication (Supabase): Securely stores your profile data and manages login credentials.
- Payment Processing (PayPal): Processes all financial transactions. We do not store full credit card numbers; PayPal provides us with transaction tokens and billing details only.
- Development & Integration (GitHub): Used for version control and potential OAuth integrations for developer-related account access.
- Analytics & Marketing (Google): We use Google Analytics to understand site traffic and Google Cloud services for high-scale processing.

3. California Privacy Rights (CCPA/CPRA)
If you are a California resident, you have the following expanded rights:

A. Right to Know and Access
You have the right to request that we disclose what personal information we collect, use, disclose, and "sell" or "share." You may request this information for any data collected since January 1, 2022.

B. Right to Delete
You may request the deletion of personal information we have collected from you, subject to legal exceptions (e.g., if we need the data to complete a transaction, detect security incidents, or comply with tax laws regarding EIN US 37-2084706).

C. Right to Correct
You have the right to request that we correct inaccurate personal information that we maintain about you.

D. Right to Opt-Out of Sale or Sharing
tsgabrielle® does not sell your personal information for money. However, "sharing" for cross-context behavioral advertising (e.g., using Google Analytics for retargeting) may be considered a "share" under California law. You may opt-out by clicking our "Do Not Sell or Share My Personal Information" link in the footer.

E. Right to Limit Use of Sensitive Personal Information
We only use sensitive personal information (like login credentials) to provide our services. We do not use it to infer characteristics about you.

F. Right to Non-Discrimination
We will not discriminate against you (e.g., by changing prices or denying service) for exercising any of these rights.

4. Data Retention and Security
We retain your information for as long as necessary to fulfill the "Year of Synthesis" business objectives or to comply with legal obligations.
- Account Data: Retained as long as your account is active in Supabase.
- Transaction Records: Retained for 7 years to comply with US tax and accounting regulations.
- Security: We leverage Vercel's edge security and Supabase's encrypted storage to protect your data. However, no internet transmission is 100% secure.

5. Children’s Privacy
We do not knowingly collect or "share" the personal information of consumers under 16 years of age. If we become aware that a child under 13 has provided us with personal information, we will delete it immediately.

6. Global Privacy Control (GPC)
Our website is configured to recognize and honor Global Privacy Control (GPC) signals. If your browser sends a GPC signal, we will automatically treat it as a request to opt-out of the "sharing" of your information for targeted advertising.

7. Contact and Requests
To exercise your rights, please submit a "Verifiable Consumer Request" to us:
Email: contact@tsgabrielle.us
Mailing Address: 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
Authorized Agents: You may designate an authorized agent to make a request on your behalf. We will require proof of your written permission and verify your identity directly.

Peach Phoenix, LLC.
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
