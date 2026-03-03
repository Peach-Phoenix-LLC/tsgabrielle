import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Your Inclusive Store",
  description: "Inclusive store values and mission.",
  path: "/your-inclusive-store"
});

export default function Page() {
  return <ContentPage title="Your Inclusive Store" body="Accessibility, respect, and premium quality for all." />;
}

