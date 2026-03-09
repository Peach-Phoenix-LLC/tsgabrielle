import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Contact tsgabrielle®",
  description: "Contact details for tsgabrielle.",
  path: "/contact-tsgabrielle"
});

export default async function Page() {
  const content = await getPageContent("/contact-tsgabrielle");
  const title = content.title || "Contact tsgabrielle®";
  const body = (
    <div className="space-y-8">
      <p className="text-xl font-light leading-relaxed">
        Providing a direct channel to connect with the brand. 
        Whether you’re reaching out for collaborations, inquiries, feedback, or conversation, 
        this space opens the door to meaningful engagement.
      </p>
      <p>
        tsgabrielle® values communication and welcomes connections with individuals, partners, 
        and communities who share an interest in creativity, innovation, and purposeful work.
      </p>
      {content.body && (
        <div className="pt-12 border-t border-[#e7e7e7] whitespace-pre-wrap">
          {content.body}
        </div>
      )}
    </div>
  );

  return (
    <ContentPage 
      title={title} 
      subtitle="Connect with the Universe"
      heroImage="/images/slides/tsgabrielle-Slide4.png"
      body={body} 
    />
  );
}

