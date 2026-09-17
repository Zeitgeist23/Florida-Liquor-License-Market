"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import BrokerSampleModalLink from "@/components/BrokerSampleModalLink";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import type { Listing } from "@/data/listings";

type ListingTier = "standard" | "featured";

const standardPreviewListing: Listing = {
  county: "Orange County",
  type: "4COP Quota",
  price: 435000,
  priceLabel: "$435,000",
  sourceRef: "FLLM-DEMO-STANDARD",
  image: "/assets/inventory/07.png",
};

const featuredPreviewListing: Listing = {
  ...standardPreviewListing,
  sourceRef: "FLLM-DEMO-FEATURED",
  featuredUntil: "2099-12-31T23:59:59.000Z",
};

export default function ListingPreviewSelector({
  tier,
  className,
  id,
}: {
  tier: ListingTier;
  className?: string;
  id?: string;
  children?: ReactNode;
}) {
  const previewListing = tier === "featured" ? featuredPreviewListing : standardPreviewListing;

  function chooseListing() {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.dispatchEvent(
      new CustomEvent("fllm:select-broker-listing-tier", {
        detail: { tier },
      }),
    );

    window.requestAnimationFrame(() => {
      document
        .getElementById(`broker-tier-${tier}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    chooseListing();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    chooseListing();
  }

  return (
    <div id={id} className={className}>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Choose the ${tier} listing option`}
        onClickCapture={handleClickCapture}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div
          className="results-page broker-marketplace-card-preview"
          style={{ minHeight: "auto", background: "transparent", padding: 0 }}
        >
          <MarketplaceListingCard listing={previewListing} />
        </div>
      </div>

      <BrokerSampleModalLink tier={tier} />

      {tier === "featured" ? (
        <section className="broker-google-proof" aria-label="Observed Google visibility for a Featured FLLM broker listing">
          <div className="broker-google-proof-head">
            <span>REAL SEARCH VISIBILITY</span>
            <strong>Observed September 17, 2026</strong>
          </div>

          <h4>A Featured FLLM broker listing reached Google Page 1 and the AI Overview</h4>
          <p className="broker-google-proof-intro">
            In a non-personalized Google search for <b>“florida liquor license for sale in pinellas county”</b>,
            the live FLLM-ANTEZZA Featured listing appeared on page 1 and was also cited by Google&apos;s AI Overview.
          </p>

          <div className="broker-google-proof-grid">
            <article>
              <span>AI OVERVIEW</span>
              <strong>Florida Liquor License Market cited as a source</strong>
              <p>Google&apos;s AI Overview referenced FLLM as a marketplace listing licenses tied to specific local business opportunities.</p>
            </article>
            <article>
              <span>PAGE 1 ORGANIC RESULT</span>
              <strong>Pinellas County 4COP Quota Liquor License for Sale</strong>
              <p>$495,000 Featured broker listing · Business purchase required</p>
            </article>
          </div>

          <div className="broker-google-proof-actions">
            <a href="/listings/fllm-antezza">View the live Featured example →</a>
            <small>Search results change over time and by Google&apos;s systems. FLLM does not guarantee rankings, AI citations, impressions, clicks, or traffic.</small>
          </div>
        </section>
      ) : null}

      <style jsx global>{`
        .broker-marketplace-card-preview a {
          pointer-events: none !important;
        }
        .broker-marketplace-card-preview .result-card {
          cursor: pointer;
        }
        .broker-google-proof {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid rgba(246,167,0,.54);
          border-radius: 10px;
          background:
            radial-gradient(circle at 88% 6%, rgba(43,154,196,.16), transparent 34%),
            linear-gradient(145deg, #0a2236 0%, #061827 72%, #04121d 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.045), 0 14px 30px rgba(0,0,0,.24);
        }
        .broker-google-proof-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 12px;
        }
        .broker-google-proof-head span {
          color: #f6a700;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .11em;
        }
        .broker-google-proof-head strong {
          color: #95aebe;
          font-size: 10px;
          font-weight: 800;
        }
        .broker-google-proof h4 {
          margin: 0 0 10px;
          color: #fff;
          font: 700 22px/1.18 Georgia, "Times New Roman", serif;
        }
        .broker-google-proof-intro {
          margin: 0;
          color: #c8d5de;
          font-size: 13px;
          line-height: 1.65;
        }
        .broker-google-proof-intro b {
          color: #fff;
        }
        .broker-google-proof-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 10px;
          margin-top: 16px;
        }
        .broker-google-proof-grid article {
          min-width: 0;
          padding: 15px;
          border: 1px solid rgba(101,205,241,.26);
          border-radius: 8px;
          background: rgba(3,17,29,.58);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
        }
        .broker-google-proof-grid article > span {
          display: block;
          margin-bottom: 7px;
          color: #69d6ff;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .09em;
        }
        .broker-google-proof-grid article > strong {
          display: block;
          color: #fff;
          font-size: 13px;
          line-height: 1.35;
        }
        .broker-google-proof-grid article > p {
          margin: 7px 0 0;
          color: #aebfca;
          font-size: 11px;
          line-height: 1.5;
        }
        .broker-google-proof-actions {
          display: grid;
          gap: 9px;
          margin-top: 16px;
        }
        .broker-google-proof-actions > a {
          width: fit-content;
          color: #f6b51f;
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
        }
        .broker-google-proof-actions > a:hover,
        .broker-google-proof-actions > a:focus-visible {
          color: #ffd36a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .broker-google-proof-actions > small {
          color: #8399a8;
          font-size: 9px;
          line-height: 1.5;
        }
        @media (max-width: 720px) {
          .broker-google-proof-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }
          .broker-google-proof-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
