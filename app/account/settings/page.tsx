import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My Settings | tsgabrielle",
  description: "Account settings page.",
  path: "/account/settings"
});

export default function Page() {
  return <ContentPage title="My Settings" body="Manage profile, notifications, and preferences." />;
}

