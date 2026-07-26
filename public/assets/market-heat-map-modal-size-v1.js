(() => {
  const STYLE_ID = "fllm-market-heat-map-modal-size-v1";
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .fllm-heat-map-modal{
      width:90vw!important;
      height:90vh!important;
      max-width:none!important;
      max-height:none!important;
    }
  `;
  document.head.appendChild(style);
})();
