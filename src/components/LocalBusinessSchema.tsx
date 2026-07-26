import { getContactPhone } from "@/lib/contact";
import { getBusinessAddress } from "@/lib/business";
import { getSiteUrl } from "@/lib/site-url";

interface LocalBusinessSchemaProps {
  /** Ort, auf den sich die Seite bezieht, z. B. "Bad Honnef". */
  areaServed?: string;
}

/**
 * Schema.org LocalBusiness als JSON-LD. Telefonnummer und Adresse werden nur
 * ausgegeben, wenn sie tatsaechlich hinterlegt sind (siehe contact.ts /
 * business.ts) - kein Platzhaltertext in strukturierten Daten.
 */
export function LocalBusinessSchema({ areaServed }: LocalBusinessSchemaProps) {
  const telefon = getContactPhone();
  const adresse = getBusinessAddress();
  const url = getSiteUrl();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "FSCF Holding GmbH",
    alternateName: "Rhein-Sieg Immobilienberatung",
    url,
  };

  if (telefon) schema.telephone = telefon.label;
  if (adresse) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: adresse.street,
      postalCode: adresse.postalCode,
      addressLocality: adresse.city,
      addressCountry: "DE",
    };
  }
  if (areaServed) schema.areaServed = areaServed;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
