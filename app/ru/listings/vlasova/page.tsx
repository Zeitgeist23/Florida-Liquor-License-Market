import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage, { type FeaturedThirdPartyBusinessListingConfig } from "@/components/FeaturedThirdPartyBusinessListingPage";
import { buildFloridaMarketIndex, marketPriceStats } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "@/app/listings/listings-premium.css";
import "@/app/listings/listings-header-position.css";
import "@/app/listings/listings-map-size.css";
import "@/app/listings/listings-county-links.css";
import "@/app/listings/listings-navy-refresh.css";
import "@/app/listings/listings-card-gold-borders.css";
import "@/app/listings/listings-title-highlight.css";
import "@/app/listings/listings-regression-fix.css";
import "@/app/listings/listings-filter-depth.css";
import "@/app/listings/listings-logo-3pct-lock.css";
import "@/app/listings/listings-conversion-cards.css";
import "@/app/listings/listings-card-overlap-fix.css";
import "@/app/listings/listings-masthead-darker.css";
import "@/app/listings/listings-mobile-header-fix.css";
import "@/app/listings/listings-focused-card.css";
import "@/app/listings/[slug]/listing-detail.css";
import "@/app/listings/third-party-business-listing-standard.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const sourceListingUrl = "https://www.bizbuysell.com/business-opportunity/turnkey-downtown-hollywood-nightclub-1-1m-gross-revenue-4cop-lice/2494332/";
const socialImageUrl = "https://images.bizbuysell.com/shared/brokerdirectory/images/52324/pf_prs_IMG_3680.JPG";

export const dynamic = "force-dynamic";

const canonicalPath = "/ru/listings/vlasova";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  title: "Ночной клуб Downtown Hollywood + лицензия 4COP Quota | Предпросмотр",
  description: "Предварительная страница для проверки брокером Mariya Vlasova: ночной клуб в Downtown Hollywood за $790,000 с включенной лицензией 4COP Quota округа Broward.",
  alternates: { canonical: canonicalUrl, languages: { "en-US": `${siteUrl}/listings/vlasova`, "es-US": `${siteUrl}/es/listings/vlasova`, "ru-RU": canonicalUrl, "x-default": `${siteUrl}/listings/vlasova` } },
  robots: { index: false, follow: false, noarchive: true },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

