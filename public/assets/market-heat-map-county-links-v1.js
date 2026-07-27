(() => {
  const LINK_CLASS = "fllm-county-market-page-link";
  const STYLE_ID = "fllm-county-market-page-link-styles";

  function countyFromDialog(dialog) {
    const title = dialog.querySelector(".fllm-county-listings-header h3")?.textContent || "";
    return title.replace(/\s+Listings\s*$/i, "").trim();
  }

  function countySlug(county) {
    return county
      .replace(/\s+County$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .fllm-county-listings-footer{flex-wrap:wrap!important}
      .fllm-county-listings-footer .${LINK_CLASS}{
        display:inline-flex!important;
        align-items:center!important;
        min-height:34px!important;
        padding:7px 11px!important;
        border:1px solid #d29200!important;
        border-radius:3px!important;
        background:#07101a!important;
        color:#f1a600!important;
        font-size:10px!important;
        font-weight:900!important;
        text-decoration:none!important;
        text-transform:uppercase!important;
      }
      .fllm-county-listings-footer .${LINK_CLASS}:hover,
      .fllm-county-listings-footer .${LINK_CLASS}:focus-visible{
        background:#f1a600!important;
        color:#07101a!important;
        outline:none!important;
      }
    `;
    document.head.appendChild(style);
  }

  function enhanceDialog(dialog) {
    if (!(dialog instanceof HTMLElement)) return;
    const footer = dialog.querySelector(".fllm-county-listings-footer");
    if (!(footer instanceof HTMLElement)) return;

    const county = countyFromDialog(dialog);
    const slug = countySlug(county);
    if (!county || !slug) return;

    let link = footer.querySelector(`.${LINK_CLASS}`);
    if (!(link instanceof HTMLAnchorElement)) {
      link = document.createElement("a");
      link.className = LINK_CLASS;
      footer.append(link);
    }

    link.href = `/counties/${slug}`;
    link.textContent = `View Full ${county} Market Page ›`;
    link.setAttribute("aria-label", `View the permanent ${county} liquor license market page`);
  }

  function enhance(root = document) {
    if (root instanceof Element && root.matches(".fllm-county-listings-dialog")) enhanceDialog(root);
    root.querySelectorAll?.(".fllm-county-listings-dialog").forEach(enhanceDialog);
  }

  installStyles();
  enhance();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) enhance(node);
    }));
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
