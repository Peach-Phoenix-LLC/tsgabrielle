import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Videos by YouTube",
  description: "Official YouTube video content.",
  path: "/videos-by-youtube"
});

export default function Page() {
  return <ContentPage title="Videos by YouTube" body="Browse curated video content from the brand." />;
}
