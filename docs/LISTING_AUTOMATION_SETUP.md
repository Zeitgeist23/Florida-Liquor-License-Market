# FLLM Paid Listing Automation

This implementation replaces the old FormSubmit + fixed Stripe Payment Link handoff with a complete submission, payment, review, publishing, and email workflow.

Production deployment was retriggered after merge to verify the Vercel build against the current `main` branch.

A new production deployment retry was triggered on July 28, 2026 after the Florida ABT Forms feature was merged.

## Workflow

1. The seller form saves a private submission in Supabase.
2. The server creates a new Stripe Checkout Session for $14.95 and attaches the FLLM submission reference as Stripe metadata.
3. Stripe sends `checkout.session.completed` (or `checkout.session.async_payment_succeeded`) to the webhook.
4. The submission is marked paid and the customer receives the payment-received email from `listings@floridaliquorlicensemarket.com`.
5. An administrator opens `/admin/listing-submissions`, reviews the paid submission, and clicks **Approve & Publish**.
6. The listing is inserted into the marketplace inventory, a public listing page is created at `/listings/<submission-reference>`, and the approved/live email is sent with the official FLLM signature.

All payment and approval handlers are idempotent. Email delivery states are stored so duplicate Stripe webhook deliveries do not intentionally send duplicate messages.

## 1. Create the Supabase table

Open the Supabase SQL Editor and run:

`supabase/migrations/20260728_listing_payment_approval_automation.sql`

The application uses the existing server-side environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

The service-role key must remain server-only.

## 2. Add Vercel environment variables

Add the variables listed in `.env.example` to the Vercel project for Production, Preview, and Development as appropriate.

Required:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL=https://www.floridaliquorlicensemarket.com`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `GOOGLE_SENDER_EMAIL=listings@floridaliquorlicensemarket.com`
- `FLLM_ADMIN_KEY` (use a long private password)

Optional:

- `STRIPE_LISTING_PRICE_ID`

When `STRIPE_LISTING_PRICE_ID` is omitted, the server creates the $14.95 one-time line item dynamically.

## 3. Configure the Stripe webhook

In Stripe Workbench / Webhooks, create a webhook endpoint:

`https://www.floridaliquorlicensemarket.com/api/stripe/webhook`

Subscribe to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Copy the endpoint signing secret (`whsec_...`) into `STRIPE_WEBHOOK_SECRET` in Vercel.

Use live-mode Stripe keys for the production domain. Test-mode keys and a test webhook can be used on a Vercel preview deployment first.

## 4. Authorize the Gmail API mailbox

Create or select a Google Cloud project controlled by FLLM and enable the Gmail API.

Create an OAuth 2.0 Web or Desktop client and authorize the mailbox:

`listings@floridaliquorlicensemarket.com`

The OAuth grant must include:

`https://www.googleapis.com/auth/gmail.send`

Store the OAuth client ID, client secret, and resulting long-lived refresh token in Vercel. The refresh token must belong to the listings mailbox, because Gmail sends the automated messages as the authenticated user.

The application sends a complete MIME email through `users.messages.send`. The official corporate signature is included directly in the automated HTML template; Gmail settings do not append signatures to API-created messages.

## 5. Add the email logo

The automated signature loads:

`/assets/fllm-email-logo.png`

The asset must be deployed with the site so Gmail can load it through the production URL.

## 6. Review and publish paid submissions

Open:

`https://www.floridaliquorlicensemarket.com/admin/listing-submissions`

Enter `FLLM_ADMIN_KEY`.

The review screen displays all submissions and their payment/email states. Only paid submissions can be approved. Before publishing, confirm or edit:

- listing title
- approved license type
- approved asking price

Click **Approve & Publish**. The action:

- upserts the listing into the existing `listings` table
- marks the submission approved
- creates the public listing URL
- sends the approved/live email

The same button can safely be used again to republish or retry a previously failed approval email.

## 7. End-to-end test

1. Deploy to a Vercel preview with Stripe test keys.
2. Submit a seller form using an email address you control.
3. Complete Stripe Checkout with a Stripe test card.
4. Confirm the payment-received email arrives.
5. Open the admin review page and approve the submission.
6. Confirm the new card appears on `/listings` and opens its dedicated listing page.
7. Confirm the approved/live email contains the correct first name, title, county, type, link, and FLLM signature.
8. Verify Stripe webhook delivery shows HTTP 200.
9. Repeat the same webhook event from Stripe and confirm a duplicate email is not sent.
