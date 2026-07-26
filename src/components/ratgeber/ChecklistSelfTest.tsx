"use client";

import { useState } from "react";
import { personaSerif } from "@/lib/persona-fonts";

interface ChecklistSelfTestProps {
  title: string;
  items: string[];
}

/** Ankreuzbare Reflexionshilfe ohne Score/Auswertung - keine Bewertung, kein Druck. */
export function ChecklistSelfTest({ title, items }: ChecklistSelfTestProps) {
  const [angehakt, setAngehakt] = useState<boolean[]>(() => items.map(() => false));

  function umschalten(index: number) {
    setAngehakt((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <div className="not-prose my-8 rounded-xl border border-[#23282A]/10 bg-[#EFF2ED] p-6 sm:p-8">
      <h3 className={`${personaSerif.className} mb-4 text-xl font-bold text-[#23282A]`}>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={angehakt[i]}
                onChange={() => umschalten(i)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#2F5D50]"
              />
              <span className="text-[#23282A]">{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-[#5C6660]">
        Nur eine Reflexionshilfe für Sie selbst – wird nirgends gespeichert oder ausgewertet.
      </p>
    </div>
  );
}
