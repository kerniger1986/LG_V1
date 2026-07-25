export interface ContactPhone {
  label: string;
  href: string;
}

/**
 * Liest die Kontakt-Telefonnummer aus einer Env-Var (noch nicht vorhanden bei
 * Projektstart). Gibt null zurueck, solange keine Nummer hinterlegt ist -
 * die UI blendet den Anruf-Button dann einfach aus, statt einen Platzhalter
 * live zu zeigen.
 */
export function getContactPhone(): ContactPhone | null {
  const raw = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  if (!raw) return null;

  const digits = raw.replace(/[^\d+]/g, "");
  const href = digits.startsWith("+")
    ? digits
    : `+49${digits.replace(/^0/, "")}`;

  return { label: raw, href: `tel:${href}` };
}
