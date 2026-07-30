"use client";

import { FormEvent, useEffect, useState } from "react";

import styles from "@/app/sell-your-license/seller.module.css";

const COUNTIES = [
  "Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte",
  "Citrus", "Clay", "Collier", "Columbia", "DeSoto", "Dixie", "Duval", "Escambia",
  "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee",
  "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson",
  "Jefferson", "Lafayette", "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison", "Manatee",
  "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee", "Orange",
  "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "Santa Rosa", "Sarasota",
  "Seminole", "St. Johns", "St. Lucie", "Sumter", "Suwannee", "Taylor", "Union", "Volusia",
  "Wakulla", "Walton", "Washington",
];

type SaleMethod = "" | "Self-Directed Listing" | "Broker-Assisted Listing";

const MAP_NODES = [
  [31, 46], [57, 42], [85, 49], [112, 62], [139, 78], [154, 103], [166, 132], [173, 161],
  [186, 188], [192, 220], [205, 251], [214, 285], [211, 319], [198, 350], [184, 379],
  [170, 405], [154, 430], [138, 448], [124, 423], [128, 393], [131, 363], [120, 334],
  [108, 308], [98, 281], [88, 251], [77, 224], [68, 198], [59, 174], [49, 151], [42, 126],
  [35, 100], [26, 76], [71, 81], [101, 96], [129, 116], [145, 145], [151, 180], [164, 214],
  [175, 247], [184, 281], [183, 316], [171, 349], [155, 382], [145, 414], [111, 389],
  [108, 352], [96, 319], [83, 290], [72, 258], [61, 226], [52, 194], [44, 163], [38, 134],
];

const MAP_EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],
  [12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],
  [23,24],[24,25],[25,26],[26,27],[27,28],[28,29],[29,30],[30,31],[31,0],[1,32],[32,33],
  [33,34],[34,35],[35,36],[36,37],[37,38],[38,39],[39,40],[40,41],[41,42],[42,43],[43,18],
  [32,4],[33,6],[34,8],[35,10],[36,11],[37,12],[38,13],[39,14],[40,15],[41,16],[42,17],
  [44,19],[44,20],[44,45],[45,21],[45,46],[46,22],[46,47],[47,23],[47,48],[48,24],[48,49],
  [49,25],[49,50],[50,26],[50,51],[51,27],[51,52],[52,28],[52,29],[52,30],[32,52],
  [33,51],[34,50],[35,49],[36,48],[37,47],[38,46],[39,45],[40,44]
];

