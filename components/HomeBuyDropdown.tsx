"use client";

import { useEffect, useRef } from "react";

function findBuyTrigger() {
  return document.querySelector<HTMLAnchorElement>(
    ".site-header .primary-nav > a:first-child",
  );
}

export default function HomeBuyDropdown() {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    let trigger: HTMLAnchorElement | null = null;
    let closeTimer: number | null = null;
    let unbindTrigger: (() => void) | null = null;

    const clearCloseTimer = () => {
      if (closeTimer !== null) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    const positionFallback = () => {
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(310, window.innerWidth - 24);
      const left = Math.max(
        12,
        Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12),
      );
      menu.style.width = `${width}px`;
      menu.style.left = `${left}px`;
      menu.style.top = `${rect.bottom}px`;
    };

    const open = () => {
      clearCloseTimer();
      positionFallback();
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      trigger?.setAttribute("aria-expanded", "true");
    };

    const close = () => {
      clearCloseTimer();
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      trigger?.setAttribute("aria-expanded", "false");
    };

    const scheduleClose = () => {
      clearCloseTimer();
      closeTimer = window.setTimeout(() => {
        const pointerInside = Boolean(trigger?.matches(":hover")) || menu.matches(":hover");
        const active = document.activeElement;
        const focusInside = active instanceof Node && (
          Boolean(trigger?.contains(active)) || menu.contains(active)
        );
        if (!pointerInside && !focusInside) close();
      }, 350);
    };

    const bindTrigger = () => {
      const nextTrigger = findBuyTrigger();
      if (!nextTrigger) return false;
      if (nextTrigger === trigger && unbindTrigger) {
        positionFallback();
        return true;
      }

      unbindTrigger?.();
      trigger = nextTrigger;
      trigger.href = "#buy-menu";
      trigger.setAttribute("aria-haspopup", "menu");
      trigger.setAttribute("aria-controls", "buy-menu");
      trigger.setAttribute("aria-expanded", "false");

      const onEnter = () => open();
      const onLeave = () => scheduleClose();
      const onFocus = () => open();
      const onClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (menu.classList.contains("is-open")) close();
        else open();
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
          menu.querySelector<HTMLAnchorElement>("a")?.focus();
        } else if (event.key === "Escape") {
          event.preventDefault();
          close();
          trigger?.focus();
        }
      };

      trigger.addEventListener("pointerenter", onEnter);
      trigger.addEventListener("pointerleave", onLeave);
      trigger.addEventListener("focus", onFocus);
      trigger.addEventListener("click", onClick);
      trigger.addEventListener("keydown", onKeyDown);

      unbindTrigger = () => {
        nextTrigger.removeEventListener("pointerenter", onEnter);
        nextTrigger.removeEventListener("pointerleave", onLeave);
        nextTrigger.removeEventListener("focus", onFocus);
        nextTrigger.removeEventListener("click", onClick);
        nextTrigger.removeEventListener("keydown", onKeyDown);
      };

      positionFallback();
      return true;
    };

    const onMenuEnter = () => clearCloseTimer();
    const onMenuLeave = () => scheduleClose();
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menu.contains(target) || Boolean(trigger?.contains(target))) return;
      close();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        close();
        trigger?.focus();
      }
    };
    const onViewportChange = () => positionFallback();

    menu.addEventListener("pointerenter", onMenuEnter);
    menu.addEventListener("pointerleave", onMenuLeave);
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, { passive: true });

    bindTrigger();
    const retries = [100, 300, 700, 1400].map((delay) =>
      window.setTimeout(bindTrigger, delay),
    );

    return () => {
      clearCloseTimer();
      retries.forEach((timer) => window.clearTimeout(timer));
      unbindTrigger?.();
      menu.removeEventListener("pointerenter", onMenuEnter);
      menu.removeEventListener("pointerleave", onMenuLeave);
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange);
    };
  }, []);

  return (
    <>
      <style>{`
        .site-header .primary-nav > a:first-child {
          anchor-name: --fllm-buy-trigger;
        }

        .home-buy-header-menu {
          position: fixed;
          z-index: 2147483000;
          display: none;
          width: 310px;
          padding: 6px;
          border: 1px solid #f6a700;
          border-radius: 6px;
          background: #061728;
          box-shadow: 0 18px 48px rgba(0,0,0,.48), 0 0 0 1px rgba(246,167,0,.12);
          font-family: Arial, Helvetica, sans-serif;
          pointer-events: auto;
        }

        @supports (position-anchor: --fllm-buy-trigger) {
          .home-buy-header-menu {
            position-anchor: --fllm-buy-trigger;
            top: anchor(bottom);
            left: anchor(center);
            transform: translateX(-50%);
          }
        }

        .home-buy-header-menu.is-open,
        .home-buy-header-menu:hover,
        .home-buy-header-menu:focus-within {
          display: grid;
          gap: 4px;
        }

        @media (hover: hover) and (pointer: fine) {
          body:has(.site-header .primary-nav > a:first-child:hover) .home-buy-header-menu {
            display: grid !important;
            gap: 4px;
          }
        }

        .home-buy-header-menu::before {
          content: "";
          position: absolute;
          top: -6px;
          left: 50%;
          width: 10px;
          height: 10px;
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
          color: #fff !important;
          background: transparent;
          text-decoration: none;
          text-transform: none !important;
          font: 700 13px/1.3 Arial, Helvetica, sans-serif !important;
          letter-spacing: .01em !important;
          white-space: normal;
        }

        .home-buy-header-menu a:hover,
        .home-buy-header-menu a:focus-visible {
          background: #f6a700;
          color: #061728 !important;
          outline: none;
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
        <a role="menuitem" href="/how-to-buy-florida-liquor-license">
          How to Buy a Florida Liquor License
        </a>
      </div>
    </>
  );
}