async function buildConfig(): Promise<FeaturedThirdPartyBusinessListingConfig> {
  const visibleListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const browardFourCop = visibleListings.filter((listing) => listing.county === "Broward County" && listing.type === "4COP Quota");
  const fourCopStats = marketPriceStats(browardFourCop.map((listing) => listing.price));
  const marketIndex = buildFloridaMarketIndex(visibleListings);
  const browardMarket = marketIndex.countyRows.find((row) => row.county === "Broward County");
  const medianValue = fourCopStats.median ?? browardMarket?.fourCop.median ?? 250_000;
  const medianLabel = money(medianValue);
  const countyPopulation = (browardMarket?.population ?? 2_037_472).toLocaleString("en-US");

  return {
    listingReference: "FLLM-VLASOVA",
    canonicalPath,
    locale: "ru",
    languageAlternates: { en: "/listings/vlasova", es: "/es/listings/vlasova", ru: canonicalPath },
    county: "Broward County",
    countyHref: "/counties/broward",
    countyValueHref: "/counties/broward/liquor-license-value",
    countyCities: "Hollywood · Fort Lauderdale · Pompano Beach · Pembroke Pines",
    countyPopulation,
    askingPrice: "Включена в пакет",
    askingPriceNumber: 0,
    marketMedianAskingPrice: medianLabel,
    marketMedianAskingPriceNumber: medianValue,
    packagePrice: "$790,000",
    packagePriceNumber: 790_000,
    licenseType: "4COP Quota",
    licenseAvailableSeparately: false,
    approvalPreview: true,
    businessLabel: "Готовый ночной клуб в Downtown Hollywood",
    businessLabelLinkUrl: sourceListingUrl,
    businessLabelBodyBold: false,
    packagePriceExternalLink: true,
    packagePricePhrase: "пакет ночного клуба + лицензия 4COP Quota:",
    heroSummary: "Готовый бизнес в сфере ночной жизни в Downtown Hollywood: действующий ресторан, бар, лаунж и ночной клуб с включенной лицензией 4COP Quota округа Broward. Пакет бизнес + лицензия 4COP Quota: $790,000.",
    broker: {
      name: "Mariya Vlasova",
      brokerage: "Mariya Vlasova Real Estate",
      phone: "(321) 209-7182",
      email: "vlasovarealestate@gmail.com",
      website: "https://www.vlasovarealestate.com/",
      listingUrl: sourceListingUrl,
      photo: socialImageUrl,
      credential: "Лицензия брокера по недвижимости Florida SL3550830",
    },
    additionalSellerIntro: "Возможность приобрести готовый ресторан, бар, лаунж и ночной клуб в Downtown Hollywood в привлекательной развлекательной локации с включенной полноценной лицензией 4COP Quota.",
    packageIncludes: `Пакет стоимостью $790,000 включает действующий бизнес, лицензию 4COP Quota округа Broward, мебель, оборудование и оснащение, барную и кухонную инфраструктуру, посадочные места ресторана и лаунжа, декор, световое и звуковое оборудование, развлекательную систему, веб-сайт, бренд и существующую операционную инфраструктуру. Недвижимость в сделку не входит. Текущая медианная цена предложения FLLM для лицензий 4COP в Broward County составляет ${medianLabel}; это рыночный ориентир, а не оценка конкретной лицензии.`,
    businessMetrics: [
      { label: "Валовая выручка", value: "$1,100,000", description: "Годовая валовая выручка составляет $1,100,000. Покупателю следует сверить показатель с финансовой отчетностью, налоговыми декларациями и подтверждающими документами." },
      { label: "Денежный поток (SDE)", value: "Не раскрыто", description: "Дискреционный доход продавца не раскрыт." },
      { label: "Цена бизнеса", value: "$790,000", description: "Пакет бизнеса предлагается за $790,000. Итоговую структуру сделки и состав активов следует подтвердить напрямую у брокера." },
      { label: "EBITDA", value: "Не раскрыто", description: "EBITDA не раскрыта." },
      { label: "Год основания", value: "2021", description: "Бизнес основан в 2021 году." },
      { label: "Классификация лицензии", value: "4COP Quota", description: "В пакет включена лицензия 4COP Quota округа Broward на полный ассортимент алкоголя, при условии соответствия покупателя требованиям, зонирования, помещения и одобрения DBPR/ABT.", href: "/license-types/4cop-quota" },
      { label: "Медиана FLLM для 4COP Quota в Broward", value: medianLabel, description: `Рассчитана по текущим активным отдельным предложениям 4COP Quota в Broward County. Количество предложений в расчете: ${fourCopStats.count}. Это рыночный ориентир, а не оценка.`, href: "/counties/broward/liquor-license-value" },
      { label: "Мебель, оборудование и оснащение", value: "$200,000 включено", description: "Около $200,000 мебели, оборудования и оснащения включено в цену." },
      { label: "Сотрудники", value: "8 штатных", description: "В бизнесе работают восемь штатных сотрудников." },
      { label: "Помещение", value: "7,828 кв. футов, аренда", description: "Рабочее помещение площадью около 7,828 кв. футов арендуется." },
      { label: "Ежемесячная аренда", value: "$17,490", description: "Ежемесячная аренда составляет $17,490. Следует проверить договор аренды, переуступку, опции, CAM и требования арендодателя." },
      { label: "Недвижимость", value: "Не включена", description: "Продается бизнес; недвижимость не входит в сделку." },
      { label: "Причина продажи", value: "Другие деловые интересы", description: "Продавец сосредотачивается на других деловых интересах." },
    ],
    opportunitiesHeading: "Основные преимущества предложения",
    opportunities: [
      "Приобрести готовый ресторан, бар, лаунж и ночной клуб в Downtown Hollywood.",
      "Работать с включенной лицензией 4COP Quota округа Broward при условии одобрения DBPR/ABT.",
      "Получить около $200,000 мебели, оборудования и оснащения, включенных в цену.",
      "Использовать годовую валовую выручку $1,100,000 и действующую инфраструктуру ресторана, ночного клуба, развлечений и мероприятий.",
      "Развивать частные мероприятия, VIP-бронирования, цифровой маркетинг, развлекательные программы и тематические вечера.",
    ],
    transitionText: "Продавец готов предоставить разумный переходный период для ознакомления покупателя с ежедневными операциями, персоналом, поставщиками, меню, форматом мероприятий и общими процедурами бизнеса.",
    confidentialityText: "серьезным покупателям следует напрямую у брокера подтвердить личность бизнеса, финансовые документы, договор аренды, лицензионные записи, включенные активы и условия сделки до принятия решений.",
    sourceDisclosure: "Коммерческая, финансовая, арендная, лицензионная и операционная информация должна быть независимо проверена в ходе due diligence до того, как на нее будут полагаться при принятии решения или закрытии сделки.",
    countyContext: "Broward County включает Hollywood, Fort Lauderdale, Pompano Beach, Pembroke Pines, Coral Springs, Miramar и другие крупные рынки гостеприимства и ночной жизни Южной Флориды.",
    singleExternalLinks: true,
    sourceListingLinkLabel: "Открыть исходное объявление BizBuySell →",
  };
}

export default async function MariyaVlasovaRussianPreviewPage() {
  const config = await buildConfig();
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
