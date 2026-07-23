(() => {
  const STYLE_ID = "homepage-synced-caption-styles-v3";
  const OLD_STYLE_IDS = [
    "homepage-synced-caption-styles-v1",
    "homepage-synced-caption-styles-v2",
  ];
  const CAPTION_HOST_CLASS = "market-report-synced-caption-host";
  const LEGACY_HIDDEN_CLASS = "market-report-legacy-caption-hidden";
  const PLAYER_ID = "market-report-narration-player-v1";
  const VIDEO_ID = "homepage-market-report-real-video";

  const CAPTIONS = [
    { start: 0.08, end: 3.16, text: "Welcome to the Florida Liquor License Market Report." },
    { start: 3.24, end: 7.42, text: "In the next three minutes, Sarah and I will show you how the marketplace helps" },
    { start: 7.42, end: 11.78, text: "buyers, sellers, financing sources, and investors connect." },
    { start: 11.94, end: 15.77, text: "Florida liquor license transactions can involve valuable assets," },
    { start: 15.82, end: 19.9, text: "county-specific markets, and important regulatory requirements." },
    { start: 20.11, end: 24.9, text: "Buyers can browse available licenses and compare the county, license type," },
    { start: 25.37, end: 28.39, text: "asking price, and transferability information." },
    { start: 28.55, end: 35.01, text: "When a listing is of interest, a buyer can submit an inquiry or offer to begin a confidential conversation." },
    { start: 35.37, end: 41.09, text: "Sellers can present a license to a statewide audience while keeping sensitive discussions private." },
    { start: 41.26, end: 48.13, text: "Pricing, availability, transfer eligibility, and regulatory requirements should always be confirmed." },
    { start: 48.31, end: 54.84, text: "Qualified buyers may explore acquisition financing, refinancing, or private capital introductions." },
    { start: 55.02, end: 60.96, text: "Investors and private lenders should complete their own due diligence and consult appropriate professionals." },
    { start: 61.14, end: 65.6, text: "Featured listings, transaction examples, county insights," },
    { start: 65.61, end: 69.46, text: "and educational resources help visitors become informed." },
    { start: 69.65, end: 72.96, text: "Start by searching the listings, review the details," },
    { start: 73.1, end: 76.92, text: "and use the appropriate form to explain what you are looking for." },
    { start: 77.1, end: 81.77, text: "Every inquiry is the beginning of a conversation, not a completed transaction." },
    { start: 81.92, end: 86.36, text: "Florida Liquor License Market is designed to help you take the next informed step." },
    { start: 86.6, end: 92.15, text: "Visit FloridaLiquorLicenseMarket.com to browse listings and market information." },
    { start: 92.34, end: 96.16, text: "Contact the marketplace when you're ready for a private conversation." },
    { start: 96.25, end: 97.45, text: "Thank you for watching." },
  ];

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

  function removeOldRules(section) {
    OLD_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
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
        visibility:visible!important;opacity:1!important;color:#fff!important;
        text-align:center!important;white-space:normal!important;
        font:700 clamp(11px,1.05vw,16px)/1.2 Arial,Helvetica,sans-serif!important;
        box-sizing:border-box!important;overflow:visible!important
      }
      @media(max-width:640px){
        .${CAPTION_HOST_CLASS}{font-size:10px!important;line-height:1.18!important}
      }
    `;
    document.head.appendChild(style);
  }

  function findOriginalCaption(section) {
    const candidates = Array.from(section.querySelectorAll("div,p,span,strong"))
      .filter((element) => {
        if (!(element instanceof HTMLElement) || element.querySelector("audio,video")) return false;
        const text = normalizedText(element);
        return text.length > 5 && (
          /Welcome to the Florida Liquor License Market Report/i.test(text) ||
          /^MICHAEL\b/i.test(text) ||
          element.classList.contains(CAPTION_HOST_CLASS)
        );
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
    removeOldRules(section);
    installStyles();

    let host = section.querySelector(`.${CAPTION_HOST_CLASS}`);
    if (!(host instanceof HTMLElement)) host = findOriginalCaption(section) || fallbackCaptionHost(section);
    if (!(host instanceof HTMLElement)) return null;

    host.classList.remove(LEGACY_HIDDEN_CLASS);
    host.classList.add(CAPTION_HOST_CLASS);
    host.removeAttribute("aria-hidden");
    host.setAttribute("role", "status");
    host.setAttribute("aria-live", "off");
    host.setAttribute("aria-label", "Synchronized market report subtitles");
    host.style.setProperty("display", "flex", "important");
    host.style.setProperty("visibility", "visible", "important");
    host.style.setProperty("opacity", "1", "important");
    host.style.setProperty("color", "#fff", "important");
    host.style.setProperty("white-space", "normal", "important");

    return host;
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
    if (audio && !audio.paused && Number.isFinite(audio.currentTime)) return audio.currentTime;
    if (video && Number.isFinite(video.currentTime)) return video.currentTime;
    if (audio && Number.isFinite(audio.currentTime)) return audio.currentTime;
    return 0;
  }

  function cueIndexAt(time) {
    let low = 0;
    let high = CAPTIONS.length - 1;
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const cue = CAPTIONS[middle];
      if (time < cue.start) high = middle - 1;
      else if (time > cue.end) low = middle + 1;
      else return middle;
    }
    return -1;
  }

  function renderCaption(host, time) {
    const nextIndex = cueIndexAt(time);
    const text = nextIndex >= 0 ? CAPTIONS[nextIndex].text : CAPTIONS[0].text;
    if (nextIndex === activeCueIndex && normalizedText(host) === text) return;
    activeCueIndex = nextIndex;
    host.textContent = text;
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
      if (!media || media.dataset.syncedCaptionsBoundV3 === "true") return;
      media.dataset.syncedCaptionsBoundV3 = "true";
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
        host.textContent = CAPTIONS[CAPTIONS.length - 1].text;
      });
    });
  }

  function install() {
    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return false;

    const host = ensureCaptionHost(section);
    if (!(host instanceof HTMLElement)) return false;

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
