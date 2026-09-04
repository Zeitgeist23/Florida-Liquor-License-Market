"use client";

import { useEffect, useRef, useState } from "react";

const SELF_DIRECTED_PATH = "/sell-your-license?method=self#listing-options";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";
const BROKER_LISTING_PATH = "/brokers/list-your-license";

type MenuPosition = { top: number; right: number } | null;

function isHeaderListButton(element: Element) {
  const control = element.closest("a,button");
  if (!(control instanceof HTMLElement)) return null;
  if (!control.closest(".header-actions")) return null;

  const label = (control.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  return label === "list your license" ? control : null;
}

export default function ListYourLicenseLinkFix() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (!closeTimer.current) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }

  function openFor(control: HTMLElement) {
    cancelClose();
    const rect = control.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 7,
      right: Math.max(14, window.innerWidth - rect.right),
    });
    setOpen(true);
  }

  useEffect(() => {
    const pointerOverHandler = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = isHeaderListButton(target);
      if (control) openFor(control);
    };

    const pointerOutHandler = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = isHeaderListButton(target);
      if (!control) return;

      const related = event.relatedTarget;
      if (related instanceof Node && control.contains(related)) return;
      scheduleClose();
    };

    const focusInHandler = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = isHeaderListButton(target);
      if (control) openFor(control);
    };

    const clickHandler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = isHeaderListButton(target);
      if (!control) return;
      event.preventDefault();
      event.stopPropagation();
      openFor(control);
    };

    const restoreHandler = () => {
      cancelClose();
      setOpen(false);
      setPosition(null);
    };

    const resizeHandler = () => restoreHandler();

    document.addEventListener("pointerover", pointerOverHandler, true);
    document.addEventListener("pointerout", pointerOutHandler, true);
    document.addEventListener("focusin", focusInHandler, true);
    document.addEventListener("click", clickHandler, true);
    window.addEventListener("pageshow", restoreHandler);
    window.addEventListener("popstate", restoreHandler);
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelClose();
      document.removeEventListener("pointerover", pointerOverHandler, true);
      document.removeEventListener("pointerout", pointerOutHandler, true);
      document.removeEventListener("focusin", focusInHandler, true);
      document.removeEventListener("click", clickHandler, true);
      window.removeEventListener("pageshow", restoreHandler);
      window.removeEventListener("popstate", restoreHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

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
        onPointerEnter={cancelClose}
        onPointerLeave={scheduleClose}
        style={{
          position: "fixed",
          top: position.top,
          right: position.right,
          zIndex: 50000,
          width: "min(230px, calc(100vw - 28px))",
          padding: 6,
          border: "1px solid #f6a700",
          borderRadius: 7,
          background: "#061728",
          boxShadow: "0 18px 42px rgba(0,0,0,.42)",
        }}
      >
        <a href={SELF_DIRECTED_PATH} style={itemStyle} role="menuitem">Self-Directed Seller</a>
        <a href={BROKER_ASSISTANCE_PATH} style={itemStyle} role="menuitem">Request Broker Help</a>
        <a href={BROKER_LISTING_PATH} style={itemStyle} role="menuitem">Broker Listing</a>
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
