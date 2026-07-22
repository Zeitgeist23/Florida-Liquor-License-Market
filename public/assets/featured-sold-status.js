(() => {
  const soldListings = [
    ["Miami-Dade County", "$495,000"],
    ["Palm Beach County", "$575,000"],
    ["Sarasota County", "$340,000"],
    ["Lee County", "$425,000"],
    ["St. Johns County", "$425,000"],
  ];

  let observer = null;
  let scheduled = false;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findFeaturedSection() {
    const heading = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
      .find((element) => normalizedText(element).toLowerCase() === "featured florida liquor licenses");
    return heading?.closest("section") || heading?.parentElement || null;
  }

  function removeSoldCards() {
    scheduled = false;
    const section = findFeaturedSection();
    if (!section) return false;

    Array.from(section.querySelectorAll(".listing-card")).forEach((card) => {
      const text = normalizedText(card);
      const isSold = soldListings.some(([county, price]) => text.includes(county) && text.includes(price));
      if (isSold) card.remove();
    });

    const remainingCards = section.querySelectorAll(".listing-card").length;
    section.querySelectorAll(".carousel-arrow").forEach((arrow) => {
      const shouldHide = remainingCards <= 4;
      arrow.hidden = shouldHide;
      arrow.setAttribute("aria-hidden", shouldHide ? "true" : "false");
      if (arrow instanceof HTMLButtonElement) arrow.tabIndex = shouldHide ? -1 : 0;
    });

    if (!observer) {
      observer = new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(removeSoldCards);
      });
      observer.observe(section, { childList: true, subtree: true });
    }

    return true;
  }

  function initialize() {
    removeSoldCards();
    window.setTimeout(removeSoldCards, 300);
    window.setTimeout(removeSoldCards, 1000);
    window.setTimeout(removeSoldCards, 2200);
    window.setTimeout(removeSoldCards, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
