(() => {
  const STYLE_ID = "market-insights-popup-size-override";
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .market-map-popup{
      width:78vw!important;
      height:78vh!important;
      max-width:1536px!important;
      max-height:984px!important;
      min-width:864px!important;
      min-height:564px!important;
    }
    .market-map-popup-logo{
      width:48.75%!important;
      max-width:176px!important;
      max-height:74px!important;
    }
    @media(max-width:900px){
      .market-map-popup{
        width:94vw!important;
        height:88vh!important;
        min-width:0!important;
        min-height:0!important;
        max-width:none!important;
        max-height:none!important;
      }
      .market-map-popup-logo{
        width:48.75%!important;
        max-width:146px!important;
        max-height:51px!important;
      }
    }
    @media(max-width:560px){
      .market-map-popup-logo{
        width:48.75%!important;
        max-width:119px!important;
        max-height:38px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
