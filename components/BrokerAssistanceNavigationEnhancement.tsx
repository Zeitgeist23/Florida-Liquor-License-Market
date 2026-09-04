"use client";

import { useEffect } from "react";

const BROKER_PAGE = "/florida-liquor-license-broker";
const SELL_PAGE = "/sell-your-license";
const BROKER_HASH = "#broker-assistance";
const BROKER_DESTINATION = `${SELL_PAGE}${BROKER_HASH}`;
const SELF_METHOD = "self";
const SELF_HIGHLIGHT_CLASS = "fllm-self-directed-prefill";
const SELF_HIGHLIGHT_STYLE_ID = "fllm-self-directed-prefill-style";

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

function ensureSelfDirectedHighlightStyle() {
  if (document.getElementById(SELF_HIGHLIGHT_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = SELF_HIGHLIGHT_STYLE_ID;
  style.textContent = `
    html.${SELF_HIGHLIGHT_CLASS} .seller-path-card-featured:not(.is-selected) {
      border-top-color: #647887 !important;
    }
    html.${SELF_HIGHLIGHT_CLASS} .seller-path-card.is-selected {
      border-color: #f6a700 !important;
      border-top-color: #f6a700 !important;
    }
  `;
  document.head.appendChild(style);
}

function selfDirectedRequested() {
  if (window.location.pathname !== SELL_PAGE) return false;
  return new URLSearchParams(window.location.search).get("method") === SELF_METHOD;
}

function keepListingOptionsInView() {
  const scrollToOptions = () => {
    document.getElementById("listing-options")?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  };

  window.requestAnimationFrame(scrollToOptions);
  window.setTimeout(scrollToOptions, 80);
  window.setTimeout(scrollToOptions, 220);
}

function openSelfDirectedPanel() {
  if (!selfDirectedRequested()) {
    document.documentElement.classList.remove(SELF_HIGHLIGHT_CLASS);
    return;
  }

  ensureSelfDirectedHighlightStyle();
  document.documentElement.classList.add(SELF_HIGHLIGHT_CLASS);

  let attempts = 0;
  const activate = () => {
    const selfCard = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".seller-path-card"),
    ).find((card) => (card.textContent || "").toLowerCase().includes("self-directed"));

    if (!selfCard) {
      attempts += 1;
      if (attempts < 90) window.requestAnimationFrame(activate);
      return;
    }

    if (selfCard.getAttribute("aria-checked") !== "true") {
      selfCard.click();
    }

    keepListingOptionsInView();
  };

  window.requestAnimationFrame(activate);
}

export default function BrokerAssistanceNavigationEnhancement() {
  useEffect(() => {
    markBrokerAssistanceLinks();
    openBrokerAssistancePanel();
    openSelfDirectedPanel();

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

    const locationHandler = () => {
      openBrokerAssistancePanel();
      openSelfDirectedPanel();
    };
    const observer = new MutationObserver(() => markBrokerAssistanceLinks());

    document.addEventListener("click", clickHandler, true);
    window.addEventListener("hashchange", locationHandler);
    window.addEventListener("popstate", locationHandler);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("click", clickHandler, true);
      window.removeEventListener("hashchange", locationHandler);
      window.removeEventListener("popstate", locationHandler);
      observer.disconnect();
      document.documentElement.classList.remove(SELF_HIGHLIGHT_CLASS);
    };
  }, []);

  return null;
}
