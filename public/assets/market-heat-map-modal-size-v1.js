(() => {
  const STYLE_ID = "fllm-market-heat-map-modal-size-v2";
  const STATUS_SELECTOR = ".fllm-county-listing-facts span:last-child";
  const STATUS_TEXT = "Transferable/Available";

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .fllm-heat-map-modal{
        width:90vw!important;
        height:90vh!important;
        max-width:none!important;
        max-height:none!important;
      }
      ${STATUS_SELECTOR}{
        color:#58c94f!important;
      }
    `;
    document.head.appendChild(style);
  }

  function updateStatuses(root = document) {
    if (root instanceof Element && root.matches(STATUS_SELECTOR)) {
      root.textContent = STATUS_TEXT;
    }

    root.querySelectorAll?.(STATUS_SELECTOR).forEach((status) => {
      status.textContent = STATUS_TEXT;
    });
  }

  updateStatuses();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) updateStatuses(node);
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();