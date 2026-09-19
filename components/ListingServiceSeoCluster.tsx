"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const clusterPaths = new Set([
  "/brokers/list-your-license",
  "/sell-your-license",
  "/florida-liquor-license-broker",
  "/how-to-sell-florida-liquor-license",
  "/florida-liquor-license-appraisal",
  "/financing",
]);

const brokerFaqs = [
  {
    q: "What is a Florida liquor license broker listing service?",
    a: "A broker listing service gives a Florida broker another place to advertise a client’s transferable quota liquor license. On FLLM, the submitting broker remains the identified representative and transaction contact.",
  },
  {
    q: "Where can I list a client liquor license in Florida?",
    a: "Florida brokers can submit eligible 4COP quota and 3PS package-store inventory to the Florida Liquor License Market statewide marketplace for review and publication.",
  },
  {
    q: "Can I use FLLM as a Florida liquor license marketplace for brokers?",
    a: "Yes. FLLM is designed to give brokers statewide marketplace exposure without replacing the broker, taking over the client relationship, or claiming a share of the broker’s commission.",
  },
  {
    q: "Does the broker stay the primary transaction contact?",
    a: "Yes. Approved broker-submitted listings identify the broker or brokerage contact designated for buyer inquiries and transaction communications.",
  },
  {
    q: "Does FLLM charge a recurring fee or commission on broker listings?",
    a: "No. Standard and Featured broker listing charges are one-time submission fees, and FLLM does not take a share of the submitting broker’s commission.",
  },
  {
    q: "Can I list an operating business that includes a quota liquor license?",
    a: "Yes. FLLM publishes an operating business with an included transferable 4COP or 3PS quota license in the separate Businesses With Quota Licenses inventory. The broker remains the transaction contact, while the package is excluded from standalone license counts, pricing statistics, heat maps, comparables, and the FLLM Exchange.",
  },
];

const sellerFaqs = [
  {
    q: "How do I list a Florida liquor license for sale?",
    a: "A Florida liquor-license owner can use FLLM to request broker-assisted representation or choose a self-directed marketplace listing, depending on how much transaction support the seller wants.",
  },
  {
    q: "Can I sell a Florida liquor license online myself?",
    a: "A self-directed seller can advertise an eligible quota liquor license through FLLM and manage buyer communications directly, subject to the applicable transfer, licensing, zoning, and closing requirements.",
  },
  {
    q: "Can I use my own broker and still advertise on FLLM?",
    a: "Yes. A broker can list a client’s license through the FLLM broker marketplace while remaining the listing representative and primary transaction contact.",
  },
  {
    q: "Can I list either a 4COP quota or 3PS package-store license?",
    a: "Yes. FLLM supports eligible 4COP quota and 3PS-family package-store listings, with the county, series, asking price, and status reviewed before publication.",
  },
  {
    q: "Is there a recurring marketplace fee?",
    a: "FLLM listing options use one-time submission fees rather than a recurring marketplace subscription. Any separate broker-assisted representation is governed by its own written agreement.",
  },
];

export default function ListingServiceSeoCluster() {
  const pathname = usePathname();
  const showCluster = clusterPaths.has(pathname);
  const showBrokerFaqs = pathname === "/brokers/list-your-license";
  const showSellerFaqs = pathname === "/sell-your-license";

  if (!showCluster && !showBrokerFaqs && !showSellerFaqs) return null;

  return (
    <>
      <style>{`
        .fllm-listing-service-faq__grid {
          align-items: start;
        }

        .fllm-listing-service-faq__grid details {
          position: relative;
          align-self: start;
          overflow: hidden;
          border: 1px solid #d2d9dd !important;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.96),
            0 7px 16px rgba(7,24,39,.07),
            0 16px 30px rgba(7,24,39,.07) !important;
          transform: translateY(0) scale(1);
          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            filter .2s ease;
        }

        .fllm-listing-service-faq__grid details:hover,
        .fllm-listing-service-faq__grid details[open] {
          transform: translateY(-5px) scale(1.008);
          border-color: rgba(232,164,10,.92) !important;
          background:
            radial-gradient(circle at 18% 0%, rgba(71,214,255,.11), transparent 38%),
            radial-gradient(circle at 86% 10%, rgba(246,167,0,.10), transparent 34%),
            linear-gradient(180deg, #ffffff 0%, #fbfdff 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 0 24px rgba(72,211,255,.07),
            0 16px 30px rgba(7,24,39,.13),
            0 26px 46px rgba(7,24,39,.11),
            0 0 24px rgba(246,167,0,.14) !important;
          filter: brightness(1.015);
        }

        .fllm-listing-service-faq__grid details summary {
          transition: color .18s ease, text-shadow .18s ease;
        }

        .fllm-listing-service-faq__grid details:hover summary,
        .fllm-listing-service-faq__grid details[open] summary {
          color: #d89200 !important;
          text-shadow: 0 0 12px rgba(246,167,0,.16);
        }

        .fllm-listing-service-faq__grid details p {
          font-size: 18px !important;
          line-height: 1.75 !important;
          color: #415665 !important;
        }

        @media (max-width: 720px) {
          .fllm-listing-service-faq__grid details:hover,
          .fllm-listing-service-faq__grid details[open] {
            transform: translateY(-3px);
          }
        }
      `}</style>

      {showCluster ? (
        <aside className="fllm-listing-service-cluster" aria-label="Florida liquor license listing service resources">
          <div className="fllm-listing-service-cluster__inner">
            <span>Florida Liquor License Listing Service</span>
            <p>
              <Link href="/florida-liquor-license-broker">Florida Liquor License Broker Services</Link>
              <b aria-hidden="true">•</b>
              <Link href="/sell-your-license">List a Florida Liquor License for Sale</Link>
              <b aria-hidden="true">•</b>
              <Link href="/brokers/list-your-license">Advertise a Client License</Link>
              <b aria-hidden="true">•</b>
              <Link href="/listings">Florida Liquor License Marketplace</Link>
            </p>
          </div>
        </aside>
      ) : null}

      {showBrokerFaqs || showSellerFaqs ? (
        <section
          className="fllm-listing-service-faq"
          aria-label={showBrokerFaqs ? "Florida broker listing service questions" : "Florida liquor license seller listing questions"}
        >
          <div className="fllm-listing-service-faq__inner">
            <span>{showBrokerFaqs ? "Broker Listing Service Questions" : "Seller Listing Questions"}</span>
            <h2>{showBrokerFaqs ? "Florida liquor license marketplace questions for brokers" : "How to list and sell a Florida liquor license"}</h2>
            <div className="fllm-listing-service-faq__grid">
              {(showBrokerFaqs ? brokerFaqs : sellerFaqs).map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
