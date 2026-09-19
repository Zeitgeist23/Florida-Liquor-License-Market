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
      `}</style>

      <div className="license-types-header-band">
        <FormsSiteHeader />
      </div>

      {children}


    </div>
  );
}
