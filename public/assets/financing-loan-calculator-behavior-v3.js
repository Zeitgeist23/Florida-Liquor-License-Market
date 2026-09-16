(() => {
  const initialize = () => {
    const root = document.getElementById("loan-calculator");
    if (!(root instanceof HTMLElement) || root.dataset.behaviorV3Ready === "true") return;

    const existingForm = root.querySelector("#fllm-loan-calculator-form");
    if (!(existingForm instanceof HTMLFormElement)) return;

    // Prevent the legacy calculator from attaching any further behavior, then clone
    // the form so all legacy anonymous input/change listeners are removed.
    root.dataset.calculatorReady = "true";
    const form = existingForm.cloneNode(true);
    if (!(form instanceof HTMLFormElement)) return;
    existingForm.replaceWith(form);
    root.dataset.behaviorV3Ready = "true";

    const purchaseFields = form.querySelector("#fllm-purchase-fields");
    const refinanceFields = form.querySelector("#fllm-refinance-fields");
    const purchasePriceInput = form.querySelector("#fllm-purchase-price");
    const downPaymentInput = form.querySelector("#fllm-down-payment");
    const refinanceAmountInput = form.querySelector("#fllm-refinance-amount");
    const rateInput = form.querySelector("#fllm-interest-rate");
    const termInput = form.querySelector("#fllm-loan-term");
    const firstPaymentInput = form.querySelector("#fllm-first-payment-date");
    const taxBasisInput = form.querySelector("#fllm-tax-basis");
    const taxStartInput = form.querySelector("#fllm-tax-start-month");

    if (
      !(purchasePriceInput instanceof HTMLInputElement) ||
      !(downPaymentInput instanceof HTMLInputElement) ||
      !(refinanceAmountInput instanceof HTMLInputElement) ||
      !(rateInput instanceof HTMLInputElement) ||
      !(termInput instanceof HTMLSelectElement) ||
      !(firstPaymentInput instanceof HTMLInputElement) ||
      !(taxBasisInput instanceof HTMLInputElement) ||
      !(taxStartInput instanceof HTMLInputElement)
    ) return;

    const principalOutput = form.querySelector("#fllm-principal-output");
    const monthlyOutput = form.querySelector("#fllm-monthly-payment");
    const annualDebtOutput = form.querySelector("#fllm-annual-debt-service");
    const totalInterestOutput = form.querySelector("#fllm-total-interest");
    const totalPaymentsOutput = form.querySelector("#fllm-total-payments");
    const termSummaryOutput = form.querySelector("#fllm-term-summary");
    const rateComparisonBody = form.querySelector("#fllm-rate-comparison-body");
    const loanTableHead = form.querySelector("#fllm-loan-schedule-head");
    const loanTableBody = form.querySelector("#fllm-loan-schedule-body");
    const taxTableBody = form.querySelector("#fllm-tax-schedule-body");
    const taxBasisOutput = form.querySelector("#fllm-tax-basis-output");
    const taxMonthlyOutput = form.querySelector("#fllm-tax-monthly-output");
    const taxAnnualOutput = form.querySelector("#fllm-tax-annual-output");
    const taxRemainingOutput = form.querySelector("#fllm-tax-remaining-output");
    const taxCopy = form.querySelector("#fllm-tax-copy");
    const taxStartLabel = form.querySelector("#fllm-tax-start-label");
    const errorBox = form.querySelector("#fllm-loan-calculator-error");
    const calculateButton = form.querySelector(".fllm-loan-calculator__calculate");

    const transactionButtons = Array.from(form.querySelectorAll("[data-transaction]"));
    const scheduleButtons = Array.from(form.querySelectorAll("[data-schedule-mode]"));

    let transaction = "purchase";
    let scheduleMode = "annual";
    let taxBasisDirty = false;
    let latestLoanRows = [];

    const money = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const integerMoney = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

    const currencyInputs = [purchasePriceInput, downPaymentInput, refinanceAmountInput, taxBasisInput];

    function rawNumber(value) {
      const cleaned = String(value ?? "").replace(/[^0-9.-]/g, "");
      const parsed = Number.parseFloat(cleaned);
      return Number.isFinite(parsed) ? parsed : 0;
    }

    function numberValue(input) {
      return rawNumber(input.value);
    }

    function setRawCurrencyValue(input, value) {
      input.value = value === "" ? "" : String(value);
    }

    function formatCurrencyInput(input) {
      const value = numberValue(input);
      input.value = value > 0 ? integerMoney.format(value) : value === 0 && input.value.trim() ? "$0" : "";
    }

    function prepareCurrencyInput(input) {
      input.type = "text";
      input.inputMode = "numeric";
      input.removeAttribute("min");
      input.removeAttribute("step");
      formatCurrencyInput(input);

      input.addEventListener("focus", () => {
        const value = numberValue(input);
        input.value = value ? String(Math.round(value)) : "";
        window.requestAnimationFrame(() => input.select());
      });
      input.addEventListener("blur", () => {
        formatCurrencyInput(input);
      });
      input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9.]/g, "");
      });
    }

    currencyInputs.forEach(prepareCurrencyInput);

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function dateInputValue(date) {
      return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
    }

    function monthInputValue(date) {
      return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}`;
    }

    function parseCalendarDate(value) {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
      if (!match) return null;
      return { year: Number(match[1]), month: Number(match[2]) - 1, day: Number(match[3]) };
    }

    function parseCalendarMonth(value) {
      const match = /^(\d{4})-(\d{2})$/.exec(value || "");
      if (!match) return null;
      return { year: Number(match[1]), month: Number(match[2]) - 1 };
    }

    function daysInMonth(year, month) {
      return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function addMonthsToDate(base, offset) {
      const absolute = base.year * 12 + base.month + offset;
      const year = Math.floor(absolute / 12);
      const month = ((absolute % 12) + 12) % 12;
      const day = Math.min(base.day, daysInMonth(year, month));
      return new Date(Date.UTC(year, month, day));
    }

    function addMonthsToMonth(base, offset) {
      const absolute = base.year * 12 + base.month + offset;
      return {
        year: Math.floor(absolute / 12),
        month: ((absolute % 12) + 12) % 12,
      };
    }

    function monthDifference(start, end) {
      return (end.year - start.year) * 12 + (end.month - start.month);
    }

    function monthlyPayment(principal, annualRate, months) {
      if (!(principal > 0) || !(months > 0)) return 0;
      const monthlyRate = annualRate / 100 / 12;
      if (monthlyRate === 0) return principal / months;
      return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    }

    function currentPrincipal() {
      if (transaction === "refinance") return Math.max(0, numberValue(refinanceAmountInput));
      return Math.max(0, numberValue(purchasePriceInput) - numberValue(downPaymentInput));
    }

    function showError(message) {
      if (!(errorBox instanceof HTMLElement)) return;
      errorBox.textContent = message;
      errorBox.classList.add("is-visible");
    }

    function clearError() {
      if (!(errorBox instanceof HTMLElement)) return;
      errorBox.textContent = "";
      errorBox.classList.remove("is-visible");
    }

    function validateLoan() {
      const apr = Number.parseFloat(rateInput.value);
      const years = Number.parseInt(termInput.value, 10);
      const firstDate = parseCalendarDate(firstPaymentInput.value);

      if (transaction === "purchase") {
        const price = numberValue(purchasePriceInput);
        const down = numberValue(downPaymentInput);
        if (!(price > 0)) return "Enter a liquor license purchase price greater than zero.";
        if (down < 0) return "Down payment cannot be negative.";
        if (down >= price) return "Down payment must be less than the purchase price to calculate a financed balance.";
      } else if (!(numberValue(refinanceAmountInput) > 0)) {
        return "Enter a refinance loan amount greater than zero.";
      }

      if (!Number.isFinite(apr) || apr < 0 || apr > 50) return "Enter an annual interest rate between 0% and 50%.";
      if (!Number.isFinite(years) || years < 1 || years > 30) return "Select a loan term between 1 and 30 years.";
      if (!firstDate) return "Select a valid first payment date.";
      return "";
    }

    function buildLoanRows(principal, apr, months, firstDate) {
      const payment = monthlyPayment(principal, apr, months);
      const monthlyRate = apr / 100 / 12;
      const rows = [];
      let balance = principal;

      for (let index = 0; index < months; index += 1) {
        const beginning = balance;
        const interest = monthlyRate === 0 ? 0 : beginning * monthlyRate;
        let principalPaid = Math.max(0, payment - interest);
        let actualPayment = payment;

        if (index === months - 1 || principalPaid > beginning) {
          principalPaid = beginning;
          actualPayment = principalPaid + interest;
        }

        balance = Math.max(0, beginning - principalPaid);
        rows.push({
          number: index + 1,
          date: addMonthsToDate(firstDate, index),
          beginning,
          principal: principalPaid,
          interest,
          payment: actualPayment,
          ending: balance,
        });
      }
      return rows;
    }

    function aggregateLoanRows(rows) {
      const groups = [];
      let active = null;
      rows.forEach((row) => {
        const year = row.date.getUTCFullYear();
        if (!active || active.year !== year) {
          active = { year, count: 0, beginning: row.beginning, principal: 0, interest: 0, payment: 0, ending: row.ending };
          groups.push(active);
        }
        active.count += 1;
        active.principal += row.principal;
        active.interest += row.interest;
        active.payment += row.payment;
        active.ending = row.ending;
      });
      return groups;
    }

    function renderLoanSchedule() {
      if (!(loanTableHead instanceof HTMLElement) || !(loanTableBody instanceof HTMLElement)) return;
      if (!latestLoanRows.length) {
        loanTableBody.innerHTML = '<tr><td colspan="7">Press Calculate / Update Payment to generate the amortization schedule.</td></tr>';
        return;
      }

      if (scheduleMode === "monthly") {
        loanTableHead.innerHTML = "<tr><th>#</th><th>Payment Date</th><th>Beginning Balance</th><th>Principal</th><th>Interest</th><th>Payment</th><th>Ending Balance</th></tr>";
        loanTableBody.innerHTML = latestLoanRows.map((row) => (
          `<tr><td>${row.number}</td><td>${dateFormatter.format(row.date)}</td><td>${money.format(row.beginning)}</td><td>${money.format(row.principal)}</td><td>${money.format(row.interest)}</td><td>${money.format(row.payment)}</td><td>${money.format(row.ending)}</td></tr>`
        )).join("");
        return;
      }

      const annualRows = aggregateLoanRows(latestLoanRows);
      loanTableHead.innerHTML = "<tr><th>Year</th><th>Payments</th><th>Beginning Balance</th><th>Principal</th><th>Interest</th><th>Total Paid</th><th>Ending Balance</th></tr>";
      loanTableBody.innerHTML = annualRows.map((row) => (
        `<tr><td>${row.year}</td><td>${row.count}</td><td>${money.format(row.beginning)}</td><td>${money.format(row.principal)}</td><td>${money.format(row.interest)}</td><td>${money.format(row.payment)}</td><td>${money.format(row.ending)}</td></tr>`
      )).join("");
    }

    function renderRateComparison(principal, apr, months) {
      if (!(rateComparisonBody instanceof HTMLElement)) return;
      const rates = [Math.max(0, apr - 1), apr, apr + 1];
      rateComparisonBody.innerHTML = rates.map((rate, index) => {
        const payment = monthlyPayment(principal, rate, months);
        const label = index === 1 ? "Current scenario" : index === 0 ? "1.00% lower" : "1.00% higher";
        return `<tr><td>${rate.toFixed(2)}%</td><td>${label}</td><td>${money.format(payment)}</td><td>${money.format(payment * 12)}</td></tr>`;
      }).join("");
    }

    function renderTaxSchedule(referenceDate) {
      if (!(taxTableBody instanceof HTMLElement)) return;
      const basis = Math.max(0, numberValue(taxBasisInput));
      const start = parseCalendarMonth(taxStartInput.value);
      const referenceMonth = referenceDate ? { year: referenceDate.year, month: referenceDate.month } : null;

      if (!(basis > 0) || !start) {
        taxTableBody.innerHTML = '<tr><td colspan="5">Enter a tax basis and Section 197 start month, then press Calculate / Update Payment.</td></tr>';
        if (taxBasisOutput instanceof HTMLElement) taxBasisOutput.textContent = "$0";
        if (taxMonthlyOutput instanceof HTMLElement) taxMonthlyOutput.textContent = "$0.00";
        if (taxAnnualOutput instanceof HTMLElement) taxAnnualOutput.textContent = "$0.00";
        if (taxRemainingOutput instanceof HTMLElement) taxRemainingOutput.textContent = "—";
        return;
      }

      const monthly = basis / 180;
      let elapsed = 0;
      if (transaction === "refinance" && referenceMonth) {
        elapsed = Math.max(0, Math.min(180, monthDifference(start, referenceMonth)));
      }
      const remainingMonths = Math.max(0, 180 - elapsed);
      const annualized = monthly * Math.min(12, remainingMonths || 12);

      if (taxBasisOutput instanceof HTMLElement) taxBasisOutput.textContent = integerMoney.format(basis);
      if (taxMonthlyOutput instanceof HTMLElement) taxMonthlyOutput.textContent = money.format(monthly);
      if (taxAnnualOutput instanceof HTMLElement) taxAnnualOutput.textContent = money.format(annualized);
      if (taxRemainingOutput instanceof HTMLElement) taxRemainingOutput.textContent = `${remainingMonths} months`;

      if (remainingMonths === 0) {
        taxTableBody.innerHTML = '<tr><td colspan="5">The entered 180-month Section 197 period has already elapsed as of the refinance reference month.</td></tr>';
        return;
      }

      const groups = [];
      let active = null;
      let beginningRemaining = Math.max(0, basis - monthly * elapsed);
      for (let index = elapsed; index < 180; index += 1) {
        const month = addMonthsToMonth(start, index);
        const year = month.year;
        if (!active || active.year !== year) {
          active = { year, months: 0, beginning: beginningRemaining, amortization: 0, ending: beginningRemaining };
          groups.push(active);
        }
        active.months += 1;
        active.amortization += monthly;
        beginningRemaining = Math.max(0, beginningRemaining - monthly);
        active.ending = beginningRemaining;
      }

      taxTableBody.innerHTML = groups.map((row) => (
        `<tr><td>${row.year}</td><td>${row.months}</td><td>${money.format(row.beginning)}</td><td>${money.format(row.amortization)}</td><td>${money.format(row.ending)}</td></tr>`
      )).join("");
    }

    function updateTaxCopy() {
      if (!(taxCopy instanceof HTMLElement) || !(taxStartLabel instanceof HTMLElement)) return;
      if (transaction === "refinance") {
        taxStartLabel.textContent = "Original Section 197 amortization start month";
        taxCopy.innerHTML = 'A refinance by itself generally does <strong>not</strong> create a new liquor-license tax basis or restart a fresh 15-year period. Enter the original basis allocated to the license and the original Section 197 amortization start month to estimate the remaining schedule as of the new loan\'s first payment month.';
      } else {
        taxStartLabel.textContent = "Section 197 amortization start month";
        taxCopy.innerHTML = 'For a qualifying acquired government-granted license or permit, IRS Section 197 generally provides ratable amortization over <strong>15 years (180 months)</strong>, beginning with the later of the acquisition month or the month the trade or business or income-producing activity begins. Enter the tax basis actually allocated to the liquor license.';
      }
    }

    function calculate() {
      clearError();
      const validation = validateLoan();
      if (validation) {
        showError(validation);
        return;
      }

      currencyInputs.forEach(formatCurrencyInput);
      const principal = currentPrincipal();
      const apr = Number.parseFloat(rateInput.value);
      const years = Number.parseInt(termInput.value, 10);
      const months = years * 12;
      const firstDate = parseCalendarDate(firstPaymentInput.value);
      if (!firstDate) return;
      const payment = monthlyPayment(principal, apr, months);
      latestLoanRows = buildLoanRows(principal, apr, months, firstDate);
      const totalPaid = latestLoanRows.reduce((sum, row) => sum + row.payment, 0);
      const totalInterest = latestLoanRows.reduce((sum, row) => sum + row.interest, 0);

      if (principalOutput instanceof HTMLElement) principalOutput.textContent = integerMoney.format(principal);
      if (monthlyOutput instanceof HTMLElement) monthlyOutput.textContent = money.format(payment);
      if (annualDebtOutput instanceof HTMLElement) annualDebtOutput.textContent = money.format(payment * 12);
      if (totalInterestOutput instanceof HTMLElement) totalInterestOutput.textContent = money.format(totalInterest);
      if (totalPaymentsOutput instanceof HTMLElement) totalPaymentsOutput.textContent = money.format(totalPaid);
      if (termSummaryOutput instanceof HTMLElement) termSummaryOutput.textContent = `${years} years / ${months} payments`;

      renderRateComparison(principal, apr, months);
      renderLoanSchedule();
      renderTaxSchedule(firstDate);
    }

    function setTransaction(next) {
      transaction = next === "refinance" ? "refinance" : "purchase";
      transactionButtons.forEach((button) => {
        if (!(button instanceof HTMLButtonElement)) return;
        button.setAttribute("aria-pressed", button.dataset.transaction === transaction ? "true" : "false");
      });
      if (purchaseFields instanceof HTMLElement) purchaseFields.hidden = transaction !== "purchase";
      if (refinanceFields instanceof HTMLElement) refinanceFields.hidden = transaction !== "refinance";
      if (!taxBasisDirty && transaction === "purchase") {
        setRawCurrencyValue(taxBasisInput, numberValue(purchasePriceInput));
        formatCurrencyInput(taxBasisInput);
      }
      updateTaxCopy();
      // Deliberately do not calculate here. Results remain from the last submitted scenario.
    }

    function setScheduleMode(next) {
      scheduleMode = next === "monthly" ? "monthly" : "annual";
      scheduleButtons.forEach((button) => {
        if (!(button instanceof HTMLButtonElement)) return;
        button.setAttribute("aria-pressed", button.dataset.scheduleMode === scheduleMode ? "true" : "false");
      });
      renderLoanSchedule();
    }

    function resetCalculator() {
      const now = new Date();
      const firstPayment = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
      setRawCurrencyValue(purchasePriceInput, 400000);
      setRawCurrencyValue(downPaymentInput, 80000);
      setRawCurrencyValue(refinanceAmountInput, 300000);
      rateInput.value = "10.00";
      termInput.value = "10";
      firstPaymentInput.value = dateInputValue(firstPayment);
      setRawCurrencyValue(taxBasisInput, 400000);
      taxStartInput.value = monthInputValue(now);
      taxBasisDirty = false;
      transaction = "purchase";
      scheduleMode = "annual";
      latestLoanRows = [];
      currencyInputs.forEach(formatCurrencyInput);
      setTransaction("purchase");
      setScheduleMode("annual");
      clearError();
      calculate();
    }

    if (!firstPaymentInput.value) {
      const now = new Date();
      firstPaymentInput.value = dateInputValue(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)));
    }
    if (!taxStartInput.value) taxStartInput.value = monthInputValue(new Date());
    if (!taxBasisInput.value) {
      setRawCurrencyValue(taxBasisInput, numberValue(purchasePriceInput) || 400000);
      formatCurrencyInput(taxBasisInput);
    }

    transactionButtons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      button.addEventListener("click", () => setTransaction(button.dataset.transaction || "purchase"));
    });

    scheduleButtons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      button.addEventListener("click", () => setScheduleMode(button.dataset.scheduleMode || "annual"));
    });

    purchasePriceInput.addEventListener("input", () => {
      if (!taxBasisDirty && transaction === "purchase") {
        setRawCurrencyValue(taxBasisInput, numberValue(purchasePriceInput));
      }
    });
    purchasePriceInput.addEventListener("blur", () => {
      if (!taxBasisDirty && transaction === "purchase") formatCurrencyInput(taxBasisInput);
    });
    taxBasisInput.addEventListener("input", () => {
      taxBasisDirty = true;
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      calculate();
    });

    if (calculateButton instanceof HTMLButtonElement) {
      const buttonRow = document.createElement("div");
      buttonRow.className = "fllm-loan-calculator__button-row";
      calculateButton.parentNode?.insertBefore(buttonRow, calculateButton);
      buttonRow.appendChild(calculateButton);

      const resetButton = document.createElement("button");
      resetButton.type = "button";
      resetButton.className = "fllm-loan-calculator__reset";
      resetButton.textContent = "Reset Calculator";
      resetButton.addEventListener("click", resetCalculator);
      buttonRow.appendChild(resetButton);
    }

    // Preserve the initial default calculation once. Subsequent field edits do not
    // change the payment or schedules until Calculate / Update Payment is pressed.
    calculate();
  };

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const root = document.getElementById("loan-calculator");
    if (root && root.querySelector("#fllm-loan-calculator-form")) {
      window.clearInterval(timer);
      window.setTimeout(initialize, 120);
    } else if (attempts > 80) {
      window.clearInterval(timer);
    }
  }, 50);
})();
