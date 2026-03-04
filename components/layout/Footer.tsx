import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";

const social = ["Instagram", "TikTok", "YouTube", "Facebook", "X (Twitter)", "Pinterest", "LinkedIn", "Snapchat"];
const worldwide = ["Store Directory.", "Stores Directory", "USA"];

export function Footer() {
  return (
    <footer 
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden bg-cover bg-center pt-24 pb-12 text-[#ffffff]"
      style={{ backgroundColor: "#a932bd", backgroundImage: "url('/images/tsgabrielle-footer.png')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="container-luxe relative z-10">
        <div className="mb-16 grid gap-12 md:grid-cols-3">
          <div>
            <BrandLogo light className="[&_img]:h-9" />
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-[#ffffff]">
              Inclusive luxury, globally shipped.
            </p>
          </div>
          <div>
            <h3 className="mb-6 text-sm tracking-wide text-[#ffffff] font-light">📱 Follow tsgabrielle®</h3>
            <ul className="space-y-3">
              {social.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                    className="text-sm font-light text-[#ffffff] transition-opacity hover:opacity-75"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm tracking-wide text-[#ffffff] font-light">👤 tsgabrielle® Worldwide</h3>
            <ul className="space-y-3">
              {worldwide.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                    className="text-sm font-light text-[#ffffff] transition-opacity hover:opacity-75"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-8 md:flex-row">
          <div className="text-xs font-light tracking-wide text-[#ffffff]">
            © 2026 tsgabrielle · Legal Hub · Privacy · Contact · <Link href="/admin" className="opacity-30 hover:opacity-100 transition-opacity">Admin</Link>
          </div>
          <div className="flex gap-6 text-xs tracking-wide text-[#ffffff] font-light">
            <span className="cursor-pointer hover:opacity-75">Instagram</span>
            <span className="cursor-pointer hover:opacity-75">LinkedIn</span>
            <span className="cursor-pointer hover:opacity-75">TikTok</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
