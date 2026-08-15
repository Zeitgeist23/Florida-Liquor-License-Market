import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { ABT_FORMS, ABT_FORMS_DISCLAIMER } from "@/data/abt-forms";
import "./abt-forms.css";

export const metadata: Metadata = {
  title: "Florida ABT Forms | Florida Liquor License Market",
  description:
    "Complete, review, download, and print commonly used Florida DBPR Division of Alcoholic Beverages and Tobacco forms without leaving Florida Liquor License Market.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/resources/forms" },
  robots: { index: true, follow: true },
};

export default function FloridaAbtFormsPage() {
  return (
    <main className="abt-forms-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="abt-forms-hero">
        <div className="page-shell">
          <span className="abt-eyebrow">Resources · Official Florida Forms</span>
          <h1>Florida ABT Forms</h1>
          <p>
            Complete commonly used Florida alcoholic-beverage licensing forms through a guided FLLM workspace, then review, download, and print the completed official PDF.
          </p>
          <div className="abt-hero-assurances" aria-label="Form service benefits">
            <span>✓ Stay on FLLM</span>
            <span>✓ Current official PDFs</span>
            <span>✓ Private browser-based completion</span>
            <span>✓ Print or download</span>
          </div>
        </div>
      </section>

      <section className="abt-forms-content page-shell" aria-labelledby="forms-heading">
        <div className="abt-section-heading">
          <div>
            <span>Seven frequently used applications</span>
            <h2 id="forms-heading">Choose a form to begin</h2>
          </div>
          <p>
            Each workspace loads the current official document through Florida Liquor License Market. Your answers are processed locally in your browser and are not submitted to FLLM.
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
                <a className="btn btn-gold" href={form.id === "abt-6002" ? "/dbpr-abt-6002" : `/resources/forms/${form.id}`}>
                  {form.id === "abt-6002" ? "ABT-6002 Guide & Form" : "Complete Form Online"}
                </a>
                <a className="btn btn-outline" href={`/api/abt-forms/${form.id}/pdf`} target="_blank" rel="noreferrer">View Blank Form</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="abt-how-it-works">
        <div className="page-shell">
          <div className="abt-section-heading compact">
            <div><span>Simple preparation process</span><h2>How it works</h2></div>
          </div>
          <div className="abt-process-grid">
            <article><b>1</b><span><strong>Select the correct form</strong><small>Review the purpose and common uses before beginning.</small></span></article>
            <article><b>2</b><span><strong>Complete the official fields</strong><small>Use the guided filler or type directly in the official PDF viewer.</small></span></article>
            <article><b>3</b><span><strong>Review the completed PDF</strong><small>Confirm names, license numbers, addresses, and disclosures.</small></span></article>
            <article><b>4</b><span><strong>Print, sign, and submit</strong><small>Add required notarizations, attachments, and filing fees.</small></span></article>
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
