(() => {
  const STYLE_ID = "completed-sales-logo-size-override";
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .completed-sales-map-logo{
      width:42.25%!important;
      max-width:152px!important;
      max-height:64px!important;
    }
    @media(max-width:940px){
      .completed-sales-map-logo{
        width:42.25%!important;
        max-width:127px!important;
        max-height:44px!important;
      }
    }
    @media(max-width:620px){
      .completed-sales-map-logo{
        width:35.75%!important;
        max-width:111px!important;
        max-height:36px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();