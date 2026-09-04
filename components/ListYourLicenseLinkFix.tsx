"use client";

import { useEffect, useRef, useState } from "react";

const SELF_DIRECTED_PATH = "/sell-your-license?method=self#listing-options";
const BROKER_LISTING_PATH = "/brokers/list-your-license";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";

type MenuPosition = { top: number; right: number } | null;

function isHeaderListButton(link: HTMLAnchorElement) {
  if (!link.closest(".header-actions")) return false;
  const label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  return label.includes("list your license");
}

export default function ListYourLicenseLinkFix() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 170);
  }

  function openFor(link: HTMLAnchorElement) {
    cancelClose();
    const rect = link.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      right: Math.max(14, window.innerWidth - rect.right),
    });
    setOpen(true);
  }

  useEffect(() => {
    const decorate = () => {
      document.querySelectorAll<HTMLAnchorElement>(".header-actions a").forEach((link) => {
        if (!isHeaderListButton(link)) return;
        link.setAttribute("href", SELF_DIRECTED_PATH);
        link.setAttribute("aria-haspopup", "menu");
        link.setAttribute("aria-expanded", open ? "true" : "false");
        link.querySelectorAll("[data-list-chevron]").forEach((node) => node.remove());
      });
    };

    const mouseOverHandler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (link instanceof HTMLAnchorElement && isHeaderListButton(link)) openFor(link);
    };

    const mouseOutHandler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement) || !isHeaderListButton(link)) return;

      const related = event.relatedTarget;
      if (related instanceof Node && link.contains(related)) return;
      scheduleClose();
    };

    const focusInHandler = (event: FocusEvent) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement && isHeaderListButton(target)) openFor(target);
    };

    const clickHandler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement) || !isHeaderListButton(link)) return;
      event.preventDefault();
      openFor(link);
    };

    const resizeHandler = () => setOpen(false);

    decorate();
    const observer = new MutationObserver(decorate);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("mouseover", mouseOverHandler, true);
    document.addEventListener("mouseout", mouseOutHandler, true);
    document.addEventListener("focusin", focusInHandler, true);
    document.addEventListener("click", clickHandler, true);
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelClose();
      observer.disconnect();
      document.removeEventListener("mouseover", mouseOverHandler, true);
      document.removeEventListener("mouseout", mouseOutHandler, true);
      document.removeEventListener("focusin", focusInHandler, true);
      document.removeEventListener("click", clickHandler, true);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [open]);

  if (!open || !position) return null;

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
        className="fllm-list-license-hover-menu"
        role="menu"
        aria-label="List your license options"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        style={{
          position: "fixed",
          top: position.top,
          right: position.right,
          zIndex: 30000,
          width: "min(230px, calc(100vw - 28px))",
          padding: 6,
          border: "1px solid #f6a700",
          borderRadius: 7,
          background: "#061728",
          boxShadow: "0 18px 42px rgba(0,0,0,.42)",
        }}
      >
        <a href={SELF_DIRECTED_PATH} style={itemStyle} role="menuitem">Self-Directed Seller</a>
        <a href={BROKER_LISTING_PATH} style={itemStyle} role="menuitem">Broker Listing</a>
        <a href={BROKER_ASSISTANCE_PATH} style={itemStyle} role="menuitem">Request Broker Help</a>
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
};
