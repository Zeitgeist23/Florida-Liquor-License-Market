(() => {
  const STYLE_ID = "market-list-modal-styles-v2";
  const BACKDROP_CLASS = "market-list-modal-backdrop";
  const MODAL_CLASS = "market-map-popup market-list-popup";
  const BODY_CLASS = "market-list-modal-open";

  let previousFocus = null;
  let backdrop = null;
  let modal = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS}{overflow:hidden!important}
      .${BACKDROP_CLASS}{position:fixed;inset:0;z-index:9998;background:rgba(0,7,13,.84);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
      .market-list-popup{position:fixed;top:50%;left:50%;z-index:9999;width:min(92vw,1100px);height:min(86vh,900px);transform:translate(-50%,-50%);display:flex;flex-direction:column;overflow:hidden;border:2px solid #f6a700;border-radius:12px;background:#f7f7f5;color:#111820;box-shadow:0 35px 110px rgba(0,0,0,.72);font-family:Arial,Helvetica,sans-serif}
      .market-list-popup-header{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:22px 24px 18px;border-bottom:1px solid #d8dde1;background:#061728;color:#fff}
      .market-list-popup-kicker{display:block;margin-bottom:5px;color:#f6a700;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
      .market-list-popup-header h2{margin:0 0 5px;font-size:26px;line-height:1.05}
      .market-list-popup-header p{margin:0;color:#c8d1d8;font-size:13px}
      .market-list-popup-close{flex:0 0 42px;width:42px;height:42px;display:grid;place-items:center;border:2px solid #f6a700;border-radius:50%;background:#061728;color:#f6a700;cursor:pointer;font:700 27px/1 Arial,sans-serif}
      .market-list-popup-close:hover,.market-list-popup-close:focus-visible{background:#f6a700;color:#061728;outline:none}
      .market-list-column-headings,.market-list-row{display:grid;grid-template-columns:60px minmax(240px,1fr) 180px 110px;align-items:center;gap:14px}
      .market-list-column-headings{padding:11px 22px;border-bottom:1px solid #d8dde1;background:#eef1f3;color:#5c6871;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      .market-list-scroll{flex:1;overflow:auto;overscroll-behavior:contain;background:#fff}
      .market-list-row{min-height:68px;padding:10px 22px;border-bottom:1px solid #e4e7e9}
      .market-list-row:nth-child(even){background:#fafaf8}
      .market-list-rank{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#061728;color:#f6a700;font-weight:900}
      .market-list-description{min-width:0}
      .market-list-description strong{display:block;font-size:15px;color:#0b1d2b}
      .market-list-description small{display:block;margin-top:3px;color:#66727b;font-size:12px}
      .market-list-price{font-size:16px;color:#0b1d2b;white-space:nowrap}
      .market-list-inquire{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 14px;border-radius:5px;background:#f6a700;color:#071827!important;text-decoration:none!important;font-size:12px;font-weight:900;text-transform:uppercase}
      .market-list-inquire:hover,.market-list-inquire:focus-visible{background:#071827;color:#f6a700!important;outline:none}
      .market-list-popup-footer{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:13px 22px;border-top:1px solid #d8dde1;background:#eef1f3;font-size:11px;color:#66727b}
      .market-list-popup-footer a{color:#071827;font-weight:900;text-decoration:none}
      .market-list-loading,.market-list-error{display:grid;place-items:center;min-height:260px;padding:30px;text-align:center;color:#66727b;font-weight:700}
      .map-panel[data-market-list-bound="true"]{cursor:pointer}
      @media(max-width:720px){
        .market-list-popup{width:96vw;height:90vh}
        .market-list-popup-header{padding:18px 16px 14px}.market-list-popup-header h2{font-size:21px}.market-list-popup-header p{font-size:11px}
        .market-list-column-headings{display:none}
        .market-list-row{grid-template-columns:42px minmax(0,1fr) auto;padding:11px 14px;gap:10px}
        .market-list-price{grid-column:2;font-size:15px}
        .market-list-inquire{grid-column:3;grid-row:1 / span 2;min-width:74px;padding:0 10px}
        .market-list-popup-footer{align-items:flex-start;flex-direction:column}
      }
    `;
    document.head.appendChild(style);
  }

  function closeModal() {
    if (!modal) return;
    modal.remove();
    backdrop?.remove();
    document.body.classList.remove(BODY_CLASS);
    modal = null;
    backdrop = null;
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  }

  function renderRows(container, listings) {
    container.innerHTML = listings.map((listing, index) => {
      const county = escapeHtml(listing.county);
      const type = escapeHtml(listing.type);
      const price = escapeHtml(listing.priceLabel || "Price Undisclosed");
      const ref = encodeURIComponent(listing.sourceRef || "market-insights");
      const description = encodeURIComponent(`${listing.county} ${listing.type}`);
      return `<article class="market-list-row">
        <span class="market-list-rank">${index + 1}</span>
        <div class="market-list-description"><strong>${county}</strong><small>${type}</small></div>
        <strong class="market-list-price">${price}</strong>
        <a class="market-list-inquire" href="/contact?listing=${description}&ref=${ref}">Inquire</a>
      </article>`;
    }).join("");
  }

  async function loadListings(scroll, summary) {
    try {
      const response = await fetch("/api/market-insights-listings", { cache: "no-store" });
      if (!response.ok) throw new Error(`Listings returned ${response.status}`);
      const payload = await response.json();
      const listings = Array.isArray(payload.listings) ? payload.listings : [];
      summary.textContent = `${listings.length} available listing${listings.length === 1 ? "" : "s"}, ordered from highest to lowest asking price.`;
      if (!listings.length) {
        scroll.innerHTML = '<div class="market-list-error">No available listings were returned.</div>';
        return;
      }
      renderRows(scroll, listings);
    } catch (error) {
      console.error("Market insights listings failed", error);
      summary.textContent = "The current inventory could not be loaded.";
      scroll.innerHTML = '<div class="market-list-error"><span>Please open the full listings page to view current inventory.</span></div>';
    }
  }

  function openModal(trigger) {
    if (modal) return;
    installStyles();
    previousFocus = trigger;

    backdrop = document.createElement("div");
    backdrop.className = BACKDROP_CLASS;
    backdrop.addEventListener("click", closeModal);

    modal = document.createElement("section");
    modal.className = MODAL_CLASS;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "market-list-popup-title");

    const header = document.createElement("header");
    header.className = "market-list-popup-header";
    header.innerHTML = `<div><span class="market-list-popup-kicker">Florida Market Insights</span><h2 id="market-list-popup-title">Current Available Licenses</h2><p>Loading current marketplace inventory…</p></div>`;
    const summary = header.querySelector("p");

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "market-list-popup-close";
    closeButton.setAttribute("aria-label", "Close current available licenses");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", closeModal);
    header.appendChild(closeButton);

    const headings = document.createElement("div");
    headings.className = "market-list-column-headings";
    headings.innerHTML = "<span>Rank</span><span>County &amp; License Type</span><span>Asking Price</span><span>Action</span>";

    const scroll = document.createElement("div");
    scroll.className = "market-list-scroll";
    scroll.innerHTML = '<div class="market-list-loading">Loading current available licenses…</div>';

    const footer = document.createElement("footer");
    footer.className = "market-list-popup-footer";
    footer.innerHTML = '<span>Prices and availability are subject to confirmation.</span><a href="/listings">Open Full Listings Page ›</a>';

    modal.append(header, headings, scroll, footer);
    document.body.append(backdrop, modal);
    document.body.classList.add(BODY_CLASS);
    closeButton.focus();
    loadListings(scroll, summary);
  }

  function bindMarketInsights() {
    const panel = document.querySelector(".map-panel");
    if (!(panel instanceof HTMLElement)) return false;
    if (panel.dataset.marketListBound === "true") return true;

    panel.dataset.marketListBound = "true";
    panel.setAttribute("role", "button");
    panel.setAttribute("tabindex", "0");
    panel.setAttribute("aria-haspopup", "dialog");
    panel.setAttribute("aria-label", "Open current available Florida liquor licenses sorted by asking price");

    panel.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openModal(panel);
    }, true);

    panel.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(panel);
      }
    });
    return true;
  }

  function initialize() {
    bindMarketInsights();
    setTimeout(bindMarketInsights, 300);
    setTimeout(bindMarketInsights, 1000);
    setTimeout(bindMarketInsights, 2200);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
