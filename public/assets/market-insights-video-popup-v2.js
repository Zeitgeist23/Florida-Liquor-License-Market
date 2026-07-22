(() => {
  const STYLE_ID = "market-insights-video-popup-styles-v2";
  const BACKDROP_ID = "market-insights-video-popup-backdrop";
  const MODAL_ID = "market-insights-video-popup";
  const MOVED_CLASS = "market-insights-video-popup-media";
  const BRAND_ID = "market-insights-video-popup-brand";
  const HIDDEN_ORIGINAL_CLASS = "market-insights-video-popup-original-brand-hidden";

  let movedMedia = null;
  let originalParent = null;
  let originalNextSibling = null;
  let previousFocus = null;
  let hiddenOriginalBranding = [];
  let brandResizeObserver = null;
  let brandResizeTimer = 0;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findBriefingSection() {
    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => /video briefing/i.test(normalizedText(element)));
    return label?.closest("section") || null;
  }

  function findStudioImage(root) {
    const exact = root?.querySelector(
      'img[src*="market-report-studio"],img[src*="market-report"],img[alt*="market report" i],img[alt*="newscast" i]'
    );
    if (exact instanceof HTMLImageElement) return exact;

    const images = Array.from(root?.querySelectorAll("img") || [])
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
    document.querySelectorAll('[id^="market-insights-video-popup-styles"]').forEach((style) => style.remove());

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.market-insights-video-popup-open{overflow:hidden!important}
      #${BACKDROP_ID}{
        position:fixed;inset:0;z-index:12000;display:grid;place-items:center;
        background:rgba(0,7,13,.88);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)
      }
      #${MODAL_ID}{
        position:relative;width:80vw;height:80vh;display:flex;align-items:center;justify-content:center;
        padding:54px 28px 28px;overflow:hidden;border:2px solid #f6a700;border-radius:12px;
        background:#03111e;box-shadow:0 36px 120px rgba(0,0,0,.78),0 0 0 1px rgba(246,167,0,.24)
      }
      #${MODAL_ID} .market-insights-video-popup-title{
        position:absolute;top:0;left:0;right:0;height:48px;display:flex;align-items:center;
        padding:0 74px 0 20px;border-bottom:1px solid rgba(246,167,0,.28);color:#fff;
        font:900 14px/1 Arial,Helvetica,sans-serif;letter-spacing:.06em;text-transform:uppercase
      }
      #${MODAL_ID} .market-insights-video-popup-close{
        position:absolute;top:8px;right:10px;z-index:80;width:34px;height:34px;display:grid;place-items:center;
        border:2px solid #f6a700;border-radius:50%;background:#061728;color:#f6a700;cursor:pointer;
        font:700 24px/1 Arial,sans-serif
      }
      #${MODAL_ID} .market-insights-video-popup-close:hover,
      #${MODAL_ID} .market-insights-video-popup-close:focus-visible{background:#f6a700;color:#061728;outline:none}
      #${MODAL_ID} .market-insights-video-popup-stage{
        position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:auto
      }
      #${MODAL_ID} .${MOVED_CLASS}{
        width:100%!important;max-width:none!important;min-width:0!important;height:auto!important;
        max-height:100%!important;margin:0!important;flex:0 1 auto!important
      }
      #${MODAL_ID} .${MOVED_CLASS} img[src*="market-report"],
      #${MODAL_ID} .${MOVED_CLASS} img[alt*="market report" i],
      #${MODAL_ID} .${MOVED_CLASS} img[alt*="newscast" i]{width:100%!important;height:auto!important;max-width:none!important}
      #${MODAL_ID} .${MOVED_CLASS} audio{width:calc(100% - 28px)!important;max-width:none!important}
      #${MODAL_ID} #homepage-newscast-screen-logo,
      #${MODAL_ID} #homepage-video-brand-logo,
      #${MODAL_ID} .${HIDDEN_ORIGINAL_CLASS}{display:none!important}
      #${BRAND_ID}{
        position:absolute;z-index:70;display:flex;flex-direction:column;gap:30px;pointer-events:none;
        transform:translateZ(0)
      }
      #${BRAND_ID} .market-insights-video-popup-brand-label,
      #${BRAND_ID} .market-insights-video-popup-brand-logo{
        box-sizing:border-box;border-left:2px solid #f6a700;background:rgba(3,17,30,.82);
        filter:drop-shadow(0 3px 9px rgba(0,0,0,.82))
      }
      #${BRAND_ID} .market-insights-video-popup-brand-label{
        width:max-content;padding:7px 10px;color:#fff;font:900 11px/1 Arial,Helvetica,sans-serif;
        letter-spacing:.08em;text-transform:uppercase;white-space:nowrap
      }
      #${BRAND_ID} .market-insights-video-popup-brand-logo{
        width:clamp(148px,12.5vw,194px);padding:6px 8px 6px 10px
      }
      #${BRAND_ID} .market-insights-video-popup-brand-logo img{display:block;width:100%;height:auto;object-fit:contain}
      @media(max-width:760px){
        #${MODAL_ID}{padding:50px 12px 16px}
        #${BRAND_ID}{gap:18px}
        #${BRAND_ID} .market-insights-video-popup-brand-label{padding:5px 8px;font-size:9px}
        #${BRAND_ID} .market-insights-video-popup-brand-logo{width:clamp(112px,25vw,150px);padding:4px 6px 4px 8px}
      }
    `;
    document.head.appendChild(style);
  }

  function findOriginalMarketReportLabel(media) {
    const candidates = Array.from(media.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,strong,div"))
      .filter((element) => /^market report$/i.test(normalizedText(element)))
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 0 && rect.height > 0)
      .sort((a, b) => (a.rect.width * a.rect.height) - (b.rect.width * b.rect.height));

    for (const { element } of candidates) {
      let current = element;
      let depth = 0;
      while (current instanceof HTMLElement && media.contains(current) && depth < 6) {
        const style = window.getComputedStyle(current);
        const borderWidth = Number.parseFloat(style.borderLeftWidth || "0");
        if (borderWidth >= 1) return current;
        current = current.parentElement;
        depth += 1;
      }
    }
    return candidates[0]?.element || null;
  }

  function hideOriginalBranding(media) {
    hiddenOriginalBranding = [];
    const label = findOriginalMarketReportLabel(media);
    if (label instanceof HTMLElement) {
      label.classList.add(HIDDEN_ORIGINAL_CLASS);
      hiddenOriginalBranding.push(label);
    }

    const legacyLogo = media.querySelector("#homepage-newscast-screen-logo,#homepage-video-brand-logo");
    if (legacyLogo instanceof HTMLElement) {
      legacyLogo.classList.add(HIDDEN_ORIGINAL_CLASS);
      hiddenOriginalBranding.push(legacyLogo);
    }
  }

  function restoreOriginalBranding() {
    hiddenOriginalBranding.forEach((element) => element.classList.remove(HIDDEN_ORIGINAL_CLASS));
    hiddenOriginalBranding = [];
  }

  function createBrandColumn() {
    const brand = document.createElement("div");
    brand.id = BRAND_ID;

    const label = document.createElement("div");
    label.className = "market-insights-video-popup-brand-label";
    label.textContent = "MARKET REPORT";

    const logoBox = document.createElement("div");
    logoBox.className = "market-insights-video-popup-brand-logo";

    const logo = document.createElement("img");
    logo.src = "/assets/brand-sharp.svg";
    logo.alt = "Florida Liquor License Market";
    logoBox.appendChild(logo);

    brand.append(label, logoBox);
    return brand;
  }

  function positionBrandColumn(stage, media, brand) {
    const image = findStudioImage(media);
    if (!(image instanceof HTMLImageElement)) return;

    const stageRect = stage.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    if (!stageRect.width || !imageRect.width) return;

    const leftInset = Math.max(14, Math.round(imageRect.width * 0.014));
    const topInset = Math.max(12, Math.round(imageRect.height * 0.025));
    brand.style.left = `${Math.round(imageRect.left - stageRect.left + leftInset)}px`;
    brand.style.top = `${Math.round(imageRect.top - stageRect.top + topInset)}px`;
  }

  function observeBrand(stage, media, brand) {
    brandResizeObserver?.disconnect();
    if ("ResizeObserver" in window) {
      brandResizeObserver = new ResizeObserver(() => positionBrandColumn(stage, media, brand));
      brandResizeObserver.observe(stage);
      const image = findStudioImage(media);
      if (image instanceof HTMLElement) brandResizeObserver.observe(image);
    }
  }

  function closePopup() {
    const backdrop = document.getElementById(BACKDROP_ID);
    if (!backdrop) return;

    brandResizeObserver?.disconnect();
    brandResizeObserver = null;
    window.clearTimeout(brandResizeTimer);
    restoreOriginalBranding();

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
    hideOriginalBranding(media);

    const brand = createBrandColumn();
    stage.appendChild(brand);
    modal.append(title, closeButton, stage);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    document.body.classList.add("market-insights-video-popup-open");

    const reposition = () => positionBrandColumn(stage, media, brand);
    requestAnimationFrame(() => {
      reposition();
      observeBrand(stage, media, brand);
    });
    brandResizeTimer = window.setTimeout(reposition, 250);

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closePopup();
    });
    closeButton.focus();
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