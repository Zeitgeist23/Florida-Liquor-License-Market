"use client";

import { useEffect } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type ListingTier = "standard" | "featured";

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

    if (window.location.hash === "#standard-listing-option" || window.location.hash === "#featured-listing-option") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".hero-plan-hit"));
    const standardLink = links.find((link) => link.getAttribute("href") === "#standard-listing-option");
    const featuredLink = links.find((link) => link.getAttribute("href") === "#featured-listing-option");
    const standardCard = standardLink?.parentElement as HTMLElement | null;
    const featuredCard = featuredLink?.parentElement as HTMLElement | null;

    if (!standardCard || !featuredCard) return;

    const defaultBadge = standardCard.querySelector("em") as HTMLElement | null;
    if (defaultBadge) defaultBadge.style.display = "none";

    const cards: Array<{ tier: ListingTier; card: HTMLElement; link: HTMLAnchorElement | undefined }> = [
      { tier: "standard", card: standardCard, link: standardLink },
      { tier: "featured", card: featuredCard, link: featuredLink },
    ];

    cards.forEach(({ card }) => {
      card.style.cursor = "pointer";
      card.style.borderColor = "rgba(255,255,255,.13)";
      card.style.background = "rgba(255,255,255,.045)";
      card.style.boxShadow = "none";
      card.style.transform = "none";
      card.style.transition = "transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease";
      const small = card.querySelector("small") as HTMLElement | null;
      if (small) {
        small.style.fontSize = "12px";
        small.style.lineHeight = "1.45";
        small.style.color = "#d4dde4";
      }
    });

    let selectedTier: ListingTier | null = null;

    const paint = (card: HTMLElement, selected: boolean, hovered = false) => {
      if (selected) {
        card.style.borderColor = "#f6a700";
        card.style.background = "rgba(246,167,0,.11)";
        card.style.boxShadow = "0 10px 24px rgba(0,0,0,.24), 0 0 18px rgba(246,167,0,.13)";
        card.style.transform = "translateY(-2px)";
      } else if (hovered) {
        card.style.borderColor = "rgba(246,167,0,.85)";
        card.style.background = "rgba(246,167,0,.08)";
        card.style.boxShadow = "0 8px 18px rgba(0,0,0,.2)";
        card.style.transform = "translateY(-2px)";
      } else {
        card.style.borderColor = "rgba(255,255,255,.13)";
        card.style.background = "rgba(255,255,255,.045)";
        card.style.boxShadow = "none";
        card.style.transform = "none";
      }
    };

    const choose = (nextTier: ListingTier) => {
      selectedTier = nextTier;
      cards.forEach(({ tier: cardTier, card }) => paint(card, cardTier === selectedTier));
      window.dispatchEvent(
        new CustomEvent("fllm:select-broker-listing-tier", {
          detail: { tier: nextTier },
        }),
      );
    };

    const cleanups: Array<() => void> = [];

    cards.forEach(({ tier: cardTier, card, link }) => {
      const onMouseEnter = () => paint(card, cardTier === selectedTier, cardTier !== selectedTier);
      const onMouseLeave = () => paint(card, cardTier === selectedTier, false);
      const onClick = () => choose(cardTier);
      const onFocus = () => paint(card, cardTier === selectedTier, cardTier !== selectedTier);
      const onBlur = () => paint(card, cardTier === selectedTier, false);

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);
      link?.addEventListener("click", onClick);
      link?.addEventListener("focus", onFocus);
      link?.addEventListener("blur", onBlur);

      cleanups.push(() => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
        link?.removeEventListener("click", onClick);
        link?.removeEventListener("focus", onFocus);
        link?.removeEventListener("blur", onBlur);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [tier]);

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
