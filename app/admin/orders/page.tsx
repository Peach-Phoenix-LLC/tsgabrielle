import Link from "next/link";
import { ContentPage } from "@/components/templates/ContentPage";

export default function AdminOrdersPage() {
  return (
    <section className="container-luxe py-14">
      <ContentPage title="Admin Orders" body="Review payment and fulfillment status." allowBuilder={false} />
      <Link href="/admin/orders/sample-id" className="text-phoenix">
        Open sample order
      </Link>
    </section>
  );
}

