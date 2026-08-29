"use client";

import type { KeyboardEvent, ReactNode } from "react";

type ListingTier = "standard" | "featured";

export default function ListingPreviewSelector({
  tier,
  className,
  children,
}: {
  tier: ListingTier;
  className?: string;
  children: ReactNode;
}) {
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

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    chooseListing();
  }

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label={`Choose the ${tier} listing and continue to the broker submission form`}
      onClick={chooseListing}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
