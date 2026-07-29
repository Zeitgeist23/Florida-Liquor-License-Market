export const dynamic = "force-dynamic";

const SELL_PAGE_STYLES = `<style id="sell-license-header-layout-v6">
  .seller-page > .seller-header {
    justify-content: space-between !important;
    column-gap: 22px !important;
  }

  .seller-page > .seller-header > .seller-brand {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    flex: 0 0 auto !important;
    width: auto !important;
    height: 100% !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }

  .seller-page > .seller-header > .seller-brand img {
    display: block !important;
    width: 162px !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: left center !important;
  }

  .seller-page > .seller-header > nav {
    display: flex !important;
    align-items: center !important;
    flex: 0 0 auto !important;
    margin-left: auto !important;
  }

  .seller-sale-method {
    min-width: 0;
    margin: 4px 0 26px;
    padding: 22px;
    border: 1px solid rgba(157, 113, 28, 0.28);
    border-radius: 16px;
    background: #fffaf0;
  }

  .seller-sale-method legend {
    padding: 0 8px;
    font-size: 1.08rem;
    font-weight: 800;
    color: #14213d;
  }

  .seller-sale-method-intro {
    margin: 0 0 16px;
    color: #5d6470;
    line-height: 1.55;
  }

  .seller-sale-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .seller-sale-option {
    display: flex !important;
    align-items: flex-start;
    gap: 11px;
    padding: 16px;
    border: 1px solid rgba(20, 33, 61, 0.16);
    border-radius: 12px;
    background: #ffffff;
    cursor: pointer;
  }

  .seller-sale-option:has(input:checked) {
    border-color: #b88925;
    box-shadow: 0 0 0 2px rgba(184, 137, 37, 0.14);
  }

  .seller-sale-option input {
    flex: 0 0 auto;
    margin-top: 4px;
  }

  .seller-sale-option-copy,
  .seller-sale-option-copy strong,
  .seller-sale-option-copy small {
    display: block;
  }

  .seller-sale-option-copy strong {
    margin-bottom: 6px;
    color: #14213d;
    font-size: 1rem;
  }

  .seller-sale-option-copy small {
    color: #5d6470;
    line-height: 1.5;
  }

  .seller-broker-disclosure {
    margin: 14px 0 0;
    color: #5d6470;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .seller-broker-details {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid rgba(157, 113, 28, 0.2);
  }

  .seller-broker-details[hidden] {
    display: none !important;
  }

  .seller-broker-details > p {
    grid-column: 1 / -1;
    margin: 0;
    color: #14213d;
    font-weight: 700;
  }

  .seller-broker-field {
    display: grid !important;
    gap: 7px;
  }

  .seller-broker-field > span {
    color: #14213d;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .seller-broker-field input,
  .seller-broker-field select {
    width: 100%;
  }

  .seller-broker-checkbox {
    grid-column: 1 / -1;
    display: flex !important;
    align-items: flex-start;
    gap: 10px;
    padding: 13px 14px;
    border-radius: 10px;
    background: rgba(184, 137, 37, 0.08);
  }

  .seller-broker-checkbox input {
    flex: 0 0 auto;
    margin-top: 3px;
  }

  .seller-broker-checkbox span {
    color: #343b48;
    line-height: 1.45;
  }

  @media (max-width: 720px) {
    .seller-sale-options,
    .seller-broker-details {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .seller-page > .seller-header {
      column-gap: 12px !important;
    }

    .seller-page > .seller-header > .seller-brand img {
      width: 141px !important;
    }

    .seller-page > .seller-header > nav {
      gap: 10px !important;
    }

    .seller-sale-method {
      padding: 17px;
    }
  }
</style>`;

