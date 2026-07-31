"use client";

import { FormEvent, useState } from "react";

const serviceOptions = [
  "Liquor-license purchases and sales",
  "ABT applications, transfers, and temporary licenses",
  "Purchase agreements, escrow, and transaction closings",
  "Alcohol-beverage regulatory compliance",
  "Due diligence, liens, and ownership review",
  "Hospitality mergers and acquisitions",
  "Administrative hearings and enforcement matters",
] as const;

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success"; reference: string };

export default function AttorneyDirectoryApplicationForm() {
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmission({ status: "submitting" });

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      if (data.getAll("services").length === 0) {
        throw new Error("Please select at least one liquor-license service.");
      }

      const response = await fetch("/api/attorney-directory-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          firm: data.get("firm"),
          barNumber: data.get("barNumber"),
          email: data.get("email"),
          phone: data.get("phone"),
          city: data.get("city"),
          counties: data.get("counties"),
          website: data.get("website"),
          portraitUrl: data.get("portraitUrl"),
          biography: data.get("biography"),
          services: data.getAll("services"),
          additionalInformation: data.get("additionalInformation"),
          attorneyCertification: data.get("attorneyCertification") === "accepted",
          publicationConsent: data.get("publicationConsent") === "accepted",
          reviewAgreement: data.get("reviewAgreement") === "accepted",
          honey: data.get("companyFax"),
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        reference?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok || !payload.reference) {
        throw new Error(payload.error || "We could not submit the application.");
      }

      form.reset();
      setSubmission({ status: "success", reference: payload.reference });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmission({
        status: "error",
        message: error instanceof Error ? error.message : "We could not submit the application.",
      });
    }
  }

  if (submission.status === "success") {
    return (
      <section className="attorney-application-success" aria-live="polite">
        <span>Application received</span>
        <h2>Thank you for applying to the directory.</h2>
        <p>
          FLLM will review the submitted information and independently verify the Florida Bar
          record before making a publication decision. Submission does not guarantee inclusion.
        </p>
        <div>
          <strong>Application reference</strong>
          <b>{submission.reference}</b>
        </div>
        <a className="btn btn-gold" href="/resources/liquor-license-attorneys">
          Return to the Attorney Directory
        </a>
      </section>
    );
  }

  return (
    <form className="attorney-application-form" onSubmit={submitApplication}>
      <div className="attorney-form-heading">
        <span>Attorney information</span>
        <h2>Tell us about your practice</h2>
        <p>Fields marked with an asterisk are required.</p>
      </div>

      <div className="attorney-form-grid">
        <label>
          <span>Attorney’s full name *</span>
          <input name="fullName" autoComplete="name" maxLength={120} required />
        </label>
        <label>
          <span>Law firm *</span>
          <input name="firm" autoComplete="organization" maxLength={160} required />
        </label>
        <label>
          <span>Florida Bar number *</span>
          <input
            name="barNumber"
            inputMode="numeric"
            maxLength={12}
            placeholder="Example: 123456"
            required
          />
        </label>
        <label>
          <span>Professional email *</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label>
          <span>Public phone number *</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} required />
        </label>
        <label>
          <span>Primary Florida office city *</span>
          <input name="city" autoComplete="address-level2" maxLength={100} required />
        </label>
        <label className="attorney-form-wide">
          <span>Counties or service area *</span>
          <input
            name="counties"
            maxLength={300}
            placeholder="Example: Statewide, with offices in Tampa and Miami"
            required
          />
        </label>
        <label className="attorney-form-wide">
          <span>Attorney or firm profile URL *</span>
          <input
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://www.yourfirm.com/attorneys/your-name"
            maxLength={500}
            required
          />
          <small>This page should support the practice information submitted below.</small>
        </label>
        <label className="attorney-form-wide">
          <span>Professional portrait URL</span>
          <input
            name="portraitUrl"
            type="url"
            inputMode="url"
            placeholder="https://www.yourfirm.com/images/your-photo.jpg"
            maxLength={500}
          />
          <small>
            Optional. Provide a publicly accessible portrait from your firm’s website and confirm
            below that FLLM may display it.
          </small>
        </label>
      </div>

      <fieldset className="attorney-service-fieldset">
        <legend>Liquor-license services offered *</legend>
        <p>Select every service that accurately describes your practice.</p>
        <div className="attorney-service-options">
          {serviceOptions.map((service) => (
            <label key={service}>
              <input name="services" type="checkbox" value={service} />
              <span>{service}</span>
            </label>
          ))}
        </div>
        <small className="attorney-service-help">
          At least one selection is required.
        </small>
      </fieldset>

      <div className="attorney-form-grid">
        <label className="attorney-form-wide">
          <span>Professional biography *</span>
          <textarea
            name="biography"
            rows={6}
            maxLength={1600}
            placeholder="Briefly describe your alcoholic-beverage licensing and transaction experience."
            required
          />
        </label>
        <label className="attorney-form-wide">
          <span>Additional information</span>
          <textarea
            name="additionalInformation"
            rows={4}
            maxLength={1200}
            placeholder="Languages, additional offices, preferred contact method, or other relevant information."
          />
        </label>
      </div>

      <fieldset className="attorney-certification-fieldset">
        <legend>Required certifications</legend>
        <label>
          <input
            name="attorneyCertification"
            type="checkbox"
            value="accepted"
            required
          />
          <span>
            I certify that I am the named attorney or am authorized by the attorney and firm to
            submit this application, and that the information is accurate.
          </span>
        </label>
        <label>
          <input name="publicationConsent" type="checkbox" value="accepted" required />
          <span>
            I authorize FLLM to verify and display the submitted professional information,
            website link, and portrait, and I represent that I have permission to provide them.
          </span>
        </label>
        <label>
          <input name="reviewAgreement" type="checkbox" value="accepted" required />
          <span>
            I understand that submission does not guarantee publication, FLLM may request
            corrections or decline an application, and directory inclusion is not an endorsement.
          </span>
        </label>
      </fieldset>

      <label className="attorney-honeypot" aria-hidden="true">
        Company fax
        <input name="companyFax" tabIndex={-1} autoComplete="off" />
      </label>

      {submission.status === "error" && (
        <div className="attorney-form-error" role="alert">
          {submission.message}
        </div>
      )}

      <div className="attorney-form-submit">
        <button
          className="btn btn-gold"
          type="submit"
          disabled={submission.status === "submitting"}
        >
          {submission.status === "submitting" ? "Submitting Application…" : "Submit for FLLM Review"}
        </button>
        <p>
          Your application will remain unpublished while FLLM reviews the information and Florida
          Bar record.
        </p>
      </div>
    </form>
  );
}

