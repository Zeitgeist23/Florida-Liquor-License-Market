"use client";

import { useEffect } from "react";

const SELF_DIRECTED_PATH = "/sell-your-license?method=self#listing-options";
const BROKER_LISTING_PATH = "/brokers/list-your-license";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";

function isHeaderListButton(link: HTMLAnchorElement) {
  if (!link.closest(".header-actions")) return false;
  const label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  return label === "list your license";
}

function createMenuLink(label: string, href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  link.setAttribute("role", "menuitem");
  return link;
}

function buildMenu() {
  const menu = document.createElement("div");
  menu.className = "fllm-list-license-hover-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "List your license options");
  menu.append(
    createMenuLink("Self-Directed Seller", SELF_DIRECTED_PATH),
    createMenuLink("Request Broker Help", BROKER_ASSISTANCE_PATH),
    createMenuLink("Broker Listing", BROKER_LISTING_PATH),
  );
  return menu;
}

function ensureMenuForLink(link: HTMLAnchorElement) {
  link.setAttribute("href", SELF_DIRECTED_PATH);
  link.setAttribute("aria-haspopup", "menu");
  link.querySelectorAll("[data-list-chevron]").forEach((node) => node.remove());

  const existingWrap = link.closest<HTMLElement>(".fllm-list-license-wrap");
  if (existingWrap) {
    let menu = existingWrap.querySelector<HTMLElement>(":scope > .fllm-list-license-hover-menu");
    if (!menu) {
      menu = buildMenu();
      existingWrap.appendChild(menu);
    }
    return;
  }

  const parent = link.parentElement;
  if (!parent) return;

  const wrap = document.createElement("div");
  wrap.className = "fllm-list-license-wrap";
  parent.insertBefore(wrap, link);
  wrap.append(link, buildMenu());
}

function installMenu() {
  document.querySelectorAll<HTMLAnchorElement>(".header-actions a").forEach((link) => {
    if (isHeaderListButton(link)) ensureMenuForLink(link);
  });

  document.querySelectorAll<HTMLElement>(".header-actions .fllm-list-license-wrap").forEach((wrap) => {
    const button = Array.from(wrap.children).find(
      (child): child is HTMLAnchorElement =>
        child instanceof HTMLAnchorElement &&
        (child.textContent || "").replace(/\s+/g, " ").trim().toLowerCase() === "list your license",
    );
    if (button) ensureMenuForLink(button);
  });
}

export default function ListYourLicenseLinkFix() {
  useEffect(() => {
    let repairTimer: ReturnType<typeof setTimeout> | null = null;

    const repair = () => {
      window.requestAnimationFrame(installMenu);
      if (repairTimer) clearTimeout(repairTimer);
      repairTimer = setTimeout(installMenu, 80);
    };

    installMenu();

    const observer = new MutationObserver(repair);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "class"],
    });

    const pageshowHandler = () => repair();
    const popstateHandler = () => repair();
    const focusHandler = () => repair();
    const visibilityHandler = () => {
      if (document.visibilityState === "visible") repair();
    };

    window.addEventListener("pageshow", pageshowHandler);
    window.addEventListener("popstate", popstateHandler);
    window.addEventListener("focus", focusHandler);
    document.addEventListener("visibilitychange", visibilityHandler);

    return () => {
      if (repairTimer) clearTimeout(repairTimer);
      observer.disconnect();
      window.removeEventListener("pageshow", pageshowHandler);
      window.removeEventListener("popstate", popstateHandler);
      window.removeEventListener("focus", focusHandler);
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);

  return (
    <style>{`
      .header-actions .fllm-list-license-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
      }

      .header-actions .fllm-list-license-wrap::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 0;
        width: 100%;
        height: 10px;
      }

      .header-actions .fllm-list-license-hover-menu {
        position: absolute;
        top: calc(100% + 7px);
        right: 0;
        z-index: 30000;
        display: none;
        width: 230px;
        padding: 6px;
        border: 1px solid #f6a700;
        border-radius: 7px;
        background: #061728;
        box-shadow: 0 18px 42px rgba(0,0,0,.42);
      }

      .header-actions .fllm-list-license-wrap:hover .fllm-list-license-hover-menu,
      .header-actions .fllm-list-license-wrap:focus-within .fllm-list-license-hover-menu {
        display: grid;
        gap: 2px;
      }

      .header-actions .fllm-list-license-hover-menu a {
        display: block;
        padding: 11px 12px;
        border-radius: 4px;
        color: #f6a700;
        font-size: 13.5px;
        font-weight: 800;
        line-height: 1.25;
        text-decoration: none;
        text-transform: none;
        white-space: normal;
      }

      .header-actions .fllm-list-license-hover-menu a:hover,
      .header-actions .fllm-list-license-hover-menu a:focus-visible {
        background: #f6a700;
        color: #061728;
        outline: none;
      }

      @media (max-width: 899px) {
        .header-actions .fllm-list-license-hover-menu {
          right: 50%;
          width: min(230px, calc(100vw - 28px));
          transform: translateX(50%);
        }
      }
    `}</style>
  );
}
