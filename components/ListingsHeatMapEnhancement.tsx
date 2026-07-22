"use client";

import { useEffect } from "react";

const STYLE_ID = "listings-heat-map-styles";
const BODY_CLASS = "listings-heat-map-open";

function installStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    body.${BODY_CLASS}{overflow:hidden!important}
    .listings-heat-map-backdrop{position:fixed;inset:0;z-index:9998;background:rgba(0,7,13,.84);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:listingsHeatMapFade .18s ease-out}
    .listings-heat-map-modal{position:fixed;top:50%;left:50%;z-index:9999;width:75vw;height:75vh;max-width:1440px;max-height:900px;min-width:760px;min-height:520px;transform:translate(-50%,-50%);overflow:hidden;border:2px solid #f6a700;border-radius:10px;background:#f7f7f5;color:#111820;box-shadow:0 35px 110px rgba(0,0,0,.72),0 0 0 1px rgba(246,167,0,.28);animation:listingsHeatMapPop .2s ease-out;font-family:Arial,Helvetica,sans-serif}
    .listings-heat-map-title{height:64px;display:flex;align-items:center;padding:0 84px 0 24px;border-bottom:1px solid #d8dde1;font-size:15px;font-weight:900;letter-spacing:.015em;text-transform:uppercase}
    .listings-heat-map-content{height:calc(100% - 64px);display:grid;grid-template-columns:minmax(250px,30%) minmax(0,70%);gap:18px;padding:22px 24px 24px}
    .listings-heat-map-sidebar{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;min-width:0;padding:4px 8px 0 2px}
    .listings-heat-map-logo{display:block;width:65%;max-width:234px;height:auto;max-height:98px;object-fit:contain;object-position:left center;margin-bottom:24px}
    .listings-heat-map-key h3{margin:0 0 14px;font-size:19px;line-height:1.02;text-transform:uppercase}
    .listings-heat-map-key ul{list-style:none;margin:0;padding:0;display:grid;gap:9px;font-size:14px}
    .listings-heat-map-key li{display:flex;align-items:center;gap:11px}
    .listings-heat-map-key i{display:block;width:18px;height:18px;flex:0 0 18px}
    .listings-heat-map-key .range-1{background:#ec341f}.listings-heat-map-key .range-2{background:#ff7b00}.listings-heat-map-key .range-3{background:#f4aa00}.listings-heat-map-key .range-4{background:#7faf2d}.listings-heat-map-key .range-5{background:#3b8b35}
    .listings-heat-map-note{margin-top:16px;color:#5f6972;font-size:11px;line-height:1.45;max-width:280px}
    .listings-heat-map-art{position:relative;min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;overflow:visible}
    .listings-heat-map-art img,.listings-heat-map-art svg{display:block;width:100%;height:100%;max-width:none;max-height:none;object-fit:contain}
    .listings-heat-map-art svg path{cursor:help;transition:filter .14s ease,opacity .14s ease,stroke-width .14s ease}
    .listings-heat-map-art svg path:hover,.listings-heat-map-art svg path:focus{filter:brightness(1.12) drop-shadow(0 1px 2px rgba(0,0,0,.35));outline:none;stroke-width:2.2!important}
    .listings-heat-map-loading{color:#68737c;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
    .listings-heat-map-tooltip{position:absolute;z-index:3;display:none;pointer-events:none;white-space:nowrap;padding:7px 10px;border:1px solid #f6a700;border-radius:5px;background:#061728;color:#fff;font-size:12px;font-weight:800;letter-spacing:.01em;box-shadow:0 8px 22px rgba(0,0,0,.35)}
    .listings-heat-map-tooltip.is-visible{display:block}
    .listings-heat-map-close{position:absolute;top:10px;right:14px;z-index:2;width:44px;height:44px;display:grid;place-items:center;border:2px solid #f6a700;border-radius:50%;background:#061728;color:#f6a700;cursor:pointer;font:700 28px/1 Arial,sans-serif;box-shadow:0 7px 22px rgba(0,0,0,.3)}
    .listings-heat-map-close:hover,.listings-heat-map-close:focus-visible{background:#f6a700;color:#061728;outline:none}
    @keyframes listingsHeatMapFade{from{opacity:0}to{opacity:1}}
    @keyframes listingsHeatMapPop{from{opacity:0;transform:translate(-50%,-48%) scale(.97)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
    @media(max-width:900px){
      .listings-heat-map-modal{width:94vw;height:88vh;min-width:0;min-height:0;max-width:none;max-height:none}
      .listings-heat-map-content{grid-template-columns:1fr;grid-template-rows:auto minmax(320px,1fr);gap:12px;padding:16px}
      .listings-heat-map-sidebar{display:grid;grid-template-columns:minmax(180px,1fr) minmax(180px,1fr);gap:18px;align-items:start;padding:0}
      .listings-heat-map-logo{width:65%;max-width:195px;max-height:68px;margin:0}
      .listings-heat-map-key h3{font-size:15px}.listings-heat-map-key ul{font-size:12px;gap:6px}.listings-heat-map-key i{width:14px;height:14px;flex-basis:14px}
      .listings-heat-map-note{display:none}
    }
    @media(max-width:560px){
      .listings-heat-map-title{height:56px;padding-left:16px;font-size:11px}
      .listings-heat-map-content{height:calc(100% - 56px);grid-template-rows:auto minmax(280px,1fr)}
      .listings-heat-map-sidebar{grid-template-columns:1fr;gap:10px}
      .listings-heat-map-logo{width:65%;max-width:159px;max-height:51px}
      .listings-heat-map-key h3{margin-bottom:8px;font-size:13px}.listings-heat-map-key ul{grid-template-columns:repeat(2,minmax(0,1fr));font-size:10px}
      .listings-heat-map-close{top:7px;right:9px;width:40px;height:40px;font-size:25px}
    }
    @media(prefers-reduced-motion:reduce){.listings-heat-map-backdrop,.listings-heat-map-modal{animation:none}}
  `;
  document.head.appendChild(style);
}

function positionTooltip(event: MouseEvent, art: HTMLElement, tooltip: HTMLElement) {
  const artRect = art.getBoundingClientRect();
  const tooltipWidth = tooltip.offsetWidth || 120;
  const tooltipHeight = tooltip.offsetHeight || 32;
  const desiredLeft = event.clientX - artRect.left + 14;
  const desiredTop = event.clientY - artRect.top + 14;
  const maxLeft = Math.max(8, artRect.width - tooltipWidth - 8);
  const maxTop = Math.max(8, artRect.height - tooltipHeight - 8);

  tooltip.style.left = `${Math.max(8, Math.min(desiredLeft, maxLeft))}px`;
  tooltip.style.top = `${Math.max(8, Math.min(desiredTop, maxTop))}px`;
}

function attachCountyHover(svg: SVGSVGElement, art: HTMLElement) {
  const tooltip = document.createElement("div");
  tooltip.className = "listings-heat-map-tooltip";
  tooltip.setAttribute("role", "status");
  tooltip.setAttribute("aria-live", "polite");
  art.appendChild(tooltip);

  svg.querySelectorAll("path").forEach((path) => {
    const titleText = path.querySelector("title")?.textContent?.trim() || "Florida County";
    const countyName = titleText.split(" — ")[0];
    path.setAttribute("tabindex", "0");
    path.setAttribute("aria-label", countyName);

    const show = (event: Event) => {
      tooltip.textContent = countyName;
      tooltip.classList.add("is-visible");
      if (event instanceof MouseEvent) positionTooltip(event, art, tooltip);
    };

    path.addEventListener("mouseenter", show);
    path.addEventListener("mousemove", (event: MouseEvent) => positionTooltip(event, art, tooltip));
    path.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
    path.addEventListener("focus", () => {
      const pathRect = path.getBoundingClientRect();
      const artRect = art.getBoundingClientRect();
      tooltip.textContent = countyName;
      tooltip.classList.add("is-visible");
      tooltip.style.left = `${Math.max(8, pathRect.left - artRect.left + pathRect.width / 2)}px`;
      tooltip.style.top = `${Math.max(8, pathRect.top - artRect.top + pathRect.height / 2)}px`;
    });
    path.addEventListener("blur", () => tooltip.classList.remove("is-visible"));
  });
}

async function loadInteractiveMap(art: HTMLElement) {
  try {
    const response = await fetch("/api/market-map", { cache: "no-store" });
    if (!response.ok) throw new Error(`Map returned ${response.status}`);

    const svgText = await response.text();
    const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const parsedSvg = parsed.documentElement;
    if (parsedSvg.nodeName.toLowerCase() !== "svg" || parsed.querySelector("parsererror")) {
      throw new Error("Map SVG could not be parsed");
    }

    const svg = document.importNode(parsedSvg, true) as unknown as SVGSVGElement;
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("aria-label", "Florida counties colored by current liquor license asking and sold prices");
    art.replaceChildren(svg);
    attachCountyHover(svg, art);
  } catch (error) {
    console.error("Listings heat map failed", error);
    const fallback = document.createElement("img");
    fallback.src = "/assets/florida-map-clean.png";
    fallback.alt = "Florida counties colored by current liquor license asking and sold prices";
    art.replaceChildren(fallback);
  }
}

function createLegend() {
  const legend = document.createElement("div");
  legend.className = "listings-heat-map-key";
  legend.innerHTML = `
    <h3>Average 4COP<br>Quota Price<br>by County</h3>
    <ul>
      <li><i class="range-1"></i><span>$600K+</span></li>
      <li><i class="range-2"></i><span>$450K – $600K</span></li>
      <li><i class="range-3"></i><span>$300K – $450K</span></li>
      <li><i class="range-4"></i><span>$200K – $300K</span></li>
      <li><i class="range-5"></i><span>Under $200K</span></li>
    </ul>
    <p class="listings-heat-map-note">County color reflects the average disclosed asking and sold inventory prices. Dashed dark outlines indicate that a sold price is included.</p>
  `;
  return legend;
}

export default function ListingsHeatMapEnhancement() {
  useEffect(() => {
    installStyles();

    const button = Array.from(document.querySelectorAll<HTMLButtonElement>(".results-filters button"))
      .find((candidate) => /apply filters|heat map/i.test(candidate.textContent || ""));

    if (!button) return;

    const originalText = button.textContent;
    const originalType = button.type;
    let backdrop: HTMLDivElement | null = null;
    let modal: HTMLElement | null = null;

    const closeModal = () => {
      modal?.remove();
      backdrop?.remove();
      document.body.classList.remove(BODY_CLASS);
      modal = null;
      backdrop = null;
      button.focus();
    };

    const openModal = () => {
      if (modal) return;

      const nextBackdrop = document.createElement("div");
      nextBackdrop.className = "listings-heat-map-backdrop";
      nextBackdrop.setAttribute("aria-hidden", "true");
      nextBackdrop.addEventListener("click", closeModal);

      const nextModal = document.createElement("section");
      nextModal.className = "listings-heat-map-modal";
      nextModal.setAttribute("role", "dialog");
      nextModal.setAttribute("aria-modal", "true");
      nextModal.setAttribute("aria-label", "Florida liquor license heat map");

      const title = document.createElement("div");
      title.className = "listings-heat-map-title";
      title.textContent = "Florida Market Insights";

      const content = document.createElement("div");
      content.className = "listings-heat-map-content";

      const sidebar = document.createElement("aside");
      sidebar.className = "listings-heat-map-sidebar";

      const logo = document.createElement("img");
      logo.className = "listings-heat-map-logo";
      logo.src = "/assets/brand-sharp.svg";
      logo.alt = "Florida Liquor License Market";
      sidebar.append(logo, createLegend());

      const art = document.createElement("div");
      art.className = "listings-heat-map-art";
      const loading = document.createElement("span");
      loading.className = "listings-heat-map-loading";
      loading.textContent = "Loading heat map…";
      art.appendChild(loading);

      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "listings-heat-map-close";
      closeButton.setAttribute("aria-label", "Close heat map");
      closeButton.textContent = "×";
      closeButton.addEventListener("click", closeModal);

      content.append(sidebar, art);
      nextModal.append(title, content, closeButton);
      document.body.append(nextBackdrop, nextModal);
      backdrop = nextBackdrop;
      modal = nextModal;
      document.body.classList.add(BODY_CLASS);
      closeButton.focus();
      void loadInteractiveMap(art);
    };

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      openModal();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modal) closeModal();
    };

    button.textContent = "Heat Map";
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      closeModal();
      button.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
      button.textContent = originalText;
      button.type = originalType;
      button.removeAttribute("aria-haspopup");
    };
  }, []);

  return null;
}
