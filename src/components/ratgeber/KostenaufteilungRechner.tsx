"use client";

import { useState } from "react";
import { personaSerif } from "@/lib/persona-fonts";

interface Erbe {
  name: string;
  anteilProzent: string;
}

/** Reine Rechenaufgabe: Gesamtkosten nach Erbquoten aufteilen. Keine Rechtsberatung. */
export function KostenaufteilungRechner() {
  const [gesamtkosten, setGesamtkosten] = useState("");
  const [erben, setErben] = useState<Erbe[]>([
    { name: "Erbe 1", anteilProzent: "50" },
    { name: "Erbe 2", anteilProzent: "50" },
  ]);

  function erbeAendern(index: number, feld: keyof Erbe, wert: string) {
    setErben((prev) =>
      prev.map((erbe, i) => (i === index ? { ...erbe, [feld]: wert } : erbe)),
    );
  }

  function erbeHinzufuegen() {
    setErben((prev) => [
      ...prev,
      { name: `Erbe ${prev.length + 1}`, anteilProzent: "0" },
    ]);
  }

  function erbeEntfernen(index: number) {
    setErben((prev) => prev.filter((_, i) => i !== index));
  }

  const kosten = parseFloat(gesamtkosten.replace(",", ".")) || 0;
  const summeProzent = erben.reduce(
    (summe, e) => summe + (parseFloat(e.anteilProzent.replace(",", ".")) || 0),
    0,
  );

  return (
    <div className="not-prose my-8 rounded-xl border border-[#23282A]/10 bg-[#EFF2ED] p-6 sm:p-8">
      <h3 className={`${personaSerif.className} mb-2 text-xl font-bold text-[#23282A]`}>
        Kostenaufteilungs-Rechner
      </h3>
      <p className="mb-6 text-sm text-[#5C6660]">
        Reine Rechenaufgabe nach den eingegebenen Anteilen, keine Rechtsberatung.
      </p>

      <label className="mb-1 block text-sm font-medium text-[#23282A]" htmlFor="gesamtkosten">
        Gesamtkosten (€)
      </label>
      <input
        id="gesamtkosten"
        type="text"
        inputMode="decimal"
        value={gesamtkosten}
        onChange={(e) => setGesamtkosten(e.target.value)}
        placeholder="z. B. 4200"
        className="mb-6 w-full max-w-xs rounded-lg border border-[#23282A]/25 px-3 py-2 text-[#23282A] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/20"
      />

      <div className="space-y-3">
        {erben.map((erbe, i) => {
          const anteil = parseFloat(erbe.anteilProzent.replace(",", ".")) || 0;
          const betrag = kosten * (anteil / 100);
          return (
            <div key={i} className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={erbe.name}
                onChange={(e) => erbeAendern(i, "name", e.target.value)}
                className="w-32 rounded-lg border border-[#23282A]/25 px-3 py-2 text-[#23282A] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/20"
              />
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  inputMode="decimal"
                  value={erbe.anteilProzent}
                  onChange={(e) => erbeAendern(i, "anteilProzent", e.target.value)}
                  className="w-20 rounded-lg border border-[#23282A]/25 px-3 py-2 text-[#23282A] outline-none focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/20"
                />
                <span className="text-[#5C6660]">%</span>
              </div>
              <span className="font-semibold text-[#23282A]">
                ={" "}
                {betrag.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
              {erben.length > 2 && (
                <button
                  type="button"
                  onClick={() => erbeEntfernen(i)}
                  className="text-sm text-[#5C6660] underline"
                >
                  Entfernen
                </button>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={erbeHinzufuegen}
        className="mt-4 text-sm font-semibold text-[#2F5D50] underline"
      >
        + Weiteren Erben hinzufügen
      </button>

      {Math.round(summeProzent) !== 100 && (
        <p className="mt-4 rounded-lg bg-[#C08A2E]/10 px-4 py-2 text-sm text-[#23282A]">
          Die Anteile ergeben zusammen {summeProzent.toLocaleString("de-DE")} %
          statt 100 % – bitte prüfen.
        </p>
      )}
    </div>
  );
}
