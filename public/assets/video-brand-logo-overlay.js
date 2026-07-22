(() => {
  const OVERLAY_ID = "homepage-video-brand-logo";
  const STYLE_ID = "homepage-video-brand-logo-styles";
  let resizeTimer = 0;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function findVideo() {
    const briefingLabel = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => normalizedText(element).includes("video briefing"));
    const section = briefingLabel?.closest("section");
    return section?.querySelector("video") || document.querySelector("video");
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID}{
        position:absolute;
        z-index:8;
        display:block;
        pointer-events:none;
        user-select:none;
        object-fit:contain;
        filter:drop-shadow(0 3px 8px rgba(0,0,0,.72));
        opacity:.98;
      }
      @media(max-width:640px){
        #${OVERLAY_ID}{filter:drop-shadow(0 2px 5px rgba(0,0,0,.72))}
      }
    `;
    document.head.appendChild(style);
  }

  function positionOverlay(video, overlay, host) {
    const videoRect = video.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();
    if (!videoRect.width || !videoRect.height) return;

    overlay.style.left = `${videoRect.left - hostRect.left + videoRect.width * 0.255}px`;
    overlay.style.top = `${videoRect.top - hostRect.top + videoRect.height * 0.06}px`;
    overlay.style.width = `${Math.min(videoRect.width * 0.18, 155)}px`;
    overlay.style.height = "auto";
  }

  function installOverlay() {
    const video = findVideo();
    if (!(video instanceof HTMLVideoElement)) return false;

    const host = video.parentElement;
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

    positionOverlay(video, overlay, host);
    video.addEventListener("loadedmetadata", () => positionOverlay(video, overlay, host), { once: true });
    return true;
  }

  function initialize() {
    installOverlay();
    window.setTimeout(installOverlay, 300);
    window.setTimeout(installOverlay, 1000);
    window.setTimeout(installOverlay, 2200);
    window.setTimeout(installOverlay, 5000);
  }

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(installOverlay, 120);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();