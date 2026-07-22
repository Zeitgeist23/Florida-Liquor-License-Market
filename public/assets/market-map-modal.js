(() => {
  const STYLE_ID = "market-map-modal-styles";
  const BACKDROP_CLASS = "market-map-modal-backdrop";
  const EXPANDED_CLASS = "market-map-expanded";
  const BODY_CLASS = "market-map-modal-open";
  let previousFocus = null;
  let closeButton = null;
  let backdrop = null;
  let activePanel = null;

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS}{overflow:hidden!important}
      .${BACKDROP_CLASS}{position:fixed;inset:0;z-index:9998;background:rgba(0,7,13,.82);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:marketMapFade .18s ease-out}
      .map-panel.${EXPANDED_CLASS}{position:fixed!important;top:50%!important;left:50%!important;z-index:9999!important;width:65vw!important;height:65vh!important;max-width:1180px!important;max-height:780px!important;min-width:680px!important;min-height:470px!important;margin:0!important;transform:translate(-50%,-50%)!important;display:flex!important;flex-direction:column!important;overflow:auto!important;border:2px solid #f6a700!important;border-radius:10px!important;background:#f7f7f5!important;box-shadow:0 35px 110px rgba(0,0,0,.72),0 0 0 1px rgba(246,167,0,.28)!important;animation:marketMapPop .2s ease-out}
      .map-panel.${EXPANDED_CLASS} .panel-title{flex:0 0 auto!important;padding-right:52px!important}
      .map-panel.${EXPANDED_CLASS} .map-content{flex:1 1 auto!important;min-height:0!important;display:grid!important;grid-template-columns:minmax(150px,.32fr) minmax(0,1fr)!important;align-items:stretch!important;gap:22px!important;padding:20px 24px 14px!important}
      .map-panel.${EXPANDED_CLASS} .florida-map-art{width:100%!important;height:100%!important;min-height:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:visible!important}
      .map-panel.${EXPANDED_CLASS} .florida-map-art img,.map-panel.${EXPANDED_CLASS} .florida-map-art svg{display:block!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain!important}
      .map-panel.${EXPANDED_CLASS} .panel-link{flex:0 0 auto!important}
      .market-map-modal-close{position:absolute!important;top:11px!important;right:13px!important;z-index:2!important;width:36px!important;height:36px!important;display:grid!important;place-items:center!important;border:1px solid #f6a700!important;border-radius:50%!important;background:#061728!important;color:#f6a700!important;cursor:pointer!important;font:700 24px/1 Arial,sans-serif!important;box-shadow:0 5px 18px rgba(0,0,0,.24)!important}
      .market-map-modal-close:hover,.market-map-modal-close:focus-visible{background:#f6a700!important;color:#061728!important;outline:none!important}
      @keyframes marketMapFade{from{opacity:0}to{opacity:1}}
      @keyframes marketMapPop{from{opacity:0;transform:translate(-50%,-48%) scale(.97)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
      @media(max-width:820px){
        .map-panel.${EXPANDED_CLASS}{width:94vw!important;height:86vh!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important}
        .map-panel.${EXPANDED_CLASS} .map-content{grid-template-columns:1fr!important;grid-template-rows:auto minmax(300px,1fr)!important;gap:12px!important;padding:16px!important}
      }
      @media(prefers-reduced-motion:reduce){.${BACKDROP_CLASS},.map-panel.${EXPANDED_CLASS}{animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  function closeModal() {
    if (!activePanel) return;

    activePanel.classList.remove(EXPANDED_CLASS);
    activePanel.removeAttribute("role");
    activePanel.removeAttribute("aria-modal");
    activePanel.removeAttribute("aria-label");
    document.body.classList.remove(BODY_CLASS);

    closeButton?.remove();
    backdrop?.remove();
    closeButton = null;
    backdrop = null;
    activePanel = null;

    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  }

  function openModal(panel, trigger) {
    if (activePanel) return;

    installStyles();
    activePanel = panel;
    previousFocus = trigger;

    backdrop = document.createElement("div");
    backdrop.className = BACKDROP_CLASS;
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.addEventListener("click", closeModal);

    closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "market-map-modal-close";
    closeButton.setAttribute("aria-label", "Close market data map");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", closeModal);

    document.body.appendChild(backdrop);
    panel.appendChild(closeButton);
    document.body.classList.add(BODY_CLASS);
    panel.classList.add(EXPANDED_CLASS);
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Florida market data map");
    closeButton.focus();
  }

  function bindMarketMapLink() {
    const panel = document.querySelector(".map-panel");
    if (!(panel instanceof HTMLElement)) return false;

    const links = Array.from(panel.querySelectorAll("a"));
    const triggers = links.filter((link) => /explore market data|view all/i.test(link.textContent || ""));
    if (!triggers.length) return false;

    triggers.forEach((trigger) => {
      if (trigger.dataset.marketMapModalBound === "true") return;
      trigger.dataset.marketMapModalBound = "true";
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openModal(panel, trigger);
      });
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
