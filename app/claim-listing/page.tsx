import Link from "next/link";
import styles from "./claim-listing.module.css";

type ClaimPageProps = {
  searchParams?: { listing?: string };
};

export default function ClaimListingPage({ searchParams }: ClaimPageProps) {
  const listingId = searchParams?.listing ?? "";

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>FLORIDA LIQUOR LICENSE MARKET</Link>
        <Link href="/listings" className={styles.back}>BACK TO LISTINGS</Link>
      </header>

      <section className={styles.shell}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>BROKER & OWNER VERIFICATION</p>
          <h1>Claim this listing.</h1>
          <p>Use this form to identify yourself as the owner, authorized representative, or broker for a market-sourced listing. Claims require review before a listing is upgraded or changed.</p>
        </div>

        <form className={styles.form} action="mailto:claims@floridaliquorlicensemarket.com" method="post" encType="text/plain">
          <label>
            Listing reference
            <input name="listing-reference" defaultValue={listingId} readOnly={Boolean(listingId)} required />
          </label>
          <div className={styles.row}>
            <label>
              Full name
              <input name="full-name" autoComplete="name" required />
            </label>
            <label>
              Company or brokerage
              <input name="company" autoComplete="organization" />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" autoComplete="tel" required />
            </label>
          </div>
          <label>
            Relationship to this listing
            <select name="relationship" required defaultValue="">
              <option value="" disabled>Select one</option>
              <option>License owner</option>
              <option>Authorized representative</option>
              <option>Listing broker</option>
              <option>Attorney or closing agent</option>
            </select>
          </label>
          <label>
            Verification details
            <textarea name="verification-details" rows={6} placeholder="Explain your authority and provide the original listing URL or other identifying information." required />
          </label>
          <label className={styles.consent}>
            <input type="checkbox" name="certification" required />
            I certify that the information submitted is accurate and that I am authorized to request changes to this listing.
          </label>
          <button type="submit">SUBMIT CLAIM FOR REVIEW</button>
          <p className={styles.note}>Submitting a claim does not automatically change or remove a listing. FLLM will review the request and may request supporting documentation.</p>
        </form>
      </section>
    </main>
  );
}
