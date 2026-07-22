(() => {
  const STYLE_ID = "completed-sales-map-styles";
  const BODY_CLASS = "completed-sales-map-open";
  const soldTransactions = [
    ["Palm Beach County", "4COP Quota", "$575,000"],
    ["Miami-Dade County", "4COP Quota", "$495,000"],
    ["Lee County", "4COP Quota", "$425,000"],
    ["St. Johns County", "4COP Quota", "$425,000"],
    ["Sarasota County", "3PS Quota / Package Store", "$340,000"],
  ];
  const soldCounties = new Set(soldTransactions.map(([county]) => county));

  let salesModal = null;
  let salesBackdrop = null;
  let previousFocus = null;

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.${BODY_CLASS}{overflow:hidden!important}
      .completed-sales-map-backdrop{position:fixed;inset:0;z-index:10008;background:rgba(0,7,13,.86);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);animation:completedSalesFade .18s ease-out}
      .completed-sales-map-modal{position:fixed;top:50%;left:50%;z-index:10009;width:75vw;height:75vh;max-width:1440px;max-height:900px;min-width:780px;min-height:540px;transform:translate(-50%,-50%);overflow:hidden;border:2px solid #f6a700;border-radius:10px;background:#f7f7f5;color:#111820;box-shadow:0 35px 110px rgba(0,0,0,.74),0 0 0 1px rgba(246,167,0,.3);animation:completedSalesPop .2s ease-out;font-family:Arial,Helvetica,sans-serif}
      .completed-sales-map-title{height:62px;display:flex;align-items:center;padding:0 84px 0 24px;border-bottom:1px solid #d8dde1;font-size:16px;font-weight:900;letter-spacing:.025em;text-transform:uppercase}
      .completed-sales-map-content{height:calc(100% - 62px);display:grid;grid-template-columns:minmax(330px,36%) minmax(0,64%);gap:20px;padding:22px 24px 24px}
      .completed-sales-map-sidebar{min-width:0;display:flex;flex-direction:column;align-items:flex-start;overflow:auto;padding:2px 10px 6px 2px}
      .completed-sales-map-logo{display:block;width:65%;max-width:234px;height:auto;max-height:98px;object-fit:contain;object-position:left center;margin:0 0 22px}
      .completed-sales-map-list-heading{margin:0 0 12px;font-size:16px;line-height:1.1;text-transform:uppercase}
      .completed-sales-map-list{width:100%;display:grid;gap:8px}
      .completed-sales-map-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 12px;padding:10px 11px;border:1px solid #d4dce1;border-left:4px solid #39ff14;border-radius:5px;background:#fff;box-shadow:0 3px 10px rgba(0,0,0,.06)}
      .completed-sales-map-county{min-width:0;font-size:13px;font-weight:900;color:#071a2b}
      .completed-sales-map-type{grid-column:1;color:#56616a;font-size:11px;line-height:1.25}
      .completed-sales-map-price{grid-column:2;grid-row:1 / span 2;align-self:center;color:#071a2b;font-size:14px;font-weight:900;white-space:nowrap}
      .completed-sales-map-note{margin:12px 0 0;color:#5f6972;font-size:11px;line-height:1.45}
      .completed-sales-map-art{position:relative;min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;overflow:visible}
      .completed-sales-map-art svg{display:block;width:100%;height:100%;max-width:none;max-height:none}
      .completed-sales-map-art svg path{cursor:help;transition:filter .14s ease,opacity .14s ease,stroke-width .14s ease}
      .completed-sales-map-art svg path.sales-county{fill:#39ff14!important;stroke:#061728!important;stroke-width:1.8!important;stroke-dasharray:none!important;filter:drop-shadow(0 0 3px rgba(57,255,20,.7))}
      .completed-sales-map-art svg path:not(.sales-county){fill:#e3e7e9!important;stroke:#aeb8bf!important;stroke-width:.6!important;stroke-dasharray:none!important;filter:none!important}
      .completed-sales-map-art svg path:hover,.completed-sales-map-art svg path:focus{filter:brightness(1.1) drop-shadow(0 1px 3px rgba(0,0,0,.36))!important;outline:none;stroke-width:2.3!important}
      .completed-sales-map-loading{color:#68737c;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
      .completed-sales-map-tooltip{position:absolute;z-index:3;display:none;pointer-events:none;white-space:nowrap;max-width:260px;padding:8px 11px;border:1px solid #39ff14;border-radius:5px;background:#061728;color:#fff;font-size:12px;font-weight:800;line-height:1.35;box-shadow:0 8px 22px rgba(0,0,0,.38)}
      .completed-sales-map-tooltip.is-visible{display:block}
      .completed-sales-map-close{position:absolute;top:9px;right:14px;z-index:2;width:44px;height:44px;display:grid;place-items:center;border:2px solid #f6a700;border-radius:50%;background:#061728;color:#f6a700;cursor:pointer;font:700 28px/1 Arial,sans-serif;box-shadow:0 7px 22px rgba(0,0,0,.3)}
      .completed-sales-map-close:hover,.completed-sales-map-close:focus-visible{background:#f6a700;color:#061728;outline:none}
      @keyframes completedSalesFade{from{opacity:0}to{opacity:1}}
      @keyframes completedSalesPop{from{opacity:0;transform:translate(-50%,-48%) scale(.97)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
      @media(max-width:940px){
        .completed-sales-map-modal{width:94vw;height:90vh;min-width:0;min-height:0;max-width:none;max-height:none}
        .completed-sales-map-content{grid-template-columns:1fr;grid-template-rows:auto minmax(340px,1fr);gap:14px;padding:16px}
        .completed-sales-map-sidebar{display:grid;grid-template-columns:minmax(180px,.7fr) minmax(300px,1.3fr);gap:18px;align-items:start;overflow:visible;padding:0}
        .completed-sales-map-logo{width:65%;max-width:195px;max-height:68px;margin:0}
        .completed-sales-map-list-wrap{min-width:0}
        .completed-sales-map-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
        .completed-sales-map-note{display:none}
      }
      @media(max-width:620px){
        .completed-sales-map-title{height:56px;padding-left:16px;font-size:12px}
        .completed-sales-map-content{height:calc(100% - 56px);grid-template-rows:auto minmax(300px,1fr)}
        .completed-sales-map-sidebar{grid-template-columns:1fr;gap:10px}
        .completed-sales-map-logo{width:55%;max-width:170px;max-height:56px}
        .completed-sales-map-list{grid-template-columns:1fr}
        .completed-sales-map-row{padding:7px 9px}
        .completed-sales-map-close{top:7px;right:9px;width:40px;height:40px;font-size:25px}
      }
      @media(prefers-reduced-motion:reduce){.completed-sales-map-backdrop,.completed-sales-map-modal{animation:none}}
    `;
    document.head.appendChild(style);
  }

  function findTransactionsPanel() {
    const heading = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,strong,div,span"))
      .find((element) => normalizedText(element).toUpperCase() === "RECENT FLORIDA TRANSACTIONS");

    if (!heading) return null;

    let panel = heading.parentElement;
    while (panel && panel !== document.body) {
      if (panel.querySelector("table") || /VIEW ALL TRANSACTIONS/i.test(normalizedText(panel))) return panel;
      panel = panel.parentElement;
    }

    return heading.parentElement;
  }

  function updateTable(table) {
    let body = table.tBodies[0];
    if (!body) body = table.createTBody();

    body.replaceChildren(...soldTransactions.map(([county, type, price]) => {
      const row = document.createElement("tr");
      const countyCell = document.createElement("td");
      const typeCell = document.createElement("td");
      const priceCell = document.createElement("td");

      countyCell.textContent = county;
      typeCell.textContent = type;
      priceCell.textContent = price;

      row.append(countyCell, typeCell, priceCell);
      return row;
    }));
  }

  function updateGrid(panel) {
    const candidates = Array.from(panel.querySelectorAll("div,li"))
      .filter((element) => {
        if (element.children.length !== 3) return false;
        const parts = Array.from(element.children).map(normalizedText);
        return /County$/i.test(parts[0]) && /(?:4COP|3PS)/i.test(parts[1]) && /^\$[\d,]+$/.test(parts[2]);
      });

    if (!candidates.length) return false;

    candidates.slice(0, soldTransactions.length).forEach((row, index) => {
      const values = soldTransactions[index];
      Array.from(row.children).forEach((cell, cellIndex) => {
        cell.textContent = values[cellIndex];
      });
    });

    candidates.slice(soldTransactions.length).forEach((row) => row.remove());
    return true;
  }

  function updateRecentTransactions() {
    const panel = findTransactionsPanel();
    if (!panel || panel.dataset.soldTransactionsUpdated === "true") return false;

    const table = panel.querySelector("table");
    if (table instanceof HTMLTableElement) {
      updateTable(table);
      panel.dataset.soldTransactionsUpdated = "true";
      return true;
    }

    if (updateGrid(panel)) {
      panel.dataset.soldTransactionsUpdated = "true";
      return true;
    }

    return false;
  }

  function closeSalesMap() {
    if (!salesModal) return;
    salesModal.remove();
    salesBackdrop?.remove();
    document.body.classList.remove(BODY_CLASS);
    salesModal = null;
    salesBackdrop = null;
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    previousFocus = null;
  }

  function createTransactionList() {
    const wrap = document.createElement("div");
    wrap.className = "completed-sales-map-list-wrap";

    const heading = document.createElement("h3");
    heading.className = "completed-sales-map-list-heading";
    heading.textContent = "Completed License Sales";

    const list = document.createElement("div");
    list.className = "completed-sales-map-list";

    soldTransactions.forEach(([county, type, price]) => {
      const row = document.createElement("div");
      row.className = "completed-sales-map-row";
      row.innerHTML = `<span class="completed-sales-map-county"></span><span class="completed-sales-map-type"></span><strong class="completed-sales-map-price"></strong>`;
      row.querySelector(".completed-sales-map-county").textContent = county;
      row.querySelector(".completed-sales-map-type").textContent = type;
      row.querySelector(".completed-sales-map-price").textContent = price;
      list.appendChild(row);
    });

    const note = document.createElement("p");
    note.className = "completed-sales-map-note";
    note.textContent = "Neon green counties represent completed sales currently recorded in marketplace inventory.";

    wrap.append(heading, list, note);
    return wrap;
  }

  function positionTooltip(event, art, tooltip) {
    const artRect = art.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth || 150;
    const tooltipHeight = tooltip.offsetHeight || 42;
    const desiredLeft = event.clientX - artRect.left + 14;
    const desiredTop = event.clientY - artRect.top + 14;
    const maxLeft = Math.max(8, artRect.width - tooltipWidth - 8);
    const maxTop = Math.max(8, artRect.height - tooltipHeight - 8);
    tooltip.style.left = `${Math.max(8, Math.min(desiredLeft, maxLeft))}px`;
    tooltip.style.top = `${Math.max(8, Math.min(desiredTop, maxTop))}px`;
  }

  function attachSalesMapInteractions(svg, art) {
    const tooltip = document.createElement("div");
    tooltip.className = "completed-sales-map-tooltip";
    tooltip.setAttribute("role", "status");
    tooltip.setAttribute("aria-live", "polite");
    art.appendChild(tooltip);

    svg.querySelectorAll("path").forEach((path) => {
      const titleText = path.querySelector("title")?.textContent?.trim() || "Florida County";
      const countyName = titleText.split(" — ")[0];
      const transaction = soldTransactions.find(([county]) => county === countyName);

      if (soldCounties.has(countyName)) path.classList.add("sales-county");
      path.setAttribute("tabindex", "0");
      path.setAttribute("aria-label", transaction ? `${transaction[0]}, ${transaction[1]}, ${transaction[2]}` : countyName);

      const tooltipText = transaction
        ? `${transaction[0]} — ${transaction[1]} — ${transaction[2]}`
        : countyName;

      const show = (event) => {
        tooltip.textContent = tooltipText;
        tooltip.classList.add("is-visible");
        if (event instanceof MouseEvent) positionTooltip(event, art, tooltip);
      };

      path.addEventListener("mouseenter", show);
      path.addEventListener("mousemove", (event) => positionTooltip(event, art, tooltip));
      path.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
      path.addEventListener("focus", () => {
        const pathRect = path.getBoundingClientRect();
        const artRect = art.getBoundingClientRect();
        tooltip.textContent = tooltipText;
        tooltip.classList.add("is-visible");
        tooltip.style.left = `${Math.max(8, pathRect.left - artRect.left + pathRect.width / 2)}px`;
        tooltip.style.top = `${Math.max(8, pathRect.top - artRect.top + pathRect.height / 2)}px`;
      });
      path.addEventListener("blur", () => tooltip.classList.remove("is-visible"));
    });
  }

  async function loadSalesMap(art) {
    try {
      const response = await fetch("/api/market-map", { cache: "no-store" });
      if (!response.ok) throw new Error(`Map returned ${response.status}`);

      const svgText = await response.text();
      const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
      const parsedSvg = parsed.documentElement;
      if (parsedSvg.nodeName.toLowerCase() !== "svg" || parsed.querySelector("parsererror")) {
        throw new Error("Sales map SVG could not be parsed");
      }

      const svg = document.importNode(parsedSvg, true);
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("aria-label", "Florida counties with completed liquor license sales highlighted in neon green");
      art.replaceChildren(svg);
      attachSalesMapInteractions(svg, art);
    } catch (error) {
      console.error("Completed sales map failed", error);
      art.textContent = "Sales map unavailable";
    }
  }

  function openSalesMap(trigger) {
    if (salesModal) return;
    installStyles();
    previousFocus = trigger;

    salesBackdrop = document.createElement("div");
    salesBackdrop.className = "completed-sales-map-backdrop";
    salesBackdrop.setAttribute("aria-hidden", "true");
    salesBackdrop.addEventListener("click", closeSalesMap);

    salesModal = document.createElement("section");
    salesModal.className = "completed-sales-map-modal";
    salesModal.setAttribute("role", "dialog");
    salesModal.setAttribute("aria-modal", "true");
    salesModal.setAttribute("aria-label", "Completed Florida liquor license sales map");

    const title = document.createElement("div");
    title.className = "completed-sales-map-title";
    title.textContent = "Completed Florida Transactions";

    const content = document.createElement("div");
    content.className = "completed-sales-map-content";

    const sidebar = document.createElement("aside");
    sidebar.className = "completed-sales-map-sidebar";

    const logo = document.createElement("img");
    logo.className = "completed-sales-map-logo";
    logo.src = "/assets/brand-sharp.svg";
    logo.alt = "Florida Liquor License Market";
    sidebar.append(logo, createTransactionList());

    const art = document.createElement("div");
    art.className = "completed-sales-map-art";
    const loading = document.createElement("span");
    loading.className = "completed-sales-map-loading";
    loading.textContent = "Loading completed sales map…";
    art.appendChild(loading);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "completed-sales-map-close";
    closeButton.setAttribute("aria-label", "Close completed transactions map");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", closeSalesMap);

    content.append(sidebar, art);
    salesModal.append(title, content, closeButton);
    document.body.append(salesBackdrop, salesModal);
    document.body.classList.add(BODY_CLASS);
    closeButton.focus();
    loadSalesMap(art);
  }

  function bindViewAllTransactions() {
    const panel = findTransactionsPanel();
    if (!panel) return false;

    const triggers = Array.from(panel.querySelectorAll("a,button"))
      .filter((element) => /view all transactions/i.test(normalizedText(element)));
    if (!triggers.length) return false;

    triggers.forEach((trigger) => {
      if (trigger.dataset.completedSalesMapBound === "true") return;
      trigger.dataset.completedSalesMapBound = "true";
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openSalesMap(trigger);
      });
    });
    return true;
  }

  function initialize() {
    updateRecentTransactions();
    bindViewAllTransactions();
    setTimeout(() => { updateRecentTransactions(); bindViewAllTransactions(); }, 300);
    setTimeout(() => { updateRecentTransactions(); bindViewAllTransactions(); }, 1000);
    setTimeout(() => { updateRecentTransactions(); bindViewAllTransactions(); }, 2200);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSalesMap();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();