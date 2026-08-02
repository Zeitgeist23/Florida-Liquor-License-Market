import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AbtPdfFormWorkspace from "@/components/AbtPdfFormWorkspace";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { ABT_FORMS, ABT_FORMS_DISCLAIMER, getAbtForm } from "@/data/abt-forms";
import "../abt-forms.css";

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

  return {
    title: `${form.formNumber}: ${form.shortTitle} | Florida Liquor License Market`,
    description: `${form.description} Complete, review, download, and print the official PDF through Florida Liquor License Market.`,
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

        <AbtPdfFormWorkspace form={form} projectTransactionId={transactionId || null} />
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
