import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Follow tsgabrielle®",
  description: "Follow tsgabrielle social channels.",
  path: "/follow-tsgabrielle"
});

export default function Page() {
  return <ContentPage title="📱 Follow tsgabrielle®" body="Discover all social channels and updates." />;
}

