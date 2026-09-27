"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)})${digits.slice(3)}`;
  return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
}

type Props = {
  listingReference: string;
  listingTitle: string;
  county: string;
  businessType: string;
  licenseType: string;
  askingPrice: string;
  listingUrl: string;
};

export default function MarketBuyerLeadForm({
  listingReference,
  listingTitle,
  county,
  businessType,
  licenseType,
  askingPrice,
  listingUrl,
}: Props) {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [phone, setPhone] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("first_name") || "").trim();
    const lastName = String(formData.get("last_name") || "").trim();
    const budget = String(formData.get("budget_range") || "").trim();
    const financing = String(formData.get("financing_needed") || "").trim();
    const notes = String(formData.get("buyer_notes") || "").trim();

    formData.set("name", `${firstName} ${lastName}`.trim());
    formData.set(
      "message",
      [
        `Buyer requested matching opportunities for: ${businessType} in ${county}.`,
        `Market record: ${listingReference} — ${listingTitle}.`,
        `Budget range: ${budget || "Not specified"}.`,
        `Financing: ${financing || "Not specified"}.`,
        notes ? `Buyer notes: ${notes}` : "",
      ].filter(Boolean).join("\n"),
    );

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

      if (!response.ok) throw new Error("Unable to submit buyer match request");

      setStatus("sent");
      form.reset();
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="business-market-lead-form" onSubmit={submit}>
      <span className="business-market-form-eyebrow">Buyer Match Request</span>
      <h2>Looking for a {businessType} in {county}?</h2>
      <p>
        Tell FLLM your budget and what you want to buy. We’ll use the Lead Match Desk
        to identify matching opportunities in this market.
      </p>

      <input type="hidden" name="inquiry_type" value="Business Market Buyer Match" />
      <input type="hidden" name="preferred_county" value={county} />
      <input type="hidden" name="listing_reference" value={listingReference} />
      <input type="hidden" name="listing_requested" value={listingTitle} />
      <input type="hidden" name="listing_county" value={county} />
      <input type="hidden" name="license_type" value={licenseType} />
      <input type="hidden" name="asking_price" value={askingPrice} />
      <input type="hidden" name="listing_status" value="Market record — availability requires confirmation" />
      <input type="hidden" name="listing_url" value={listingUrl} />
      <input className="business-market-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="business-market-form-row">
        <label>
          <span>First name</span>
          <input name="first_name" type="text" autoComplete="given-name" required />
        </label>
        <label>
          <span>Last name</span>
          <input name="last_name" type="text" autoComplete="family-name" required />
        </label>
      </div>

      <div className="business-market-form-row">
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            maxLength={13}
            value={phone}
            onChange={(event) => setPhone(formatPhoneNumber(event.target.value))}
            required
          />
        </label>
      </div>

      <div className="business-market-form-row">
        <label>
          <span>Budget range</span>
          <select name="budget_range" defaultValue="">
            <option value="">Select budget</option>
            <option>Under $250,000</option>
            <option>$250,000–$500,000</option>
            <option>$500,000–$1,000,000</option>
            <option>$1,000,000–$2,000,000</option>
            <option>Over $2,000,000</option>
          </select>
        </label>
        <label>
          <span>Financing</span>
          <select name="financing_needed" defaultValue="">
            <option value="">Select financing</option>
            <option>Cash / no financing needed</option>
            <option>SBA 7(a) financing</option>
            <option>Conventional financing</option>
            <option>Seller financing preferred</option>
            <option>Need financing guidance</option>
            <option>Unsure</option>
          </select>
        </label>
      </div>

      <label>
        <span>What are you looking for?</span>
        <textarea
          name="buyer_notes"
          rows={5}
          placeholder="Preferred city, size, concept, timing, real-estate preference, or other requirements."
        />
      </label>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Show Me Matching Opportunities"}
      </button>

      {status === "sent" ? (
        <p className="business-market-form-status success" role="status">
          Your request was received. FLLM will use your preferences to identify matching opportunities.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="business-market-form-status error" role="alert">
          The request could not be submitted. Please try again.
        </p>
      ) : null}

      <small>
        FLLM may contact you about matching business and liquor-license opportunities. Market availability and pricing can change.
      </small>
    </form>
  );
}
