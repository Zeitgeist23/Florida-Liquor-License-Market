(() => {
  if (window.__fllmLoanResetFailsafeReadyV2) return;
  window.__fllmLoanResetFailsafeReadyV2 = true;

  const money0 = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const pad = (value) => String(value).padStart(2, "0");
  const dateValue = (date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  const monthValue = (date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}`;

  function clearCalculatedState(root) {
    const principal = root.querySelector("#fllm-principal-output");
    if (principal instanceof HTMLElement) {
      principal.textContent = money0.format(320000);
      principal.classList.remove("is-calculated");
    }

    const paymentOutput = root.querySelector("#fllm-monthly-payment");
    const paymentPanel = paymentOutput instanceof HTMLElement
      ? paymentOutput.closest(".fllm-loan-calculator__payment")
      : null;
    if (paymentOutput instanceof HTMLElement) paymentOutput.textContent = "$0.00";
    if (paymentPanel instanceof HTMLElement) paymentPanel.classList.remove("is-reset");

    [
      "#fllm-annual-debt-service",
      "#fllm-total-interest",
      "#fllm-total-payments",
      "#fllm-term-summary",
      "#fllm-tax-basis-output",
      "#fllm-tax-monthly-output",
      "#fllm-tax-annual-output",
      "#fllm-tax-remaining-output",
    ].forEach((selector) => {
      const node = root.querySelector(selector);
      if (node instanceof HTMLElement) node.textContent = "—";
    });

    const rateBody = root.querySelector("#fllm-rate-comparison-body");
    if (rateBody instanceof HTMLElement) {
      rateBody.innerHTML = '<tr><td colspan="4">Press Calculate / Update Payment to compare rates.</td></tr>';
    }
    const loanBody = root.querySelector("#fllm-loan-schedule-body");
    if (loanBody instanceof HTMLElement) {
      loanBody.innerHTML = '<tr><td colspan="7">Press Calculate / Update Payment to generate the amortization schedule.</td></tr>';
    }
    const taxBody = root.querySelector("#fllm-tax-schedule-body");
    if (taxBody instanceof HTMLElement) {
      taxBody.innerHTML = '<tr><td colspan="5">Press Calculate / Update Payment to generate the Section 197 schedule.</td></tr>';
    }
  }

  function applyDefaultInputs(root) {
    const purchasePrice = root.querySelector("#fllm-purchase-price");
    const downPayment = root.querySelector("#fllm-down-payment");
    const refinanceAmount = root.querySelector("#fllm-refinance-amount");
    const rate = root.querySelector("#fllm-interest-rate");
    const term = root.querySelector("#fllm-loan-term");
    const firstPayment = root.querySelector("#fllm-first-payment-date");
    const taxBasis = root.querySelector("#fllm-tax-basis");
    const taxStart = root.querySelector("#fllm-tax-start-month");
    const purchaseFields = root.querySelector("#fllm-purchase-fields");
    const refinanceFields = root.querySelector("#fllm-refinance-fields");

    const now = new Date();
    const nextPayment = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

    if (purchasePrice instanceof HTMLInputElement) purchasePrice.value = money0.format(400000);
    if (downPayment instanceof HTMLInputElement) downPayment.value = money0.format(80000);
    if (refinanceAmount instanceof HTMLInputElement) refinanceAmount.value = money0.format(300000);
    if (rate instanceof HTMLInputElement) rate.value = "12.00";
    if (term instanceof HTMLSelectElement) term.value = "10";
    if (firstPayment instanceof HTMLInputElement) firstPayment.value = dateValue(nextPayment);
    if (taxBasis instanceof HTMLInputElement) taxBasis.value = money0.format(400000);
    if (taxStart instanceof HTMLInputElement) taxStart.value = monthValue(now);

    root.querySelectorAll("[data-transaction]").forEach((item) => {
      if (item instanceof HTMLButtonElement) {
        item.setAttribute("aria-pressed", item.dataset.transaction === "purchase" ? "true" : "false");
      }
    });
    root.querySelectorAll("[data-schedule-mode]").forEach((item) => {
      if (item instanceof HTMLButtonElement) {
        item.setAttribute("aria-pressed", item.dataset.scheduleMode === "annual" ? "true" : "false");
      }
    });
    if (purchaseFields instanceof HTMLElement) purchaseFields.hidden = false;
    if (refinanceFields instanceof HTMLElement) refinanceFields.hidden = true;
  }

  function resetCalculator(root) {
    applyDefaultInputs(root);
    clearCalculatedState(root);

    const error = root.querySelector("#fllm-loan-calculator-error");
    if (error instanceof HTMLElement) {
      error.textContent = "";
      error.classList.remove("is-visible");
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest(".fllm-loan-calculator__reset");
    if (!(button instanceof HTMLButtonElement)) return;

    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();

    const root = document.getElementById("loan-calculator");
    if (!(root instanceof HTMLElement)) return;
    resetCalculator(root);
    button.blur();
  }, true);

  // The Amount Financed panel remains neutral until the user explicitly submits
  // a calculation. Once a calculation completes, turn on the deep-blue result state.
  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== "fllm-loan-calculator-form") return;
    window.setTimeout(() => {
      const root = document.getElementById("loan-calculator");
      if (!(root instanceof HTMLElement)) return;
      const principal = root.querySelector("#fllm-principal-output");
      if (principal instanceof HTMLElement) principal.classList.add("is-calculated");
      const paymentPanel = root.querySelector(".fllm-loan-calculator__payment");
      if (paymentPanel instanceof HTMLElement) paymentPanel.classList.remove("is-reset");
    }, 0);
  }, true);

  // The calculator's main script performs one automatic default calculation on load.
  // Restore the requested uncalculated starting state after that script has initialized.
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const root = document.getElementById("loan-calculator");
    const resetButton = root?.querySelector(".fllm-loan-calculator__reset");
    if (root instanceof HTMLElement && resetButton instanceof HTMLButtonElement) {
      window.clearInterval(timer);
      window.setTimeout(() => {
        applyDefaultInputs(root);
        clearCalculatedState(root);
      }, 180);
    } else if (attempts > 100) {
      window.clearInterval(timer);
    }
  }, 50);
})();
