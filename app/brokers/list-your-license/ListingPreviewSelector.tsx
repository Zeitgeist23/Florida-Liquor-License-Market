"use client";

import { useEffect } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type ListingTier = "standard" | "featured";

function applyHeroSelection(tier: ListingTier) {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".hero-plan-hit"));
  const standardLink = links.find((link) => link.getAttribute("href") === "#standard-listing-option");
  const featuredLink = links.find((link) => link.getAttribute("href") === "#featured-listing-option");
  const standardCard = standardLink?.parentElement as HTMLElement | null;
  const featuredCard = featuredLink?.parentElement as HTMLElement | null;

  const neutral = (card: HTMLElement | null) => {
    if (!card) return;
    card.style.borderColor = "rgba(255,255,255,.13)";
    card.style.background = "rgba(255,255,255,.045)";
    card.style.boxShadow = "none";
    card.style.transform = "none";
  };

  const selected = (card: HTMLElement | null) => {
    if (!card) return;
    card.style.borderColor = "rgba(246,167,0,.82)";
    card.style.background = "rgba(246,167,0,.10)";
    card.style.boxShadow = "0 10px 24px rgba(0,0,0,.24), 0 0 18px rgba(246,167,0,.12)";
    card.style.transform = "translateY(-2px)";
  };

  neutral(standardCard);
  neutral(featuredCard);
  selected(tier === "standard" ? standardCard : featuredCard);
}

function selectTierAndScroll(tier: ListingTier) {
  applyHeroSelection(tier);
  window.dispatchEvent(
    new CustomEvent("fllm:select-broker-listing-tier", {
      detail: { tier },
    }),
  );
  window.setTimeout(() => {
    document
      .getElementById(`${tier}-listing-option`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 0);
}

export default function ListingPreviewSelector({
  tier,
  className,
  id,
  children,
}: {
  tier: ListingTier;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (tier !== "standard") return;

    applyHeroSelection("standard");

    const handleHeroClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>(".hero-plan-hit");
      if (!link) return;

      const href = link.getAttribute("href");
      const selectedTier: ListingTier | null =
        href === "#featured-listing-option"
          ? "featured"
          : href === "#standard-listing-option"
            ? "standard"
            : null;
      if (!selectedTier) return;

      event.preventDefault();
      selectTierAndScroll(selectedTier);
    };

    document.addEventListener("click", handleHeroClick);
    return () => document.removeEventListener("click", handleHeroClick);
  }, [tier]);

  function chooseListing() {
    selectTierAndScroll(tier);
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
      onClick={chooseListing}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
