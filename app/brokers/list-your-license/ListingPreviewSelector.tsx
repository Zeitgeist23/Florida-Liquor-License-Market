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
          position: relative;
          isolation: isolate;
          display: flex;
          min-height: 370px;
          flex-direction: column;
          box-sizing: border-box;
          margin-top: 20px;
          padding: 24px;
          overflow: hidden;
          border: 1px solid rgba(246,167,0,.48);
          border-radius: 10px;
          background:
            radial-gradient(circle at 88% 7%, rgba(43,154,196,.11), transparent 34%),
            linear-gradient(145deg, #0a2236 0%, #061827 72%, #04121d 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.04),
            0 12px 26px rgba(0,0,0,.22);
          transform: translateY(0) scale(1);
          transition:
            transform .22s ease,
            border-color .22s ease,
            box-shadow .22s ease,
            background .22s ease,
            filter .22s ease;
        }
        .broker-google-proof::before {
          content: "";
          position: absolute;
          z-index: 0;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(circle at 20% 8%, rgba(74,217,255,.16), transparent 39%),
            radial-gradient(circle at 84% 15%, rgba(246,167,0,.14), transparent 38%);
          transition: opacity .22s ease;
        }
        .broker-google-proof > * {
          position: relative;
          z-index: 1;
        }
        .broker-google-proof:hover,
        .broker-google-proof:focus-within {
          transform: translateY(-7px) scale(1.008);
          border-color: rgba(246,167,0,.9);
          background:
            radial-gradient(circle at 20% 0%, rgba(66,209,255,.16), transparent 42%),
            radial-gradient(circle at 88% 7%, rgba(246,167,0,.14), transparent 36%),
            linear-gradient(145deg, #0d2b43 0%, #082038 68%, #051724 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.09),
            inset 0 0 36px rgba(71,214,255,.09),
            0 22px 42px rgba(0,0,0,.36),
            0 0 30px rgba(246,167,0,.2);
          filter: brightness(1.055);
        }
        .broker-google-proof:hover::before,
        .broker-google-proof:focus-within::before {
          opacity: 1;
        }
        .broker-google-proof-statewide {
          border-color: rgba(105,214,255,.38);
        }
        .broker-google-proof-statewide:hover,
        .broker-google-proof-statewide:focus-within {
          border-color: rgba(105,214,255,.82);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.09),
            inset 0 0 38px rgba(71,214,255,.12),
            0 22px 42px rgba(0,0,0,.36),
            0 0 32px rgba(71,214,255,.23);
        }
        .broker-google-proof-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 15px;
        }
        .broker-google-proof-head span {
          color: #f6a700;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .1em;
        }
        .broker-google-proof-head strong {
          color: #95aebe;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
        }
        .broker-google-proof h4 {
          max-width: 580px;
          margin: 0 0 11px;
          color: #fff;
          font: 700 23px/1.2 Georgia, "Times New Roman", serif;
          transition: color .2s ease, text-shadow .2s ease;
        }
        .broker-google-proof:hover h4,
        .broker-google-proof:focus-within h4 {
          color: #fffef8;
          text-shadow: 0 0 16px rgba(255,255,255,.12);
        }
        .broker-google-proof-intro {
          max-width: 610px;
          margin: 0;
          color: #c8d5de;
          font-size: 13px;
          line-height: 1.64;
          transition: color .2s ease;
        }
        .broker-google-proof:hover .broker-google-proof-intro,
        .broker-google-proof:focus-within .broker-google-proof-intro {
          color: #dce8ef;
        }
        .broker-google-proof-intro b {
          color: #fff;
        }
        .broker-google-proof-facts {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 12px;
          margin-top: 19px;
        }
        .broker-google-proof-facts article {
          min-width: 0;
          min-height: 108px;
          box-sizing: border-box;
          padding: 16px 17px;
          border: 1px solid rgba(101,205,241,.23);
          border-radius: 8px;
          background: rgba(3,17,29,.55);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
          transform: translateY(0);
          transition:
            transform .2s ease,
            border-color .2s ease,
            background .2s ease,
            box-shadow .2s ease,
            filter .2s ease;
        }
        .broker-google-proof:hover .broker-google-proof-facts article,
        .broker-google-proof:focus-within .broker-google-proof-facts article {
          transform: translateY(-3px);
          border-color: rgba(105,214,255,.44);
          background:
            radial-gradient(circle at 50% 0%, rgba(71,214,255,.11), transparent 55%),
            linear-gradient(180deg, rgba(11,42,64,.88), rgba(3,17,29,.75));
          box-shadow:
            inset 0 0 22px rgba(71,214,255,.08),
            0 9px 20px rgba(0,0,0,.2);
          filter: brightness(1.08);
        }
        .broker-google-proof-featured:hover .broker-google-proof-facts article,
        .broker-google-proof-featured:focus-within .broker-google-proof-facts article {
          border-color: rgba(246,167,0,.42);
          background:
            radial-gradient(circle at 50% 0%, rgba(246,167,0,.1), transparent 55%),
            linear-gradient(180deg, rgba(14,44,65,.9), rgba(3,17,29,.76));
          box-shadow:
            inset 0 0 22px rgba(246,167,0,.06),
            0 9px 20px rgba(0,0,0,.2);
        }
        .broker-google-proof-facts article > span {
          display: block;
          margin-bottom: 8px;
          color: #69d6ff;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .09em;
          transition: color .2s ease, text-shadow .2s ease;
        }
        .broker-google-proof-featured:hover .broker-google-proof-facts article > span,
        .broker-google-proof-featured:focus-within .broker-google-proof-facts article > span {
          color: #ffc44a;
          text-shadow: 0 0 12px rgba(246,167,0,.18);
        }
        .broker-google-proof-facts article > strong {
          display: block;
          color: #fff;
          font-size: 13px;
          line-height: 1.45;
        }
        .broker-google-proof-actions {
          display: grid;
          gap: 8px;
          margin-top: auto;
          padding-top: 20px;
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
          color: #8da2b0;
          font-size: 9px;
          line-height: 1.5;
        }
        @media (prefers-reduced-motion: reduce) {
          .broker-google-proof,
          .broker-google-proof-facts article {
            transition: none;
          }
          .broker-google-proof:hover,
          .broker-google-proof:focus-within,
          .broker-google-proof:hover .broker-google-proof-facts article,
          .broker-google-proof:focus-within .broker-google-proof-facts article {
            transform: none;
          }
        }
        @media (max-width: 720px) {
          .broker-google-proof {
            min-height: 0;
            padding: 21px;
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
