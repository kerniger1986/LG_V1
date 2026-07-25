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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#23282A]/15 bg-[#EFF2ED] px-4 py-5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base text-[#23282A]">
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
            className="rounded-lg border border-[#23282A]/30 px-5 py-2.5 text-base font-medium text-[#23282A] hover:bg-[#23282A]/5"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => entscheiden("granted")}
            className="rounded-lg bg-[#C08A2E] px-5 py-2.5 text-base font-semibold text-[#23282A] hover:brightness-95"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
