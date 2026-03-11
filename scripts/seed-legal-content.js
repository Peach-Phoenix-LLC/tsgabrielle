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

const POLICIES = [
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    body: `At tsgabrielle®, we believe privacy is a fundamental right. Your trust is essential to our universe, and we are committed to protecting the personal data you share with us.

1. DATA COLLECTION
We only collect information necessary to provide you with a transcendent shopping experience. This includes your name, email, shipping address, and order history.

2. HOW WE USE YOUR DATA
We use your information to process orders, communicate updates, and personalize our services via Klaviyo. We never sell your data to third parties.

3. SECURITY
We implement industry-leading security measures to protect your information, utilizing Supabase's secure infrastructure and encrypted payment processing via PayPal.

4. YOUR RIGHTS
You have the right to access, correct, or delete your personal information at any time. Simply contact us at contact@tsgabrielle.us.

Updated: March 7, 2026`
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service",
    body: `Welcome to tsgabrielle®. By accessing our website, you agree to be bound by the following terms and conditions.

1. INTELLECTUAL PROPERTY
All content, designs, and trademarks including the tsgabrielle® name and logo are the exclusive property of Peach Phoenix, LLC.

2. USER CONDUCT
We expect our community to treat others with respect. Harassment or discriminatory behavior will not be tolerated and may result in account termination.

3. LIMITATION OF LIABILITY
tsgabrielle® shall not be liable for any indirect or consequential damages arising from the use of our services.

4. GOVERNING LAW
These terms are governed by the laws of the United States and the State of Arizona.

Updated: March 7, 2026`
  },
  {
    path: "/refund-policy",
    title: "Refund Policy",
    body: `We strive for excellence in every creation. If you are not completely satisfied with your purchase, we are here to help.

1. RETURNS
You have 30 days from the date of delivery to return an item. To be eligible, the item must be unused, in its original packaging, and in the same condition as received.

2. REFUNDS
Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. Approved refunds are processed to your original payment method.

3. PRINT-ON-DEMAND
As many of our products are created specifically for you via Printful, we only offer replacements for items that arrive damaged or defective.

4. SHIPPING COSTS
Return shipping costs are the responsibility of the customer unless the item arrived damaged.

Updated: March 7, 2026`
  },
  {
    path: "/shipping-policy",
    title: "Shipping Policy",
    body: `tsgabrielle® delivers luxury worldwide. We partner with leading carriers to ensure your items arrive safely and swiftly.

1. PROCESSING TIME
Orders are typically processed within 2-5 business days. You will receive a tracking number as soon as your order ships.

2. SHIPPING RATES
Rates are calculated at checkout based on destination and weight. We offer free worldwide shipping on orders over $150.

3. CUSTOMS AND DUTIES
International orders may be subject to import duties and taxes. These are the responsibility of the customer.

4. DELIVERY PARTNERS
We utilize Printful's global fulfillment network to minimize delivery times and environmental impact.

Updated: March 7, 2026`
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy",
    body: `We use cookies to enhance your journey through the tsgabrielle® universe.

1. WHAT ARE COOKIES?
Cookies are small files stored on your device that help us remember your preferences and improve site performance.

2. HOW WE USE THEM
We use analytical cookies (Google Analytics) to understand how you interact with our site and marketing cookies (Klaviyo) to provide relevant updates.

3. MANAGING COOKIES
You can disable cookies in your browser settings, though some features of our store may be affected.

4. CONSENT
By continuing to browse our site, you consent to our use of cookies as described in this policy.

Updated: March 7, 2026`
  }
];

async function seed() {
  console.log("Seeding legal content...");
  
  for (const policy of POLICIES) {
    const { error: titleErr } = await supabase
      .from("page_content")
      .upsert({
        page_path: policy.path,
        content_key: "title",
        content_type: "text",
        content_value: policy.title
      }, { onConflict: "page_path, content_key" });

    if (titleErr) console.error(`Error upserting title for ${policy.path}:`, titleErr);

    const { error: bodyErr } = await supabase
      .from("page_content")
      .upsert({
        page_path: policy.path,
        content_key: "body",
        content_type: "text",
        content_value: policy.body
      }, { onConflict: "page_path, content_key" });

    if (bodyErr) console.error(`Error upserting body for ${policy.path}:`, bodyErr);
    
    console.log(`✅ Seeded ${policy.path}`);
  }
  
  console.log("Done.");
}

seed().catch(console.error);
