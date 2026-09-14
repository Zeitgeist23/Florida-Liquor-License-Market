import Image from "next/image";
import Link from "next/link";

const buyerResources = [
  {
    href: "/exchange",
    title: "FLLM Exchange — Confidential Offers",
    description: "Use FLLM's Florida liquor-license exchange marketplace to review eligible 4COP and 3PS opportunities and submit confidential purchase terms.",
  },
  {
    href: "/florida-liquor-license-appraisal",
    title: "Florida Liquor License Appraisal",
    description: "Review license-specific valuation and appraisal options when a supported market value is needed.",
  },
  {
    href: "/financing",
    title: "Florida Liquor License Financing",
    description: "Explore purchase and refinance financing options for qualifying Florida 4COP and 3PS liquor-license transactions.",
  },
  {
    href: "/finance-a-license",
    title: "Finance a Florida Liquor License",
    description: "Review purchase financing, down-payment considerations, refinance paths and the steps used to request lender consideration.",
  },
  {
    href: "/how-to-finance-florida-liquor-license",
    title: "How to Finance a Florida Liquor License",
    description: "Use the FLLM financing guide to understand collateral value, underwriting factors and common transaction structures.",
  },
  {
    href: "/financing/loan-payment-calculator",
    title: "Loan Payment Calculator",
    description: "Estimate monthly payments and review amortization before structuring a liquor-license purchase.",
  },
  {
    href: "/counties",
    title: "Florida County Market Data",
    description: "Compare available listings and asking-price context across Florida county markets.",
  },
  {
    href: "/counties/hillsborough",
    title: "Tampa Liquor Licenses for Sale",
    description: "Compare current Tampa-area 4COP and 3PS quota-license inventory in the Hillsborough County market.",
  },
  {
    href: "/how-to-buy-florida-liquor-license",
    title: "7-Step Buyer Guide",
    description: "Follow the FLLM process for selecting, evaluating, financing and transferring a Florida liquor license.",
  },
];

