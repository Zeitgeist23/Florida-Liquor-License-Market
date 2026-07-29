from pathlib import Path

component_path = Path("components/AbtPdfFormWorkspace.tsx")
data_path = Path("data/abt-license-series-options.ts")

component = component_path.read_text()
data = data_path.read_text()

replacements = [
    (
        '  getAbtLicenseSeriesOption,\n  getDefaultAbtLicenseSeriesKey,\n',
        '  getAbtLicenseClassOptions,\n  getAbtLicenseSeriesOption,\n  getAbtLicenseSeriesOptionBySeriesAndClass,\n  getDefaultAbtLicenseSeriesKey,\n',
    ),
    (
        'type FieldKind = "text" | "checkbox" | "dropdown" | "radio" | "option-list" | "license-series";',
        'type FieldKind = "text" | "checkbox" | "dropdown" | "radio" | "option-list" | "license-series" | "license-class";',
    ),
    (
        '''      if (isLicenseSeriesField(label)) {
        definitions.push({
          name,
          label,
          kind: "license-series",
          options: ABT_LICENSE_SERIES_OPTIONS.map((option) => option.key),
          originalIndex: index,
        });
        initialValues[name] = getDefaultAbtLicenseSeriesKey(field.getText() || "");
      } else {
        definitions.push({ name, label, kind: "text", options: [], originalIndex: index });
        initialValues[name] = field.getText() || "";
      }''',
        '''      if (isLicenseSeriesField(label)) {
        definitions.push({
          name,
          label,
          kind: "license-series",
          options: ABT_LICENSE_SERIES_OPTIONS.map((option) => option.key),
          originalIndex: index,
        });
        initialValues[name] = getDefaultAbtLicenseSeriesKey(field.getText() || "");
      } else if (isTypeClassField(label)) {
        definitions.push({ name, label, kind: "license-class", options: [], originalIndex: index });
        initialValues[name] = field.getText() || "";
      } else {
        definitions.push({ name, label, kind: "text", options: [], originalIndex: index });
        initialValues[name] = field.getText() || "";
      }''',
    ),
    (
        '''  const groupedLicenseSeries = useMemo(() => licenseSeriesGroups(), []);
  const completion = fields.length ? Math.round(((step + 1) / totalSteps) * 100) : 0;''',
        '''  const groupedLicenseSeries = useMemo(() => licenseSeriesGroups(), []);
  const licenseSeriesField = fields.find((field) => field.kind === "license-series");
  const selectedSeriesKey = licenseSeriesField && typeof values[licenseSeriesField.name] === "string"
    ? values[licenseSeriesField.name] as string
    : "";
  const typeClassOptions = useMemo(
    () => getAbtLicenseClassOptions(selectedSeriesKey),
    [selectedSeriesKey]
  );
  const completion = fields.length ? Math.round(((step + 1) / totalSteps) * 100) : 0;''',
    ),
    (
        '''  function updateLicenseSeries(name: string, key: string) {
    const selected = getAbtLicenseSeriesOption(key);
    const typeClassField = fields.find((field) => isTypeClassField(field.label));

    setValues((current) => {
      const next: DraftValues = { ...current, [name]: key };
      if (selected && typeClassField) next[typeClassField.name] = selected.classCode;
      return next;
    });
  }

  function clearSavedDraft() {''',
        '''  function updateLicenseSeries(name: string, key: string) {
    const selected = getAbtLicenseSeriesOption(key);
    const typeClassField = fields.find((field) => isTypeClassField(field.label));

    setValues((current) => {
      const next: DraftValues = { ...current, [name]: key };
      if (selected && typeClassField) next[typeClassField.name] = selected.classCode;
      return next;
    });
  }

  function updateLicenseClass(name: string, classCode: string) {
    const seriesField = fields.find((field) => field.kind === "license-series");

    setValues((current) => {
      const next: DraftValues = { ...current, [name]: classCode };
      if (!seriesField) return next;

      const currentKey = typeof current[seriesField.name] === "string" ? current[seriesField.name] as string : "";
      const currentSeries = getAbtLicenseSeriesOption(currentKey)?.series || "";
      const matchingSeries = getAbtLicenseSeriesOptionBySeriesAndClass(currentSeries, classCode);
      if (matchingSeries) next[seriesField.name] = matchingSeries.key;
      return next;
    });
  }

  function clearSavedDraft() {''',
    ),
    (
        '''          } else if (definition.kind === "text" && field instanceof PDFTextField) {
            field.setText(typeof value === "string" ? value : "");''',
        '''          } else if ((definition.kind === "text" || definition.kind === "license-class") && field instanceof PDFTextField) {
            field.setText(typeof value === "string" ? value : "");''',
    ),
    (
        '''                        ) : field.kind === "text" ? (
                          <input
                            type={inputType(field)}
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateValue(field.name, event.target.value)}
                            autoComplete="off"
                          />
                        ) : (''',
        '''                        ) : field.kind === "license-class" ? (
                          <select
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateLicenseClass(field.name, event.target.value)}
                            disabled={!selectedSeriesKey}
                          >
                            <option value="">
                              {selectedSeriesKey ? "Select a valid type/class" : "Select a license series first"}
                            </option>
                            {typeClassOptions.map((option) => (
                              <option value={option.classCode} key={option.classCode}>{option.label}</option>
                            ))}
                          </select>
                        ) : field.kind === "text" ? (
                          <input
                            type={inputType(field)}
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateValue(field.name, event.target.value)}
                            autoComplete="off"
                          />
                        ) : (''',
    ),
]

for old, new in replacements:
    if old not in component:
        raise SystemExit(f"Expected component block was not found:\n{old[:180]}")
    component = component.replace(old, new, 1)

append = '''

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
'''

if "export function getAbtLicenseClassOptions" in data:
    raise SystemExit("Class-option helpers already exist")

data = data.rstrip() + append + "\n"

component_path.write_text(component)
data_path.write_text(data)
