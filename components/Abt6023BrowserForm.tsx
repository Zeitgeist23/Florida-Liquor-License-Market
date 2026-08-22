export default function Abt6023BrowserForm({ officialPdfUrl }: { officialPdfUrl: string }) {
  return (
    <section className="abt-workspace" aria-label="ABT-6023 browser form workspace">
      <div className="abt-guided-panel" id="abt-6023-browser-form-wrap">
        <div className="abt-progress-heading">
          <div>
            <span>Browser-based form</span>
            <h2>Complete DBPR ABT-6023 without the PDF viewer</h2>
          </div>
          <strong>100%</strong>
        </div>
        <div className="abt-progress-track"><i style={{ width: "100%" }} /></div>

        <p className="abt-viewer-help">
          This version uses standard browser fields instead of an embedded PDF. Tab moves naturally from one field to the next and the checkboxes can be clicked normally.
        </p>

        <form id="abt-6023-browser-form" className="abt-field-grid">
          <label className="abt-field">
            <span><strong>Name of Requestor</strong></span>
            <input name="requestorName" type="text" autoComplete="name" />
          </label>
          <label className="abt-field">
            <span><strong>Mailing Address</strong></span>
            <input name="mailingAddress" type="text" autoComplete="street-address" />
          </label>
          <label className="abt-field">
            <span><strong>City</strong></span>
            <input name="city" type="text" autoComplete="address-level2" />
          </label>
          <label className="abt-field">
            <span><strong>State</strong></span>
            <input name="state" type="text" maxLength={2} autoComplete="address-level1" />
          </label>
          <label className="abt-field">
            <span><strong>ZIP</strong></span>
            <input name="zip" type="text" autoComplete="postal-code" />
          </label>
          <label className="abt-field">
            <span><strong>E-mail Address</strong></span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label className="abt-field">
            <span><strong>Telephone</strong></span>
            <input name="telephone" type="tel" autoComplete="tel" />
          </label>
          <label className="abt-field">
            <span><strong>Telephone Ext.</strong></span>
            <input name="telephoneExt" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Contact Person (if applicable)</strong></span>
            <input name="contactPerson" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Contact Telephone</strong></span>
            <input name="contactTelephone" type="tel" />
          </label>
          <label className="abt-field">
            <span><strong>Contact Telephone Ext.</strong></span>
            <input name="contactTelephoneExt" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Contact E-mail Address</strong></span>
            <input name="contactEmail" type="email" />
          </label>
          <label className="abt-field">
            <span><strong>License number to be researched</strong></span>
            <input name="licenseNumber" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Owner Name</strong></span>
            <input name="ownerName" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Business Name (DBA)</strong></span>
            <input name="businessName" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Check / Money Order Number</strong></span>
            <input name="checkNumber" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Lien Account Number (if applicable)</strong></span>
            <input name="lienAccountNumber" type="text" />
          </label>
          <label className="abt-field abt-checkbox-field">
            <input name="checklistApplication" type="checkbox" />
            <span><strong>Complete DBPR ABT-6023 request</strong></span>
          </label>
          <label className="abt-field abt-checkbox-field">
            <input name="checklistFee" type="checkbox" />
            <span><strong>$20.00 fee included</strong></span>
          </label>
        </form>

        <div className="abt-step-actions">
          <button className="btn btn-outline" type="reset" form="abt-6023-browser-form">Clear Form</button>
          <a className="btn btn-gold" href={officialPdfUrl} target="_blank" rel="noreferrer">Review Official DBPR PDF</a>
        </div>

        <p className="abt-viewer-help">
          The FLLM browser form is provided for administrative convenience. Before filing, compare the completed information with the current official DBPR ABT-6023 and follow DBPR/ABT submission and fee requirements.
        </p>
      </div>
    </section>
  );
}
