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
          <section className="abt-workspace" aria-label="ABT-6023 browser form workspace">
            <div className="abt-viewer-panel">
              <div className="abt-viewer-toolbar">
                <div>
                  <strong>Browser Fillable DBPR ABT-6023</strong>
                  <small>No PDF viewer is used here. Tab moves through the fields normally and the checkboxes are standard browser controls.</small>
                </div>
                <div>
                  <a className="btn btn-outline" href={form.officialPdfUrl} target="_blank" rel="noreferrer">View Official DBPR PDF</a>
                  <button className="btn btn-outline" type="reset" form="abt6023-native-form">Clear Form</button>
                </div>
              </div>

              <form id="abt6023-native-form" style={{ display: "grid", gap: 14, padding: 20 }}>
                <fieldset style={{ display: "grid", gap: 12, border: "1px solid #365067", borderRadius: 8, padding: 16 }}>
                  <legend style={{ color: "#f6a700", fontWeight: 900 }}>SECTION 1 - REQUESTOR INFORMATION</legend>
                  <label>Name of Requestor<input name="requestorName" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  <label>Mailing Address<input name="mailingAddress" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr .7fr 1fr", gap: 10 }}>
                    <label>City<input name="city" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                    <label>State<input name="state" maxLength={2} style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                    <label>ZIP<input name="zip" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr .5fr", gap: 10 }}>
                    <label>E-mail Address<input name="email" type="email" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                    <label>Telephone<input name="telephone" type="tel" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                    <label>Ext<input name="telephoneExt" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  </div>
                  <label>Contact Person (if applicable)<input name="contactPerson" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr .5fr 1.5fr", gap: 10 }}>
                    <label>Telephone Number<input name="contactTelephone" type="tel" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                    <label>Ext<input name="contactTelephoneExt" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                    <label>E-mail Address<input name="contactEmail" type="email" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  </div>
                </fieldset>

                <fieldset style={{ display: "grid", gap: 12, border: "1px solid #365067", borderRadius: 8, padding: 16 }}>
                  <legend style={{ color: "#f6a700", fontWeight: 900 }}>SECTION 2 - LICENSE INFORMATION</legend>
                  <label>License number to be researched<input name="licenseNumber" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  <label>Owner Name<input name="ownerName" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  <label>Business Name (DBA)<input name="businessName" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                </fieldset>

                <fieldset style={{ display: "grid", gap: 12, border: "1px solid #365067", borderRadius: 8, padding: 16 }}>
                  <legend style={{ color: "#f6a700", fontWeight: 900 }}>SECTION 3 - PAYMENT INFORMATION</legend>
                  <label>Check / Money Order Number<input name="checkNumber" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                  <label>Lien Account Number (if applicable)<input name="lienAccountNumber" style={{ width: "100%", minHeight: 40, padding: "8px 10px" }} /></label>
                </fieldset>

                <fieldset style={{ display: "grid", gap: 12, border: "1px solid #365067", borderRadius: 8, padding: 16 }}>
                  <legend style={{ color: "#f6a700", fontWeight: 900 }}>REQUEST CHECKLIST</legend>
                  <label><input type="checkbox" name="checklistApplication" /> Complete DBPR ABT-6023 request</label>
                  <label><input type="checkbox" name="checklistFee" /> $20.00 fee included</label>
                </fieldset>
              </form>

              <p className="abt-viewer-help">
                This browser form avoids Chrome's embedded-PDF failure entirely. Complete it here, use Tab to move field-to-field, click the checkboxes normally, and use your browser's Print command if you want to save a PDF copy. Use the official DBPR PDF button to compare against the current state form before filing.
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
