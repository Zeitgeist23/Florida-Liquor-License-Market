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
        .license-types-route-footer{
          padding:20px 0 0;
          border-top:1px solid #6e531d;
          background:linear-gradient(90deg,#071f36 0%,#0c3558 50%,#071f36 100%);
        }
        .license-types-route-footer__shell{
          box-sizing:border-box;
          width:min(1240px,calc(100% - 40px));
          margin:0 auto;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          padding-bottom:18px;
        }
        .license-types-route-footer__brand{
          display:flex;
          align-items:center;
          gap:14px;
        }
        .license-types-route-footer__brand>a{
          display:block;
          line-height:0;
        }
        .license-types-route-footer__brand img{
          display:block;
          width:130px;
          height:auto;
        }
        .license-types-route-footer span{
          color:#e4eef5;
          font-size:12px;
        }
        .license-types-route-footer nav{
          display:flex;
          flex-wrap:wrap;
          gap:20px;
        }
        .license-types-route-footer a{
          color:#f3f7fa;
          font-size:12px;
          font-weight:800;
          text-decoration:none;
        }
        .license-types-route-footer a:hover,
        .license-types-route-footer a:focus-visible{
          color:#f1a600;
          outline:none;
        }
        @media(max-width:650px){
          .license-types-route-footer__shell{
            width:min(calc(100% - 24px),1240px);
            flex-direction:column;
            text-align:center;
          }
          .license-types-route-footer__brand{
            flex-direction:column;
            gap:9px;
          }
          .license-types-route-footer nav{
            justify-content:center;
          }
        }
      `}</style>

      <div className="license-types-header-band">
        <FormsSiteHeader />
      </div>

      {children}

      <footer className="license-types-route-footer">
        <div className="license-types-route-footer__shell">
          <div className="license-types-route-footer__brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image
                src="/assets/brand-sharp.svg"
                alt="Florida Liquor License Market"
                width={130}
                height={53}
              />
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
    </div>
  );
}
