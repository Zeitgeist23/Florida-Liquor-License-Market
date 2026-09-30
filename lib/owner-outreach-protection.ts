import "server-only";

import { businessQuotaListingRecords, type BusinessQuotaListing } from "@/lib/business-quota-listings";
import { isFllmMarketingExcluded } from "@/lib/fllm-marketing-exclusions";

const SITE_URL = "https://www.floridaliquorlicensemarket.com";

export type OwnerOutreachProtectionInput = {
  listing_url?: string | null;
  source_url?: string | null;
  listing_title?: string | null;
  business_name?: string | null;
  broker_name?: string | null;
  brokerage?: string | null;
  county?: string | null;
};

export type BrokerFeaturedProtectionMatch = {
  protected: true;
  listingReference: string;
  title: string;
  brokerName: string;
  brokerage: string;
  reason: string;
};

function normalizeUrl(value?: string | null) {
  if (!value) return "";
  try {
    const url = new URL(value, SITE_URL);
    url.hash = "";
    const params = new URLSearchParams(url.search);
    for (const key of ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","fbclid"]) {
      params.delete(key);
    }
    url.search = params.toString();
    return url.toString().replace(/\/$/, "").toLowerCase();
  } catch {
    return value.trim().replace(/\/$/, "").toLowerCase();
  }
}

function normalizeText(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function protectedRecords() {
  return businessQuotaListingRecords.filter(
    (record) => record.featured && !record.sellerDirect && Boolean(record.brokerName?.trim()),
  );
}

function recordUrls(record: BusinessQuotaListing) {
  return [
    `${SITE_URL}${record.href}`,
    ...(record.sourceListingUrls || []),
  ].map(normalizeUrl).filter(Boolean);
}

export function brokerFeaturedOwnerOutreachProtection(
  input: OwnerOutreachProtectionInput,
): BrokerFeaturedProtectionMatch | null {
  if (isFllmMarketingExcluded({
    broker_name: input.broker_name,
    brokerage: input.brokerage,
  })) {
    return {
      protected: true,
      listingReference: "FLLM-INTERNAL-EXCLUSION",
      title: input.listing_title || input.business_name || "Excluded prospect",
      brokerName: input.broker_name || "Excluded broker",
      brokerage: input.brokerage || "Excluded brokerage",
      reason: "FLLM internal do-not-market / do-not-contact exclusion.",
    };
  }
  const candidateUrls = [input.listing_url, input.source_url].map(normalizeUrl).filter(Boolean);
  const candidateTitle = normalizeText(input.listing_title || input.business_name);
  const candidateBroker = normalizeText(input.broker_name);
  const candidateBrokerage = normalizeText(input.brokerage);
  const candidateCounty = normalizeText(input.county);

  for (const record of protectedRecords()) {
    const urls = new Set(recordUrls(record));
    if (candidateUrls.some((url) => urls.has(url))) {
      return {
        protected: true,
        listingReference: record.listingReference,
        title: record.title,
        brokerName: record.brokerName,
        brokerage: record.brokerage,
        reason: "Exact source/FLLM URL match to an FLLM broker featured listing.",
      };
    }

    const recordBroker = normalizeText(record.brokerName);
    const recordBrokerage = normalizeText(record.brokerage);
    const recordCounty = normalizeText(record.county);
    const recordTitle = normalizeText(record.title);

    const brokerMatch =
      Boolean(candidateBroker && recordBroker && candidateBroker === recordBroker) ||
      Boolean(candidateBrokerage && recordBrokerage && candidateBrokerage === recordBrokerage);
    const countyMatch = Boolean(candidateCounty && recordCounty && candidateCounty === recordCounty);
    const titleMatch =
      Boolean(candidateTitle && recordTitle && (candidateTitle === recordTitle || candidateTitle.includes(recordTitle) || recordTitle.includes(candidateTitle)));

    if (brokerMatch && countyMatch && titleMatch) {
      return {
        protected: true,
        listingReference: record.listingReference,
        title: record.title,
        brokerName: record.brokerName,
        brokerage: record.brokerage,
        reason: "Broker, county and listing-title match to an FLLM broker featured listing.",
      };
    }
  }

  return null;
}

export function isBrokerFeaturedOwnerOutreachProtected(input: OwnerOutreachProtectionInput) {
  return Boolean(brokerFeaturedOwnerOutreachProtection(input));
}
