"use client";

import { useState } from "react";

const BRAND = "#a932bd";
const LIGHT = "#e7e7e7";
const BG = "#ffffff";

// ── tiny helpers ────────────────────────────────────────────────
const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const pct = (n: number) => `${n > 0 ? "+" : ""}${n}%`;

// ── sample data ─────────────────────────────────────────────────
const kpis = [
  { label: "Revenue (MTD)", value: fmt(84320), delta: +18, icon: "💰" },
  { label: "Orders", value: "1,247", delta: +12, icon: "📦" },
  { label: "Avg Order Value", value: fmt(67), delta: +4, icon: "🛒" },
  { label: "Active Customers", value: "3,891", delta: +9, icon: "👥" },
  { label: "Conversion Rate", value: "3.8%", delta: +0.4, icon: "📈" },
  { label: "Net Profit", value: fmt(29450), delta: +22, icon: "✨" },
];

const orders = [
  { id: "#TS-8821", customer: "Mia Laurent", product: "Peach Phoenix Hoodie", status: "Shipped", payment: "PayPal", amount: "$89", date: "Mar 3" },
  { id: "#TS-8820", customer: "Jordan Wells", product: "TransLove™ Tee", status: "Printing", payment: "Apple Pay", amount: "$42", date: "Mar 3" },
  { id: "#TS-8819", customer: "Sofia Reyes", product: "Paris Tote Bag", status: "Delivered", payment: "Credit Card", amount: "$55", date: "Mar 2" },
  { id: "#TS-8818", customer: "Alex Chen", product: "Crystal Skies Mug", status: "Received", payment: "Venmo", amount: "$28", date: "Mar 2" },
  { id: "#TS-8817", customer: "Dana Moreau", product: "Arizona Sweatshirt", status: "Packing", payment: "Google Pay", amount: "$78", date: "Mar 1" },
  { id: "#TS-8816", customer: "Riley Park", product: "Unicorn Cap", status: "Delivered", payment: "PayPal Credit", amount: "$35", date: "Mar 1" },
];

const products = [
  { name: "Peach Phoenix Hoodie", collection: "Peach Phoenix™", price: "$89", cost: "$38", margin: "57%", stock: 142, status: "Active", img: "🧥" },
  { name: "TransLove™ Tee", collection: "TransLove™", price: "$42", cost: "$16", margin: "62%", stock: 87, status: "Active", img: "👕" },
  { name: "Paris Tote Bag", collection: "Paris", price: "$55", cost: "$21", margin: "62%", stock: 0, status: "Out of Stock", img: "👜" },
  { name: "Crystal Skies Mug", collection: "Crystal Skies.", price: "$28", cost: "$9", margin: "68%", stock: 214, status: "Active", img: "☕" },
  { name: "Arizona Sweatshirt", collection: "Arizona 🌵", price: "$78", cost: "$32", margin: "59%", stock: 56, status: "Active", img: "🧸" },
  { name: "Unicorn Cap", collection: "Unicorn 🦄", price: "$35", cost: "$13", margin: "63%", stock: 12, status: "Low Stock", img: "🦄" },
];

const customers = [
  { name: "Mia Laurent", email: "mia@example.com", orders: 14, ltv: "$1,240", tier: "Gold", risk: "Low", joined: "Jan 2024" },
  { name: "Jordan Wells", email: "jordan@example.com", orders: 7, ltv: "$580", tier: "Silver", risk: "Low", joined: "Mar 2024" },
  { name: "Sofia Reyes", email: "sofia@example.com", orders: 3, ltv: "$165", tier: "Bronze", risk: "Medium", joined: "Nov 2024" },
  { name: "Alex Chen", email: "alex@example.com", orders: 21, ltv: "$2,100", tier: "Platinum", risk: "Low", joined: "Aug 2023" },
  { name: "Dana Moreau", email: "dana@example.com", orders: 1, ltv: "$78", tier: "Bronze", risk: "High", joined: "Feb 2025" },
];

