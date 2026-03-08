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

const REFUND_POLICY_TEXT = `## REFUND AND CANCELLATION POLICY

**Effective Date:** February 21, 2026

At tsgabrielle®, operated under the exclusive ownership of Peach Phoenix, LLC. (hereinafter referred to as "the Company," "we," "us," or "our"), we are steadfastly committed to client satisfaction and operational excellence. Please review this comprehensive Refund and Cancellation Policy (the "Policy") carefully and in its entirety prior to initiating any transaction. By finalizing a purchase, you acknowledge and agree to be bound by the stipulations outlined herein.

---

### 1. Digital Products and Digital Services

Due to the immediate, easily replicable, and inherently intangible nature of digital products and services, all sales are considered final and non-reversible upon the completion of delivery or the granting of access. The Company explicitly does not offer refunds, exchanges, or credits for digital downloads, templates, presets, or any instantly accessible digital content. Exceptions to this strict no-refund policy shall only be considered in isolated instances where the digital product is demonstrably defective or materially diverges from its provided description.

### 2. Tangible Physical Products

In the event that you receive a physical product that is materially damaged, categorically defective, or incorrect based on your original order specifications, you must initiate a formal claim by contacting us within thirty (30) calendar days from the date of confirmed delivery.

Upon receipt of your claim, the Company will conduct a thorough review of your request. If the claim is approved, the Company reserves the right, at its sole and absolute discretion, to offer a replacement, issue store credit, or process a monetary refund. To maintain eligibility for a return and subsequent remedy, all physical items must remain entirely unused, unaltered, and retained within their original, undamaged packaging.

### 3. Professional Services

Requests for refunds pertaining to professional services are subjected to a rigorous, case-by-case evaluation process. Should you find yourself unsatisfied with a rendered service, you are required to submit a formal notice of dissatisfaction to the Company within seven (7) calendar days of the service delivery date.

The Company commits to working collaboratively with you to achieve a fair and equitable resolution. However, it is the strict policy of Peach Phoenix, LLC. that professional services which have been fully rendered and executed by our team are generally not eligible for financial reimbursement, given the unrecoverable nature of the time and labor expended.

### 4. Subscription Plans and Recurring Billing

Users enrolled in recurring subscription plans retain the right to cancel their subscription at any time. Notice of cancellation will be processed and take full effect strictly at the conclusion of the user's current, active billing cycle. The Company does not authorize or issue prorated or partial refunds for any unused time remaining within an active billing period, except in circumstances where such refunds are expressly mandated by applicable governing law.

### 5. Official Refund Request Procedure

To formally petition for a refund or return under the eligible conditions outlined above, you must submit a written request via email to **contact@tsgabrielle.us**. Your formal request must comprehensively include the following information:

* Your official order or invoice number.
* A detailed, written explanation of the exact reason for your request.
* Verifiable supporting documentation, such as clear, high-resolution photographs of any damaged or defective items.

The Company will process the initial submission and provide a formal written response regarding the status of your claim within five (5) business days.

### 6. Processing Timeframes for Approved Claims

In the event that a refund request is formally approved by the Company, the authorized funds will be processed and initiated within seven (7) to ten (10) business days. All monetary refunds will be credited strictly back to the original payment method utilized for the initial transaction. Please be advised that the final posting of funds to your account may be subject to additional processing times dictated by your specific banking institution or third-party payment provider.

### 7. Non-Refundable Items and Exemptions

For the avoidance of doubt, the following categories of products and services are strictly designated as non-refundable under any circumstance:

* Gift cards, gift certificates, or promotional credits.
* Downloadable software, digital files, or digital assets once access has been logged or the file has been downloaded.
* Any professional services that have been fully rendered, executed, or completed by the Company.

### 8. Official Contact Information

For any formal inquiries, claims, or communications regarding this Policy, please utilize the following corporate contact details:

* **Company Entity:** Peach Phoenix, LLC.
* **Operating/Trading Name:** tsgabrielle®
* **Email Communication:** contact@tsgabrielle.us
* **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ  AZ 85016, United States
* **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
* **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

async function updateRefundPolicy() {
  console.log("Updating Refund and Cancellation Policy in Supabase...");

  const { error } = await supabase
    .from("page_content")
    .upsert({
      page_path: "/refund-policy",
      content_key: "body",
      content_type: "text",
      content_value: REFUND_POLICY_TEXT
    }, { onConflict: "page_path, content_key" });

  if (error) {
    console.error("Error updating Refund Policy:", error);
  } else {
    console.log("✅ Refund and Cancellation Policy updated successfully.");
    
    // Also update the title for consistency
    const { error: titleError } = await supabase
      .from("page_content")
      .upsert({
        page_path: "/refund-policy",
        content_key: "title",
        content_type: "text",
        content_value: "Refund and Cancellation Policy"
      }, { onConflict: "page_path, content_key" });
      
    if (titleError) console.error("Error updating title:", titleError);
  }
}

updateRefundPolicy().catch(console.error);
