"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import type { Listing } from "@/data/listings";

type ListingTier = "standard" | "featured";

const standardPreviewListing: Listing = {
  county: "Orange County",
  type: "4COP Quota",
  price: 435000,
  priceLabel: "$435,000",
  sourceRef: "FLLM-005",
  image: "/assets/inventory/07.png",
};

const featuredPreviewListing: Listing = {
  ...standardPreviewListing,
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
    window.dispatchEvent(
      new CustomEvent("fllm:select-broker-listing-tier", {
        detail: { tier },
      }),
    );
    document
      .getElementById("broker-listing-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    chooseListing();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    chooseListing();
  }

  return (
    <div
      id={id}
      className={className}
      role="button"
      tabIndex={0}
      aria-label={`Choose the ${tier} listing and continue to the broker submission form`}
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
  );
}
