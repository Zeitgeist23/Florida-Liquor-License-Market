(() => {
  const VIDEO_ID = "homepage-market-report-real-video";
  const PLAYER_ID = "market-report-narration-player-v1";
  const AUDIO_CLASS = "homepage-market-report-narration";
  const PATCH_FLAG = "controlsOverlapFixed";

  function applyFix() {
    const video = document.getElementById(VIDEO_ID);
    if (!(video instanceof HTMLVideoElement)) return false;

    const player = video.closest(`#${PLAYER_ID}`);
    const audio = player?.querySelector("audio") || document.querySelector(`audio.${AUDIO_CLASS}`);
    const isReady = player instanceof HTMLElement && player.classList.contains("is-ready");

    if (video.dataset[PATCH_FLAG] !== "true") {
      video.dataset[PATCH_FLAG] = "true";
      video.controls = isReady;

      if (audio instanceof HTMLAudioElement) {
        audio.addEventListener("play", () => {
          video.controls = true;
        });
      }

      if (player instanceof HTMLElement) {
        const classObserver = new MutationObserver(() => {
          video.controls = player.classList.contains("is-ready");
        });
        classObserver.observe(player, { attributes: true, attributeFilter: ["class"] });
      }
    } else if (!isReady && audio instanceof HTMLAudioElement && audio.paused) {
      video.controls = false;
    }

    return true;
  }

  function initialize() {
    applyFix();
    [100, 300, 700, 1400, 2600, 4500].forEach((delay) =>
      window.setTimeout(applyFix, delay),
    );

    const observer = new MutationObserver(() => applyFix());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();