import type { ReactNode } from "react";
import Link from "next/link";

const findingsUrl =
  "https://www.floridaliquorlicensemarket.com/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings";
const rosaynBioUrl = "https://www.realtymasters.cc/about-us/";

export default function TrustPurchaserGuideLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <section className="trust-real-case" aria-labelledby="trust-real-case-heading">
        <style>{`
          .trust-real-case{background:#06131e;color:#eef3f6;padding:0 0 64px}
          .trust-real-case-shell{width:min(1180px,calc(100% - 36px));margin:0 auto;padding:30px;border:1px solid rgba(237,169,26,.42);border-top:4px solid #eda91a;border-radius:13px;background:linear-gradient(145deg,#0a2237,#04111c);box-shadow:0 18px 42px rgba(0,0,0,.22)}
          .trust-real-case-kicker{display:block;color:#eda91a;font-size:11px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
          .trust-real-case h2{max-width:900px;margin:8px 0 12px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(28px,4vw,42px);line-height:1.1}
          .trust-real-case p{max-width:1000px;margin:0;color:#c3d0d9;font-size:15px;line-height:1.72}
          .trust-real-case p+p{margin-top:13px}
          .trust-real-case-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin-top:22px}
          .trust-real-case-card{padding:20px;border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#071d33}
          .trust-real-case-card span{display:block;color:#eda91a;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
          .trust-real-case-card h3{margin:7px 0 8px;color:#fff;font-size:18px;line-height:1.3}
          .trust-real-case-card p{color:#aebdca;font-size:13px;line-height:1.65}
          .trust-real-case-takeaway{margin-top:22px;padding:20px;border-left:4px solid #eda91a;background:rgba(237,169,26,.065)}
          .trust-real-case-takeaway strong{display:block;color:#fff;font-size:17px}
          .trust-real-case-takeaway ul{display:grid;gap:8px;margin:12px 0 0;padding-left:20px;color:#c5d0d9;line-height:1.6}
          .trust-real-case-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .trust-real-case-actions a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:1px solid rgba(237,169,26,.5);border-radius:8px;color:#eda91a;font-weight:900;text-decoration:none}
          .trust-real-case-actions a:hover{background:#eda91a;color:#06131e}
          .trust-real-case-note{margin-top:18px!important;color:#90a3b2!important;font-size:12px!important}
          @media(max-width:780px){.trust-real-case-grid{grid-template-columns:1fr}.trust-real-case-shell{padding:22px 18px}}
        `}</style>
        <div className="trust-real-case-shell">
          <span className="trust-real-case-kicker">Documented Florida quota-license transaction</span>
          <h2 id="trust-real-case-heading">Case Study: Park Street Trust, Winn-Dixie and the Named Purchaser</h2>
          <p>
            In 2025 findings following a non-jury trial in St. Johns County, the circuit court described a quota-license transaction in which the purchase agreement named the Park Street Revocable Trust as buyer. The court found that the Trust had been created for the purpose of obtaining a liquor license that would later be transferred to Winn-Dixie and later characterized the Trust as functioning essentially as a stand-in for Winn-Dixie in the transaction.
          </p>
          <p>
            The findings identify Barry B. Rosayn of RealtyMasters as the broker and agent for the transaction and state that RealtyMasters also served as escrow agent. Separately, Rosayn&apos;s published RealtyMasters biography states that, since 2011, he has exclusively represented Winn-Dixie Supermarkets for Florida alcoholic-beverage licensing and acquisitions.
          </p>

          <div className="trust-real-case-grid">
            <article className="trust-real-case-card">
              <span>Named purchaser</span>
              <h3>Park Street Revocable Trust</h3>
              <p>
                The contract named the Trust as buyer, while the court&apos;s findings described the Trust&apos;s purpose as acquiring the quota-license rights for Winn-Dixie. The findings also state that the Trust would not ultimately retain the license interest because its rights were intended to be assigned to Winn-Dixie.
              </p>
            </article>
            <article className="trust-real-case-card">
              <span>Broker relationship</span>
              <h3>Barry B. Rosayn / RealtyMasters</h3>
              <p>
                The court identified Rosayn as broker and agent in the transaction. His own firm biography separately describes a long-running exclusive relationship representing Winn-Dixie in Florida alcoholic-beverage licensing and acquisitions.
              </p>
            </article>
          </div>

          <div className="trust-real-case-takeaway">
            <strong>Seller takeaway</strong>
            <ul>
              <li>The entity named in the purchase agreement may not be the ultimate economic party or intended final transferee.</li>
              <li>Ask who the trust represents, who controls the transaction, and whether assignment to another party is contemplated.</li>
              <li>Identify who will ultimately submit the ABT-6002 and whether the seller is agreeing to cooperate with a later substitution or assignment.</li>
              <li>Understand the broker&apos;s agency relationships and who the broker is representing before relying on transaction communications.</li>
            </ul>
          </div>

          <div className="trust-real-case-actions">
            <Link href="/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings">Read FLLM&apos;s complete court findings reader</Link>
            <a href={findingsUrl} target="_blank" rel="noreferrer">Open published FLLM findings ↗</a>
            <a href={rosaynBioUrl} target="_blank" rel="noreferrer">RealtyMasters broker biography ↗</a>
          </div>

          <p className="trust-real-case-note">
            FLLM does not suggest that the use of Park Street Trust, Winn-Dixie, RealtyMasters, or a trust-based acquisition structure was unlawful or improper. This case study is presented because the judicial record illustrates why a quota-license seller should identify the relationship among the named purchaser, trustee, broker, funding party, assignee and intended DABT transferee before signing a purchase agreement.
          </p>
        </div>
      </section>
    </>
  );
}
