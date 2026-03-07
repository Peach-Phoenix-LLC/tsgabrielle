import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Legal Policies & Disclosures",
  description: "Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, and all legal disclosures for tsgabrielle® operated by Peach Phoenix, LLC.",
  path: "/legal-hub"
});

const POLICIES = [
  { title: "Privacy Policy", href: "/privacy-policy", description: "Learn how we protect and manage your personal data." },
  { title: "Terms of Service", href: "/terms-of-service", description: "The rules and agreements for using our website and services." },
  { title: "Refund Policy", href: "/refund-policy", description: "Our commitment to your satisfaction and return guidelines." },
  { title: "Shipping Policy", href: "/shipping-policy", description: "Details about our worldwide delivery standards." },
  { title: "Cookie Policy", href: "/cookie-policy", description: "How we use cookies to improve your experience." },
  { title: "Do Not Sell My Info", href: "/privacy/do-not-sell", description: "CCPA/CPRA rights: Opt-out of the sale or sharing of your data." },
];

export default async function Page() {
  const content = await getPageContent("/legal-hub");
  const title = content.title || "Legal Hub";
  
  const hubBody = (
    <div className="space-y-12">
      <p className="text-xl font-light">
        Welcome to the tsgabrielle® Legal Hub. Transparency and trust are the foundation of our universe. 
        Below you will find our comprehensive policies designed to protect our community and ensure a transcendent experience for all members.
      </p>
      
      <div className="grid gap-8 lg:grid-cols-2">
        {POLICIES.map((policy) => (
          <Link key={policy.href} href={policy.href} className="group block p-8 border border-black/5 hover:border-[#a932bd] rounded-2xl transition-all duration-500 hover:shadow-2xl bg-white">
            <h3 className="text-2xl font-light text-[#111111] group-hover:text-[#a932bd] transition-colors mb-2">{policy.title}</h3>
            <p className="text-sm text-[#555555] opacity-80 leading-relaxed">{policy.description}</p>
            <div className="mt-6 text-[10px] uppercase tracking-widest text-[#a932bd] font-bold inline-block border-b border-[#a932bd]/20 group-hover:border-[#a932bd] transition-all">
              View Policy →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 p-10 bg-[#fdfcf5] rounded-3xl border border-black/5 text-center">
         <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-phoenix mb-4">Questions regarding our policies?</h3>
         <p className="text-sm text-black/60 mb-6">Our dedicated support team is here to assist you with any legal or privacy concerns.</p>
         <a href="mailto:contact@tsgabrielle.us" className="text-sm underline font-medium hover:text-[#a932bd] transition-colors">contact@tsgabrielle.us</a>
      </div>
    </div>
  );

  return <ContentPage title={title} body={content.body ? <div className="space-y-8"><div className="whitespace-pre-wrap">{content.body}</div>{hubBody}</div> : hubBody} />;
}
