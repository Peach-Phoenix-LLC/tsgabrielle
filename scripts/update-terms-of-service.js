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

const TERMS_OF_SERVICE_TEXT = `## TERMS OF SERVICE AGREEMENT

**Effective Date:** February 21, 2026

This Terms of Service Agreement (the "Agreement") constitutes a legally binding contract entered into by and between Peach Phoenix, LLC., operating under the registered trademark tsgabrielle® (hereinafter referred to as "the Company," "we," "us," or "our"), and you, whether personally or on behalf of an entity (hereinafter referred to as "the User," "you," or "your"). This Agreement governs your access to and use of the tsgabrielle® website, as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto (collectively, the "Website").

By accessing or utilizing the Website in any capacity, you expressly acknowledge that you have read, comprehended, and unequivocally agree to be bound by all of the terms and conditions stipulated within this Agreement. If you do not agree with any or all of these terms, you are expressly prohibited from using the Website and must discontinue your use immediately.

---

### 1. Acceptance of Terms and Capacity

By accessing the Website, you represent and warrant that you are at least eighteen (18) years of age and possess the legal capacity and authority to form a binding contract under applicable law. If you are accessing or using the Website on behalf of a corporation, partnership, or other legal entity, you represent and warrant that you are an authorized representative of that entity with the authority to bind such entity to the terms, conditions, obligations, affirmations, representations, and warranties set forth in this Agreement.

### 2. Permitted Use and Prohibited Conduct

You agree to use the Website strictly for lawful purposes and in accordance with this Agreement. You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Website strictly for your personal, non-commercial use.

You expressly agree not to engage in any of the following prohibited activities:

* Introducing viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.
* Attempting to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website.
* Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by the Company, may harm the Company or users of the Website, or expose them to liability.
* Using the Website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Website.

### 3. Intellectual Property Rights

The Website and its entire contents, features, and functionality—including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof—are owned exclusively by Peach Phoenix, LLC. and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.

The tsgabrielle® name, the associated logos, and all related product and service names, designs, and slogans are the registered trademarks of Peach Phoenix, LLC. (**USPTO Reg. No. 7,924,799, Ser. No. 98-580,310**). You shall not use such marks without the prior written permission of the Company. You are strictly prohibited from reproducing, distributing, modifying, creating derivative works of, publicly displaying, publicly performing, republishing, downloading, storing, or transmitting any of the material on our Website without our express, prior written consent.

### 4. User Account Registration and Security

Should you elect or be required to register for an account on the Website, you agree to provide accurate, current, and complete information during the registration process. You are solely and absolutely responsible for maintaining the confidentiality of your account credentials, including your password, and for any and all activities that occur under your account.

You agree to notify the Company immediately of any unauthorized access to or use of your user name or password or any other breach of security. We reserve the right to disable, suspend, or terminate any user account or password, at any time in our sole discretion, for any or no reason, including if, in our opinion, you have violated any provision of this Agreement.

### 5. Purchases, Payments, and Financial Transactions

All purchases and financial transactions initiated through the Website are governed by our Refund Policy, which is incorporated herein by reference. We reserve the unilateral right to refuse, limit, or cancel any order placed with us at our sole discretion.

Prices for our products and services are subject to change without prior notice. The Company shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of products or services. Full and cleared payment must be received by the Company prior to the delivery or provision of any product or service.

### 6. Disclaimer of Warranties

THE WEBSITE, AND ALL CONTENT, MATERIALS, PRODUCTS, AND SERVICES AVAILABLE THROUGH THE WEBSITE, ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PEACH PHOENIX, LLC. EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.

WE MAKE NO WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE. WE DO NOT WARRANT THAT THE WEBSITE WILL OPERATE UNINTERRUPTED OR IN A BUG-FREE OR ERROR-FREE MANNER, OR THAT THE SERVER THAT MAKES IT AVAILABLE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.

### 7. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PEACH PHOENIX, LLC., ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, THIS WEBSITE, ITS CONTENT, OR ANY PRODUCTS OR SERVICES PROCURED THROUGH THE WEBSITE, REGARDLESS OF WHETHER SUCH LIABILITY IS BASED IN TORT, CONTRACT, STRICT LIABILITY, OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### 8. Third-Party Links and Resources

The Website may contain links to independent third-party websites or resources. These links are provided solely as a convenience to our users and do not imply an endorsement by the Company of the contents, operators, or business practices of such third-party platforms. We exercise no control over these external websites and accept no responsibility or liability for their content, policies, or for any loss or damage that may accrue from your use of them. Accessing any third-party links is done entirely at your own risk.

### 9. Modifications and Amendments to the Terms

We reserve the right, at our sole discretion, to revise, update, or otherwise modify this Agreement at any time. All changes are effective immediately upon being posted to the Website and apply to all access to and use of the Website thereafter. Your continued use of the Website following the posting of the revised Agreement constitutes your full and unconditional acceptance of and agreement to the changes. You are expected to check this page periodically so you are aware of any changes, as they are binding on you.

### 10. Governing Law and Jurisdiction

All matters relating to the Website and this Agreement, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed strictly in accordance with the internal laws of the State of Arizona, without giving effect to any choice or conflict of law provision or rule. Peach Phoenix, LLC. operates under the jurisdiction of Arizona, maintaining registration under EIN: **US 37-2084706** and AZ License: **21533137**.

### 11. Official Contact Information

If you have any questions, concerns, or formal notices regarding this Agreement, please contact us utilizing the following official corporate information:

* **Company Entity:** Peach Phoenix, LLC.
* **Operating/Trading Name:** tsgabrielle®
* **Corporate Address:** 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States
* **Email Communication:** contact@tsgabrielle.us
* **Trademark Registration Data:** USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310
* **Tax/Entity Identifiers:** EIN US 37-2084706 | AZ 21533137`;

async function updateTermsOfService() {
  console.log("Updating Terms of Service in Supabase...");

  const { error } = await supabase
    .from("page_content")
    .upsert({
      page_path: "/terms-of-service",
      content_key: "body",
      content_type: "text",
      content_value: TERMS_OF_SERVICE_TEXT
    }, { onConflict: "page_path, content_key" });

  if (error) {
    console.error("Error updating Terms of Service:", error);
  } else {
    console.log("✅ Terms of Service updated successfully.");
    
    // Also update the title for consistency
    const { error: titleError } = await supabase
      .from("page_content")
      .upsert({
        page_path: "/terms-of-service",
        content_key: "title",
        content_type: "text",
        content_value: "Terms of Service"
      }, { onConflict: "page_path, content_key" });
      
    if (titleError) console.error("Error updating title:", titleError);
  }
}

updateTermsOfService().catch(console.error);
