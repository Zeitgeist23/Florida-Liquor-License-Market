import Link from "next/link";

export default function ListingsSeoAuthorityBridge() {
  return (
    <section className="listings-authority-bridge" aria-labelledby="listings-authority-title">
      <div className="page-shell">
        <span className="listings-authority-kicker">FLLM Buyer Resources</span>
        <h2 id="listings-authority-title">Research, Value and Finance a Florida Liquor License</h2>
        <p>
          After comparing current <strong>Florida liquor licenses for sale</strong>, buyers can move directly into county market research, valuation and financing resources before making an offer. FLLM connects active marketplace inventory with the tools buyers commonly need to evaluate and structure a purchase.
        </p>
        <div className="listings-authority-grid">
          <Link href="/market-data/exchange-board">
            <strong>FLLM Exchange Board</strong>
            <span>Compare active asking prices, county markets and current Florida liquor-license inventory.</span>
          </Link>
          <Link href="/florida-liquor-license-appraisal">
            <strong>Florida Liquor License Appraisal</strong>
            <span>Review license-specific valuation and appraisal options when a supported market value is needed.</span>
          </Link>
          <Link href="/financing">
            <strong>Finance a Florida Liquor License</strong>
            <span>Explore purchase and refinance financing options for qualified Florida liquor-license transactions.</span>
          </Link>
          <Link href="/financing/loan-payment-calculator">
            <strong>Loan Payment Calculator</strong>
            <span>Estimate monthly payments and review amortization before structuring a liquor-license purchase.</span>
          </Link>
          <Link href="/counties">
            <strong>Florida County Market Data</strong>
            <span>Compare available listings and asking-price context across Florida county markets.</span>
          </Link>
          <Link href="/how-to-buy-florida-liquor-license">
            <strong>7-Step Buyer Guide</strong>
            <span>Follow the FLLM process for selecting, evaluating, financing and transferring a Florida liquor license.</span>
          </Link>
        </div>
      </div>
      <style>{`
        .listings-authority-bridge{padding:58px 0 64px;background:#061827;border-top:1px solid rgba(246,167,0,.22)}
        .listings-authority-bridge .page-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .listings-authority-kicker{display:block;color:#f6a700;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .listings-authority-bridge h2{margin:8px 0 12px;color:#fff;font:700 clamp(28px,4vw,42px)/1.1 Georgia,"Times New Roman",serif}
        .listings-authority-bridge>div>p{max-width:930px;margin:0;color:#c5d1da;font-size:15px;line-height:1.72}
        .listings-authority-bridge>div>p strong{color:#fff}
        .listings-authority-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:24px}
        .listings-authority-grid a{display:block;padding:19px 20px;border:1px solid rgba(246,167,0,.28);border-radius:10px;background:#071f34;color:#fff;text-decoration:none;transition:border-color .18s ease,transform .18s ease,background .18s ease}
        .listings-authority-grid a:hover{transform:translateY(-2px);border-color:#f6a700;background:#092842}
        .listings-authority-grid strong{display:block;margin-bottom:7px;color:#f6b51f;font-size:15px}
        .listings-authority-grid span{display:block;color:#b9c8d3;font-size:12px;line-height:1.55}
        @media(max-width:880px){.listings-authority-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:600px){.listings-authority-bridge{padding:46px 0}.listings-authority-bridge .page-shell{width:min(100% - 28px,1180px)}.listings-authority-grid{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
