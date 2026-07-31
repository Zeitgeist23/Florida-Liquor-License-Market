import type { Metadata } from "next";

import AttorneyDirectoryApplicationForm from "@/components/AttorneyDirectoryApplicationForm";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../../forms/abt-forms.css";
import "../liquor-license-attorneys.css";

export const metadata: Metadata = {
  title: "Apply to the Florida Liquor License Attorney Directory | FLLM",
  description:
    "Submit a Florida liquor license attorney profile for independent review and possible inclusion in the Florida Liquor License Market attorney directory.",
};

export default function AttorneyDirectoryApplicationPage() {
  return (
    <main className="attorney-directory-page attorney-application-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="attorney-application-hero">
        <div className="page-shell">
          <nav className="attorney-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/resources/liquor-license-attorneys">Attorney Directory</a>
            <span>›</span>
            <b>Apply</b>
          </nav>
          <span className="attorney-eyebrow">Professional directory application</span>
          <h1>Join the Florida Liquor License Attorney Directory</h1>
          <p>
            Florida attorneys whose practices include alcoholic-beverage licensing, liquor-license
            transactions, transfers, or related closings may submit their professional information
            for FLLM review.
          </p>
        </div>
      </section>

      <section className="attorney-application-layout page-shell">
        <aside className="attorney-application-sidebar">
          <span>How review works</span>
          <h2>Publication is moderated</h2>
          <ol>
            <li>Complete the professional application.</li>
            <li>FLLM reviews the submitted information and public Florida Bar record.</li>
            <li>FLLM may request corrections or supporting information.</li>
            <li>Approved profiles are formatted and added to the public directory.</li>
          </ol>
          <div>
            <strong>No automatic publication</strong>
            <p>
              Submitting an application does not create a listing and does not guarantee acceptance
              or placement.
            </p>
          </div>
        </aside>

        <AttorneyDirectoryApplicationForm />
      </section>

      <section className="attorney-disclosure page-shell" aria-label="Application disclaimer">
        <strong>Directory application disclosure</strong>
        <p>
          Florida Liquor License Market is not a law firm, lawyer-referral service, or credentialing
          authority. FLLM may verify submitted information using public records and firm websites,
          request supporting information, edit directory copy for style or clarity, decline an
          application, or remove a profile. Inclusion does not constitute endorsement,
          certification, ranking, or a guarantee of qualifications or results. Applicants remain
          responsible for the accuracy of their information and for compliance with all applicable
          professional and advertising rules.
        </p>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="/resources/liquor-license-attorneys">Return to the Attorney Directory</a>
        </div>
      </footer>
    </main>
  );
}

