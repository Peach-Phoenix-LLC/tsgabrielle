import React from "react";
import { buildMetadata } from "@/lib/seo";
import { OptOutForm } from "@/components/privacy/OptOutForm";

export const metadata = buildMetadata({
  title: "Do Not Sell or Share My Personal Information",
  description: "California Privacy Rights - Learn how to opt-out of the sale or sharing of your personal information.",
  path: "/privacy/do-not-sell"
});

export default function DoNotSellPage() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="container-luxe py-24 max-w-4xl">
        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight tracking-tight">
            DO NOT SELL OR SHARE<br />MY PERSONAL INFORMATION
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-8 bg-black/10" />
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-phoenix">
               Last Updated: March 7, 2026
             </p>
             <div className="h-[1px] w-8 bg-black/10" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-12 space-y-16">
            
            <section className="prose prose-sm max-w-none text-black/70 leading-relaxed">
              <p className="text-lg text-black font-light leading-relaxed">
                At tsgabrielle®, we value your privacy. Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents have the right to opt-out of the "sale" or "sharing" of their personal information.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">1</span>
                  Definitions
                </h2>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold text-black uppercase tracking-widest text-[10px]">Sell:</span> We do not sell your personal information to third parties in exchange for money.
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold text-black uppercase tracking-widest text-[10px]">Share:</span> We may "share" information with service providers like Google or Vercel for cross-context behavioral advertising. This helps us show you products you might actually like based on your browsing history.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">2</span>
                  Your Opt-Out Options
                </h2>
                <p className="text-sm leading-relaxed">
                  You can exercise your right to opt-out through Method A (automated) or Method B (manual) as detailed below.
                </p>
              </section>
            </div>

            <section className="space-y-10">
               <div className="bg-[#fdfcf5] border border-black/5 p-10 rounded-3xl">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#a932bd] mb-4">Method A: Automated Browser Signals</h3>
                  <p className="text-sm leading-relaxed text-black/70">
                    Our website is configured to recognize the <span className="text-black font-medium">Global Privacy Control (GPC)</span> signal. If your browser or device has GPC enabled, we will automatically treat this as a request to opt-out of "sharing" for targeted advertising. No further action is required for that specific browser.
                  </p>
               </div>

               <OptOutForm />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8 border-t border-black/5">
              <section className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">3. After You Opt-Out</h2>
                <ul className="space-y-4 text-sm text-black/70">
                  <li className="flex gap-4">
                    <span className="text-[#a932bd]">•</span>
                    <span>We will stop sharing your information with our advertising partners for cross-contextual marketing.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#a932bd]">•</span>
                    <span>Your experience on tsgabrielle® will not change; we will still fulfill your orders and provide support through Peach Phoenix, LLC.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#a932bd]">•</span>
                    <span>We will maintain a record of your request to ensure your preferences are respected.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">4. Contact Details</h2>
                <div className="space-y-4 text-sm text-black/70">
                  <p>
                    <span className="font-bold text-black uppercase tracking-[0.1em] text-[10px] mr-2">Email:</span> contact@tsgabrielle.us<br />
                    <span className="text-[10px] text-black/40">Subject: CCPA/CPRA Opt-Out Request</span>
                  </p>
                  <p>
                    <span className="font-bold text-black uppercase tracking-[0.1em] text-[10px] mr-2">Mail:</span><br />
                    1801 East Camelback Road, Suite 102<br />
                    Phoenix, AZ 85016, United States
                  </p>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
