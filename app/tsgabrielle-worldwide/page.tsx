import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "tsgabrielle® Worldwide",
  description: "Worldwide store directory.",
  path: "/tsgabrielle-worldwide"
});

export default function Page() {
  return <ContentPage title="👤 tsgabrielle® Worldwide" body="Browse global store and market directories." />;
}

