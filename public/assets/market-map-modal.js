(() => {
  const STYLE_ID = "market-map-modal-styles";
  const BACKDROP_CLASS = "market-map-modal-backdrop";
  const MODAL_CLASS = "market-map-popup";
  const BODY_CLASS = "market-map-modal-open";

  let previousFocus = null;
  let backdrop = null;
  let modal = null;

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS}{overflow:hidden!important}
      .${BACKDROP_CLASS}{position:fixed;inset:0;z-index:9998;background:rgba(0,7,13,.84);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:marketMapFade .18s ease-out}
      .${MODAL_CLASS}{position:fixed;top:50%;left:50%;z-index:9999;width:65vw;height:65vh;max-width:1280px;max-height:820px;min-width:720px;min-height:470px;transform:translate(-50%,-50%);overflow:hidden;border:2px solid #f6a700;border-radius:10px;background:#f7f7f5;color:#111820;box-shadow:0 35px 110px rgba(0,0,0,.72),0 0 0 1px rgba(246,167,0,.28);animation:marketMapPop .2s ease-out;font-family:Arial,Helvetica,sans-serif}
      .market-map-popup-title{height:64px;display:flex;align-items:center;padding:0 84px 0 24px;border-bottom:1px solid #d8dde1;font-size:15px;font-weight:900;letter-spacing:.015em;text-transform:uppercase}
      .market-map-popup-content{height:calc(100% - 64px);display:grid;grid-template-columns:minmax(250px,34%) minmax(0,66%);gap:18px;padding:22px 24px 24px}
      .market-map-popup-sidebar{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;min-width:0;padding:4px 8px 0 2px}
      .market-map-popup-logo{display:block;width:65%;max-width:234px;height:auto;max-height:98px;object-fit:contain;object-position:left center;margin-bottom:24px}
      .market-map-popup-key h3{margin:0 0 14px;font-size:19px;line-height:1.02;text-transform:uppercase}
      .market-map-popup-key ul{list-style:none;margin:0;padding:0;display:grid;gap:9px;font-size:14px}
      .market-map-popup-key li{display:flex;align-items:center;gap:11px}
      .market-map-popup-key i{display:block;width:18px;height:18px;flex:0 0 18px}
      .market-map-popup-key .range-1{background:#ec341f}.market-map-popup-key .range-2{background:#ff7b00}.market-map-popup-key .range-3{background:#f4aa00}.market-map-popup-key .range-4{background:#7faf2d}.market-map-popup-key .range-5{background:#3b8b35}
      .market-map-popup-note{margin-top:16px;color:#5f6972;font-size:11px;line-height:1.45;max-width:280px}
      .market-map-popup-art{min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;overflow:visible}
      .market-map-popup-art img{display:block;width:100%;height:100%;max-width:none;max-height:none;object-fit:contain}
      .market-map-modal-close{position:absolute;top:10px;right:14px;z-index:2;width:44px;height:44px;display:grid;place-items:center;border:2px solid #f6a700;border-radius:50%;background:#061728;color:#f6a700;cursor:pointer;font:700 28px/1 Arial,sans-serif;box-shadow:0 7px 22px rgba(0,0,0,.3)}
      .market-map-modal-close:hover,.market-map-modal-close:focus-visible{background:#f6a700;color:#061728;outline:none}
      @keyframes marketMapFade{from{opacity:0}to{opacity:1}}
      @keyframes marketMapPop{from{opacity:0;transform:translate(-50%,-48%) scale(.97)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
      @media(max-width:900px){
        .${MODAL_CLASS}{width:94vw;height:88vh;min-width:0;min-height:0;max-width:none;max-height:none}
        .market-map-popup-content{grid-template-columns:1fr;grid-template-rows:auto minmax(320px,1fr);gap:12px;padding:16px}
        .market-map-popup-sidebar{display:grid;grid-template-columns:minmax(180px,1fr) minmax(180px,1fr);gap:18px;align-items:start;padding:0}
        .market-map-popup-logo{width:65%;max-width:195px;max-height:68px;margin:0}
        .market-map-popup-key h3{font-size:15px}.market-map-popup-key ul{font-size:12px;gap:6px}.market-map-popup-key i{width:14px;height:14px;flex-basis:14px}
        .market-map-popup-note{display:none}
      }
      @media(max-width:560px){
        .market-map-popup-title{height:56px;padding-left:16px;font-size:11px}
        .market-map-popup-content{height:calc(100% - 56px);grid-template-rows:auto minmax(280px,1fr)}
        .market-map-popup-sidebar{grid-template-columns:1fr;gap:10px}
        .market-map-popup-logo{width:65%;max-width:159px;max-height:51px}
        .market-map-popup-key h3{margin-bottom:8px;font-size:13px}.market-map-popup-key ul{grid-template-columns:repeat(2,minmax(0,1fr));font-size:10px}
        .market-map-modal-close{top:7px;right:9px;width:40px;height:40px;font-size:25px}
      }
      @media(prefers-reduced-motion:reduce){.${BACKDROP_CLASS},.${MODAL_CLASS}{animation:none}}
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

  function createLegend() {
    const legend = document.createElement("div");
    legend.className = "market-map-popup-key";
    legend.innerHTML = `
      <h3>Average 4COP<br>Quota Price<br>by County</h3>
      <ul>
        <li><i class="range-1"></i><span>$600K+</span></li>
        <li><i class="range-2"></i><span>$450K – $600K</span></li>
        <li><i class="range-3"></i><span>$300K – $450K</span></li>
        <li><i class="range-4"></i><span>$200K – $300K</span></li>
        <li><i class="range-5"></i><span>Under $200K</span></li>
      </ul>
      <p class="market-map-popup-note">County color reflects the average disclosed asking and sold inventory prices. Dashed dark outlines indicate that a sold price is included.</p>
    `;
    return legend;
  }

  function openModal(trigger) {
    if (modal) return;

    installStyles();
    previousFocus = trigger;

    backdrop = document.createElement("div");
    backdrop.className = BACKDROP_CLASS;
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.addEventListener("click", closeModal);

    modal = document.createElement("section");
    modal.className = MODAL_CLASS;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Florida Market Insights map");

    const title = document.createElement("div");
    title.className = "market-map-popup-title";
    title.textContent = "Florida Market Insights";

    const content = document.createElement("div");
    content.className = "market-map-popup-content";

    const sidebar = document.createElement("aside");
    sidebar.className = "market-map-popup-sidebar";

    const logo = document.createElement("img");
    logo.className = "market-map-popup-logo";
    logo.src = "/assets/brand-sharp.svg";
    logo.alt = "Florida Liquor License Market";
    sidebar.append(logo, createLegend());

    const art = document.createElement("div");
    art.className = "market-map-popup-art";

    const map = document.createElement("img");
    map.src = "/assets/florida-map-clean.png";
    map.alt = "Florida counties colored by current liquor license asking and sold prices";
    art.appendChild(map);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "market-map-modal-close";
    closeButton.setAttribute("aria-label", "Close market data map");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", closeModal);

    content.append(sidebar, art);
    modal.append(title, content, closeButton);
    document.body.append(backdrop, modal);
    document.body.classList.add(BODY_CLASS);
    closeButton.focus();
  }

  function bindMarketMapLink() {
    const panel = document.querySelector(".map-panel");
    if (!(panel instanceof HTMLElement)) return false;

    const trigger = Array.from(panel.querySelectorAll("a")).find((link) => /explore market data/i.test(link.textContent || ""));
    if (!(trigger instanceof HTMLAnchorElement)) return false;
    if (trigger.dataset.marketMapModalBound === "true") return true;

    trigger.dataset.marketMapModalBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger);
    });
    return true;
  }

  function initialize() {
    bindMarketMapLink();
    setTimeout(bindMarketMapLink, 300);
    setTimeout(bindMarketMapLink, 1000);
    setTimeout(bindMarketMapLink, 2200);
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
