import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "My tsgabrielle®",
  description: "Account center.",
  path: "/my-tsgabrielle"
});

export default function Page() {
  return (
    <section className="container-luxe py-14">
      <ContentPage title="👤 My tsgabrielle®" body="Manage your account, orders, wishlist, and settings." />
      <div className="mt-2 flex gap-4 text-sm">
        <Link href="/auth/sign-in" className="text-phoenix">
          Sign in
        </Link>
        <Link href="/auth/sign-up" className="text-phoenix">
          Create account
        </Link>
      </div>
    </section>
  );
}
