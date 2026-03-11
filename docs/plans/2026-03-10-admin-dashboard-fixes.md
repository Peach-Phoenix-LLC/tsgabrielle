# Admin Dashboard Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all admin dashboard issues: move sidebar to shared layout, convert tab-switching to real routes, wire up non-functional buttons, build out stub pages with real data, and fix accessibility gaps.

**Architecture:** Move sidebar into `app/admin/layout.tsx` as a shared Client Component using `usePathname()` for active state. Each section becomes its own page file under `app/admin/[section]/page.tsx`. The existing section manager components (ProductSection, OrderSection, etc.) stay unchanged — we just mount them in the right page files.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Supabase (server client), Tailwind CSS, Playwright (Chromium E2E tests), `@/lib/supabase/server.ts`, `@/lib/supabase/client.ts`, `@/lib/admin-auth.ts`

---

## Pre-flight

Before starting, create and switch to the feature branch:

```bash
git checkout -b claude/admin-dashboard-fixes
```

---

### Task 1: Move Sidebar into Shared Layout

**Files:**
- Modify: `app/admin/layout.tsx`
- Modify: `app/admin/page.tsx` (remove sidebar + all section rendering)

**Step 1: Write failing Playwright test**

In `tests/admin.spec.ts`, add inside the existing `Admin Dashboard` describe block:

```typescript
test('sidebar is present on every admin route', async ({ page }) => {
  const routes = ['/admin', '/admin/products', '/admin/orders', '/admin/feature-flags'];
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('navigation', { name: 'Admin navigation' })).toBeVisible();
  }
});

test('active sidebar link has aria-current', async ({ page }) => {
  await page.goto('/admin/products');
  const activeLink = page.getByRole('link', { name: 'Products' });
  await expect(activeLink).toHaveAttribute('aria-current', 'page');
});

test('browser back button navigates between admin sections', async ({ page }) => {
  await page.goto('/admin');
  await page.getByRole('link', { name: 'Products' }).click();
  await expect(page).toHaveURL('/admin/products');
  await page.goBack();
  await expect(page).toHaveURL('/admin');
});
```

**Step 2: Run to confirm failure**

```bash
npx playwright test tests/admin.spec.ts --grep "sidebar is present" --project=chromium
```
Expected: FAIL — navigation role not found

**Step 3: Replace `app/admin/layout.tsx` with shared sidebar layout**

```typescript
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import AdminSidebar from "./AdminSidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Admin | tsgabrielle",
  description: "Administrative dashboard.",
  path: "/admin"
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex font-light text-[#111]">
      <AdminSidebar />
      <main className="flex-1 p-12 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
```

**Step 4: Create `app/admin/AdminSidebar.tsx`**

