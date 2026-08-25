import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../../resources/forms/abt-forms.css";
import "../../../florida-liquor-licenses-for-sale/seo-market.css";

export const metadata: Metadata = {
  title: "Payment Received | Self-Directed IRA Setup Assistance",
  robots: { index: false, follow: false },
};

export default function IraSetupAssistanceSuccessPage() {
  return (
    <main className="seo-market-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader primaryActionHref="/investment-opportunities" primaryActionLabel="View Opportunities" />
      </div>
      <section className="seo-market-intro" style={{ minHeight: "62vh", display: "grid", alignItems: "center" }}>
        <div className="seo-market-shell">
          <div
            style={{
              maxWidth: 760,
              margin: "42px auto",
              padding: "36px",
              border: "1px solid rgba(246,167,0,.42)",
              borderRadius: 15,
              background: "#fff",
              boxShadow: "0 16px 34px rgba(7,26,58,.12)",
              textAlign: "center",
            }}
          >
            <span className="seo-market-section-kicker">Secure Payment Complete</span>
            <h1 style={{ color: "#071a3a", fontSize: "clamp(32px,5vw,48px)", margin: "12px 0" }}>
              Thank you
            </h1>
            <p style={{ color: "#465669", fontSize: 18, lineHeight: 1.7, margin: "0 auto 24px", maxWidth: 620 }}>
              Your $495 Self-Directed IRA Setup Assistance payment was submitted through Stripe.
              Stripe will email your receipt, and FLLM will use the contact information provided at
              checkout to follow up about the setup materials.
            </p>
            <Link
              className="seo-market-button seo-market-button-gold"
              href="/self-directed-ira-liquor-license-lending"
            >
              Return to the IRA Lending Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