const SALE_METHOD_SECTION = `<fieldset class="seller-sale-method" id="fllm-sale-method">
  <legend>How would you like to sell your license? *</legend>
  <p class="seller-sale-method-intro">Choose the level of assistance you would like. You may change your selection later.</p>
  <div class="seller-sale-options">
    <label class="seller-sale-option">
      <input type="radio" name="sale_method" value="Self-Directed Listing" required>
      <span class="seller-sale-option-copy"><strong>Self-Directed Listing</strong><small>I will communicate directly with prospective buyers and manage the negotiation, documentation, and license-transfer process. FLLM will publish my listing and forward buyer inquiries to me.</small></span>
    </label>
    <label class="seller-sale-option">
      <input type="radio" name="sale_method" value="Broker-Assisted Listing" required>
      <span class="seller-sale-option-copy"><strong>Broker-Assisted Listing</strong><small>I would like an FLLM-affiliated broker to contact me about marketing my license, communicating with prospective buyers, negotiating offers, and coordinating the transaction and ABT transfer process.</small></span>
    </label>
  </div>
  <p class="seller-broker-disclosure">Selecting Broker-Assisted Listing does not create a brokerage relationship or require you to pay a commission. An FLLM representative will contact you to discuss broker availability, services, commission terms, and the required written agreement.</p>
  <div class="seller-broker-details" hidden>
    <p>Tell us how you would like a broker to assist.</p>
    <label class="seller-broker-field"><span>Are you currently represented by another broker? *</span><select name="broker_currently_represented"><option value="">Select one</option><option>No</option><option>Yes</option><option>Not sure</option></select></label>
    <label class="seller-broker-field"><span>Preferred arrangement</span><select name="broker_arrangement"><option value="">No preference / need guidance</option><option>Non-exclusive arrangement</option><option>Exclusive arrangement</option></select></label>
    <label class="seller-broker-field"><span>Desired net amount</span><input type="text" inputmode="decimal" name="desired_net_amount" placeholder="$"></label>
    <label class="seller-broker-field"><span>Preferred contact method *</span><select name="broker_contact_method"><option value="">Select one</option><option>Phone</option><option>Email</option><option>Either phone or email</option></select></label>
    <label class="seller-broker-checkbox"><input type="checkbox" name="abt_transaction_coordination" value="Requested"><span>I would also like information about ABT application preparation and transaction coordination.</span></label>
  </div>
</fieldset>`;

