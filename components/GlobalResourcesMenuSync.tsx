"use client";

import { useEffect } from "react";

const LOOKUP_URL = "https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup";

// Exact row-major order used by the approved landing-page Resources menu.
const resources = [
  { label: "Free Buyer’s & Seller’s Guide", href: "/free-guide", badge: "FREE PDF" },
  { label: "Florida Division of Alcoholic Beverages & Tobacco (DABT)", href: "/resources/florida-division-alcoholic-beverages-tobacco" },
  { label: "Florida Department of Revenue (FDOR)", href: "/resources/florida-department-of-revenue" },
  { label: "Florida Liquor License Lookup", href: LOOKUP_URL, badge: "LOOKUP", external: true },
  { label: "Florida ABT Forms", href: "/resources/forms" },
  { label: "Florida Liquor License Laws", href: "/resources/florida-liquor-license-laws" },
  { label: "Florida Liquor License Value Estimator", href: "/florida-liquor-license-value", badge: "VALUE" },
  { label: "License Fees & Annual Renewals", href: "/resources/license-fees" },
  { label: "Liquor License Attorneys", href: "/resources/liquor-license-attorneys" },
  { label: "Alcohol License Application Center", href: "/resources/application-center" },
  { label: "Quota License Transfer Fee Calculator", href: "/resources/quota-transfer-fee-calculator" },
  { label: "View All Resources", href: "/resources" },
];

const SIGNATURE = "fllm-resources-v5";

function installStyles() {
  const existing = document.getElementById("global-resources-menu-sync-styles");
  if (existing) existing.remove();

  const style = document.createElement("style");
  style.id = "global-resources-menu-sync-styles";
  style.textContent = `
    .native-nav-resources-menu{
      width:min(1120px,calc(100vw - 48px))!important;
      max-width:none!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:6px 10px!important;
      padding:10px!important;
      border:1px solid #f6a700!important;
      border-radius:8px!important;
      background:#061728!important;
      box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12)!important;
      overflow:visible!important;
    }
    .native-nav-resources-menu>a{
      box-sizing:border-box!important;
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      min-height:52px!important;
      padding:10px 14px!important;
      border:1px solid rgba(255,255,255,.07)!important;
      border-radius:6px!important;
      background:#081d31!important;
      box-shadow:none!important;
      color:#fff!important;
      display:flex!important;
      align-items:center!important;
      justify-content:space-between!important;
      gap:10px!important;
      font:700 13px/1.25 Arial,Helvetica,sans-serif!important;
      text-decoration:none!important;
      white-space:normal!important;
      overflow:hidden!important;
      text-overflow:clip!important;
    }
    .native-nav-resources-menu>a::after{content:none!important;display:none!important}
    .native-nav-resources-menu>a>.global-resource-label{
      display:block!important;
      flex:1 1 auto!important;
      width:auto!important;
      max-width:100%!important;
      min-width:0!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
      word-break:normal!important;
      line-height:1.25!important;
      overflow:hidden!important;
    }
    .native-nav-resources-menu>a:hover,
    .native-nav-resources-menu>a:focus-visible{
      border-color:#f6a700!important;
      background:#0d2841!important;
      color:#f6a700!important;
      outline:none!important;
    }
    .global-resource-badge{
      flex:0 0 auto!important;
      margin-left:auto!important;
      color:#f6a700!important;
      font-size:9px!important;
      font-weight:900!important;
      letter-spacing:.08em!important;
      white-space:nowrap!important;
    }
    .native-nav-resources-menu>a[data-global-transaction="true"]{
      grid-column:1/-1!important;
      display:grid!important;
      grid-template-columns:max-content minmax(0,1fr) max-content!important;
      align-items:center!important;
      column-gap:24px!important;
      min-height:56px!important;
      padding:10px 16px!important;
      border-color:rgba(246,167,0,.34)!important;
      background:rgba(255,255,255,.035)!important;
      overflow:hidden!important;
    }
    .global-transaction-title{
      min-width:0!important;
      white-space:nowrap!important;
      color:#fff!important;
      font-size:13px!important;
      font-weight:800!important;
    }
    .global-transaction-copy{
      min-width:0!important;
      justify-self:center!important;
      text-align:center!important;
      color:#9fb0bf!important;
      font-size:11px!important;
      font-weight:700!important;
      letter-spacing:.01em!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
    }
    .global-transaction-cta{
      justify-self:end!important;
      white-space:nowrap!important;
      color:#9fb0bf!important;
      font-size:10px!important;
      font-weight:800!important;
    }
    .native-nav-resources-menu>a[data-global-transaction="true"]:hover .global-transaction-copy,
    .native-nav-resources-menu>a[data-global-transaction="true"]:hover .global-transaction-cta{color:#f6a700!important}
    @media(max-width:1180px) and (min-width:901px){
      .native-nav-resources-menu{width:min(1040px,calc(100vw - 32px))!important}
      .native-nav-resources-menu>a{font-size:12.5px!important}
    }
    @media(max-width:900px){
      .native-nav-resources-menu{width:min(720px,calc(100vw - 32px))!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
    }
    @media(max-width:760px){
      .native-nav-resources-menu{grid-template-columns:1fr!important;width:min(360px,calc(100vw - 24px))!important;max-height:70vh!important;overflow:auto!important}
      .native-nav-resources-menu>a[data-global-transaction="true"]{display:block!important;grid-column:auto!important}
      .global-transaction-copy,.global-transaction-cta{display:block!important;margin-top:5px!important;text-align:left!important}
      .global-transaction-cta{color:#f6a700!important}
    }
  `;
  document.head.appendChild(style);
}

function syncMenu(menu: Element) {
  if (!(menu instanceof HTMLElement)) return;
  if (menu.dataset.globalResourcesSignature === SIGNATURE) return;

  const fragment = document.createDocumentFragment();
  resources.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.setAttribute("role", "menuitem");
    if (item.external) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    const label = document.createElement("span");
    label.className = "global-resource-label";
    label.textContent = item.label;
    link.appendChild(label);

    if (item.badge) {
      const badge = document.createElement("span");
      badge.className = "global-resource-badge";
      badge.textContent = item.badge;
      link.appendChild(badge);
    }
    fragment.appendChild(link);
  });

  const transaction = document.createElement("a");
  transaction.href = "/transaction-services";
  transaction.setAttribute("role", "menuitem");
  transaction.dataset.globalTransaction = "true";
  transaction.innerHTML = '<span class="global-transaction-title">FLLM Transaction Services</span><span class="global-transaction-copy">Valuation · Financing · ABT Transfer Support · Closing Resources · Professional Referrals</span><span class="global-transaction-cta">Explore →</span>';
  fragment.appendChild(transaction);

  menu.replaceChildren(fragment);
  menu.dataset.globalResourcesSignature = SIGNATURE;
}

function syncAll() {
  installStyles();
  document.querySelectorAll(".native-nav-resources-menu").forEach(syncMenu);
}

export default function GlobalResourcesMenuSync() {
  useEffect(() => {
    syncAll();
    const observer = new MutationObserver(syncAll);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(syncAll, 100);
    window.setTimeout(syncAll, 500);
    window.setTimeout(syncAll, 1500);
    return () => observer.disconnect();
  }, []);
  return null;
}
