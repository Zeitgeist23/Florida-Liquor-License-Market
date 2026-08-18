"use client";

import { useEffect, useRef } from "react";

const MENU_WIDTH = 310;
const CLOSE_DELAY_MS = 320;

function normalizedText(element: Element | null) {
  return (element?.textContent || "").replace(/\s+/g, " ").trim();
}

function findBuyTrigger() {
  return Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".site-header .primary-nav > a"),
  ).find((link) => /^buy$/i.test(normalizedText(link))) || null;
}

export default function HomeBuyDropdown() {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const cleanupTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const clearCloseTimer = () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const closeOtherMenus = () => {
      document
        .querySelectorAll<HTMLElement>(".market-data-header-menu,.resources-header-menu")
        .forEach((otherMenu) => {
          otherMenu.classList.remove("is-open");
          otherMenu.setAttribute("aria-hidden", "true");
        });

      Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header .primary-nav > a"))
        .filter((link) => /^(market data|resources)$/i.test(normalizedText(link)))
        .forEach((link) => link.setAttribute("aria-expanded", "false"));
    };

    const positionMenu = () => {
      const trigger = triggerRef.current?.isConnected ? triggerRef.current : findBuyTrigger();
      if (!trigger) return;

      triggerRef.current = trigger;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(MENU_WIDTH, window.innerWidth - 24);
      const desiredLeft = rect.left + rect.width / 2 - width / 2;
      const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));

      menu.style.width = `${width}px`;
      menu.style.left = `${left}px`;
      menu.style.top = `${rect.bottom + 4}px`;
    };

    const openMenu = () => {
      clearCloseTimer();
      positionMenu();
      closeOtherMenus();
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      triggerRef.current?.setAttribute("aria-expanded", "true");
    };

    const closeMenu = (restoreFocus = false) => {
      clearCloseTimer();
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      triggerRef.current?.setAttribute("aria-expanded", "false");
      if (restoreFocus) triggerRef.current?.focus();
    };

    const scheduleClose = () => {
      clearCloseTimer();
      closeTimerRef.current = window.setTimeout(() => {
        const trigger = triggerRef.current;
        const active = document.activeElement;
        const pointerInside = Boolean(trigger?.matches(":hover")) || menu.matches(":hover");
        const focusInside = active instanceof Node && (
          Boolean(trigger?.contains(active)) || menu.contains(active)
        );
        if (!pointerInside && !focusInside) closeMenu();
      }, CLOSE_DELAY_MS);
    };

    const bindTrigger = () => {
      const trigger = findBuyTrigger();
      if (!trigger) return false;
      if (trigger === triggerRef.current && cleanupTriggerRef.current) {
        positionMenu();
        return true;
      }

      cleanupTriggerRef.current?.();
      triggerRef.current = trigger;
      trigger.href = "#buy-menu";
      trigger.setAttribute("aria-haspopup", "menu");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("data-home-buy-menu-trigger", "true");

      const handlePointerEnter = () => openMenu();
      const handlePointerLeave = () => scheduleClose();
      const handleFocus = () => openMenu();
      const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (menu.classList.contains("is-open")) closeMenu();
        else openMenu();
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          openMenu();
          menu.querySelector<HTMLElement>("a")?.focus();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          closeMenu(true);
        }
      };

      trigger.addEventListener("pointerenter", handlePointerEnter);
      trigger.addEventListener("pointerleave", handlePointerLeave);
      trigger.addEventListener("focus", handleFocus);
      trigger.addEventListener("click", handleClick);
      trigger.addEventListener("keydown", handleKeyDown);

      cleanupTriggerRef.current = () => {
        trigger.removeEventListener("pointerenter", handlePointerEnter);
        trigger.removeEventListener("pointerleave", handlePointerLeave);
        trigger.removeEventListener("focus", handleFocus);
        trigger.removeEventListener("click", handleClick);
        trigger.removeEventListener("keydown", handleKeyDown);
      };

      positionMenu();
      return true;
    };

    const handleMenuPointerEnter = () => clearCloseTimer();
    const handleMenuPointerLeave = () => scheduleClose();
    const handleMenuFocusIn = () => clearCloseTimer();
    const handleMenuFocusOut = () => scheduleClose();

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menu.contains(target) || Boolean(triggerRef.current?.contains(target))) return;
      if (menu.classList.contains("is-open")) closeMenu();
    };

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        event.preventDefault();
        closeMenu(true);
      }
    };

    const handleViewportChange = () => {
      bindTrigger();
      positionMenu();
    };

    menu.addEventListener("pointerenter", handleMenuPointerEnter);
    menu.addEventListener("pointerleave", handleMenuPointerLeave);
    menu.addEventListener("focusin", handleMenuFocusIn);
    menu.addEventListener("focusout", handleMenuFocusOut);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeyDown);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, { passive: true });

    bindTrigger();
    const retryTimers = [100, 300, 800, 1600].map((delay) =>
      window.setTimeout(bindTrigger, delay),
    );

    const observer = new MutationObserver(() => bindTrigger());
    observer.observe(document.querySelector(".site-header") || document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearCloseTimer();
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
      cleanupTriggerRef.current?.();
      cleanupTriggerRef.current = null;
      menu.removeEventListener("pointerenter", handleMenuPointerEnter);
      menu.removeEventListener("pointerleave", handleMenuPointerLeave);
      menu.removeEventListener("focusin", handleMenuFocusIn);
      menu.removeEventListener("focusout", handleMenuFocusOut);
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange);
    };
  }, []);

  return (
    <>
      <style>{`
        .home-buy-header-menu {
          position: fixed;
          z-index: 10060;
          display: none;
          width: 310px;
          padding: 6px;
          border: 1px solid #f6a700;
          border-radius: 6px;
          background: #061728;
          box-shadow: 0 18px 48px rgba(0,0,0,.48), 0 0 0 1px rgba(246,167,0,.12);
          font-family: Arial, Helvetica, sans-serif;
        }
        .home-buy-header-menu.is-open {
          display: grid;
          gap: 4px;
        }
        .home-buy-header-menu::before {
          content: "";
          position: absolute;
          top: -7px;
          left: 50%;
          width: 12px;
          height: 12px;
          transform: translateX(-50%) rotate(45deg);
          border-left: 1px solid #f6a700;
          border-top: 1px solid #f6a700;
          background: #061728;
        }
        .home-buy-header-menu a {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          padding: 12px 13px;
          border-radius: 4px;
          color: #fff;
          text-decoration: none;
          text-transform: none;
          font: 700 13px/1.3 Arial, Helvetica, sans-serif;
          letter-spacing: .01em;
        }
        .home-buy-header-menu a:hover,
        .home-buy-header-menu a:focus-visible {
          background: #f6a700;
          color: #061728;
          outline: none;
        }
        @media (hover: hover) and (pointer: fine) {
          body:has(.site-header .primary-nav > a[data-home-buy-menu-trigger="true"]:hover) .home-buy-header-menu {
            display: grid;
            gap: 4px;
          }
        }
        @media (max-width: 760px) {
          .home-buy-header-menu {
            width: min(310px, calc(100vw - 24px));
          }
        }
      `}</style>
      <div
        id="buy-menu"
        ref={menuRef}
        className="home-buy-header-menu"
        role="menu"
        aria-hidden="true"
        aria-label="Buy menu"
      >
        <a role="menuitem" href="/listings">View Listings</a>
        <a role="menuitem" href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a>
      </div>
    </>
  );
}
