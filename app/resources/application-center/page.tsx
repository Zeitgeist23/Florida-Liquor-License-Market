import type { Metadata } from "next";

import FloridaAlcoholLicenseApplicationCenter from "@/components/FloridaAlcoholLicenseApplicationCenter";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { ABT_FORMS, ABT_FORMS_DISCLAIMER } from "@/data/abt-forms";
import "../forms/abt-forms.css";

const canonicalUrl = "https://www.floridaliquorlicensemarket.com/resources/application-center";

export const metadata: Metadata = {
  title: "Florida Alcohol License Application Center | FLLM",
  description:
    "Find the correct Florida alcohol-license application, complete the current official DBPR/ABT form, and generate an FLLM Application Preparation Packet.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Alcohol License Application Center",
    description: "Find the correct official ABT form and prepare a professional FLLM application packet.",
    siteName: "Florida Liquor License Market",
  },
};

export default function FloridaAlcoholLicenseApplicationCenterPage() {
  return (
    <main className="abt-forms-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="abt-forms-hero">
        <div className="page-shell">
          <span className="abt-eyebrow">Florida licensing · official forms · guided preparation</span>
          <h1>Florida Alcohol License Application Center</h1>
          <p>
            Tell FLLM what you need to accomplish. The Application Center identifies the corresponding official Florida form, opens a guided completion workspace and creates a professional preparation packet for your filing file.
          </p>
          <div className="abt-hero-assurances" aria-label="Form service benefits">
            <span>✓ Find the correct form</span>
            <span>✓ Current official PDFs</span>
            <span>✓ Guided browser completion</span>
            <span>✓ FLLM preparation packet</span>
          </div>
        </div>
      </section>

      <div className="page-shell application-center-shell">
        <FloridaAlcoholLicenseApplicationCenter forms={ABT_FORMS} />
      </div>

      <section className="abt-forms-content page-shell" aria-labelledby="application-form-library-heading">
        <div className="abt-section-heading">
          <div>
            <span>Official form library</span>
            <h2 id="application-form-library-heading">Or browse all supported ABT forms</h2>
          </div>
          <p>
            Each workspace loads the current official document through Florida Liquor License Market. The form pages retain the government headings, certifications and signature language required for filing.
          </p>
        </div>

        <div className="abt-form-card-grid">
          {ABT_FORMS.map((form) => (
            <article className={form.featured ? "abt-form-card is-featured" : "abt-form-card"} key={form.id}>
              <div className="abt-card-topline">
                <span>{form.formNumber}</span>
                {form.featured && <b>Most Used</b>}
              </div>
              <h3>{form.shortTitle}</h3>
              <p>{form.description}</p>
              <ul>
                {form.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
              </ul>
              <div className="abt-card-meta">Current official form · Last verified {form.lastVerified}</div>
              <div className="abt-card-actions">
                <a
                  className="btn btn-gold"
                  href={form.id === "abt-6002" ? "/dbpr-abt-6002" : `/resources/forms/${form.id}`}
                >
                  {form.id === "abt-6002" ? "ABT-6002 Guide & Form" : "Complete Official Form"}
                </a>
                <a
                  className="btn btn-outline"
                  href={form.id === "abt-6023" ? "/abt-forms/abt-6023.pdf" : `/api/abt-forms/${form.id}/pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {form.id === "abt-6023" ? "View Interactive Blank Form" : "View Blank Form"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="abt-how-it-works">
        <div className="page-shell">
          <div className="abt-section-heading compact">
            <div><span>From question to filing file</span><h2>How the FLLM Application Center works</h2></div>
          </div>
          <div className="abt-process-grid">
            <article><b>1</b><span><strong>Describe the filing purpose</strong><small>Choose the action you need to complete instead of guessing at a form number.</small></span></article>
            <article><b>2</b><span><strong>Complete the official form</strong><small>Use the guided FLLM workspace while retaining the current government document.</small></span></article>
            <article><b>3</b><span><strong>Generate the FLLM packet</strong><small>Add a branded cover, preparation checklist and document index to the official form.</small></span></article>
            <article><b>4</b><span><strong>Review and file with DBPR</strong><small>Add required signatures, attachments and fees, then submit through the official channel.</small></span></article>
          </div>
        </div>
      </section>

      <section className="abt-disclaimer page-shell" aria-label="Legal disclaimer">
        <strong>Important notice</strong>
        <p>{ABT_FORMS_DISCLAIMER}</p>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="mailto:listings@floridaliquorlicensemarket.com">listings@floridaliquorlicensemarket.com</a>
        </div>
      </footer>
    </main>
  );
}
