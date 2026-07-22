(() => {
  const STYLE_ID = "market-insights-menu-popup-size-v1";

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .market-map-popup{
        width:80vw!important;
        height:80vh!important;
        max-width:none!important;
        max-height:none!important;
        min-width:0!important;
        min-height:0!important;
      }
      @media(max-width:900px){
        .market-map-popup{
          width:94vw!important;
          height:88vh!important;
        }
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

  function findExploreMarketDataTrigger() {
    const panel = document.querySelector(".map-panel");
    if (!(panel instanceof HTMLElement)) return null;

    return Array.from(panel.querySelectorAll("a,button"))
      .find((element) => /explore market data/i.test(normalizedText(element))) || null;
  }

  function openMarketInsightsPopup() {
    installStyles();
    const trigger = findExploreMarketDataTrigger();

    if (trigger instanceof HTMLElement) {
      trigger.click();
      return;
    }

    const heading = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
      .find((element) => /^florida market insights$/i.test(normalizedText(element)));
    heading?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    closeMarketDataMenu();
    window.setTimeout(openMarketInsightsPopup, 20);
  }, true);

  installStyles();
})();