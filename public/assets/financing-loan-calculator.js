(() => {
  const root = document.getElementById("loan-calculator");
  if (!(root instanceof HTMLElement) || root.dataset.calculatorReady === "true") return;
  root.dataset.calculatorReady = "true";

  const form = root.querySelector("#fllm-loan-calculator-form");
  if (!(form instanceof HTMLFormElement)) return;

  const purchaseFields = root.querySelector("#fllm-purchase-fields");
  const refinanceFields = root.querySelector("#fllm-refinance-fields");
  const purchasePriceInput = root.querySelector("#fllm-purchase-price");
  const downPaymentInput = root.querySelector("#fllm-down-payment");
  const refinanceAmountInput = root.querySelector("#fllm-refinance-amount");
  const rateInput = root.querySelector("#fllm-interest-rate");
  const termInput = root.querySelector("#fllm-loan-term");
  const firstPaymentInput = root.querySelector("#fllm-first-payment-date");
  const taxBasisInput = root.querySelector("#fllm-tax-basis");
  const taxStartInput = root.querySelector("#fllm-tax-start-month");

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

  const principalOutput = root.querySelector("#fllm-principal-output");
  const monthlyOutput = root.querySelector("#fllm-monthly-payment");
  const annualDebtOutput = root.querySelector("#fllm-annual-debt-service");
  const totalInterestOutput = root.querySelector("#fllm-total-interest");
  const totalPaymentsOutput = root.querySelector("#fllm-total-payments");
  const termSummaryOutput = root.querySelector("#fllm-term-summary");
  const rateComparisonBody = root.querySelector("#fllm-rate-comparison-body");
  const loanTableHead = root.querySelector("#fllm-loan-schedule-head");
  const loanTableBody = root.querySelector("#fllm-loan-schedule-body");
  const taxTableBody = root.querySelector("#fllm-tax-schedule-body");
  const taxBasisOutput = root.querySelector("#fllm-tax-basis-output");
  const taxMonthlyOutput = root.querySelector("#fllm-tax-monthly-output");
  const taxAnnualOutput = root.querySelector("#fllm-tax-annual-output");
  const taxRemainingOutput = root.querySelector("#fllm-tax-remaining-output");
  const taxCopy = root.querySelector("#fllm-tax-copy");
  const taxStartLabel = root.querySelector("#fllm-tax-start-label");
  const errorBox = root.querySelector("#fllm-loan-calculator-error");

  const transactionButtons = Array.from(root.querySelectorAll("[data-transaction]"));
  const scheduleButtons = Array.from(root.querySelectorAll("[data-schedule-mode]"));

  let transaction = "purchase";
  let scheduleMode = "annual";
  let taxBasisDirty = false;
  let latestLoanRows = [];

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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

  function numberValue(input) {
    const value = Number.parseFloat(input.value);
    return Number.isFinite(value) ? value : 0;
  }

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
    const apr = numberValue(rateInput);
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

    if (apr < 0 || apr > 50) return "Enter an annual interest rate between 0% and 50%.";
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
      const date = addMonthsToDate(firstDate, index);
      rows.push({
        number: index + 1,
        date,
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
        active = {
          year,
          count: 0,
          beginning: row.beginning,
          principal: 0,
          interest: 0,
          payment: 0,
          ending: row.ending,
        };
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
      taxTableBody.innerHTML = '<tr><td colspan="5">Enter a tax basis and Section 197 start month to calculate the estimated tax-basis schedule.</td></tr>';
      if (taxBasisOutput instanceof HTMLElement) taxBasisOutput.textContent = "$0";
      if (taxMonthlyOutput instanceof HTMLElement) taxMonthlyOutput.textContent = "$0";
      if (taxAnnualOutput instanceof HTMLElement) taxAnnualOutput.textContent = "$0";
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
        active = {
          year,
          months: 0,
          beginning: beginningRemaining,
          amortization: 0,
          ending: beginningRemaining,
        };
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

    const principal = currentPrincipal();
    const apr = numberValue(rateInput);
    const years = Number.parseInt(termInput.value, 10);
    const months = years * 12;
    const firstDate = parseCalendarDate(firstPaymentInput.value);
    if (!firstDate) return;

    const payment = monthlyPayment(principal, apr, months);
    latestLoanRows = buildLoanRows(principal, apr, months, firstDate);
    const totalPayments = latestLoanRows.reduce((sum, row) => sum + row.payment, 0);
    const totalInterest = latestLoanRows.reduce((sum, row) => sum + row.interest, 0);

    if (principalOutput instanceof HTMLElement) principalOutput.textContent = integerMoney.format(principal);
    if (monthlyOutput instanceof HTMLElement) monthlyOutput.textContent = money.format(payment);
    if (annualDebtOutput instanceof HTMLElement) annualDebtOutput.textContent = money.format(payment * 12);
    if (totalInterestOutput instanceof HTMLElement) totalInterestOutput.textContent = money.format(totalInterest);
    if (totalPaymentsOutput instanceof HTMLElement) totalPaymentsOutput.textContent = money.format(totalPayments);
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
    updateTaxCopy();
    calculate();
  }

  function setScheduleMode(next) {
    scheduleMode = next === "monthly" ? "monthly" : "annual";
    scheduleButtons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      button.setAttribute("aria-pressed", button.dataset.scheduleMode === scheduleMode ? "true" : "false");
    });
    renderLoanSchedule();
  }

  const now = new Date();
  const firstPayment = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  if (!firstPaymentInput.value) firstPaymentInput.value = dateInputValue(firstPayment);
  if (!taxStartInput.value) taxStartInput.value = monthInputValue(now);
  if (!taxBasisInput.value) taxBasisInput.value = purchasePriceInput.value || "400000";

  transactionButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener("click", () => setTransaction(button.dataset.transaction || "purchase"));
  });

  scheduleButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener("click", () => setScheduleMode(button.dataset.scheduleMode || "annual"));
  });

  purchasePriceInput.addEventListener("input", () => {
    if (!taxBasisDirty && transaction === "purchase") taxBasisInput.value = purchasePriceInput.value;
  });
  taxBasisInput.addEventListener("input", () => {
    taxBasisDirty = true;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate();
  });

  form.addEventListener("input", () => {
    window.requestAnimationFrame(calculate);
  });
  form.addEventListener("change", () => {
    window.requestAnimationFrame(calculate);
  });

  updateTaxCopy();
  calculate();
})();