```typescript
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Settings, Image as ImageIcon, Users, Menu,
  Layers, FileText, ShoppingBag, Palette, CreditCard,
  BarChart3, Bell, Mail, ChevronRight, LogOut, Languages
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const SIDEBAR_ITEMS = [
  { id: "dashboard",     label: "Dashboard",      icon: LayoutDashboard, href: "/admin" },
  { id: "settings",      label: "Site Settings",  icon: Settings,        href: "/admin/settings" },
  { id: "hero",          label: "Hero Banner",     icon: ImageIcon,       href: "/admin/hero" },
  { id: "about",         label: "About Page",      icon: Users,           href: "/admin/about" },
  { id: "nav",           label: "Navigation",      icon: Menu,            href: "/admin/nav" },
  { id: "footer",        label: "Footer",          icon: Layers,          href: "/admin/footer" },
  { id: "categories",    label: "Categories",      icon: ShoppingBag,     href: "/admin/categories" },
  { id: "collections",   label: "Collections",     icon: ShoppingBag,     href: "/admin/collections" },
  { id: "pages",         label: "Pages",           icon: FileText,        href: "/admin/pages" },
  { id: "products",      label: "Products",        icon: ShoppingBag,     href: "/admin/products" },
  { id: "orders",        label: "Orders",          icon: CreditCard,      href: "/admin/orders" },
  { id: "design",        label: "Theme & Design",  icon: Palette,         href: "/admin/design" },
  { id: "checkout",      label: "Checkout",        icon: CreditCard,      href: "/admin/checkout" },
  { id: "seo",           label: "SEO & Analytics", icon: BarChart3,       href: "/admin/seo" },
  { id: "notifications", label: "Notifications",   icon: Bell,            href: "/admin/notifications" },
  { id: "email",         label: "Email Center",    icon: Mail,            href: "/admin/email" },
  { id: "translations",  label: "Translations",    icon: Languages,       href: "/admin/translations" },
  { id: "feature-flags", label: "Feature Flags",   icon: Settings,        href: "/admin/feature-flags" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-white border-r border-black/5 flex flex-col sticky top-0 h-screen z-40">
      <div className="p-8 border-b border-black/5">
        <h1 className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#a932bd]">tsgabrielle®</h1>
        <p className="text-[8px] text-black/40 uppercase tracking-widest mt-2">Admin Command Center</p>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 overflow-y-auto py-6">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`w-full flex items-center justify-between px-8 py-4 text-[10px] uppercase tracking-widest transition-all ${
                active
                  ? "bg-[#a932bd]/5 text-[#a932bd] font-bold border-r-2 border-[#a932bd]"
                  : "text-black/40 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={14} aria-hidden="true" />
                <span>{item.label}</span>
              </div>
              {active && <ChevronRight size={12} aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-black/5">
        <button
          onClick={handleSignOut}
          aria-label="Sign out of admin"
          className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
        >
          <LogOut size={14} aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
```

**Step 5: Simplify `app/admin/page.tsx` to dashboard overview only**

Remove the sidebar, all useState tab switching, and all section rendering. Keep only `DashboardOverview`. Also remove the dead `{false && ...}` block and fix the fake visitor count:

```typescript
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-serif text-black/80">Dashboard</h2>
          <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">Peach Phoenix, LLC. Operations</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-[8px] font-bold uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Store Active
          </div>
        </div>
      </header>
      <section className="bg-white rounded-2xl border border-black/5 p-10 shadow-sm mb-12">
        <DashboardOverview />
      </section>
    </div>
  );
}

