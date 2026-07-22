(() => {
  const STYLE_ID = "market-insights-video-popup-styles-v4";
  const BACKDROP_ID = "market-insights-video-popup-backdrop";
  const MODAL_ID = "market-insights-video-popup";
  const MOVED_AUDIO_CLASS = "market-report-popup-audio";
  const MOVED_CAPTION_CLASS = "market-report-popup-caption";
  const STUDIO_IMAGE = "/assets/market-report-studio.png";
  const LOGO_IMAGE = "/assets/brand-sharp.svg";

  let previousFocus = null;
  const movedNodes = [];

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findBriefingSection() {
    const label = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div"))
      .find((element) => /video briefing/i.test(normalizedText(element)));
    return label?.closest("section") || null;
  }

  function findCaption(section) {
    const candidates = Array.from(section?.querySelectorAll("div,p,span,strong") || [])
      .filter((element) => {
        if (!(element instanceof HTMLElement) || element.querySelector("audio")) return false;
        const text = normalizedText(element);
        return text.length > 40 &&
          (/^MICHAEL\b/i.test(text) || /^SARAH\b/i.test(text) ||
           /Welcome to the Florida Liquor License Market Report/i.test(text));
      })
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width > 180 && rect.height > 10)
      .sort((a, b) => (a.rect.width * a.rect.height) - (b.rect.width * b.rect.height));

    const candidate = candidates[0]?.element;
    if (!(candidate instanceof HTMLElement)) return null;

    let current = candidate;
    let depth = 0;
    while (current.parentElement && section?.contains(current.parentElement) && depth < 4) {
      const parent = current.parentElement;
      if (parent.querySelector("audio")) break;
      const rect = parent.getBoundingClientRect();
      const style = window.getComputedStyle(parent);
      const borderWidth = Number.parseFloat(style.borderLeftWidth || "0");
      const background = style.backgroundColor;
      if (borderWidth >= 1 || (background && background !== "rgba(0, 0, 0, 0)" && rect.height < 100)) {
        current = parent;
        break;
      }
      current = parent;
      depth += 1;
    }
    return current;
  }

  function rememberAndMove(node, destination, className) {
    if (!(node instanceof HTMLElement) || !node.parentNode) return;
    movedNodes.push({
      node,
      parent: node.parentNode,
      nextSibling: node.nextSibling,
      className,
    });
    node.classList.add(className);
    destination.appendChild(node);
  }

  function restoreMovedNodes() {
    while (movedNodes.length) {
      const record = movedNodes.pop();
      if (!record) continue;
      const { node, parent, nextSibling, className } = record;
      node.classList.remove(className);
      if (nextSibling && nextSibling.parentNode === parent) parent.insertBefore(node, nextSibling);
      else parent.appendChild(node);
    }
  }

  function installStyles() {
    document.querySelectorAll('[id^="market-insights-video-popup-styles"]').forEach((style) => style.remove());

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.market-insights-video-popup-open{overflow:hidden!important}
      #${BACKDROP_ID}{
        position:fixed;inset:0;z-index:12000;display:grid;place-items:center;
        background:rgba(0,7,13,.9);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)
      }
      #${MODAL_ID}{
        position:relative;width:80vw;height:80vh;padding:54px 28px 28px;overflow:hidden;
        border:2px solid #f6a700;border-radius:12px;background:#03111e;
        box-shadow:0 36px 120px rgba(0,0,0,.78),0 0 0 1px rgba(246,167,0,.24)
      }
      #${MODAL_ID} .market-report-popup-title{
        position:absolute;top:0;left:0;right:0;height:48px;display:flex;align-items:center;
        padding:0 74px 0 20px;border-bottom:1px solid rgba(246,167,0,.28);
        color:#fff;font:900 14px/1 Arial,Helvetica,sans-serif;letter-spacing:.06em;text-transform:uppercase
      }
      #${MODAL_ID} .market-report-popup-close{
        position:absolute;top:8px;right:10px;z-index:10;width:34px;height:34px;display:grid;place-items:center;
        border:2px solid #f6a700;border-radius:50%;background:#061728;color:#f6a700;cursor:pointer;
        font:700 24px/1 Arial,sans-serif
      }
      #${MODAL_ID} .market-report-popup-close:hover,
      #${MODAL_ID} .market-report-popup-close:focus-visible{background:#f6a700;color:#061728;outline:none}
      #${MODAL_ID} .market-report-popup-stage{
        width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden
      }
      #${MODAL_ID} .market-report-popup-frame{
        position:relative;width:min(100%,calc((80vh - 94px) * 1.7777777778));
        max-height:100%;aspect-ratio:16/9;flex:0 1 auto;overflow:hidden;
        border:1px solid rgba(246,167,0,.72);border-radius:8px;background:#000
      }
      #${MODAL_ID} .market-report-popup-studio{
        position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:center
      }
      #${MODAL_ID} .market-report-popup-brand{
        position:absolute;z-index:4;left:2.8%;top:2.8%;display:flex;flex-direction:column;gap:22px;pointer-events:none
      }
      #${MODAL_ID} .market-report-popup-brand-label,
      #${MODAL_ID} .market-report-popup-brand-logo{
        box-sizing:border-box;border-left:3px solid #f6a700;background:rgba(3,17,30,.84);
        filter:drop-shadow(0 3px 9px rgba(0,0,0,.82))
      }
      #${MODAL_ID} .market-report-popup-brand-label{
        width:max-content;padding:7px 10px;color:#fff;font:900 11px/1 Arial,Helvetica,sans-serif;
        letter-spacing:.08em;text-transform:uppercase;white-space:nowrap
      }
      #${MODAL_ID} .market-report-popup-brand-logo{
        width:clamp(138px,12vw,188px);padding:6px 9px 6px 10px
      }
      #${MODAL_ID} .market-report-popup-brand-logo img{display:block;width:100%;height:auto;object-fit:contain}
      #${MODAL_ID} #homepage-newscast-screen-logo,
      #${MODAL_ID} #homepage-video-brand-logo{display:none!important}
      #${MODAL_ID} .market-report-popup-caption-host{
        position:absolute;left:3.5%;right:3.1%;bottom:18.5%;min-height:12.6%;z-index:4;
        display:flex;align-items:center;padding:3px 12px;border-left:4px solid #f6a700;
        background:rgba(0,7,13,.9);overflow:hidden;box-sizing:border-box
      }
      #${MODAL_ID} .market-report-popup-caption-host:empty{display:none}
      #${MODAL_ID} .${MOVED_CAPTION_CLASS}{
        position:static!important;inset:auto!important;transform:none!important;display:block!important;
        width:100%!important;max-width:none!important;height:auto!important;min-height:0!important;
        margin:0!important;padding:0!important;border:0!important;background:transparent!important;
        color:#fff!important;text-align:center!important;font:700 clamp(10px,1.05vw,16px)/1.18 Arial,Helvetica,sans-serif!important
      }
      #${MODAL_ID} .market-report-popup-audio-host{
        position:absolute;left:2.8%;right:2.4%;bottom:2.6%;height:12.5%;z-index:4;
        display:flex;align-items:center;justify-content:center
      }
      #${MODAL_ID} .${MOVED_AUDIO_CLASS}{
        position:static!important;inset:auto!important;display:block!important;
        width:100%!important;max-width:none!important;height:54px!important;margin:0!important
      }
      @media(max-width:760px){
        #${MODAL_ID}{padding:50px 12px 16px}
        #${MODAL_ID} .market-report-popup-frame{width:min(100%,calc((80vh - 72px) * 1.7777777778))}
        #${MODAL_ID} .market-report-popup-brand{gap:14px}
        #${MODAL_ID} .market-report-popup-brand-label{padding:5px 8px;font-size:9px;border-left-width:2px}
        #${MODAL_ID} .market-report-popup-brand-logo{width:clamp(108px,24vw,148px);padding:4px 6px 4px 8px;border-left-width:2px}
        #${MODAL_ID} .market-report-popup-caption-host{padding:2px 7px;border-left-width:3px}
        #${MODAL_ID} .${MOVED_AUDIO_CLASS}{height:42px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function closeMarketDataMenu() {
    const menu = document.getElementById("market-data-header-menu");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");

    const trigger = Array.from(document.querySelectorAll(".primary-nav a"))
      .find((link) => /^market data$/i.test(normalizedText(link)));
    trigger?.setAttribute("aria-expanded", "false");
  }

  function closePopup() {
    const backdrop = document.getElementById(BACKDROP_ID);
    if (!backdrop) return;

    restoreMovedNodes();
    backdrop.remove();
    document.body.classList.remove("market-insights-video-popup-open");
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  }

  function createBrand() {
    const brand = document.createElement("div");
    brand.className = "market-report-popup-brand";

    const label = document.createElement("div");
    label.className = "market-report-popup-brand-label";
    label.textContent = "MARKET REPORT";

    const logoBox = document.createElement("div");
    logoBox.className = "market-report-popup-brand-logo";

    const logo = document.createElement("img");
    logo.src = LOGO_IMAGE;
    logo.alt = "Florida Liquor License Market";
    logoBox.appendChild(logo);

    brand.append(label, logoBox);
    return brand;
  }

  function openPopup(trigger) {
    if (document.getElementById(BACKDROP_ID)) return;

    const section = findBriefingSection();
    if (!(section instanceof HTMLElement)) return;

    const audio = section.querySelector("audio");
    const caption = findCaption(section);

    installStyles();
    closeMarketDataMenu();
    previousFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;

    const backdrop = document.createElement("div");
    backdrop.id = BACKDROP_ID;
    backdrop.setAttribute("role", "presentation");

    const modal = document.createElement("section");
    modal.id = MODAL_ID;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Florida Liquor License Market Report video");

    const title = document.createElement("div");
    title.className = "market-report-popup-title";
    title.textContent = "Florida Liquor License Market Report";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "market-report-popup-close";
    closeButton.setAttribute("aria-label", "Close market report video");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", closePopup);

    const stage = document.createElement("div");
    stage.className = "market-report-popup-stage";

    const frame = document.createElement("div");
    frame.className = "market-report-popup-frame";

    const studio = document.createElement("img");
    studio.className = "market-report-popup-studio";
    studio.src = STUDIO_IMAGE;
    studio.alt = "Florida Liquor License Market Report studio";

    const brand = createBrand();

    const captionHost = document.createElement("div");
    captionHost.className = "market-report-popup-caption-host";

    const audioHost = document.createElement("div");
    audioHost.className = "market-report-popup-audio-host";

    frame.append(studio, brand, captionHost, audioHost);
    stage.appendChild(frame);
    modal.append(title, closeButton, stage);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    document.body.classList.add("market-insights-video-popup-open");

    if (caption instanceof HTMLElement) rememberAndMove(caption, captionHost, MOVED_CAPTION_CLASS);
    if (audio instanceof HTMLAudioElement) rememberAndMove(audio, audioHost, MOVED_AUDIO_CLASS);

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) closePopup();
    });
    closeButton.focus();
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const option = target.closest("#market-data-header-menu button");
    if (!(option instanceof HTMLButtonElement)) return;
    if (!/^florida market insights$/i.test(normalizedText(option))) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    window.setTimeout(() => openPopup(option), 20);
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.getElementById(BACKDROP_ID)) closePopup();
  });
})();