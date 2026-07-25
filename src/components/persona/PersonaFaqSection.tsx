import type { ReactNode } from "react";
import { personaSerif } from "@/lib/persona-fonts";

interface FaqItem {
  q: string;
  a: ReactNode;
}

interface PersonaFaqSectionProps {
  items: FaqItem[];
  large?: boolean;
}

export function PersonaFaqSection({ items, large }: PersonaFaqSectionProps) {
  return (
    <section className="border-y border-[#23282A]/10 bg-white">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h2
          className={`${personaSerif.className} font-bold text-[#23282A] ${large ? "text-3xl" : "text-2xl"}`}
        >
          Häufige Fragen
        </h2>
        <div className={large ? "mt-8 space-y-3" : "mt-6 space-y-3"}>
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border border-[#23282A]/10 px-5 py-4 open:bg-[#EFF2ED]/60"
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#23282A] marker:content-none [&::-webkit-details-marker]:hidden ${large ? "text-xl" : "text-lg"}`}
              >
                {item.q}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 text-[#2F5D50] transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className={`mt-3 text-[#5C6660] ${large ? "text-xl" : "text-lg"}`}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
