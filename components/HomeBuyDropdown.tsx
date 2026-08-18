"use client";

import { useEffect } from "react";

export default function HomeBuyDropdown() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".site-header .primary-nav");
    if (!nav || nav.querySelector(":scope > .buy-nav-dropdown")) return;

    const originalBuy = nav.querySelector<HTMLAnchorElement>(":scope > a:first-child");
    if (!originalBuy) return;

    const wrapper = document.createElement("div");
    wrapper.className = "buy-nav-dropdown";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "buy-nav-trigger";
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-label", "Buy menu");

    const label = document.createElement("span");
    label.textContent = "Buy";

    const chevron = document.createElement("img");
    chevron.className = "nav-chevron";
    chevron.src = "/assets/nav-chevron.png";
    chevron.alt = "";
    chevron.setAttribute("aria-hidden", "true");

    trigger.append(label, chevron);

    const menu = document.createElement("div");
    menu.className = "buy-nav-menu";
    menu.setAttribute("role", "menu");

    const listingsLink = document.createElement("a");
    listingsLink.href = "/listings";
    listingsLink.textContent = "View Listings";
    listingsLink.setAttribute("role", "menuitem");

    const guideLink = document.createElement("a");
    guideLink.href = "/how-to-buy-florida-liquor-license";
    guideLink.textContent = "How to Buy a Florida Liquor License";
    guideLink.setAttribute("role", "menuitem");

    menu.append(listingsLink, guideLink);
    wrapper.append(trigger, menu);

    originalBuy.style.display = "none";
    nav.insertBefore(wrapper, originalBuy);

    return () => {
      originalBuy.style.display = "";
      wrapper.remove();
    };
  }, []);

  return (
    <style>{`
      .buy-nav-dropdown {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
      }

      .buy-nav-trigger {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin: 0;
        padding: 0;
        border: 0;
        color: #fff;
        background: transparent;
        cursor: pointer;
        font: inherit;
        font-size: 10px;
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
        white-space: nowrap;
      }

      .buy-nav-trigger:hover,
      .buy-nav-trigger:focus-visible {
        color: var(--gold);
        outline: none;
      }

      .buy-nav-menu {
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: 10050;
        display: none;
        width: 310px;
        transform: translateX(-50%);
        padding: 6px;
        border: 1px solid #f6a700;
        border-radius: 6px;
        background: #061728;
        box-shadow: 0 18px 48px rgba(0, 0, 0, .48);
      }

      .buy-nav-dropdown:hover .buy-nav-menu,
      .buy-nav-dropdown:focus-within .buy-nav-menu {
        display: grid;
        gap: 4px;
      }

      .primary-nav .buy-nav-menu a {
        display: block;
        width: 100%;
        padding: 12px 13px;
        border-radius: 4px;
        color: #fff;
        text-decoration: none;
        text-transform: none;
        white-space: normal;
        font: 700 13px/1.3 Arial, Helvetica, sans-serif;
        letter-spacing: .01em;
      }

      .primary-nav .buy-nav-menu a:hover,
      .primary-nav .buy-nav-menu a:focus-visible {
        color: #061728;
        background: #f6a700;
        outline: none;
      }

      @media (max-width: 760px) {
        .buy-nav-dropdown {
          width: 100%;
          justify-content: center;
        }

        .buy-nav-menu {
          width: min(310px, calc(100vw - 24px));
        }
      }
    `}</style>
  );
}
