"use client";

import { useEffect } from "react";

export default function BrokerHeroSelectionFix() {
  useEffect(() => {
    const standard = document.querySelector<HTMLAnchorElement>('a[href="#standard-listing-option"]')?.parentElement as HTMLElement | null;
    const featured = document.querySelector<HTMLAnchorElement>('a[href="#featured-listing-option"]')?.parentElement as HTMLElement | null;

    if (!standard || !featured) return;

    let selectedCard: HTMLElement | null = null;

    const neutral = (card: HTMLElement) => {
      card.style.setProperty("border-color", "rgba(255,255,255,.13)", "important");
      card.style.setProperty("background", "rgba(255,255,255,.045)", "important");
      card.style.setProperty("box-shadow", "none", "important");
      card.style.setProperty("transform", "none", "important");
    };

    const selected = (card: HTMLElement) => {
      card.style.setProperty("border-color", "rgba(246,167,0,.82)", "important");
      card.style.setProperty("background", "rgba(246,167,0,.10)", "important");
      card.style.setProperty("box-shadow", "0 10px 24px rgba(0,0,0,.24), 0 0 18px rgba(246,167,0,.12)", "important");
      card.style.setProperty("transform", "translateY(-2px)", "important");
    };

    const hovered = (card: HTMLElement) => {
      card.style.setProperty("border-color", "#f6a700", "important");
      card.style.setProperty("background", "rgba(246,167,0,.14)", "important");
      card.style.setProperty("box-shadow", "0 14px 30px rgba(0,0,0,.32), 0 0 22px rgba(246,167,0,.22)", "important");
      card.style.setProperty("transform", "translateY(-4px)", "important");
    };

    const restore = (card: HTMLElement) => {
      if (selectedCard === card) selected(card);
      else neutral(card);
    };

    neutral(standard);
    neutral(featured);

    if (window.location.hash === "#standard-listing-option" || window.location.hash === "#featured-listing-option") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(".hero-plan-hit");
      if (!link) return;

      neutral(standard);
      neutral(featured);

      if (link.getAttribute("href") === "#standard-listing-option") selectedCard = standard;
      if (link.getAttribute("href") === "#featured-listing-option") selectedCard = featured;

      if (selectedCard) selected(selectedCard);
    };

    const handleStandardEnter = () => hovered(standard);
    const handleFeaturedEnter = () => hovered(featured);
    const handleStandardLeave = () => restore(standard);
    const handleFeaturedLeave = () => restore(featured);

    standard.addEventListener("mouseenter", handleStandardEnter);
    featured.addEventListener("mouseenter", handleFeaturedEnter);
    standard.addEventListener("mouseleave", handleStandardLeave);
    featured.addEventListener("mouseleave", handleFeaturedLeave);
    document.addEventListener("click", handleClick);

    return () => {
      standard.removeEventListener("mouseenter", handleStandardEnter);
      featured.removeEventListener("mouseenter", handleFeaturedEnter);
      standard.removeEventListener("mouseleave", handleStandardLeave);
      featured.removeEventListener("mouseleave", handleFeaturedLeave);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
