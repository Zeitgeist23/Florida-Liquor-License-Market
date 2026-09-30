import type { Metadata } from "next";
import Link from "next/link";

import { FllmPageShell } from "@/components/FllmDesignSystem";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";

export const metadata: Metadata = {
  title: "Florida 4COP Licensing for Adult-Entertainment Venues | FLLM",
  description:
    "Educational information about Florida 4COP quota licensing. FLLM does not publish third-party gentlemen's-club business-for-sale listings.",
  robots: { index: false, follow: true },
};

export default function GentlemensClubsWithQuotaLicensesPage() {
  return (
    <FllmPageShell className="bar-package-page">
      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Listing Policy</span>
              <h1>Third-Party Gentlemen&apos;s-Club Listings Are Not Published on FLLM</h1>
              <p>
                Florida Liquor License Market does not publish or aggregate gentlemen&apos;s-club or adult-entertainment
                business-for-sale listings sourced from third-party marketplaces. This includes listings sourced from
                general business-for-sale and commercial-listing platforms.
              </p>
            </div>
          </div>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="/businesses-with-quota-licenses">
              Browse Other Business Categories
            </Link>
            <Link className="btn btn-outline" href="/license-types/gentlemens-clubs-4cop-quota">
              4COP Licensing Information
            </Link>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
