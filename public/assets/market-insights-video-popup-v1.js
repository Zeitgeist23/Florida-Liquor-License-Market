(() => {
  const STYLE_ID = "market-insights-video-popup-styles-v1";
  const BACKDROP_ID = "market-insights-video-popup-backdrop";
  const MODAL_ID = "market-insights-video-popup";
  const MOVED_CLASS = "market-insights-video-popup-media";

  let movedMedia = null;
  let originalParent = null;
  let originalNextSibling = null;
  let previousFocus = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findBriefingSection() {
    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => /video briefing/i.test(normalizedText(element)));
    return label?.closest("section") || null;
  }

  function findStudioImage(section) {
    const exact = section?.querySelector(
      'img[src*="market-report-studio"],img[src*="market-report"],img[alt*="market report" i],img[alt*="newscast" i]'
    );
    if (exact instanceof HTMLImageElement) return exact;

    const images = Array.from(section?.querySelectorAll("img") || [])
      .filter((image) => !/brand-sharp|logo/i.test(image.getAttribute("src") || ""));
    return images
      .map((image) => ({ image, area: image.getBoundingClientRect().width * image.getBoundingClientRect().height }))
      .sort((a, b) => b.area - a.area)[0]?.image || null;
  }

  function lowestCommonAncestor(first, second, boundary) {
    if (!(first instanceof Element)) return null;
    if (!(second instanceof Element)) return first.parentElement;

    const ancestors = [];
    let current = first;
    while (current && current !== boundary) {
      ancestors.push(current);
      current = current.parentElement;
    }
    if (boundary) ancestors.push(boundary);

    current = second;
    while (current) {
      if (ancestors.includes(current)) return current;
      if (current === boundary) break;
      current = current.parentElement;
    }
    return null;
  }

  function findMediaPanel() {
    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return null;

    const image = findStudioImage(section);
    if (!(image instanceof HTMLImageElement)) return null;

    const audio = section.querySelector("audio");
    let panel = lowestCommonAncestor(image, audio, section);

    if (panel === section) {
      let child = image;
      while (child.parentElement && child.parentElement !== section) child = child.parentElement;
      panel = child;
    }

    if (!(panel instanceof HTMLElement)) panel = image.parentElement;
    return panel instanceof HTMLElement ? panel : null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.market-insights-video-popup-open{overflow:hidden!important}
      #${BACKDROP_ID}{
        position:fixed;
        inset:0;
        z-index:12000;
        display:grid;
        place-items:center;
        background:rgba(0,7,13,.88);
        backdrop-filter:blur(5px);
        -webkit-backdrop-filter:blur(5px);
      }
      #${MODAL_ID}{
        position:relative;
        width:80vw;
        height:80vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:54px 28px 28px;
        overflow:hidden;
        border:2px solid #f6a700;
        border-radius:12px;
        background:#03111e;
        box-shadow:0 36px 120px rgba(0,0,0,.78),0 0 0 1px rgba(246,167,0,.24);
      }
      #${MODAL_ID} .market-insights-video-popup-title{
        position:absolute;
        top:0;
        left:0;
        right:0;
        height:48px;
        display:flex;
        align-items:center;
        padding:0 74px 0 20px;
        border-bottom:1px solid rgba(246,167,0,.28);
        color:#fff;
        font:900 14px/1 Arial,Helvetica,sans-serif;
        letter-spacing:.06em;
        text-transform:uppercase;
      }
      #${MODAL_ID} .market-insights-video-popup-close{
        position:absolute;
        top:8px;
        right:10px;
        z-index:4;
        width:34px;
        height:34px;
        display:grid;
        place-items:center;
        border:2px solid #f6a700;
        border-radius:50%;
        background:#061728;
        color:#f6a700;
        cursor:pointer;
        font:700 24px/1 Arial,sans-serif;
      }
      #${MODAL_ID} .market-insights-video-popup-close:hover,
      #${MODAL_ID} .market-insights-video-popup-close:focus-visible{
        background:#f6a700;
        color:#061728;
        outline:none;
      }
      #${MODAL_ID} .market-insights-video-popup-stage{
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        overflow:auto;
      }
      #${MODAL_ID} .${MOVED_CLASS}{
        width:100%!important;
        max-width:none!important;
        min-width:0!important;
        height:auto!important;
        max-height:100%!important;
        margin:0!important;
        flex:0 1 auto!important;
      }
      #${MODAL_ID} .${MOVED_CLASS} img[src*="market-report"],
      #${MODAL_ID} .${MOVED_CLASS} img[alt*="market report" i],
      #${MODAL_ID} .${MOVED_CLASS} img[alt*="newscast" i]{
        width:100%!important;
        height:auto!important;
        max-width:none!important;
      }
      #${MODAL_ID} .${MOVED_CLASS} audio{
        width:calc(100% - 28px)!important;
        max-width:none!important;
      }
      @media(max-width:760px){
        #${MODAL_ID}{padding:50px 12px 16px}
      }
    `;
    document.head.appendChild(style);
  }

  function closePopup() {
    const backdrop = document.getElementById(BACKDROP_ID);
    if (!backdrop) return;

    if (movedMedia && originalParent) {
      movedMedia.classList.remove(MOVED_CLASS);
      if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
        originalParent.insertBefore(movedMedia, originalNextSibling);
      } else {
        originalParent.appendChild(movedMedia);
      }
    }

    backdrop.remove();
    document.body.classList.remove("market-insights-video-popup-open");

    movedMedia = null;
    originalParent = null;
    originalNextSibling = null;

    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  }

  function closeMarketDataMenu() {
    const menu = document.getElementById("market-data-header-menu");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");

    const trigger = Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => /^market data$/i.test(normalizedText(link)));
    trigger?.setAttribute("aria-expanded", "false");
  }

  function openPopup(trigger) {
    if (document.getElementById(BACKDROP_ID)) return;

    const media = findMediaPanel();
    if (!(media instanceof HTMLElement)) return;

    installStyles();
    closeMarketDataMenu();
    previousFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;

    originalParent = media.parentNode;
    originalNextSibling = media.nextSibling;
    movedMedia = media;

    const backdrop = document.createElement("div");
    backdrop.id = BACKDROP_ID;
    backdrop.setAttribute("role", "presentation");

    const modal = document.createElement("section");
    modal.id = MODAL_ID;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Florida Liquor License Market Report video");

    const title = document.createElement("div");
    title.className = "market-insights-video-popup-title";
    title.textContent = "Florida Liquor License Market Report";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "market-insights-video-popup-close";
    closeButton.setAttribute("aria-label", "Close market report video");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", closePopup);

    const stage = document.createElement("div");
    stage.className = "market-insights-video-popup-stage";

    media.classList.add(MOVED_CLASS);
    stage.appendChild(media);
    modal.append(title, closeButton, stage);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    document.body.classList.add("market-insights-video-popup-open");

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closePopup();
    });
    closeButton.focus();
    window.dispatchEvent(new Event("resize"));
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
    window.setTimeout(() => openPopup(option), 20);
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.getElementById(BACKDROP_ID)) closePopup();
  });
})();
