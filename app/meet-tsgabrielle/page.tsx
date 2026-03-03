import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Meet tsgabrielle®",
  description: "Meet the brand.",
  path: "/meet-tsgabrielle"
});

export default function Page() {
  return <ContentPage title="Meet tsgabrielle®" body="Brand identity, people, and mission." />;
}

