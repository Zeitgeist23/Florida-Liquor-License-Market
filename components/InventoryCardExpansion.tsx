"use client";

import { useEffect } from "react";

const interactiveSelector = "a, button, input, select, textarea, label";

export default function InventoryCardExpansion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".results-page");
    if (!root) return;

    const getCards = () => Array.from(root.querySelectorAll<HTMLElement>(".result-card"));

    const prepareCards = () => {
      getCards().forEach((card) => {
        card.tabIndex = 0;
        card.setAttribute("aria-expanded", card.classList.contains("is-expanded") ? "true" : "false");
      });
    };

    const closeAll = () => {
      getCards().forEach((card) => {
        card.classList.remove("is-expanded");
        card.setAttribute("aria-expanded", "false");
      });
    };

    const toggleCard = (card: HTMLElement) => {
      const shouldExpand = !card.classList.contains("is-expanded");
      closeAll();
      if (shouldExpand) {
        card.classList.add("is-expanded");
        card.setAttribute("aria-expanded", "true");
      }
    };

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(interactiveSelector)) return;

      const card = target.closest<HTMLElement>(".result-card");
      if (card) {
        toggleCard(card);
        return;
      }

      closeAll();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (event.key === "Escape") {
        closeAll();
        return;
      }

      if (target.closest(interactiveSelector)) return;

      const card = target.closest<HTMLElement>(".result-card");
      if (!card || (event.key !== "Enter" && event.key !== " ")) return;

      event.preventDefault();
      toggleCard(card);
    };

    prepareCards();
    const observer = new MutationObserver(prepareCards);
    observer.observe(root, { childList: true, subtree: true });

    root.addEventListener("click", handleClick);
    root.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      root.removeEventListener("click", handleClick);
      root.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
