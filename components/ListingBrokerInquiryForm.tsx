"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

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
          <span>Full name</span>
          <input name="name" type="text" placeholder="Full Name" autoComplete="name" required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" placeholder="Phone" autoComplete="tel" required />
        </label>
      </div>
      <label>
        <span>Email</span>
        <input name="email" type="email" placeholder="Email" autoComplete="email" required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" placeholder="Message" rows={3} required />
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