function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setStats([
          { label: "Total Revenue",    value: `$${data.totalRevenue?.toLocaleString()}`,  change: "+0%" },
          { label: "Active Orders",    value: data.activeOrders,                           change: "+0"  },
          { label: "Avg. Order Value", value: `$${data.avgOrderValue?.toFixed(2)}`,        change: "+0%" },
          { label: "Total Products",   value: data.totalProducts,                          change: "+0"  },
        ]);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-4 gap-8">
        {stats?.map((stat: any, i: number) => (
          <div key={i} className="p-6 border border-black/5 rounded-xl bg-[#fdfcf5]/50 hover:shadow-md transition-shadow">
            <p className="text-[8px] uppercase tracking-widest text-black/40 mb-2">{stat.label}</p>
            <p className="text-2xl font-serif">{stat.value}</p>
            <p className={`text-[8px] mt-2 font-bold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {stat.change} <span className="text-black/20 font-light">since last update</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 6: Run tests**

```bash
npx playwright test tests/admin.spec.ts --project=chromium
```
Expected: sidebar tests PASS, existing tests still PASS

**Step 7: Commit**

```bash
git add app/admin/layout.tsx app/admin/AdminSidebar.tsx app/admin/page.tsx
git commit -m "refactor(admin): move sidebar to shared layout, convert tabs to routes"
```

---

### Task 2: Create Section Page Files

**Files:**
- Create: `app/admin/settings/page.tsx`
- Create: `app/admin/hero/page.tsx`
- Create: `app/admin/about/page.tsx`
- Create: `app/admin/nav/page.tsx`
- Create: `app/admin/footer/page.tsx`
- Create: `app/admin/categories/page.tsx`
- Create: `app/admin/collections/page.tsx`
- Create: `app/admin/pages/page.tsx`
- Create: `app/admin/design/page.tsx`
- Create: `app/admin/checkout/page.tsx`
- Create: `app/admin/seo/page.tsx`
- Create: `app/admin/notifications/page.tsx`
- Create: `app/admin/email/page.tsx`
- Create: `app/admin/translations/page.tsx`

**Step 1: Write failing test**

In `tests/admin.spec.ts`, add:

```typescript
test('each admin section route loads without crash', async ({ page }) => {
  const sections = [
    '/admin/settings', '/admin/hero', '/admin/about', '/admin/nav',
    '/admin/footer', '/admin/categories', '/admin/collections', '/admin/pages',
    '/admin/design', '/admin/checkout', '/admin/seo', '/admin/notifications',
    '/admin/email', '/admin/translations',
  ];
  for (const route of sections) {
    await page.goto(route);
    await expect(page.getByRole('navigation', { name: 'Admin navigation' })).toBeVisible();
    await expect(page.locator('h2')).toBeVisible();
  }
});
```

**Step 2: Run to confirm failure**

```bash
npx playwright test tests/admin.spec.ts --grep "each admin section route" --project=chromium
```
Expected: FAIL — 404s

**Step 3: Create a shared page header helper**

Create `app/admin/AdminPageHeader.tsx`:

```typescript
interface AdminPageHeaderProps {
  title: string;
  description?: string;
}

export default function AdminPageHeader({ title, description }: AdminPageHeaderProps) {
  return (
    <header className="flex justify-between items-end mb-12">
      <div>
        <h2 className="text-3xl font-serif text-black/80 capitalize">{title}</h2>
        {description && (
          <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">{description}</p>
        )}
      </div>
    </header>
  );
}
```

**Step 4: Create each section page**

Use this pattern for each file. Replace `[Title]`, `[description]`, and `[Component]` per the table below:

```typescript
import AdminPageHeader from "../AdminPageHeader";
import [Component] from "@/components/admin/[Component]";

export default function Admin[Title]Page() {
  return (
    <div>
      <AdminPageHeader title="[Title]" description="[description]" />
      <section className="bg-white rounded-2xl border border-black/5 p-10 shadow-sm">
        <[Component] />
      </section>
    </div>
  );
}
```

| File | Title | Description | Component |
|---|---|---|---|
| `settings/page.tsx` | Site Settings | Global configuration | `SiteSettingsManager` from `@/components/admin/SiteSettingsManager` |
| `hero/page.tsx` | Hero Banner | Manage homepage slides | `SiteSettingsManager` from `@/components/admin/SiteSettingsManager` |
| `about/page.tsx` | About Page | Edit about content | `ContentPagesManager` from `@/components/admin/ContentPagesManager` |
| `nav/page.tsx` | Navigation | Manage menu structure | `NavigationSection` from `@/components/admin/sections/ContentSections` |
| `footer/page.tsx` | Footer | Footer links and content | `FooterSection` from `@/components/admin/sections/FooterSection` |
| `categories/page.tsx` | Categories | Product category management | `CategorySection` from `@/components/admin/sections/CategorySection` |
| `collections/page.tsx` | Collections | Collection management | `CollectionSection` from `@/components/admin/sections/CollectionSection` |
| `pages/page.tsx` | Pages | CMS page content | `ContentPagesManager` from `@/components/admin/ContentPagesManager` |
| `design/page.tsx` | Theme & Design | Brand and theme settings | `ThemeSection` from `@/components/admin/sections/ThemeSection` |
| `checkout/page.tsx` | Checkout | Checkout configuration | `CheckoutSection` from `@/components/admin/sections/CheckoutSection` |
| `seo/page.tsx` | SEO & Analytics | Analytics and SEO settings | `AnalyticsSection` from `@/components/admin/sections/AnalyticsSection` |
| `notifications/page.tsx` | Notifications | Notification settings | `NotificationSection` from `@/components/admin/sections/NotificationSection` |
| `email/page.tsx` | Email Center | Email templates and sends | `EmailSection` from `@/components/admin/sections/EmailSection` |
| `translations/page.tsx` | Translations | Language and i18n | `TranslationSection` from `@/components/admin/sections/TranslationSection` |

**Step 5: Run tests**

```bash
npx playwright test tests/admin.spec.ts --grep "each admin section route" --project=chromium
```
Expected: PASS

**Step 6: Commit**

```bash
git add app/admin/*/page.tsx app/admin/AdminPageHeader.tsx
git commit -m "feat(admin): add route-based section pages for all sidebar items"
```

---

### Task 3: Fix Products Page — Search, Filter, Export, Delete

**Files:**
- Modify: `app/admin/products/page.tsx`
- Create: `app/admin/products/DeleteProductButton.tsx`
- Modify: `app/api/admin/products/route.ts` (verify DELETE handler exists or add it)

**Step 1: Check if DELETE route exists**

```bash
grep -n "DELETE" app/api/admin/products/route.ts
```

If DELETE is missing, add to `app/api/admin/products/route.ts`:

```typescript
export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("products")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

**Step 2: Write failing tests**

In `tests/admin.spec.ts`, add:

```typescript
test.describe('Products page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/products');
  });

  test('search input filters products', async ({ page }) => {
    const search = page.getByRole('searchbox', { name: 'Search products' });
    await expect(search).toBeVisible();
    await search.fill('nonexistent-xyz-123');
    await expect(page.getByText('No products found')).toBeVisible();
  });

  test('export button downloads CSV', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /export/i }).click(),
    ]);
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('delete button shows confirmation dialog', async ({ page }) => {
    const deleteBtn = page.getByRole('button', { name: /delete/i }).first();
    await deleteBtn.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/are you sure/i)).toBeVisible();
  });
});
```

**Step 3: Run to confirm failure**

```bash
npx playwright test tests/admin.spec.ts --grep "Products page" --project=chromium
```
Expected: FAIL

**Step 4: Convert `app/admin/products/page.tsx` to a Client Component with wired-up controls**

Replace the entire file content with:

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProductRow {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: string;
  isActive: boolean;
}

export default function AdminProductsPage() {
  const [allRows, setAllRows] = useState<ProductRow[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "draft">("all");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ProductRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(res => res.json())
      .then(data => {
        const products = Array.isArray(data) ? data : (data.products ?? []);
        setAllRows(products.map((p: any) => {
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
            price: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p.price_cents / 100),
            stock: stockStatus,
            isActive: p.active,
          };
        }));
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const rows = allRows
    .filter(r => filter === "all" ? true : filter === "active" ? r.isActive : !r.isActive)
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.sku.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
    );

  const handleExport = () => {
    const header = ["Product", "SKU", "Category", "Price", "Availability", "Status"];
    const csvRows = [header, ...rows.map(r => [r.name, r.sku, r.category, r.price, r.stock, r.isActive ? "Active" : "Draft"])];
    const csv = csvRows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      setAllRows(prev => prev.filter(r => r.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="px-6 py-10 md:px-10">
      <div className="container-luxe space-y-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-wide text-[#111111]">Product Inventory</h1>
            <p className="mt-2 text-lg font-light text-[#555555]">Manage your catalog, variants, and stock levels.</p>
          </div>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded bg-[#a932bd] px-8 py-4 text-base font-light text-white transition-colors hover:bg-[#921fa6]"
          >
            + Add New Product
          </Link>
        </header>

        <div className="border border-[#e7e7e7] bg-white p-6">
          <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between border-b border-[#e7e7e7]">
            <input
              role="searchbox"
              aria-label="Search products"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-xl rounded border border-[#e7e7e7] bg-white px-5 py-3.5 text-base font-light text-[#111111] placeholder:text-[#555555] focus:border-[#a932bd] focus:outline-none"
              placeholder="Search products, SKUs, or categories..."
            />
            <div className="flex gap-3">
              <select
                aria-label="Filter by status"
                value={filter}
                onChange={e => setFilter(e.target.value as any)}
                className="rounded border border-[#e7e7e7] bg-white px-6 py-3.5 text-base font-light text-[#111111] transition-colors hover:bg-[#e7e7e7] cursor-pointer"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
              <button
                aria-label="Export products as CSV"
                onClick={handleExport}
                className="rounded border border-[#e7e7e7] bg-white px-6 py-3.5 text-base font-light text-[#111111] transition-colors hover:bg-[#e7e7e7]"
              >
                Export
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-[#a932bd]">Loading...</div>
          ) : (
            <div className="overflow-x-auto pt-6">
              <table aria-label="Product inventory" className="w-full text-left font-light border-collapse">
                <thead>
                  <tr className="border-b border-[#e7e7e7] text-sm uppercase tracking-wide text-[#555555]">
                    <th scope="col" className="px-4 py-4 font-light">Product</th>
                    <th scope="col" className="px-4 py-4 font-light">SKU</th>
                    <th scope="col" className="px-4 py-4 font-light">Category</th>
                    <th scope="col" className="px-4 py-4 font-light">Price</th>
                    <th scope="col" className="px-4 py-4 font-light">Availability</th>
                    <th scope="col" className="px-4 py-4 font-light text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7e7e7]">
                  {rows.length > 0 ? rows.map(row => (
                    <tr key={row.id} className="transition-colors hover:bg-[#f9f9f9]">
                      <td className="px-4 py-6 text-[#111111]">
                        <div className="flex flex-col gap-1">
                          <span className="text-lg">{row.name}</span>
                          <span className="text-sm text-[#555555]">{row.isActive ? "Active" : "Draft"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-base text-[#555555]">{row.sku}</td>
                      <td className="px-4 py-6 text-base text-[#555555]">{row.category}</td>
                      <td className="px-4 py-6 text-lg text-[#111111]">{row.price}</td>
                      <td className="px-4 py-6">
                        <span className={`text-base ${row.stock.includes("In Stock") ? "text-[#a932bd]" : row.stock.includes("Low") ? "text-[#111111]" : "text-[#555555]"}`}>
                          {row.stock}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-right">
                        <div className="flex justify-end gap-4 text-base">
                          <Link href={`/admin/products/${row.id}`} className="text-[#a932bd] transition-colors hover:text-[#921fa6]">
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(row)}
                            className="text-[#555555] transition-colors hover:text-red-600"
                            aria-label={`Delete ${row.name}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-20 text-center">
                        <div className="mx-auto flex max-w-[300px] flex-col items-center gap-4 text-[#555555]">
                          <p className="text-lg text-[#111111]">No products found</p>
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
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl">
            <h3 id="delete-dialog-title" className="text-xl font-serif text-[#111] mb-4">Are you sure?</h3>
            <p className="text-base text-[#555] mb-8">
              This will delete <strong>{deleteTarget.name}</strong>. This action can be undone by restoring from the database.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-6 py-3 rounded border border-[#e7e7e7] text-[#111] hover:bg-[#f9f9f9] text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-3 rounded bg-red-500 text-white hover:bg-red-600 text-sm disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
```

**Step 5: Run tests**

```bash
npx playwright test tests/admin.spec.ts --grep "Products page" --project=chromium
```
Expected: PASS

**Step 6: Commit**

```bash
git add app/admin/products/page.tsx app/api/admin/products/route.ts
git commit -m "feat(admin): wire up product search, filter, export, and delete with confirmation"
```

---

### Task 4: Build Real Orders Page

**Files:**
- Modify: `app/admin/orders/page.tsx`

**Step 1: Write failing test**

In `tests/admin.spec.ts`, add:

```typescript
test('orders page shows table with columns', async ({ page }) => {
  await page.goto('/admin/orders');
  await expect(page.getByRole('table', { name: /orders/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /customer/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /total/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /status/i })).toBeVisible();
});
```

**Step 2: Run to confirm failure**

```bash
npx playwright test tests/admin.spec.ts --grep "orders page shows table" --project=chromium
```
Expected: FAIL

**Step 3: Replace `app/admin/orders/page.tsx`**

```typescript
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminPageHeader from "../AdminPageHeader";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const auth = await requireAdmin();
  if (auth.error) redirect("/");

  const supabase = getSupabaseServerClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, created_at, total_cents, status, paypal_status, printful_status, shipping_name, shipping_email")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) console.error("Failed to fetch orders:", error);
  const rows = orders ?? [];

  return (
    <div>
      <AdminPageHeader title="Orders" description="Payment and fulfillment status" />
      <section className="bg-white rounded-2xl border border-black/5 p-10 shadow-sm">
        <div className="overflow-x-auto">
          <table aria-label="Orders" className="w-full text-left font-light border-collapse">
            <thead>
              <tr className="border-b border-[#e7e7e7] text-sm uppercase tracking-wide text-[#555555]">
                <th scope="col" className="px-4 py-4 font-light">Order ID</th>
                <th scope="col" className="px-4 py-4 font-light">Customer</th>
                <th scope="col" className="px-4 py-4 font-light">Date</th>
                <th scope="col" className="px-4 py-4 font-light">Total</th>
                <th scope="col" className="px-4 py-4 font-light">Status</th>
                <th scope="col" className="px-4 py-4 font-light text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7e7e7]">
              {rows.length > 0 ? rows.map(order => (
                <tr key={order.id} className="transition-colors hover:bg-[#f9f9f9]">
                  <td className="px-4 py-6 text-sm text-[#555]">#{order.id.slice(0, 8)}</td>
                  <td className="px-4 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-base text-[#111]">{order.shipping_name || "—"}</span>
                      <span className="text-sm text-[#555]">{order.shipping_email || ""}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-base text-[#555]">
                    {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-6 text-base text-[#111]">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((order.total_cents ?? 0) / 100)}
                  </td>
                  <td className="px-4 py-6">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      order.paypal_status === "COMPLETED" ? "bg-green-100 text-green-700" :
                      order.paypal_status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {order.paypal_status ?? order.status ?? "Unknown"}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="text-[#a932bd] hover:text-[#921fa6] text-base">
                      View
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-20 text-center text-[#555]">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
```

**Step 4: Run tests**

```bash
npx playwright test tests/admin.spec.ts --grep "orders page shows table" --project=chromium
```
Expected: PASS

**Step 5: Commit**

```bash
git add app/admin/orders/page.tsx
git commit -m "feat(admin): build real orders page with Supabase data"
```

---

### Task 5: Build Real Order Detail Page

**Files:**
- Modify: `app/admin/orders/[id]/page.tsx`

**Step 1: Write failing test**

```typescript
test('order detail page shows order info', async ({ page }) => {
  await page.goto('/admin/orders');
  const firstViewLink = page.getByRole('link', { name: /view/i }).first();
  const count = await firstViewLink.count();
  if (count === 0) {
    // No orders — skip gracefully
    return;
  }
  await firstViewLink.click();
  await expect(page.getByText(/order #/i)).toBeVisible();
  await expect(page.getByText(/customer/i)).toBeVisible();
});
```

**Step 2: Replace `app/admin/orders/[id]/page.tsx`**

```typescript
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AdminPageHeader from "../../AdminPageHeader";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const auth = await requireAdmin();
  if (auth.error) redirect("/");

  const supabase = getSupabaseServerClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id, quantity, unit_price_cents, product_title, variant_title
      )
    `)
    .eq("id", id)
    .single();

  if (error || !order) notFound();

  const formatCents = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

  return (
    <div>
      <AdminPageHeader title={`Order #${order.id.slice(0, 8)}`} description="Payment, fulfillment, and customer details" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Customer */}
        <section className="bg-white rounded-2xl border border-black/5 p-8 shadow-sm">
          <h3 className="text-[10px] uppercase tracking-widest text-[#a932bd] font-bold mb-6">Customer</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4"><dt className="text-[#555] w-32">Name</dt><dd className="text-[#111]">{order.shipping_name || "—"}</dd></div>
            <div className="flex gap-4"><dt className="text-[#555] w-32">Email</dt><dd className="text-[#111]">{order.shipping_email || "—"}</dd></div>
            <div className="flex gap-4"><dt className="text-[#555] w-32">Date</dt><dd className="text-[#111]">{new Date(order.created_at).toLocaleString()}</dd></div>
          </dl>
        </section>

        {/* Status */}
        <section className="bg-white rounded-2xl border border-black/5 p-8 shadow-sm">
          <h3 className="text-[10px] uppercase tracking-widest text-[#a932bd] font-bold mb-6">Status</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4"><dt className="text-[#555] w-32">PayPal</dt><dd className="text-[#111] font-bold">{order.paypal_status || "—"}</dd></div>
            <div className="flex gap-4"><dt className="text-[#555] w-32">Printful</dt><dd className="text-[#111] font-bold">{order.printful_status || "—"}</dd></div>
            <div className="flex gap-4"><dt className="text-[#555] w-32">Total</dt><dd className="text-[#111] font-bold">{formatCents(order.total_cents ?? 0)}</dd></div>
          </dl>
        </section>
      </div>

      {/* Line items */}
      <section className="bg-white rounded-2xl border border-black/5 p-8 shadow-sm mb-8">
        <h3 className="text-[10px] uppercase tracking-widest text-[#a932bd] font-bold mb-6">Items</h3>
        <table aria-label="Order items" className="w-full text-left font-light border-collapse">
          <thead>
            <tr className="border-b border-[#e7e7e7] text-sm uppercase tracking-wide text-[#555]">
              <th scope="col" className="px-4 py-3 font-light">Product</th>
              <th scope="col" className="px-4 py-3 font-light">Variant</th>
              <th scope="col" className="px-4 py-3 font-light">Qty</th>
              <th scope="col" className="px-4 py-3 font-light text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e7e7]">
            {(order.order_items ?? []).map((item: any) => (
              <tr key={item.id}>
                <td className="px-4 py-4 text-[#111]">{item.product_title}</td>
                <td className="px-4 py-4 text-[#555]">{item.variant_title || "—"}</td>
                <td className="px-4 py-4 text-[#555]">{item.quantity}</td>
                <td className="px-4 py-4 text-right text-[#111]">{formatCents(item.unit_price_cents * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Link href="/admin/orders" className="text-sm text-[#a932bd] hover:text-[#921fa6]">
        ← Back to Orders
      </Link>
    </div>
  );
}
```

**Step 3: Run tests**

```bash
npx playwright test tests/admin.spec.ts --grep "order detail" --project=chromium
```

**Step 4: Commit**

```bash
git add app/admin/orders/[id]/page.tsx
git commit -m "feat(admin): build real order detail page with line items and status"
```

---

### Task 6: Build Real Feature Flags Page

**Files:**
- Modify: `app/admin/feature-flags/page.tsx`
- Modify: `app/api/feature-flags/route.ts` (add PATCH handler)

**Step 1: Write failing test**

```typescript
test('feature flags page shows toggle switches', async ({ page }) => {
  await page.goto('/admin/feature-flags');
  await expect(page.getByRole('heading', { name: /feature flags/i })).toBeVisible();
  await expect(page.getByRole('switch').first()).toBeVisible();
});
```

**Step 2: Add PATCH to `app/api/feature-flags/route.ts`**

```typescript
export async function PATCH(request: Request) {
  const { key, enabled } = await request.json();
  if (!key || typeof enabled !== "boolean") {
    return NextResponse.json({ error: "Missing key or enabled" }, { status: 400 });
  }
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("feature_flags")
    .update({ enable_3d_hero: enabled })
    .eq("key", key);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

**Step 3: Replace `app/admin/feature-flags/page.tsx`**

```typescript
"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "../AdminPageHeader";

interface Flag {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function AdminFeatureFlagsPage() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = await import("@/lib/supabase/client").then(m => m.getSupabaseBrowserClient());
      const { data } = await supabase.from("feature_flags").select("*");
      setFlags(
        (data ?? []).map((row: any) => ({
          key: row.key,
          label: row.key.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
          description: row.description ?? "",
          enabled: row.enable_3d_hero ?? false,
        }))
      );
      setLoading(false);
    }
    load();
  }, []);

  const toggle = async (key: string, current: boolean) => {
    setSaving(key);
    try {
      await fetch("/api/feature-flags", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, enabled: !current }),
      });
      setFlags(prev => prev.map(f => f.key === key ? { ...f, enabled: !current } : f));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Feature Flags" description="Toggle runtime behaviors without redeployment" />
      <section className="bg-white rounded-2xl border border-black/5 p-10 shadow-sm">
        {loading ? (
          <p className="text-[#555] text-sm">Loading flags...</p>
        ) : flags.length === 0 ? (
          <p className="text-[#555] text-sm">No feature flags found.</p>
        ) : (
          <ul className="space-y-6">
            {flags.map(flag => (
              <li key={flag.key} className="flex items-center justify-between py-4 border-b border-[#e7e7e7] last:border-0">
                <div>
                  <p className="text-base font-medium text-[#111]">{flag.label}</p>
                  {flag.description && <p className="text-sm text-[#555] mt-1">{flag.description}</p>}
                  <p className="text-xs text-[#aaa] mt-1 font-mono">{flag.key}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={flag.enabled}
                  aria-label={`Toggle ${flag.label}`}
                  disabled={saving === flag.key}
                  onClick={() => toggle(flag.key, flag.enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#a932bd] disabled:opacity-50 ${
                    flag.enabled ? "bg-[#a932bd]" : "bg-gray-200"
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${flag.enabled ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
```

**Step 4: Run tests**

```bash
npx playwright test tests/admin.spec.ts --grep "feature flags" --project=chromium
```
Expected: PASS

**Step 5: Commit**

```bash
git add app/admin/feature-flags/page.tsx app/api/feature-flags/route.ts
git commit -m "feat(admin): build real feature flags page with live toggles"
```

---

### Task 7: Final Verification & PR

**Step 1: Run full test suite**

```bash
npx playwright test tests/admin.spec.ts --project=chromium
```
Expected: All tests PASS

**Step 2: Run typecheck and lint**

```bash
npm run typecheck && npm run lint
```
Expected: No errors

**Step 3: Push and open PR**

```bash
git push -u origin claude/admin-dashboard-fixes
```

Then open PR on GitHub: `https://github.com/Peach-Phoenix-LLC/tsgabrielle/compare/claude/admin-dashboard-fixes`

PR title: `feat(admin): route-based navigation, real data pages, accessible controls`
