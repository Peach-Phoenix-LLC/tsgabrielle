"use client";

import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, Settings, Image, Users, Menu, 
  Layers, FileText, ShoppingBag, Palette, CreditCard, 
  BarChart3, Bell, LogOut, ChevronRight, Mail, Loader2
} from "lucide-react";

// Sections
import ProductSection from "@/components/admin/sections/ProductSection";
import ThemeSection from "@/components/admin/sections/ThemeSection";
import CheckoutSection from "@/components/admin/sections/CheckoutSection";
import NotificationSection from "@/components/admin/sections/NotificationSection";
import AnalyticsSection from "@/components/admin/sections/AnalyticsSection";
import EmailSection from "@/components/admin/sections/EmailSection";
import CategorySection from "@/components/admin/sections/CategorySection";
import CollectionSection from "@/components/admin/sections/CollectionSection";
import FooterSection from "@/components/admin/sections/FooterSection";
import { 
  HeroBannerSection, 
  AboutPageSection, 
  NavigationSection
} from "@/components/admin/sections/ContentSections";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import ContentPagesManager from "@/components/admin/ContentPagesManager";

const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "settings", label: "Site Settings", icon: Settings },
  { id: "hero", label: "Hero Banner", icon: Image },
  { id: "about", label: "About Page", icon: Users },
  { id: "nav", label: "Navigation", icon: Menu },
  { id: "footer", label: "Footer", icon: Layers },
  { id: "categories", label: "Categories", icon: ShoppingBag },
  { id: "collections", label: "Collections", icon: ShoppingBag },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "orders", label: "Orders", icon: CreditCard },
  { id: "design", label: "Theme & Design", icon: Palette },
  { id: "checkout", label: "Checkout", icon: CreditCard },
  { id: "seo", label: "SEO & Analytics", icon: BarChart3 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "email", label: "Email Center", icon: Mail },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex font-light text-[#111]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-black/5 flex flex-col sticky top-0 h-screen z-40">
        <div className="p-8 border-b border-black/5">
          <h1 className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#a932bd]">tsgabrielle®</h1>
          <p className="text-[8px] text-black/40 uppercase tracking-widest mt-2">Admin Command Center</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-8 py-4 text-[10px] uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? "bg-[#a932bd]/5 text-[#a932bd] font-bold border-r-2 border-[#a932bd]" 
                    : "text-black/40 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={14} />
                  <span>{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight size={12} />}
              </button>
            );
          })}
        </nav>

        <div className="p-8 border-t border-black/5">
          <button 
            onClick={async () => {
              const { createClient } = await import("@supabase/supabase-js");
              const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
              );
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto h-screen">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif text-black/80 capitalize">{activeTab.replace("-", " ")}</h2>
            <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">Peach Phoenix, LLC. Operations</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-[8px] font-bold uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Store Active
            </div>
          </div>
        </header>

        {/* Dynamic Section Content */}
        <section className="bg-white rounded-2xl border border-black/5 p-10 shadow-sm mb-12">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "settings" && <SiteSettingsManager />}
          {activeTab === "products" && <ProductSection />}
          {activeTab === "design" && <ThemeSection />}
          {activeTab === "checkout" && <CheckoutSection />}
          {activeTab === "notifications" && <NotificationSection />}
          {activeTab === "email" && <EmailSection />}
          {activeTab === "hero" && <SiteSettingsManager />}
          {activeTab === "about" && <ContentPagesManager />}
          {activeTab === "nav" && <NavigationSection />}
          {activeTab === "footer" && <FooterSection />}
          {activeTab === "categories" && <CategorySection />}
          {activeTab === "collections" && <CollectionSection />}
          {activeTab === "seo" && <AnalyticsSection />}
          {activeTab === "pages" && <ContentPagesManager />}
          
          {false && (
             <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-[#fdfcf5] flex items-center justify-center text-[#a932bd] animate-bounce">
                  <FileText size={24} />
               </div>
               <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Transcendence in progress...</p>
               <p className="text-[8px] uppercase tracking-widest text-black/40">This module is being provisioned for the Stage 3 launch.</p>
             </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Sub-components for Dashboard
function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setStats([
          { label: "Total Revenue", value: `$${data.totalRevenue?.toLocaleString()}`, change: "+0%" },
          { label: "Active Orders", value: data.activeOrders, change: "+0" },
          { label: "Avg. Order Value", value: `$${data.avgOrderValue?.toFixed(2)}`, change: "+0%" },
          { label: "Total Products", value: data.totalProducts, change: "+0" },
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
          <div key={i} className="p-6 border border-black/5 rounded-xl bg-[#fdfcf5]/50">
            <p className="text-[8px] uppercase tracking-widest text-black/40 mb-2">{stat.label}</p>
            <p className="text-2xl font-serif">{stat.value}</p>
            <p className={`text-[8px] mt-2 font-bold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {stat.change} <span className="text-black/20 font-light">since last update</span>
            </p>
          </div>
        ))}
      </div>
      
      <div className="h-64 bg-black/[0.02] border border-dashed border-black/10 rounded-2xl flex items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-black/20 italic">Visual Analytics Mapping (Active Real-time Feed)</p>
      </div>
    </div>
  );
}


