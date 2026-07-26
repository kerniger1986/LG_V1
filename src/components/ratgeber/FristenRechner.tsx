"use client";

import { useState } from "react";
import { personaSerif } from "@/lib/persona-fonts";

/** Reine Datumsberechnung fuer die Spekulationssteuer-Zehnjahresfrist. Keine Steuerberatung. */
export function FristenRechner() {
  const [kaufdatum, setKaufdatum] = useState("");
  const [verkaufsdatum, setVerkaufsdatum] = useState("");

  let ergebnis: string | null = null;

  if (kaufdatum) {
    const kauf = new Date(kaufdatum);
    const fristEnde = new Date(kauf);
    fristEnde.setFullYear(fristEnde.getFullYear() + 10);

    const vergleichsdatum = verkaufsdatum ? new Date(verkaufsdatum) : new Date();
    const abgelaufen = vergleichsdatum >= fristEnde;
    const verbleibendeTage = Math.ceil(
      (fristEnde.getTime() - vergleichsdatum.getTime()) / (1000 * 60 * 60 * 24),
    );

    ergebnis = abgelaufen
      ? `Die Zehn-Jahres-Frist ist am ${fristEnde.toLocaleDateString("de-DE")} abgelaufen. Ein Verkauf ${verkaufsdatum ? "zum angegebenen Datum" : "heute"} wäre nach dieser Frist steuerfrei möglich (unabhängig von der Eigennutzungsausnahme).`
      : `Die Zehn-Jahres-Frist läuft erst am ${fristEnde.toLocaleDateString("de-DE")} ab – das sind noch ${verbleibendeTage} Tage. Ein Verkauf vorher kann Spekulationssteuer auslösen, sofern keine Eigennutzungsausnahme greift.`;
  }

  return (
    <div className="not-prose my-8 rounded-xl border border-[#23282A]/10 bg-[#EFF2ED] p-6 sm:p-8">
      <h3 className={`${personaSerif.className} mb-2 text-xl font-bold text-[#23282A]`}>
        Fristen-Rechner: Zehn-Jahres-Frist
      </h3>
      <p className="mb-6 text-sm text-[#5C6660]">
        Reine Datumsberechnung, keine Steuerberatung. Ersetzt keine individuelle
        Prüfung durch einen Steuerberater.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#23282A]" htmlFor="kaufdatum">
            Kaufdatum des Erblassers
          </label>
          <input
            id="kaufdatum"
            type="date"
            value={kaufdatum}
            onChange={(e) => setKaufdatum(e.target.value)}
            className="w-full rounded-lg border border-[#23282A]/25 px-3 py-2 text-[#23282A] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#23282A]" htmlFor="verkaufsdatum">
            Geplantes Verkaufsdatum (optional, sonst heute)
          </label>
          <input
            id="verkaufsdatum"
            type="date"
            value={verkaufsdatum}
            onChange={(e) => setVerkaufsdatum(e.target.value)}
            className="w-full rounded-lg border border-[#23282A]/25 px-3 py-2 text-[#23282A] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/20"
          />
        </div>
      </div>
      {ergebnis && (
        <p className="mt-6 rounded-lg bg-white p-4 text-[#23282A]">{ergebnis}</p>
      )}
    </div>
  );
}
