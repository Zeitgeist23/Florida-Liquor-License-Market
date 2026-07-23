(() => {
  const OVERLAY_ID = "homepage-market-report-brand-logo";
  const STYLE_ID = "homepage-market-report-brand-logo-styles-v12";
  const LOGO_SRC = "/assets/brand-sharp.svg";
  const VIDEO_ID = "homepage-market-report-real-video";
  let resizeTimer = 0;
  let resizeObserver = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function findSection() {
    const exact = document.getElementById("market-report");
    if (exact instanceof HTMLElement) return exact;

    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => /video briefing/i.test(normalizedText(element)));
    return label?.closest("section") || null;
  }

  function findVideo(section) {
    const exact = document.getElementById(VIDEO_ID);
    if (exact instanceof HTMLVideoElement && section.contains(exact)) return exact;

    const video = section.querySelector("video");
    return video instanceof HTMLVideoElement ? video : null;
  }

  function findMarketReportAnchor(section) {
    const candidates = Array.from(section.querySelectorAll("div,span,strong,p,h1,h2,h3,h4,h5,h6"))
      .filter((element) => normalizedText(element) === "market report")
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 0 && rect.height > 0)
      .sort((a, b) => (a.rect.width * a.rect.height) - (b.rect.width * b.rect.height));

    const match = candidates[0];
    if (!match) return null;

    let current = match.element;
    let depth = 0;
    while (current instanceof HTMLElement && section.contains(current) && depth < 6) {
      const rect = current.getBoundingClientRect();
      const style = window.getComputedStyle(current);
      const borderWidth = Number.parseFloat(style.borderLeftWidth || "0");
      if (borderWidth >= 1 && rect.width > 0 && rect.height > 0) {
        return { left: rect.left, bottom: rect.bottom };
      }
      current = current.parentElement;
      depth += 1;
    }

    return { left: match.rect.left - 12, bottom: match.rect.bottom };
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID}{
        position:absolute;
        z-index:30;
        display:block;
        width:min(24%,170px);
        height:auto;
        padding:5px 7px;
        box-sizing:border-box;
        background:#020405;
        border:1px solid rgba(246,167,0,.9);
        pointer-events:none;
        user-select:none;
        object-fit:contain;
        filter:drop-shadow(0 3px 8px rgba(0,0,0,.75));
      }
      @media(max-width:640px){
        #${OVERLAY_ID}{width:min(29%,126px);padding:3px 4px}
      }
    `;
    document.head.appendChild(style);
  }

  function positionOverlay(section, video, overlay) {
    const host = overlay.parentElement;
    if (!(host instanceof HTMLElement)) return;

    const videoRect = video.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();
    if (!videoRect.width || !videoRect.height) return;

    const anchor = findMarketReportAnchor(section);
    const absoluteLeft = anchor?.left ?? (videoRect.left + videoRect.width * 0.026);
    const absoluteTop = anchor?.bottom != null
      ? anchor.bottom + Math.max(8, videoRect.height * 0.018)
      : videoRect.top + videoRect.height * 0.12;

    overlay.style.left = `${absoluteLeft - hostRect.left}px`;
    overlay.style.top = `${absoluteTop - hostRect.top}px`;
  }

  function installLogo() {
    const section = findSection();
    if (!(section instanceof HTMLElement)) return false;

    const video = findVideo(section);
    if (!(video instanceof HTMLVideoElement)) return false;

    const host = video.parentElement;
    if (!(host instanceof HTMLElement)) return false;

    installStyles();
    if (window.getComputedStyle(host).position === "static") host.style.position = "relative";

    let overlay = document.getElementById(OVERLAY_ID);
    if (!(overlay instanceof HTMLImageElement)) {
      overlay?.remove();
      overlay = document.createElement("img");
      overlay.id = OVERLAY_ID;
      overlay.src = LOGO_SRC;
      overlay.alt = "";
      overlay.setAttribute("aria-hidden", "true");
      host.appendChild(overlay);
    } else if (overlay.parentElement !== host) {
      host.appendChild(overlay);
    }

    positionOverlay(section, video, overlay);

    resizeObserver?.disconnect();
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => positionOverlay(section, video, overlay));
      resizeObserver.observe(video);
    }

    if (!video.readyState) {
      video.addEventListener("loadedmetadata", () => positionOverlay(section, video, overlay), { once: true });
    }

    return true;
  }

  function initialize() {
    installLogo();
    [150, 400, 900, 1600, 3000, 5000].forEach((delay) => window.setTimeout(installLogo, delay));
  }

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(installLogo, 100);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();