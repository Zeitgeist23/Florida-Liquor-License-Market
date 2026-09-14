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
        @media(max-width:760px){.listings-authority-bridge{padding:38px 0 42px}.listings-authority-bridge .page-shell{width:min(100% - 28px,1180px)}.listings-authority-grid{grid-template-columns:1fr}.listings-authority-grid article{padding:19px}.listings-authority-bridge>div>p{font-size:14px}}
        @media(prefers-reduced-motion:reduce){.listings-authority-grid article,.listings-authority-links a span{transition:none}}
      `}</style>
    </section>
  );
}
