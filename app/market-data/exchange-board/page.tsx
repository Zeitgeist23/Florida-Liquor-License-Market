import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Market",
  description:
    "The FLLM Exchange Board is being rebuilt as a cleaner, faster market-data experience.",
  alternates: {
    canonical:
      "https://www.floridaliquorlicensemarket.com/market-data/exchange-board",
  },
  robots: { index: true, follow: true },
};

export default function ExchangeBoardRebuildPage() {
  return (
    <main className="exchange-rebuild">
      <style dangerouslySetInnerHTML={{ __html: `
        .exchange-rebuild{min-height:100vh;background:#031321;color:#eef7fc;font-family:Arial,Helvetica,sans-serif}
        .exchange-header{background:#020d18;border-bottom:1px solid rgba(246,167,0,.55)}
        .rebuild-shell{min-height:calc(100vh - 112px);display:flex;align-items:center;justify-content:center;padding:56px 20px;background:radial-gradient(circle at 50% 15%,rgba(25,135,190,.18),transparent 28%),linear-gradient(180deg,#041524 0%,#031321 58%,#020d18 100%)}
        .rebuild-card{width:min(860px,100%);padding:52px 34px;border:1px solid rgba(44,188,248,.32);background:linear-gradient(180deg,rgba(7,31,52,.96),rgba(4,19,33,.96));box-shadow:0 24px 70px rgba(0,0,0,.28);text-align:center}
        .eyebrow{margin-bottom:14px;color:#58d9ff;font-size:12px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}
        h1{margin:0;color:#f6b51f;font:700 clamp(38px,6vw,68px)/1.03 Georgia,serif}
        p{max-width:650px;margin:20px auto 0;color:#c9d8e1;font-size:16px;line-height:1.65}
        .rule{width:110px;height:2px;margin:26px auto;background:#f6b51f}
        .actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:30px}
        .btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 20px;border-radius:4px;text-decoration:none;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.03em}
        .btn-primary{background:linear-gradient(180deg,#ffd764,#eba315);color:#06111b;border:1px solid #f6c145}
        .btn-secondary{color:#dff5ff;border:1px solid #2f9ed0;background:#07192b}
      `}} />

      <div className="exchange-header">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="List Your License"
        />
      </div>

      <section className="rebuild-shell">
        <div className="rebuild-card">
          <div className="eyebrow">Florida Liquor License Market</div>
          <h1>FLLM Exchange Board</h1>
          <div className="rule" />
          <p>
            The Exchange Board is being rebuilt from a clean implementation so the market data, listings, ticker information and visual presentation can be restored without the broken legacy hero code.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/listings">Browse Current Listings</Link>
            <Link className="btn btn-secondary" href="/#market-data">View Market Data</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
