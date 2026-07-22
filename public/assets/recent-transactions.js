(() => {
  const soldTransactions = [
    ["Palm Beach County", "4COP Quota", "$575,000"],
    ["Miami-Dade County", "4COP Quota", "$495,000"],
    ["Lee County", "4COP Quota", "$425,000"],
    ["St. Johns County", "4COP Quota", "$425,000"],
    ["Sarasota County", "3PS Quota / Package Store", "$340,000"],
  ];

  function normalizedText(element) {
    return (element?.textContent || "").replace(/\s+/g, " ").trim();
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

  function initialize() {
    updateRecentTransactions();
    setTimeout(updateRecentTransactions, 300);
    setTimeout(updateRecentTransactions, 1000);
    setTimeout(updateRecentTransactions, 2200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
