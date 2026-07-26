(() => {
  const STYLE_ID = "fllm-market-heat-map-fit-v4";
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .fllm-heat-map-canvas{
      padding:24px 24px 38px!important;
      overflow:hidden!important;
      box-sizing:border-box!important;
    }
    .fllm-heat-map-canvas .fllm-heat-map-svg{
      display:block!important;
      width:68%!important;
      height:68%!important;
      max-width:560px!important;
      max-height:500px!important;
      min-width:0!important;
      min-height:0!important;
      margin:auto!important;
      padding:0!important;
      overflow:visible!important;
    }
    @media(max-width:760px){
      .fllm-heat-map-canvas{
        padding:14px 14px 28px!important;
      }
      .fllm-heat-map-canvas .fllm-heat-map-svg{
        width:76%!important;
        height:76%!important;
        max-width:420px!important;
        max-height:calc(100% - 24px)!important;
      }
    }
    @media(max-height:760px){
      .fllm-heat-map-canvas .fllm-heat-map-svg{
        width:62%!important;
        height:62%!important;
        max-height:400px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();