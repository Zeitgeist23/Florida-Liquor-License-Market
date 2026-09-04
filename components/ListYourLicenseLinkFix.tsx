"use client";

import { useEffect, useState } from "react";

const SELF_DIRECTED_PATH = "/sell-your-license";
const BROKER_LISTING_PATH = "/brokers/list-your-license";
const BROKER_ASSISTANCE_PATH = "/sell-your-license#broker-assistance";

function isHomepageListButton(link: HTMLAnchorElement) {
  const label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  const href = link.getAttribute("href") || "";

  return (
    (href === "#sell" || href === SELF_DIRECTED_PATH) &&
    (label.includes("list your license") || label.includes("sell your license"))
  );
}

export default function ListYourLicenseLinkFix() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href="#sell"]')
        .forEach((link) => {
          if (isHomepageListButton(link)) link.setAttribute("href", SELF_DIRECTED_PATH);
        });
    };

    const clickHandler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement) || !isHomepageListButton(link)) return;

      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
    };

    updateLinks();

    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["href"],
      childList: true,
      subtree: true,
    });

    document.addEventListener("click", clickHandler, true);
    return () => {
      document.removeEventListener("click", clickHandler, true);
      observer.disconnect();
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

  if (!open) return null;

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20000,
        display: "grid",
        placeItems: "center",
        padding: 20,
        background: "rgba(2, 13, 24, 0.76)",
        backdropFilter: "blur(4px)",
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="listing-path-title"
        style={{
          position: "relative",
          width: "min(760px, 100%)",
          border: "1px solid #d59a24",
          borderRadius: 16,
          padding: "30px 28px 28px",
          background: "#071b2c",
          color: "#ffffff",
          boxShadow: "0 26px 80px rgba(0,0,0,.48)",
        }}
      >
        <button
          type="button"
          aria-label="Close listing options"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            width: 34,
            height: 34,
            border: 0,
            borderRadius: 999,
            background: "rgba(255,255,255,.08)",
            color: "#ffffff",
            fontSize: 22,
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div style={{ marginBottom: 22, textAlign: "center" }}>
          <div style={{ color: "#e5ad3a", fontSize: 12, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>
            List a Florida Liquor License
          </div>
          <h2 id="listing-path-title" style={{ margin: "8px 0 8px", fontSize: "clamp(25px, 4vw, 36px)", lineHeight: 1.1 }}>
            How would you like to list?
          </h2>
          <p style={{ margin: 0, color: "#c8d2dc", fontSize: 15, lineHeight: 1.55 }}>
            Choose the path that matches your role and the level of help you want.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(205px, 1fr))", gap: 14 }}>
          <a href={SELF_DIRECTED_PATH} style={cardStyle}>
            <span style={numberStyle}>01</span>
            <strong style={titleStyle}>List It Yourself</strong>
            <span style={copyStyle}>For license owners who want a self-directed FLLM marketplace listing and direct control of buyer inquiries.</span>
            <span style={actionStyle}>Start Self-Directed Listing →</span>
          </a>

          <a href={BROKER_LISTING_PATH} style={cardStyle}>
            <span style={numberStyle}>02</span>
            <strong style={titleStyle}>I’m a Broker</strong>
            <span style={copyStyle}>For licensed brokers listing a client’s Florida liquor license with broker identity and contact information displayed.</span>
            <span style={actionStyle}>Broker Listing Submission →</span>
          </a>

          <a href={BROKER_ASSISTANCE_PATH} style={cardStyle}>
            <span style={numberStyle}>03</span>
            <strong style={titleStyle}>I Want Broker Help</strong>
            <span style={copyStyle}>For sellers who want assistance from a broker rather than managing the sale entirely on their own.</span>
            <span style={actionStyle}>Request Broker Assistance →</span>
          </a>
        </div>

        <p style={{ margin: "18px 4px 0", color: "#9fb0bf", fontSize: 12.5, lineHeight: 1.5, textAlign: "center" }}>
          FLLM may expand broker-assistance options in the future, including relationships with participating independent brokers. FLLM does not currently represent that any broker is an affiliated agent of FLLM.
        </p>
      </section>
    </div>
  );
}

const cardStyle = {
  display: "flex",
  minHeight: 230,
  flexDirection: "column" as const,
  gap: 12,
  padding: "20px 18px",
  border: "1px solid rgba(229,173,58,.55)",
  borderRadius: 12,
  background: "rgba(255,255,255,.035)",
  color: "#ffffff",
  textDecoration: "none",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,.035)",
};

const numberStyle = {
  color: "#e5ad3a",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".14em",
};

const titleStyle = {
  fontSize: 21,
  lineHeight: 1.15,
};

const copyStyle = {
  flex: 1,
  color: "#c8d2dc",
  fontSize: 13.5,
  lineHeight: 1.55,
};

const actionStyle = {
  color: "#efbb4d",
  fontSize: 13,
  fontWeight: 800,
};
