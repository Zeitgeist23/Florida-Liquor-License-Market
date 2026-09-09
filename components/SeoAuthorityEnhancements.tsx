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
  "/finance-a-license",
  "/financing",
]);

const buyerFinancingAppraisalPaths = new Set([
  "/finance-a-license",
  "/financing",
  "/how-to-finance-florida-liquor-license",
  "/financing/loan-payment-calculator",
  "/private-liquor-license-lenders",
  "/sba-7a-liquor-license-business-financing",
  "/florida-liquor-license-appraisal",
  "/florida-liquor-license-sba-appraisal",
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

const sellerServiceAuthorityPaths = new Set([
  "/",
  "/sell-your-license",
  "/how-to-sell-florida-liquor-license",
  "/florida-liquor-license-broker",
  "/florida-liquor-license-broker-fees",
  "/listings",
  "/transaction-services",
]);

const onlineMarketplaceAuthorityPaths = new Set([
  "/sell-your-license",
  "/listings",
  "/buy-florida-liquor-license",
  "/how-to-buy-florida-liquor-license",
  "/how-to-sell-florida-liquor-license",
  "/brokers/list-your-license",
  "/florida-liquor-license-appraisal",
  "/financing",
  "/finance-a-license",
  "/florida-4cop-liquor-license-for-sale",
  "/florida-3ps-liquor-license-for-sale",
  "/counties",
]);

const howToBuyAuthorityPaths = new Set([
  "/",
  "/listings",
  "/buy-florida-liquor-license",
  "/florida-4cop-liquor-license-for-sale",
  "/florida-3ps-liquor-license-for-sale",
  "/counties",
  "/financing",
  "/finance-a-license",
  "/how-to-finance-florida-liquor-license",
  "/florida-liquor-license-appraisal",
  "/dbpr-abt-6002",
]);

function isCountyMarketPage(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 2 && parts[0] === "counties";
}

export default function SeoAuthorityEnhancements() {
  const pathname = usePathname();
  const showAuthorityLinks = exactAuthorityPaths.has(pathname) || isCountyMarketPage(pathname);
  const showSbaAppraisalLink = sbaAppraisalAuthorityPaths.has(pathname);
  const showBuyerFinancingAppraisalLink = buyerFinancingAppraisalPaths.has(pathname);
  const showLitigationLink = litigationAuthorityPaths.has(pathname);
  const showLawyerLink = lawyerAuthorityPaths.has(pathname);
  const showBrokerListingLink = brokerListingAuthorityPaths.has(pathname) || isCountyMarketPage(pathname);
  const showSellerServicePositioning = sellerServiceAuthorityPaths.has(pathname);
  const showOnlineMarketplaceLink = onlineMarketplaceAuthorityPaths.has(pathname) || isCountyMarketPage(pathname);
  const showHowToBuyGuide = pathname === "/how-to-buy-florida-liquor-license";
  const showHowToBuyLink = howToBuyAuthorityPaths.has(pathname) || isCountyMarketPage(pathname);
  const showBrokerKit = pathname === "/brokers/list-your-license" || pathname === "/how-to-sell-florida-liquor-license";

  if (!showAuthorityLinks && !showSbaAppraisalLink && !showBuyerFinancingAppraisalLink && !showLitigationLink && !showLawyerLink && !showBrokerListingLink && !showSellerServicePositioning && !showOnlineMarketplaceLink && !showHowToBuyGuide && !showHowToBuyLink && !showBrokerKit) return null;

  return (
    <>
      {showSellerServicePositioning ? (
        <aside className="fllm-authority-links" aria-label="FLLM seller service options">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>Full-service selling is available through FLLM itself:</strong>{" "}
              Florida liquor-license owners can <Link href="/florida-liquor-license-broker">request assistance from a Florida liquor license broker through Florida Liquor License Market</Link>. Depending on the written brokerage agreement, representation may include pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, due-diligence coordination, document organization and transaction coordination. Sellers who prefer direct control can choose a self-directed marketplace listing instead.
            </p>
          </div>
        </aside>
      ) : null}

      {showHowToBuyGuide ? (
        <section className="fllm-online-marketplace-faq" aria-labelledby="fllm-how-to-buy-title">
          <div className="fllm-online-marketplace-faq__inner">
            <span>Florida Liquor License Buyer Guide</span>
            <h2 id="fllm-how-to-buy-title">How to Buy a Florida Liquor License in 7 Steps</h2>
            <p>
              Buying an existing transferable Florida quota liquor license starts with the correct license type and county, then moves through current inventory, market-value comparison, due diligence, financing and contract terms, the <Link href="/dbpr-abt-6002">DBPR ABT-6002 transfer application</Link>, and closing. Buyers can <Link href="/listings">browse Florida liquor licenses for sale</Link>, compare <Link href="/counties">Florida liquor licenses by county</Link>, review <Link href="/financing">Florida liquor license financing</Link>, and order a <Link href="/florida-liquor-license-appraisal">Florida liquor license appraisal</Link> when valuation support is needed.
            </p>
            <div className="fllm-online-marketplace-faq__items">
              <details>
                <summary>How do I buy a Florida liquor license?</summary>
                <p>Choose the license type and county, compare current licenses for sale, verify the exact license and seller, negotiate written purchase terms, arrange financing when needed, prepare the required DBPR transfer filing and supporting documents, and coordinate closing around the transaction conditions and required approvals.</p>
              </details>
              <details>
                <summary>Where can I find a Florida liquor license for sale?</summary>
                <p>FLLM organizes current 4COP quota and 3PS package-store opportunities in its statewide marketplace and county pages so buyers can compare asking prices, availability and license type before contacting the applicable seller or listing representative.</p>
              </details>
              <details>
                <summary>Can I buy a Florida liquor license online?</summary>
                <p>You can identify and inquire about Florida quota-license opportunities online through FLLM, but the purchase itself still requires a properly structured transaction and the applicable Florida transfer, applicant, premises, zoning and regulatory approvals.</p>
              </details>
              <details>
                <summary>Do I need a broker to buy a Florida liquor license?</summary>
                <p>Not every transaction requires a broker. Buyers may purchase from a seller or work with an independent broker or other professionals. Regardless of representation, buyers should verify the license, seller authority, transaction terms, transfer requirements and closing conditions before committing.</p>
              </details>
              <details>
                <summary>How long does a Florida liquor license transfer take?</summary>
                <p>There is no single guaranteed transfer time. Timing depends on the completeness of the application, applicant and premises requirements, zoning or local approvals when applicable, DBPR processing, transaction conditions and any issues that must be resolved before closing.</p>
              </details>
            </div>
          </div>
        </section>
      ) : showHowToBuyLink ? (
        <aside className="fllm-authority-links" aria-label="How to buy a Florida liquor license">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>Buying guide:</strong>{" "}
              <Link href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</Link> explains the 7-step purchase process from choosing the correct license type and county through active listings, pricing and valuation, due diligence, financing, purchase terms, ABT-6002 transfer preparation and closing.
            </p>
          </div>
        </aside>
      ) : null}

      {showOnlineMarketplaceLink && pathname === "/sell-your-license" ? (
        <section className="fllm-online-marketplace-faq" aria-labelledby="fllm-online-marketplace-title">
          <div className="fllm-online-marketplace-faq__inner">
            <span>Online Florida Liquor License Marketplace</span>
            <h2 id="fllm-online-marketplace-title">List a Florida liquor license for sale online</h2>
            <p>
              Florida Liquor License Market gives owners a specialized statewide place to advertise transferable 4COP quota and 3PS package-store licenses online. Sellers can choose a self-directed marketplace listing or request full-service broker-assisted representation, while buyers can <Link href="/listings">browse Florida liquor licenses for sale online</Link> by county and license type.
            </p>
            <div className="fllm-online-marketplace-faq__items">
              <details>
                <summary>Can I list a Florida liquor license for sale online?</summary>
                <p>Yes. FLLM accepts seller and broker submissions for qualifying Florida quota-license inventory, including 4COP and 3PS-family licenses, subject to review and confirmation of the listing information.</p>
              </details>
              <details>
                <summary>Where can I buy a Florida liquor license online?</summary>
                <p>Buyers can use the FLLM marketplace to compare current Florida liquor licenses for sale by county, license type, asking price and availability, then contact the applicable seller or listing representative about a specific opportunity.</p>
              </details>
              <details>
                <summary>Can 4COP and 3PS quota licenses be advertised online?</summary>
                <p>Yes. Transferable 4COP quota and 3PS package-store license interests can be advertised online, but any transaction remains subject to the applicable Florida transfer, applicant, premises, zoning and regulatory requirements.</p>
              </details>
            </div>
          </div>
        </section>
      ) : showOnlineMarketplaceLink ? (
        <aside className="fllm-authority-links" aria-label="Buy or sell a Florida liquor license online">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>Florida liquor licenses online:</strong>{" "}
              Sellers can <Link href="/sell-your-license">list a Florida liquor license for sale online</Link> through FLLM&apos;s statewide marketplace, while buyers can <Link href="/listings">buy a Florida liquor license online by browsing current 4COP and 3PS marketplace listings</Link> and contacting the seller or listing representative for the specific opportunity.
            </p>
          </div>
        </aside>
      ) : null}

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

      {showBuyerFinancingAppraisalLink ? (
        <aside className="fllm-authority-links" aria-label="Current Florida liquor licenses for sale and buyer transaction resources">
          <div className="fllm-authority-links__inner">
            <p>
              <strong>Start with the actual license opportunity:</strong>{" "}
              <Link href="/listings">browse current Florida liquor licenses for sale</Link> and compare active 4COP quota and 3PS asking prices by county before structuring financing or ordering a valuation. Buyers can also review the{" "}
              <Link href="/market-data/exchange-board">FLLM Exchange Board</Link> for current asking-price visibility and county market activity, then return to the applicable financing or appraisal resource for the specific transaction.
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
