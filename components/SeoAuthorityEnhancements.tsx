"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const exactAuthorityPaths = new Set([
  "/",
  "/florida-4cop-liquor-license-for-sale",
  "/florida-3ps-liquor-license-for-sale",
  "/florida-quota-liquor-license-cost",
  "/florida-liquor-license-value",
  "/how-to-buy-florida-liquor-license",
  "/how-to-sell-florida-liquor-license",
  "/counties",
]);

const sbaAppraisalAuthorityPaths = new Set([
  "/florida-liquor-license-appraisal",
  "/florida-liquor-license-sba-appraisal",
  "/sba-7a-liquor-license-business-financing",
  "/how-to-finance-florida-liquor-license",
  "/financing",
]);

function isCountyMarketPage(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 2 && parts[0] === "counties";
}

export default function SeoAuthorityEnhancements() {
  const pathname = usePathname();
  const showAuthorityLinks = exactAuthorityPaths.has(pathname) || isCountyMarketPage(pathname);
  const showSbaAppraisalLink = sbaAppraisalAuthorityPaths.has(pathname);
  const showBrokerKit = pathname === "/brokers/list-your-license" || pathname === "/how-to-sell-florida-liquor-license";

  if (!showAuthorityLinks && !showSbaAppraisalLink && !showBrokerKit) return null;

  return (
    <>
      {showAuthorityLinks ? (
        <aside className="fllm-authority-links" aria-label="Florida liquor license marketplace resources">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>Florida statewide marketplace:</strong>{" "}
              <Link href="/listings">browse current Florida liquor licenses for sale</Link>, including 4COP quota and 3PS package-store opportunities, or review the{" "}
              <Link href="/florida-quota-liquor-license-market-report">Florida Quota Liquor License Market Report</Link> for current statewide inventory and asking-price evidence.
            </p>
          </div>
        </aside>
      ) : null}

      {showSbaAppraisalLink ? (
        <aside className="fllm-authority-links" aria-label="Florida liquor license SBA appraisal resource">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>SBA and lender valuation:</strong>{" "}
              <Link href="/florida-liquor-license-sba-appraisal">Florida Liquor License SBA Appraisal</Link> explains how a license-specific 4COP or 3PS market valuation can support SBA 7(a) and lender review while remaining separate from any business valuation, credentialed appraisal or other scope the lender may require. Review the{" "}
              <Link href="/florida-liquor-license-appraisal">FLLM formal liquor-license appraisal methodology</Link> before ordering.
            </p>
          </div>
        </aside>
      ) : null}

      {showBrokerKit ? (
        <aside className="fllm-broker-link-kit" aria-label="Broker and seller listing link kit">
          <div className="fllm-broker-link-kit__inner">
            <div>
              <span>For brokers and sellers</span>
              <strong>Link your own website to your FLLM listing</strong>
              <p>Use the free FLLM link generator after your listing is live so buyers can open the current marketplace page directly from your website.</p>
            </div>
            <Link href="/brokers/link-to-your-fllm-listing">Open Broker Link Kit</Link>
          </div>
        </aside>
      ) : null}
    </>
  );
}
