export type Ampel = "gruen" | "gelb" | "rot";

export interface AmpelInput {
  immobilientyp: "haus" | "wohnung" | "grundstueck";
  wohnflaeche: number;
  vermietet: boolean;
  kaltmiete: number | null | undefined;
  preisvorstellung: number | null | undefined;
}

export interface AmpelResult {
  kaufpreisProM2: number | null;
  mietrenditeProzent: number | null;
  ampel: Ampel;
}

// Ankaufsraster
const PREIS_PRO_M2_SCHWELLE = 2000;
const MIETRENDITE_SCHWELLE = 6.5;
// Toleranzband um die Schwellenwerte, in dem statt ROT auf GELB entschieden wird
const TOLERANZ = 0.25;

const PREIS_PRO_M2_TOLERANZGRENZE = PREIS_PRO_M2_SCHWELLE * (1 + TOLERANZ); // 2500
const MIETRENDITE_TOLERANZGRENZE = MIETRENDITE_SCHWELLE * (1 - TOLERANZ); // 4.875

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Berechnet Kaufpreis/m², Mietrendite und die Ampel-Farbe fuer einen Lead.
 *
 * Sonderfaelle (siehe Projekt-Briefing):
 * - Grundstueck: Formel wird uebersprungen, immer GELB (manuelle Pruefung).
 * - Nicht vermietet: keine Mietrendite berechenbar, GRUEN bereits bei
 *   guenstigem Kaufpreis/m² allein (Annahme: Vermietbarkeit nach Ankauf).
 * - Fehlende Preisvorstellung/Kaltmiete: GELB, da nicht berechenbar.
 */
export function berechneAmpel(input: AmpelInput): AmpelResult {
  if (input.immobilientyp === "grundstueck") {
    return { kaufpreisProM2: null, mietrenditeProzent: null, ampel: "gelb" };
  }

  if (input.preisvorstellung == null || input.preisvorstellung <= 0) {
    return { kaufpreisProM2: null, mietrenditeProzent: null, ampel: "gelb" };
  }

  const kaufpreisProM2 = round2(input.preisvorstellung / input.wohnflaeche);

  if (!input.vermietet) {
    let ampel: Ampel;
    if (kaufpreisProM2 <= PREIS_PRO_M2_SCHWELLE) {
      ampel = "gruen";
    } else if (kaufpreisProM2 <= PREIS_PRO_M2_TOLERANZGRENZE) {
      ampel = "gelb";
    } else {
      ampel = "rot";
    }
    return { kaufpreisProM2, mietrenditeProzent: null, ampel };
  }

  if (input.kaltmiete == null || input.kaltmiete <= 0) {
    return { kaufpreisProM2, mietrenditeProzent: null, ampel: "gelb" };
  }

  const mietrenditeProzent = round2(
    ((input.kaltmiete * 12) / input.preisvorstellung) * 100,
  );

  let ampel: Ampel;
  if (
    kaufpreisProM2 <= PREIS_PRO_M2_SCHWELLE &&
    mietrenditeProzent >= MIETRENDITE_SCHWELLE
  ) {
    ampel = "gruen";
  } else if (
    kaufpreisProM2 <= PREIS_PRO_M2_TOLERANZGRENZE &&
    mietrenditeProzent >= MIETRENDITE_TOLERANZGRENZE
  ) {
    ampel = "gelb";
  } else {
    ampel = "rot";
  }

  return { kaufpreisProM2, mietrenditeProzent, ampel };
}
