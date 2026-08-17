(() => {
  const STYLE_ID = "fllm-market-heat-map-styles-v4";
  const BACKDROP_CLASS = "fllm-heat-map-backdrop";
  const MODAL_CLASS = "fllm-heat-map-modal";
  const BODY_CLASS = "fllm-heat-map-open";
  const SVG_NS = "http://www.w3.org/2000/svg";

  const countyOrder = [
    "Okaloosa", "Glades", "DeSoto", "Dixie", "Martin", "Hardee", "Bay", "Flagler", "Orange", "Walton",
    "Pasco", "St. Lucie", "Washington", "Sumter", "Palm Beach", "Alachua", "Lafayette", "Okeechobee",
    "Hernando", "Charlotte", "Lee", "Lake", "Suwannee", "Levy", "Nassau", "Madison", "Columbia",
    "Calhoun", "Citrus", "Franklin", "Gadsden", "Gulf", "Jefferson", "Pinellas", "Clay", "Santa Rosa",
    "Seminole", "Volusia", "St. Johns", "Osceola", "Sarasota", "Gilchrist", "Hendry", "Highlands",
    "Indian River", "Manatee", "Union", "Duval", "Wakulla", "Jackson", "Leon", "Escambia", "Miami-Dade",
    "Bradford", "Taylor", "Broward", "Polk", "Brevard", "Hamilton", "Collier", "Baker", "Liberty", "Holmes",
    "Putnam", "Marion", "Hillsborough", "Monroe",
  ];

  let backdrop = null;
  let modal = null;
  let tooltip = null;
  let previousFocus = null;
  let countyBackdrop = null;
  let countyDialog = null;
  let countyPreviousFocus = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS}{overflow:hidden!important}
      .${BACKDROP_CLASS}{position:fixed;inset:0;z-index:13998;background:radial-gradient(circle at 50% 18%,rgba(17,43,64,.56),rgba(2,10,17,.94) 64%);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
      .${MODAL_CLASS}{position:fixed;top:50%;left:50%;z-index:13999;width:min(94vw,1120px);height:min(90vh,900px);transform:translate(-50%,-50%);display:flex;flex-direction:column;overflow:hidden;border:1px solid #c38b18;border-radius:8px;background:#050708;color:#f6f3ea;box-shadow:0 34px 100px rgba(0,0,0,.8);font-family:Arial,Helvetica,sans-serif}
      .fllm-heat-map-header{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding:18px 22px 16px;border-bottom:1px solid #a97513;background:linear-gradient(135deg,#071a2b,#0d304b)}
      .fllm-heat-map-brand{display:flex;align-items:center;gap:18px;min-width:0}.fllm-heat-map-brand img{width:170px;height:68px;object-fit:contain;object-position:left center}
      .fllm-heat-map-kicker{display:block;margin-bottom:5px;color:#f1a600;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
      .fllm-heat-map-header h2{margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(25px,3.3vw,38px);line-height:1.05}
      .fllm-heat-map-header p{margin:7px 0 0;color:#d4dde3;font-size:13px;line-height:1.45}
      .fllm-heat-map-close{flex:0 0 42px;width:42px;height:42px;display:grid;place-items:center;border:1px solid #d89400;border-radius:4px;background:#090b0c;color:#f1a600;cursor:pointer;font:700 28px/1 Arial,sans-serif}.fllm-heat-map-close:hover,.fllm-heat-map-close:focus-visible{background:#f1a600;color:#07101a;outline:none}
      .fllm-heat-map-content{min-height:0;flex:1;display:grid;grid-template-columns:230px minmax(0,1fr);gap:18px;padding:18px;background:radial-gradient(circle at 50% 0%,#111719,#080b0c 55%,#030405)}
      .fllm-heat-map-legend{align-self:start;padding:18px;border:1px solid #775d23;border-radius:6px;background:linear-gradient(145deg,#111516,#080a0b);box-shadow:0 12px 30px rgba(0,0,0,.34)}
      .fllm-heat-map-legend h3{margin:0 0 6px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:18px}.fllm-heat-map-legend p{margin:0 0 16px;color:#bfc7cb;font-size:11px;line-height:1.45}
      .fllm-heat-map-legend ul{display:grid;gap:9px;margin:0;padding:0;list-style:none}.fllm-heat-map-legend li{display:flex;align-items:center;gap:10px;color:#ecece8;font-size:11px;font-weight:800}.fllm-heat-map-legend i{width:25px;height:14px;flex:0 0 25px;border:1px solid rgba(255,255,255,.42);border-radius:2px}
      .fllm-heat-map-note{display:block;margin-top:17px;padding-top:14px;border-top:1px solid #3b4145;color:#929da3;font-size:10px;line-height:1.45}
      .fllm-heat-map-canvas{position:relative;min-width:0;min-height:0;display:grid;place-items:center;overflow:hidden;padding:12px;box-sizing:border-box;border:1px solid #775d23;border-radius:6px;background:radial-gradient(circle at 52% 45%,#18364d 0%,#0a1b29 50%,#03101a 100%)}
      .fllm-heat-map-loading{display:grid;place-items:center;min-height:300px;padding:30px;color:#d7dde0;font-weight:800;text-align:center}
      .fllm-heat-map-svg{display:block;width:auto;height:auto;max-width:92%;max-height:92%;box-sizing:border-box;overflow:visible}.fllm-heat-map-svg>rect{fill:transparent!important}.fllm-heat-map-svg path{cursor:pointer;transition:filter .14s ease,opacity .14s ease,stroke-width .14s ease}.fllm-heat-map-svg path:hover,.fllm-heat-map-svg path:focus{filter:brightness(1.15) drop-shadow(0 2px 3px rgba(0,0,0,.55));stroke:#fff!important;stroke-width:1.7!important;outline:none}
      .fllm-heat-map-tooltip{position:fixed;z-index:14001;min-width:205px;max-width:280px;pointer-events:none;padding:11px 13px;border:1px solid #d29200;border-radius:4px;background:rgba(4,9,12,.97);color:#fff;box-shadow:0 14px 34px rgba(0,0,0,.55);transform:translate(14px,14px);font-size:12px;line-height:1.4}.fllm-heat-map-tooltip[hidden]{display:none}.fllm-heat-map-tooltip strong{display:block;margin-bottom:4px;color:#f1a600;font-family:Georgia,'Times New Roman',serif;font-size:16px}.fllm-heat-map-tooltip span{display:block;color:#eef1f2}.fllm-heat-map-tooltip small{display:block;margin-top:3px;color:#aeb8bd;font-size:10px}.fllm-heat-map-tooltip .fllm-heat-map-tooltip-action{margin-top:7px;color:#f1a600;font-weight:900;text-transform:uppercase;letter-spacing:.05em}
      .fllm-heat-map-footer{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:13px 20px;border-top:1px solid #a97513;background:#020405;color:#bfc7cb;font-size:11px}.fllm-heat-map-footer a{color:#f1a600;font-weight:900;text-decoration:none}.fllm-heat-map-footer a:hover{color:#fff}
      .fllm-county-listings-backdrop{position:fixed;inset:0;z-index:14002;background:rgba(1,7,12,.78);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
      .fllm-county-listings-dialog{position:fixed;top:50%;left:50%;z-index:14003;width:min(86vw,1040px);max-height:82vh;transform:translate(-50%,-50%);display:flex;flex-direction:column;overflow:hidden;border:1px solid #d29200;border-radius:8px;background:#07101a;color:#f7f4ec;box-shadow:0 30px 100px rgba(0,0,0,.85);font-family:Arial,Helvetica,sans-serif}
      .fllm-county-listings-header{display:flex;align-items:flex-start;justify-content:space-between;gap:22px;padding:20px 22px 18px;border-bottom:1px solid #a97513;background:linear-gradient(135deg,#0b2940,#061728)}
      .fllm-county-listings-header span{display:block;margin-bottom:5px;color:#f1a600;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.fllm-county-listings-header h3{margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(24px,3vw,36px);line-height:1.05}.fllm-county-listings-header p{margin:7px 0 0;color:#d4dde3;font-size:13px}
      .fllm-county-listings-close{flex:0 0 42px;width:42px;height:42px;display:grid;place-items:center;border:1px solid #d89400;border-radius:4px;background:#050708;color:#f1a600;cursor:pointer;font:700 28px/1 Arial,sans-serif}.fllm-county-listings-close:hover,.fllm-county-listings-close:focus-visible{background:#f1a600;color:#07101a;outline:none}
      .fllm-county-listings-grid{min-height:0;overflow:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;padding:20px;background:radial-gradient(circle at 50% 0%,#111719,#050708 70%)}
      .fllm-county-listing-card{min-width:0;overflow:hidden;border:1px solid #775d23;border-radius:7px;background:#f7f7f5;color:#111820;box-shadow:0 12px 28px rgba(0,0,0,.32)}
      .fllm-county-listing-map{height:145px;padding:10px;background:#061728}.fllm-county-listing-map img{display:block;width:100%;height:100%;object-fit:contain}
      .fllm-county-listing-body{padding:16px}.fllm-county-listing-location{margin:0;color:#19334a;font-size:12px;font-weight:900;text-transform:uppercase}.fllm-county-listing-price{margin:7px 0 10px;color:#07101a;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1}.fllm-county-listing-facts{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;padding:10px 0;border-top:1px solid #d7dce0;border-bottom:1px solid #d7dce0;color:#35424c;font-size:11px;font-weight:800}.fllm-county-listing-reference{display:block;margin:11px 0 0;color:#67727a;font-size:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}
      .fllm-county-listing-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:14px}.fllm-county-listing-actions a{display:grid;place-items:center;min-height:40px;padding:8px;border:1px solid #c48600;border-radius:4px;text-align:center;text-decoration:none;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.03em}.fllm-county-listing-inquire{background:#f1a600;color:#07101a}.fllm-county-listing-offer{background:#07101a;color:#f1a600}.fllm-county-listing-actions a:hover,.fllm-county-listing-actions a:focus-visible{filter:brightness(1.08);outline:2px solid #f1a600;outline-offset:2px}
      .fllm-county-listings-empty{grid-column:1/-1;padding:42px 24px;text-align:center;border:1px solid #775d23;border-radius:7px;background:#0a1218}.fllm-county-listings-empty strong{display:block;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:25px}.fllm-county-listings-empty p{margin:9px auto 18px;max-width:520px;color:#bfc7cb;font-size:13px;line-height:1.5}.fllm-county-listings-empty a{display:inline-grid;place-items:center;min-height:42px;padding:8px 18px;border:1px solid #d29200;border-radius:4px;background:#f1a600;color:#07101a;text-decoration:none;font-size:11px;font-weight:900;text-transform:uppercase}
      .fllm-county-listings-footer{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:13px 20px;border-top:1px solid #a97513;background:#020405;color:#bfc7cb;font-size:11px}.fllm-county-listings-footer a{color:#f1a600;font-weight:900;text-decoration:none}

      /* Use the exact current marketplace-card treatment inside every heat-map county dialog. */
      .fllm-county-listings-grid{
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:18px!important;
        align-items:start!important;
        align-content:start!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page{
        width:100%!important;
        min-width:0!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
        background:transparent!important;
        color:inherit!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-card{
        position:relative!important;
        width:100%!important;
        min-height:286px!important;
        margin:0!important;
        display:grid!important;
        grid-template-columns:minmax(0,1.08fr) minmax(150px,.92fr)!important;
        grid-template-rows:1fr!important;
        align-items:stretch!important;
        overflow:hidden!important;
        border:1px solid #9b741d!important;
        border-radius:8px!important;
        color:#f7f4ec!important;
        background:linear-gradient(145deg,#0b263b 0%,#071d2e 56%,#061725 100%)!important;
        box-shadow:0 10px 28px rgba(0,0,0,.28)!important;
        transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease!important;
        text-align:left!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-card:hover{
        transform:translateY(-2px)!important;
        border-color:#e3a314!important;
        box-shadow:0 15px 34px rgba(0,0,0,.38),0 0 0 1px rgba(241,166,0,.08)!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-type-badge{
        position:absolute!important;
        top:12px!important;
        right:12px!important;
        left:auto!important;
        z-index:3!important;
        padding:5px 10px!important;
        border:1px solid #d99b10!important;
        border-radius:5px!important;
        color:#f5a900!important;
        background:rgba(4,17,27,.94)!important;
        font:900 9px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.02em!important;
        text-transform:uppercase!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body{
        grid-column:1!important;
        grid-row:1!important;
        min-width:0!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:flex-start!important;
        padding:20px 10px 18px 18px!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo{
        grid-column:2!important;
        grid-row:1!important;
        width:100%!important;
        height:auto!important;
        min-height:286px!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        padding:42px 10px 46px 4px!important;
        overflow:visible!important;
        border:0!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo .florida-county-map,
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo svg{
        display:block!important;
        width:118%!important;
        height:118%!important;
        max-width:215px!important;
        max-height:215px!important;
        margin:auto!important;
        object-fit:contain!important;
        filter:drop-shadow(0 8px 14px rgba(0,0,0,.38))!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-county-row{
        width:100%!important;
        margin:27px 0 0!important;
        padding:0!important;
        color:#f6f4ed!important;
        background:transparent!important;
        font:700 20px/1.14 Georgia,'Times New Roman',serif!important;
        letter-spacing:normal!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-pin{
        margin-right:6px!important;
        color:#f1a600!important;
        font:400 15px/1 Arial,Helvetica,sans-serif!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-county-link{
        color:#f6f4ed!important;
        font:inherit!important;
        letter-spacing:normal!important;
        text-decoration:none!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-county-link:hover{color:#f5ae17!important}
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body>h2{
        margin:8px 0 0!important;
        padding:0!important;
        color:#f3a700!important;
        background:transparent!important;
        font:900 30px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.02em!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body>h2 a{
        color:inherit!important;
        font:inherit!important;
        letter-spacing:inherit!important;
        text-decoration:none!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-facts{
        width:auto!important;
        min-height:0!important;
        margin:12px 0 0!important;
        padding:0!important;
        display:block!important;
        border:0!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .availability-pill{
        display:inline-flex!important;
        align-items:center!important;
        gap:7px!important;
        min-height:29px!important;
        padding:0 11px!important;
        border:1px solid rgba(55,190,92,.72)!important;
        border-radius:999px!important;
        color:#51d56f!important;
        background:rgba(19,86,45,.15)!important;
        font:900 11px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.025em!important;
        text-transform:uppercase!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .availability-dot{
        width:8px!important;
        height:8px!important;
        display:inline-block!important;
        flex:0 0 8px!important;
        border-radius:50%!important;
        background:#37c85b!important;
        box-shadow:0 0 8px rgba(55,200,91,.38)!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-description{
        width:100%!important;
        min-height:42px!important;
        margin:14px 0 0!important;
        padding:0!important;
        color:#e4e8ea!important;
        background:transparent!important;
        font:400 12px/1.46 Arial,Helvetica,sans-serif!important;
        letter-spacing:normal!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-description p{
        margin:0!important;
        padding:0!important;
        overflow:hidden!important;
        display:-webkit-box!important;
        -webkit-box-orient:vertical!important;
        -webkit-line-clamp:2!important;
        color:#e4e8ea!important;
        background:transparent!important;
        font:400 12px/1.46 Arial,Helvetica,sans-serif!important;
        letter-spacing:normal!important;
        text-transform:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-actions{
        width:min(245px,100%)!important;
        min-height:0!important;
        margin:auto 0 0!important;
        padding-top:15px!important;
        display:block!important;
        background:transparent!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-view-button{
        width:100%!important;
        min-height:43px!important;
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        gap:13px!important;
        padding:0 16px!important;
        border:1px solid #efaa10!important;
        border-radius:5px!important;
        color:#07131d!important;
        background:linear-gradient(145deg,#ffc13a 0%,#e99b00 100%)!important;
        box-shadow:0 5px 15px rgba(228,148,0,.18)!important;
        font:900 11px/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.035em!important;
        text-decoration:none!important;
        text-transform:uppercase!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-view-button:hover{
        color:#03090d!important;
        background:linear-gradient(145deg,#ffd05d 0%,#f1a600 100%)!important;
        filter:none!important;
      }
      .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-view-button span{
        font-size:19px!important;
        font-weight:400!important;
        line-height:1!important;
      }
      @media(max-width:820px){
        .fllm-county-listings-grid{grid-template-columns:1fr!important}
      }
      @media(max-width:520px){
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-card{min-height:auto!important;grid-template-columns:1fr!important}
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-body{grid-column:1!important;grid-row:1!important;padding:18px 16px 16px!important}
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-photo{grid-column:1!important;grid-row:2!important;min-height:170px!important;padding:8px 18px 16px!important}
        .fllm-county-listings-dialog .fllm-popup-card-shell.results-page .result-actions{width:100%!important;margin-top:14px!important}
      }

      @media(max-width:760px){.${MODAL_CLASS}{width:97vw;height:94vh}.fllm-heat-map-header{padding:13px}.fllm-heat-map-brand{gap:10px}.fllm-heat-map-brand img{width:105px;height:50px}.fllm-heat-map-header h2{font-size:21px}.fllm-heat-map-header p{font-size:10px}.fllm-heat-map-content{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);padding:10px;gap:10px}.fllm-heat-map-legend{padding:12px}.fllm-heat-map-legend p,.fllm-heat-map-note{display:none}.fllm-heat-map-legend ul{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.fllm-heat-map-legend li{font-size:9px;gap:5px}.fllm-heat-map-legend i{width:18px;height:11px;flex-basis:18px}.fllm-heat-map-svg{max-width:88%;max-height:88%}.fllm-heat-map-footer{align-items:flex-start;flex-direction:column;padding:10px 14px}.fllm-county-listings-dialog{width:94vw;max-height:88vh}.fllm-county-listings-header{padding:15px}.fllm-county-listings-header h3{font-size:23px}.fllm-county-listings-grid{grid-template-columns:1fr;padding:12px;gap:12px}.fllm-county-listings-footer{align-items:flex-start;flex-direction:column;padding:10px 14px}}
    `;
    document.head.appendChild(style);
  }

  function money(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }

  function countyKey(name) {
    return String(name || "").replace(/\s+County$/i, "").trim();
  }

  function listingsByCounty(listings) {
    const counties = new Map();
    listings.forEach((listing) => {
      const key = countyKey(listing.county);
      if (!key) return;
      const current = counties.get(key) || [];
      current.push(listing);
      counties.set(key, current);
    });
    return counties;
  }

  function aggregateListings(listings) {
    const counties = new Map();
    listings.forEach((listing) => {
      const key = countyKey(listing.county);
      if (!key) return;
      const current = counties.get(key) || { count: 0, highestPrice: null };
      current.count += 1;
      if (Number.isFinite(listing.price)) current.highestPrice = current.highestPrice === null ? listing.price : Math.max(current.highestPrice, listing.price);
      counties.set(key, current);
    });
    return counties;
  }

  function priceColor(data) {
    if (!data || data.count === 0) return "#27333a";
    if (data.highestPrice === null) return "#6f7f8b";
    if (data.highestPrice >= 750000) return "#e74227";
    if (data.highestPrice >= 600000) return "#f47b20";
    if (data.highestPrice >= 450000) return "#f2ad1f";
    if (data.highestPrice >= 300000) return "#a9a62f";
    return "#3f8d43";
  }

  function tooltipCopy(county, data) {
    const count = data?.count || 0;
    return {
      title: `${county} County`,
      count: `${count} license${count === 1 ? "" : "s"} currently for sale`,
      price: count === 0 ? "No current listings" : data.highestPrice === null ? "Highest asking price: undisclosed" : `Highest asking price: ${money(data.highestPrice)}`,
      action: count === 0 ? "Click to view county availability" : "Click to view listings",
    };
  }

  function moveTooltip(event) {
    if (!tooltip || tooltip.hidden) return;
    const padding = 18;
    const width = tooltip.offsetWidth || 230;
    const height = tooltip.offsetHeight || 98;
    let left = Number.isFinite(event.clientX) ? event.clientX : padding;
    let top = Number.isFinite(event.clientY) ? event.clientY : padding;
    if (left + width + 28 > window.innerWidth) left = Math.max(padding, left - width - 28);
    if (top + height + 28 > window.innerHeight) top = Math.max(padding, top - height - 28);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function showTooltip(county, data, event) {
    if (!tooltip) return;
    const copy = tooltipCopy(county, data);
    tooltip.innerHTML = `<strong>${escapeHtml(copy.title)}</strong><span>${escapeHtml(copy.count)}</span><small>${escapeHtml(copy.price)}</small><small class="fllm-heat-map-tooltip-action">${escapeHtml(copy.action)}</small>`;
    tooltip.hidden = false;
    moveTooltip(event);
  }

  function hideTooltip() {
    if (tooltip) tooltip.hidden = true;
  }

  function closeCountyListings({ restoreFocus = true } = {}) {
    if (!countyDialog && !countyBackdrop) return;
    countyDialog?.remove();
    countyBackdrop?.remove();
    countyDialog = null;
    countyBackdrop = null;
    if (restoreFocus && countyPreviousFocus instanceof HTMLElement) countyPreviousFocus.focus();
    countyPreviousFocus = null;
  }

  function inquiryHref(listing) {
    const description = encodeURIComponent(`${listing.county || ""} ${listing.type || ""}`.trim());
    const reference = encodeURIComponent(listing.sourceRef || "");
    return `/contact?listing=${description}&ref=${reference}`;
  }

  function offerHref(listing) {
    const description = encodeURIComponent(`${listing.county || ""} ${listing.type || ""}`.trim());
    const reference = encodeURIComponent(listing.sourceRef || "");
    return `/submit-offer?listing=${description}&ref=${reference}`;
  }

  function countyPageSlug(value) {
    return String(value || "")
      .replace(/\s+County$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function listingReferenceSlug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function listingReferenceHash(value) {
    let hash = 2166136261;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function directListingHref(listing, displayCounty, type) {
    const supplied = String(listing?.href || "").trim();
    if (/^\/listings\/[^/?#]+/i.test(supplied)) return supplied;

    const reference = String(listing?.sourceRef || "").trim();
    if (!reference) return `/listings?county=${encodeURIComponent(displayCounty)}`;
    if (/^FLLM-PAID-/i.test(reference)) return `/listings/${encodeURIComponent(reference.toUpperCase())}`;

    const refPart = listingReferenceSlug(reference).slice(0, 34) || "listing";
    const typePart = /3PS/i.test(type) ? "3ps-quota" : "4cop-quota";
    return `/listings/${countyPageSlug(displayCounty)}-${typePart}-${refPart}-${listingReferenceHash(reference)}`;
  }

  function renderListingCard(listing, county) {
    const displayCounty = listing.county || `${county} County`;
    const type = listing.type || "Florida Quota Liquor License";
    const priceLabel = listing.priceLabel || (Number.isFinite(listing.price) ? money(listing.price) : "Price Undisclosed");
    const reference = String(listing.sourceRef || "").trim();
    const href = directListingHref(listing, displayCounty, type);
    const mapUrl = `/api/county-map?county=${encodeURIComponent(displayCounty)}`;
    const description = `${displayCounty} ${type} opportunity currently available through Florida Liquor License Market.`;

    return `<div class="fllm-popup-card-shell results-page">
      <article class="result-card result-card-available" data-listing-reference="${escapeHtml(reference)}" data-listing-href="${escapeHtml(href)}" data-marketplace-listing-card="true">
        <span class="result-type-badge">${escapeHtml(type)}</span>
        <div class="result-photo"><img class="florida-county-map" src="${escapeHtml(mapUrl)}" alt="Florida map with ${escapeHtml(displayCounty)} highlighted" /></div>
        <div class="result-body">
          <p class="result-county-row"><span class="result-pin" aria-hidden="true">●</span><a class="result-county-link" href="/counties/${countyPageSlug(displayCounty)}">${escapeHtml(displayCounty)}</a></p>
          <h2><a href="${escapeHtml(href)}" aria-label="View ${escapeHtml(type)} listing in ${escapeHtml(displayCounty)}">${escapeHtml(priceLabel)}</a></h2>
          <div class="result-facts"><span class="availability-pill" title="Available"><span class="availability-dot" aria-hidden="true"></span>Available</span></div>
          <div class="result-description"><p>${escapeHtml(description)}</p></div>
          <div class="result-actions"><a class="btn btn-gold result-view-button" href="${escapeHtml(href)}">View License <span aria-hidden="true">›</span></a></div>
        </div>
      </article>
    </div>`;
  }

  function openCountyListings(county, listings, trigger) {
    closeCountyListings({ restoreFocus: false });
    hideTooltip();
    countyPreviousFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
    countyBackdrop = document.createElement("div");
    countyBackdrop.className = "fllm-county-listings-backdrop";
    countyBackdrop.addEventListener("click", () => closeCountyListings());
    countyDialog = document.createElement("section");
    countyDialog.className = "fllm-county-listings-dialog";
    countyDialog.setAttribute("role", "dialog");
    countyDialog.setAttribute("aria-modal", "true");
    countyDialog.setAttribute("aria-labelledby", "fllm-county-listings-title");
    const count = listings.length;
    const cards = count
      ? listings.map((listing) => renderListingCard(listing, county)).join("")
      : `<div class="fllm-county-listings-empty"><strong>No active listings in ${escapeHtml(county)} County</strong><p>There are no current marketplace listings for this county. Inventory changes frequently, so review the full listings page for newly added opportunities.</p><a href="/listings">View All Listings</a></div>`;
    countyDialog.innerHTML = `
      <header class="fllm-county-listings-header"><div><span>Florida Marketplace Inventory</span><h3 id="fllm-county-listings-title">${escapeHtml(county)} County Listings</h3><p>${count} liquor license${count === 1 ? "" : "s"} currently for sale</p></div><button class="fllm-county-listings-close" type="button" aria-label="Close ${escapeHtml(county)} County listings">×</button></header>
      <div class="fllm-county-listings-grid">${cards}</div>
      <footer class="fllm-county-listings-footer"><span>Prices and availability remain subject to confirmation.</span><a href="/listings">Open Full Listings Page ›</a></footer>`;
    countyDialog.querySelector(".fllm-county-listings-close")?.addEventListener("click", () => closeCountyListings());
    document.body.append(countyBackdrop, countyDialog);
    countyDialog.querySelector(".fllm-county-listings-close")?.focus();
  }

  function stylePath(path, county, countyData, groupedListings) {
    const data = countyData.get(county) || { count: 0, highestPrice: null };
    const listings = groupedListings.get(county) || [];
    path.querySelector("title")?.remove();
    path.setAttribute("fill", priceColor(data));
    path.setAttribute("stroke", "#e7edf0");
    path.setAttribute("stroke-width", data.count ? "0.9" : "0.55");
    path.setAttribute("data-heat-map-county", county);
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    const title = path.ownerDocument.createElementNS(SVG_NS, "title");
    const copy = tooltipCopy(county, data);
    title.textContent = `${copy.title} — ${copy.count}; ${copy.price}. ${copy.action}.`;
    path.setAttribute("aria-label", title.textContent);
    path.prepend(title);
    path.addEventListener("pointerenter", (event) => showTooltip(county, data, event));
    path.addEventListener("pointermove", moveTooltip);
    path.addEventListener("pointerleave", hideTooltip);
    path.addEventListener("focus", () => {
      const rect = path.getBoundingClientRect();
      showTooltip(county, data, { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
    });
    path.addEventListener("blur", hideTooltip);
    path.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCountyListings(county, listings, path);
    });
    path.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openCountyListings(county, listings, path);
    });
  }

  function countyNameFromPath(path, index) {
    const dataName = path.getAttribute("data-market-county") || path.getAttribute("data-heat-map-county");
    if (dataName) return countyKey(dataName);
    const titleText = path.querySelector("title")?.textContent || "";
    const titleMatch = titleText.match(/^(.+?)\s+County(?:\s|—|-|$)/i);
    return countyKey(titleMatch?.[1] || countyOrder[index] || "");
  }

  function prepareMap(source, countyData, groupedListings) {
    const svg = source.cloneNode(true);
    if (!(svg instanceof Element) || svg.localName.toLowerCase() !== "svg") return null;
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("viewBox", "135 10 295 275");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Interactive Florida county heat map. Select a county to view current liquor license listings.");
    svg.classList.add("fllm-heat-map-svg");
    const paths = Array.from(svg.querySelectorAll("path"));
    paths.forEach((path, index) => {
      const county = countyNameFromPath(path, index);
      if (county) stylePath(path, county, countyData, groupedListings);
    });
    return svg;
  }

  async function loadSourceMap() {
    const inline = document.querySelector(".florida-map-art svg.florida-county-map, svg.florida-county-map");
    if (inline instanceof SVGSVGElement) return inline;

    const response = await fetch("/api/market-map?heat-map=1", { cache: "no-store" });
    if (!response.ok) throw new Error(`County map returned ${response.status}`);
    const sourceText = await response.text();
    const parsed = new DOMParser().parseFromString(sourceText, "image/svg+xml");
    if (parsed.querySelector("parsererror")) throw new Error("County map SVG could not be parsed");
    const svg = parsed.documentElement;
    if (!svg || svg.localName.toLowerCase() !== "svg") throw new Error("County map response did not contain an SVG");
    return svg;
  }

  function closeMarketDataMenu() {
    const menu = document.getElementById("market-data-header-menu");
    menu?.classList.remove("is-open");
    menu?.setAttribute("aria-hidden", "true");
    const trigger = Array.from(document.querySelectorAll(".primary-nav a")).find((link) => /^market data$/i.test(normalizedText(link)));
    trigger?.setAttribute("aria-expanded", "false");
  }

  function closeModal() {
    if (!modal) return;
    closeCountyListings({ restoreFocus: false });
    hideTooltip();
    tooltip?.remove();
    modal.remove();
    backdrop?.remove();
    document.body.classList.remove(BODY_CLASS);
    modal = null;
    backdrop = null;
    tooltip = null;
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  }

  function buildModal(trigger) {
    installStyles();
    closeMarketDataMenu();
    previousFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
    backdrop = document.createElement("div");
    backdrop.className = BACKDROP_CLASS;
    backdrop.addEventListener("click", closeModal);
    modal = document.createElement("section");
    modal.className = MODAL_CLASS;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "fllm-heat-map-title");
    modal.innerHTML = `
      <header class="fllm-heat-map-header"><div class="fllm-heat-map-brand"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /><div><span class="fllm-heat-map-kicker">Florida Market Data</span><h2 id="fllm-heat-map-title">Current License Price Heat Map</h2><p>Hover or tap a county for live inventory details. Click a county to open its current listings.</p></div></div><button class="fllm-heat-map-close" type="button" aria-label="Close Florida license price heat map">×</button></header>
      <div class="fllm-heat-map-content"><aside class="fllm-heat-map-legend"><h3>Highest Asking Price</h3><p>Based on current available marketplace listings.</p><ul><li><i style="background:#e74227"></i>$750,000+</li><li><i style="background:#f47b20"></i>$600,000–$749,999</li><li><i style="background:#f2ad1f"></i>$450,000–$599,999</li><li><i style="background:#a9a62f"></i>$300,000–$449,999</li><li><i style="background:#3f8d43"></i>Under $300,000</li><li><i style="background:#6f7f8b"></i>Price undisclosed</li><li><i style="background:#27333a"></i>No current listings</li></ul><small class="fllm-heat-map-note">Inventory counts reflect the active listings currently displayed by Florida Liquor License Market. Prices and availability remain subject to confirmation.</small></aside><div class="fllm-heat-map-canvas"><div class="fllm-heat-map-loading">Loading current county inventory…</div></div></div>
      <footer class="fllm-heat-map-footer"><span>Click any county to view the actual liquor licenses currently listed for sale.</span><a href="/listings">Open Full Listings Page ›</a></footer>`;
    tooltip = document.createElement("div");
    tooltip.className = "fllm-heat-map-tooltip";
    tooltip.hidden = true;
    modal.querySelector(".fllm-heat-map-close")?.addEventListener("click", closeModal);
    document.body.append(backdrop, modal, tooltip);
    document.body.classList.add(BODY_CLASS);
    modal.querySelector(".fllm-heat-map-close")?.focus();
  }

  async function openHeatMap(trigger) {
    if (modal) return;
    buildModal(trigger);
    const canvas = modal?.querySelector(".fllm-heat-map-canvas");
    if (!canvas) return;
    try {
      const [listingResponse, source] = await Promise.all([
        fetch("/api/market-insights-listings", { cache: "no-store" }),
        loadSourceMap(),
      ]);
      if (!listingResponse.ok) throw new Error(`Listings returned ${listingResponse.status}`);
      const payload = await listingResponse.json();
      const listings = Array.isArray(payload.listings) ? payload.listings : [];
      const map = prepareMap(source, aggregateListings(listings), listingsByCounty(listings));
      if (!map) throw new Error("Florida county map could not be prepared");
      canvas.replaceChildren(map);
    } catch (error) {
      console.error("Florida license heat map failed", error);
      canvas.innerHTML = '<div class="fllm-heat-map-loading">The live heat map could not be loaded. Please open the full listings page to view current inventory.</div>';
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const option = target.closest("#market-data-header-menu button");
    if (!(option instanceof HTMLButtonElement) || !/^heat map$/i.test(normalizedText(option))) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openHeatMap(option);
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (countyDialog) closeCountyListings();
    else closeModal();
  });

  window.addEventListener("fllm:open-heat-map", (event) => openHeatMap(event.target));
  window.FLLMHeatMap = { open: openHeatMap, close: closeModal };
})();