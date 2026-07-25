"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
}

/**
 * Sanftes Einblenden von Abschnitten beim Scrollen. Respektiert
 * prefers-reduced-motion (dann bleibt der Inhalt einfach sofort sichtbar)
 * und ist ohne JavaScript ebenfalls sofort sichtbar (progressive
 * enhancement, kein verstecktes Layout ohne Skript).
 */
export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [sichtbar, setSichtbar] = useState(true);

  useEffect(() => {
    const reduziereBewegung = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduziereBewegung) return;

    const el = ref.current;
    if (!el) return;

    // prefers-reduced-motion ist nur im Browser abfragbar, daher kann erst
    // hier (nach dem Mount) entschieden werden, ob ueberhaupt animiert wird.
    setSichtbar(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSichtbar(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    // Sicherheitsnetz: Inhalte duerfen nie dauerhaft unsichtbar bleiben,
    // falls der Observer aus irgendeinem Grund nicht ausloest.
    const fallback = setTimeout(() => setSichtbar(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        sichtbar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}
