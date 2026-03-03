import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "My Account | tsgabrielle",
  description: "Account dashboard.",
  path: "/account"
});

export default function AccountPage() {
  return (
    <section className="container-luxe py-14">
      <ContentPage title="My Account" body="View profile, orders, wishlist, and settings." />
      <div className="mt-2 flex gap-4 text-sm">
        <Link href="/auth/sign-out" className="text-phoenix">
          Sign out
        </Link>
      </div>
    </section>
  );
}
