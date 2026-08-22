import type { Metadata } from "next";
import type { CSSProperties } from "react";
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

function NativeAbt6023({ officialPdfUrl }: { officialPdfUrl: string }) {
  const input: CSSProperties = { width: "100%", minHeight: 42, border: "1px solid #8ea2b6", borderRadius: 7, padding: "9px 11px", background: "#f7fbff", color: "#071827", fontSize: 15 };
  const label: CSSProperties = { display: "grid", gap: 6, color: "#d7e7f5", fontWeight: 800, fontSize: 13 };
  const card: CSSProperties = { border: "1px solid #355069", borderRadius: 10, overflow: "hidden", background: "#061522" };
  const head: CSSProperties = { margin: 0, padding: "11px 14px", background: "#c7d4df", color: "#071827", fontSize: 16, fontWeight: 900 };

  return (
    <section className="abt-workspace" aria-label="ABT-6023 browser form workspace">
      <div className="abt-viewer-panel" style={{ display: "grid", gap: 18 }}>
        <div className="abt-viewer-toolbar">
          <div>
            <strong>Browser Fillable DBPR ABT-6023</strong>
            <small>This version does not use an embedded PDF. Tab moves through the fields normally and the checkboxes are standard browser controls.</small>
          </div>
          <div>
            <a className="btn btn-outline" href={officialPdfUrl} target="_blank" rel="noreferrer">View Official DBPR PDF</a>
            <button className="btn btn-outline" type="reset" form="abt6023-native-form">Clear Form</button>
          </div>
        </div>

        <form id="abt6023-native-form" style={{ display: "grid", gap: 16 }}>
          <section style={card}>
            <h3 style={head}>SECTION 1 - REQUESTOR INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={label}>Name of Requestor<input autoFocus name="requestorName" style={input} /></label>
              <label style={label}>Mailing Address<input name="mailingAddress" style={input} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "2fr .7fr 1fr", gap: 12 }}>
                <label style={label}>City<input name="city" style={input} /></label>
                <label style={label}>State<input name="state" maxLength={2} style={input} /></label>
                <label style={label}>ZIP<input name="zip" style={input} /></label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr .5fr", gap: 12 }}>
                <label style={label}>E-mail Address<input name="email" type="email" style={input} /></label>
                <label style={label}>Telephone<input name="telephone" type="tel" style={input} /></label>
                <label style={label}>Ext<input name="telephoneExt" style={input} /></label>
              </div>
              <label style={label}>Contact Person (if applicable)<input name="contactPerson" style={input} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr .5fr 1.5fr", gap: 12 }}>
                <label style={label}>Telephone Number<input name="contactTelephone" type="tel" style={input} /></label>
                <label style={label}>Ext<input name="contactTelephoneExt" style={input} /></label>
                <label style={label}>E-mail Address<input name="contactEmail" type="email" style={input} /></label>
              </div>
            </div>
          </section>

          <section style={card}>
            <h3 style={head}>SECTION 2 - LICENSE INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={label}>License number to be researched<input name="licenseNumber" style={input} /></label>
              <label style={label}>Owner Name<input name="ownerName" style={input} /></label>
              <label style={label}>Business Name (DBA)<input name="businessName" style={input} /></label>
            </div>
          </section>

          <section style={card}>
            <h3 style={head}>SECTION 3 - PAYMENT INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={label}>Check / Money Order Number<input name="checkNumber" style={input} /></label>
              <label style={label}>Lien Account Number (if applicable)<input name="lienAccountNumber" style={input} /></label>
            </div>
          </section>

          <section style={card}>
            <h3 style={head}>REQUEST CHECKLIST</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 8, alignItems: "center", color: "#d7e7f5", fontWeight: 800 }}>
                <input type="checkbox" name="checklistApplication" style={{ width: 18, height: 18 }} />
                Complete DBPR ABT-6023 request
              </label>
              <label style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 8, alignItems: "center", color: "#d7e7f5", fontWeight: 800 }}>
                <input type="checkbox" name="checklistFee" style={{ width: 18, height: 18 }} />
                $20.00 fee included
              </label>
            </div>
          </section>
        </form>

        <p className="abt-viewer-help">
          This browser form avoids Chrome's PDF-viewer failure entirely. Complete it here, use Tab to move field-to-field, click the checkboxes normally, and use your browser's Print command if you want to save a PDF copy. Use the official DBPR PDF button to compare against the current state form before filing.
        </p>
      </div>
    </section>
  );
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
              {form.id === "abt-6002" && (
                <p><a href="/dbpr-abt-6002"><strong>Read the DBPR ABT-6002 Florida liquor license transfer guide →</strong></a></p>
              )}
            </div>
            <aside>
              <span>Last verified</span>
              <strong>{form.lastVerified}</strong>
              <small>Based on the current official DBPR/ABT form and displayed through FLLM.</small>
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

        {form.id === "abt-6023" ? (
          <NativeAbt6023 officialPdfUrl={form.officialPdfUrl} />
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
