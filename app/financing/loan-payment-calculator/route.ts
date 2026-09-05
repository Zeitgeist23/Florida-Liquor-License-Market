export const dynamic = "force-dynamic";

const CALCULATOR_FOCUS_STYLES = `<style id="fllm-calculator-focus-styles">
  html { scroll-behavior: auto !important; }
  .financing-page > .seller-hero { display: none !important; }
  .fllm-loan-calculator-section { scroll-margin-top: 18px; margin-top: 28px !important; }
</style>`;

const CALCULATOR_FOCUS_SCRIPT = `<script id="fllm-calculator-focus-script">
(function () {
  function focusCalculator() {
    var target = document.getElementById('loan-calculator');
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.scrollY - 18;
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'auto' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', focusCalculator, { once: true });
  } else {
    focusCalculator();
  }

  window.addEventListener('load', focusCalculator, { once: true });
  [40, 120, 300, 700, 1400].forEach(function (delay) {
    window.setTimeout(focusCalculator, delay);
  });
})();
</script>`;

export async function GET(request: Request) {
  try {
    const sourceUrl = new URL('/api/financing-page', request.url);
    const sourceResponse = await fetch(sourceUrl, { cache: 'no-store' });

    if (!sourceResponse.ok) {
      throw new Error(`Financing page returned ${sourceResponse.status}`);
    }

    let html = await sourceResponse.text();

    html = html.replace(
      /<title>[^<]*<\/title>/,
      '<title>Florida Liquor License Loan Payment Calculator | FLLM</title>'
    );
    html = html.replace(
      /<meta name="robots" content="[^"]*"\/>/,
      '<meta name="robots" content="noindex, follow"/>'
    );

    if (!html.includes('id="fllm-calculator-focus-styles"')) {
      html = html.replace('</head>', `${CALCULATOR_FOCUS_STYLES}</head>`);
    }
    if (!html.includes('id="fllm-calculator-focus-script"')) {
      html = html.replace('</body>', `${CALCULATOR_FOCUS_SCRIPT}</body>`);
    }

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Calculator focus route failed', error);
    return Response.redirect(new URL('/financing#loan-calculator', request.url), 307);
  }
}
