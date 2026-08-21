import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AbtPdfFormWorkspace from "@/components/AbtPdfFormWorkspace";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { ABT_FORMS, ABT_FORMS_DISCLAIMER, getAbtForm } from "@/data/abt-forms";
import "../abt-forms.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return ABT_FORMS.map((form) => ({ formId: form.id }));
}

export async function generateMetadata(
  context: { params: Promise<{ formId: string }> }
): Promise<Metadata> {
  const { formId } = await context.params;
  const form = getAbtForm(formId.toLowerCase());
  if (!form) return { title: "Florida ABT Form | Florida Liquor License Market" };

  if (form.id === "abt-6002") {
    return {
      title: "Complete DBPR ABT-6002 | Florida Transfer Form Workspace",
      description:
        "Complete, review, download and print the official DBPR ABT-6002 Florida alcoholic beverage license transfer-of-ownership form through FLLM's guided workspace.",
      alternates: { canonical: `${siteUrl}/dbpr-abt-6002` },
      robots: { index: false, follow: true },
    };
  }

  const canonicalUrl = `${siteUrl}/resources/forms/${form.id}`;
  return {
    title: `${form.formNumber}: ${form.shortTitle} | Florida Liquor License Market`,
    description: `${form.description} Complete, review, download, and print the official PDF through Florida Liquor License Market.`,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
  };
}

export default async function FloridaAbtFormWorkspacePage(
  context: {
    params: Promise<{ formId: string }>;
    searchParams: Promise<{ transactionId?: string }>;
  }
) {
  const { formId } = await context.params;
  const { transactionId } = await context.searchParams;
  const form = getAbtForm(formId.toLowerCase());
  if (!form) notFound();

  const isAbt6023 = form.id === "abt-6023";
  const abt6023PdfPath = "/api/abt-forms/abt-6023/pdf";
  const abt6023ViewerPath = `${abt6023PdfPath}?v=20260821-2`;

  return (
    <main className="abt-forms-page abt-single-form-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="abt-form-title-band">
        <div className="page-shell">
          <nav className="abt-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span>›</span><a href="/resources/forms">Florida ABT Forms</a><span>›</span><b>{form.formNumber}</b>
          </nav>
          <div className="abt-title-grid">
            <div>
              <span className="abt-eyebrow">Current official Florida form</span>
              <h1>{form.formNumber}</h1>
              <h2>{form.title}</h2>
              <p>{form.description}</p>
              {form.id === "abt-6002" && (
                <p>
                  <a href="/dbpr-abt-6002"><strong>Read the DBPR ABT-6002 Florida liquor license transfer guide →</strong></a>
                </p>
              )}
            </div>
            <aside>
              <span>Last verified</span>
              <strong>{form.lastVerified}</strong>
              <small>Loaded from the current official DBPR/ABT PDF source and displayed through FLLM.</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="abt-single-content page-shell">
        <div className="abt-preparation-callout">
          <div>
            <span>Before you begin</span>
            <h2>Gather the information and attachments required for your transaction.</h2>
          </div>
          <ul>{form.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}</ul>
        </div>

        {isAbt6023 ? (
          <section className="abt-workspace" aria-label={`${form.formNumber} PDF workspace`}>
            <div className="abt-viewer-panel">
              <div className="abt-viewer-toolbar">
                <div>
                  <strong>Official {form.formNumber}</strong>
                  <small>View the current DBPR form directly in your browser.</small>
                </div>
                <div>
                  <a className="btn btn-outline" href={abt6023ViewerPath} target="_blank" rel="noreferrer">Open Full Page</a>
                  <a className="btn btn-gold" href={`${abt6023PdfPath}?download=1`}>Download Form</a>
                </div>
              </div>
              <iframe
                src={`${abt6023ViewerPath}#toolbar=1&navpanes=0`}
                title={`${form.formNumber} PDF`}
              />
              <p className="abt-viewer-help">
                This viewer loads the current official DBPR/ABT form through FLLM. Use the PDF toolbar to save, print, or download a copy. If the embedded viewer is unavailable, use Open Full Page above.
              </p>
            </div>
          </section>
        ) : (
          <AbtPdfFormWorkspace form={form} projectTransactionId={transactionId || null} />
        )}
      </section>

      <section className="abt-disclaimer page-shell" aria-label="Legal disclaimer">
        <strong>Important notice</strong>
        <p>{ABT_FORMS_DISCLAIMER}</p>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="/resources/forms">Return to Florida ABT Forms</a>
        </div>
      </footer>
    </main>
  );
}