export default function ListingsSeoAuthorityBridge() {
  return (
    <>
    <section className="listings-supporting-copy" aria-label="Florida liquor license marketplace information">
      <div className="listings-supporting-copy__inner">
        <aside className="fllm-authority-links" aria-label="FLLM seller service options">
      <div className="fllm-authority-links__inner">
        <p>
          <strong>Full-service selling is available through FLLM itself:</strong>{" "}
          Florida liquor-license owners can <Link href="/florida-liquor-license-broker">request assistance from a Florida liquor license broker through Florida Liquor License Market</Link>. Depending on the written brokerage agreement, representation may include pricing strategy, confidential or public marketing, buyer screening and communications, negotiation, due-diligence coordination, document organization and transaction coordination. Sellers who prefer direct control can choose a self-directed marketplace listing instead.
        </p>
      </div>
    </aside>
    <aside className="fllm-authority-links" aria-label="How to buy a Florida liquor license">
      <div className="fllm-authority-links__inner">
        <p>
          <strong>Buying guide:</strong>{" "}
          <Link href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</Link> explains the 7-step purchase process from choosing the correct license type and county through active listings, pricing and valuation, due diligence, financing, purchase terms, ABT-6002 transfer preparation and closing.
        </p>
      </div>
    </aside>
    <aside className="fllm-authority-links" aria-label="Buy or sell a Florida liquor license online">
      <div className="fllm-authority-links__inner">
        <p>
          <strong>Florida liquor licenses online:</strong>{" "}
          Sellers can <Link href="/sell-your-license">list a Florida liquor license for sale online</Link> through FLLM&apos;s statewide marketplace, while buyers can <Link href="/listings">buy a Florida liquor license online by browsing current 4COP and 3PS marketplace listings</Link> and contacting the seller or listing representative for the specific opportunity.
        </p>
      </div>
        </aside>
      </div>
    </section>
    <section className="listings-authority-bridge" aria-labelledby="listings-authority-title">
      <div className="listings-buyer-resources-shell">
        <span className="listings-authority-kicker">FLLM Buyer Resources</span>
        <h2 id="listings-authority-title">Research, Value and Finance a Florida Liquor License</h2>
        <p>
          After comparing current <strong>Florida liquor licenses for sale</strong>, buyers can move directly into county market research, valuation and financing resources before making an offer. FLLM connects active marketplace inventory with the tools buyers commonly need to evaluate and structure a purchase.
        </p>
        <div className="listings-authority-grid">
          {buyerResources.map((resource) => (
            <Link href={resource.href} className="listings-buyer-resource-card" key={resource.href}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .results-page .results-content{padding-bottom:28px!important}
        .results-page .listings-seo-footer{margin-top:0!important;padding-top:32px!important;padding-bottom:32px!important}
        .listings-supporting-copy{padding:24px 0 18px;border-top:1px solid rgba(246,167,0,.34);background:linear-gradient(180deg,#061827 0%,#0b2c49 100%)}
        .listings-supporting-copy__inner{box-sizing:border-box;width:min(1180px,calc(100% - 40px));margin:0 auto;overflow:hidden;border:1px solid rgba(246,167,0,.38);border-radius:9px;background:#0a2943;box-shadow:0 12px 28px rgba(0,0,0,.2)}
        .listings-supporting-copy .fllm-authority-links{margin:0!important;padding:0!important;border:0!important;background:transparent!important}
        .listings-supporting-copy .fllm-authority-links+.fllm-authority-links{border-top:1px solid rgba(246,167,0,.28)!important}
        .listings-supporting-copy .fllm-authority-links__inner{box-sizing:border-box;width:100%!important;max-width:none!important;margin:0!important;padding:15px 20px!important;background:linear-gradient(90deg,rgba(21,77,120,.78),rgba(9,41,66,.9))!important}
        .listings-supporting-copy p{margin:0!important;color:#d6e1e9!important;font-size:14px!important;line-height:1.62!important}
        .listings-supporting-copy p strong{color:#fff!important}
        .listings-supporting-copy a{color:#f6b51f!important;font-weight:800;text-decoration:none!important}
        .listings-supporting-copy a:hover,.listings-supporting-copy a:focus-visible{color:#ffd36b!important;text-decoration:underline!important;text-underline-offset:3px;outline:none}
        .listings-authority-bridge{padding:74px 0 76px;background:#061a2b;border-top:1px solid rgba(246,167,0,.34);border-bottom:1px solid rgba(246,167,0,.38)}
        .listings-buyer-resources-shell{box-sizing:border-box;width:min(1440px,calc(100% - 40px));margin:0 auto}
        .listings-authority-kicker{display:block;color:#f6a700;font-size:13px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .listings-authority-bridge h2{margin:9px 0 16px;color:#fff;font:700 clamp(34px,3.35vw,52px)/1.08 Georgia,"Times New Roman",serif}
        .listings-authority-bridge>div>p{max-width:1120px;margin:0;color:#d7e3ec;font-size:16px;line-height:1.72}
        .listings-authority-bridge>div>p strong{color:#fff}
        .listings-authority-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px 15px;margin-top:30px}
        .listings-buyer-resource-card{display:block;min-width:0;min-height:150px;padding:23px 25px;border:1px solid rgba(246,167,0,.4);border-radius:10px;background:#0a2740;color:inherit;text-decoration:none;box-shadow:none;transition:transform .18s ease,border-color .18s ease,background .18s ease,box-shadow .18s ease}
        .listings-buyer-resource-card:hover,.listings-buyer-resource-card:focus-visible{transform:translateY(-3px);border-color:#f6b51f;background:#0d3150;box-shadow:0 14px 28px rgba(0,0,0,.24);outline:none}
        .listings-authority-grid h3{margin:0 0 10px;color:#f6a700;font:800 17px/1.3 Arial,Helvetica,sans-serif}
        .listings-authority-grid .listings-buyer-resource-card>p{margin:0;color:#d6e1e9;font-size:14px;line-height:1.55}
        @media(max-width:1050px){.listings-authority-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:760px){.results-page .results-content{padding-bottom:22px!important}.results-page .listings-seo-footer{margin-top:0!important;padding-top:26px!important;padding-bottom:26px!important}.listings-supporting-copy{padding:18px 0 14px}.listings-supporting-copy__inner{width:min(100% - 28px,1180px)}.listings-supporting-copy .fllm-authority-links__inner{padding:14px 16px!important}.listings-supporting-copy p{font-size:13px!important}.listings-authority-bridge{padding:46px 0 50px}.listings-buyer-resources-shell{width:min(100% - 28px,1440px)}.listings-authority-bridge h2{font-size:clamp(31px,9vw,42px)}.listings-authority-bridge>div>p{font-size:14px}.listings-authority-grid{grid-template-columns:1fr;margin-top:24px}.listings-buyer-resource-card{min-height:0;padding:20px}}
        @media(prefers-reduced-motion:reduce){.listings-buyer-resource-card{transition:none}}

        .listings-directory-footer{padding:20px 0 0;border-top:1px solid #6e531d;background:linear-gradient(90deg,#071f36 0%,#0c3558 50%,#071f36 100%)}
        .listings-directory-shell{box-sizing:border-box;width:min(1240px,calc(100% - 40px));margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:18px}
        .listings-directory-footer-brand{display:flex;align-items:center;gap:14px}
        .listings-directory-footer-brand>a{display:block;line-height:0}
        .listings-directory-footer-brand img{display:block;width:130px;height:auto}
        .listings-directory-footer span{color:#e4eef5;font-size:12px}
        .listings-directory-footer nav{display:flex;flex-wrap:wrap;gap:20px}
        .listings-directory-footer a{color:#f3f7fa;font-size:12px;font-weight:800;text-decoration:none}
        .listings-directory-footer a:hover,.listings-directory-footer a:focus-visible{color:#f1a600}
        .listings-directory-footer>.national-marketplace-footer-link{box-sizing:border-box;width:100%;margin:0;padding:14px max(20px,calc((100% - 1240px)/2)) 16px;border-top:1px solid #263f55;background:#0a2947;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#dce8f0;font-size:11px;text-align:left}
        .listings-directory-footer>.national-marketplace-footer-link a{color:#f3f7fa;font-size:11px;font-weight:800}
        .listings-directory-footer>.national-marketplace-footer-link a:hover,.listings-directory-footer>.national-marketplace-footer-link a:focus-visible{color:#f1a600}
        @media(max-width:650px){.listings-directory-shell{width:min(calc(100% - 24px),1240px)}.listings-directory-footer>.listings-directory-shell,.listings-directory-footer>.national-marketplace-footer-link{flex-direction:column;text-align:center}.listings-directory-footer-brand{flex-direction:column;gap:9px}.listings-directory-footer nav{justify-content:center}}
      `}</style>
    </section>
    <footer className="listings-directory-footer">
      <div className="listings-directory-shell">
        <div className="listings-directory-footer-brand">
          <Link href="/" aria-label="Florida Liquor License Market home">
            <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
          </Link>
          <span>© Florida Liquor License Market</span>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
          <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
          <Link href="/listings">Listings</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  </>
  );
}
