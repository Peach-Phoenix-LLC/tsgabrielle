import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "Legal Policies & Disclosures",
  description: "Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, and all legal disclosures for tsgabrielle® operated by Peach Phoenix, LLC.",
  path: "/legal-hub"
});

const POLICIES = [
  { title: "Privacy Policy", href: "/privacy-policy", description: "Learn how we protect and manage your personal data with a commitment to CCPA/CPRA standards." },
  { title: "Terms of Service", href: "/terms-of-service", description: "The legally binding agreements and rules governing your interaction with our digital universe." },
  { title: "Refund Policy", href: "/refund-policy", description: "Our commitment to client satisfaction, return guidelines, and operational excellence." },
  { title: "Legal Disclaimer", href: "/legal-disclaimer", description: "General information, professional advice limitations, and absolute liability clauses." },
  { title: "Accessibility Statement", href: "/accessibility-statement", description: "Our commitment to digital inclusion and ensuring universal navigability for all users." },
  { title: "Copyright and Trademark", href: "/copyright-trademark", description: "Formal declaration of intellectual property rights, trademarks, and trade dress protection." },
  { title: "Community Guidelines", href: "/community-guidelines", description: "Standards of respect, decorum, and content integrity within our inclusive ecosystem." },
  { title: "Affiliate Disclosure", href: "/affiliate-disclosure", description: "Transparency regarding our financial relationships and editorial independence." },
  { title: "Shipping Policy", href: "/shipping-policy", description: "Details about our worldwide delivery standards, lead times, and transit protocols." },
  { title: "Cookie Policy", href: "/cookie-policy", description: "Data collection transparency regarding cookies, web beacons, and tracking technologies." },
  { title: "Sustainability Commitment", href: "/sustainability", description: "Our dedication to conscious creation, on-demand luxury, and ecological stewardship." },
  { title: "Do Not Sell My Info", href: "/privacy/do-not-sell", description: "Exercise your CCPA/CPRA rights: Opt-out of the sale or sharing of your personal data." },
];

export default async function Page() {
  const content = await getPageContent("/legal-hub");
  const title = content.title || "Legal Hub";
  
  const hubBody = (
    <div className="space-y-12">
      <p className="text-xl font-light">
        Transparency and trust are the foundation of our universe. 
        Below you will find our comprehensive policies designed to protect our community and ensure a transcendent experience for all members.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {POLICIES.map((policy) => (
          <div key={policy.href} className="group relative p-8 border border-black/5 hover:border-[#a932bd]/20 rounded-3xl transition-all duration-700 bg-white hover:shadow-[0_40px_80px_-15px_rgba(169,50,189,0.1)] overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <div className="relative w-12 h-12 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                <Image 
                  src="/images/tsgabrielle-icon.png" 
                  alt="tsgabrielle® Icon" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="px-3 py-1 bg-black/5 rounded-full text-[8px] uppercase tracking-widest font-bold text-black/40 group-hover:text-[#a932bd] group-hover:bg-[#a932bd]/5 transition-all">
                Policy
              </div>
            </div>
            
            <h3 className="text-xl font-light text-[#111111] group-hover:text-[#a932bd] transition-colors mb-3">{policy.title}</h3>
            <p className="text-xs text-[#555555] opacity-70 leading-relaxed mb-8 h-12 line-clamp-3">{policy.description}</p>
            
            <Link 
              href={policy.href} 
              className="btn-holographic-outline w-full text-center"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-white rounded-[3rem] border border-black/5 text-center shadow-sm relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a932bd]/20 to-transparent" />
         <h3 className="text-[10px] capitalize tracking-[0.4em] font-bold text-[#a932bd] mb-6">Questions regarding our policies?</h3>
         <p className="text-base font-light text-black/60 mb-10 max-w-xl mx-auto italic">Our dedicated support team is here to assist you with any legal, compliance, or privacy concerns you may have throughout your journey.</p>
         <a 
          href="mailto:contact@tsgabrielle.us" 
          className="btn-holographic-outline"
        >
          Contact Legal
        </a>
      </div>
    </div>
  );

  return <ContentPage title={title} body={content.body ? <div className="space-y-8"><div className="whitespace-pre-wrap">{content.body}</div>{hubBody}</div> : hubBody} />;
}
