import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { leads } from "@/db/schema";
import { leadFormSchema } from "@/lib/validation";
import { berechneAmpel } from "@/lib/ampel";
import { sendeLeadBenachrichtigung } from "@/lib/notify";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Bitte prüfe deine Angaben.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: Bots fuellen unsichtbare Felder aus. Wir tun so, als waere
  // alles gut gelaufen, speichern aber nichts.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const { kaufpreisProM2, mietrenditeProzent, ampel } = berechneAmpel({
    immobilientyp: data.immobilientyp,
    wohnflaeche: data.wohnflaeche,
    vermietet: data.vermietet,
    kaltmiete: data.kaltmiete ?? null,
    preisvorstellung: data.preisvorstellung ?? null,
  });

  const [lead] = await db
    .insert(leads)
    .values({
      name: data.name,
      telefon: data.telefon,
      email: data.email,
      plzOrt: data.plzOrt,
      immobilientyp: data.immobilientyp,
      wohnflaeche: String(data.wohnflaeche),
      baujahr: data.baujahr ?? null,
      zustand: data.zustand ?? null,
      verkaufsgrund: data.verkaufsgrund,
      vermietet: data.vermietet,
      kaltmiete: data.kaltmiete != null ? String(data.kaltmiete) : null,
      preisvorstellung:
        data.preisvorstellung != null ? String(data.preisvorstellung) : null,
      zeitrahmen: data.zeitrahmen,
      datenschutzZustimmung: data.datenschutzZustimmung,
      utmQuelle: data.utmQuelle ?? null,
      ortSeite: data.ortSeite ?? null,
      kaufpreisProM2: kaufpreisProM2 != null ? String(kaufpreisProM2) : null,
      mietrenditeProzent:
        mietrenditeProzent != null ? String(mietrenditeProzent) : null,
      ampel,
    })
    .returning();

  await sendeLeadBenachrichtigung(lead);

  return NextResponse.json({ ok: true });
}
