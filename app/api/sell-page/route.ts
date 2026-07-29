export const dynamic = "force-dynamic";

const SELL_PAGE_STYLES = `<style id="sell-license-header-layout-v4">
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
  }
</style>`;

const LISTING_AUTOMATION_SCRIPT = `<script id="fllm-listing-automation-v1">
(function () {
  function start() {
    var form = document.querySelector('.seller-form');
    if (!(form instanceof HTMLFormElement) || form.dataset.fllmAutomation === 'active') return;
    form.dataset.fllmAutomation = 'active';

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

    var status = form.querySelector('.seller-status');
    var button = form.querySelector('.seller-submit');
    var params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'cancelled' && status) {
      status.className = 'seller-status error';
      status.textContent = 'Payment was canceled. Your listing has not been submitted for review. You may complete the form again when ready.';
    }

    document.addEventListener('submit', async function (event) {
      if (event.target !== form) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (form.dataset.fllmSubmitting === 'true') return;
      form.dataset.fllmSubmitting = 'true';

      if (button instanceof HTMLButtonElement) {
        button.disabled = true;
        button.textContent = 'Creating Secure Checkout…';
      }
      if (status) {
        status.className = 'seller-status submitting';
        status.textContent = 'Saving your listing and opening secure Stripe checkout…';
      }

      try {
        var data = new FormData(form);
        var payload = {
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || ''),
          county: String(data.get('county') || ''),
          license_type: String(data.get('license_type') || ''),
          asking_price: String(data.get('asking_price') || ''),
          license_status: String(data.get('license_status') || ''),
          preferred_timing: String(data.get('preferred_timing') || ''),
          message: String(data.get('message') || ''),
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
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  window.setTimeout(start, 750);
})();
</script>`;

function listingAutomationConfigured() {
  return Boolean(
    process.env.SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_WEBHOOK_SECRET &&
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN &&
      process.env.FLLM_ADMIN_KEY
  );
}

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL("/sell-your-license/index.html", request.url);
    sourceUrl.searchParams.set("source", "1");

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) {
      throw new Error(`Static seller page returned ${sourceResponse.status}`);
    }

    let html = await sourceResponse.text();
    if (!html.includes('id="sell-license-header-layout-v4"')) {
      html = html.replace("</head>", `${SELL_PAGE_STYLES}</head>`);
    }
    if (
      listingAutomationConfigured() &&
      !html.includes('id="fllm-listing-automation-v1"')
    ) {
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
