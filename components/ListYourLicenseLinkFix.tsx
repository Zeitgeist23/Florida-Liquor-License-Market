"use client";

import { useEffect, useRef } from "react";

const SELF_DIRECTED_PATH = "/sell-your-license?method=self#listing-options";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";
const BROKER_LISTING_PATH = "/brokers/list-your-license";

function isListYourLicenseControl(control: HTMLElement) {
  if (!control.closest(".header-actions")) return false;
  const label = (control.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  return label === "list your license";
}

export default function ListYourLicenseLinkFix() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const bound = new Map<HTMLElement, {
      enter: () => void;
      leave: () => void;
      focus: () => void;
      click: (event: MouseEvent) => void;
    }>();

    const cancelClose = () => {
      if (!closeTimer.current) return;
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    };

    const hideMenu = () => {
      cancelClose();
      const menu = menuRef.current;
      if (!menu) return;
      menu.style.display = "none";
      menu.setAttribute("aria-hidden", "true");
    };

    const scheduleClose = () => {
      cancelClose();
      closeTimer.current = setTimeout(hideMenu, 220);
    };

    const showMenu = (control: HTMLElement) => {
      cancelClose();
      const menu = menuRef.current;
      if (!menu) return;

      const rect = control.getBoundingClientRect();
      const menuWidth = Math.min(290, window.innerWidth - 28);
      const left = Math.max(14, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 14));

      menu.style.top = `${Math.round(rect.bottom + 7)}px`;
      menu.style.left = `${Math.round(left)}px`;
      menu.style.width = `${menuWidth}px`;
      menu.style.display = "grid";
      menu.setAttribute("aria-hidden", "false");
    };

    const bindControl = (control: HTMLElement) => {
      if (!isListYourLicenseControl(control) || bound.has(control)) return;

      if (control instanceof HTMLAnchorElement) {
        control.href = SELF_DIRECTED_PATH;
      }
      control.setAttribute("aria-haspopup", "menu");

      const handlers = {
        enter: () => showMenu(control),
        leave: () => scheduleClose(),
        focus: () => showMenu(control),
        click: (event: MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
          showMenu(control);
        },
      };

      control.addEventListener("mouseenter", handlers.enter);
      control.addEventListener("mouseleave", handlers.leave);
      control.addEventListener("focus", handlers.focus);
      control.addEventListener("click", handlers.click, true);
      bound.set(control, handlers);
    };

    const bindAll = () => {
      document
        .querySelectorAll<HTMLElement>(".header-actions a, .header-actions button")
        .forEach(bindControl);
    };

    const restore = () => {
      hideMenu();
      window.requestAnimationFrame(bindAll);
      window.setTimeout(bindAll, 40);
      window.setTimeout(bindAll, 180);
    };

    bindAll();

    const observer = new MutationObserver(bindAll);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pageshow", restore);
    window.addEventListener("popstate", restore);
    window.addEventListener("focus", bindAll);
    window.addEventListener("resize", hideMenu);

    return () => {
      hideMenu();
      observer.disconnect();
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("popstate", restore);
      window.removeEventListener("focus", bindAll);
      window.removeEventListener("resize", hideMenu);

      bound.forEach((handlers, control) => {
        control.removeEventListener("mouseenter", handlers.enter);
        control.removeEventListener("mouseleave", handlers.leave);
        control.removeEventListener("focus", handlers.focus);
        control.removeEventListener("click", handlers.click, true);
      });
      bound.clear();
    };
  }, []);

  const cancelClose = () => {
    if (!closeTimer.current) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      const menu = menuRef.current;
      if (!menu) return;
      menu.style.display = "none";
      menu.setAttribute("aria-hidden", "true");
    }, 220);
  };

  return (
    <>
      <style>{`
        .fllm-list-license-hover-menu a:hover,
        .fllm-list-license-hover-menu a:focus-visible {
          background: #f6a700 !important;
          color: #061728 !important;
          outline: none !important;
        }
      `}</style>
      <div
        ref={menuRef}
        className="fllm-list-license-hover-menu"
        role="menu"
        aria-label="List your license options"
        aria-hidden="true"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        style={{
          position: "fixed",
          zIndex: 999999,
          display: "none",
          gridTemplateColumns: "1fr",
          gap: 2,
          width: 290,
          padding: 6,
          border: "1px solid #f6a700",
          borderRadius: 7,
          background: "#061728",
          boxShadow: "0 18px 42px rgba(0,0,0,.42)",
        }}
      >
        <a href={SELF_DIRECTED_PATH} style={itemStyle} role="menuitem">Self-Directed Seller</a>
        <a href={BROKER_ASSISTANCE_PATH} style={itemStyle} role="menuitem">Request Broker Help</a>
        <a href={BROKER_LISTING_PATH} style={itemStyle} role="menuitem">For Brokers — List a Client License</a>
      </div>
    </>
  );
}

const itemStyle = {
  display: "block",
  padding: "11px 12px",
  borderRadius: 4,
  color: "#f6a700",
  fontSize: 13.5,
  fontWeight: 800,
  lineHeight: 1.25,
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};
