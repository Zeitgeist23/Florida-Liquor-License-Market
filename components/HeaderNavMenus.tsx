type HeaderNavMenusProps = {
  className?: string;
  showContactLink?: boolean;
};

const chevron = <img className="nav-chevron" src="/assets/nav-chevron.png" alt="" aria-hidden="true" />;

export default function HeaderNavMenus({
  className = "primary-nav",
  showContactLink = false,
}: HeaderNavMenusProps) {
  return (
    <>
      <nav className={className} aria-label="Primary navigation">
        <details className="native-nav-dropdown">
          <summary><span>Buy</span>{chevron}</summary>
          <div className="native-nav-menu native-nav-menu-standard">
            <a href="/listings">View Listings</a>
            <a href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</a>
            <a href="/counties">Florida County Markets</a>
          </div>
        </details>

        <details className="native-nav-dropdown">
          <summary><span>Sell</span>{chevron}</summary>
          <div className="native-nav-menu native-nav-menu-standard">
            <a href="/sell-your-license">Sell Your License</a>
            <a href="/how-to-sell-florida-liquor-license">How to Sell a Florida Liquor License</a>
            <a href="/florida-liquor-license-value">Get a License Valuation</a>
          </div>
        </details>

        <details className="native-nav-dropdown">
          <summary><span>Finance</span>{chevron}</summary>
          <div className="native-nav-menu native-nav-menu-standard">
            <a href="/financing">Liquor License Financing</a>
            <a href="/financing-disclosure">Financing Disclosure</a>
            <a href="/private-lending-disclosure">Private Lending Disclosure</a>
          </div>
        </details>

        <details className="native-nav-dropdown">
          <summary><span>Invest</span>{chevron}</summary>
          <div className="native-nav-menu native-nav-menu-standard">
            <a href="/investment-opportunities">Investment Opportunities</a>
            <a href="/self-directed-ira-liquor-license-lending">Self-Directed IRA Lending</a>
          </div>
        </details>

        <details className="native-nav-dropdown">
          <summary><span>Market Data</span>{chevron}</summary>
          <div className="native-nav-menu native-nav-menu-standard native-nav-market-menu">
            <a href="/florida-liquor-license-value">Florida Liquor License Value Estimator</a>
            <a href="/listings?status=sold">Recent Florida Transactions</a>
            <a href="/#market-data">Florida Market Insights</a>
            <a href="/florida-liquor-license-lottery">Quota Lottery Entry</a>
            <a href="/florida-liquor-license-news">News &amp; Insights</a>
            <a href="/#market-data">Florida Market Heat Map</a>
          </div>
        </details>

        <details className="native-nav-dropdown native-nav-license-types">
          <summary><span>License Types</span>{chevron}</summary>
          <div className="native-nav-menu native-license-types-menu">
            <a className="native-nav-text-link" href="/resources/florida-liquor-license-types">Florida Liquor License Types</a>
            <a className="native-license-card" href="/florida-4cop-liquor-license-for-sale">
              <img src="/assets/license-types-4cop.svg" alt="Upscale bar and restaurant representing a Florida 4COP quota license" />
              <span><strong>4COP Quota License</strong><small>Bars, lounges, nightclubs &amp; full-liquor restaurants</small></span>
            </a>
            <a className="native-license-card" href="/florida-3ps-liquor-license-for-sale">
              <img src="/assets/license-types-3ps.svg" alt="Liquor store representing a Florida 3PS quota package-store license" />
              <span><strong>3PS Quota / Package Store</strong><small>Liquor stores &amp; sealed package sales</small></span>
            </a>
            <a className="native-license-card" href="/resources/florida-liquor-license-types#common-license-chart">
              <img src="/assets/license-types-2cop.svg" alt="Cafe and wine bar representing a Florida 2COP beer and wine license" />
              <span><strong>2COP Beer &amp; Wine</strong><small>Restaurants, cafes &amp; wine bars</small></span>
            </a>
            <a className="native-license-card" href="/resources/florida-liquor-license-types">
              <img src="/assets/license-types-srx.svg" alt="Full-service restaurant representing a Florida SRX or 4COP-SFS license" />
              <span><strong>SRX / 4COP-SFS Restaurant</strong><small>Qualifying full-service restaurants</small></span>
            </a>
            <a className="native-nav-text-link" href="/resources/florida-liquor-license-types#population-rule-title">Quota License Requirements</a>
          </div>
        </details>

        <details className="native-nav-dropdown">
          <summary><span>Resources</span>{chevron}</summary>
          <div className="native-nav-menu native-nav-menu-standard native-nav-resources-menu">
            <a href="https://florida-liquor-license-market.jwigg023.chatgpt.site/license-lookup" target="_blank" rel="noopener noreferrer">Florida Liquor License Lookup</a>
            <a href="/resources/quota-transfer-fee-calculator">Quota License Transfer Fee Calculator</a>
            <a href="/resources/liquor-license-attorneys">Liquor License Attorneys</a>
            <a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/" target="_blank" rel="noopener noreferrer">Florida Division of Alcoholic Beverages</a>
            <a href="/resources/florida-liquor-license-types">Types of Florida Liquor Licenses</a>
            <a href="/resources/license-fees">License Fees</a>
            <a href="/resources/forms">Florida ABT Forms</a>
            <a href="/resources/florida-department-of-revenue">Florida Department of Revenue (FDOR)</a>
          </div>
        </details>

        {showContactLink && <a className="native-nav-direct-link" href="/contact"><span>Contact Us</span></a>}
      </nav>

      <style>{`
        .primary-nav .native-nav-dropdown{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
        .primary-nav .native-nav-dropdown>summary{list-style:none;display:inline-flex;align-items:center;gap:5px;color:#fff;cursor:pointer;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap}
        .primary-nav .native-nav-dropdown>summary::-webkit-details-marker{display:none}
        .primary-nav .native-nav-dropdown>summary::marker{content:""}
        .primary-nav .native-nav-dropdown>summary:hover,.primary-nav .native-nav-dropdown>summary:focus-visible{color:var(--gold,#f6a700);outline:none}
        .primary-nav .native-nav-direct-link{display:inline-flex;align-items:center;flex:0 0 auto;color:#fff;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap}
        .primary-nav .native-nav-direct-link:hover,.primary-nav .native-nav-direct-link:focus-visible{color:var(--gold,#f6a700);outline:none}
        .native-nav-menu{position:absolute;top:calc(100% + 10px);left:50%;z-index:10080;display:none;transform:translateX(-50%);padding:6px;border:1px solid #f6a700;border-radius:7px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12);font-family:Arial,Helvetica,sans-serif}
        .native-nav-dropdown[open]>.native-nav-menu,.native-nav-dropdown:hover>.native-nav-menu,.native-nav-dropdown:focus-within>.native-nav-menu{display:grid;gap:4px}
        .native-nav-menu::before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
        .native-nav-menu-standard{width:310px}
        .native-nav-market-menu{width:300px}
        .native-nav-resources-menu{width:350px}
        .primary-nav .native-nav-menu a{position:relative;z-index:1;display:flex;width:100%;padding:12px 13px;border-radius:4px;color:#fff;text-decoration:none;text-transform:none;white-space:normal;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em}
        .primary-nav .native-nav-menu a:hover,.primary-nav .native-nav-menu a:focus-visible{background:#f6a700;color:#061728;outline:none}
        .native-license-types-menu{width:440px;padding:8px}
        .primary-nav .native-license-types-menu a.native-license-card{display:flex;align-items:center;gap:12px;padding:8px;border-radius:6px}
        .native-license-card>img{width:92px;height:66px;object-fit:cover;flex:0 0 auto;border-radius:5px;border:1px solid rgba(246,167,0,.35);box-shadow:0 4px 10px rgba(0,0,0,.22)}
        .native-license-card>span{display:flex;flex-direction:column;gap:4px;min-width:0}
        .native-license-card strong{font-size:14px;line-height:1.2}
        .native-license-card small{font-size:11px;line-height:1.35;font-weight:600;color:#c8d3dc}
        .primary-nav .native-license-types-menu a:hover small,.primary-nav .native-license-types-menu a:focus-visible small{color:#173047}
        .primary-nav .native-license-types-menu a.native-nav-text-link{padding:12px 13px}
        @media(max-width:899px){
          .primary-nav .native-nav-dropdown{width:100%;display:block}
          .primary-nav .native-nav-dropdown>summary{width:100%;min-height:36px;justify-content:center}
          .primary-nav .native-nav-direct-link{width:100%;min-height:36px;justify-content:center}
          .native-nav-menu{position:static;left:auto;top:auto;width:100%!important;max-height:58vh;margin:2px 0 8px;transform:none;overflow:auto;box-shadow:none}
          .native-nav-menu::before{display:none}
          .native-license-card>img{width:78px;height:58px}
        }
      `}</style>
    </>
  );
}
