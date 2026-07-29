export type AbtLicenseSeriesOption = {
  key: string;
  group: string;
  label: string;
  series: string;
  classCode: string;
};

export const ABT_LICENSE_SERIES_OPTIONS: AbtLicenseSeriesOption[] = [
  { key: "1APS|APS", group: "Beer and wine licenses", label: "1APS — Beer package sales", series: "1APS", classCode: "APS" },
  { key: "1COP|COP", group: "Beer and wine licenses", label: "1COP — Beer consumption on premises", series: "1COP", classCode: "COP" },
  { key: "2APS|APS", group: "Beer and wine licenses", label: "2APS — Beer and wine package sales", series: "2APS", classCode: "APS" },
  { key: "2COP|COP", group: "Beer and wine licenses", label: "2COP — Beer and wine consumption on premises", series: "2COP", classCode: "COP" },

  { key: "3PS|QUOTA", group: "Quota package-sales licenses", label: "3PS — Quota package sales", series: "3PS", classCode: "QUOTA" },
  { key: "3APS|QUOTA", group: "Quota package-sales licenses", label: "3APS — Quota package sales", series: "3APS", classCode: "QUOTA" },
  { key: "3BPS|QUOTA", group: "Quota package-sales licenses", label: "3BPS — Quota package sales", series: "3BPS", classCode: "QUOTA" },
  { key: "3CPS|QUOTA", group: "Quota package-sales licenses", label: "3CPS — Quota package sales", series: "3CPS", classCode: "QUOTA" },
  { key: "3DPS|QUOTA", group: "Quota package-sales licenses", label: "3DPS — Quota package sales", series: "3DPS", classCode: "QUOTA" },

  { key: "4COP|QUOTA", group: "Quota consumption-on-premises licenses", label: "4COP Quota — Beer, wine and liquor", series: "4COP", classCode: "QUOTA" },
  { key: "5COP|QUOTA", group: "Quota consumption-on-premises licenses", label: "5COP Quota — Beer, wine and liquor", series: "5COP", classCode: "QUOTA" },
  { key: "6COP|QUOTA", group: "Quota consumption-on-premises licenses", label: "6COP Quota — Beer, wine and liquor", series: "6COP", classCode: "QUOTA" },
  { key: "7COP|QUOTA", group: "Quota consumption-on-premises licenses", label: "7COP Quota — Beer, wine and liquor", series: "7COP", classCode: "QUOTA" },
  { key: "8COP|QUOTA", group: "Quota consumption-on-premises licenses", label: "8COP Quota — Beer, wine and liquor", series: "8COP", classCode: "QUOTA" },

  { key: "4COP|SFS", group: "Special restaurant and hospitality licenses", label: "4COP SRX / SFS — Special restaurant food-service license", series: "4COP", classCode: "SFS" },
  { key: "5COP|SFS", group: "Special restaurant and hospitality licenses", label: "5COP SFS — Special food-service establishment", series: "5COP", classCode: "SFS" },
  { key: "6COP|SFS", group: "Special restaurant and hospitality licenses", label: "6COP SFS — Special food-service establishment", series: "6COP", classCode: "SFS" },
  { key: "7COP|SFS", group: "Special restaurant and hospitality licenses", label: "7COP SFS — Special food-service establishment", series: "7COP", classCode: "SFS" },
  { key: "8COP|SFS", group: "Special restaurant and hospitality licenses", label: "8COP SFS — Special food-service establishment", series: "8COP", classCode: "SFS" },
  { key: "4COP|S", group: "Special restaurant and hospitality licenses", label: "4COP S — Special motel or hotel", series: "4COP", classCode: "S" },
  { key: "4COP|SH", group: "Special restaurant and hospitality licenses", label: "4COP SH — Historic motel or hotel", series: "4COP", classCode: "SH" },
  { key: "4COP|SBX", group: "Special venue licenses", label: "4COP SBX — Bowling center", series: "4COP", classCode: "SBX" },
  { key: "4COP|SAL", group: "Special venue licenses", label: "4COP SAL — Airport lounge", series: "4COP", classCode: "SAL" },
  { key: "4COP|SPX", group: "Special venue licenses", label: "4COP SPX — Pleasure ship", series: "4COP", classCode: "SPX" },
  { key: "4COP|SCX", group: "Special venue licenses", label: "4COP SCX — Civic center", series: "4COP", classCode: "SCX" },
  { key: "4COP|SCC", group: "Special venue licenses", label: "4COP SCC — County commission facility", series: "4COP", classCode: "SCC" },
  { key: "4COP|H", group: "Special venue licenses", label: "4COP H — Hospital", series: "4COP", classCode: "H" },

  { key: "11C|11C", group: "Club and institutional licenses", label: "11C — Lodge or club", series: "11C", classCode: "11C" },
  { key: "11CS|11CS", group: "Club and institutional licenses", label: "11CS — Special club", series: "11CS", classCode: "11CS" },
  { key: "11AL|11AL", group: "Club and institutional licenses", label: "11AL — American Legion club", series: "11AL", classCode: "11AL" },
  { key: "11PA|11PA", group: "Club and institutional licenses", label: "11PA — Performing arts facility", series: "11PA", classCode: "11PA" },
  { key: "11CG|11CG", group: "Club and institutional licenses", label: "11CG — Private golf club", series: "11CG", classCode: "11CG" },
  { key: "11CT|11CT", group: "Club and institutional licenses", label: "11CT — Ringling Museum club license", series: "11CT", classCode: "11CT" },
  { key: "12RT|12RT", group: "Catering and specialty licenses", label: "12RT — Racetrack caterer", series: "12RT", classCode: "12RT" },
  { key: "13CT|13CT", group: "Catering and specialty licenses", label: "13CT — Caterer license", series: "13CT", classCode: "13CT" },
  { key: "CEP|CEP", group: "Catering and specialty licenses", label: "CEP — Culinary education program", series: "CEP", classCode: "CEP" },
];

