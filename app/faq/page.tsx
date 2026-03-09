import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions (FAQ)",
  description: "A celestial guide to navigating our store, products, and community values.",
  path: "/faq"
});

export default async function Page() {
  const faqSections = [
    {
      title: "Orders & Navigation",
      emoji: "🌌",
      items: [
        { q: "How do I place an order?", a: "Orders are placed directly through the tsgabrielle® online store. Select your item, choose your options, and follow our secure checkout process." },
        { q: "Can I modify or cancel my order?", a: "As our fulfillment process is designed for cosmic speed, please contact us immediately for any changes. We will assist you if the order has not yet entered the provisioning stage." },
        { q: "Will I receive a confirmation?", a: "Yes. A confirmation email is dispatched immediately after checkout. If it doesn’t arrive, please check your spam folder or reach out via our Contact page." }
      ]
    },
    {
      title: "Shipping & Logistics",
      emoji: "🚀",
      items: [
        { q: "Where do you ship?", a: "tsgabrielle® ships internationally to most regions of the cosmos. Availability is calculated at checkout based on your location." },
        { q: "How long does shipping take?", a: "Delivery windows depend on your coordinates and the method selected. Real-time estimates are provided during the final checkout stage." },
        { q: "How do I track my journey?", a: "Once your order leaves our facility, you will receive a tracking number to monitor its progress through the stardust veil." }
      ]
    },
    {
      title: "Returns & Reflections",
      emoji: "🔄",
      items: [
        { q: "Do you accept returns?", a: "Returns are accepted for most unused items within our designated return window. Please consult the Legal Hub for specific category exclusions." },
        { q: "What if an item arrives damaged?", a: "If your order arrives defective or incorrect, notify us immediately. We are committed to making it right and restoring your experience." },
        { q: "Are shipping fees refundable?", a: "Standard shipping fees are generally non-refundable unless the return is due to an error on our part." }
      ]
    },
    {
      title: "Products & Inclusivity",
      emoji: "✨",
      items: [
        { q: "Are your products authentic?", a: "Every product is meticulously curated or created to reflect the high-end quality and identity of tsgabrielle®. We never use fictitious or demo products." },
        { q: "Are products gender-inclusive?", a: "Absolutely. All items are designed for all identities, all bodies, and all expressions. Inclusivity is not a feature; it is our foundation." },
        { q: "Is tsgabrielle® LGBTQ+ owned?", a: "Yes—proudly. The brand is founded and led by a French trans creator based in the United States, bringing a unique, international perspective to every creation." }
      ]
    },
    {
      title: "Payments & Security",
      emoji: "💳",
      items: [
        { q: "What payment methods are accepted?", a: "We accept major credit/debit cards and secure digital wallets. Availability varies by region to ensure the most seamless experience for you." },
        { q: "Is my data secure?", a: "Yes. All transactions are processed through encrypted, industry-standard systems within our Google Cloud infrastructure to protect your financial integrity." }
      ]
    },
    {
      title: "Privacy & Account",
      emoji: "🛡️",
      items: [
        { q: "Do I need an account to shop?", a: "No, guest checkout is always available. However, an account allows you to track your history and save preferences within the universe." },
        { q: "How is my personal information used?", a: "Your data is used strictly for order processing and experience improvement. We adhere to a strict \"No Invention\" policy regarding your personal details." }
      ]
    }
  ];

  const body = (
    <div className="space-y-20 max-w-4xl mx-auto">
      <div className="space-y-8 text-center md:text-left">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          A celestial guide to navigating our store, products, and community values.
        </p>
        <p className="text-[#555555]">
          This space is designed to ensure your journey is smooth, transparent, and empowering.
        </p>
      </div>

      <div className="space-y-24">
        {faqSections.map((section, idx) => (
          <div key={idx} className="space-y-12">
            <div className="flex items-center gap-4 pb-4 border-b border-[#a932bd]/10">
              <span className="text-3xl">{section.emoji}</span>
              <h2 className="text-3xl font-light tracking-tight text-[#111111] capitalize">{section.title}</h2>
            </div>
            
            <div className="grid gap-12">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="group">
                  <h3 className="text-xl font-medium text-[#111111] mb-3 group-hover:text-[#a932bd] transition-colors duration-500">
                    {item.q}
                  </h3>
                  <div className="pl-6 border-l-2 border-[#a932bd]/10 py-2">
                    <p className="text-[#555555] leading-relaxed font-light">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-20 border-t border-[#e7e7e7] italic text-center text-black/40">
        <p>As the universe of tsgabrielle® continues to grow, our FAQ will evolve alongside it.</p>
      </div>
    </div>
  );
  
  return (
    <ContentPage 
      title="FAQ" 
      subtitle="Celestial Navigation" 
      heroImage="/images/slides/tsgabrielle-Slide2.png" 
      body={body} 
    />
  );
}

