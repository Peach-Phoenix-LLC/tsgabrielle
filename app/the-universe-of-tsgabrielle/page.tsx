import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Universe of tsgabrielle®",
  description: "Brand world and editorial pages.",
  path: "/the-universe-of-tsgabrielle"
});

export default function Page() {
  return <ContentPage title="The Universe of tsgabrielle®" body="Your inclusive luxury universe." />;
}