export function getAbtLicenseSeriesOption(key: string) {
  return ABT_LICENSE_SERIES_OPTIONS.find((option) => option.key === key) || null;
}

export function getDefaultAbtLicenseSeriesKey(series: string) {
  const normalized = series.trim().toUpperCase();
  if (!normalized) return "";
  return ABT_LICENSE_SERIES_OPTIONS.find((option) => option.series === normalized)?.key || "";
}

const ABT_LICENSE_CLASS_LABELS: Record<string, string> = {
  APS: "APS — Package sales",
  COP: "COP — Consumption on premises",
  QUOTA: "QUOTA — Quota alcoholic-beverage license",
  SFS: "SFS — Special food-service / restaurant license (SRX)",
  S: "S — Special hotel or motel",
  SH: "SH — Historic or qualifying special hotel",
  SBX: "SBX — Bowling center",
  SAL: "SAL — Airport lounge",
  SPX: "SPX — Pleasure, excursion, sightseeing, or charter vessel",
  SCX: "SCX — Civic center",
  SCC: "SCC — County commission facility",
  H: "H — Hospital",
  "11C": "11C — Lodge or club",
  "11CS": "11CS — Special club",
  "11AL": "11AL — American Legion club",
  "11PA": "11PA — Performing arts facility",
  "11CG": "11CG — Private golf club",
  "11CT": "11CT — Ringling Museum club",
  "12RT": "12RT — Racetrack caterer",
  "13CT": "13CT — Caterer",
  CEP: "CEP — Culinary education program",
};

export function getAbtLicenseClassOptions(seriesKey: string) {
  const selectedSeries = getAbtLicenseSeriesOption(seriesKey)?.series || "";
  if (!selectedSeries) return [];

  const seen = new Set<string>();
  return ABT_LICENSE_SERIES_OPTIONS
    .filter((option) => option.series === selectedSeries)
    .filter((option) => {
      if (seen.has(option.classCode)) return false;
      seen.add(option.classCode);
      return true;
    })
    .map((option) => ({
      classCode: option.classCode,
      label: ABT_LICENSE_CLASS_LABELS[option.classCode] || option.classCode,
    }));
}

export function getAbtLicenseSeriesOptionBySeriesAndClass(series: string, classCode: string) {
  const normalizedSeries = series.trim().toUpperCase();
  const normalizedClass = classCode.trim().toUpperCase();
  return ABT_LICENSE_SERIES_OPTIONS.find(
    (option) => option.series === normalizedSeries && option.classCode === normalizedClass
  ) || null;
}

