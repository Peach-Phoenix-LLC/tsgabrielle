import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Gabrielle",
  description: "About Gabrielle.",
  path: "/about-gabrielle"
});

export default function Page() {
  return <ContentPage title="About Gabrielle" body="Founder story and brand vision." />;
}

