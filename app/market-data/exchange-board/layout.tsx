import type { ReactNode } from "react";
import { EXCHANGE_HERO_BASE64 } from "@/lib/exchange-hero-data";

export default function ExchangeBoardLayout({ children }: { children: ReactNode }) {
  const hero = `data:image/jpeg;base64,${EXCHANGE_HERO_BASE64}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hero-shell{background:#020b14!important;line-height:0!important;min-height:0!important;}
            .hero-shell img{display:none!important;}
            .hero-shell::before{
              content:"";
              display:block;
              width:100%;
              aspect-ratio:480/164;
              background-image:url("${hero}");
              background-position:center;
              background-repeat:no-repeat;
              background-size:cover;
            }
            @media(max-width:700px){
              .hero-shell::before{aspect-ratio:480/164;background-size:cover;}
            }
          `,
        }}
      />
      {children}
    </>
  );
}
