import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Legal Hub",
  description: "Policies and legal resources.",
  path: "/legal-hub"
});

export default function Page() {
  return <ContentPage title="Legal Hub" body="Terms, privacy, and policy documentation." />;
}

