import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import TransactionPortalClient from "@/components/TransactionPortalClient";
import "./transaction-portal.css";
import "./transaction-portal-ascii.css";

export const metadata: Metadata = {
  title: "FLLM Transaction Portal | Florida Liquor License Market",
  description:
    "Create a private Florida liquor-license transaction workspace with a guided document checklist and access to FLLM transfer tools.",
  robots: { index: false, follow: false },
};

export default function TransactionPortalPage() {
  return (
    <main className="transaction-portal-page">
      <div className="portal-header-wrap">
        <FormsSiteHeader />
      </div>
      <section className="portal-hero">
        <div className="page-shell portal-hero-grid">
          <div>
            <span className="portal-eyebrow">Private transaction workspace</span>
            <h1>Keep every license-transfer document in one guided workspace.</h1>
            <p>
              Start a transaction, answer a few questions, and receive a checklist tailored to the
              license transfer, tax-clearance, representation, and financing information you provide.
            </p>
          </div>
          <aside>
            <strong>Secure account access</strong>
            <span>Saved transaction workspaces</span>
            <span>Conditional Florida form checklist</span>
            <span>Direct access to FLLM form tools</span>
          </aside>
        </div>
      </section>
      <TransactionPortalClient />
      <footer className="portal-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <p>
            FLLM provides document-preparation tools and general information. Requirements vary by
            transaction, and agencies or professional advisers may require additional documents.
          </p>
          <a href="/resources/liquor-license-attorneys">Find a Florida liquor-license attorney</a>
        </div>
      </footer>
    </main>
  );
}

