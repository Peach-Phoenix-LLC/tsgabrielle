import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Columbia Sportswear",
  description: "Columbia Sportswear collaboration.",
  path: "/columbia-sportswear"
});

export default function Page() {
  return <ContentPage title="Columbia Sportswear" body="Technical outerwear and lifestyle essentials." />;
}

