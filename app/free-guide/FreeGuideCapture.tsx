"use client";

import { FormEvent, useState } from "react";

const downloadFilename = "FLLM_Official_Buyers_and_Sellers_Guide_2026.pdf";

type FormStatus = "idle" | "sending" | "sent" | "error";

function trackedDownloadUrl(action: string) {
  const params = new URLSearchParams({
    source: "free-guide",
    action,
  });

  if (typeof window !== "undefined") {
    params.set("source_page", window.location.pathname);

    const pageParams = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const value = pageParams.get(key);
      if (value) params.set(key, value);
    }

    if (document.referrer) params.set("entry_referrer", document.referrer);
  }

  return `/api/guide-download?${params.toString()}`;
}

async function fallbackSubmission(formData: FormData) {
  formData.set("_template", "table");
  formData.set("_captcha", "false");
  const response = await fetch(
    "https://formsubmit.co/ajax/listings@floridaliquorlicensemarket.com",
    { method: "POST", body: formData, headers: { Accept: "application/json" } },
  );
  if (!response.ok) throw new Error("Unable to submit the guide request.");
}

export default function FreeGuideCapture() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const interest = String(formData.get("guide_interest") || "").trim();

    formData.set("inquiry_type", "Free Buyer’s and Seller’s Guide");
    formData.set("message", `Requested the 2026 FLLM Buyer’s and Seller’s Guide. Interest: ${interest}.`);
    formData.set("_subject", `FLLM Guide Request — ${name}`);

    try {
      const response = await fetch("/api/inquiry", { method: "POST", body: formData });
      if (!response.ok) await fallbackSubmission(formData);
      setStatus("sent");
      form.reset();

      const link = document.createElement("a");
      link.href = trackedDownloadUrl("automatic-after-form");
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit the guide request.");
    }
  }

  if (status === "sent") {
    return (
      <div className="guide-success" role="status">
        <strong>Your guide is ready.</strong>
        <p>The download should begin automatically. You can also use the button below.</p>
        <a href={trackedDownloadUrl("manual-after-form")} download={downloadFilename}>Download the free guide</a>
      </div>
    );
  }

  return (
    <form className="guide-capture" onSubmit={handleSubmit}>
      <div className="guide-form-heading">
        <span>Free instant download</span>
        <h2>Send me the guide</h2>
      </div>

      <div className="guide-form-grid">
        <label>
          <span>Full name *</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email address *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>I am primarily a… *</span>
          <select name="guide_interest" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Buyer</option>
            <option>Seller</option>
            <option>License applicant</option>
            <option>Investor or lender</option>
            <option>Broker, attorney or adviser</option>
          </select>
        </label>
        <label className="guide-county-field">
          <span>Preferred Florida county</span>
          <input name="preferred_county" type="text" placeholder="Optional" />
        </label>
      </div>

      <label className="guide-consent">
        <input name="guide_consent" type="checkbox" required />
        <span>I agree to receive the guide and permit FLLM to contact me about relevant Florida liquor-license services. *</span>
      </label>
      <input className="guide-honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === "error" && <p className="guide-error" role="alert">{error}</p>}
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Preparing your guide…" : "Get the free guide"}
      </button>
      <small>Your information is kept confidential and is not sold.</small>
    </form>
  );
}
