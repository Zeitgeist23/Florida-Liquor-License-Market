"use client";

import { useEffect } from "react";

const BROKER_PAGE = "/florida-liquor-license-broker";
const SELL_PAGE = "/sell-your-license";
const BROKER_HASH = "#broker-assistance";
const BROKER_DESTINATION = `${SELL_PAGE}${BROKER_HASH}`;

function isBrokerAssistanceLink(anchor: HTMLAnchorElement) {
  const label = (anchor.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  const href = anchor.getAttribute("href") || "";

  if (!href.startsWith(SELL_PAGE)) return false;

  return (
    (label.includes("seller") && (label.includes("broker") || label.includes("assistance") || label.includes("help"))) ||
    label.includes("request broker assistance") ||
    label.includes("request broker help")
  );
}

function markBrokerAssistanceLinks() {
  if (window.location.pathname !== BROKER_PAGE) return;

  document.querySelectorAll<HTMLAnchorElement>(`a[href^="${SELL_PAGE}"]`).forEach((anchor) => {
    if (isBrokerAssistanceLink(anchor)) {
      anchor.setAttribute("href", BROKER_DESTINATION);
    }
  });
}

function openBrokerAssistancePanel() {
  if (window.location.pathname !== SELL_PAGE || window.location.hash !== BROKER_HASH) return;

  let attempts = 0;
  const activate = () => {
    const brokerCard = document.querySelector<HTMLButtonElement>(".seller-path-card-featured");

    if (!brokerCard) {
      attempts += 1;
      if (attempts < 90) window.requestAnimationFrame(activate);
      return;
    }

    if (brokerCard.getAttribute("aria-checked") !== "true") {
      brokerCard.click();
    }
  };

  window.requestAnimationFrame(activate);
}

export default function BrokerAssistanceNavigationEnhancement() {
  useEffect(() => {
    markBrokerAssistanceLinks();
    openBrokerAssistancePanel();

    const clickHandler = (event: MouseEvent) => {
      if (window.location.pathname !== BROKER_PAGE) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement) || !isBrokerAssistanceLink(anchor)) return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(BROKER_DESTINATION);
    };

    const hashHandler = () => openBrokerAssistancePanel();
    const observer = new MutationObserver(() => markBrokerAssistanceLinks());

    document.addEventListener("click", clickHandler, true);
    window.addEventListener("hashchange", hashHandler);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("click", clickHandler, true);
      window.removeEventListener("hashchange", hashHandler);
      observer.disconnect();
    };
  }, []);

  return null;
}
