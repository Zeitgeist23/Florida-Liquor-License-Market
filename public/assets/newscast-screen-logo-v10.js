(() => {
  const OVERLAY_ID = "homepage-market-report-brand-logo";
  const STYLE_ID = "homepage-market-report-brand-logo-styles-v14";
  const LOGO_SRC = "/assets/brand-sharp.svg?v=4";
  const VIDEO_ID = "homepage-market-report-real-video";
  const PLAYER_ID = "market-report-narration-player-v1";
  let resizeTimer = 0;

  function findVideo() {
    const exact = document.getElementById(VIDEO_ID);
    if (exact instanceof HTMLVideoElement) return exact;

    const player = document.getElementById(PLAYER_ID);
    const video = player?.querySelector("video");
    return video instanceof HTMLVideoElement ? video : null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${PLAYER_ID}{position:relative!important}
      #${OVERLAY_ID}{
        position:absolute!important;
        z-index:80!important;
        left:2.45%!important;
        top:13.5%!important;
        display:block!important;
        width:min(25%,174px)!important;
        max-width:none!important;
        height:auto!important;
        margin:0!important;
        padding:5px 7px!important;
        box-sizing:border-box!important;
        background:#020405!important;
        border:1px solid rgba(246,167,0,.95)!important;
        border-radius:1px!important;
        object-fit:contain!important;
        pointer-events:none!important;
        user-select:none!important;
        opacity:1!important;
        visibility:visible!important;
        filter:drop-shadow(0 3px 8px rgba(0,0,0,.78))!important;
      }
      @media(max-width:640px){
        #${OVERLAY_ID}{
          left:2.45%!important;
          top:14%!important;
          width:min(29%,128px)!important;
          padding:3px 4px!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function removeLegacyOverlays() {
    [
      "homepage-newscast-screen-logo",
      "homepage-video-brand-logo",
    ].forEach((id) => document.getElementById(id)?.remove());
  }

  function installLogo() {
    removeLegacyOverlays();

    const video = findVideo();
    if (!(video instanceof HTMLVideoElement)) return false;

    const player = video.closest(`#${PLAYER_ID}`) || video.parentElement;
    if (!(player instanceof HTMLElement)) return false;

    installStyles();
    if (window.getComputedStyle(player).position === "static") {
      player.style.position = "relative";
    }

    let overlay = document.getElementById(OVERLAY_ID);
    if (!(overlay instanceof HTMLImageElement)) {
      overlay?.remove();
      overlay = document.createElement("img");
      overlay.id = OVERLAY_ID;
      overlay.src = LOGO_SRC;
      overlay.alt = "";
      overlay.setAttribute("aria-hidden", "true");
      player.appendChild(overlay);
    } else if (overlay.parentElement !== player) {
      player.appendChild(overlay);
    }

    return true;
  }

  function initialize() {
    installLogo();
    [100, 250, 500, 900, 1500, 2600, 4500, 7000].forEach((delay) =>
      window.setTimeout(installLogo, delay),
    );

    const observer = new MutationObserver(() => installLogo());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15000);
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
