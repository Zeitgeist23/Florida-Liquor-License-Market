"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SubmitState = "idle" | "submitting" | "sent" | "error";

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)})${digits.slice(3)}`;
  return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatCurrency(value: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number.isFinite(value) ? value : 0);
}

function AntezzaSidebarLoanCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(495000);
  const [downPayment, setDownPayment] = useState(99000);
  const [annualRate, setAnnualRate] = useState(10);
  const [termYears, setTermYears] = useState(10);

  const principal = Math.max(0, purchasePrice - downPayment);
  const months = Math.max(1, Math.round(termYears * 12));
  const monthlyRate = Math.max(0, annualRate) / 100 / 12;
  let monthlyPayment = 0;

  if (principal > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    }
  }

  return (
    <section className="antezza-sidebar-calculator" aria-labelledby="antezza-sidebar-calculator-title">
      <style>{`
        .antezza-calculator-slot{width:100%;margin-top:16px}
        .antezza-sidebar-calculator{box-sizing:border-box;position:relative;overflow:hidden;width:100%;border:1px solid rgba(111,240,255,.46);border-radius:13px;background:radial-gradient(circle at 50% 0%,rgba(70,210,229,.18),transparent 35%),linear-gradient(180deg,rgba(13,35,42,.99),rgba(5,18,24,.995));box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 15px 34px rgba(0,0,0,.22),0 0 34px rgba(70,210,229,.08);color:#edfaff;padding:20px;font-family:"Montserrat",Arial,sans-serif}
        .antezza-sidebar-calculator::before{content:"";position:absolute;inset:0 16% auto;height:1px;background:linear-gradient(90deg,transparent,rgba(138,244,255,.95),transparent);box-shadow:0 0 16px rgba(91,229,245,.7)}
        .antezza-sidebar-calculator *{box-sizing:border-box}
        .antezza-sidebar-calculator__eyebrow{display:block;color:#7cefff;font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
        .antezza-sidebar-calculator h2{margin:7px 0 6px;color:#fff;font-size:21px;line-height:1.15}
        .antezza-sidebar-calculator__intro{margin:0 0 17px;color:#bfd7de;font-size:11px;line-height:1.55}
        .antezza-sidebar-calculator__fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
        .antezza-sidebar-calculator label{min-width:0}
        .antezza-sidebar-calculator label>span,.antezza-sidebar-calculator__readonly>span{display:block;margin-bottom:6px;color:#dff9fc;font-size:10px;font-weight:800;line-height:1.3}
        .antezza-sidebar-calculator input,.antezza-sidebar-calculator select{width:100%;min-height:43px;border:1px solid rgba(124,239,255,.24);border-radius:7px;outline:none;background:rgba(1,17,22,.92);color:#f3feff;padding:9px 10px;font:inherit;font-size:13px}
        .antezza-sidebar-calculator input:focus,.antezza-sidebar-calculator select:focus,.antezza-sidebar-calculator a:focus-visible{outline:2px solid #8af4ff;outline-offset:2px}
        .antezza-sidebar-calculator__readonly{margin-top:11px}
        .antezza-sidebar-calculator__readonly output{display:flex;align-items:center;min-height:43px;border:1px solid rgba(124,239,255,.14);border-radius:7px;background:rgba(124,239,255,.055);color:#8af4ff;padding:9px 10px;font-family:"Courier New",Consolas,monospace;font-size:15px;font-weight:800}
        .antezza-sidebar-calculator__payment{margin-top:13px;border:1px solid rgba(124,239,255,.2);border-radius:10px;background:rgba(0,0,0,.2);padding:15px;text-align:center}
        .antezza-sidebar-calculator__payment span{display:block;color:#bfeef3;font-size:10px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
        .antezza-sidebar-calculator__payment strong{display:block;margin-top:5px;color:#8af4ff;font-family:"Courier New",Consolas,monospace;font-size:25px;line-height:1.05}
        .antezza-sidebar-calculator__payment small{display:block;margin-top:5px;color:#91aab2;font-size:9px}
        .antezza-sidebar-calculator__cta{display:flex;align-items:center;justify-content:center;min-height:46px;margin-top:13px;border:1px solid #f0aa12;border-radius:7px;background:linear-gradient(180deg,#f9b31a,#efa000);color:#061a24!important;text-decoration:none;font-size:12px;font-weight:950;letter-spacing:.025em;transition:transform .16s ease,filter .16s ease}
        .antezza-sidebar-calculator__cta:hover{transform:translateY(-1px);filter:brightness(1.05)}
        .antezza-sidebar-calculator__full{display:block;margin-top:10px;color:#8af4ff!important;text-align:center;text-decoration:none;font-size:10px;font-weight:800}
        .antezza-sidebar-calculator__full:hover{text-decoration:underline}
        .antezza-sidebar-calculator__fineprint{display:block;margin-top:12px;color:#839ca5;font-size:9px;line-height:1.45;text-align:center}
        @media(max-width:760px){.antezza-sidebar-calculator__fields{grid-template-columns:1fr}.antezza-sidebar-calculator h2{font-size:20px}}
      `}</style>

      <span className="antezza-sidebar-calculator__eyebrow">Liquor License Financing Tool</span>
      <h2 id="antezza-sidebar-calculator-title">Estimate License Financing</h2>
      <p className="antezza-sidebar-calculator__intro">
        Model an estimated payment for the $495,000 liquor-license component of this listing.
      </p>

      <div className="antezza-sidebar-calculator__fields">
        <label>
          <span>License purchase price</span>
          <input
            type="number"
            min="0"
            step="5000"
            inputMode="decimal"
            value={purchasePrice}
            onChange={(event) => setPurchasePrice(Math.max(0, Number(event.target.value) || 0))}
          />
        </label>
        <label>
          <span>Down payment</span>
          <input
            type="number"
            min="0"
            step="5000"
            inputMode="decimal"
            value={downPayment}
            onChange={(event) => setDownPayment(Math.max(0, Number(event.target.value) || 0))}
          />
        </label>
        <label>
          <span>Interest rate (APR)</span>
          <input
            type="number"
            min="0"
            max="50"
            step="0.01"
            inputMode="decimal"
            value={annualRate}
            onChange={(event) => setAnnualRate(Math.min(50, Math.max(0, Number(event.target.value) || 0)))}
          />
        </label>
        <label>
          <span>Loan term</span>
          <select value={termYears} onChange={(event) => setTermYears(Number(event.target.value) || 10)}>
            <option value={3}>3 years</option>
            <option value={5}>5 years</option>
            <option value={7}>7 years</option>
            <option value={10}>10 years</option>
            <option value={15}>15 years</option>
            <option value={20}>20 years</option>
          </select>
        </label>
      </div>

      <div className="antezza-sidebar-calculator__readonly">
        <span>Amount financed</span>
        <output>{formatCurrency(principal)}</output>
      </div>

      <div className="antezza-sidebar-calculator__payment" aria-live="polite">
        <span>Estimated Monthly Payment</span>
        <strong>{formatCurrency(monthlyPayment, 2)}</strong>
        <small>Estimated principal + interest</small>
      </div>

      <a className="antezza-sidebar-calculator__cta" href="/financing#request-financing">Request Financing</a>
      <a className="antezza-sidebar-calculator__full" href="/financing/loan-payment-calculator">Open Full Loan Calculator →</a>
      <small className="antezza-sidebar-calculator__fineprint">
        Illustrative estimate only. Actual financing is subject to independent lender review, underwriting, collateral eligibility, transaction structure, rates, terms, and approval.
      </small>
    </section>
  );
}

type Props = {
  listingReference: string;
  listingRequested: string;
  listingCounty: string;
  licenseType: string;
  askingPrice: string;
  listingStatus: string;
  listingUrl: string;
  recipientKind?: "broker" | "seller";
};

export default function ListingBrokerInquiryForm({
  listingReference,
  listingRequested,
  listingCounty,
  licenseType,
  askingPrice,
  listingStatus,
  listingUrl,
  recipientKind = "broker",
}: Props) {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [phone, setPhone] = useState("");
  const [calculatorTarget, setCalculatorTarget] = useState<HTMLElement | null>(null);
  const isSeller = recipientKind === "seller";

  useEffect(() => {
    if (listingReference !== "FLLM-ANTEZZA") return;

    const financeCard = document.querySelector<HTMLElement>(
      `[data-featured-broker-listing="${listingReference}"] .marketplace-listing-finance-promo`,
    );
    if (!financeCard) return;

    const selector = `[data-antezza-calculator-slot="${listingReference}"]`;
    let slot = document.querySelector<HTMLElement>(selector);
    const created = !slot;

    if (!slot) {
      slot = document.createElement("div");
      slot.className = "antezza-calculator-slot";
      slot.setAttribute("data-antezza-calculator-slot", listingReference);
      financeCard.insertAdjacentElement("afterend", slot);
    }

    setCalculatorTarget(slot);

    return () => {
      setCalculatorTarget(null);
      if (created && slot?.isConnected) slot.remove();
    };
  }, [listingReference]);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("first_name") ?? "").trim();
    const lastName = String(formData.get("last_name") ?? "").trim();
    formData.set("name", `${firstName} ${lastName}`.trim());

    if (formData.get("_honey")) {
      setStatus("sent");
      form.reset();
      setPhone("");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Unable to submit inquiry");

      setStatus("sent");
      form.reset();
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form className="marketplace-listing-broker-inquiry" onSubmit={submitInquiry}>
        <h3>{isSeller ? "Buyer Message & Contact Center" : "Request Information"}</h3>
        {isSeller && (
          <p className="marketplace-listing-inquiry-intro">
            Send your contact information and message directly to the seller through FLLM.
          </p>
        )}
        <input
          type="hidden"
          name="inquiry_type"
          value={isSeller ? "Self-Directed Seller Listing Inquiry" : "Third-Party Broker Listing Inquiry"}
        />
        <input type="hidden" name="listing_reference" value={listingReference} />
        <input type="hidden" name="listing_requested" value={listingRequested} />
        <input type="hidden" name="listing_county" value={listingCounty} />
        <input type="hidden" name="license_type" value={licenseType} />
        <input type="hidden" name="asking_price" value={askingPrice} />
        <input type="hidden" name="listing_status" value={listingStatus} />
        <input type="hidden" name="listing_url" value={listingUrl} />
        <input className="marketplace-listing-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="marketplace-listing-broker-inquiry-row">
          <label>
            <span>First name</span>
            <input name="first_name" type="text" placeholder="First Name" autoComplete="given-name" required />
          </label>
          <label>
            <span>Last name</span>
            <input name="last_name" type="text" placeholder="Last Name" autoComplete="family-name" required />
          </label>
        </div>
        <div className="marketplace-listing-broker-inquiry-row">
          <label>
            <span>Phone number</span>
            <input
              name="phone"
              type="tel"
              placeholder="(555)555-5555"
              autoComplete="tel-national"
              inputMode="tel"
              maxLength={13}
              value={phone}
              onChange={(event) => setPhone(formatPhoneNumber(event.target.value))}
              required
            />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" placeholder="Email" autoComplete="email" required />
          </label>
        </div>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            placeholder={isSeller ? "Message to the seller" : "Message"}
            rows={6}
            required
          />
        </label>
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : isSeller ? "Send Message to Seller" : "Send Inquiry"}
        </button>
        {status === "sent" && (
          <p className="marketplace-listing-inquiry-status success" role="status">
            {isSeller
              ? "Your contact information and message were sent to the seller and recorded by FLLM."
              : "Your inquiry was sent to the listing broker and recorded by FLLM."}
          </p>
        )}
        {status === "error" && (
          <p className="marketplace-listing-inquiry-status error" role="alert">
            {isSeller
              ? "The message could not be sent. Please try again."
              : "The inquiry could not be sent. Please call the listing broker."}
          </p>
        )}
        <small>
          {isSeller
            ? "By submitting this form, you agree to be contacted by the seller and FLLM regarding this license. FLLM records the inquiry for marketplace lead tracking."
            : "By submitting this form, you agree to be contacted by the listing broker and FLLM regarding this license. FLLM records the inquiry for marketplace lead tracking."}
        </small>
      </form>
      {calculatorTarget ? createPortal(<AntezzaSidebarLoanCalculator />, calculatorTarget) : null}
    </>
  );
}
