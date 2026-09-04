"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import BrokerDetailPreview from "@/components/BrokerDetailPreview";
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

      <BrokerDetailPreview tier={tier} />

      <style jsx global>{`
        .broker-marketplace-card-preview a {
          pointer-events: none !important;
        }
        .broker-marketplace-card-preview .result-card {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
