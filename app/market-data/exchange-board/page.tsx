import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Rebuilding",
  description: "The FLLM Exchange Board is temporarily offline while the page is rebuilt.",
  robots: { index: false, follow: true },
};

export default function ExchangeBoardOfflinePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#031321", color: "#eef7fc" }}>
      <div style={{ background: "#020d18", borderBottom: "1px solid rgba(246,167,0,.55)" }}>
        <FormsSiteHeader
          primaryActionHref="/sell-your-license"
          primaryActionLabel="List Your License"
        />
      </div>

      <section
        style={{
          minHeight: "68vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          textAlign: "center",
          background: "linear-gradient(180deg,#061a2b 0%,#031321 100%)",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <div style={{ color: "#59d8ff", fontSize: 12, fontWeight: 800, letterSpacing: ".16em", marginBottom: 14 }}>
            FLORIDA LIQUOR LICENSE MARKET
          </div>
          <h1 style={{ margin: 0, color: "#f6b51f", fontFamily: "Georgia,serif", fontSize: "clamp(36px,6vw,64px)", lineHeight: 1.05 }}>
            FLLM Exchange Board
          </h1>
          <p style={{ margin: "22px auto 0", maxWidth: 620, color: "#c7d7e1", fontSize: 17, lineHeight: 1.6 }}>
            This page is temporarily offline while the Exchange Board is rebuilt from a clean implementation.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
            <Link
              href="/listings"
              style={{ padding: "12px 18px", borderRadius: 5, background: "#f6b51f", color: "#06111b", textDecoration: "none", fontWeight: 900, fontSize: 12 }}
            >
              Browse Current Listings
            </Link>
            <Link
              href="/#market-data"
              style={{ padding: "12px 18px", borderRadius: 5, border: "1px solid #2f9ed0", color: "#dff5ff", textDecoration: "none", fontWeight: 800, fontSize: 12 }}
            >
              View Market Data
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
