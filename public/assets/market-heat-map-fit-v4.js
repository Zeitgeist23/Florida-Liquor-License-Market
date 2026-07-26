(() => {
  const STYLE_ID = "fllm-market-heat-map-fit-v7";
  const MAP_SELECTOR = ".fllm-heat-map-canvas .fllm-heat-map-svg";

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .fllm-heat-map-canvas{
        padding:18px 24px 30px!important;
        overflow:hidden!important;
        box-sizing:border-box!important;
      }
      ${MAP_SELECTOR}{
        display:block!important;
        width:min(77.868%,606px)!important;
        height:auto!important;
        max-width:77.868%!important;
        max-height:calc(100% - 30px)!important;
        margin:auto!important;
        padding:0!important;
        box-sizing:border-box!important;
        overflow:visible!important;
      }
      @media(max-width:760px){
        .fllm-heat-map-canvas{padding:12px 12px 24px!important}
        ${MAP_SELECTOR}{
          width:min(84.357%,454px)!important;
          max-width:84.357%!important;
          max-height:calc(100% - 24px)!important;
        }
      }
      @media(max-height:760px){
        ${MAP_SELECTOR}{
          width:min(69.216%,541px)!important;
          max-width:69.216%!important;
          max-height:calc(100% - 34px)!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function fitMap(svg) {
    if (!(svg instanceof SVGSVGElement)) return;
    svg.setAttribute("viewBox", "118 -2 335 310");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
  }

  function fitVisibleMaps(root = document) {
    root.querySelectorAll?.(MAP_SELECTOR).forEach(fitMap);
  }

  installStyles();
  fitVisibleMaps();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches?.(MAP_SELECTOR)) fitMap(node);
        fitVisibleMaps(node);
      }
    }
  });

  const observe = () => {
    if (!document.body) return;
    observer.observe(document.body, { childList: true, subtree: true });
    fitVisibleMaps();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observe, { once: true });
  } else {
    observe();
  }

  window.addEventListener("fllm:open-heat-map", () => {
    window.setTimeout(() => fitVisibleMaps(), 0);
    window.setTimeout(() => fitVisibleMaps(), 150);
  });
})();
