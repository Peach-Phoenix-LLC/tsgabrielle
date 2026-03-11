import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminNewProductPage() {
  let categories: { id: string; name: string }[] = [];
  let collections: { id: string; name: string }[] = [];

  try {
    const supabase = getSupabaseServerClient();
    const [catsRes, colsRes] = await Promise.all([
      supabase.from("categories").select("id, name").order("name"),
      supabase.from("collections").select("id, name").order("name"),
    ]);
    categories = catsRes.data || [];
    collections = colsRes.data || [];
  } catch (error) {
    console.warn("Could not fetch categories/collections:", error);
  }

  return (
    <section className="px-6 py-10 md:px-10 bg-[#f9f9f9] min-h-screen">
      <div className="container-luxe space-y-8 max-w-5xl">
        <header className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
          <div>
            <Link href="/admin/products" className="text-xs uppercase tracking-widest text-[#555555] font-light hover:text-[#a932bd] flex items-center gap-2 mb-4">
               <span>←</span> Back to Inventory
            </Link>
            <h1 className="text-4xl font-light tracking-wide text-[#111111]">Create Product</h1>
            <p className="mt-2 text-lg font-light text-[#555555]">Add a new master item to the catalogue.</p>
          </div>
        </header>

        <ProductForm 
          categories={categories || []} 
          collections={collections || []} 
        />
      </div>
    </section>
  );
}
