"use client";

import { useEffect } from "react";

const MENU_LINKS = [
  {
    label: "Market Data",
    href: "/#market-data",
    chevron: true,
  },
  {
    label: "License Types",
    href: "/resources/florida-liquor-license-types",
    chevron: false,
  },
  {
    label: "Resources",
    href: "/resources/forms",
    chevron: true,
  },
] as const;

const REQUIRED_SCRIPTS = [
  {
    key: "market-data",
    src: "/assets/market-data-dropdown.js?v=10",
  },
  {
    key: "resources",
    src: "/assets/resources-dropdown.js?v=10",
  },
  {
    key: "hover",
    src: "/assets/header-menu-hover.js?v=2",
  },
] as const;

function normalizedText(element: Element | null) {
  return (element?.textContent || "").replace(/\s+/g, " ").trim();
}

function findLinkByLabel(navigation: HTMLElement, label: string) {
  return Array.from(navigation.querySelectorAll(":scope > a")).find(
    (link) => normalizedText(link).toLowerCase() === label.toLowerCase(),
  );
}

function createNavigationLink({
  label,
  href,
  chevron,
}: (typeof MENU_LINKS)[number]) {
  const link = document.createElement("a");
  link.href = href;
  link.dataset.listingsHeaderMenuLink = label.toLowerCase().replace(/\s+/g, "-");

  const text = document.createElement("span");
  text.textContent = label;
  link.appendChild(text);

  if (chevron) {
    const icon = document.createElement("img");
    icon.className = "nav-chevron";
    icon.src = "/assets/nav-chevron.png";
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    link.appendChild(icon);
  }

  return link;
}

function ensureScripts() {
  REQUIRED_SCRIPTS.forEach(({ key, src }) => {
    if (document.querySelector(`script[data-listings-header-menu-script="${key}"]`)) return;

    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.listingsHeaderMenuScript = key;
    document.body.appendChild(script);
  });
}

function ensureResponsiveStyles() {
  if (document.getElementById("listings-header-hover-menu-styles")) return;

  const style = document.createElement("style");
  style.id = "listings-header-hover-menu-styles";
  style.textContent = `
    .results-page > .results-header nav.primary-nav > a {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .results-page > .results-header nav.primary-nav .nav-chevron {
      flex: 0 0 auto;
      width: 9px;
      height: 7px;
      object-fit: contain;
    }

    @media (min-width: 821px) and (max-width: 1180px) {
      .results-page > .results-header nav.primary-nav {
        gap: 10px !important;
      }

      .results-page > .results-header nav.primary-nav > a {
        font-size: 9.5px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function enhanceListingsHeader() {
  const navigation = document.querySelector(
    ".results-page > .results-header nav[aria-label='Listings navigation']",
  );
  if (!(navigation instanceof HTMLElement)) return false;

  navigation.classList.add("primary-nav");
  const contactLink = findLinkByLabel(navigation, "Contact Us") || null;

  MENU_LINKS.forEach((item) => {
    if (findLinkByLabel(navigation, item.label)) return;
    navigation.insertBefore(createNavigationLink(item), contactLink);
  });

  ensureResponsiveStyles();
  ensureScripts();
  return true;
}

export default function ListingsHeaderHoverMenus() {
  useEffect(() => {
    enhanceListingsHeader();

    const observer = new MutationObserver(() => {
      enhanceListingsHeader();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const retries = [250, 700, 1500, 2600].map((delay) =>
      window.setTimeout(enhanceListingsHeader, delay),
    );

    return () => {
      observer.disconnect();
      retries.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return null;
}
