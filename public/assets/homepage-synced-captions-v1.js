(() => {
  const STYLE_ID = "homepage-subtitles-removed-v1";
  const OLD_STYLE_IDS = [
    "homepage-synced-caption-styles-v1",
    "homepage-synced-caption-styles-v2",
    "homepage-synced-caption-styles-v3",
  ];
  const CAPTION_CLASSES = [
    "market-report-synced-caption-host",
    "market-report-legacy-caption-hidden",
  ];

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

  function installRemovalStyle() {
    OLD_STYLE_IDS.forEach((id) => document.getElementById(id)?.remove());
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .market-report-synced-caption-host,
      .market-report-legacy-caption-hidden,
      [aria-label="Synchronized market report subtitles"]{
        display:none!important;
        visibility:hidden!important;
        opacity:0!important;
        pointer-events:none!important;
      }
    `;
    document.head.appendChild(style);
  }

  function looksLikeSubtitleText(text) {
    return (
      /^MICHAEL\b/i.test(text) ||
      /^SARAH\b/i.test(text) ||
      /Welcome to the Florida Liquor License Market Report/i.test(text) ||
      /buyers, sellers, financing sources, and investors connect/i.test(text) ||
      /Florida liquor license transactions can involve valuable assets/i.test(text) ||
      /Every inquiry is the beginning of a conversation/i.test(text) ||
      /Thank you for watching/i.test(text)
    );
  }

  function captionContainerFor(element, section) {
    let current = element;
    let depth = 0;

    while (current.parentElement && section.contains(current.parentElement) && depth < 4) {
      const parent = current.parentElement;
      if (parent.querySelector("audio,video")) break;

      const rect = parent.getBoundingClientRect();
      const style = window.getComputedStyle(parent);
      const borderWidth = Number.parseFloat(style.borderLeftWidth || "0");
      const background = style.backgroundColor;
      const treatedLikeCaption =
        borderWidth >= 1 ||
        (background && background !== "rgba(0, 0, 0, 0)" && rect.height > 18 && rect.height < 140);

      if (treatedLikeCaption) return parent;
      current = parent;
      depth += 1;
    }

    return current;
  }

  function removeSubtitles() {
    installRemovalStyle();

    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return false;

    CAPTION_CLASSES.forEach((className) => {
      section.querySelectorAll(`.${className}`).forEach((element) => element.remove());
    });

    section
      .querySelectorAll('[aria-label="Synchronized market report subtitles"]')
      .forEach((element) => element.remove());

    const candidates = Array.from(section.querySelectorAll("div,p,span,strong"))
      .filter((element) => {
        if (!(element instanceof HTMLElement) || element.querySelector("audio,video")) return false;
        const text = normalizedText(element);
        if (!text || text.length > 500) return false;
        return looksLikeSubtitleText(text);
      });

    candidates.forEach((element) => {
      const container = captionContainerFor(element, section);
      if (container instanceof HTMLElement && !container.querySelector("audio,video")) {
        container.remove();
      } else {
        element.remove();
      }
    });

    return true;
  }

  function initialize() {
    removeSubtitles();
    [100, 250, 500, 900, 1500, 2600, 4500].forEach((delay) =>
      window.setTimeout(removeSubtitles, delay),
    );

    const observer = new MutationObserver(() => removeSubtitles());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 18000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
