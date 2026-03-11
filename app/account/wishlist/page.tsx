import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My Wishlist | tsgabrielle",
  description: "Wishlist page.",
  path: "/account/wishlist"
});

export default function Page() {
  return <ContentPage title="My Wishlist" body="Saved products appear here." />;
}

