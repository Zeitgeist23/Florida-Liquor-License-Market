"use client";

import { useMemo, useState } from "react";

import {
  ABT_6002_TRANSFER_FEE_LOCAL_KEY,
  ABT_6002_TRANSFER_FEE_SESSION_KEY,
  createAbt6002TransferFeePayload,
} from "@/lib/abt-6002-transfer-fee";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function blankSales() {
  return Array.from({ length: 3 }, () => Array.from({ length: 12 }, () => ""));
}

function defaultYears() {
  const currentYear = new Date().getFullYear();
  return [currentYear - 3, currentYear - 2, currentYear - 1].map(String);
}

function numberFromCurrencyInput(value: string) {
  const parsed = Number(value.replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export default function QuotaTransferFeeCalculator() {
  const [businessName, setBusinessName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [obtainedDate, setObtainedDate] = useState("");
  const [years, setYears] = useState(defaultYears);
  const [sales, setSales] = useState(blankSales);
  const [issuedWithinThreeYears, setIssuedWithinThreeYears] = useState(false);
  const [annualLicenseFee, setAnnualLicenseFee] = useState("");
  const [possibleWaiver, setPossibleWaiver] = useState(false);
  const [applyStatus, setApplyStatus] = useState("");

  const yearTotals = useMemo(
    () => sales.map((year) => year.reduce((sum, value) => sum + numberFromCurrencyInput(value), 0)),
    [sales]
  );
  const threeYearTotal = yearTotals.reduce((sum, value) => sum + value, 0);
  const threeYearAverage = threeYearTotal / 3;
  const fourMillAssessment = threeYearAverage * 0.004;
  const baseTransferFee = Math.min(fourMillAssessment, 5000);
  const earlyTransferFee = issuedWithinThreeYears
    ? numberFromCurrencyInput(annualLicenseFee) * 15
    : 0;
  const combinedEstimate = baseTransferFee + earlyTransferFee;
  const hasAnySales = threeYearTotal > 0;
  const printReady = hasAnySales && (!issuedWithinThreeYears || numberFromCurrencyInput(annualLicenseFee) > 0);

  function updateSale(yearIndex: number, monthIndex: number, value: string) {
    const cleaned = value.replace(/[^0-9.,]/g, "");
    setSales((current) =>
      current.map((year, index) =>
        index === yearIndex
          ? year.map((amount, month) => (month === monthIndex ? cleaned : amount))
          : year
      )
    );
  }

  function resetCalculator() {
    setBusinessName("");
    setLicenseNumber("");
    setObtainedDate("");
    setYears(defaultYears());
    setSales(blankSales());
    setIssuedWithinThreeYears(false);
    setAnnualLicenseFee("");
    setPossibleWaiver(false);
    setApplyStatus("");
  }

  function applyToAbt6002() {
    if (!hasAnySales) return;

    const payload = createAbt6002TransferFeePayload({
      businessName,
      licenseNumber,
      obtainedDate,
      years,
      sales,
      yearTotals,
      threeYearTotal,
      threeYearAverage,
      transferFee: baseTransferFee,
    });
    const serializedPayload = JSON.stringify(payload);

    window.sessionStorage.setItem(ABT_6002_TRANSFER_FEE_SESSION_KEY, serializedPayload);
    window.localStorage.setItem(ABT_6002_TRANSFER_FEE_LOCAL_KEY, serializedPayload);
    setApplyStatus("Figures saved on this device. Opening ABT-6002…");
    window.location.assign("/resources/forms/abt-6002?transferFee=imported");
  }

  return (
    <section className="transfer-calculator" aria-label="Quota license transfer fee calculator">
      <div className="transfer-privacy-note">
        <strong>Private by design.</strong> Figures entered here stay in this browser. When you apply them to ABT-6002, a temporary copy is kept on this device only and deleted immediately after import. FLLM does not receive or store them.
      </div>

      <div className="transfer-form-sheet" id="quota-transfer-fee-worksheet">
        <div className="transfer-form-heading">
          <span>Quota License Transfer Fee Computation</span>
          <strong>STATE OF FLORIDA</strong>
          <strong>DEPARTMENT OF BUSINESS AND PROFESSIONAL REGULATION</strong>
          <p>Estimate based on Section 12 of DBPR ABT-6002</p>
        </div>

        <div className="transfer-section-title">
          SECTION 12 — TRANSFER FEE COMPUTATION (QUOTA LICENSE ONLY)
        </div>

        <div className="transfer-identity-grid">
          <label>
            <span>Business Name (D/B/A)</span>
            <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} autoComplete="organization" />
          </label>
          <label>
            <span>License Number</span>
            <input value={licenseNumber} onChange={(event) => setLicenseNumber(event.target.value)} autoComplete="off" />
          </label>
          <label className="transfer-obtained-date">
            <span>Date Seller Obtained License</span>
            <input type="date" value={obtainedDate} onChange={(event) => setObtainedDate(event.target.value)} />
          </label>
        </div>

        <div className="transfer-table-wrap">
          <table className="transfer-sales-table">
            <thead>
              <tr>
                {years.map((year, index) => (
                  <th colSpan={2} key={index}>
                    <label>
                      <span>{index === 0 ? "First year" : index === 1 ? "Second year" : "Third year"}</span>
                      <input
                        aria-label={`${index === 0 ? "First" : index === 1 ? "Second" : "Third"} sales year`}
                        value={year}
                        inputMode="numeric"
                        maxLength={9}
                        onChange={(event) =>
                          setYears((current) => current.map((item, itemIndex) =>
                            itemIndex === index ? event.target.value.replace(/[^0-9/-]/g, "") : item
                          ))
                        }
                      />
                    </label>
                  </th>
                ))}
              </tr>
              <tr>
                {years.map((_, index) => (
                  <FragmentHeader key={index} />
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHS.map((month, monthIndex) => (
                <tr key={month}>
                  {years.map((_, yearIndex) => (
                    <FragmentRow
                      key={yearIndex}
                      month={month}
                      yearIndex={yearIndex}
                      monthIndex={monthIndex}
                      value={sales[yearIndex][monthIndex]}
                      onChange={updateSale}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                {yearTotals.map((total, index) => (
                  <td colSpan={2} key={index}>
                    <span>{index === 0 ? "First-year total" : index === 1 ? "Second-year total" : "Third-year total"}</span>
                    <strong>{currency.format(total)}</strong>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="transfer-calculation-grid" aria-live="polite">
          <div><span>Three-year total</span><strong>{currency.format(threeYearTotal)}</strong></div>
          <div><span>Divided by 3</span><strong>{currency.format(threeYearAverage)}</strong></div>
          <div><span>Average × 0.004</span><strong>{currency.format(fourMillAssessment)}</strong></div>
          <div className="transfer-primary-result">
            <span>Estimated Section 12 transfer fee</span>
            <strong>{currency.format(baseTransferFee)}</strong>
            <small>{fourMillAssessment > 5000 ? "The statutory $5,000 maximum has been applied." : "Subject to DBPR/ABT review."}</small>
          </div>
        </div>

        <div className="transfer-print-total" aria-live="polite">
          <div>
            <span>TOTAL ESTIMATED TRANSFER FEE</span>
            <small>
              {issuedWithinThreeYears
                ? "Section 12 fee plus the possible additional 15× annual-license-fee charge."
                : "Section 12 quota-license transfer fee estimate."}
            </small>
          </div>
          <strong>{currency.format(combinedEstimate)}</strong>
          {possibleWaiver && <em>Before any operation-of-law waiver approved by DBPR/ABT.</em>}
          {issuedWithinThreeYears && !annualLicenseFee && (
            <em>Enter the annual license fee before printing so the possible additional charge is included.</em>
          )}
        </div>
      </div>

      <section className="transfer-special-circumstances" aria-label="Possible additional fee and waiver circumstances">
        <div>
          <label className="transfer-check">
            <input
              type="checkbox"
              checked={issuedWithinThreeYears}
              onChange={(event) => setIssuedWithinThreeYears(event.target.checked)}
            />
            <span>
              <strong>This quota license may be transferred within three years after its initial issuance.</strong>
              <small>An additional fee may equal 15 times the applicable annual license fee.</small>
            </span>
          </label>
          {issuedWithinThreeYears && (
            <label className="transfer-annual-fee">
              <span>Applicable annual license fee</span>
              <div><b>$</b><input inputMode="decimal" value={annualLicenseFee} onChange={(event) => setAnnualLicenseFee(event.target.value.replace(/[^0-9.,]/g, ""))} placeholder="0.00" /></div>
            </label>
          )}
        </div>

        <label className="transfer-check">
          <input type="checkbox" checked={possibleWaiver} onChange={(event) => setPossibleWaiver(event.target.checked)} />
          <span>
            <strong>The transfer may occur by operation of law.</strong>
            <small>Examples include death, qualifying judicial proceedings, court appointment of a fiduciary, foreclosure or forced judicial sale, bankruptcy, or government seizure.</small>
          </span>
        </label>
      </section>

      {issuedWithinThreeYears && (
        <div className="transfer-additional-result">
          <div><span>Possible additional 15× fee</span><strong>{currency.format(earlyTransferFee)}</strong></div>
          <div><span>Combined estimated transfer-related fees</span><strong>{currency.format(combinedEstimate)}</strong></div>
          {!annualLicenseFee && <p>Enter the applicable annual license fee to calculate this possible additional charge.</p>}
        </div>
      )}

      {possibleWaiver && (
        <div className="transfer-waiver-alert" role="alert">
          <strong>Do not rely on the ordinary fee estimate for this transaction.</strong>
          Section 561.32(5), Florida Statutes, provides a transfer-fee waiver for specified operation-of-law transfers. DBPR/ABT should confirm that the transaction qualifies and what documentation is required.
        </div>
      )}

      <div className="transfer-actions">
        <button className="btn btn-outline" type="button" onClick={resetCalculator}>Clear worksheet</button>
        <button className="btn btn-outline transfer-apply-button" type="button" onClick={applyToAbt6002} disabled={!hasAnySales}>Apply figures to ABT-6002</button>
        <button className="btn btn-gold" type="button" onClick={() => window.print()} disabled={!printReady}>Print calculation with total fee</button>
      </div>
      {applyStatus && <p className="transfer-apply-status" role="status">{applyStatus}</p>}

      <section className="transfer-disclosures" aria-label="Calculator disclosures">
        <span className="transfer-disclosure-kicker">Important disclosures</span>
        <h2>Read before relying on this estimate</h2>
        <ul>
          <li><strong>Quota licenses only.</strong> This calculator estimates the sales-based transfer fee for quota licenses described in section 561.32(3)(a), Florida Statutes. It is not the general transfer-fee calculation for every alcoholic-beverage license.</li>
          <li><strong>Use gross alcoholic-beverage sales.</strong> Enter the gross sales of alcoholic beverages for the three years immediately preceding the proposed transfer—not total restaurant, food, tobacco, lottery, or other business sales.</li>
          <li><strong>Statutory calculation.</strong> The three-year average is multiplied by 0.004 (four mills). The calculated fee cannot exceed $5,000, and the transferor may elect to pay $5,000 instead of using the sales calculation.</li>
          <li><strong>Newly issued quota licenses.</strong> A license transferred within three years after initial issuance may be subject to an additional fee equal to 15 times the applicable annual license fee. That charge is in addition to other transfer fees.</li>
          <li><strong>Possible statutory waiver.</strong> The Division must waive the transfer fee and delinquent penalties for specified transfers occurring by operation of law, but supporting facts and documentation matter. Do not assume a waiver applies without confirmation.</li>
          <li><strong>Other amounts are excluded.</strong> This estimate does not include application fees, annual license fees, fingerprinting, delinquent amounts, local charges, professional fees, or other costs that may apply.</li>
          <li><strong>Incomplete or unusual sales history.</strong> Contact DBPR/ABT before relying on the result if the seller lacks three complete years of reliable sales records, the business changed ownership or structure, or the license has been inactive.</li>
          <li><strong>Submission still required.</strong> The official ABT-6002 application and required supporting documents must still be completed, signed, and filed. Printing this worksheet does not submit an application.</li>
          <li><strong>Estimate only.</strong> FLLM is not DBPR/ABT, and this tool is not legal, accounting, or tax advice. DBPR/ABT determines the fee and whether the transfer or any waiver is approved.</li>
          <li><strong>Law can change.</strong> The calculator reflects the 2025 Florida Statutes reviewed July 30, 2026. Verify current requirements before filing.</li>
        </ul>
        <div className="transfer-source-links">
          <a href="/resources/statutes/561-32" target="_blank" rel="noreferrer">View Florida Statute 561.32 in FLLM</a>
          <a href="https://www2.myfloridalicense.com/abt/forms/licensing/transfer_of_ownership_application_package.pdf" target="_blank" rel="noreferrer">Open the official ABT-6002 application package</a>
        </div>
      </section>
    </section>
  );
}

function FragmentHeader() {
  return (
    <>
      <th scope="col">Month</th>
      <th scope="col">Amount of sales</th>
    </>
  );
}

function FragmentRow({
  month,
  yearIndex,
  monthIndex,
  value,
  onChange,
}: {
  month: string;
  yearIndex: number;
  monthIndex: number;
  value: string;
  onChange: (yearIndex: number, monthIndex: number, value: string) => void;
}) {
  return (
    <>
      <td data-label="Month">{month}</td>
      <td data-label={`${month} gross alcoholic-beverage sales`}>
        <label>
          <span className="sr-only">{month}, year {yearIndex + 1} gross alcoholic-beverage sales</span>
          <b>$</b>
          <input
            aria-label={`${month}, year ${yearIndex + 1} gross alcoholic-beverage sales`}
            inputMode="decimal"
            value={value}
            onChange={(event) => onChange(yearIndex, monthIndex, event.target.value)}
            placeholder="0.00"
          />
        </label>
      </td>
    </>
  );
}
