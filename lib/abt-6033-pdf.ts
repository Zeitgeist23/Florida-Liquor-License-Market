import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type Abt6033InterestedPerson = {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string;
};

export type Abt6033Draft = {
  entryType: "individual" | "business";
  entrantName: string;
  county: string;
  mailingAddress: string;
  city: string;
  mailingCounty: string;
  state: string;
  zip: string;
  phone: string;
  phoneExtension: string;
  email: string;
  interestedPersons: Abt6033InterestedPerson[];
  affirmation: boolean;
};

export type Abt6033ElectronicSignature = {
  mode: "typed" | "drawn";
  signerId: string;
  typedName?: string;
  imageDataUrl?: string;
};

const ink = rgb(0.04, 0.09, 0.17);

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function formatDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[2]}/${match[3]}/${match[1]}` : clean(value);
}

function fitText(text: string, maxWidth: number, font: Awaited<ReturnType<PDFDocument["embedFont"]>>, size: number) {
  let fitted = clean(text);
  while (fitted && font.widthOfTextAtSize(fitted, size) > maxWidth) fitted = fitted.slice(0, -1);
  return fitted;
}

export async function createAbt6033Pdf(
  templateBytes: ArrayBuffer | Uint8Array,
  draft: Abt6033Draft,
  electronicSignature?: Abt6033ElectronicSignature
) {
  const pdf = await PDFDocument.load(templateBytes, { ignoreEncryption: true, updateMetadata: false });
  if (pdf.getPageCount() < 3) throw new Error("The official ABT-6033 template is missing its entry page.");

  const page = pdf.getPage(2);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const signatureFont = await pdf.embedFont(StandardFonts.HelveticaOblique);
  const size = 8.3;
  const draw = (value: string, x: number, y: number, width: number, textSize = size) => {
    const text = fitText(value, width, font, textSize);
    if (text) page.drawText(text, { x, y, size: textSize, font, color: ink });
  };

  // Section 1 — entrant type and name.
  page.drawText("X", {
    x: draft.entryType === "business" ? 316 : 75,
    y: 668,
    size: 11,
    font,
    color: ink,
  });
  draw(draft.entrantName, draft.entryType === "business" ? 311 : 72, 637, 224);

  // Section 2 — drawing county.
  draw(`${draft.county === "Dade" ? "Miami-Dade" : draft.county} County`, 75, 570, 455, 9);

  // Section 3 — mailing and contact information.
  draw(draft.mailingAddress, 72, 510, 465);
  draw(draft.city, 72, 486, 178);
  draw(draft.mailingCounty, 266, 486, 120);
  draw(draft.state, 402, 486, 38);
  draw(draft.zip, 456, 486, 80);
  draw(draft.email, 72, 462, 266);
  draw(draft.phone, 355, 462, 88);
  draw(draft.phoneExtension, 455, 462, 80);

  // Section 4 — interested persons.
  const personRows = [406, 382.5, 359, 335.5];
  draft.interestedPersons.slice(0, 4).forEach((person, index) => {
    const y = personRows[index];
    draw(person.lastName, 75, y, 108);
    draw(person.firstName, 195, y, 108);
    draw(person.middleName, 315, y, 108);
    draw(formatDate(person.dateOfBirth), 438, y, 96);
  });

  // Section 5 — printed signer names and, when elected, one adopted electronic signature.
  const signatureRows = [251, 227.5, 204, 180.5];
  draft.interestedPersons.slice(0, 4).forEach((person, index) => {
    draw(`${person.firstName} ${person.middleName} ${person.lastName}`, 75, signatureRows[index], 218);
  });

  if (electronicSignature) {
    const signerIndex = draft.interestedPersons.findIndex((person) => person.id === electronicSignature.signerId);
    if (signerIndex >= 0 && signerIndex < signatureRows.length) {
      const y = signatureRows[signerIndex];
      if (electronicSignature.mode === "typed" && electronicSignature.typedName) {
        const text = fitText(electronicSignature.typedName, 218, signatureFont, 13);
        page.drawText(text, { x: 315, y: y - 1, size: 13, font: signatureFont, color: ink });
      }
      if (electronicSignature.mode === "drawn" && electronicSignature.imageDataUrl) {
        const image = await pdf.embedPng(electronicSignature.imageDataUrl);
        const natural = image.scale(1);
        const scale = Math.min(210 / natural.width, 21 / natural.height);
        page.drawImage(image, {
          x: 315,
          y: y - 3,
          width: natural.width * scale,
          height: natural.height * scale,
        });
      }
    }
  }

  pdf.setTitle(`ABT-6033 — 2026 Quota Drawing — ${draft.county} County`);
  pdf.setSubject("Prepared ABT-6033 quota beverage license drawing entry");
  pdf.setCreator("Florida Liquor License Market preparation workspace");
  return pdf.save({ useObjectStreams: false });
}
