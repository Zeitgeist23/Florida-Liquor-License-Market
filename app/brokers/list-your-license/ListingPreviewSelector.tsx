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

      {tier === "standard" ? (
        <section
          className="broker-google-proof broker-google-proof-statewide"
          aria-label="Observed statewide Google visibility for Florida Liquor License Market"
        >
          <div className="broker-google-proof-head">
            <span>STATEWIDE SEARCH VISIBILITY</span>
            <strong>Observed September 17, 2026</strong>
          </div>

          <h4>Google AI Overview linked directly to FLLM</h4>
          <p className="broker-google-proof-intro">
            In a non-personalized search for <b>“florida quota liquor license for sale”</b>, Google linked directly to FLLM&apos;s statewide 4COP marketplace page.
          </p>

          <div className="broker-google-proof-facts">
            <article>
              <span>AI OVERVIEW</span>
              <strong>FLLM linked as a statewide quota-license marketplace</strong>
            </article>
            <article>
              <span>SOURCE PANEL</span>
              <strong>FLLM displayed among supporting marketplace sources</strong>
            </article>
          </div>

          <div className="broker-google-proof-actions">
            <a href="/florida-4cop-liquor-license-for-sale">Open the statewide 4COP marketplace →</a>
            <small>Observed search visibility only. Rankings and AI citations can change and are not guaranteed.</small>
          </div>
        </section>
      ) : null}

      {tier === "featured" ? (
        <section
          className="broker-google-proof broker-google-proof-featured"
          aria-label="Observed Google visibility for a Featured FLLM broker listing"
        >
          <div className="broker-google-proof-head">
            <span>FEATURED LISTING SEARCH VISIBILITY</span>
            <strong>Observed September 17, 2026</strong>
          </div>

          <h4>Featured FLLM listing appeared on Google Page 1</h4>
          <p className="broker-google-proof-intro">
            For <b>“florida liquor license for sale in pinellas county”</b>, the live FLLM-ANTEZZA Featured listing appeared on page 1 and was also cited in Google&apos;s AI Overview.
          </p>

          <div className="broker-google-proof-facts">
            <article>
              <span>AI OVERVIEW</span>
              <strong>Florida Liquor License Market cited as a marketplace source</strong>
            </article>
            <article>
              <span>PAGE 1 ORGANIC</span>
              <strong>Pinellas County 4COP Quota Liquor License for Sale</strong>
            </article>
          </div>

          <div className="broker-google-proof-actions">
            <a href="/listings/fllm-antezza">View the live Featured example →</a>
            <small>Observed search visibility only. FLLM does not guarantee rankings, AI citations, impressions, clicks, or traffic.</small>
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
          display: flex;
          min-height: 335px;
          flex-direction: column;
          box-sizing: border-box;
          margin-top: 20px;
          padding: 20px;
          border: 1px solid rgba(246,167,0,.48);
          border-radius: 10px;
          background:
            radial-gradient(circle at 88% 7%, rgba(43,154,196,.11), transparent 34%),
            linear-gradient(145deg, #0a2236 0%, #061827 72%, #04121d 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 12px 26px rgba(0,0,0,.22);
        }
        .broker-google-proof-statewide {
          border-color: rgba(105,214,255,.38);
        }
        .broker-google-proof-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 13px;
        }
        .broker-google-proof-head span {
          color: #f6a700;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .1em;
        }
        .broker-google-proof-head strong {
          color: #95aebe;
          font-size: 9px;
          font-weight: 800;
          white-space: nowrap;
        }
        .broker-google-proof h4 {
          max-width: 560px;
          margin: 0 0 9px;
          color: #fff;
          font: 700 21px/1.18 Georgia, "Times New Roman", serif;
        }
        .broker-google-proof-intro {
          max-width: 590px;
          margin: 0;
          color: #c8d5de;
          font-size: 12px;
          line-height: 1.58;
        }
        .broker-google-proof-intro b {
          color: #fff;
        }
        .broker-google-proof-facts {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 10px;
          margin-top: 17px;
        }
        .broker-google-proof-facts article {
          min-width: 0;
          min-height: 92px;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid rgba(101,205,241,.23);
          border-radius: 8px;
          background: rgba(3,17,29,.55);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
        }
        .broker-google-proof-facts article > span {
          display: block;
          margin-bottom: 7px;
          color: #69d6ff;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .09em;
        }
        .broker-google-proof-facts article > strong {
          display: block;
          color: #fff;
          font-size: 12px;
          line-height: 1.38;
        }
        .broker-google-proof-actions {
          display: grid;
          gap: 7px;
          margin-top: auto;
          padding-top: 17px;
        }
        .broker-google-proof-actions > a {
          width: fit-content;
          color: #f6b51f;
          font-size: 11px;
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
          font-size: 8px;
          line-height: 1.45;
        }
        @media (max-width: 720px) {
          .broker-google-proof {
            min-height: 0;
          }
          .broker-google-proof-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }
          .broker-google-proof-head strong {
            white-space: normal;
          }
          .broker-google-proof-facts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
