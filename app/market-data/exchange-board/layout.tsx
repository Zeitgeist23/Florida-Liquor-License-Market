import type { ReactNode } from "react";

export default function ExchangeBoardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Exchange Board only. Hide the broken legacy image completely and
               render the approved Exchange artwork from the public assets folder. */
            .exchange-page > .hero-shell{
              background:#020b14!important;
              line-height:0!important;
              min-height:0!important;
              overflow:hidden!important;
            }
            .exchange-page > .hero-shell > img{
              display:none!important;
              visibility:hidden!important;
              width:0!important;
              height:0!important;
              max-width:0!important;
              max-height:0!important;
            }
            .exchange-page > .hero-shell::before{
              content:"";
              display:block;
              width:100%;
              aspect-ratio:560/192;
              background-image:url('/assets/fllm-exchange-board-header-approved.svg?v=2');
              background-position:center;
              background-repeat:no-repeat;
              background-size:cover;
            }
            @media(max-width:700px){
              .exchange-page > .hero-shell::before{
                aspect-ratio:560/192;
                background-size:cover;
              }
            }
          `,
        }}
      />
      {children}
    </>
  );
}