const campaigns = [
  { name: "Spring Launch — Peach Phoenix™", type: "Email", status: "Active", sent: "12,400", open: "38.2%", click: "9.1%", revenue: "$4,820" },
  { name: "Abandoned Cart Recovery", type: "Email Flow", status: "Active", sent: "3,210", open: "52.1%", click: "18.4%", revenue: "$2,340" },
  { name: "TransLove™ Pride SMS Blast", type: "SMS", status: "Scheduled", sent: "—", open: "—", click: "—", revenue: "—" },
  { name: "Win-Back: 90-Day Inactive", type: "Email Flow", status: "Active", sent: "890", open: "29.4%", click: "7.2%", revenue: "$610" },
  { name: "Post-Purchase Upsell", type: "Email Flow", status: "Active", sent: "5,670", open: "44.0%", click: "12.3%", revenue: "$1,890" },
];

const paymentStats = [
  { method: "PayPal", pct: 38, revenue: "$32,040", icon: "🅿️" },
  { method: "Credit Card", pct: 27, revenue: "$22,766", icon: "💳" },
  { method: "Apple Pay", pct: 16, revenue: "$13,491", icon: "🍎" },
  { method: "Google Pay", pct: 11, revenue: "$9,275", icon: "🔵" },
  { method: "Venmo", pct: 5, revenue: "$4,216", icon: "Ⓥ" },
  { method: "Pay Later", pct: 3, revenue: "$2,530", icon: "📅" },
];

