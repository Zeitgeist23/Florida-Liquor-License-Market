import Image from "next/image";
import Header from "./Header";
import SearchAndListings from "./SearchAndListings";
import { UsersIcon, UserIcon, ChartIcon, BankIcon, MapIcon, ShieldIcon, SearchIcon, TagIcon, ArrowIcon } from "./Icons";

export default function HomePage() {
  return <>
    <Header/>
    <main id="top">
      <section className="hero">
        <div className="heroVisual heroVisualLeft"/><div className="heroVisual heroVisualRight"/><div className="heroShade"/>
        <div className="heroInner">
          <h1><span className="whiteLine">Buy &amp; Sell</span><span className="goldLine">Florida Liquor Licenses</span></h1>
          <div className="confidential"><span className="rule"/><span><ShieldIcon/> Confidential Inquiries</span><span className="rule"/></div>
          <div className="audiences"><span><UsersIcon/>Buyers</span><span><UserIcon/>Sellers</span><span><ChartIcon/>Investors</span><span><BankIcon/>Financing Solutions</span><span><MapIcon/>Across Florida</span></div>
          <p className="trustText">Trusted by Florida restaurant owners, hospitality groups, investors and brokers.<br/>Serving buyers and sellers in all 67 Florida counties.</p>
          <SearchAndListings/>
        </div>
      </section>

      <section className="actionGrid container">
        <a className="actionCard dark" href="#featured"><SearchIcon/><div><strong>Browse <em>Featured</em> Licenses</strong><p>Search featured listings by county, license type, and price.</p></div><ArrowIcon/></a>
        <a className="actionCard gold" id="sell" href="#contact"><TagIcon/><div><strong>Sell Your License</strong><p>List your license with confidential marketing and professional representation.</p></div><ArrowIcon/></a>
        <a className="actionCard dark" id="financing" href="#contact"><BankIcon/><div><strong>Explore Financing</strong><p>Connect with financing sources and capital partners.</p></div><ArrowIcon/></a>
        <a className="actionCard light" id="invest" href="#contact"><ChartIcon/><div><strong>Investment Opportunities</strong><p>Discover opportunities in Florida&apos;s hospitality market.</p></div><ArrowIcon/></a>
      </section>

      <section className="stats container"><div><strong>248+</strong><span>Active Listings</span><small>Across Florida</small></div><div><strong>1,250+</strong><span>Registered Buyers</span><small>Ready to Buy</small></div><div><strong>75+</strong><span>Financing Partners</span><small>Lenders &amp; Capital Sources</small></div><div><strong>420+</strong><span>Registered Investors</span><small>Seeking Opportunities</small></div><div><strong>67</strong><span>Florida Counties</span><small>Statewide Coverage</small></div></section>

      <section className="insights container" id="market-data">
        <article><div className="miniHeading"><h3>Recent Florida Transactions</h3><a href="#contact">View All →</a></div><table><thead><tr><th>County</th><th>License Type</th><th>Sale Price</th></tr></thead><tbody><tr><td>Palm Beach</td><td>4COP Quota</td><td>$965,000</td></tr><tr><td>Brevard</td><td>2COP Quota</td><td>$585,000</td></tr><tr><td>Broward</td><td>3PS License</td><td>$615,000</td></tr><tr><td>Hillsborough</td><td>4COP Quota</td><td>$495,000</td></tr></tbody></table></article>
        <article><div className="miniHeading"><h3>Florida Market Insights</h3><a href="#contact">View All →</a></div><div className="mapCard"><div className="floridaShape">FL</div><div><b>Average 4COP quota price by county</b><p><span className="dot d1"/> $600K+</p><p><span className="dot d2"/> $450K–$600K</p><p><span className="dot d3"/> $300K–$450K</p><p><span className="dot d4"/> $200K–$300K</p></div></div></article>
        <article><div className="miniHeading"><h3>Financing Spotlight</h3><a href="#contact">View All →</a></div><ul className="financeList"><li><BankIcon/><div><b>Acquisition Financing</b><span>Finance your next liquor license with competitive terms.</span></div></li><li><ChartIcon/><div><b>Refinance Existing Debt</b><span>Explore lower rates and flexible structures.</span></div></li><li><UsersIcon/><div><b>Private Capital Introductions</b><span>Connect with private lenders and investors.</span></div></li></ul></article>
      </section>

      <section className="cta container" id="contact"><div><strong>Ready to Buy, Sell, Finance, or Invest in a Liquor License?</strong><span>Join Florida&apos;s trusted marketplace for liquor license transactions.</span></div><a href="mailto:info@floridaliquorlicensemarket.com">Get Started Today →</a></section>
    </main>
    <footer className="siteFooter" id="resources"><div className="container footerGrid"><div><Image src="/images/logo.png" alt="Florida Liquor License Market" width={180} height={70}/><p>Florida&apos;s Marketplace for Buying, Selling &amp; Financing Liquor Licenses.</p><b>Buy · Sell · Finance · Invest</b></div><div><h4>Marketplace</h4><a href="#featured">Browse Licenses</a><a href="#sell">Sell Your License</a><a href="#financing">Financing Solutions</a></div><div><h4>Company</h4><a href="#contact">About Us</a><a href="#contact">Our Process</a><a href="#contact">Contact Us</a></div><div><h4>Resources</h4><a href="#market-data">Market Data</a><a href="#contact">FAQ</a><a href="#contact">Documents</a></div></div></footer>
  </>;
}
