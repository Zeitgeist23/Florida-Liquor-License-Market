"use client";

import { FormEvent, useEffect, useState } from "react";

function money(value: number | null) {
  if (value === null) return "Undisclosed";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

type SellerDetails = {
  saleMethod?: string | null;
  licenseStatus?: string | null;
  preferredTiming?: string | null;
  contactPreference?: string | null;
  negotiable?: boolean;
  licenseOnly?: boolean;
  sellerFinancing?: boolean;
  buyerQualification?: boolean;
  noBroker?: boolean;
  directBuyersOnly?: boolean;
  transferApproval?: boolean;
};

export default function FllmExchangePanel(props: {
  listingRef: string;
  askingPrice: number | null;
  initialBestBid?: number | null;
  initialBidCount?: number;
}) {
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"matched"|"error">("idle");
  const [message, setMessage] = useState("");
  const [sellerDetails, setSellerDetails] = useState<SellerDetails | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/exchange/market?listingRef=${encodeURIComponent(props.listingRef)}`, {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((result: { sellerDetails?: SellerDetails }) => {
        if (active) setSellerDetails(result.sellerDetails ?? null);
      })
      .catch(() => {
        if (active) setSellerDetails(null);
      });
    return () => {
      active = false;
    };
  }, [props.listingRef]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/exchange/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingRef: props.listingRef,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          price: Number(String(data.get("price") || "").replace(/[^0-9.]/g, "")),
          acknowledgment: data.get("acknowledgment") === "on",
        }),
      });
      const result = await response.json() as { error?: string; matched?: boolean; transactionRef?: string|null };
      if (!response.ok) throw new Error(result.error || "Unable to submit bid.");
      setStatus(result.matched ? "matched" : "success");
      setMessage(result.matched
        ? `PRICE MATCH REACHED. FLLM recorded a non-binding price match. ${result.transactionRef ? `Transaction ${result.transactionRef} has been opened.` : ""}`
        : "Your bid has been recorded and the seller has been notified securely.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit bid.");
    }
  }

  return (
    <>
      <div className="fllm-selfdirected-extension">
        <section className="marketplace-listing-section marketplace-listing-seller-details fllm-selfdirected-seller-details" aria-labelledby={`seller-details-${props.listingRef}`}>
          <h2 id={`seller-details-${props.listingRef}`}>Additional Seller Details</h2>
          <p>This is an approved FLLM self-directed seller listing. The following transaction details are drawn from the seller&apos;s approved listing submission.</p>
          <h3>Seller-provided transaction details</h3>
          <ul>
            <li><strong>Sale method:</strong> {sellerDetails?.saleMethod || "FLLM Self-Directed Seller"}</li>
            {sellerDetails?.licenseStatus && <li><strong>License status:</strong> {sellerDetails.licenseStatus}</li>}
            {sellerDetails?.preferredTiming && <li><strong>Preferred sale timing:</strong> {sellerDetails.preferredTiming}</li>}
            <li><strong>Asking price:</strong> {props.askingPrice === null ? "Undisclosed" : money(props.askingPrice)}{sellerDetails?.negotiable ? " — negotiable" : ""}</li>
            {sellerDetails?.contactPreference && <li><strong>Preferred buyer contact:</strong> {sellerDetails.contactPreference}</li>}
            {sellerDetails?.licenseOnly && <li><strong>Transaction scope:</strong> License only — no operating business or real estate is included.</li>}
            {sellerDetails?.sellerFinancing && <li><strong>Seller financing:</strong> May be available to a qualified buyer, subject to acceptable down payment and terms.</li>}
            {sellerDetails?.buyerQualification && <li><strong>Buyer qualification:</strong> Proof of funds and/or financial qualification may be requested.</li>}
            {sellerDetails?.transferApproval && <li><strong>Transfer:</strong> Subject to Florida DBPR/ABT approval and applicable transfer requirements.</li>}
            {sellerDetails?.directBuyersOnly && <li><strong>Buyer audience:</strong> Principals / direct buyers only.</li>}
            {sellerDetails?.noBroker && <li><strong>Broker policy:</strong> For sale by owner — no broker solicitation.</li>}
          </ul>
          <p className="marketplace-listing-seller-disclosure">Seller-provided terms remain subject to confirmation. FLLM does not independently guarantee availability, financing, transfer approval, price, or transaction terms.</p>
        </section>

        <div className="fllm-selfdirected-promo-stack" aria-label="FLLM valuation and financing resources">
          <section className="marketplace-listing-appraisal-card" aria-labelledby={`self-appraisal-${props.listingRef}`}>
            <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal liquor license appraisal report" />
            <div>
              <span>Professional License Valuation</span>
              <h2 id={`self-appraisal-${props.listingRef}`}>Order a Liquor License Appraisal</h2>
              <p>Get a license-specific valuation supported by county market evidence and regulatory research.</p>
              <a className="marketplace-listing-appraisal-button" href="/florida-liquor-license-appraisal#order-form">Order an Appraisal</a>
              <a className="marketplace-listing-heat-map-link" href="/?open=heat-map">Explore the Florida License Heat Map →</a>
            </div>
          </section>

          <section className="marketplace-listing-finance-promo" aria-labelledby={`self-financing-${props.listingRef}`}>
            <span>Liquor License Purchase Financing</span>
            <h2 id={`self-financing-${props.listingRef}`}>Finance This License</h2>
            <p>Request financing consideration through the FLLM Private Lender Network.</p>
            <a className="marketplace-listing-finance-button" href="/financing#request-financing">Request Financing</a>
            <small>All financing is subject to independent lender review, underwriting, and approval.</small>
          </section>
        </div>
      </div>

      <section className="fllm-exchange" aria-labelledby={`exchange-${props.listingRef}`}>
        <div className="fllm-exchange-header">
          <div>
            <span>FLLM Exchange</span>
            <h2 id={`exchange-${props.listingRef}`}>Confidential Bid / Ask Exchange</h2>
            <p>Submit a confidential buyer bid. Buyer bids, bid counts, and bid/ask spreads are not displayed publicly. The seller can accept or counter through a secure FLLM link.</p>
          </div>
          <div className="fllm-exchange-badge">PRICE DISCOVERY</div>
        </div>

        <div className="fllm-exchange-tape" role="group" aria-label="Seller asking price">
          <div><span>SELLER ASK</span><strong>{props.askingPrice === null ? "Undisclosed" : money(props.askingPrice)}</strong></div>
        </div>

        {props.askingPrice !== null ? (
          <form className="fllm-exchange-form" onSubmit={submit}>
            <div className="fllm-exchange-form-heading"><strong>Place a Bid</strong><span>Listing {props.listingRef}</span></div>
            <label><span>Buyer Name *</span><input name="name" required autoComplete="name" /></label>
            <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
            <label><span>Phone *</span><input name="phone" type="tel" required autoComplete="tel" /></label>
            <label><span>Bid Price *</span><input name="price" inputMode="numeric" placeholder="$500,000" required /></label>
            <label className="fllm-exchange-ack"><input name="acknowledgment" type="checkbox" required /><span>I understand this bid and any FLLM price match are non-binding until final transaction terms are separately accepted.</span></label>
            <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting Bid…" : "Submit Buyer Bid"}</button>
            {message && <p className={`fllm-exchange-status ${status}`} role="status">{message}</p>}
          </form>
        ) : (
          <p className="fllm-exchange-unavailable">Exchange bidding will open when the seller publishes an asking price.</p>
        )}

        <p className="fllm-exchange-legal">FLLM Exchange is a confidential negotiation and price-discovery feature. Buyer bids, counters, acceptances and price matches are not displayed publicly and do not themselves create a binding purchase agreement or guarantee DBPR transfer approval.</p>
      </section>

      <style>{`
        .fllm-selfdirected-extension {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 30px;
          align-items: start;
          margin: 28px 0 32px;
        }

        .fllm-selfdirected-seller-details {
          margin: 0 !important;
          min-height: 100%;
        }

        .fllm-selfdirected-promo-stack {
          display: grid;
          gap: 14px;
          align-content: start;
        }

        .fllm-selfdirected-promo-stack .marketplace-listing-appraisal-card,
        .fllm-selfdirected-promo-stack .marketplace-listing-finance-promo {
          margin: 0;
        }

        @media (max-width: 900px) {
          .fllm-selfdirected-extension {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
      `}</style>
    </>
  );
}
