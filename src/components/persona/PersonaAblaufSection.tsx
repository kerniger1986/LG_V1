import { personaSerif } from "@/lib/persona-fonts";

// Identisch zu den Schritten auf den Orts-Landingpages (LandingContent.tsx) -
// bewusst nicht veraendert, siehe Aufgabenstellung.
const ablaufSchritte = [
  "Sie füllen das kurze Formular mit ein paar Eckdaten zu Ihrer Immobilie aus.",
  "Wir melden uns telefonisch bei Ihnen für ein kurzes, unverbindliches Gespräch.",
  "Sie erhalten eine ehrliche Einschätzung und mögliche nächste Schritte – ganz ohne Verpflichtung.",
];

export function PersonaAblaufSection({ large }: { large?: boolean }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <h2
        className={`${personaSerif.className} font-bold text-[#23282A] ${large ? "text-3xl" : "text-2xl"}`}
      >
        So läuft es ab
      </h2>
      <ol className={large ? "mt-10 space-y-10" : "mt-8 space-y-8"}>
        {ablaufSchritte.map((schritt, i) => (
          <li key={i} className="flex gap-5">
            <span
              className={`${personaSerif.className} shrink-0 font-bold text-[#2F5D50] ${large ? "text-3xl" : "text-2xl"}`}
            >
              {i + 1}
            </span>
            <p className={`pt-1 text-[#23282A] ${large ? "text-xl" : "text-lg"}`}>
              {schritt}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
