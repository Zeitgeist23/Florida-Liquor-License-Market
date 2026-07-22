(() => {
  const OVERLAY_ID = "homepage-newscast-screen-logo";
  const OLD_OVERLAY_ID = "homepage-video-brand-logo";
  const STYLE_ID = "homepage-newscast-screen-logo-styles";
  const VIDEO_POPUP_ID = "market-insights-video-popup";
  let resizeTimer = 0;
  let resizeObserver = null;
  let observedTarget = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function findBriefingSection() {
    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => normalizedText(element).includes("video briefing"));
    return label?.closest("section") || null;
  }

  function largestRenderedImage(images) {
    return images
      .map((image) => ({ image, area: image.getBoundingClientRect().width * image.getBoundingClientRect().height }))
      .sort((a, b) => b.area - a.area)[0]?.image || null;
  }

  function findStudioImage() {
    const exact = document.querySelector(
      'img[src*="market-report-studio"],img[src*="market-report"],img[alt*="market report" i],img[alt*="newscast" i]'
    );
    if (exact instanceof HTMLImageElement) return exact;

    const section = findBriefingSection();
    if (!section) return null;

    const candidates = Array.from(section.querySelectorAll("img"))
      .filter((image) => !/brand-sharp|logo/i.test(image.getAttribute("src") || ""));
    const largest = largestRenderedImage(candidates);
    return largest instanceof HTMLImageElement ? largest : null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID}{
        position:absolute;
        z-index:50;
        display:block;
        pointer-events:none;
        user-select:none;
        object-fit:contain;
        box-sizing:border-box;
        padding:4px 7px;
        border-left:2px solid #f6a700;
        border-radius:2px;
        background:rgba(3,17,30,.76);
        filter:drop-shadow(0 3px 9px rgba(0,0,0,.82));
        opacity:1;
      }
      @media(max-width:640px){
        #${OVERLAY_ID}{padding:3px 5px;border-left-width:1px}
      }
    `;
    document.head.appendChild(style);
  }

  function exactMarketReportLineLeft(image) {
    const popup = image.closest(`#${VIDEO_POPUP_ID}`);
    if (!(popup instanceof HTMLElement)) return null;

    const candidates = Array.from(popup.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,strong,div"))
      .filter((element) => normalizedText(element) === "market report")
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 0 && rect.height > 0)
      .sort((a, b) => (a.rect.width * a.rect.height) - (b.rect.width * b.rect.height));

    for (const { element } of candidates) {
      let current = element;
      let depth = 0;

      while (current instanceof HTMLElement && popup.contains(current) && depth < 7) {
        const rect = current.getBoundingClientRect();
        const style = window.getComputedStyle(current);
        const borderWidth = Number.parseFloat(style.borderLeftWidth || "0");

        if (borderWidth >= 1 && rect.width > 0 && rect.height >= 12) {
          return rect.left;
        }

        current = current.parentElement;
        depth += 1;
      }
    }

    const labelRect = candidates[0]?.rect;
    return labelRect ? labelRect.left - 12 : null;
  }

  function positionOverlay(image, overlay, host) {
    const imageRect = image.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();
    if (!imageRect.width || !imageRect.height) return;

    const width = Math.max(92, Math.min(imageRect.width * 0.19, 154));
    const isInsideVideoPopup = Boolean(image.closest(`#${VIDEO_POPUP_ID}`));
    const measuredLineLeft = isInsideVideoPopup ? exactMarketReportLineLeft(image) : null;
    const fallbackLeft = imageRect.left + imageRect.width * (isInsideVideoPopup ? 0.013 : 0.024) - (isInsideVideoPopup ? 1 : 0);
    const absoluteLeft = Number.isFinite(measuredLineLeft) ? measuredLineLeft : fallbackLeft;

    overlay.style.left = `${absoluteLeft - hostRect.left}px`;
    overlay.style.top = `${imageRect.top - hostRect.top + imageRect.height * 0.095}px`;
    overlay.style.width = `${width}px`;
    overlay.style.height = "auto";
  }

  function observeImage(image, overlay, host) {
    if (!("ResizeObserver" in window)) return;
    if (observedTarget === image) return;
    resizeObserver?.disconnect();
    observedTarget = image;
    resizeObserver = new ResizeObserver(() => positionOverlay(image, overlay, host));
    resizeObserver.observe(image);
  }

  function installOverlay() {
    document.getElementById(OLD_OVERLAY_ID)?.remove();

    const image = findStudioImage();
    if (!(image instanceof HTMLImageElement)) return false;

    const host = image.parentElement;
    if (!(host instanceof HTMLElement)) return false;

    installStyles();
    if (window.getComputedStyle(host).position === "static") host.style.position = "relative";

    let overlay = document.getElementById(OVERLAY_ID);
    if (!(overlay instanceof HTMLImageElement)) {
      overlay = document.createElement("img");
      overlay.id = OVERLAY_ID;
      overlay.src = "/assets/brand-sharp.svg";
      overlay.alt = "";
      overlay.setAttribute("aria-hidden", "true");
      host.appendChild(overlay);
    } else if (overlay.parentElement !== host) {
      host.appendChild(overlay);
    }

    positionOverlay(image, overlay, host);
    observeImage(image, overlay, host);
    if (!image.complete) image.addEventListener("load", () => positionOverlay(image, overlay, host), { once: true });
    return true;
  }

  function initialize() {
    installOverlay();
    window.setTimeout(installOverlay, 250);
    window.setTimeout(installOverlay, 800);
    window.setTimeout(installOverlay, 1600);
    window.setTimeout(installOverlay, 3000);
    window.setTimeout(installOverlay, 5000);
  }

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(installOverlay, 100);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();