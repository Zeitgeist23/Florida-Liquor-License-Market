(() => {
  if (window.__FLLM_EXCHANGE_LISTING_V2__) return;
  window.__FLLM_EXCHANGE_LISTING_V2__ = true;

  if (!document.getElementById("fllm-exchange-button-depth")) {
    const style = document.createElement("style");
    style.id = "fllm-exchange-button-depth";
    style.textContent = `
      .fllm-exchange-form button[type="submit"] {
        box-shadow: inset 0 1px 0 rgba(255,255,255,.30), inset 0 -2px 0 rgba(0,0,0,.16), 0 5px 12px rgba(0,0,0,.24);
        transition: transform .16s ease, box-shadow .16s ease, filter .16s ease;
      }
      .fllm-exchange-form button[type="submit"]:hover:not(:disabled),
      .fllm-exchange-form button[type="submit"]:focus-visible:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.34), inset 0 -2px 0 rgba(0,0,0,.18), 0 7px 15px rgba(0,0,0,.28);
      }
      .fllm-exchange-form button[type="submit"]:active:not(:disabled) {
        transform: translateY(1px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.20), inset 0 -1px 0 rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.22);
      }
    `;
    document.head.appendChild(style);
  }

  const money = (value) => value == null ? "Undisclosed" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const parseMoney = (value) => {
    const n = Number(String(value || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? Math.round(n) : null;
  };

  async function start() {
    if (!document.querySelector(".marketplace-listing-page")) return;
    const referenceNode = document.querySelector(".marketplace-listing-hero-reference");
    const listingRef = referenceNode?.textContent?.replace(/^Listing\s+/i, "").trim().toUpperCase() || "";
    if (!/^FLLM-[A-Z0-9-]+$/.test(listingRef)) return;

    let quote;
    try {
      const response = await fetch(`/api/exchange/market?listingRef=${encodeURIComponent(listingRef)}`, { cache: "no-store" });
      quote = await response.json();
    } catch {
      return;
    }
    if (!quote?.enabled || quote.askingPrice == null) return;

    const bodyShell = document.querySelector(".marketplace-listing-body .marketplace-listing-shell");
    if (!(bodyShell instanceof HTMLElement) || document.querySelector("[data-fllm-exchange]")) return;

    const section = document.createElement("section");
    section.className = "fllm-exchange";
    section.dataset.fllmExchange = "true";
    section.innerHTML = `
      <div class="fllm-exchange-header">
        <div><span>FLLM Exchange</span><h2>Confidential Bid / Ask Exchange</h2><p>Submit a confidential buyer bid. Buyer bids, bid counts, and bid/ask spreads are not displayed publicly. The seller can accept or counter through a secure FLLM link.</p></div>
        <div class="fllm-exchange-badge">PRICE DISCOVERY</div>
      </div>
      <div class="fllm-exchange-tape" aria-label="Seller asking price">
        <div><span>SELLER ASK</span><strong data-exchange-ask>${money(quote.askingPrice)}</strong></div>
      </div>
      <form class="fllm-exchange-form">
        <div class="fllm-exchange-form-heading"><strong>Place a Bid</strong><span>Listing ${listingRef}</span></div>
        <label><span>Buyer Name *</span><input name="name" required autocomplete="name"></label>
        <label><span>Email *</span><input name="email" type="email" required autocomplete="email"></label>
        <label><span>Phone *</span><input name="phone" type="tel" required autocomplete="tel"></label>
        <label><span>Bid Price *</span><input name="price" inputmode="numeric" placeholder="$500,000" required></label>
        <label class="fllm-exchange-ack"><input name="acknowledgment" type="checkbox" required><span>I understand this bid and any FLLM price match are non-binding until final transaction terms are separately accepted.</span></label>
        <button type="submit">Submit Buyer Bid</button>
        <p class="fllm-exchange-status" role="status" aria-live="polite"></p>
      </form>
      <p class="fllm-exchange-legal">FLLM Exchange is a confidential negotiation and price-discovery feature. Buyer bids, counters, acceptances and price matches are not displayed publicly and do not themselves create a binding purchase agreement or guarantee DBPR transfer approval.</p>`;

    const firstGrid = bodyShell.querySelector(".marketplace-listing-grid");
    if (firstGrid) firstGrid.insertAdjacentElement("beforebegin", section);
    else bodyShell.prepend(section);

    const form = section.querySelector("form");
    const button = form?.querySelector("button");
    const status = form?.querySelector(".fllm-exchange-status");
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!(form instanceof HTMLFormElement) || !(button instanceof HTMLButtonElement) || !(status instanceof HTMLElement)) return;
      const data = new FormData(form);
      const price = parseMoney(data.get("price"));
      button.disabled = true;
      button.textContent = "Submitting Bid…";
      status.className = "fllm-exchange-status";
      status.textContent = "";
      try {
        const response = await fetch("/api/exchange/bid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingRef,
            name: data.get("name"),
            email: data.get("email"),
            phone: data.get("phone"),
            price,
            acknowledgment: data.get("acknowledgment") === "on",
          }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to submit bid.");
        status.classList.add(result.matched ? "matched" : "success");
        status.textContent = result.matched
          ? `PRICE MATCH REACHED. FLLM recorded a non-binding price match${result.transactionRef ? ` and opened transaction ${result.transactionRef}` : ""}. Check your email for the next step.`
          : "Your bid has been recorded and the seller has been notified securely.";
        form.reset();
      } catch (error) {
        status.classList.add("error");
        status.textContent = error instanceof Error ? error.message : "Unable to submit bid.";
      } finally {
        button.disabled = false;
        button.textContent = "Submit Buyer Bid";
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(start, 300), { once: true });
  else setTimeout(start, 300);
})();
