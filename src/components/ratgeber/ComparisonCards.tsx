import { personaSerif } from "@/lib/persona-fonts";

interface ComparisonOption {
  title: string;
  values: string[];
}

interface ComparisonCardsProps {
  criteria: string[];
  options: ComparisonOption[];
}

// Tailwind kann Klassennamen nur erkennen, wenn sie als vollstaendige,
// statische Strings im Quelltext stehen - daher eine feste Lookup-Tabelle
// statt einer dynamisch zusammengesetzten Klasse.
const spaltenKlasse: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

/** Vergleichskarten fuer 2-3 Optionen anhand gleicher Kriterien. */
export function ComparisonCards({ criteria, options }: ComparisonCardsProps) {
  return (
    <div
      className={`not-prose my-8 grid gap-4 ${spaltenKlasse[Math.min(options.length, 3)] ?? "sm:grid-cols-2"}`}
    >
      {options.map((option, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#23282A]/10 bg-white p-6"
        >
          <h3
            className={`${personaSerif.className} mb-4 text-lg font-bold text-[#23282A]`}
          >
            {option.title}
          </h3>
          <dl className="space-y-3">
            {criteria.map((kriterium, j) => (
              <div key={j} className="border-t border-[#23282A]/10 pt-3 first:border-t-0 first:pt-0">
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#5C6660]">
                  {kriterium}
                </dt>
                <dd className="mt-1 text-[#23282A]">{option.values[j]}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
