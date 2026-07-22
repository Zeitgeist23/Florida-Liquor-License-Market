"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

type ListingContext = {
  listing: string;
  reference: string;
};

function formatOfferAmount(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function SubmitOfferPage() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [offerAmount, setOfferAmount] = useState("");
  const [listingContext, setListingContext] = useState<ListingContext>({
    listing: "Selected Florida liquor license",
    reference: "Marketplace listing",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setListingContext({
      listing: params.get("listing") || "Selected Florida liquor license",
      reference: params.get("ref") || "Marketplace listing",
    });
  }, []);

  async function submitOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_honey")) {
      setStatus("sent");
      form.reset();
      setOfferAmount("");
      return;
    }

    setStatus("submitting");

    try {
      let response: Response | null = null;

      try {
        response = await fetch("/api/inquiry", {
          method: "POST",
          body: formData,
        });
      } catch {
        response = null;
      }

      if (!response?.ok) {
        formData.set("_subject", `Florida Liquor License Market — Offer for ${listingContext.listing}`);
        formData.set("_template", "table");
        formData.set("_captcha", "false");

        response = await fetch("https://formsubmit.co/ajax/JWigg023@gmail.com", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
      }

      if (!response.ok) throw new Error("Unable to submit offer");

      setStatus("sent");
      form.reset();
      setOfferAmount("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="offer-page">
      <header className="offer-header">
        <Link className="offer-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <div className="offer-header-art" aria-hidden="true" />
        <nav aria-label="Offer page navigation">
          <Link href="/listings">Inventory</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>

      <section className="offer-title-band">
        <span>Confidential Marketplace Transaction</span>
        <h1>Submit an Offer</h1>
        <p>Present your proposed purchase terms directly and discreetly.</p>
      </section>

      <section className="offer-content">
        <div className="offer-layout">
          <aside className="offer-summary">
            <span className="offer-kicker">Selected Opportunity</span>
            <div className="offer-listing-card">
              <small>LICENSE INTEREST</small>
              <h2>{listingContext.listing}</h2>
              <div className="offer-reference">
                <span>Reference</span>
                <strong>{listingContext.reference}</strong>
              </div>
              <div className="offer-status-line">
                <i aria-hidden="true" />
                <span>Offer submission available</span>
              </div>
            </div>

            <div className="offer-assurance">
              <h3>Private. Direct. Non-binding.</h3>
              <p>
                Your proposed terms will be reviewed confidentially. Submission does not create a binding agreement or obligate either party to proceed.
              </p>
            </div>

            <div className="offer-process">
              <div><b>01</b><span><strong>Submit terms</strong><small>Provide price, timing, and conditions.</small></span></div>
              <div><b>02</b><span><strong>Marketplace review</strong><small>Details are checked for completeness.</small></span></div>
              <div><b>03</b><span><strong>Direct follow-up</strong><small>A representative contacts you privately.</small></span></div>
            </div>
          </aside>

          <form className="offer-form" onSubmit={submitOffer}>
            <div className="offer-form-heading">
              <span>Offer Details</span>
              <h2>Present Your Proposed Terms</h2>
              <p>Fields marked * are required.</p>
            </div>

            <input type="hidden" name="_subject" value={`Florida Liquor License Market — Offer for ${listingContext.listing}`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="inquiry_type" value="Offer Submission" />
            <input type="hidden" name="listing_reference" value={listingContext.reference} />
            <input type="hidden" name="listing_requested" value={listingContext.listing} />
            <label className="offer-honeypot" aria-hidden="true">
              Leave blank
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
            </label>

            <div className="offer-fields">
              <label>
                <span>Buyer Name *</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>Email Address *</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Phone Number *</span>
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
              <label>
                <span>Offer Amount *</span>
                <div className="offer-money-input">
                  <b>$</b>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="500,000"
                    value={offerAmount}
                    onChange={(event) => setOfferAmount(formatOfferAmount(event.target.value))}
                    required
                  />
                  <input type="hidden" name="offer_amount" value={offerAmount.replace(/,/g, "")} />
                </div>
              </label>
              <label>
                <span>Purchase Method *</span>
                <select name="purchase_method" defaultValue="" required>
                  <option value="" disabled>Select method</option>
                  <option>Cash purchase</option>
                  <option>Financing required</option>
                  <option>Seller financing requested</option>
                  <option>Combination of cash and financing</option>
                </select>
              </label>
              <label>
                <span>Target Closing *</span>
                <select name="target_closing" defaultValue="" required>
                  <option value="" disabled>Select timeframe</option>
                  <option>Within 15 days</option>
                  <option>Within 30 days</option>
                  <option>Within 45 days</option>
                  <option>Within 60 days</option>
                  <option>More than 60 days</option>
                </select>
              </label>
              <label>
                <span>Proof of Funds</span>
                <select name="proof_of_funds" defaultValue="">
                  <option value="">Select status</option>
                  <option>Available now</option>
                  <option>Available upon request</option>
                  <option>Financing pre-approval available</option>
                  <option>Not yet available</option>
                </select>
              </label>
              <label>
                <span>Offer Expiration</span>
                <input name="offer_expiration" type="date" />
              </label>
              <label className="offer-wide">
                <span>Conditions or Contingencies</span>
                <textarea name="contingencies" rows={3} placeholder="Describe financing, due-diligence, transfer, approval, or closing conditions." />
              </label>
              <label className="offer-wide">
                <span>Additional Notes</span>
                <textarea name="message" rows={4} placeholder="Add any information that would help evaluate your offer." />
              </label>
            </div>

            <label className="offer-acknowledgment">
              <input type="checkbox" name="non_binding_acknowledgment" required />
              <span>
                I understand this is a non-binding expression of interest, subject to verification, regulatory requirements, due diligence, and definitive written agreements. *
              </span>
            </label>

            <button className="offer-submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting Offer…" : "Submit Confidential Offer"}
            </button>

            <p className={`offer-form-status ${status}`} role="status" aria-live="polite">
              {status === "sent" && "Your confidential offer has been submitted. A marketplace representative will follow up directly."}
              {status === "error" && "Your offer could not be sent. Please refresh the page and try again."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
