(() => {
  const VERSION = "daily-ten-county-maps-v2";
  const STYLE_ID = "homepage-available-carousel-client-styles";
  let startIndex = 0;
  let observer = null;
  let scheduled = false;
  let lastVisibleCount = 0;

  function getListings() {
    return Array.isArray(window.__FLLM_AVAILABLE_LISTINGS__)
      ? window.__FLLM_AVAILABLE_LISTINGS__
          .filter((listing) => listing && listing.sourceRef && listing.mapUrl)
          .slice(0, 10)
      : [];
  }

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findFeaturedSection() {
    const heading = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
      .find((element) => normalizedText(element).toLowerCase() === "featured florida liquor licenses");
    return heading?.closest("section") || heading?.parentElement || null;
  }

  function visibleCount() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 900) return 2;
    return 4;
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .homepage-carousel-card-link{display:block;height:100%;color:inherit;text-decoration:none}
      .homepage-carousel-card-link:focus-visible{outline:3px solid #f6a700;outline-offset:-3px}
      .listing-card[data-homepage-available-card="true"]{height:100%}
      .homepage-county-map-panel{background:#061728}
      .homepage-county-map-panel .homepage-county-map{width:100%;height:100%;object-fit:contain;object-position:center;display:block}
    `;
    document.head.appendChild(style);
  }

  function createCard(listing) {
    const article = document.createElement("article");
    article.className = "listing-card";
    article.dataset.homepageAvailableCard = "true";

    const link = document.createElement("a");
    link.className = "homepage-carousel-card-link";
    link.href = `/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${encodeURIComponent(listing.sourceRef)}`;
    link.setAttribute("aria-label", `View ${listing.county} ${listing.type} listing`);

    const photo = document.createElement("div");
    photo.className = "listing-photo homepage-county-map-panel";

    const image = document.createElement("img");
    image.className = "homepage-county-map";
    image.src = listing.mapUrl;
    image.alt = `Florida map with ${listing.county} highlighted`;
    image.loading = "lazy";

    const badge = document.createElement("span");
    badge.textContent = listing.type;
    photo.append(image, badge);

    const body = document.createElement("div");
    body.className = "listing-body";

    const county = document.createElement("p");
    county.textContent = `● ${listing.county}`;

    const price = document.createElement("h3");
    price.textContent = listing.priceLabel;

    const facts = document.createElement("div");
    facts.className = "listing-facts";
    const type = document.createElement("span");
    type.textContent = listing.type;
    const status = document.createElement("span");
    status.textContent = "Available";
    facts.append(type, status);

    body.append(county, price, facts);
    link.append(photo, body);
    article.appendChild(link);
    return article;
  }

  function currentPage(listings, count) {
    if (!listings.length) return [];
    const normalizedStart = ((startIndex % listings.length) + listings.length) % listings.length;
    return Array.from({ length: Math.min(count, listings.length) }, (_, offset) =>
      listings[(normalizedStart + offset) % listings.length],
    );
  }

  function bindArrow(section, selector, direction, listings) {
    const arrow = section.querySelector(selector);
    if (!(arrow instanceof HTMLButtonElement)) return;

    arrow.hidden = listings.length <= visibleCount();
    arrow.setAttribute("aria-hidden", arrow.hidden ? "true" : "false");
    arrow.tabIndex = arrow.hidden ? -1 : 0;
    if (arrow.dataset.availableCarouselBound === VERSION) return;

    arrow.dataset.availableCarouselBound = VERSION;
    arrow.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const step = visibleCount();
      startIndex = (startIndex + direction * step + listings.length) % listings.length;
      renderCarousel(true);
    }, true);
  }

  function observeSection(section) {
    observer?.disconnect();
    observer = new MutationObserver(() => {
      if (scheduled) return;
      const grid = section.querySelector(".listing-grid");
      const expectedCount = Math.min(visibleCount(), getListings().length);
      const valid = grid instanceof HTMLElement &&
        grid.dataset.availableCarouselVersion === VERSION &&
        grid.querySelectorAll('[data-homepage-available-card="true"]').length === expectedCount &&
        grid.querySelectorAll(".homepage-county-map").length === expectedCount;
      if (valid) return;

      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        renderCarousel(true);
      });
    });
    observer.observe(section, { childList: true, subtree: true });
  }

  function renderCarousel(force = false) {
    const listings = getListings();
    const section = findFeaturedSection();
    const grid = section?.querySelector(".listing-grid");
    if (!listings.length || !(section instanceof HTMLElement) || !(grid instanceof HTMLElement)) return false;

    installStyles();
    const count = visibleCount();
    const expectedCount = Math.min(count, listings.length);
    const alreadyCurrent = grid.dataset.availableCarouselVersion === VERSION &&
      grid.dataset.availableCarouselStart === String(startIndex) &&
      grid.querySelectorAll('[data-homepage-available-card="true"]').length === expectedCount &&
      grid.querySelectorAll(".homepage-county-map").length === expectedCount;
    if (!force && alreadyCurrent) return true;

    observer?.disconnect();
    const fragment = document.createDocumentFragment();
    currentPage(listings, count).forEach((listing) => fragment.appendChild(createCard(listing)));
    grid.replaceChildren(fragment);
    grid.dataset.availableCarouselVersion = VERSION;
    grid.dataset.availableCarouselStart = String(startIndex);
    lastVisibleCount = count;

    bindArrow(section, ".carousel-arrow.previous", -1, listings);
    bindArrow(section, ".carousel-arrow.next", 1, listings);
    observeSection(section);
    return true;
  }

  function initialize() {
    renderCarousel(true);
    window.setTimeout(() => renderCarousel(true), 300);
    window.setTimeout(() => renderCarousel(true), 1000);
    window.setTimeout(() => renderCarousel(true), 2200);
    window.setTimeout(() => renderCarousel(true), 5000);
  }

  window.addEventListener("resize", () => {
    const nextCount = visibleCount();
    if (nextCount === lastVisibleCount) return;
    window.clearTimeout(window.__fllmCarouselResizeTimer);
    window.__fllmCarouselResizeTimer = window.setTimeout(() => renderCarousel(true), 120);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
