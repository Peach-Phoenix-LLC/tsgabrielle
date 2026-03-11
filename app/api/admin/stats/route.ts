import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  try {
    const supabase = getSupabaseServerClient();

    const [products, orders, customers] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }).is("deleted_at", null),
      supabase.from("orders").select("total_cents", { count: "exact" }),
      supabase.from("users").select("id", { count: "exact", head: true })
    ]);

    const totalRevenueCents = orders.data?.reduce((acc, curr) => acc + (curr.total_cents || 0), 0) || 0;
    const activeOrders = orders.count || 0;
    const avgOrderValue = activeOrders > 0 ? totalRevenueCents / activeOrders : 0;

    return NextResponse.json({
      totalRevenue: totalRevenueCents / 100,
      activeOrders,
      avgOrderValue: avgOrderValue / 100,
      totalProducts: products.count || 0,
      totalCustomers: customers.count || 0
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
