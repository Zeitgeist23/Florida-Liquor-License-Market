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
        .license-types-route .directory-shell{
          width:min(1240px,calc(100% - 40px));
          margin:0 auto;
        }
        .license-types-route .directory-footer{
          padding:20px 0 0;
          border-top:1px solid #6e531d;
          background:linear-gradient(90deg,#071f36 0%,#0c3558 50%,#071f36 100%);
        }
        .license-types-route .directory-footer>.directory-shell{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          padding-bottom:18px;
        }
        .license-types-route .directory-footer-brand{
          display:flex;
          align-items:center;
          gap:14px;
        }
        .license-types-route .directory-footer-brand>a{
          display:block;
          line-height:0;
        }
        .license-types-route .directory-footer-brand img{
          display:block;
          width:130px;
          height:auto;
        }
        .license-types-route .directory-footer span{
          color:#e4eef5;
          font-size:12px;
        }
        .license-types-route .directory-footer nav{
          display:flex;
          flex-wrap:wrap;
          gap:20px;
        }
        .license-types-route .directory-footer a{
          color:#f3f7fa;
          font-size:12px;
          font-weight:800;
          text-decoration:none;
        }
        .license-types-route .directory-footer a:hover,
        .license-types-route .directory-footer a:focus-visible{
          color:#f1a600;
          outline:none;
        }
        .license-types-route .directory-footer>.national-marketplace-footer-link{
          box-sizing:border-box;
          width:100%;
          margin:0;
          padding:14px max(20px,calc((100% - 1240px)/2)) 16px;
          border-top:1px solid #263f55;
          background:#0a2947;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          color:#dce8f0;
          font-size:11px;
          text-align:left;
        }
        .license-types-route .directory-footer>.national-marketplace-footer-link a{
          color:#f3f7fa;
          font-size:11px;
          font-weight:800;
        }
        @media(max-width:650px){
          .license-types-route .directory-shell{
            width:min(calc(100% - 24px),1240px);
          }
          .license-types-route .directory-footer>.directory-shell,
          .license-types-route .directory-footer>.national-marketplace-footer-link{
            flex-direction:column;
            text-align:center;
          }
          .license-types-route .directory-footer-brand{
            flex-direction:column;
            gap:9px;
          }
          .license-types-route .directory-footer nav{
            justify-content:center;
          }
        }
      `}</style>

      <div className="license-types-header-band">
        <FormsSiteHeader />
      </div>

      {children}

      <footer className="directory-footer">
        <div className="directory-shell">
          <div className="directory-footer-brand">
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
