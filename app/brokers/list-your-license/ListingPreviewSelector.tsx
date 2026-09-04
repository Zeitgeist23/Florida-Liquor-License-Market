"use client";

import { useEffect } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type ListingTier = "standard" | "featured";

function applyHeroSelection(selected: ListingTier) {
  const hits = Array.from(document.querySelectorAll<HTMLAnchorElement>(".hero-plan-hit"));
  if (hits.length < 2) return;

  hits.forEach((hit, index) => {
    const card = hit.parentElement as HTMLElement | null;
    if (!card) return;

    const tier: ListingTier = index === 0 ? "standard" : "featured";
    const isSelected = tier === selected;

    card.style.borderColor = isSelected
      ? "rgba(246,167,0,.82)"
      : "rgba(255,255,255,.13)";
    card.style.background = isSelected
      ? "rgba(246,167,0,.10)"
      : "rgba(255,255,255,.045)";
    card.style.boxShadow = isSelected
      ? "0 10px 24px rgba(0,0,0,.24), 0 0 18px rgba(246,167,0,.12)"
      : "none";
    card.style.transform = isSelected ? "translateY(-2px)" : "none";
  });
}

function ensureHeroPlanHandlers() {
  const hits = Array.from(document.querySelectorAll<HTMLAnchorElement>(".hero-plan-hit"));
  if (hits.length < 2) return;

  applyHeroSelection("standard");

  hits.forEach((hit, index) => {
    if (hit.dataset.fllmTierBound === "true") return;
    hit.dataset.fllmTierBound = "true";

    const tier: ListingTier = index === 0 ? "standard" : "featured";
    hit.addEventListener("click", () => applyHeroSelection(tier));
  });
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
    ensureHeroPlanHandlers();
  }, []);

  function chooseListing() {
    applyHeroSelection(tier);
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