const navItems = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "orders", label: "Orders", icon: "📦" },
  { id: "products", label: "Products", icon: "🏷️" },
  { id: "customers", label: "Customers", icon: "👥" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "payments", label: "Payments", icon: "💳" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const statusColor: Record<string, string> = {
  Active: "#22c55e", "Out of Stock": "#ef4444", "Low Stock": "#f97316",
  Shipped: "#3b82f6", Printing: "#a932bd", Delivered: "#22c55e",
  Received: "#6b7280", Packing: "#f59e0b",
  Gold: "#f59e0b", Silver: "#94a3b8", Bronze: "#b45309", Platinum: "#a932bd",
  High: "#ef4444", Medium: "#f97316", Low: "#22c55e",
  Scheduled: "#3b82f6",
};

// ── mini bar chart ───────────────────────────────────────────────
const bars = [42, 58, 51, 67, 73, 61, 89, 94, 78, 102, 95, 118];
const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

export default function Dashboard() {
  const [active, setActive] = useState("overview");
  const [sideOpen, setSideOpen] = useState(true);

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, background: "#f4f4f6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet" />

      {/* ── HEADER ── */}
      <header style={{ background: BRAND, color: "#fff", height: 60, display: "flex", alignItems: "center", padding: "0 28px", gap: 16, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(169,50,189,0.3)" }}>
        <button onClick={() => setSideOpen(o => !o)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", opacity: 0.9 }}>☰</button>
        <span style={{ fontSize: 20, letterSpacing: "0.12em", fontWeight: 300 }}>tsgabrielle<sup style={{ fontSize: 10, opacity: 0.7 }}>®</sup></span>
        <span style={{ marginLeft: 8, opacity: 0.5, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>Admin</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.1em" }}>tsgabrielle.us</span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>G</div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* ── SIDEBAR ── */}
        <aside style={{ width: sideOpen ? 220 : 60, background: "#1a1a2e", transition: "width 0.25s", overflow: "hidden", minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column", paddingTop: 16 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", border: "none", background: active === n.id ? `rgba(169,50,189,0.25)` : "transparent", color: active === n.id ? "#fff" : "rgba(255,255,255,0.55)", cursor: "pointer", textAlign: "left", fontSize: 13, letterSpacing: "0.05em", borderLeft: active === n.id ? `3px solid ${BRAND}` : "3px solid transparent", transition: "all 0.18s", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 16, minWidth: 20, textAlign: "center" }}>{n.icon}</span>
              {sideOpen && <span>{n.label}</span>}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          {sideOpen && <div style={{ padding: "16px 18px", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>PEACH-PHOENIX-LLC © 2026</div>}
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto", color: "#333" }}>

          {/* ════ OVERVIEW ════ */}
          {active === "overview" && (
            <div>
              <PageTitle title="Dashboard Overview" sub="March 2026 · Live data from Printful + PayPal + Klaviyo" />

              {/* KPI grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
                {kpis.map(k => (
                  <div key={k.label} style={card as any}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{k.icon}</div>
                    <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{k.label}</div>
                    <div style={{ fontSize: 26, color: "#111", letterSpacing: "-0.5px" }}>{k.value}</div>
                    <div style={{ fontSize: 12, color: k.delta > 0 ? "#22c55e" : "#ef4444", marginTop: 4 }}>{pct(k.delta)} vs last month</div>
                  </div>
                ))}
              </div>

              {/* Revenue chart */}
              <div style={{ ...(card as any), marginBottom: 28 }}>
                <SectionLabel label="Monthly Revenue" />
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, marginTop: 12 }}>
                  {bars.map((h, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: "100%", height: `${(h / 120) * 100}%`, background: i === 11 ? BRAND : `rgba(169,50,189,0.25)`, borderRadius: "3px 3px 0 0", transition: "height 0.3s" }} />
                      <span style={{ fontSize: 9, color: "#aaa" }}>{months[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent orders + payment split */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
                <div style={card as any}>
                  <SectionLabel label="Recent Orders" action="View All" onAction={() => setActive("orders")} />
                  <OrderTable rows={orders.slice(0, 5)} />
                </div>
                <div style={card as any}>
                  <SectionLabel label="Payment Methods" />
                  <div style={{ marginTop: 12 }}>
                    {paymentStats.map(p => (
                      <div key={p.method} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 16, width: 24 }}>{p.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                            <span style={{ color: "#333" }}>{p.method}</span>
                            <span style={{ color: "#888" }}>{p.revenue}</span>
                          </div>
                          <div style={{ height: 5, background: LIGHT, borderRadius: 3 }}>
                            <div style={{ height: 5, width: `${p.pct}%`, background: BRAND, borderRadius: 3 }} />
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: "#aaa", width: 30, textAlign: "right" }}>{p.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ ORDERS ════ */}
          {active === "orders" && (
            <div>
              <PageTitle title="Order Management" sub="Real-time sync with Printful · All statuses" />
              <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                {["All","Received","Printing","Packing","Shipped","Delivered"].map(s => (
                  <FilterPill key={s} label={s} />
                ))}
              </div>
              <div style={card as any}>
                <OrderTable rows={orders} full />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 20 }}>
                {[{l:"Returns Pending",v:"8"},{l:"Awaiting Payment",v:"3"},{l:"Refunds Issued",v:"12"},{l:"Avg Fulfillment",v:"2.4 days"}].map(s => (
                  <div key={s.l} style={{...(card as any), textAlign:"center"}}>
                    <div style={{ fontSize: 28, color: BRAND }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ PRODUCTS ════ */}
          {active === "products" && (
            <div>
              <PageTitle title="Product Management" sub="Synced from Printful · Pricing & Inventory" />
              <div style={{ display: "flex", gap: 12, marginBottom: 20, justifyContent: "flex-end" }}>
                <Btn label="↻ Sync Printful" />
                <Btn label="+ Add Product" primary />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {products.map(p => (
                  <div key={p.name} style={{ ...(card as any), display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 36 }}>{p.img}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 400, fontSize: 15, color: "#111" }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{p.collection}</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {[{l:"Price",v:p.price},{l:"Cost",v:p.cost},{l:"Margin",v:p.margin}].map(d => (
                        <div key={d.l} style={{ background: "#f9f9f9", borderRadius: 8, padding: "8px 0", textAlign: "center" }}>
                          <div style={{ fontSize: 14, color: BRAND, fontWeight: 400 }}>{d.v}</div>
                          <div style={{ fontSize: 10, color: "#aaa" }}>{d.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>Stock: <strong style={{ color: p.stock === 0 ? "#ef4444" : p.stock < 20 ? "#f97316" : "#22c55e" }}>{p.stock} units</strong></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ CUSTOMERS ════ */}
          {active === "customers" && (
            <div>
              <PageTitle title="Customer Management" sub="Segments · LTV · Loyalty · Churn Risk" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                {[{l:"Total Customers",v:"3,891"},{l:"Avg LTV",v:"$340"},{l:"Churn Risk",v:"142"},{l:"Loyalty Members",v:"1,204"}].map(s => (
                  <div key={s.l} style={{...(card as any), textAlign:"center"}}>
                    <div style={{ fontSize: 24, color: BRAND, fontWeight: 400 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={card as any}>
                <SectionLabel label="Customer List" action="Export CSV" />
                <div style={{ overflowX: "auto", marginTop: 12 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${LIGHT}` }}>
                        {["Name","Email","Orders","LTV","Tier","Churn Risk","Joined"].map(h => (
                          <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#888", fontWeight: 300, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(c => (
                        <tr key={c.name} style={{ borderBottom: `1px solid ${LIGHT}` }}>
                          <td style={td as any}><strong style={{ fontWeight: 400 }}>{c.name}</strong></td>
                          <td style={{...(td as any), color: "#888"}}>{c.email}</td>
                          <td style={td as any}>{c.orders}</td>
                          <td style={{...(td as any), color: BRAND, fontWeight: 400}}>{c.ltv}</td>
                          <td style={td as any}><StatusBadge status={c.tier} /></td>
                          <td style={td as any}><StatusBadge status={c.risk} /></td>
                          <td style={{...(td as any), color: "#888"}}>{c.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ════ MARKETING ════ */}
          {active === "marketing" && (
            <div>
              <PageTitle title="Marketing & Engagement" sub="Klaviyo · Email · SMS · Flows · Segmentation" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                {[{l:"Email Subscribers",v:"12,840"},{l:"Avg Open Rate",v:"38.4%"},{l:"SMS Opt-ins",v:"4,210"},{l:"Marketing ROI",v:"18.4x"}].map(s => (
                  <div key={s.l} style={{...(card as any), textAlign:"center"}}>
                    <div style={{ fontSize: 24, color: BRAND, fontWeight: 400 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, marginBottom: 20 }}>
                <div style={card as any}>
                  <SectionLabel label="Campaigns & Flows" action="+ New Campaign" />
                  <div style={{ overflowX: "auto", marginTop: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${LIGHT}` }}>
                          {["Campaign","Type","Status","Sent","Open Rate","Click Rate","Revenue"].map(h => (
                            <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#888", fontWeight: 300, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map(c => (
                          <tr key={c.name} style={{ borderBottom: `1px solid ${LIGHT}` }}>
                            <td style={td as any}><span style={{ fontWeight: 400 }}>{c.name}</span></td>
                            <td style={td as any}><span style={{ fontSize: 11, background: "#f0e6f6", color: BRAND, padding: "2px 8px", borderRadius: 12 }}>{c.type}</span></td>
                            <td style={td as any}><StatusBadge status={c.status} /></td>
                            <td style={td as any}>{c.sent}</td>
                            <td style={{...(td as any), color: "#22c55e"}}>{c.open}</td>
                            <td style={td as any}>{c.click}</td>
                            <td style={{...(td as any), color: BRAND, fontWeight: 400}}>{c.revenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div style={card as any}>
                  <SectionLabel label="Active Flows" />
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                    {["Welcome Series","Abandoned Cart","Post-Purchase","Win-Back","Review Request","Upsell"].map(f => (
                      <div key={f} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#f9f4fb", borderRadius: 8 }}>
                        <span style={{ fontSize: 12 }}>{f}</span>
                        <span style={{ fontSize: 10, color: "#22c55e", background: "#dcfce7", padding: "2px 8px", borderRadius: 10 }}>Live</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ PAYMENTS ════ */}
          {active === "payments" && (
            <div>
              <PageTitle title="Payments & Checkout" sub="PayPal · Apple Pay · Google Pay · Venmo · Pay Later" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                {[{l:"Total Revenue",v:"$84,320"},{l:"Success Rate",v:"98.2%"},{l:"Avg Transaction",v:"$67"},{l:"Chargebacks",v:"0.08%"}].map(s => (
                  <div key={s.l} style={{...(card as any), textAlign:"center"}}>
                    <div style={{ fontSize: 24, color: BRAND, fontWeight: 400 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={card as any}>
                  <SectionLabel label="Revenue by Payment Method" />
                  <div style={{ marginTop: 16 }}>
                    {paymentStats.map(p => (
                      <div key={p.method} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <span style={{ fontSize: 18, width: 28 }}>{p.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 13 }}>{p.method}</span>
                            <span style={{ fontSize: 13, fontWeight: 400 }}>{p.revenue}</span>
                          </div>
                          <div style={{ height: 6, background: LIGHT, borderRadius: 4 }}>
                            <div style={{ height: 6, width: `${p.pct}%`, background: BRAND, borderRadius: 4 }} />
                          </div>
                        </div>
                        <span style={{ fontSize: 12, color: "#aaa", width: 36, textAlign: "right" }}>{p.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={card as any}>
                  <SectionLabel label="PayPal Configuration" />
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      {l:"Mode", v:"🟢 Live Production"},
                      {l:"Client ID", v:"AZk••••••••••••••••Xp"},
                      {l:"Webhook Status", v:"✅ Connected"},
                      {l:"Smart Buttons", v:"✅ Enabled"},
                      {l:"Pay Later", v:"✅ Enabled"},
                      {l:"Venmo", v:"✅ US only"},
                      {l:"3D Secure", v:"✅ Active"},
                      {l:"PCI DSS", v:"Level 1 Compliant"},
                    ].map(r => (
                      <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${LIGHT}`, fontSize: 13 }}>
                        <span style={{ color: "#666" }}>{r.l}</span>
                        <span style={{ fontWeight: 400 }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ ANALYTICS ════ */}
          {active === "analytics" && (
            <div>
              <PageTitle title="Analytics & Insights" sub="Traffic · Conversions · LTV · Retention · SEO" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
                {[
                  {l:"Monthly Visitors",v:"28,400",delta:"+14%"},
                  {l:"Conversion Rate",v:"3.8%",delta:"+0.4%"},
                  {l:"Customer LTV",v:"$340",delta:"+$28"},
                  {l:"Retention Rate",v:"62%",delta:"+4%"},
                  {l:"CAC",v:"$18.40",delta:"-$2.10"},
                  {l:"Churn Rate",v:"3.6%",delta:"-0.8%"},
                ].map(s => (
                  <div key={s.l} style={{...(card as any), textAlign:"center"}}>
                    <div style={{ fontSize: 24, color: BRAND, fontWeight: 400 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{s.l}</div>
                    <div style={{ fontSize: 11, color: "#22c55e", marginTop: 4 }}>{s.delta}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={card as any}>
                  <SectionLabel label="Top Collections by Revenue" />
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      {n:"Peach Phoenix™", r:"$24,180", p:82},
                      {n:"TransLove™", r:"$18,440", p:63},
                      {n:"Paris", r:"$12,300", p:42},
                      {n:"Arizona 🌵", r:"$9,820", p:33},
                      {n:"Crystal Skies.", r:"$7,640", p:26},
                    ].map(c => (
                      <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 12, width: 130, color: "#444" }}>{c.n}</span>
                        <div style={{ flex: 1, height: 6, background: LIGHT, borderRadius: 3 }}>
                          <div style={{ width: `${c.p}%`, height: 6, background: BRAND, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: "#555", width: 64, textAlign: "right" }}>{c.r}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={card as any}>
                  <SectionLabel label="Traffic Sources" />
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      {n:"Instagram", p:34, c:"#e1306c"},
                      {n:"Organic Search", p:28, c:"#4285F4"},
                      {n:"TikTok", p:18, c:"#010101"},
                      {n:"Direct", p:11, c:"#888"},
                      {n:"Email / Klaviyo", p:9, c:BRAND},
                    ].map(s => (
                      <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 12, width: 130, color: "#444" }}>{s.n}</span>
                        <div style={{ flex: 1, height: 6, background: LIGHT, borderRadius: 3 }}>
                          <div style={{ width: `${s.p}%`, height: 6, background: s.c, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: "#555", width: 36, textAlign: "right" }}>{s.p}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ SETTINGS ════ */}
          {active === "settings" && (
            <div>
              <PageTitle title="Settings & Configuration" sub="Store · Integrations · Team · Security · SEO" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { title: "🏪 Store Settings", items: ["Store name: tsgabrielle®", "Domain: tsgabrielle.us (Vercel DNS)", "Currency: USD", "Timezone: EST", "Language: EN / FR"] },
                  { title: "🔌 Integrations", items: ["✅ Printful API — Connected", "✅ PayPal API — Live Mode", "✅ Klaviyo — Active", "✅ Supabase — Connected", "✅ Vercel — Deployed"] },
                  { title: "👥 Team & Roles", items: ["Owner: Gabrielle (Admin)", "2FA: Enabled for all", "API Keys: 3 active", "Audit Logs: On", "Invitations: 0 pending"] },
                  { title: "🔐 Security", items: ["SSL: Active (Let's Encrypt)", "PCI DSS: Level 1 via PayPal", "GDPR/CCPA: Tools active", "Fraud Detection: On", "Backups: Daily → Supabase"] },
                  { title: "📦 Shipping (Printful)", items: ["Printful fulfillment: Active", "Shipping rates: Real-time", "International: 180+ countries", "Customs docs: Auto-generated", "Return label: Auto-issued"] },
                  { title: "🔍 SEO", items: ["Sitemap: Auto-generated", "Meta tags: Per-page", "Schema markup: Product + Blog", "Redirects: Managed", "Blog: Active"] },
                ].map(s => (
                  <div key={s.title} style={card as any}>
                    <div style={{ fontWeight: 400, fontSize: 14, marginBottom: 12, color: "#111" }}>{s.title}</div>
                    {s.items.map(i => (
                      <div key={i} style={{ fontSize: 12, color: "#555", padding: "6px 0", borderBottom: `1px solid ${LIGHT}` }}>{i}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: BRAND, color: "#fff", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.08em", opacity: 0.95 }}>
        <span>tsgabrielle<sup style={{ fontSize: 8 }}>®</sup> · Admin Dashboard</span>
        <span style={{ opacity: 0.6 }}>Powered by Next.js · Supabase · Printful · PayPal · Klaviyo</span>
        <span style={{ opacity: 0.6 }}>© 2026 Peach-Phoenix-LLC</span>
      </footer>
    </div>
  );
}

// ── shared sub-components ────────────────────────────────────────
function PageTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 300, color: "#111", letterSpacing: "0.04em", margin: 0 }}>{title}</h1>
      <p style={{ fontSize: 12, color: "#aaa", marginTop: 4, letterSpacing: "0.06em" }}>{sub}</p>
    </div>
  );
}

function SectionLabel({ label, action, onAction }: { label: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 11, fontWeight: 400, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      {action && <button onClick={onAction} style={{ fontSize: 11, color: BRAND, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.05em" }}>{action}</button>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = statusColor[status] || "#888";
  return (
    <span style={{ fontSize: 10, color, background: `${color}18`, padding: "3px 9px", borderRadius: 12, letterSpacing: "0.06em", fontWeight: 400 }}>{status}</span>
  );
}

function FilterPill({ label }: { label: string }) {
  const [on, set] = useState(label === "All");
  return (
    <button onClick={() => set(o => !o)} style={{ fontSize: 12, padding: "6px 16px", borderRadius: 20, border: `1px solid ${on ? BRAND : LIGHT}`, background: on ? `${BRAND}12` : "#fff", color: on ? BRAND : "#666", cursor: "pointer", letterSpacing: "0.04em" }}>{label}</button>
  );
}

function Btn({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <button style={{ fontSize: 12, padding: "8px 18px", borderRadius: 8, border: primary ? "none" : `1px solid ${LIGHT}`, background: primary ? BRAND : "#fff", color: primary ? "#fff" : "#666", cursor: "pointer", letterSpacing: "0.05em" }}>{label}</button>
  );
}

function OrderTable({ rows, full }: { rows: any[]; full?: boolean }) {
  const cols = full
    ? ["Order","Customer","Product","Status","Payment","Amount","Date"]
    : ["Order","Customer","Status","Amount"];
  return (
    <div style={{ overflowX: "auto", marginTop: 12 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${LIGHT}` }}>
            {cols.map(h => <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#888", fontWeight: 300, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(o => (
            <tr key={o.id} style={{ borderBottom: `1px solid ${LIGHT}` }}>
              <td style={{...(td as any), color: BRAND, fontWeight: 400}}>{o.id}</td>
              <td style={td as any}>{o.customer}</td>
              {full && <td style={{...(td as any), color: "#555"}}>{o.product}</td>}
              <td style={td as any}><StatusBadge status={o.status} /></td>
              {full && <td style={{...(td as any), color: "#777", fontSize: 12}}>{o.payment}</td>}
              <td style={{...(td as any), fontWeight: 400}}>{o.amount}</td>
              {full && <td style={{...(td as any), color: "#aaa", fontSize: 11}}>{o.date}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── styles ───────────────────────────────────────────────────────
const card = {
  background: BG,
  borderRadius: 12,
  padding: "20px 22px",
  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  border: `1px solid ${LIGHT}`,
};

const td = {
  padding: "10px 12px",
  color: "#333",
  verticalAlign: "middle",
};
