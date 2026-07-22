(() => {
  const FORM_SELECTOR = ".license-search";

  function selectedValue(select) {
    return select instanceof HTMLSelectElement ? select.value : "all";
  }

  function openFilteredListings(form) {
    const selects = Array.from(form.querySelectorAll("select"));
    const [countySelect, typeSelect, priceSelect] = selects;
    const params = new URLSearchParams();

    const county = selectedValue(countySelect);
    const type = selectedValue(typeSelect);
    const price = selectedValue(priceSelect);

    if (county && county !== "all") params.set("county", county);
    if (type && type !== "all") params.set("type", type);
    if (price && price !== "all") params.set("price", price);

    const query = params.toString();
    window.location.assign(`/listings${query ? `?${query}` : ""}`);
  }

  function bindSearchForm() {
    const form = document.querySelector(FORM_SELECTOR);
    if (!(form instanceof HTMLFormElement)) return false;
    if (form.dataset.listingSearchBound === "true") return true;

    const selects = Array.from(form.querySelectorAll("select"));
    if (selects.length < 3) return false;

    form.dataset.listingSearchBound = "true";
    form.action = "/listings";
    form.method = "get";
    selects[0].name = "county";
    selects[1].name = "type";
    selects[2].name = "price";

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openFilteredListings(form);
    }, true);

    return true;
  }

  function initialize() {
    bindSearchForm();
    setTimeout(bindSearchForm, 300);
    setTimeout(bindSearchForm, 1000);
    setTimeout(bindSearchForm, 2200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();