export default function SellerListingForm() {
  const [saleMethod, setSaleMethod] = useState<SaleMethod>("Broker-Assisted Listing");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "cancelled") {
      setIsError(true);
      setStatus(
        "Payment was canceled. Your listing has not been submitted for review. You may complete the form again when ready."
      );
    }
  }, []);

  async function submitListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const selectedMethod = String(data.get("sale_method") || "") as SaleMethod;

    if (!selectedMethod) {
      setIsError(true);
      setStatus("Please choose Self-Directed Listing or Broker-Assisted Listing.");
      return;
    }

    setSubmitting(true);
    setIsError(false);
    setStatus("Saving your listing and opening secure Stripe checkout…");

    try {
      const assistanceSummary = [`Sale method: ${selectedMethod}`];

      if (selectedMethod === "Broker-Assisted Listing") {
        assistanceSummary.push(
          `Currently represented by another broker: ${String(
            data.get("broker_currently_represented") || "Not provided"
          )}`,
          `Preferred broker arrangement: ${String(
            data.get("broker_arrangement") || "No preference / need guidance"
          )}`,
          `Desired net amount: ${String(data.get("desired_net_amount") || "Not provided")}`,
          `Preferred contact method: ${String(data.get("broker_contact_method") || "Not provided")}`,
          `ABT application preparation and transaction coordination: ${
            data.get("abt_transaction_coordination") ? "Requested" : "Not requested"
          }`
        );
      }

      const sellerMessage = String(data.get("message") || "").trim();
      let combinedMessage = assistanceSummary.join("\n");
      if (sellerMessage) combinedMessage += `\n\nAdditional seller details:\n${sellerMessage}`;

      const response = await fetch("/api/listing-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          county: String(data.get("county") || ""),
          license_type: String(data.get("license_type") || ""),
          asking_price: String(data.get("asking_price") || ""),
          license_status: String(data.get("license_status") || ""),
          preferred_timing: String(data.get("preferred_timing") || ""),
          message: combinedMessage,
          seller_certification: Boolean(data.get("seller_certification")),
          fee_agreement: Boolean(data.get("fee_agreement")),
          honey: String(data.get("_honey") || ""),
        }),
      });

      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Unable to create secure checkout.");
      }

      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setSubmitting(false);
      setIsError(true);
      setStatus(cause instanceof Error ? cause.message : "We could not save your listing. Please try again.");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/" aria-label="Florida Liquor License Market home">
            <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
          </a>
          <nav aria-label="Seller page navigation">
            <a href="/">Return Home</a>
            <a href="/contact">Contact Us</a>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.skyGlow} aria-hidden="true" />
        <svg className={styles.floridaConstellation} viewBox="0 0 240 500" aria-hidden="true">
          <path className={styles.floridaOutline} d="M22 42 L82 38 L116 46 L139 61 L154 84 L161 111 L171 137 L176 165 L188 191 L192 221 L205 250 L215 283 L213 319 L202 350 L187 379 L171 407 L154 434 L137 451 L123 428 L127 395 L130 364 L119 335 L107 307 L97 280 L86 251 L76 224 L67 198 L58 174 L49 150 L42 126 L34 101 L27 77 Z" />
          {MAP_EDGES.map(([from, to], index) => (
            <line key={`edge-${index}`} x1={MAP_NODES[from][0]} y1={MAP_NODES[from][1]} x2={MAP_NODES[to][0]} y2={MAP_NODES[to][1]} />
          ))}
          {MAP_NODES.map(([cx, cy], index) => <circle key={`node-${index}`} cx={cx} cy={cy} r={index % 9 === 0 ? 4 : 2.1} />)}
        </svg>
        <div className={styles.rightBars} aria-hidden="true">{Array.from({ length: 9 }).map((_, index) => <span key={index} />)}</div>
        <div className={styles.miniBars} aria-hidden="true">{Array.from({ length: 7 }).map((_, index) => <span key={index} />)}</div>

        <div className={styles.layout}>
          <aside className="seller-market-rail" aria-label="Florida liquor license market indicators">
            <section className="seller-market-card seller-market-activity">
              <h3>Market Activity</h3>
              <div className="seller-chart-y"><span>100</span><span>50</span><span>0</span></div>
              <svg viewBox="0 0 190 78" role="img" aria-label="Market activity chart">
                <line x1="8" y1="67" x2="184" y2="67" />
                <line x1="8" y1="38" x2="184" y2="38" />
                <polyline points="8,50 24,58 40,41 56,57 72,45 88,53 104,38 120,46 136,27 152,43 168,20 184,34" />
                <polyline className="buyer-line" points="8,56 24,49 40,55 56,45 72,52 88,46 104,48 120,34 136,39 152,31 168,35 184,25" />
              </svg>
              <div className="seller-market-legend"><span>Listings</span><span>Buyers</span></div>
            </section>

            <section className="seller-market-card seller-heat-card">
              <h3>License Heat Map</h3>
              <svg className="seller-florida-mini" viewBox="0 0 230 180" role="img" aria-label="Florida license heat map">
                <path d="M20 34 L109 32 L129 38 L145 49 L150 61 L169 70 L176 88 L178 105 L191 121 L202 138 L204 154 L197 166 L186 158 L180 142 L172 130 L167 116 L158 105 L153 91 L142 82 L132 69 L116 62 L96 59 L77 54 L59 50 L42 47 L25 49 Z" />
                <polyline points="29,45 61,40 96,48 128,52 145,71 162,93 178,116 193,150" />
                <polyline points="58,45 82,58 111,54 139,76 154,105 176,135" />
                <circle cx="55" cy="48" r="3" /><circle cx="99" cy="59" r="3" /><circle cx="143" cy="81" r="4" />
                <circle cx="159" cy="108" r="5" /><circle cx="180" cy="140" r="5" /><circle cx="193" cy="157" r="4" />
              </svg>
              <div className="seller-heat-scale"><span>Low</span><i /><span>High</span></div>
            </section>

            <section className="seller-market-card seller-insight-card">
              <h3>Market Insights</h3>
              <div className="seller-demand-ring"><strong>72%</strong></div>
              <p>Active Buyer Demand</p>
              <b>High</b>
            </section>
          </aside>

          <aside className={styles.intro}>
            <span className={styles.kicker}>Confidential Seller Representation</span>
            <h1>List Your Florida Liquor License</h1>
            <p>Publish a self-directed listing or request broker-assisted marketing and transaction support.</p>
            <ul>
              <li>One-time $14.95 submission fee</li>
              <li>Confidential marketplace review</li>
              <li>Statewide buyer visibility</li>
              <li>Seller-selected service level</li>
            </ul>
            <div className={styles.trust}>
              <span className={styles.shield} aria-hidden="true">✓</span>
              <span>
                <strong>Discreet. Secure. Trusted.</strong>
                <small>Your information is used only to evaluate and respond to your submission.</small>
              </span>
            </div>
          </aside>

          <form className={styles.form} onSubmit={submitListing}>
            <section className={styles.primaryPanel}>
              <div className={styles.formHeading}>
                <span className={styles.documentIcon} aria-hidden="true">▤</span>
                <div>
                  <h2>Submit Your License</h2>
                  <p>Choose how you would like to sell, then complete the listing information.</p>
                </div>
              </div>

              <label className={styles.honeypot} aria-hidden="true">
                Leave blank
                <input type="text" tabIndex={-1} autoComplete="off" name="_honey" />
              </label>

              <fieldset className={styles.methodFieldset}>
                <legend>How would you like to sell your license? *</legend>
                <p>Choose the level of assistance you would like. You may change your selection later.</p>
                <div className={styles.methodOptions}>
                  <label className={saleMethod === "Self-Directed Listing" ? styles.methodSelected : styles.methodOption}>
                    <input type="radio" name="sale_method" value="Self-Directed Listing" required checked={saleMethod === "Self-Directed Listing"} onChange={() => setSaleMethod("Self-Directed Listing")} />
                    <span><strong>Self-Directed Listing</strong><small>I will communicate directly with buyers and manage negotiations, documentation, and the license-transfer process. FLLM will publish my listing and forward inquiries to me.</small></span>
                  </label>

                  <label className={saleMethod === "Broker-Assisted Listing" ? styles.methodSelected : styles.methodOption}>
                    <input type="radio" name="sale_method" value="Broker-Assisted Listing" required checked={saleMethod === "Broker-Assisted Listing"} onChange={() => setSaleMethod("Broker-Assisted Listing")} />
                    <span><strong>Broker-Assisted Listing</strong><small>I would like an FLLM-affiliated broker to contact me about marketing, buyer communications, offer negotiations, and transaction and ABT-transfer coordination.</small></span>
                  </label>
                </div>
                <p className={styles.disclosure}>Selecting Broker-Assisted Listing does not create a brokerage relationship or require a commission. An FLLM representative will discuss broker availability, services, commission terms, and the required written agreement.</p>

                {saleMethod === "Broker-Assisted Listing" && (
                  <div className={styles.brokerDetails}>
                    <p>Tell us how you would like a broker to assist.</p>
                    <label><span>Are you currently represented by another broker? *</span><select name="broker_currently_represented" required defaultValue=""><option value="" disabled>Select one</option><option>No</option><option>Yes</option><option>Not sure</option></select></label>
                    <label><span>Preferred arrangement</span><select name="broker_arrangement" defaultValue=""><option value="">No preference / need guidance</option><option>Non-exclusive arrangement</option><option>Exclusive arrangement</option></select></label>
                    <label><span>Desired net amount</span><input type="text" inputMode="decimal" name="desired_net_amount" placeholder="$" /></label>
                    <label><span>Preferred contact method *</span><select name="broker_contact_method" required defaultValue=""><option value="" disabled>Select one</option><option>Phone</option><option>Email</option><option>Either phone or email</option></select></label>
                    <label className={styles.abtChoice}><input type="checkbox" name="abt_transaction_coordination" value="Requested" /><span>I would also like information about ABT application preparation and transaction coordination.</span></label>
                  </div>
                )}
              </fieldset>
            </section>

            <section className={styles.detailsPanel}>
              <div className={styles.detailsHeading}>
                <span>Complete Listing Information</span>
                <small>Required fields are marked with an asterisk.</small>
              </div>
              <div className={styles.fields}>
                <label><span>Full Name *</span><input type="text" autoComplete="name" required name="name" /></label>
                <label><span>Email *</span><input type="email" autoComplete="email" required name="email" /></label>
                <label><span>Phone *</span><input type="tel" autoComplete="tel" required name="phone" /></label>
                <label><span>County *</span><select name="county" required defaultValue=""><option value="" disabled>Select county</option>{COUNTIES.map((county) => <option key={county}>{county} County</option>)}</select></label>
                <label><span>License Type *</span><select name="license_type" required defaultValue=""><option value="" disabled>Select license type</option><option>4COP Quota</option><option>3PS Quota / Package Store</option><option>2COP Beer &amp; Wine</option><option>Specialty / Qualified Business License</option><option>Not Sure</option></select></label>
                <label><span>Asking Price</span><input type="text" inputMode="decimal" placeholder="$" name="asking_price" /></label>
                <label><span>License Status *</span><select name="license_status" required defaultValue=""><option value="" disabled>Select status</option><option>Active at a location</option><option>Inactive / in escrow</option><option>Part of a business sale</option><option>Not sure</option></select></label>
                <label><span>Preferred Timing</span><select name="preferred_timing" defaultValue=""><option value="">Select timing</option><option>As soon as possible</option><option>Within 30 days</option><option>Within 60–90 days</option><option>Exploring options</option></select></label>
                <label className={styles.notes}><span>Additional Details</span><textarea name="message" rows={5} placeholder="Share relevant details about the license, location, or transaction." /></label>
              </div>

              <div className={styles.agreements}>
                <label><input type="checkbox" required name="seller_certification" value="Certified" /><span>I certify that I own the license or am authorized to advertise it, and that the submitted information is accurate.</span></label>
                <label><input type="checkbox" required name="fee_agreement" value="Accepted" /><span>I understand that $14.95 is a one-time listing-submission fee, payment does not guarantee publication, and rejected submissions are eligible for a refund.</span></label>
              </div>

              <div className={styles.paymentSummary}><span>Listing Submission Fee</span><strong>$14.95</strong></div>
              <button className={styles.submit} type="submit" disabled={submitting}>{submitting ? "Creating Secure Checkout…" : "Continue to Secure Payment — $14.95"}</button>
              <p className={styles.paymentNote}>Your information is saved first. Stripe securely processes the payment. We publish only after matching the payer email and reviewing the listing.</p>
              <p className={isError ? styles.errorStatus : styles.status} role="status" aria-live="polite">{status}</p>
            </section>
          </form>
        </div>

        <footer className={styles.heroFooter}>
          <span>Confidential Listings</span><i /> <span>Secure Submission</span><i /> <span>Statewide Reach</span>
          <small>© 2025 Florida Liquor License Market. All rights reserved.</small>
        </footer>
      </section>
    </main>
  );
}
