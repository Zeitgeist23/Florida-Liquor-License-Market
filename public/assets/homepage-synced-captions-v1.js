(() => {
  const STYLE_ID = "homepage-synced-caption-styles-v1";
  const CAPTION_ID = "market-report-synced-caption";
  const PLAYER_ID = "market-report-narration-player-v1";
  const VIDEO_ID = "homepage-market-report-real-video";
  const CAPTIONS_URL = "/assets/market-report-captions-v1.json?v=1";
  const LEGACY_CLASS = "market-report-legacy-caption-hidden";

  let captionsPromise = null;
  let captions = [];
  let animationFrame = 0;
  let activeCueIndex = -1;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findBriefingSection() {
    const exact = document.querySelector("#market-report");
    if (exact instanceof HTMLElement) return exact;

    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => /video briefing/i.test(normalizedText(element)));
    return label?.closest("section") || null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .${LEGACY_CLASS}{display:none!important}
      #${CAPTION_ID}{
        position:absolute;z-index:8;left:3.5%;right:3.5%;bottom:18.5%;
        min-height:13%;display:flex;align-items:center;justify-content:center;
        padding:5px 14px;border-left:4px solid #f6a700;
        background:rgba(0,7,13,.9);color:#fff;text-align:center;
        font:700 clamp(11px,1.05vw,16px)/1.22 Arial,Helvetica,sans-serif;
        box-sizing:border-box;pointer-events:none;opacity:0;
        transition:opacity .12s ease;overflow:hidden;text-shadow:0 1px 2px #000
      }
      #${CAPTION_ID}.is-visible{opacity:1}
      @media(max-width:640px){
        #${CAPTION_ID}{left:2.5%;right:2.5%;bottom:20%;min-height:14%;padding:4px 8px;border-left-width:3px;font-size:10px}
      }
    `;
    document.head.appendChild(style);
  }

  function hideLegacyCaptions(section) {
    const candidates = Array.from(section.querySelectorAll("div,p,span,strong,small"));
    candidates.forEach((element) => {
      if (!(element instanceof HTMLElement) || element.id === CAPTION_ID) return;
      if (element.closest(`#${CAPTION_ID}`) || element.querySelector("audio,video")) return;

      const text = normalizedText(element);
      if (text.length < 35 || text.length > 420) return;

      const isOldCaption =
        /Welcome to the Florida Liquor License Market Report/i.test(text) ||
        (/^MICHAEL\b/i.test(text) && /Sarah/i.test(text) && /marketplace/i.test(text)) ||
        (/^SARAH\b/i.test(text) && /liquor license/i.test(text));

      if (isOldCaption) {
        element.classList.add(LEGACY_CLASS);
        element.setAttribute("aria-hidden", "true");
      }
    });
  }

  function findPlayer(section) {
    const exact = document.getElementById(PLAYER_ID);
    if (exact instanceof HTMLElement && section.contains(exact)) return exact;

    const video = section.querySelector(`#${VIDEO_ID},video`);
    if (video instanceof HTMLVideoElement && video.parentElement instanceof HTMLElement) {
      return video.parentElement;
    }

    return null;
  }

  function ensureCaptionHost(section) {
    installStyles();
    hideLegacyCaptions(section);

    const player = findPlayer(section);
    if (!(player instanceof HTMLElement)) return null;
    if (window.getComputedStyle(player).position === "static") player.style.position = "relative";

    let host = document.getElementById(CAPTION_ID);
    if (!(host instanceof HTMLElement)) {
      host = document.createElement("div");
      host.id = CAPTION_ID;
      host.setAttribute("role", "status");
      host.setAttribute("aria-live", "off");
      host.setAttribute("aria-label", "Synchronized market report subtitles");
      player.appendChild(host);
    } else if (host.parentElement !== player) {
      player.appendChild(host);
    }

    return host;
  }

  async function loadCaptions() {
    if (captions.length) return captions;
    if (captionsPromise) return captionsPromise;

    captionsPromise = fetch(CAPTIONS_URL, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Caption file returned ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        captions = Array.isArray(payload?.cues)
          ? payload.cues.filter((cue) =>
              Number.isFinite(cue?.start) && Number.isFinite(cue?.end) && typeof cue?.text === "string"
            )
          : [];
        return captions;
      })
      .catch((error) => {
        console.error("Unable to load synchronized market report captions", error);
        captionsPromise = null;
        return [];
      });

    return captionsPromise;
  }

  function mediaFor(section) {
    const audio = section.querySelector("audio");
    const video = section.querySelector(`#${VIDEO_ID},video`);
    return {
      audio: audio instanceof HTMLAudioElement ? audio : null,
      video: video instanceof HTMLVideoElement ? video : null,
    };
  }

  function currentMediaTime(audio, video) {
    if (audio && (audio.currentSrc || audio.getAttribute("src")) && Number.isFinite(audio.currentTime)) {
      return audio.currentTime;
    }
    return video && Number.isFinite(video.currentTime) ? video.currentTime : 0;
  }

  function cueIndexAt(time) {
    let low = 0;
    let high = captions.length - 1;
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const cue = captions[middle];
      if (time < cue.start) high = middle - 1;
      else if (time > cue.end) low = middle + 1;
      else return middle;
    }
    return -1;
  }

  function renderCaption(host, time) {
    const nextIndex = cueIndexAt(time);
    if (nextIndex === activeCueIndex) return;
    activeCueIndex = nextIndex;

    if (nextIndex < 0) {
      host.textContent = "";
      host.classList.remove("is-visible");
      return;
    }

    host.textContent = captions[nextIndex].text;
    host.classList.add("is-visible");
  }

  function stopLoop() {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }

  function startLoop(section, host) {
    stopLoop();
    const tick = () => {
      const { audio, video } = mediaFor(section);
      renderCaption(host, currentMediaTime(audio, video));
      const isPlaying = Boolean((audio && !audio.paused) || (video && !video.paused));
      if (isPlaying) animationFrame = window.requestAnimationFrame(tick);
      else animationFrame = 0;
    };
    animationFrame = window.requestAnimationFrame(tick);
  }

  function bindMedia(section, host) {
    const { audio, video } = mediaFor(section);
    [audio, video].forEach((media) => {
      if (!media || media.dataset.syncedCaptionsBound === "true") return;
      media.dataset.syncedCaptionsBound = "true";
      media.addEventListener("play", () => startLoop(section, host));
      media.addEventListener("timeupdate", () => renderCaption(host, currentMediaTime(audio, video)));
      media.addEventListener("seeking", () => renderCaption(host, currentMediaTime(audio, video)));
      media.addEventListener("seeked", () => renderCaption(host, currentMediaTime(audio, video)));
      media.addEventListener("ended", () => {
        stopLoop();
        renderCaption(host, Number.POSITIVE_INFINITY);
      });
    });
  }

  async function install() {
    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return false;

    const host = ensureCaptionHost(section);
    if (!(host instanceof HTMLElement)) return false;

    await loadCaptions();
    hideLegacyCaptions(section);
    bindMedia(section, host);

    const { audio, video } = mediaFor(section);
    renderCaption(host, currentMediaTime(audio, video));
    return true;
  }

  function initialize() {
    install();
    [150, 400, 800, 1400, 2600, 4500].forEach((delay) => window.setTimeout(install, delay));
    const observer = new MutationObserver(() => install());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
