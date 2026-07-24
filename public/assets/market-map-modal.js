(() => {
  const STYLE_ID = "market-list-modal-styles-v4";
  const BACKDROP_CLASS = "market-list-modal-backdrop";
  const MODAL_CLASS = "market-map-popup market-list-popup";
  const BODY_CLASS = "market-list-modal-open";

  let previousFocus = null;
  let backdrop = null;
  let modal = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

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
    document.querySelectorAll('[id^="market-list-modal-styles"]').forEach((style) => style.remove());

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS}{overflow:hidden!important}
      .${BACKDROP_CLASS}{position:fixed;inset:0;z-index:12998;background:radial-gradient(circle at 50% 20%,rgba(16,38,58,.54) 0%,rgba(3,18,31,.9) 45%,rgba(0,3,5,.96) 100%);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}
      .market-list-popup{position:fixed;top:50%;left:50%;z-index:12999;width:min(92vw,1100px)!important;height:min(86vh,900px)!important;min-width:0!important;min-height:0!important;max-width:1100px!important;max-height:900px!important;transform:translate(-50%,-50%);display:flex;flex-direction:column;overflow:hidden;isolation:isolate;border:1px solid #b77b00;border-radius:4px;background:radial-gradient(circle at 50% 0%,#0b0d0e 0%,#050607 44%,#020303 100%);color:#f6f6f3;box-shadow:0 35px 110px rgba(0,0,0,.8),0 0 0 1px rgba(241,166,0,.12);font-family:Arial,Helvetica,sans-serif}
      .market-list-popup::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(rgba(241,166,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(241,166,0,.02) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.65),transparent 72%)}
      .market-list-popup-header{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:23px 24px 19px;border-bottom:1px solid #b77b00;background:radial-gradient(circle at 57% 30%,#10263a 0%,#071a2b 44%,#03121f 100%);color:#fff}
      .market-list-popup-kicker{display:block;margin-bottom:6px;color:#f1a600;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
      .market-list-popup-header h2{margin:0 0 6px;color:#f7f5ef;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1;text-shadow:0 3px 22px rgba(0,0,0,.55)}
      .market-list-popup-header p{margin:0;color:#e1e6e9;font-size:13px}
      .market-list-popup-close{flex:0 0 42px;width:42px;height:42px;display:grid;place-items:center;border:1px solid #d89400;border-radius:3px;background:#090b0c;color:#f1a600;cursor:pointer;font:700 27px/1 Arial,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.35)}
      .market-list-popup-close:hover,.market-list-popup-close:focus-visible{background:#f1a600;color:#070809;outline:none}
      .market-list-column-headings,.market-list-row{display:grid;grid-template-columns:60px minmax(240px,1fr) 180px 110px;align-items:center;gap:14px}
      .market-list-column-headings{padding:12px 22px;border-bottom:1px solid rgba(177,123,0,.62);background:#090b0c;color:#f1a600;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
      .market-list-scroll{flex:1;overflow:auto;overscroll-behavior:contain;padding:12px 14px 16px;background:radial-gradient(circle at 50% 0%,#0b0d0e 0%,#050607 44%,#020303 100%);scrollbar-color:#8a6412 #070809;scrollbar-width:thin}
      .market-list-scroll::-webkit-scrollbar{width:10px}.market-list-scroll::-webkit-scrollbar-track{background:#070809}.market-list-scroll::-webkit-scrollbar-thumb{border:2px solid #070809;border-radius:8px;background:#8a6412}.market-list-scroll::-webkit-scrollbar-thumb:hover{background:#f1a600}
      .market-list-row{min-height:72px;margin:0 0 10px;padding:11px 18px;border:1px solid #806322;border-radius:3px;background:linear-gradient(145deg,#111415 0%,#090b0c 58%,#050607 100%);box-shadow:0 10px 28px rgba(0,0,0,.28);transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease}
      .market-list-row:hover{border-color:#d39200;box-shadow:0 14px 34px rgba(0,0,0,.42),0 0 0 1px rgba(241,166,0,.08);transform:translateY(-1px)}
      .market-list-rank{display:grid;place-items:center;width:34px;height:34px;border:1px solid #d69200;border-radius:3px;background:#090b0c;color:#f1a600;font-weight:900}
      .market-list-description{min-width:0}
      .market-list-description strong{display:block;color:#f5f5f2;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.1}
      .market-list-description small{display:block;margin-top:5px;color:#c7cbcd;font-size:11px}
      .market-list-description small::after{content:"  •  Available";color:#58c94f;font-weight:700}
      .market-list-price{color:#f1a600;font-size:20px;line-height:1;white-space:nowrap}
      .market-list-inquire{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 14px;border:1px solid #d89400;border-radius:3px;background:#090b0c;color:#f4f4f1!important;text-decoration:none!important;font-size:10px;font-weight:900;letter-spacing:.04em;text-transform:uppercase}
      .market-list-inquire:hover,.market-list-inquire:focus-visible{background:#f1a600;color:#070809!important;outline:none}
      .market-list-popup-footer{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px 22px;border-top:1px solid #b77b00;background:#020405;color:#cdd1d4;font-size:11px}
      .market-list-popup-footer a{color:#f1a600;font-weight:900;text-decoration:none}.market-list-popup-footer a:hover{color:#fff}
      .market-list-loading,.market-list-error{display:grid;place-items:center;min-height:260px;padding:30px;border:1px solid rgba(177,122,0,.5);border-left:3px solid #f1a600;background:rgba(12,14,15,.78);color:#cdd1d4;text-align:center;font-weight:700}
      .map-panel[data-market-list-bound="true"]{cursor:pointer}
      @media(max-width:720px){
        .market-list-popup{width:96vw!important;height:90vh!important}
        .market-list-popup-header{padding:18px 16px 14px}.market-list-popup-header h2{font-size:23px}.market-list-popup-header p{font-size:11px}
        .market-list-column-headings{display:none}
        .market-list-scroll{padding:10px}
        .market-list-row{grid-template-columns:42px minmax(0,1fr) auto;padding:11px 12px;gap:10px}
        .market-list-price{grid-column:2;font-size:17px}
        .market-list-inquire{grid-column:3;grid-row:1 / span 2;min-width:74px;padding:0 10px}
        .market-list-popup-footer{align-items:flex-start;flex-direction:column}
      }
    `;
    document.head.appendChild(style);
  }

  function closeMarketDataMenu() {
    const menu = document.getElementById("market-data-header-menu");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");

    const trigger = Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => /^market data$/i.test(normalizedText(link)));
    trigger?.setAttribute("aria-expanded", "false");
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
    closeMarketDataMenu();
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

  function bindMarketInsightsPanel() {
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
      event.stopImmediatePropagation();
      openModal(panel);
    }, true);

    panel.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        openModal(panel);
      }
    });
    return true;
  }

  function initialize() {
    bindMarketInsightsPanel();
    setTimeout(bindMarketInsightsPanel, 300);
    setTimeout(bindMarketInsightsPanel, 1000);
    setTimeout(bindMarketInsightsPanel, 2200);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const option = target.closest("#market-data-header-menu button");
    if (!(option instanceof HTMLButtonElement)) return;
    if (!/^florida market insights$/i.test(normalizedText(option))) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openModal(option);
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();