"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import ListingBrokerInquiryForm from "@/components/ListingBrokerInquiryForm";

function money(value: number | null) {
  if (value === null) return "Undisclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
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

type ListingContext = {
  reference?: string | null;
  title?: string | null;
  county?: string | null;
  licenseType?: string | null;
  status?: string | null;
  url?: string | null;
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
] as const;

export default function FllmExchangePanel(props: {
  listingRef: string;
  askingPrice: number | null;
  initialBestBid?: number | null;
  initialBidCount?: number;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "matched" | "error">("idle");
  const [message, setMessage] = useState("");
  const [sellerDetails, setSellerDetails] = useState<SellerDetails | null>(null);
  const [listingContext, setListingContext] = useState<ListingContext | null>(null);
  const [mainMount, setMainMount] = useState<HTMLElement | null>(null);
  const [asideMount, setAsideMount] = useState<HTMLElement | null>(null);
  const [highlightMount, setHighlightMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/exchange/market?listingRef=${encodeURIComponent(props.listingRef)}`, {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((result: { sellerDetails?: SellerDetails; listing?: ListingContext }) => {
        if (!active) return;
        setSellerDetails(result.sellerDetails ?? null);
        setListingContext(result.listing ?? null);
      })
      .catch(() => {
        if (!active) return;
        setSellerDetails(null);
        setListingContext(null);
      });

    return () => {
      active = false;
    };
  }, [props.listingRef]);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".marketplace-listing-main");
    const aside = document.querySelector<HTMLElement>(
      ".marketplace-listing-aside:not(.marketplace-listing-aside-broker)",
    );
    const facts = main?.querySelector<HTMLElement>(".marketplace-listing-facts");
    if (!main || !aside || !facts) return;

    const redundantListingBox = Array.from(
      aside.querySelectorAll<HTMLElement>(".marketplace-listing-reference"),
    ).find((element) => element.textContent?.includes("Individual Listing Page"));
    redundantListingBox?.remove();

    let highlightSlot = main.querySelector<HTMLElement>(".fllm-selfdirected-highlight-slot");
    let mainSlot = main.querySelector<HTMLElement>(".fllm-selfdirected-main-slot");
    let asideSlot = aside.querySelector<HTMLElement>(".fllm-selfdirected-aside-slot");
    let createdHighlight = false;
    let createdMain = false;
    let createdAside = false;

    if (!highlightSlot) {
      highlightSlot = document.createElement("div");
      highlightSlot.className = "fllm-selfdirected-highlight-slot";
      facts.insertAdjacentElement("afterend", highlightSlot);
      createdHighlight = true;
    }

    if (!mainSlot) {
      mainSlot = document.createElement("div");
      mainSlot.className = "fllm-selfdirected-main-slot";
      main.appendChild(mainSlot);
      createdMain = true;
    }

    if (!asideSlot) {
      asideSlot = document.createElement("div");
      asideSlot.className = "fllm-selfdirected-aside-slot";
      aside.appendChild(asideSlot);
      createdAside = true;
    }

    setHighlightMount(highlightSlot);
    setMainMount(mainSlot);
    setAsideMount(asideSlot);

    return () => {
      setHighlightMount(null);
      setMainMount(null);
      setAsideMount(null);
      if (createdHighlight && highlightSlot?.parentElement === main) main.removeChild(highlightSlot);
      if (createdMain && mainSlot?.parentElement === main) main.removeChild(mainSlot);
      if (createdAside && asideSlot?.parentElement === aside) aside.removeChild(asideSlot);
    };
  }, []);

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
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          street: data.get("street"),
          city: data.get("city"),
          state: data.get("state"),
          zip: data.get("zip"),
          price: Number(String(data.get("price") || "").replace(/[^0-9.]/g, "")),
          downPayment: Number(String(data.get("downPayment") || "").replace(/[^0-9.]/g, "")),
          fundsAvailable: Number(String(data.get("fundsAvailable") || "").replace(/[^0-9.]/g, "")),
          purchaseMethod: data.get("purchaseMethod"),
          sellerFinancing: data.get("sellerFinancing"),
          sellerFinancingAmount: Number(String(data.get("sellerFinancingAmount") || "").replace(/[^0-9.]/g, "")) || 0,
          proofFunds: data.get("proofFunds"),
          intendedUse: data.get("intendedUse"),
          targetClosing: data.get("targetClosing"),
          accuracy: data.get("accuracy") === "on",
          acknowledgment: data.get("acknowledgment") === "on",
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        matched?: boolean;
        transactionRef?: string | null;
      };
      if (!response.ok) throw new Error(result.error || "Unable to submit bid.");

      setStatus(result.matched ? "matched" : "success");
      setMessage(
        result.matched
          ? `PRICE MATCH REACHED. FLLM recorded a non-binding price match. ${result.transactionRef ? `Transaction ${result.transactionRef} has been opened.` : ""}`
          : "Your qualified buyer bid has been recorded and the seller has been notified securely.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit bid.");
    }
  }

  const is3ps = /3PS/i.test(listingContext?.licenseType || "");
  const countyShort = (listingContext?.county || "").replace(/\s+County$/i, "") || "County";

  const highlightPortal = highlightMount
    ? createPortal(
        <section className="marketplace-listing-highlights" aria-labelledby={`self-license-highlights-${props.listingRef}`}>
          <h3 id={`self-license-highlights-${props.listingRef}`}>License Highlights</h3>
          <div className="marketplace-listing-highlight-grid">
            <div><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 42h13V18H11zM15 18V8h5v10M11 26h13M29 25h12l-2 9a5 5 0 0 1-4 3.5A5 5 0 0 1 31 34zM35 37.5V42M30 42h10" /></svg><strong>{is3ps ? <>Full-liquor<br />package sales</> : <>Full-liquor<br />privileges</>}</strong></div>
            <div><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 18h32l-4-9H12zM11 18v22h26V18M17 40V27h14v13M9 18c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" /></svg><strong>{is3ps ? <>Off-premises<br />package use</> : <>On- or<br />off-premises use</>}</strong></div>
            <div><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 9h18v33H10V9h5M18 6h12v7H18zM16 21l3 3 6-7M16 31l3 3 6-7M29 21h5M29 31h5" /></svg><strong>{is3ps ? <>Transferable quota<br />license series</> : <>Generally no SFS<br />food-sales percentage</>}</strong></div>
            <div><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="14" r="7" /><circle cx="10" cy="22" r="5" /><circle cx="38" cy="22" r="5" /><path d="M13 42v-6c0-7 5-12 11-12s11 5 11 12v6zM2 42v-5c0-5 4-9 9-9 2 0 4 1 6 2M46 42v-5c0-5-4-9-9-9-2 0-4 1-6 2" /></svg><strong>Limited {countyShort}<br />County quota supply</strong></div>
          </div>
        </section>,
        highlightMount,
      )
    : null;

  const sellerDetailsPortal = mainMount
    ? createPortal(
        <section className="marketplace-listing-section marketplace-listing-seller-details fllm-selfdirected-seller-details" aria-labelledby={`seller-details-${props.listingRef}`}>
          <h2 id={`seller-details-${props.listingRef}`}>Additional Seller Details</h2>
          <p className="fllm-selfdirected-intro">Seller-provided terms from the approved FLLM self-directed listing submission.</p>
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
        </section>,
        mainMount,
      )
    : null;

  const asidePortal = asideMount
    ? createPortal(
        <div className="fllm-selfdirected-aside-stack">
          <div style={{ transform: "translateY(-15px)" }}>
            <ListingBrokerInquiryForm listingReference={listingContext?.reference || props.listingRef} listingRequested={listingContext?.title || props.listingRef} listingCounty={listingContext?.county || ""} licenseType={listingContext?.licenseType || ""} askingPrice={props.askingPrice === null ? "Price not disclosed" : money(props.askingPrice)} listingStatus={listingContext?.status || "Available"} listingUrl={listingContext?.url || `/listings/${props.listingRef}`} recipientKind="seller" />
          </div>
          <section className="marketplace-listing-appraisal-card" style={{ transform: "translateY(-2px)" }} aria-labelledby={`self-appraisal-${props.listingRef}`}>
            <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="Sample FLLM formal liquor license appraisal report" />
            <div><span>Professional License Valuation</span><h2 id={`self-appraisal-${props.listingRef}`}>Order a Liquor License Appraisal</h2><p>Get a license-specific valuation supported by county market evidence and regulatory research.</p><a className="marketplace-listing-appraisal-button" href="/florida-liquor-license-appraisal#order-form">Order an Appraisal</a><a className="marketplace-listing-heat-map-link" href="/?open=heat-map">Explore the Florida License Heat Map →</a></div>
          </section>
          <section className="marketplace-listing-finance-promo" aria-labelledby={`self-financing-${props.listingRef}`}>
            <span>Liquor License Purchase Financing</span><h2 id={`self-financing-${props.listingRef}`}>Finance This License</h2><p>Request financing consideration through the FLLM Private Lender Network.</p><a className="marketplace-listing-finance-button" href="/financing#request-financing">Request Financing</a><small>All financing is subject to independent lender review, underwriting, and approval.</small>
          </section>
        </div>,
        asideMount,
      )
    : null;

  return (
    <>
      {highlightPortal}{sellerDetailsPortal}{asidePortal}
      <section className="fllm-exchange" aria-labelledby={`exchange-${props.listingRef}`}>
        <div className="fllm-exchange-header">
          <div><span>FLLM Exchange</span><h2 id={`exchange-${props.listingRef}`}>Confidential Bid / Ask Exchange</h2><p>Submit a confidential, qualified buyer bid. Buyer bids, bid counts, and bid/ask spreads are not displayed publicly. The seller can accept or counter through a secure FLLM link.</p></div>
          <div className="fllm-exchange-market-pills" aria-label="Bid and ask market indicators"><span className="bid">BID</span><span className="ask">ASK</span></div>
        </div>
        <div className="fllm-exchange-tape" role="group" aria-label="Seller asking price"><div><span>SELLER ASK</span><strong>{props.askingPrice === null ? "Undisclosed" : money(props.askingPrice)}</strong></div></div>
        {props.askingPrice !== null ? (
          <form className="fllm-exchange-form fllm-exchange-qualified-form" onSubmit={submit}>
            <div className="fllm-exchange-form-heading"><strong>Qualified Buyer Registration & Bid</strong><span>Listing {props.listingRef}</span></div>
            <p className="fllm-exchange-form-note">FLLM requires complete buyer information before a bid is submitted. This information creates a qualified buyer lead tied to this listing.</p>
            <div className="fllm-exchange-section-title">Buyer identity</div>
            <label><span>First Name *</span><input name="firstName" required autoComplete="given-name" /></label>
            <label><span>Last Name *</span><input name="lastName" required autoComplete="family-name" /></label>
            <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
            <label><span>Phone *</span><input name="phone" type="tel" required autoComplete="tel" /></label>
            <label className="fllm-exchange-wide"><span>Street Address *</span><input name="street" required autoComplete="street-address" /></label>
            <label><span>City *</span><input name="city" required autoComplete="address-level2" /></label>
            <label><span>State *</span><select name="state" required defaultValue="" autoComplete="address-level1"><option value="" disabled>Select state</option>{US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}</select></label>
            <label><span>ZIP Code *</span><input name="zip" required autoComplete="postal-code" inputMode="numeric" /></label>
            <div className="fllm-exchange-section-title">Bid & financial qualification</div>
            <label><span>Bid Price *</span><input name="price" inputMode="numeric" placeholder="Enter bid amount" required /></label>
            <label><span>Proposed Down Payment *</span><input name="downPayment" inputMode="numeric" placeholder="Enter down payment" required /></label>
            <label><span>Funds Available for Purchase *</span><input name="fundsAvailable" inputMode="numeric" placeholder="Enter available funds" required /></label>
            <label><span>Purchase Method *</span><select name="purchaseMethod" required defaultValue=""><option value="" disabled>Select purchase method</option><option>Cash</option><option>Bank financing</option><option>Seller financing</option><option>Combination of cash and financing</option></select></label>
            <label><span>Seller Financing Requested? *</span><select name="sellerFinancing" required defaultValue=""><option value="" disabled>Select</option><option>No</option><option>Yes</option></select></label>
            <label><span>Seller Financing Amount</span><input name="sellerFinancingAmount" inputMode="numeric" placeholder="Enter amount if requested" /></label>
            <label><span>Proof of Funds *</span><select name="proofFunds" required defaultValue=""><option value="" disabled>Select status</option><option>Available now</option><option>Available on request</option><option>Not yet available</option></select></label>
            <label><span>Intended Use *</span><select name="intendedUse" required defaultValue=""><option value="" disabled>Select intended use</option><option>Liquor store / package store</option><option>Restaurant</option><option>Bar / lounge</option><option>Other licensed premises</option></select></label>
            <label><span>Target Closing *</span><select name="targetClosing" required defaultValue=""><option value="" disabled>Select timeframe</option><option>Within 30 days</option><option>31–60 days</option><option>61–90 days</option><option>More than 90 days</option><option>Flexible</option></select></label>
            <label className="fllm-exchange-ack fllm-exchange-wide"><input name="accuracy" type="checkbox" required /><span>I certify that the buyer and financial information provided above is accurate to the best of my knowledge and may be retained by FLLM as a buyer lead associated with this listing.</span></label>
            <label className="fllm-exchange-ack fllm-exchange-wide"><input name="acknowledgment" type="checkbox" required /><span>I understand this bid and any FLLM price match are non-binding until final transaction terms are separately accepted.</span></label>
            <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting Qualified Bid…" : "Submit Qualified Buyer Bid"}</button>
            {message && <p className={`fllm-exchange-status ${status}`} role="status">{message}</p>}
          </form>
        ) : <p className="fllm-exchange-unavailable">Exchange bidding will open when the seller publishes an asking price.</p>}
        <p className="fllm-exchange-legal">FLLM Exchange is a confidential negotiation and price-discovery feature. Buyer qualification information is retained for marketplace lead tracking and transaction review. Buyer bids, counters, acceptances and price matches are not displayed publicly and do not themselves create a binding purchase agreement or guarantee DBPR transfer approval.</p>
      </section>
      <style>{`
        .fllm-selfdirected-highlight-slot,.fllm-selfdirected-main-slot,.fllm-selfdirected-aside-slot{width:100%}.fllm-selfdirected-highlight-slot{margin-top:22px}.fllm-selfdirected-highlight-slot .marketplace-listing-highlights{margin:0 0 22px}.fllm-selfdirected-main-slot{margin-top:22px}.fllm-selfdirected-aside-slot{margin-top:18px}.fllm-selfdirected-seller-details{margin:0!important}.fllm-selfdirected-intro{margin-bottom:14px!important}.fllm-selfdirected-seller-details ul{margin-bottom:18px}.fllm-selfdirected-seller-details li{margin:0}.fllm-selfdirected-aside-stack{display:grid;gap:16px;align-content:start}.fllm-selfdirected-aside-stack .marketplace-listing-broker-inquiry,.fllm-selfdirected-aside-stack .marketplace-listing-appraisal-card,.fllm-selfdirected-aside-stack .marketplace-listing-finance-promo{margin:0!important;width:100%}.marketplace-listing-inquiry-intro{margin:-2px 0 4px;color:#c9d6df;font-size:12px;line-height:1.5}
        .fllm-exchange{background:radial-gradient(circle at 78% 0%,rgba(0,130,190,.19),transparent 34%),linear-gradient(145deg,#0a314d 0%,#082945 52%,#061e34 100%)!important;border:1px solid rgba(241,166,0,.86)!important;border-radius:18px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 18px 40px rgba(0,0,0,.25)!important}.fllm-exchange-header>div:first-child>span{display:block!important;margin-bottom:5px!important;color:#31d4f5!important;font:900 25px/1 Arial,Helvetica,sans-serif!important;letter-spacing:.08em!important;text-transform:uppercase!important}.fllm-exchange-header h2{color:#fff!important}.fllm-exchange-header p{color:#eef6fb!important}.fllm-exchange-market-pills{display:flex;gap:10px;align-items:flex-start;justify-content:flex-end}.fllm-exchange-market-pills span{display:inline-flex;align-items:center;justify-content:center;min-width:58px;height:31px;padding:0 14px;border-radius:999px;font:900 12px/1 Arial,Helvetica,sans-serif;letter-spacing:.04em}.fllm-exchange-market-pills .bid{color:#eafff2;background:#08723f;border:1px solid #18df77;box-shadow:0 0 12px rgba(24,223,119,.18)}.fllm-exchange-market-pills .ask{color:#fff0f2;background:#6d2934;border:1px solid #ff5369;box-shadow:0 0 12px rgba(255,83,105,.15)}.fllm-exchange-tape{background:#031a2b!important;border-color:#147da5!important}.fllm-exchange-tape span{color:#9fd8ea!important}.fllm-exchange-tape strong{color:#fff!important}.fllm-exchange-qualified-form{background:linear-gradient(180deg,#0b3554 0%,#092c49 100%)!important;border:1px solid #1c789d!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.035)!important}.fllm-exchange-qualified-form label>span,.fllm-exchange-qualified-form .fllm-exchange-form-heading strong{color:#fff!important}.fllm-exchange-qualified-form .fllm-exchange-form-heading span{color:#c8dce7!important}.fllm-exchange-qualified-form input,.fllm-exchange-qualified-form select{width:100%;min-height:46px;padding:0 14px;border:1px solid #1685b0!important;border-radius:5px;background:#061d31!important;color:#eef7fb!important;font:inherit;box-shadow:inset 0 1px 4px rgba(0,0,0,.28)!important}.fllm-exchange-qualified-form input::placeholder{color:#a9bbc7!important;opacity:1}.fllm-exchange-qualified-form input:focus,.fllm-exchange-qualified-form select:focus{outline:none;border-color:#2fd8f6!important;box-shadow:0 0 0 2px rgba(47,216,246,.14)!important}.fllm-exchange-form-note{grid-column:1/-1;margin:0 0 4px;color:#c7dbe6!important;font-size:12px;line-height:1.55}.fllm-exchange-section-title{grid-column:1/-1;margin-top:8px;padding-top:10px;border-top:1px solid rgba(48,207,238,.35);color:#31d4f5!important;font-size:13px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}.fllm-exchange-wide{grid-column:1/-1}.fllm-exchange-qualified-form>button,.fllm-exchange-qualified-form>.fllm-exchange-status{grid-column:1/-1}.fllm-exchange-qualified-form>button{background:linear-gradient(180deg,#21c5e8 0%,#0798ba 100%)!important;border:1px solid #57ddf8!important;color:#fff!important;box-shadow:0 7px 18px rgba(0,165,205,.2)!important}.fllm-exchange-ack{background:#061d31!important;border:1px solid #155f7e!important;border-radius:5px!important;padding:9px 12px!important}.fllm-exchange-legal{color:#a7ccde!important}
        @media (min-width:1100px){.fllm-selfdirected-seller-details ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:28px;row-gap:12px;padding-left:22px}}
        @media (max-width:900px){.fllm-selfdirected-highlight-slot,.fllm-selfdirected-main-slot,.fllm-selfdirected-aside-slot{margin-top:16px}.fllm-exchange-wide,.fllm-exchange-section-title,.fllm-exchange-form-note{grid-column:1}.fllm-exchange-qualified-form>button,.fllm-exchange-qualified-form>.fllm-exchange-status{grid-column:1}.fllm-exchange-market-pills{justify-content:flex-start}.fllm-exchange-header>div:first-child>span{font-size:20px!important}}
      `}</style>
    </>
  );
}
