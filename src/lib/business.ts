export interface BusinessAddress {
  street: string;
  postalCode: string;
  city: string;
}

/**
 * Geschaeftsadresse fuer das LocalBusiness-Schema, aus Env-Vars - noch nicht
 * hinterlegt, solange die echte Anschrift im Impressum ein Platzhalter ist.
 * Gibt null zurueck, dann laesst die Schema-Ausgabe das address-Feld weg,
 * statt Platzhaltertext in strukturierte Daten zu schreiben.
 */
export function getBusinessAddress(): BusinessAddress | null {
  const street = process.env.NEXT_PUBLIC_BUSINESS_STREET;
  const postalCode = process.env.NEXT_PUBLIC_BUSINESS_PLZ;
  const city = process.env.NEXT_PUBLIC_BUSINESS_ORT;
  if (!street || !postalCode || !city) return null;
  return { street, postalCode, city };
}
