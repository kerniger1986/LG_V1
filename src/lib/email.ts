import { Resend } from "resend";
import type { Lead } from "@/db/schema";
import { ampelLabel } from "@/lib/labels";

export async function sendeLeadBenachrichtigung(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!apiKey || !to || !from) {
    console.warn(
      "E-Mail-Benachrichtigung übersprungen: RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL oder LEAD_NOTIFICATION_FROM ist nicht gesetzt.",
    );
    return;
  }

  const resend = new Resend(apiKey);

  const betreff = `Neuer Lead (${ampelLabel[lead.ampel] ?? lead.ampel}): ${lead.name}, ${lead.plzOrt}`;

  const zeilen = [
    `Ampel: ${ampelLabel[lead.ampel] ?? lead.ampel}`,
    `Name: ${lead.name}`,
    `Telefon: ${lead.telefon}`,
    `E-Mail: ${lead.email}`,
    `PLZ/Ort: ${lead.plzOrt}`,
    `Immobilientyp: ${lead.immobilientyp}`,
    `Wohnfläche: ${lead.wohnflaeche} m²`,
    `Verkaufsgrund: ${lead.verkaufsgrund}`,
    `Vermietet: ${lead.vermietet ? "Ja" : "Nein"}`,
    lead.kaltmiete ? `Kaltmiete: ${lead.kaltmiete} €/Monat` : null,
    lead.preisvorstellung
      ? `Preisvorstellung: ${lead.preisvorstellung} €`
      : "Preisvorstellung: keine Angabe",
    lead.kaufpreisProM2 ? `Kaufpreis/m²: ${lead.kaufpreisProM2} €` : null,
    lead.mietrenditeProzent
      ? `Mietrendite: ${lead.mietrenditeProzent} %`
      : null,
    `Zeitrahmen: ${lead.zeitrahmen}`,
    lead.utmQuelle ? `UTM-Quelle: ${lead.utmQuelle}` : null,
    lead.ortSeite ? `Landingpage: ${lead.ortSeite}` : null,
  ].filter(Boolean);

  try {
    await resend.emails.send({
      from,
      to,
      subject: betreff,
      text: zeilen.join("\n"),
    });
  } catch (error) {
    console.error("Lead-Benachrichtigung konnte nicht gesendet werden:", error);
  }
}
