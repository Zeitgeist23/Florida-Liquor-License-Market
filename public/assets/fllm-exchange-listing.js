(() => {
  if (window.__FLLM_EXCHANGE_LISTING_V1__) return;
  window.__FLLM_EXCHANGE_LISTING_V1__ = true;

  const money = (value) => value == null ? "No active bids" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
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
        <div><span>FLLM Exchange</span><h2>Live Bid / Ask Market</h2><p>Submit a confidential buyer bid. The seller can accept or counter through a secure FLLM link.</p></div>
        <div class="fllm-exchange-badge">PRICE DISCOVERY</div>
      </div>
      <div class="fllm-exchange-tape" aria-label="Current bid ask market">
        <div><span>SELLER ASK</span><strong data-exchange-ask>${money(quote.askingPrice)}</strong></div>
        <div><span>BEST BUYER BID</span><strong data-exchange-bid>${money(quote.bestBid)}</strong><small data-exchange-count>${quote.bidCount || 0} active bid${quote.bidCount === 1 ? "" : "s"}</small></div>
        <div><span>SPREAD</span><strong data-exchange-spread>${quote.bestBid == null ? "—" : money(Math.max(0, quote.askingPrice - quote.bestBid))}</strong></div>
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
      <p class="fllm-exchange-legal">FLLM Exchange is a negotiation and price-discovery feature. Displayed bids, asks, counters, acceptances and price matches do not themselves create a binding purchase agreement or guarantee DBPR transfer approval.</p>`;

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
        const bidNode = section.querySelector("[data-exchange-bid]");
        const countNode = section.querySelector("[data-exchange-count]");
        const spreadNode = section.querySelector("[data-exchange-spread]");
        if (bidNode) bidNode.textContent = money(result.bestBid);
        if (countNode) countNode.textContent = `${result.bidCount || 0} active bid${result.bidCount === 1 ? "" : "s"}`;
        if (spreadNode) spreadNode.textContent = result.bestBid == null ? "—" : money(Math.max(0, quote.askingPrice - result.bestBid));
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
