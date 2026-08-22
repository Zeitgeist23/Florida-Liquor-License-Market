import "server-only";

import type { Listing } from "@/data/listings";
import { sendMatchingLicenseAlert } from "@/lib/license-alert-email";
import {
  activeLicenseAlerts,
  markLicenseAlertNotified,
  type LicenseAlert,
} from "@/lib/license-alert-store";

function normalizedCounty(value: string) {
  const cleaned = value.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

function matchesAlert(alert: LicenseAlert, listing: Listing) {
  if (!listing.sourceRef) return false;
  if (!alert.counties.includes(normalizedCounty(listing.county))) return false;
  if (!alert.license_types.includes(listing.type)) return false;
  if (alert.max_price !== null) {
    if (listing.price === null) return false;
    if (listing.price > alert.max_price) return false;
  }
  if (alert.notified_listing_refs.includes(listing.sourceRef)) return false;
  return true;
}

export async function notifyMatchingLicenseAlerts(
  listing: Listing,
  listingUrl: string
) {
  if (!listing.sourceRef) return { matched: 0, sent: 0, failed: 0 };

  const alerts = await activeLicenseAlerts();
  const matching = alerts.filter((alert) => matchesAlert(alert, listing));
  let sent = 0;
  let failed = 0;

  for (const alert of matching) {
    try {
      await sendMatchingLicenseAlert({
        alert,
        listing: {
          county: normalizedCounty(listing.county),
          type: listing.type,
          price: listing.price,
          priceLabel: listing.priceLabel,
          sourceRef: listing.sourceRef,
          url: listingUrl,
        },
      });
      await markLicenseAlertNotified(alert, listing.sourceRef);
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error("License Alert email failed", {
        alertId: alert.id,
        listingRef: listing.sourceRef,
        error,
      });
    }
  }

  return { matched: matching.length, sent, failed };
}
