(() => {
  const STYLE_ID = "market-report-narration-styles-v2";
  const PLAYER_ID = "market-report-narration-player-v1";

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function findBriefingSection() {
    const exact = document.querySelector("#market-report");
    if (exact instanceof HTMLElement) return exact;

    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => normalizedText(element).includes("video briefing"));
    return label?.closest("section") || null;
  }

  function findStudioImage(section) {
    const exact = section.querySelector(
      'img[src*="market-report-studio"],img[src*="market-report"],img[alt*="market report" i],img[alt*="newscast" i]',
    );
    if (exact instanceof HTMLImageElement) return exact;

    const images = Array.from(section.querySelectorAll("img"))
      .filter((image) => !/brand-sharp|logo/i.test(image.getAttribute("src") || ""));
    return images
      .map((image) => ({
        image,
        area: image.getBoundingClientRect().width * image.getBoundingClientRect().height,
      }))
      .sort((a, b) => b.area - a.area)[0]?.image || null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${PLAYER_ID}{position:relative;display:block;width:100%;overflow:hidden;background:#020913;border:1px solid rgba(246,167,0,.38);box-shadow:0 16px 45px rgba(0,0,0,.36)}
      #${PLAYER_ID} img{display:block;width:100%;height:auto}
      #${PLAYER_ID} .market-report-narration-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 62%,rgba(1,8,15,.28) 100%);pointer-events:none}
      #${PLAYER_ID} audio{position:absolute!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important}
      #market-report-narration-button-v1{display:none!important}
    `;
    document.head.appendChild(style);
  }

  function removeLegacyControls(section) {
    section.querySelectorAll("#market-report-narration-button-v1, button").forEach((element) => {
      if (
        element.id === "market-report-narration-button-v1" ||
        /play the 98-second market briefing/i.test(element.textContent || "")
      ) {
        element.remove();
      }
    });
  }

  function installPlayer() {
    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return false;

    removeLegacyControls(section);

    const existing = document.getElementById(PLAYER_ID);
    if (existing instanceof HTMLElement) {
      installStyles();
      removeLegacyControls(existing);
      if (!existing.querySelector("audio")) {
        const audio = document.createElement("audio");
        audio.preload = "none";
        audio.setAttribute("aria-label", "Florida Liquor License Market Report narration");
        existing.appendChild(audio);
      }
      return true;
    }

    const image = findStudioImage(section);
    if (!(image instanceof HTMLImageElement)) return false;

    installStyles();

    const player = document.createElement("div");
    player.id = PLAYER_ID;
    player.setAttribute("aria-label", "Florida Liquor License Market narrated briefing");

    const clonedImage = image.cloneNode(true);
    const shade = document.createElement("div");
    shade.className = "market-report-narration-shade";

    const audio = document.createElement("audio");
    audio.preload = "none";
    audio.setAttribute("aria-label", "Florida Liquor License Market Report narration");

    player.append(clonedImage, shade, audio);
    image.replaceWith(player);

    section.querySelectorAll("small").forEach((small) => {
      if (/3 minutes/i.test(small.textContent || "")) small.textContent = "98 Seconds";
    });
    section.querySelectorAll("p").forEach((paragraph) => {
      paragraph.innerHTML = paragraph.innerHTML.replace(/three-minute/gi, "98-second");
    });

    return true;
  }

  function initialize() {
    installPlayer();
    [100, 250, 700, 1400, 2600, 4500].forEach((delay) =>
      window.setTimeout(installPlayer, delay),
    );

    const observer = new MutationObserver(() => installPlayer());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();