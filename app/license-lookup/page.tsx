import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import LicenseLookupClient from "./LicenseLookupClient";

import "../resources/forms/abt-forms.css";
import "../florida-quota-liquor-license-cost/header-footer-standard.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/license-lookup`;

export const metadata: Metadata = {
  title: "Florida Liquor License Lookup | FLLM",
  description:
    "Look up a Florida alcoholic-beverage license by DBPR license number and see current public-record details plus an FLLM quota or special-license classification.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function LicenseLookupPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f3f4f1", color: "#071827" }}>
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section
        style={{
          borderBottom: "1px solid rgba(246,167,0,.45)",
          background: "linear-gradient(120deg,#03101b,#0b2b47 62%,#071827)",
          color: "#fff",
        }}
      >
        <div style={{ width: "min(1240px,calc(100% - 40px))", margin: "0 auto", padding: "28px 0 30px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, color: "#a9bac6", fontSize: 12, textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link><span>›</span>
            <Link href="/resources" style={{ color: "inherit" }}>Resources</Link><span>›</span>
            <strong style={{ color: "#f6a700" }}>Florida Liquor License Lookup</strong>
          </div>
        </div>
      </section>

      <LicenseLookupClient />

      <footer className="directory-footer sell-license-page-footer official-directory-footer">
        <div className="directory-shell">
          <div className="directory-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
