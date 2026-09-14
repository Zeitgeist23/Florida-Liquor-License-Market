import Image from "next/image";
import Link from "next/link";

const resourceGroups = [
  {
    title: "Marketplace & County Data",
    description: "Compare active inventory, statewide pricing and county-specific Florida quota-license markets.",
    links: [
      { href: "/listings", label: "Browse Current Listings" },
      { href: "/counties", label: "County Market Data" },
      { href: "/florida-4cop-liquor-license-for-sale", label: "Statewide 4COP Market" },
    ],
  },
  {
    title: "Buying & Transfer Guidance",
    description: "Review the purchase process, license categories and Florida transfer-application requirements.",
    links: [
      { href: "/how-to-buy-florida-liquor-license", label: "7-Step Buyer Guide" },
      { href: "/resources/florida-liquor-license-types", label: "Florida License Types" },
      { href: "/dbpr-abt-6002", label: "ABT-6002 Transfer Guide" },
    ],
  },
  {
    title: "Valuation & Financing",
    description: "Evaluate asking prices, appraisal support and financing structures for a specific opportunity.",
    links: [
      { href: "/florida-liquor-license-appraisal", label: "License Appraisal" },
      { href: "/financing", label: "Financing Options" },
      { href: "/financing/loan-payment-calculator", label: "Loan Payment Calculator" },
    ],
  },
  {
    title: "Sell or Advertise a License",
    description: "Choose self-directed advertising, broker-assisted representation or a client-license listing.",
    links: [
      { href: "/sell-your-license", label: "List Your License" },
      { href: "/florida-liquor-license-broker", label: "FLLM Broker Services" },
      { href: "/brokers/list-your-license", label: "Advertise a Client License" },
    ],
  },
];

export default function ListingsSeoAuthorityBridge() {
  return (
    <>
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
    <section className="listings-authority-bridge" aria-labelledby="listings-authority-title">
      <div className="page-shell">
        <span className="listings-authority-kicker">Related Marketplace Resources</span>
        <h2 id="listings-authority-title">Continue Your Florida Liquor License Research</h2>
        <p>
          Move from current <strong>Florida liquor licenses for sale</strong> into the county research,
          valuation, financing and transaction resources needed to evaluate a specific opportunity.
        </p>
        <div className="listings-authority-grid">
          {resourceGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="listings-authority-links">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href}>{link.label}<span aria-hidden="true">›</span></Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .listings-authority-bridge{padding:46px 0 50px;background:linear-gradient(180deg,#0b2c49 0%,#061827 100%);border-top:1px solid rgba(246,167,0,.34);border-bottom:1px solid rgba(246,167,0,.38)}
        .listings-authority-bridge .page-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .listings-authority-kicker{display:block;color:#f6a700;font-size:12px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
        .listings-authority-bridge h2{margin:7px 0 10px;color:#fff;font:700 clamp(28px,3.6vw,40px)/1.1 Georgia,"Times New Roman",serif}
        .listings-authority-bridge>div>p{max-width:900px;margin:0;color:#ced8e0;font-size:15px;line-height:1.68}
        .listings-authority-bridge>div>p strong{color:#fff}
        .listings-authority-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px}
        .listings-authority-grid article{min-width:0;padding:21px 22px;border:1px solid rgba(246,167,0,.34);border-radius:9px;background:linear-gradient(145deg,#154d78 0%,#092942 100%);box-shadow:inset 0 1px 0 rgba(105,214,255,.1),0 10px 24px rgba(0,0,0,.2);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease}
        .listings-authority-grid article:hover,.listings-authority-grid article:focus-within{transform:translateY(-3px);border-color:#f6b51f;background:linear-gradient(145deg,#1a5a89 0%,#0b3454 100%);box-shadow:0 15px 30px rgba(0,0,0,.28)}
        .listings-authority-grid h3{margin:0 0 7px;color:#fff;font:700 21px/1.2 Georgia,"Times New Roman",serif}
        .listings-authority-grid article>p{margin:0;color:#c7d4de;font-size:14px;line-height:1.58}
        .listings-authority-links{display:flex;flex-wrap:wrap;gap:8px 14px;margin-top:14px}
        .listings-authority-links a{display:inline-flex;align-items:center;gap:5px;color:#f6b51f;font-size:14px;font-weight:850;line-height:1.35;text-decoration:none}
        .listings-authority-links a:hover,.listings-authority-links a:focus-visible{color:#ffd36b;text-decoration:underline;text-underline-offset:3px;outline:none}
        .listings-authority-links a span{font:700 19px/1 Georgia,"Times New Roman",serif;transition:transform .16s ease}
        .listings-authority-links a:hover span{transform:translateX(2px)}

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
        @media(max-width:760px){.listings-authority-bridge{padding:38px 0 42px}.listings-authority-bridge .page-shell{width:min(100% - 28px,1180px)}.listings-authority-grid{grid-template-columns:1fr}.listings-authority-grid article{padding:19px}.listings-authority-bridge>div>p{font-size:14px}}
        @media(max-width:650px){.listings-directory-shell{width:min(calc(100% - 24px),1240px)}.listings-directory-footer>.listings-directory-shell,.listings-directory-footer>.national-marketplace-footer-link{flex-direction:column;text-align:center}.listings-directory-footer-brand{flex-direction:column;gap:9px}.listings-directory-footer nav{justify-content:center}}
        @media(prefers-reduced-motion:reduce){.listings-authority-grid article,.listings-authority-links a span{transition:none}}
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
