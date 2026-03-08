import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions.",
  path: "/faq"
});

export default async function Page() {
  const content = await getPageContent("/faq");
  const title = content.title || "FAQ";
  const body = (
    <div className="space-y-8">
      <p className="text-xl font-light leading-relaxed">
        The <strong>FAQ</strong> section offers clear, accessible answers to the most common questions 
        about tsgabrielle®. From brand details and services to policies and general inquiries, 
        this space is designed to help visitors find clarity quickly and confidently.
      </p>
      <p>
        As the universe of tsgabrielle® continues to grow, the FAQ will evolve alongside it — 
        expanding to address new topics and support an ever-widening community.
      </p>
      {content.body && (
        <div className="pt-12 border-t border-[#e7e7e7] whitespace-pre-wrap">
          {content.body}
        </div>
      )}
    </div>
  );
  
  return <ContentPage title={title} subtitle="Common Inquiries" heroImage="/images/slides/tsgabrielle-Slide2.png" body={body} />;
}

