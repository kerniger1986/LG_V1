import { personaSerif } from "@/lib/persona-fonts";

interface FaqItem {
  q: string;
  a: string;
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
        <div className={large ? "mt-8 space-y-8" : "mt-6 space-y-6"}>
          {items.map((item, i) => (
            <div key={i}>
              <h3
                className={`font-semibold text-[#23282A] ${large ? "text-xl" : "text-lg"}`}
              >
                {item.q}
              </h3>
              <p
                className={`mt-1 text-[#5C6660] ${large ? "text-xl" : "text-lg"}`}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
