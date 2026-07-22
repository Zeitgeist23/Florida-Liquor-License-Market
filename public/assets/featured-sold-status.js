(() => {
  const STYLE_ID = "featured-sold-status-styles";
  const soldListings = [
    ["Miami-Dade County", "$495,000"],
    ["Palm Beach County", "$575,000"],
    ["Sarasota County", "$340,000"],
    ["Lee County", "$425,000"],
    ["St. Johns County", "$425,000"],
  ];

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .featured-sold-badge{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        margin:0 8px 4px 0;
        padding:4px 9px;
        border:1px solid #ffbf2f;
        border-radius:4px;
        background:#9f1111;
        color:#fff;
        font:900 11px/1 Arial,Helvetica,sans-serif;
        letter-spacing:.08em;
        text-transform:uppercase;
        box-shadow:0 4px 12px rgba(0,0,0,.24);
      }
      .featured-sold-card{position:relative}
      .featured-sold-card [data-featured-sold-label="true"]{
        color:#b31212!important;
        font-weight:900!important;
        letter-spacing:.04em;
      }
    `;
    document.head.appendChild(style);
  }

  function findFeaturedSection() {
    const heading = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
      .find((element) => normalizedText(element).toLowerCase() === "featured florida liquor licenses");
    return heading?.closest("section") || heading?.parentElement || null;
  }

  function replaceTransferableText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue || !/transferable/i.test(node.nodeValue)) continue;
      node.nodeValue = node.nodeValue.replace(/transferable/gi, "SOLD");
      const parent = node.parentElement;
      if (parent) parent.dataset.featuredSoldLabel = "true";
      return true;
    }
    return false;
  }

  function findCard(section, county, price) {
    const countyNode = Array.from(section.querySelectorAll("p,span,strong,h2,h3,h4,div"))
      .filter((element) => normalizedText(element).includes(county))
      .sort((a, b) => a.children.length - b.children.length)[0];
    if (!countyNode) return null;

    let card = countyNode;
    while (card && card !== section) {
      const text = normalizedText(card);
      if (text.includes(county) && text.includes(price) && /transferable|sold/i.test(text)) return { card, countyNode };
      card = card.parentElement;
    }
    return { card: countyNode.parentElement || countyNode, countyNode };
  }

  function applySoldStatus() {
    installStyles();
    const section = findFeaturedSection();
    if (!section) return false;

    soldListings.forEach(([county, price]) => {
      const result = findCard(section, county, price);
      if (!result) return;
      const { card, countyNode } = result;
      card.classList.add("featured-sold-card");

      if (!countyNode.querySelector(".featured-sold-badge")) {
        const badge = document.createElement("span");
        badge.className = "featured-sold-badge";
        badge.textContent = "SOLD";
        badge.setAttribute("aria-label", `${county} listing sold`);
        countyNode.prepend(badge);
      }

      replaceTransferableText(card);
    });

    return true;
  }

  function initialize() {
    applySoldStatus();
    setTimeout(applySoldStatus, 300);
    setTimeout(applySoldStatus, 1000);
    setTimeout(applySoldStatus, 2200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
