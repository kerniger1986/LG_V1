"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, setStoredConsent } from "@/lib/consent";

export function ConsentBanner() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    // localStorage ist nur im Browser verfuegbar, daher erst nach dem Mount lesbar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSichtbar(getStoredConsent() === null);
  }, []);

  if (!sichtbar) return null;

  function entscheiden(status: "granted" | "denied") {
    setStoredConsent(status);
    setSichtbar(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-300 bg-white px-4 py-5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base text-slate-700">
          Wir nutzen Cookies, um unsere Seite zu verbessern und den Erfolg
          unserer Werbung zu messen. Optionale Cookies werden erst nach Ihrer
          Zustimmung aktiviert. Mehr dazu in unserer{" "}
          <a href="/datenschutz" className="underline">
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => entscheiden("denied")}
            className="rounded-lg border border-slate-400 px-5 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => entscheiden("granted")}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
