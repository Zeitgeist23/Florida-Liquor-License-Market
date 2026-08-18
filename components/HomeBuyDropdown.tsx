"use client";

import { useEffect, useRef } from "react";

const MENU_WIDTH = 310;
const CLOSE_DELAY_MS = 220;

function normalizedText(element: Element | null) {
  return (element?.textContent || "").replace(/\s+/g, " ").trim();
}

function findBuyTrigger() {
  return Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".site-header .primary-nav a"),
  ).find((link) => /^buy$/i.test(normalizedText(link))) || null;
}

export default function HomeBuyDropdown() {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const clearCloseTimer = () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const ensureTrigger = () => {
      const trigger = findBuyTrigger();
      if (!trigger) return null;
      triggerRef.current = trigger;
      trigger.setAttribute("aria-haspopup", "menu");
      if (!trigger.hasAttribute("aria-expanded")) trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("data-home-buy-menu-trigger", "true");
      return trigger;
    };

    const positionMenu = () => {
      const trigger = triggerRef.current?.isConnected ? triggerRef.current : ensureTrigger();
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const width = Math.min(MENU_WIDTH, window.innerWidth - 24);
      const desiredLeft = rect.left + rect.width / 2 - width / 2;
      const left = Math.max(12, Math.min(desiredLeft, window.innerWidth - width - 12));

      menu.style.width = `${width}px`;
      menu.style.left = `${left}px`;
      menu.style.top = `${rect.bottom + 8}px`;
    };

    const closeOtherMenus = () => {
      document
        .querySelectorAll<HTMLElement>(".market-data-header-menu,.resources-header-menu")
        .forEach((otherMenu) => {
          otherMenu.classList.remove("is-open");
          otherMenu.setAttribute("aria-hidden", "true");
        });

      Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-header .primary-nav a"))
        .filter((link) => /^(market data|resources)$/i.test(normalizedText(link)))
        .forEach((link) => link.setAttribute("aria-expanded", "false"));
    };

    const openMenu = () => {
      clearCloseTimer();
      const trigger = ensureTrigger();
      if (!trigger) return;
      closeOtherMenus();
      positionMenu();
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
    };

    const closeMenu = (restoreFocus = false) => {
      clearCloseTimer();
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      const trigger = triggerRef.current?.isConnected ? triggerRef.current : ensureTrigger();
      trigger?.setAttribute("aria-expanded", "false");
      if (restoreFocus) trigger?.focus();
    };

    const scheduleClose = () => {
      clearCloseTimer();
      closeTimerRef.current = window.setTimeout(() => {
        const trigger = triggerRef.current?.isConnected ? triggerRef.current : ensureTrigger();
        const active = document.activeElement;
        const pointerInside = Boolean(trigger?.matches(":hover")) || menu.matches(":hover");
        const focusInside = active instanceof Node && (
          Boolean(trigger?.contains(active)) || menu.contains(active)
        );
        if (!pointerInside && !focusInside) closeMenu();
      }, CLOSE_DELAY_MS);
    };

    const isBuyTrigger = (element: Element | null) => {
      const link = element?.closest(".site-header .primary-nav a");
      return link instanceof HTMLAnchorElement && /^buy$/i.test(normalizedText(link)) ? link : null;
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = isBuyTrigger(target);
      if (trigger) {
        triggerRef.current = trigger;
        const previous = event.relatedTarget;
        if (!(previous instanceof Node && trigger.contains(previous))) openMenu();
        return;
      }

      if (menu.contains(target)) clearCloseTimer();
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const next = event.relatedTarget;

      const trigger = isBuyTrigger(target);
      if (trigger) {
        if (next instanceof Node && (trigger.contains(next) || menu.contains(next))) return;
        scheduleClose();
        return;
      }

      if (menu.contains(target)) {
        const currentTrigger = triggerRef.current;
        if (next instanceof Node && (menu.contains(next) || Boolean(currentTrigger?.contains(next)))) return;
        scheduleClose();
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = isBuyTrigger(target);
      if (trigger) {
        event.preventDefault();
        event.stopPropagation();
        triggerRef.current = trigger;
        if (menu.classList.contains("is-open")) closeMenu();
        else openMenu();
        return;
      }

      if (menu.contains(target)) {
        closeMenu();
        return;
      }

      if (menu.classList.contains("is-open")) closeMenu();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const targetElement = target instanceof Element ? target : null;
      const trigger = isBuyTrigger(targetElement);

      if (trigger && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        triggerRef.current = trigger;
        openMenu();
        menu.querySelector<HTMLElement>("a")?.focus();
        return;
      }

      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        event.preventDefault();
        closeMenu(true);
      }
    };

    const onResize = () => {
      if (menu.classList.contains("is-open")) positionMenu();
    };

    const onScroll = () => {
      if (menu.classList.contains("is-open")) positionMenu();
    };

    ensureTrigger();
    const observer = new MutationObserver(() => ensureTrigger());
    observer.observe(document.documentElement, { childList: true, subtree: true });

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearCloseTimer();
      observer.disconnect();
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        .home-buy-header-menu {
          position: fixed;
          z-index: 10050;
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
          font: 700 13px/1.3 Arial, Helvetica, sans-serif;
          letter-spacing: .01em;
        }
        .home-buy-header-menu a:hover,
        .home-buy-header-menu a:focus-visible {
          background: #f6a700;
          color: #061728;
          outline: none;
        }
        @media (max-width: 760px) {
          .home-buy-header-menu {
            width: min(310px, calc(100vw - 24px));
          }
        }
      `}</style>
      <div
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
