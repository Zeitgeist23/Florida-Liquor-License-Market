"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import BrokerSampleModalLink from "@/components/BrokerSampleModalLink";
import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import type { Listing } from "@/data/listings";

type ListingTier = "standard" | "featured";

const statewideGoogleProofImage = "data:image/jpeg;base64,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[... ELLIPSIZATION ...]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";

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

      {tier === "standard" ? (
        <section className="broker-google-proof broker-google-proof-statewide" aria-label="Observed statewide Google AI visibility for Florida Liquor License Market">
          <div className="broker-google-proof-head">
            <span>STATEWIDE SEARCH PROOF</span>
            <strong>Observed September 17, 2026</strong>
          </div>

          <h4>Google&apos;s AI Overview linked directly to FLLM for a broad statewide quota-license search</h4>

          <div className="broker-google-proof-image-wrap">
            <img
              className="broker-google-proof-image"
              src={statewideGoogleProofImage}
              alt="Non-personalized Google search for florida quota liquor license for sale showing Florida Liquor License Market linked in the AI Overview and source panel"
            />
          </div>

          <p className="broker-google-proof-intro">
            In a non-personalized search for <b>“florida quota liquor license for sale”</b>, Google linked its AI Overview directly to FLLM&apos;s statewide 4COP marketplace page and also displayed FLLM in the supporting source panel.
          </p>

          <div className="broker-google-proof-actions">
            <a href="/florida-4cop-liquor-license-for-sale">Open the statewide 4COP marketplace →</a>
            <small>This is platform-level search visibility, not a guarantee that any Standard or Featured listing will rank. Search results and AI citations change over time.</small>
          </div>
        </section>
      ) : null}

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
        .broker-google-proof-statewide {
          border-color: rgba(105,214,255,.42);
          background:
            radial-gradient(circle at 12% 6%, rgba(105,214,255,.13), transparent 38%),
            linear-gradient(145deg, #0a2236 0%, #061827 72%, #04121d 100%);
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
        .broker-google-proof-image-wrap {
          overflow: hidden;
          margin: 14px 0 15px;
          border: 1px solid rgba(105,214,255,.32);
          border-radius: 7px;
          background: #fff;
          box-shadow: 0 10px 24px rgba(0,0,0,.28);
        }
        .broker-google-proof-image {
          display: block;
          width: 100%;
          height: auto;
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
