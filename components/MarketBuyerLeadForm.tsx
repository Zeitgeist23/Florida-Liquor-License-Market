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
    const notes = String(formData.get("buyer_notes") || "").trim();

    formData.set("name", `${firstName} ${lastName}`.trim());
    formData.set(
      "message",
      [
        `Prospect requested information about ${licenseType} licenses in ${county}.`,
        `Market View context: ${listingReference} — ${listingTitle}.`,
        `Business category shown: ${businessType}.`,
        `Advertised asking price shown on Market View: ${askingPrice}.`,
        notes ? `Prospect notes: ${notes}` : "",
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

      if (!response.ok) throw new Error("Unable to submit license information request");

      setStatus("sent");
      form.reset();
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="business-market-lead-form" onSubmit={submit}>
      <span className="business-market-form-eyebrow">License Information Request</span>
      <h2>Request Information About {licenseType} Licenses in {county}</h2>
      <p>
        If you would like license-specific information about this type of liquor license,
        fill out the form below. FLLM can provide county market information, license-type
        information, and information about available opportunities involving {licenseType}.
      </p>
      <p>
        This request does not imply that FLLM represents the business, seller, broker,
        or any third-party advertisement associated with this Market View.
      </p>

      <input type="hidden" name="inquiry_type" value="License Type Information Request" />
      <input type="hidden" name="preferred_county" value={county} />
      <input type="hidden" name="listing_reference" value={listingReference} />
      <input type="hidden" name="listing_requested" value={listingTitle} />
      <input type="hidden" name="listing_county" value={county} />
      <input type="hidden" name="license_type" value={licenseType} />
      <input type="hidden" name="asking_price" value={askingPrice} />
      <input type="hidden" name="listing_status" value="FLLM Market View — informational market record" />
      <input type="hidden" name="listing_url" value={listingUrl} />
      <input
        className="business-market-honey"
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

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

      <label>
        <span>What license information would you like?</span>
        <textarea
          name="buyer_notes"
          rows={5}
          placeholder="County market value, license availability, financing, transfer requirements, or other questions."
        />
      </label>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Request License Information"}
      </button>

      {status === "sent" ? (
        <p className="business-market-form-status success" role="status">
          Your request was received. FLLM will review the license type and county market information and follow up.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="business-market-form-status error" role="alert">
          The request could not be submitted. Please try again.
        </p>
      ) : null}

      <small>
        FLLM may contact you about {licenseType} market information, county license-value data,
        and available liquor-license opportunities.
      </small>
    </form>
  );
}
