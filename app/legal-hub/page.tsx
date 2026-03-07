import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Legal Policies & Disclosures",
  description: "Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, and all legal disclosures for tsgabrielle® operated by Peach Phoenix, LLC.",
  path: "/legal-hub"
});

const ContactBlock = () => (
  <div className="mt-4 space-y-1 text-base">
    <p><strong>Company:</strong> Peach Phoenix, LLC.</p>
    <p><strong>Trading Name:</strong> tsgabrielle®</p>
    <p><strong>Email:</strong> <a href="mailto:contact@tsgabrielle.us" className="text-[#a932bd] underline">contact@tsgabrielle.us</a></p>
    <p><strong>Address:</strong> 1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States</p>
    <p><strong>Trademark Registration:</strong> USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310</p>
    <p><strong>Tax Identifiers:</strong> EIN US 37-2084706 | AZ 21533137</p>
  </div>
);

const legalBody = (
  <div className="space-y-12 text-[#555555] text-base leading-relaxed">

    {/* Header */}
    <div className="text-center space-y-2 border-b border-gray-200 pb-8">
      <p className="font-semibold text-[#111111]">tsgabrielle®</p>
      <p>Operated by Peach Phoenix, LLC.</p>
      <p>1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, United States</p>
      <p><a href="mailto:contact@tsgabrielle.us" className="text-[#a932bd] underline">contact@tsgabrielle.us</a></p>
      <p className="italic">USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310</p>
      <p className="font-semibold text-[#111111] mt-4">Legal Policies &amp; Disclosures</p>
      <p className="italic">Effective Date: February 21, 2026</p>
    </div>

    {/* Table of Contents */}
    <div>
      <p className="font-semibold text-[#111111] mb-3">This document contains the following policies:</p>
      <ol className="list-decimal list-inside space-y-1">
        <li><a href="#privacy-policy" className="text-[#a932bd] underline">Privacy Policy</a></li>
        <li><a href="#terms-of-service" className="text-[#a932bd] underline">Terms of Service</a></li>
        <li><a href="#refund-policy" className="text-[#a932bd] underline">Refund Policy</a></li>
        <li><a href="#cookie-policy" className="text-[#a932bd] underline">Cookie Policy</a></li>
        <li><a href="#disclaimer" className="text-[#a932bd] underline">Disclaimer</a></li>
        <li><a href="#accessibility-statement" className="text-[#a932bd] underline">Accessibility Statement</a></li>
        <li><a href="#dmca-policy" className="text-[#a932bd] underline">DMCA Policy</a></li>
        <li><a href="#community-guidelines" className="text-[#a932bd] underline">Community Guidelines</a></li>
        <li><a href="#affiliate-disclosure" className="text-[#a932bd] underline">Affiliate Disclosure</a></li>
        <li><a href="#copyright-notice" className="text-[#a932bd] underline">Copyright Notice</a></li>
      </ol>
    </div>

    {/* Privacy Policy */}
    <section id="privacy-policy" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Privacy Policy</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>This Privacy Policy explains how tsgabrielle®, operated by Peach Phoenix, LLC. (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), collects, uses, and protects your personal information when you visit our website and use our services. tsgabrielle® is a registered trademark of Peach Phoenix, LLC., registered with the United States Patent and Trademark Office under USPTO Reg. No. 7,924,799, Ser. No. 98-580,310.</p>

      <h3 className="font-semibold text-[#111111]">1. Information We Collect</h3>
      <p>We may collect the following types of information: personal information you provide directly, such as your name, email address, billing address, and payment information when you make a purchase, create an account, or contact us; usage data collected automatically, such as your IP address, browser type, pages visited, time spent on the site, and referring URLs; cookies and tracking technologies that help us understand how you interact with our website; and information from third-party platforms such as social media if you connect or interact with us through those channels.</p>

      <h3 className="font-semibold text-[#111111]">2. How We Use Your Information</h3>
      <p>We use the information we collect to process transactions and send related information including purchase confirmations and invoices; to manage your account and provide customer support; to send promotional communications if you have opted in; to improve and personalize your experience on our website; to comply with legal obligations; and to protect against fraudulent or unauthorized activity.</p>

      <h3 className="font-semibold text-[#111111]">3. Cookies</h3>
      <p>We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser. For more details, please refer to our Cookie Policy.</p>

      <h3 className="font-semibold text-[#111111]">4. Sharing Your Information</h3>
      <p>We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, such as payment processors, email platforms, and analytics providers. These parties are required to keep your information confidential and use it only for the services they provide to us. We may also disclose your information if required by law or to protect the rights and safety of tsgabrielle®, Peach Phoenix, LLC., or others.</p>

      <h3 className="font-semibold text-[#111111]">5. Data Retention</h3>
      <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>

      <h3 className="font-semibold text-[#111111]">6. Your Rights</h3>
      <p>Depending on your location, you may have the right to access the personal information we hold about you, request correction of inaccurate data, request deletion of your personal information, opt out of marketing communications at any time, and lodge a complaint with a data protection authority. To exercise any of these rights, please contact us at the address below.</p>

      <h3 className="font-semibold text-[#111111]">7. Children&apos;s Privacy</h3>
      <p>Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.</p>

      <h3 className="font-semibold text-[#111111]">8. Third-Party Links</h3>
      <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently.</p>

      <h3 className="font-semibold text-[#111111]">9. Security</h3>
      <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h3 className="font-semibold text-[#111111]">10. Changes to This Policy</h3>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.</p>

      <h3 className="font-semibold text-[#111111]">11. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* Terms of Service */}
    <section id="terms-of-service" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Terms of Service</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>Please read these Terms of Service carefully before using the tsgabrielle® website operated by Peach Phoenix, LLC.. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please do not use our website.</p>

      <h3 className="font-semibold text-[#111111]">1. Acceptance of Terms</h3>
      <p>By using this website, you confirm that you are at least 18 years of age, that you have read and understood these terms, and that you agree to be bound by them. If you are using the website on behalf of a company or organization, you represent that you have the authority to bind that entity to these terms.</p>

      <h3 className="font-semibold text-[#111111]">2. Use of the Website</h3>
      <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not misuse our website by introducing viruses or other harmful material, attempting to gain unauthorized access, or engaging in any conduct that is unlawful, harmful, or fraudulent.</p>

      <h3 className="font-semibold text-[#111111]">3. Intellectual Property</h3>
      <p>All content on this website including text, graphics, logos, images, audio, video, and software is the property of tsgabrielle® and Peach Phoenix, LLC. and is protected by applicable intellectual property laws. The tsgabrielle® name, logo, and all associated trademarks are registered trademarks of Peach Phoenix, LLC. under USPTO Reg. No. 7,924,799, Ser. No. 98-580,310. You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written permission.</p>

      <h3 className="font-semibold text-[#111111]">4. User Accounts</h3>
      <p>If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts at our discretion.</p>

      <h3 className="font-semibold text-[#111111]">5. Purchases and Payments</h3>
      <p>All purchases made through our website are subject to our Refund Policy. We reserve the right to refuse or cancel any order at our discretion. Prices are subject to change without notice. Payment must be received in full before any product or service is delivered.</p>

      <h3 className="font-semibold text-[#111111]">6. Disclaimer of Warranties</h3>
      <p>The website and all content, products, and services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>

      <h3 className="font-semibold text-[#111111]">7. Limitation of Liability</h3>
      <p>To the fullest extent permitted by law, Peach Phoenix, LLC. and tsgabrielle® shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the website or its content, products, or services.</p>

      <h3 className="font-semibold text-[#111111]">8. Third-Party Links</h3>
      <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for any loss or damage that may arise from your use of them.</p>

      <h3 className="font-semibold text-[#111111]">9. Changes to Terms</h3>
      <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.</p>

      <h3 className="font-semibold text-[#111111]">10. Governing Law</h3>
      <p>These terms shall be governed by and construed in accordance with the laws of the State of Arizona, where Peach Phoenix, LLC. is registered (EIN: US 37-2084706 | AZ 21533137), without regard to its conflict of law provisions.</p>

      <h3 className="font-semibold text-[#111111]">11. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* Refund Policy */}
    <section id="refund-policy" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Refund Policy</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>At tsgabrielle®, operated by Peach Phoenix, LLC., we are committed to your satisfaction. Please read this policy carefully before making a purchase.</p>

      <h3 className="font-semibold text-[#111111]">1. Digital Products and Services</h3>
      <p>Due to the nature of digital products and services, all sales are final once the product has been delivered or access has been granted. We do not offer refunds on digital downloads, templates, presets, or any instantly accessible digital content unless the product is defective or not as described.</p>

      <h3 className="font-semibold text-[#111111]">2. Physical Products</h3>
      <p>If you received a physical product that is damaged, defective, or incorrect, please contact us within 14 days of delivery. We will review your request and, if approved, offer a replacement, store credit, or refund at our discretion. Items must be unused and in their original packaging to be eligible for a return.</p>

      <h3 className="font-semibold text-[#111111]">3. Services</h3>
      <p>Refunds for services are evaluated on a case-by-case basis. If you are unsatisfied with a service, please contact us within 7 days of delivery. We will work with you to find a fair resolution. Services that have been fully rendered are generally not eligible for a refund.</p>

      <h3 className="font-semibold text-[#111111]">4. Subscription Plans</h3>
      <p>If you are on a subscription plan, you may cancel at any time. Cancellations will take effect at the end of the current billing period. We do not offer partial refunds for unused time within a billing period unless required by law.</p>

      <h3 className="font-semibold text-[#111111]">5. How to Request a Refund</h3>
      <p>To request a refund, please contact us at <a href="mailto:contact@tsgabrielle.us" className="text-[#a932bd] underline">contact@tsgabrielle.us</a> with your order number, the reason for your request, and any supporting documentation such as photos of a damaged item. We will respond within 5 business days.</p>

      <h3 className="font-semibold text-[#111111]">6. Processing Time</h3>
      <p>Approved refunds will be processed within 7 to 10 business days and returned to your original payment method. Processing times may vary depending on your bank or payment provider.</p>

      <h3 className="font-semibold text-[#111111]">7. Non-Refundable Items</h3>
      <p>The following are not eligible for refunds: gift cards, downloadable software or digital files once accessed, and any services already fully rendered.</p>

      <h3 className="font-semibold text-[#111111]">8. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* Cookie Policy */}
    <section id="cookie-policy" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Cookie Policy</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>This Cookie Policy explains how tsgabrielle®, operated by Peach Phoenix, LLC., uses cookies and similar tracking technologies on our website.</p>

      <h3 className="font-semibold text-[#111111]">1. What Are Cookies</h3>
      <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owner.</p>

      <h3 className="font-semibold text-[#111111]">2. Types of Cookies We Use</h3>
      <p>Essential cookies are necessary for the website to function properly and cannot be switched off. Analytics cookies allow us to count visits and traffic sources so we can measure and improve performance of our website. We use tools such as Google Analytics for this purpose. Preference cookies enable the website to remember information that changes the way the website behaves or looks. Marketing cookies may be set by our advertising partners to build a profile of your interests and show you relevant advertisements on other sites.</p>

      <h3 className="font-semibold text-[#111111]">3. Third-Party Cookies</h3>
      <p>Our website may include content from third-party platforms such as YouTube, Instagram, TikTok, Facebook, X, Pinterest, LinkedIn, and Snapchat, which may set their own cookies. We do not control these cookies and recommend reviewing the cookie policies of those platforms directly.</p>

      <h3 className="font-semibold text-[#111111]">4. Managing Cookies</h3>
      <p>You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. You can also opt out of Google Analytics by using the Google Analytics opt-out browser add-on available at <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#a932bd] underline" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a>.</p>

      <h3 className="font-semibold text-[#111111]">5. Changes to This Policy</h3>
      <p>We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

      <h3 className="font-semibold text-[#111111]">6. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* Disclaimer */}
    <section id="disclaimer" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Disclaimer</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>

      <h3 className="font-semibold text-[#111111]">1. General Information</h3>
      <p>The content published on the tsgabrielle® website, operated by Peach Phoenix, LLC., is for general informational and entertainment purposes only. While we strive to keep information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information, products, services, or related graphics on the website.</p>

      <h3 className="font-semibold text-[#111111]">2. No Professional Advice</h3>
      <p>Nothing on this website constitutes professional legal, financial, medical, or business advice. Always seek the advice of a qualified professional before making decisions based on content found on this website.</p>

      <h3 className="font-semibold text-[#111111]">3. Results Disclaimer</h3>
      <p>Any results, outcomes, or testimonials mentioned on this website are not guaranteed. Individual results may vary based on effort, experience, and other factors outside our control.</p>

      <h3 className="font-semibold text-[#111111]">4. External Links</h3>
      <p>tsgabrielle® is not responsible for the content, accuracy, or practices of any third-party websites linked from our site. The inclusion of any link does not imply our endorsement of that site.</p>

      <h3 className="font-semibold text-[#111111]">5. Limitation of Liability</h3>
      <p>To the maximum extent permitted by law, Peach Phoenix, LLC. and tsgabrielle® shall not be liable for any loss or damage arising directly or indirectly from your use of or reliance on any content on this website.</p>

      <h3 className="font-semibold text-[#111111]">6. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* Accessibility Statement */}
    <section id="accessibility-statement" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Accessibility Statement</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>tsgabrielle®, operated by Peach Phoenix, LLC., is committed to ensuring digital accessibility for all people, including those with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.</p>

      <h3 className="font-semibold text-[#111111]">1. Our Commitment</h3>
      <p>We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with disabilities, including visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>

      <h3 className="font-semibold text-[#111111]">2. Measures We Take</h3>
      <p>We work to ensure our website is navigable by keyboard, compatible with screen readers, uses sufficient color contrast for readability, includes descriptive alt text for images, and avoids content that could cause seizures or physical discomfort.</p>

      <h3 className="font-semibold text-[#111111]">3. Known Limitations</h3>
      <p>While we aim for full accessibility, some content may not yet meet all standards. We are actively working to address any gaps and welcome feedback from all users.</p>

      <h3 className="font-semibold text-[#111111]">4. Feedback and Contact</h3>
      <p>If you experience any difficulty accessing content on our website, please contact us at <a href="mailto:contact@tsgabrielle.us" className="text-[#a932bd] underline">contact@tsgabrielle.us</a>. We will do our best to provide the information in an accessible format upon request and respond within 5 business days.</p>

      <h3 className="font-semibold text-[#111111]">5. Enforcement</h3>
      <p>If you are not satisfied with our response, you may contact the relevant accessibility authority in your region.</p>

      <h3 className="font-semibold text-[#111111]">6. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* DMCA Policy */}
    <section id="dmca-policy" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">DMCA Policy</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>tsgabrielle®, operated by Peach Phoenix, LLC., respects the intellectual property rights of others and expects users of our website to do the same. This policy outlines our procedures for addressing claims of copyright infringement under the Digital Millennium Copyright Act (DMCA). tsgabrielle® is a registered trademark under USPTO Reg. No. 7,924,799, Ser. No. 98-580,310.</p>

      <h3 className="font-semibold text-[#111111]">1. Reporting Copyright Infringement</h3>
      <p>If you believe that content on our website infringes your copyright, please send a written notice to <a href="mailto:contact@tsgabrielle.us" className="text-[#a932bd] underline">contact@tsgabrielle.us</a> with the following information: your full name and contact information including email address and phone number; a description of the copyrighted work you believe has been infringed; the specific URL or location on our website where the infringing content appears; a statement that you have a good faith belief that the use of the material is not authorized by the copyright owner; a statement that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf; and your physical or electronic signature.</p>

      <h3 className="font-semibold text-[#111111]">2. Counter-Notification</h3>
      <p>If you believe your content was removed in error, you may submit a counter-notification including: your contact information; identification of the removed content and its location before removal; a statement under penalty of perjury that you have a good faith belief the content was removed by mistake; your consent to jurisdiction of the federal court in your district; and your physical or electronic signature.</p>

      <h3 className="font-semibold text-[#111111]">3. Repeat Infringers</h3>
      <p>We reserve the right to terminate accounts or access for users who are found to be repeat infringers of intellectual property rights, in accordance with applicable law.</p>

      <h3 className="font-semibold text-[#111111]">4. Contact Our DMCA Agent</h3>
      <ContactBlock />
    </section>

    {/* Community Guidelines */}
    <section id="community-guidelines" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Community Guidelines</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>At tsgabrielle®, operated by Peach Phoenix, LLC., we believe in building a respectful, inclusive, and positive community. These guidelines apply to all interactions with our brand across our website and social media platforms including Facebook, Instagram, X, YouTube, TikTok, Pinterest, LinkedIn, and Snapchat.</p>

      <h3 className="font-semibold text-[#111111]">1. Be Respectful</h3>
      <p>Treat everyone with kindness and respect. We do not tolerate harassment, bullying, hate speech, discrimination, or personal attacks of any kind directed at any individual or group.</p>

      <h3 className="font-semibold text-[#111111]">2. Keep It Relevant</h3>
      <p>Please keep comments, messages, and interactions relevant to the content or topic at hand. Spam, off-topic promotions, or repetitive content will be removed without notice.</p>

      <h3 className="font-semibold text-[#111111]">3. No Harmful Content</h3>
      <p>Do not share content that is violent, sexually explicit, threatening, or otherwise harmful. Do not share misinformation or content designed to deceive others.</p>

      <h3 className="font-semibold text-[#111111]">4. Respect Intellectual Property</h3>
      <p>Do not share or reproduce content that belongs to others without proper credit or permission. This includes music, photos, videos, and written content.</p>

      <h3 className="font-semibold text-[#111111]">5. No Unauthorized Promotion</h3>
      <p>Unsolicited advertising, affiliate links, or promotional content posted without our prior written permission will be removed.</p>

      <h3 className="font-semibold text-[#111111]">6. Enforcement</h3>
      <p>We reserve the right to remove any content that violates these guidelines and to block or ban users who repeatedly violate them, without prior notice. Repeated violations may result in permanent removal from all tsgabrielle® community spaces.</p>

      <h3 className="font-semibold text-[#111111]">7. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* Affiliate Disclosure */}
    <section id="affiliate-disclosure" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Affiliate Disclosure</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p>tsgabrielle®, operated by Peach Phoenix, LLC., participates in affiliate marketing programs. This means that we may earn a commission when you click on certain links on our website and make a purchase, at no additional cost to you.</p>

      <h3 className="font-semibold text-[#111111]">1. How It Works</h3>
      <p>Some of the links on our website are affiliate links. If you click on one of these links and make a purchase, we may receive a small commission from the retailer or service provider. This helps support the continued operation of tsgabrielle® and allows us to continue creating content and offering services to our audience.</p>

      <h3 className="font-semibold text-[#111111]">2. Our Commitment to Honesty</h3>
      <p>We only recommend products and services that we genuinely believe in and that we think will be of value to our audience. Our opinions and recommendations are always our own and are never influenced by affiliate relationships. tsgabrielle® is committed to transparency in all our operations.</p>

      <h3 className="font-semibold text-[#111111]">3. Third-Party Platforms</h3>
      <p>Affiliate programs we may participate in include but are not limited to Amazon Associates, ShareASale, and other brand partnerships. Each of these programs has its own privacy and data practices, which we encourage you to review independently.</p>

      <h3 className="font-semibold text-[#111111]">4. FTC Compliance</h3>
      <p>This disclosure is made in accordance with the Federal Trade Commission (FTC) guidelines on endorsements and testimonials (16 C.F.R. Part 255). We are committed to being fully transparent about any financial relationships that may influence our content.</p>

      <h3 className="font-semibold text-[#111111]">5. Contact Us</h3>
      <ContactBlock />
    </section>

    {/* Copyright Notice */}
    <section id="copyright-notice" className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#111111] border-b border-gray-200 pb-2">Copyright Notice</h2>
      <p className="italic text-sm">Effective Date: February 21, 2026</p>
      <p className="font-semibold">2026&copy; tsgabrielle® &mdash; All Rights Reserved.</p>
      <p>The tsgabrielle® name, logo, and all trademarks, service marks, trade names, and trade dress associated with tsgabrielle® products and services are registered trademarks of Peach Phoenix, LLC. under USPTO Reg. No. 7,924,799, Ser. No. 98-580,310. Unauthorized use of any tsgabrielle® trademark, logo, or brand identity is strictly prohibited and may constitute trademark infringement subject to civil and criminal legal action under applicable United States and international law.</p>
      <p>All content on this website including but not limited to text, graphics, photographs, illustrations, audio, video, and software is the exclusive property of tsgabrielle® and Peach Phoenix, LLC. and is protected under the United States Copyright Act (17 U.S.C.) and international copyright treaties.</p>
      <p>You may not copy, reproduce, distribute, publish, display, perform, modify, create derivative works from, or exploit any content from this website in any way without the prior written permission of Peach Phoenix, LLC..</p>
      <p>All other trademarks, logos, and brand names mentioned on this website that are not owned by Peach Phoenix, LLC. are the property of their respective owners. Reference to any products, services, or organizations does not constitute or imply endorsement by tsgabrielle® or Peach Phoenix, LLC..</p>
      <p>Tax Identifiers: EIN US 37-2084706 | AZ 21533137.</p>

      <h3 className="font-semibold text-[#111111]">Contact Us</h3>
      <ContactBlock />
    </section>

  </div>
);

export default function Page() {
  return <ContentPage title="Legal Policies & Disclosures" body={legalBody} />;
}