const LISTING_AUTOMATION_SCRIPT = `<script id="fllm-listing-automation-v3">
(function () {
  var SECTION_HTML = ${JSON.stringify(SALE_METHOD_SECTION)};
  var currentForm = null;
  var currentSubmitHandler = null;
  var currentChangeHandler = null;

  function createSection() {
    var template = document.createElement('template');
    template.innerHTML = SECTION_HTML.trim();
    return template.content.firstElementChild;
  }

  function ensureSection(form) {
    var section = form.querySelector('#fllm-sale-method');
    if (!section) {
      section = createSection();
      var fields = form.querySelector('.seller-fields');
      if (section && fields) form.insertBefore(section, fields);
    }
    return section;
  }

  function toggleBrokerDetails(form) {
    var section = form.querySelector('#fllm-sale-method');
    if (!section) return;

    var selected = section.querySelector('input[name="sale_method"]:checked');
    var assisted = Boolean(selected && selected.value === 'Broker-Assisted Listing');
    var details = section.querySelector('.seller-broker-details');
    var represented = section.querySelector('select[name="broker_currently_represented"]');
    var contact = section.querySelector('select[name="broker_contact_method"]');

    if (details) {
      details.hidden = !assisted;
      Array.from(details.querySelectorAll('input, select')).forEach(function (field) {
        field.disabled = !assisted;
      });
    }
    if (represented) represented.required = assisted;
    if (contact) contact.required = assisted;
  }

  function setCancelledMessage(form) {
    if (new URLSearchParams(window.location.search).get('payment') !== 'cancelled') return;
    var status = form.querySelector('.seller-status');
    if (!status) return;
    status.className = 'seller-status error';
    status.textContent = 'Payment was canceled. Your listing has not been submitted for review. You may complete the form again when ready.';
  }

  function normalizeExistingFields(form) {
    var nameInput = form.querySelector('input[name="name"]');
    var nameLabel = nameInput && nameInput.closest('label');
    var nameCaption = nameLabel && nameLabel.querySelector('span');
    if (nameCaption) nameCaption.textContent = 'Full Name *';

    var licenseSelect = form.querySelector('select[name="license_type"]');
    if (licenseSelect) {
      Array.from(licenseSelect.options).forEach(function (option) {
        if (!option.textContent.trim()) option.remove();
      });
    }
  }

  function detachCurrentForm() {
    if (!currentForm) return;
    if (currentSubmitHandler) currentForm.removeEventListener('submit', currentSubmitHandler, true);
    if (currentChangeHandler) currentForm.removeEventListener('change', currentChangeHandler);
    currentForm = null;
    currentSubmitHandler = null;
    currentChangeHandler = null;
  }

  function installOnForm(form) {
    if (!(form instanceof HTMLFormElement)) return;

    ensureSection(form);
    normalizeExistingFields(form);
    toggleBrokerDetails(form);
    setCancelledMessage(form);

    if (currentForm === form) return;
    detachCurrentForm();
    currentForm = form;

    currentChangeHandler = function (event) {
      var target = event.target;
      if (target && target.name === 'sale_method') toggleBrokerDetails(form);
    };

    currentSubmitHandler = async function (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (form.dataset.fllmSubmitting === 'true') return;

      var data = new FormData(form);
      var saleMethod = String(data.get('sale_method') || '');
      if (!saleMethod) {
        var firstChoice = form.querySelector('input[name="sale_method"]');
        if (firstChoice) firstChoice.focus();
        return;
      }

      form.dataset.fllmSubmitting = 'true';
      var status = form.querySelector('.seller-status');
      var button = form.querySelector('.seller-submit');

      if (button instanceof HTMLButtonElement) {
        button.disabled = true;
        button.textContent = 'Creating Secure Checkout…';
      }
      if (status) {
        status.className = 'seller-status submitting';
        status.textContent = 'Saving your listing and opening secure Stripe checkout…';
      }

      try {
        var assistanceSummary = ['Sale method: ' + saleMethod];
        if (saleMethod === 'Broker-Assisted Listing') {
          assistanceSummary.push('Currently represented by another broker: ' + String(data.get('broker_currently_represented') || 'Not provided'));
          assistanceSummary.push('Preferred broker arrangement: ' + String(data.get('broker_arrangement') || 'No preference / need guidance'));
          assistanceSummary.push('Desired net amount: ' + String(data.get('desired_net_amount') || 'Not provided'));
          assistanceSummary.push('Preferred contact method: ' + String(data.get('broker_contact_method') || 'Not provided'));
          assistanceSummary.push('ABT application preparation and transaction coordination: ' + (data.get('abt_transaction_coordination') ? 'Requested' : 'Not requested'));
        }

        var sellerMessage = String(data.get('message') || '').trim();
        var combinedMessage = assistanceSummary.join('\\n');
        if (sellerMessage) combinedMessage += '\\n\\nAdditional seller details:\\n' + sellerMessage;

        var payload = {
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || ''),
          county: String(data.get('county') || ''),
          license_type: String(data.get('license_type') || ''),
          asking_price: String(data.get('asking_price') || ''),
          license_status: String(data.get('license_status') || ''),
          preferred_timing: String(data.get('preferred_timing') || ''),
          message: combinedMessage,
          seller_certification: Boolean(data.get('seller_certification')),
          fee_agreement: Boolean(data.get('fee_agreement')),
          honey: String(data.get('_honey') || '')
        };

        var response = await fetch('/api/listing-submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        var result = await response.json();
        if (!response.ok || !result.checkoutUrl) {
          throw new Error(result.error || 'Unable to create secure checkout.');
        }
        window.location.assign(result.checkoutUrl);
      } catch (error) {
        form.dataset.fllmSubmitting = 'false';
        if (button instanceof HTMLButtonElement) {
          button.disabled = false;
          button.textContent = 'Continue to Secure Payment — $14.95';
        }
        if (status) {
          status.className = 'seller-status error';
          status.textContent = error && error.message ? error.message : 'We could not save your listing. Please try again or use the Contact page.';
        }
      }
    };

    form.addEventListener('change', currentChangeHandler);
    form.addEventListener('submit', currentSubmitHandler, true);
  }

  function install() {
    var form = document.querySelector('.seller-form');
    if (form) installOnForm(form);
  }

  function start() {
    install();
    var observer = new MutationObserver(install);
    observer.observe(document.body, { childList: true, subtree: true });

    var attempts = 0;
    var timer = window.setInterval(function () {
      install();
      attempts += 1;
      if (attempts >= 30) window.clearInterval(timer);
    }, 500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
</script>`;

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/sell-your-license/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Static seller page returned ${sourceResponse.status}`);
    }

    let html = await sourceResponse.text();

    if (!html.includes('id="sell-license-header-layout-v6"')) {
      html = html.replace("</head>", `${SELL_PAGE_STYLES}</head>`);
    }

    if (!html.includes('id="fllm-sale-method"')) {
      html = html.replace(
        '<div class="seller-fields">',
        `${SALE_METHOD_SECTION}<div class="seller-fields">`
      );
    }

    if (!html.includes('id="fllm-listing-automation-v3"')) {
      html = html.replace("</body>", `${LISTING_AUTOMATION_SCRIPT}</body>`);
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Seller page enhancement failed", error);
    return Response.redirect(new URL("/sell-your-license/index.html", request.url), 307);
  }
}
