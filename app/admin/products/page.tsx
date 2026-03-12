import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { PrintfulImportButton } from "@/components/admin/products/PrintfulImportButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    const supabase = getSupabaseServerClient();
    
    // Fetch products with their category and variants
    // We'll take the first variant's SKU and stock for the list view
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        title,
        price_cents,
        active,
        category:categories(name),
        variants:product_variants(sku, stock)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      products = data || [];
    }
  } catch (err) {
    console.warn("Could not fetch products:", err);
  }

  const rows = (products || []).map((p: any) => {
    // Get the first variant if available
    const primaryVariant = p.variants?.[0] || {};
    const stockCount = primaryVariant.stock ?? 0;
    
    let stockStatus = "Out of Stock";
    if (stockCount > 10) stockStatus = `In Stock (${stockCount})`;
    else if (stockCount > 0) stockStatus = `Low Stock (${stockCount})`;

    return {
      id: p.id,
      name: p.title,
      sku: primaryVariant.sku || "N/A",
      category: (p.category as any)?.name || "Uncategorized",
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(p.price_cents / 100),
      stock: stockStatus,
      isActive: p.active
    };
  });

  return (
    <section className="px-6 py-10 md:px-10">
      <div className="container-luxe space-y-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-wide text-[#111111]">Product Inventory</h1>
            <p className="mt-2 text-lg font-light text-[#555555]">Manage your catalog, variants, and stock levels across all collections.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <PrintfulImportButton />
            <Link 
              href="/admin/products/new" 
              className="flex items-center justify-center gap-2 rounded bg-[#a932bd] px-8 py-4 text-base font-light text-[#ffffff] transition-colors hover:bg-[#921fa6]"
            >
              + Add New Product
            </Link>
          </div>
        </header>

        <div className="border border-[#e7e7e7] bg-[#ffffff] p-6">
          <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between border-b border-[#e7e7e7]">
            <input
              className="w-full max-w-xl rounded border border-[#e7e7e7] bg-[#ffffff] px-5 py-3.5 text-base font-light text-[#111111] placeholder:text-[#555555] focus:border-[#a932bd] focus:outline-none"
              placeholder="Search products, SKUs, or categories..."
            />
            <div className="flex gap-3">
              <button className="rounded border border-[#e7e7e7] bg-[#ffffff] px-6 py-3.5 text-base font-light text-[#111111] transition-colors hover:bg-[#e7e7e7]">
                Filter
              </button>
              <button className="rounded border border-[#e7e7e7] bg-[#ffffff] px-6 py-3.5 text-base font-light text-[#111111] transition-colors hover:bg-[#e7e7e7]">
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto pt-6">
            <table className="w-full text-left font-light border-collapse">
              <thead>
                <tr className="border-b border-[#e7e7e7] text-sm uppercase tracking-wide text-[#555555]">
                  <th className="px-4 py-4 font-light">Product</th>
                  <th className="px-4 py-4 font-light">SKU</th>
                  <th className="px-4 py-4 font-light">Category</th>
                  <th className="px-4 py-4 font-light">Price</th>
                  <th className="px-4 py-4 font-light">Availability</th>
                  <th className="px-4 py-4 font-light text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7e7e7]">
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <tr key={row.id} className="transition-colors hover:bg-[#f9f9f9]">
                      <td className="px-4 py-6 text-[#111111]">
                        <div className="flex flex-col gap-1">
                          <span className="text-lg">{row.name}</span>
                          <span className="text-sm text-[#555555]">
                            {row.isActive ? 'Active' : 'Draft'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-base text-[#555555]">{row.sku}</td>
                      <td className="px-4 py-6 text-base text-[#555555]">{row.category}</td>
                      <td className="px-4 py-6 text-lg text-[#111111]">{row.price}</td>
                      <td className="px-4 py-6">
                        <span className={`text-base ${
                          row.stock.includes('In Stock') 
                            ? 'text-[#a932bd]' 
                            : row.stock.includes('Low') 
                              ? 'text-[#111111]' 
                              : 'text-[#555555]'
                        }`}>
                          {row.stock}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-right">
                        <div className="flex justify-end gap-4 text-base">
                          <Link 
                            href={`/admin/products/${row.id}`} 
                            className="text-[#a932bd] transition-colors hover:text-[#921fa6]"
                          >
                            Edit
                          </Link>
                          <button className="text-[#555555] transition-colors hover:text-[#111111]">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-20 text-center">
                      <div className="mx-auto flex max-w-[300px] flex-col items-center gap-4 text-[#555555]">
                        <p className="text-lg text-[#111111]">No products found</p>
                        <p className="text-base cursor-default">Start building your catalog by adding your first luxury item.</p>
                        <Link href="/admin/products/new" className="mt-4 text-base text-[#a932bd] hover:text-[#921fa6]">
                          + Add Product
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

