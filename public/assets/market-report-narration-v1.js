(() => {
  const STYLE_ID = "market-report-narration-styles-v1";
  const PLAYER_ID = "market-report-narration-player-v1";
  const BUTTON_ID = "market-report-narration-button-v1";
  const PART_URLS = Array.from({ length: 7 }, (_, index) =>
    `/assets/market-report-audio-part-${String(index + 1).padStart(2, "0")}-v1.txt`,
  );

  let audioUrl = "";
  let loadingPromise = null;

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
      .map((image) => ({ image, area: image.getBoundingClientRect().width * image.getBoundingClientRect().height }))
      .sort((a, b) => b.area - a.area)[0]?.image || null;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${PLAYER_ID}{position:relative;display:block;width:100%;overflow:hidden;background:#020913;border:1px solid rgba(246,167,0,.38);box-shadow:0 16px 45px rgba(0,0,0,.36)}
      #${PLAYER_ID} img{display:block;width:100%;height:auto}
      #${PLAYER_ID} .market-report-narration-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 48%,rgba(1,8,15,.9) 100%);pointer-events:none}
      #${BUTTON_ID}{position:absolute;left:50%;bottom:7.5%;transform:translateX(-50%);z-index:3;display:flex;align-items:center;gap:12px;min-width:245px;justify-content:center;padding:13px 22px;border:1px solid #f6a700;border-radius:999px;background:rgba(3,17,30,.92);color:#fff;font:700 15px/1.2 Arial,sans-serif;letter-spacing:.02em;cursor:pointer;box-shadow:0 8px 25px rgba(0,0,0,.45)}
      #${BUTTON_ID}:hover{background:#0a2238}
      #${BUTTON_ID}:focus-visible{outline:3px solid #ffd15c;outline-offset:3px}
      #${BUTTON_ID} .market-report-play-symbol{display:grid;place-items:center;width:31px;height:31px;border-radius:50%;background:#f6a700;color:#06111c;font-size:14px;padding-left:2px}
      #${PLAYER_ID} audio{position:absolute;z-index:4;left:4%;right:4%;bottom:3.5%;width:92%;height:42px;display:none}
      #${PLAYER_ID}.is-ready audio{display:block}
      #${PLAYER_ID}.is-ready #${BUTTON_ID}{display:none}
      #${PLAYER_ID} .market-report-loading{font-weight:600;color:#ffd15c}
      @media(max-width:640px){#${BUTTON_ID}{min-width:205px;padding:10px 15px;font-size:13px;bottom:6%}#${BUTTON_ID} .market-report-play-symbol{width:27px;height:27px}#${PLAYER_ID} audio{left:3%;right:3%;width:94%;bottom:2.5%}}
    `;
    document.head.appendChild(style);
  }

  function base64ToBlob(base64) {
    const clean = base64.replace(/\s+/g, "");
    const binary = window.atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
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
      const blob = base64ToBlob(parts.join(""));
      audioUrl = URL.createObjectURL(blob);
      return audioUrl;
    });

    return loadingPromise;
  }

  function installPlayer() {
    if (document.getElementById(PLAYER_ID)) return true;
    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return false;

    const image = findStudioImage(section);
    if (!(image instanceof HTMLImageElement)) return false;

    installStyles();

    const player = document.createElement("div");
    player.id = PLAYER_ID;
    player.setAttribute("aria-label", "Florida Liquor License Market narrated briefing");

    const clonedImage = image.cloneNode(true);
    const shade = document.createElement("div");
    shade.className = "market-report-narration-shade";

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.type = "button";
    button.innerHTML = '<span class="market-report-play-symbol" aria-hidden="true">▶</span><span>Play the 98-Second Market Briefing</span>';

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "none";
    audio.setAttribute("aria-label", "Florida Liquor License Market Report narration");

    button.addEventListener("click", async () => {
      const label = button.querySelector("span:last-child");
      button.disabled = true;
      if (label) {
        label.className = "market-report-loading";
        label.textContent = "Loading the market briefing…";
      }

      try {
        audio.src = await loadNarration();
        player.classList.add("is-ready");
        await audio.play();
      } catch (error) {
        console.error("Market report narration failed", error);
        button.disabled = false;
        if (label) {
          label.className = "";
          label.textContent = "Unable to load — click to try again";
        }
      }
    });

    player.append(clonedImage, shade, button, audio);
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
    [250, 700, 1400, 2600, 4500].forEach((delay) => window.setTimeout(installPlayer, delay));
    const observer = new MutationObserver(() => installPlayer());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
