import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Adidas x tsgabrielle®",
  description: "Adidas x tsgabrielle collection.",
  path: "/adidas-x-tsgabrielle"
});

export default function Page() {
  return <ContentPage title="Adidas x tsgabrielle®" body="Performance-inspired fashion collaboration." />;
}

