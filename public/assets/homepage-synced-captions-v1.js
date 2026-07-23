(() => {
  const STYLE_ID = "homepage-synced-caption-styles-v2";
  const LEGACY_STYLE_ID = "homepage-synced-caption-styles-v1";
  const CAPTION_HOST_CLASS = "market-report-synced-caption-host";
  const PLAYER_ID = "market-report-narration-player-v1";
  const VIDEO_ID = "homepage-market-report-real-video";
  const CAPTIONS_URL = "/assets/market-report-captions-v1.json?v=2";
  const LEGACY_HIDDEN_CLASS = "market-report-legacy-caption-hidden";

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

  function removeOldHidingRules(section) {
    document.getElementById(LEGACY_STYLE_ID)?.remove();
    section.querySelectorAll(`.${LEGACY_HIDDEN_CLASS}`).forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      element.classList.remove(LEGACY_HIDDEN_CLASS);
      element.removeAttribute("aria-hidden");
      element.style.removeProperty("display");
    });
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .${CAPTION_HOST_CLASS}{
        display:flex!important;align-items:center!important;justify-content:center!important;
        gap:10px!important;visibility:visible!important;opacity:1!important;
        color:#fff!important;text-align:center!important;
        font:700 clamp(11px,1.05vw,16px)/1.2 Arial,Helvetica,sans-serif!important;
        box-sizing:border-box!important
      }
      .${CAPTION_HOST_CLASS} .market-report-synced-speaker{
        flex:0 0 auto;color:#f6a700!important;font-weight:900!important;
        text-transform:uppercase!important;letter-spacing:.02em!important
      }
      .${CAPTION_HOST_CLASS} .market-report-synced-text{
        color:#fff!important;font:inherit!important;text-align:center!important
      }
      @media(max-width:640px){
        .${CAPTION_HOST_CLASS}{gap:6px!important;font-size:10px!important;line-height:1.18!important}
      }
    `;
    document.head.appendChild(style);
  }

  function findOriginalCaption(section) {
    const candidates = Array.from(section.querySelectorAll("div,p,span,strong"))
      .filter((element) => {
        if (!(element instanceof HTMLElement)) return false;
        if (element.querySelector("audio,video")) return false;
        const text = normalizedText(element);
        return text.length > 40 &&
          (/Welcome to the Florida Liquor License Market Report/i.test(text) ||
           (/^MICHAEL\b/i.test(text) && /marketplace/i.test(text)));
      })
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 180 && rect.height > 10)
      .sort((a, b) => (a.rect.width * a.rect.height) - (b.rect.width * b.rect.height));

    const candidate = candidates[0]?.element;
    if (!(candidate instanceof HTMLElement)) return null;

    let current = candidate;
    let depth = 0;
    while (current.parentElement && section.contains(current.parentElement) && depth < 4) {
      const parent = current.parentElement;
      if (parent.querySelector("audio,video")) break;

      const rect = parent.getBoundingClientRect();
      const style = window.getComputedStyle(parent);
      const borderWidth = Number.parseFloat(style.borderLeftWidth || "0");
      const background = style.backgroundColor;
      const hasCaptionTreatment =
        borderWidth >= 1 ||
        (background && background !== "rgba(0, 0, 0, 0)" && rect.height > 20 && rect.height < 130);

      if (hasCaptionTreatment) {
        current = parent;
        break;
      }

      current = parent;
      depth += 1;
    }

    return current;
  }

  function fallbackCaptionHost(section) {
    const video = section.querySelector(`#${VIDEO_ID},video`);
    const player = document.getElementById(PLAYER_ID);
    const container =
      video instanceof HTMLVideoElement && video.parentElement instanceof HTMLElement
        ? video.parentElement
        : player instanceof HTMLElement
          ? player
          : null;

    if (!(container instanceof HTMLElement)) return null;
    if (window.getComputedStyle(container).position === "static") container.style.position = "relative";

    const host = document.createElement("div");
    host.style.position = "absolute";
    host.style.zIndex = "20";
    host.style.left = "3.5%";
    host.style.right = "3.5%";
    host.style.bottom = "18.5%";
    host.style.minHeight = "13%";
    host.style.padding = "5px 14px";
    host.style.borderLeft = "4px solid #f6a700";
    host.style.background = "rgba(0,7,13,.9)";
    container.appendChild(host);
    return host;
  }

  function ensureCaptionHost(section) {
    removeOldHidingRules(section);
    installStyles();

    let host = section.querySelector(`.${CAPTION_HOST_CLASS}`);
    if (!(host instanceof HTMLElement)) {
      host = findOriginalCaption(section) || fallbackCaptionHost(section);
    }
    if (!(host instanceof HTMLElement)) return null;

    host.classList.remove(LEGACY_HIDDEN_CLASS);
    host.classList.add(CAPTION_HOST_CLASS);
    host.removeAttribute("aria-hidden");
    host.setAttribute("role", "status");
    host.setAttribute("aria-live", "off");
    host.setAttribute("aria-label", "Synchronized market report subtitles");
    host.style.removeProperty("display");

    if (!host.querySelector(".market-report-synced-text")) {
      host.replaceChildren();

      const speaker = document.createElement("strong");
      speaker.className = "market-report-synced-speaker";
      speaker.textContent = "MICHAEL";

      const text = document.createElement("span");
      text.className = "market-report-synced-text";

      host.append(speaker, text);
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
    const textNode = host.querySelector(".market-report-synced-text");
    if (!(textNode instanceof HTMLElement)) return;

    const nextIndex = cueIndexAt(time);
    if (nextIndex === activeCueIndex) return;
    activeCueIndex = nextIndex;

    if (nextIndex < 0) {
      textNode.textContent = captions[0]?.text || "";
      return;
    }

    textNode.textContent = captions[nextIndex].text;
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
      if (!media || media.dataset.syncedCaptionsBoundV2 === "true") return;
      media.dataset.syncedCaptionsBoundV2 = "true";
      media.addEventListener("play", () => startLoop(section, host));
      media.addEventListener("timeupdate", () => {
        const current = mediaFor(section);
        renderCaption(host, currentMediaTime(current.audio, current.video));
      });
      media.addEventListener("seeking", () => {
        const current = mediaFor(section);
        renderCaption(host, currentMediaTime(current.audio, current.video));
      });
      media.addEventListener("seeked", () => {
        const current = mediaFor(section);
        renderCaption(host, currentMediaTime(current.audio, current.video));
      });
      media.addEventListener("ended", () => {
        stopLoop();
        const textNode = host.querySelector(".market-report-synced-text");
        if (textNode instanceof HTMLElement && captions.length) {
          textNode.textContent = captions[captions.length - 1].text;
        }
      });
    });
  }

  async function install() {
    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return false;

    const host = ensureCaptionHost(section);
    if (!(host instanceof HTMLElement)) return false;

    await loadCaptions();
    bindMedia(section, host);

    const { audio, video } = mediaFor(section);
    renderCaption(host, currentMediaTime(audio, video));
    return true;
  }

  function initialize() {
    install();
    [100, 250, 500, 900, 1500, 2600, 4500].forEach((delay) => window.setTimeout(install, delay));
    const observer = new MutationObserver(() => install());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 18000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
