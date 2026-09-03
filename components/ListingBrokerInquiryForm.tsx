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
  listingRequested: string;
  listingCounty: string;
  licenseType: string;
  askingPrice: string;
  listingStatus: string;
  listingUrl: string;
};

export default function ListingBrokerInquiryForm({
  listingReference,
  listingRequested,
  listingCounty,
  licenseType,
  askingPrice,
  listingStatus,
  listingUrl,
}: Props) {
  const [status, setStatus] = useState<SubmitState>("idle");

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
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="marketplace-listing-broker-inquiry" onSubmit={submitInquiry}>
      <h3>Request Information</h3>
      <input type="hidden" name="inquiry_type" value="Third-Party Broker Listing Inquiry" />
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
            onInput={(event) => {
              event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
            }}
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
        <textarea name="message" placeholder="Message" rows={6} required />
      </label>
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </button>
      {status === "sent" && <p className="marketplace-listing-inquiry-status success" role="status">Your inquiry was sent to FLLM and the listing broker.</p>}
      {status === "error" && <p className="marketplace-listing-inquiry-status error" role="alert">The inquiry could not be sent. Please call the listing broker.</p>}
      <small>By submitting this form, you agree to be contacted by FLLM and the listing broker regarding this license.</small>
    </form>
  );
}
