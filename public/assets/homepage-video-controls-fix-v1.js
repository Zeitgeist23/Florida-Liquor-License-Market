(() => {
  const VIDEO_ID = "homepage-market-report-real-video";
  const PLAYER_ID = "market-report-narration-player-v1";
  const BUTTON_ID = "market-report-narration-button-v1";
  const AUDIO_CLASS = "homepage-market-report-narration";
  const PATCH_FLAG = "singlePlayerControlsFixed";
  const PART_URLS = Array.from({ length: 7 }, (_, index) =>
    `/assets/market-report-audio-part-${String(index + 1).padStart(2, "0")}-v1.txt`,
  );

  let audioUrl = "";
  let loadingPromise = null;

  function base64ToBlob(base64) {
    const clean = base64.replace(/\s+/g, "");
    const binary = window.atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return new Blob([bytes], { type: "audio/mpeg" });
  }

  async function loadNarration() {
    if (audioUrl) return audioUrl;
    if (loadingPromise) return loadingPromise;

    loadingPromise = Promise.all(
      PART_URLS.map(async (url) => {
        const response = await fetch(url, { cache: "force-cache" });
        if (!response.ok) throw new Error(`Narration part failed: ${response.status}`);
        return response.text();
      }),
    ).then((parts) => {
      audioUrl = URL.createObjectURL(base64ToBlob(parts.join("")));
      return audioUrl;
    });

    return loadingPromise;
  }

  function applyFix() {
    const video = document.getElementById(VIDEO_ID);
    if (!(video instanceof HTMLVideoElement)) return false;

    const player = video.closest(`#${PLAYER_ID}`);
    const button = player?.querySelector(`#${BUTTON_ID}`);
    const audio = player?.querySelector("audio") || document.querySelector(`audio.${AUDIO_CLASS}`);

    if (button instanceof HTMLButtonElement) {
      button.remove();
    }

    video.controls = true;
    video.setAttribute("controls", "");

    if (video.dataset[PATCH_FLAG] === "true") return true;
    video.dataset[PATCH_FLAG] = "true";

    if (audio instanceof HTMLAudioElement) {
      audio.classList.add(AUDIO_CLASS);

      video.addEventListener("play", async () => {
        if (audio.src || audio.currentSrc) return;

        video.pause();
        try {
          audio.src = await loadNarration();
          if (player instanceof HTMLElement) player.classList.add("is-ready");
          await audio.play();
        } catch (error) {
          console.error("Homepage market report narration failed", error);
        }
      });
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