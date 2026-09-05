"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const exactAuthorityPaths = new Set([
  "/",
  "/florida-4cop-liquor-license-for-sale",
  "/florida-3ps-liquor-license-for-sale",
  "/florida-quota-liquor-license-cost",
  "/florida-liquor-license-value",
  "/buy-florida-liquor-license",
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

const litigationAuthorityPaths = new Set([
  "/florida-liquor-license-appraisal",
  "/florida-liquor-license-value",
  "/florida-liquor-license-value-expert-witness",
  "/florida-liquor-license-court-decisions",
  "/resources/florida-liquor-license-laws",
  "/resources/liquor-license-attorneys",
]);

const lawyerAuthorityPaths = new Set([
  "/resources",
  "/resources/florida-liquor-license-laws",
  "/florida-liquor-license-court-decisions",
  "/florida-liquor-license-appraisal",
  "/florida-liquor-license-value-expert-witness",
  "/buy-florida-liquor-license",
  "/how-to-buy-florida-liquor-license",
  "/how-to-sell-florida-liquor-license",
  "/dbpr-abt-6002",
]);

const brokerListingAuthorityPaths = new Set([
  "/florida-liquor-license-broker",
  "/sell-your-license",
  "/how-to-sell-florida-liquor-license",
  "/florida-4cop-liquor-license-for-sale",
  "/florida-3ps-liquor-license-for-sale",
  "/counties",
  "/resources/florida-liquor-license-types",
]);

function isCountyMarketPage(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 2 && parts[0] === "counties";
}

export default function SeoAuthorityEnhancements() {
  const pathname = usePathname();
  const showAuthorityLinks = exactAuthorityPaths.has(pathname) || isCountyMarketPage(pathname);
  const showSbaAppraisalLink = sbaAppraisalAuthorityPaths.has(pathname);
  const showLitigationLink = litigationAuthorityPaths.has(pathname);
  const showLawyerLink = lawyerAuthorityPaths.has(pathname);
  const showBrokerListingLink = brokerListingAuthorityPaths.has(pathname) || isCountyMarketPage(pathname);
  const showBrokerKit = pathname === "/brokers/list-your-license" || pathname === "/how-to-sell-florida-liquor-license";

  if (!showAuthorityLinks && !showSbaAppraisalLink && !showLitigationLink && !showLawyerLink && !showBrokerListingLink && !showBrokerKit) return null;

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

      {showLitigationLink ? (
        <aside className="fllm-authority-links" aria-label="Florida liquor license expert witness and litigation valuation resource">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>Litigation and expert-witness valuation:</strong>{" "}
              <Link href="/florida-liquor-license-value-expert-witness">Florida Liquor License Value Expert Witness &amp; Litigation Support</Link> explains how county-specific 4COP and 3PS market evidence, DBPR research and transaction analysis can support counsel or a retained expert, while distinguishing an FLLM market valuation from court qualification, USPAP credentials or testimony requirements.
            </p>
          </div>
        </aside>
      ) : null}

      {showLawyerLink ? (
        <aside className="fllm-authority-links" aria-label="Florida liquor license lawyer and attorney directory">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>Need legal counsel?</strong>{" "}
              <Link href="/resources/liquor-license-attorneys">Find a Florida Liquor License Lawyer or Florida Liquor License Attorney</Link> for licensing, DBPR / ABT matters, transfers, transactions, litigation, appeals, liens, escrow, and closings through FLLM&apos;s independent attorney directory.
            </p>
          </div>
        </aside>
      ) : null}

      {showBrokerListingLink ? (
        <aside className="fllm-authority-links" aria-label="Florida liquor license broker listing marketplace">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>{isCountyMarketPage(pathname) ? "Brokers with a client license in this county:" : "Florida liquor license brokers:"}</strong>{" "}
              <Link href="/brokers/list-your-license">list and advertise a client&apos;s Florida liquor license on FLLM</Link> while remaining the listing representative and transaction contact. Standard and Featured marketplace listings are one-time fees with no FLLM share of the broker&apos;s commission.
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
