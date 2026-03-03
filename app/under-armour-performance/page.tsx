import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Under Armour® Performance",
  description: "Under Armour performance collaboration.",
  path: "/under-armour-performance"
});

export default function Page() {
  return <ContentPage title="Under Armour® Performance" body="Athletic performance pieces and accessories." />;
}

