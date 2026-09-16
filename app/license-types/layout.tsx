import Image from "next/image";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../fllm-official-template.css";

export default function LicenseTypesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="license-types-route fllm-official-page" data-fllm-template="county-v1">
      <style>{`
        .license-types-route{
          min-height:100vh;
          overflow-x:clip;
          background:#081d31;
        }
        .license-types-route .license-types-header-band{
          border-bottom:1px solid #8a6412;
          background:#020c14;
        }
        .license-types-route .forms-site-header.page-shell{
          margin-inline:auto;
        }
        .license-types-route .fllm-official-license-footer{
          margin:0;
          padding:0;
          border-top:1px solid rgba(246,167,0,.55);
          background:linear-gradient(180deg,#03131f 0%,#020b12 100%);
          color:#d5e0e7;
        }
        .license-types-route .fllm-official-license-footer .page-shell{
          width:min(1240px,calc(100% - 40px));
          margin-inline:auto;
        }
        .license-types-route .fllm-official-license-footer .footer-grid{
          display:grid;
          grid-template-columns:minmax(240px,1.35fr) repeat(3,minmax(155px,.75fr));
          gap:38px;
          padding-top:42px;
          padding-bottom:34px;
        }
        .license-types-route .fllm-official-license-footer .footer-brand img{
          display:block;
          width:230px;
          max-width:100%;
          height:auto;
          margin-bottom:16px;
        }
        .license-types-route .fllm-official-license-footer .footer-brand p{
          max-width:300px;
          margin:0 0 10px;
          color:#aebec8;
          font-size:13px;
          line-height:1.6;
        }
        .license-types-route .fllm-official-license-footer .footer-brand b{
          color:#f6a700;
          font-size:12px;
          letter-spacing:.03em;
        }
        .license-types-route .fllm-official-license-footer .footer-grid>div>strong{
          display:block;
          margin-bottom:13px;
          color:#fff;
          font-size:12px;
          letter-spacing:.05em;
          text-transform:uppercase;
        }
        .license-types-route .fllm-official-license-footer .footer-grid>div:not(.footer-brand) a{
          display:block;
          width:fit-content;
          margin:8px 0;
          color:#aebec8;
          font-size:12px;
          line-height:1.35;
          text-decoration:none;
        }
        .license-types-route .fllm-official-license-footer .footer-grid>div:not(.footer-brand) a:hover,
        .license-types-route .fllm-official-license-footer .footer-grid>div:not(.footer-brand) a:focus-visible{
          color:#f6a700;
          outline:none;
        }
        .license-types-route .fllm-official-license-footer .footer-legal{
          padding-top:18px;
          padding-bottom:18px;
          border-top:1px solid rgba(255,255,255,.08);
          color:#8395a1;
          font-size:10px;
          line-height:1.55;
        }
        .license-types-route .fllm-official-license-footer .footer-legal a{
          color:#b9c7cf;
          text-decoration:none;
        }
        .license-types-route .fllm-official-license-footer .footer-legal a:hover,
        .license-types-route .fllm-official-license-footer .footer-legal a:focus-visible{
          color:#f6a700;
          outline:none;
        }
        .license-types-route .fllm-official-license-footer .copyright{
          padding-top:15px;
          padding-bottom:20px;
          border-top:1px solid rgba(255,255,255,.05);
          color:#738590;
          font-size:10px;
        }
        @media(max-width:980px){
          .license-types-route .fllm-official-license-footer .footer-grid{
            grid-template-columns:1fr 1fr;
          }
        }
        @media(max-width:620px){
          .license-types-route .fllm-official-license-footer .page-shell{
            width:min(calc(100% - 24px),1240px);
          }
          .license-types-route .fllm-official-license-footer .footer-grid{
            grid-template-columns:1fr;
            gap:24px;
            padding-top:30px;
          }
          .license-types-route .fllm-official-license-footer .footer-brand img{
            width:210px;
          }
        }
      `}</style>

      <div className="license-types-header-band">
        <FormsSiteHeader />
      </div>

      {children}

      <footer id="resources" className="fllm-official-license-footer" aria-label="Florida Liquor License Market footer">
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image
                src="/assets/brand-footer.svg"
                alt="Florida Liquor License Market"
                width={230}
                height={84}
              />
            </Link>
            <p>Florida&apos;s marketplace for buying, selling &amp; financing liquor licenses.</p>
            <b>Buy · Sell · Finance · Invest</b>
          </div>
          <div>
            <strong>Marketplace</strong>
            <Link href="/listings">Browse Licenses</Link>
            <Link href="/sell-your-license">Sell Your License</Link>
            <Link href="/brokers/list-your-license">For Brokers</Link>
            <Link href="/financing">Financing Solutions</Link>
            <Link href="/investment-opportunities">Investment Opportunities</Link>
          </div>
          <div>
            <strong>Resources</strong>
            <Link href="/free-guide">Free Buyer&apos;s &amp; Seller&apos;s Guide</Link>
            <Link href="/resources">Resource Center</Link>
            <Link href="/resources/application-center">Application Center</Link>
            <Link href="/resources/forms">Florida ABT Forms</Link>
            <Link href="/resources/florida-liquor-license-laws">Florida Liquor License Laws</Link>
          </div>
          <div>
            <strong>Market Data</strong>
            <Link href="/counties">County Markets</Link>
            <Link href="/florida-liquor-license-value">License Value Estimator</Link>
            <Link href="/florida-quota-liquor-license-market-report">Market Insights</Link>
            <Link href="/florida-liquor-license-news">News &amp; Insights</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="page-shell footer-legal">
          Florida Liquor License Market provides marketplace information and transaction resources. Availability, pricing, licensing eligibility and transaction terms should be independently confirmed. See our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms-of-use">Terms of Use</Link>.
        </div>
        <div className="page-shell copyright">© 2026 Florida Liquor License Market. All rights reserved.</div>
      </footer>
    </div>
  );
}
