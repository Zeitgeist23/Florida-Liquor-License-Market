"use client";

import { useEffect, useState } from "react";

const SELF_DIRECTED_PATH = "/sell-your-license";
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

  useEffect(() => {
    const decorate = () => {
      document.querySelectorAll<HTMLAnchorElement>(".header-actions a").forEach((link) => {
        if (!isHeaderListButton(link)) return;
        link.setAttribute("href", SELF_DIRECTED_PATH);
        link.setAttribute("aria-haspopup", "menu");
        link.setAttribute("aria-expanded", open ? "true" : "false");
        if (!link.querySelector("[data-list-chevron]")) {
          const chevron = document.createElement("span");
          chevron.setAttribute("data-list-chevron", "true");
          chevron.setAttribute("aria-hidden", "true");
          chevron.textContent = " ▾";
          chevron.style.marginLeft = "7px";
          chevron.style.fontSize = "11px";
          link.appendChild(chevron);
        }
      });
    };

    const clickHandler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement) || !isHeaderListButton(link)) return;

      event.preventDefault();
      event.stopPropagation();
      const rect = link.getBoundingClientRect();
      setPosition({ top: rect.bottom + 10, right: Math.max(14, window.innerWidth - rect.right) });
      setOpen((value) => !value);
    };

    const outsideHandler = (event: MouseEvent) => {
      if (!open) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-list-license-menu]") || target.closest(".header-actions")) return;
      setOpen(false);
    };

    decorate();
    const observer = new MutationObserver(decorate);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", clickHandler, true);
    document.addEventListener("click", outsideHandler);
    window.addEventListener("resize", () => setOpen(false));

    return () => {
      observer.disconnect();
      document.removeEventListener("click", clickHandler, true);
      document.removeEventListener("click", outsideHandler);
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
    <div
      data-list-license-menu
      role="menu"
      aria-label="List your license options"
      style={{
        position: "fixed",
        top: position.top,
        right: position.right,
        zIndex: 30000,
        width: "min(360px, calc(100vw - 28px))",
        padding: 8,
        border: "1px solid #f6a700",
        borderRadius: 8,
        background: "#061728",
        boxShadow: "0 20px 50px rgba(0,0,0,.45)",
      }}
    >
      <a href={SELF_DIRECTED_PATH} style={itemStyle} role="menuitem">
        <strong style={titleStyle}>Self-Directed Seller</strong>
        <span style={copyStyle}>List your own license and manage buyer inquiries directly through FLLM.</span>
      </a>
      <a href={BROKER_LISTING_PATH} style={itemStyle} role="menuitem">
        <strong style={titleStyle}>Broker Listing</strong>
        <span style={copyStyle}>For brokers listing a client&apos;s Florida liquor license.</span>
      </a>
      <a href={BROKER_ASSISTANCE_PATH} style={itemStyle} role="menuitem">
        <strong style={titleStyle}>Request Broker Help</strong>
        <span style={copyStyle}>For sellers who want help from an independent broker rather than selling entirely on their own.</span>
      </a>
      <div style={{ padding: "8px 10px 4px", color: "#91a3b3", fontSize: 11.5, lineHeight: 1.4 }}>
        FLLM may add participating or affiliated independent broker relationships in the future. No current broker affiliation is implied.
      </div>
    </div>
  );
}

const itemStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 4,
  padding: "12px 13px",
  borderRadius: 5,
  color: "#ffffff",
  textDecoration: "none",
};

const titleStyle = {
  color: "#f6a700",
  fontSize: 14,
  fontWeight: 800,
};

const copyStyle = {
  color: "#d4dde5",
  fontSize: 12.5,
  lineHeight: 1.4,
};
