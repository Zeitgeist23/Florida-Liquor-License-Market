"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SubmitState = "idle" | "submitting" | "sent" | "error";

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)})${digits.slice(3)}`;
  return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function normalizeCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/^0+(?=\d)/, "");
}

function formatCurrencyInput(value: string) {
  if (!value) return "";
  return formatCurrency(Number(value));
}

function formatCurrency(value: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number.isFinite(value) ? value : 0);
}

function ListingSidebarLoanCalculator({
  initialPurchasePrice,
  initialDownPayment,
  mode,
  locale = "en",
}: {
  initialPurchasePrice: number;
  initialDownPayment: number;
  mode: "license" | "sba-business";
  locale?: "en" | "es";
}) {
  const [purchasePriceInput, setPurchasePriceInput] = useState(String(initialPurchasePrice));
  const [downPaymentInput, setDownPaymentInput] = useState(String(initialDownPayment));
  const [annualRateInput, setAnnualRateInput] = useState("10");
  const [termYears, setTermYears] = useState(10);
  const isSbaBusiness = mode === "sba-business";
  const isSpanish = locale === "es";
  const tr = (english: string, spanish: string) => isSpanish ? spanish : english;

  const purchasePrice = Math.max(0, Number(purchasePriceInput) || 0);
  const downPayment = Math.max(0, Number(downPaymentInput) || 0);
  const annualRate = Math.min(50, Math.max(0, Number(annualRateInput) || 0));
  const principal = Math.max(0, purchasePrice - downPayment);
  const months = Math.max(1, Math.round(termYears * 12));
  const monthlyRate = Math.max(0, annualRate) / 100 / 12;
  let monthlyPayment = 0;

  if (principal > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    }
  }

  const fullCalculatorParams = new URLSearchParams({
    mode: isSbaBusiness ? "sba-business" : "license",
    purchasePrice: String(Math.round(purchasePrice)),
    downPayment: String(Math.round(downPayment)),
    rate: String(annualRate),
    term: String(termYears),
  });
  const fullCalculatorHref = `/financing/loan-payment-calculator?${fullCalculatorParams.toString()}`;

  return (
    <section className="antezza-sidebar-calculator" aria-labelledby="antezza-sidebar-calculator-title">
      <style>{`
        .antezza-calculator-slot{width:100%;margin-top:11px}
        .antezza-sidebar-calculator{box-sizing:border-box;position:relative;overflow:hidden;width:100%;border:1px solid rgba(111,240,255,.46);border-radius:13px;background:radial-gradient(circle at 50% 0%,rgba(70,210,229,.18),transparent 35%),linear-gradient(180deg,rgba(13,35,42,.99),rgba(5,18,24,.995));box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 15px 34px rgba(0,0,0,.22),0 0 34px rgba(70,210,229,.08);color:#edfaff;padding:20px;font-family:"Montserrat",Arial,sans-serif}
        .antezza-sidebar-calculator::before{content:"";position:absolute;inset:0 16% auto;height:1px;background:linear-gradient(90deg,transparent,rgba(138,244,255,.95),transparent);box-shadow:0 0 16px rgba(91,229,245,.7)}
        .antezza-sidebar-calculator *{box-sizing:border-box}
        .antezza-sidebar-calculator__eyebrow{display:block;color:#7cefff;font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;text-align:center}
        .antezza-sidebar-calculator h2{margin:7px 0 6px;color:#fff;font-size:21px;line-height:1.15}
        .antezza-sidebar-calculator__intro{margin:0 0 17px;color:#bfd7de;font-size:11px;line-height:1.55}
        .antezza-sidebar-calculator__fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
        .antezza-sidebar-calculator label{min-width:0}
        .antezza-sidebar-calculator label>span,.antezza-sidebar-calculator__readonly>span{display:block;margin-bottom:6px;color:#dff9fc;font-size:10px;font-weight:800;line-height:1.3}
        .antezza-sidebar-calculator input,.antezza-sidebar-calculator select{width:100%;min-height:43px;border:1px solid rgba(124,239,255,.24);border-radius:7px;outline:none;background:rgba(1,17,22,.92);color:#f3feff;padding:9px 10px;font:inherit;font-size:13px}
        .antezza-sidebar-calculator input:focus,.antezza-sidebar-calculator select:focus,.antezza-sidebar-calculator a:focus-visible{outline:2px solid #8af4ff;outline-offset:2px}
        .antezza-sidebar-calculator__readonly{margin-top:11px;text-align:center}
        .antezza-sidebar-calculator__readonly>span{text-align:center}
        .antezza-sidebar-calculator__readonly output{display:flex;align-items:center;justify-content:center;min-height:43px;border:1px solid rgba(124,239,255,.2);border-radius:7px;background:rgba(124,239,255,.07);color:#8af4ff;padding:9px 10px;text-align:center;font-family:"Courier New",Consolas,monospace;font-size:15px;font-weight:800;animation:antezza-financed-highlight .55s ease-out}
        @keyframes antezza-financed-highlight{0%{border-color:#8af4ff;background:rgba(65,211,255,.28);box-shadow:0 0 0 1px rgba(138,244,255,.35),0 0 22px rgba(65,211,255,.4);color:#d9fcff}100%{border-color:rgba(124,239,255,.2);background:rgba(124,239,255,.07);box-shadow:none;color:#8af4ff}}
        @media(prefers-reduced-motion:reduce){.antezza-sidebar-calculator__readonly output{animation:none}}
        .antezza-sidebar-calculator__payment{margin-top:13px;border:1px solid rgba(124,239,255,.2);border-radius:10px;background:rgba(0,0,0,.2);padding:15px;text-align:center}
        .antezza-sidebar-calculator__payment span{display:block;color:#bfeef3;font-size:10px;font-weight:900;letter-spacing:.07em;text-transform:uppercase}
        .antezza-sidebar-calculator__payment strong{display:block;margin-top:5px;color:#8af4ff;font-family:"Courier New",Consolas,monospace;font-size:25px;line-height:1.05}
        .antezza-sidebar-calculator__payment small{display:block;margin-top:5px;color:#91aab2;font-size:9px}
        .antezza-sidebar-calculator__cta{display:flex;align-items:center;justify-content:center;min-height:46px;margin-top:13px;border:1px solid #f0aa12;border-radius:7px;background:linear-gradient(180deg,#f9b31a,#efa000);color:#061a24!important;text-decoration:none;font-size:12px;font-weight:950;letter-spacing:.025em;transition:transform .16s ease,filter .16s ease}
        .antezza-sidebar-calculator__cta:hover{transform:translateY(-1px);filter:brightness(1.05)}
        .antezza-sidebar-calculator__full{display:block;margin-top:10px;color:#8af4ff!important;text-align:center;text-decoration:none;font-size:10px;font-weight:800}
        .antezza-sidebar-calculator__full:hover{text-decoration:underline}
        .antezza-sidebar-calculator__fineprint{display:block;margin-top:12px;color:#839ca5;font-size:9px;line-height:1.45;text-align:center}
        @media(max-width:760px){.antezza-sidebar-calculator__fields{grid-template-columns:1fr}.antezza-sidebar-calculator h2{font-size:20px}}
      `}</style>

      <span className="antezza-sidebar-calculator__eyebrow">
        {isSbaBusiness ? tr("SBA 7(a) Business Loan Tool", "Herramienta de préstamo comercial SBA 7(a)") : tr("Liquor License Financing Tool", "Herramienta de financiamiento de licencias")}
      </span>
      <h2 id="antezza-sidebar-calculator-title">
        {isSbaBusiness ? tr("Estimate Business Financing", "Estimar financiamiento del negocio") : tr("Estimate License Financing", "Estimar financiamiento de la licencia")}
      </h2>
      <p className="antezza-sidebar-calculator__intro">
        {isSbaBusiness
          ? tr("Compare estimated principal-and-interest payments for financing the operating-business purchase.", "Compare pagos estimados de capital e intereses para financiar la compra del negocio en operación.")
          : tr("Model an estimated payment for the displayed liquor-license component of this listing.", "Calcule un pago estimado para el componente de licencia mostrado en este anuncio.")}
      </p>

      <div className="antezza-sidebar-calculator__fields">
        <label>
          <span>{isSbaBusiness ? tr("Business purchase price", "Precio de compra del negocio") : tr("License purchase price", "Precio de compra de la licencia")}</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatCurrencyInput(purchasePriceInput)}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => {
              setPurchasePriceInput(normalizeCurrencyInput(event.target.value));
            }}
          />
        </label>
        <label>
          <span>{tr("Down payment", "Pago inicial")}</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatCurrencyInput(downPaymentInput)}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => {
              setDownPaymentInput(normalizeCurrencyInput(event.target.value));
            }}
          />
        </label>
        <label>
          <span>{tr("Interest rate (APR)", "Tasa de interés (APR)")}</span>
          <input
            type="number"
            min="0"
            max="50"
            step="0.01"
            inputMode="decimal"
            value={annualRateInput}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => {
              const rawValue = event.target.value;
              if (rawValue === "") {
                setAnnualRateInput("");
                return;
              }
              const normalizedValue = rawValue.replace(/^0+(?=\d)/, "");
              setAnnualRateInput(String(Math.min(50, Math.max(0, Number(normalizedValue) || 0))));
            }}
          />
        </label>
        <label>
          <span>{tr("Loan term", "Plazo del préstamo")}</span>
          <select value={termYears} onChange={(event) => setTermYears(Number(event.target.value) || 10)}>
            {!isSbaBusiness && <option value={3}>3 years</option>}
            <option value={5}>{tr("5 years", "5 años")}</option>
            <option value={7}>{tr("7 years", "7 años")}</option>
            <option value={10}>{tr("10 years", "10 años")}</option>
            {!isSbaBusiness && <option value={15}>15 years</option>}
            {!isSbaBusiness && <option value={20}>20 years</option>}
          </select>
        </label>
      </div>

      <div className="antezza-sidebar-calculator__readonly">
        <span>{tr("Amount financed", "Monto financiado")}</span>
        <output key={`${principal}-${annualRate}-${termYears}`} aria-live="polite">{formatCurrency(principal)}</output>
      </div>

      <div className="antezza-sidebar-calculator__payment" aria-live="polite">
        <span>{tr("Estimated Monthly Payment", "Pago mensual estimado")}</span>
        <strong>{formatCurrency(monthlyPayment, 2)}</strong>
        <small>{tr("Estimated principal + interest", "Capital + intereses estimados")}</small>
      </div>

      <a className="antezza-sidebar-calculator__cta" href={isSbaBusiness ? "/sba-7a-liquor-license-business-financing" : "/financing#request-financing"}>
        {isSbaBusiness ? tr("Review SBA 7(a) Financing", "Revisar financiamiento SBA 7(a)") : tr("Request Financing", "Solicitar financiamiento")}
      </a>
      <a className="antezza-sidebar-calculator__full" href={fullCalculatorHref}>
        {isSbaBusiness ? tr("Open Full SBA 7(a) Loan Analysis →", "Abrir análisis completo del préstamo SBA 7(a) →") : tr("Open Full Loan Calculator →", "Abrir calculadora completa →")}
      </a>
      <small className="antezza-sidebar-calculator__fineprint">
        {tr("Illustrative estimate only.", "Estimación únicamente ilustrativa.")} {isSbaBusiness ? tr("This is not an SBA eligibility or approval determination. ", "Esto no determina la elegibilidad ni la aprobación de la SBA. ") : ""}{tr("Actual financing is subject to independent lender review, underwriting, collateral eligibility, transaction structure, rates, terms, and approval.", "El financiamiento real está sujeto a revisión independiente del prestamista, evaluación crediticia, elegibilidad de la garantía, estructura de la transacción, tasas, términos y aprobación.")}
      </small>
    </section>
  );
}

type Props = {
  listingReference: string;
  listingRequested: string;
  listingCounty: string;
  licenseType: string;
  askingPrice: string;
  listingStatus: string;
  listingUrl: string;
  recipientKind?: "broker" | "seller";
  showFinancingCalculator?: boolean;
  financingCalculatorMode?: "license" | "sba-business";
  financingPurchasePrice?: number;
  financingDownPayment?: number;
  locale?: "en" | "es";
};

export default function ListingBrokerInquiryForm({
  listingReference,
  listingRequested,
  listingCounty,
  licenseType,
  askingPrice,
  listingStatus,
  listingUrl,
  recipientKind = "broker",
  showFinancingCalculator = false,
  financingCalculatorMode = "license",
  financingPurchasePrice = 0,
  financingDownPayment,
  locale = "en",
}: Props) {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [phone, setPhone] = useState("");
  const [calculatorTarget, setCalculatorTarget] = useState<HTMLElement | null>(null);
  const isSeller = recipientKind === "seller";
  const isSpanish = locale === "es";
  const tr = (english: string, spanish: string) => isSpanish ? spanish : english;

  useEffect(() => {
    if (!showFinancingCalculator || financingPurchasePrice <= 0) return;

    const financeCard = document.querySelector<HTMLElement>(
      financingCalculatorMode === "sba-business"
        ? `[data-featured-broker-listing="${listingReference}"] .marketplace-listing-ira-promo`
        : `[data-featured-broker-listing="${listingReference}"] .marketplace-listing-finance-promo`,
    );
    if (!financeCard) return;

    const selector = `[data-listing-calculator-slot="${listingReference}"]`;
    let slot = document.querySelector<HTMLElement>(selector);
    const created = !slot;

    if (!slot) {
      slot = document.createElement("div");
      slot.className = "antezza-calculator-slot";
      slot.setAttribute("data-listing-calculator-slot", listingReference);
      financeCard.insertAdjacentElement("afterend", slot);
    }

    setCalculatorTarget(slot);

    return () => {
      setCalculatorTarget(null);
      if (created && slot?.isConnected) slot.remove();
    };
  }, [financingCalculatorMode, listingReference, showFinancingCalculator, financingPurchasePrice]);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("first_name") ?? "").trim();
    const lastName = String(formData.get("last_name") ?? "").trim();
    formData.set("name", `${firstName} ${lastName}`.trim());

    if (formData.get("_honey")) {
      setStatus("sent");
      form.reset();
      setPhone("");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Unable to submit inquiry");

      setStatus("sent");
      form.reset();
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form
        id={`${listingReference.toLowerCase()}-request-information`}
        className="marketplace-listing-broker-inquiry"
        onSubmit={submitInquiry}
      >
        <h3>{isSeller ? tr("Buyer Message & Contact Center", "Centro de mensajes y contacto del comprador") : tr("Request Information", "Solicitar información")}</h3>
        {isSeller && (
          <p className="marketplace-listing-inquiry-intro">
            {tr("Send your contact information and message directly to the seller through FLLM.", "Envíe su información de contacto y mensaje directamente al vendedor a través de FLLM.")}
          </p>
        )}
        <input
          type="hidden"
          name="inquiry_type"
          value={isSeller ? "Self-Directed Seller Listing Inquiry" : "Third-Party Broker Listing Inquiry"}
        />
        <input type="hidden" name="listing_reference" value={listingReference} />
        <input type="hidden" name="listing_requested" value={listingRequested} />
        <input type="hidden" name="listing_county" value={listingCounty} />
        <input type="hidden" name="license_type" value={licenseType} />
        <input type="hidden" name="asking_price" value={askingPrice} />
        <input type="hidden" name="listing_status" value={listingStatus} />
        <input type="hidden" name="listing_url" value={listingUrl} />
        <input className="marketplace-listing-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="marketplace-listing-broker-inquiry-row">
          <label>
            <span>{tr("First name", "Nombre")}</span>
            <input name="first_name" type="text" placeholder={tr("First Name", "Nombre")} autoComplete="given-name" required />
          </label>
          <label>
            <span>{tr("Last name", "Apellido")}</span>
            <input name="last_name" type="text" placeholder={tr("Last Name", "Apellido")} autoComplete="family-name" required />
          </label>
        </div>
        <div className="marketplace-listing-broker-inquiry-row">
          <label>
            <span>{tr("Phone number", "Teléfono")}</span>
            <input
              name="phone"
              type="tel"
              placeholder="(555)555-5555"
              autoComplete="tel-national"
              inputMode="tel"
              maxLength={13}
              value={phone}
              onChange={(event) => setPhone(formatPhoneNumber(event.target.value))}
              required
            />
          </label>
          <label>
            <span>{tr("Email", "Correo electrónico")}</span>
            <input name="email" type="email" placeholder="Email" autoComplete="email" required />
          </label>
        </div>
        <label>
          <span>{tr("Message", "Mensaje")}</span>
          <textarea
            name="message"
            placeholder={isSeller ? tr("Message to the seller", "Mensaje al vendedor") : tr("Message", "Mensaje")}
            rows={6}
            required
          />
        </label>
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? tr("Sending…", "Enviando…") : isSeller ? tr("Send Message to Seller", "Enviar mensaje al vendedor") : tr("Send Inquiry", "Enviar solicitud")}
        </button>
        {status === "sent" && (
          <p className="marketplace-listing-inquiry-status success" role="status">
            {isSeller
              ? tr("Your contact information and message were sent to the seller and recorded by FLLM.", "Su información de contacto y mensaje fueron enviados al vendedor y registrados por FLLM.")
              : tr("Your inquiry was sent to the listing broker and recorded by FLLM.", "Su solicitud fue enviada al corredor del anuncio y registrada por FLLM.")}
          </p>
        )}
        {status === "error" && (
          <p className="marketplace-listing-inquiry-status error" role="alert">
            {isSeller
              ? tr("The message could not be sent. Please try again.", "No se pudo enviar el mensaje. Inténtelo de nuevo.")
              : tr("The inquiry could not be sent. Please call the listing broker.", "No se pudo enviar la solicitud. Llame al corredor del anuncio.")}
          </p>
        )}
        <small>
          {isSeller
            ? tr("By submitting this form, you agree to be contacted by the seller and FLLM regarding this license. FLLM records the inquiry for marketplace lead tracking.", "Al enviar este formulario, acepta que el vendedor y FLLM se comuniquen con usted sobre esta licencia. FLLM registra la solicitud para el seguimiento de contactos del mercado.")
            : tr("By submitting this form, you agree to be contacted by the listing broker and FLLM regarding this license. FLLM records the inquiry for marketplace lead tracking.", "Al enviar este formulario, acepta que el corredor del anuncio y FLLM se comuniquen con usted sobre esta licencia. FLLM registra la solicitud para el seguimiento de contactos del mercado.")}
        </small>
      </form>
      {calculatorTarget
        ? createPortal(
            <ListingSidebarLoanCalculator
              initialPurchasePrice={financingPurchasePrice}
              mode={financingCalculatorMode}
              initialDownPayment={
                financingDownPayment ?? Math.round(financingPurchasePrice * 0.2)
              }
              locale={locale}
            />,
            calculatorTarget,
          )
        : null}
    </>
  );
}
