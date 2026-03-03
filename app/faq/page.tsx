import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions.",
  path: "/faq"
});

export default function Page() {
  return <ContentPage title="FAQ" body="Shipping, sizing, returns, and order status guidance." />;
}

