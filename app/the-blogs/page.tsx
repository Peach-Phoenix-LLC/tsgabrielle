import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Blogs",
  description: "Editorial stories and updates.",
  path: "/the-blogs"
});

export default function Page() {
  return <ContentPage title="The Blogs" body="Articles on style, identity, and design." />;
}

