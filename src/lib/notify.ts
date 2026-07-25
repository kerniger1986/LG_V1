import type { Lead } from "@/db/schema";
import { ampelLabel } from "@/lib/labels";

export async function sendeLeadBenachrichtigung(lead: Lead) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "Slack-Benachrichtigung übersprungen: SLACK_WEBHOOK_URL ist nicht gesetzt.",
    );
    return;
  }

  const zeilen = [
    `*Neuer Lead (${ampelLabel[lead.ampel] ?? lead.ampel})*`,
    `*Name:* ${lead.name}`,
    `*Telefon:* ${lead.telefon}`,
    `*E-Mail:* ${lead.email}`,
    `*PLZ/Ort:* ${lead.plzOrt}`,
    `*Immobilientyp:* ${lead.immobilientyp}`,
    `*Wohnfläche:* ${lead.wohnflaeche} m²`,
    `*Verkaufsgrund:* ${lead.verkaufsgrund}`,
    `*Vermietet:* ${lead.vermietet ? "Ja" : "Nein"}`,
    lead.kaltmiete ? `*Kaltmiete:* ${lead.kaltmiete} €/Monat` : null,
    lead.preisvorstellung
      ? `*Preisvorstellung:* ${lead.preisvorstellung} €`
      : "*Preisvorstellung:* keine Angabe",
    lead.kaufpreisProM2 ? `*Kaufpreis/m²:* ${lead.kaufpreisProM2} €` : null,
    lead.mietrenditeProzent
      ? `*Mietrendite:* ${lead.mietrenditeProzent} %`
      : null,
    `*Zeitrahmen:* ${lead.zeitrahmen}`,
    lead.utmQuelle ? `*UTM-Quelle:* ${lead.utmQuelle}` : null,
    lead.ortSeite ? `*Landingpage:* ${lead.ortSeite}` : null,
  ].filter(Boolean);

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: zeilen.join("\n") }),
    });
  } catch (error) {
    console.error("Lead-Benachrichtigung konnte nicht gesendet werden:", error);
  }
}
