import Link from "next/link";
import { locations } from "@/lib/locations";
import { personaSerif } from "@/lib/persona-fonts";
import { PersonaHero } from "@/components/persona/PersonaHero";
import { PersonaAblaufSection } from "@/components/persona/PersonaAblaufSection";
import { PersonaFaqSection } from "@/components/persona/PersonaFaqSection";
import { PersonaFormSection } from "@/components/persona/PersonaFormSection";
import { Reveal } from "@/components/persona/Reveal";

interface LandingContentProps {
  ortName: string;
  ortSlug: string;
  intro?: string;
  zeigeOrtsliste?: boolean;
}

const faqItems = [
  {
    q: "Bin ich nach dem Formular zu etwas verpflichtet?",
    a: "Nein. Die Einschätzung ist unverbindlich. Sie entscheiden danach in Ruhe, ob Sie weitere Schritte gehen möchten.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: (
      <>
        Ihre Angaben werden ausschließlich zur Kontaktaufnahme und
        Einschätzung genutzt. Details finden Sie in unserer{" "}
        <Link href="/datenschutz" className="underline">
          Datenschutzerklärung
        </Link>
        .
      </>
    ),
  },
  {
    q: "Wie schnell melden Sie sich?",
    a: "In der Regel noch am selben oder nächsten Werktag.",
  },
];

export function LandingContent({
  ortName,
  ortSlug,
  intro,
  zeigeOrtsliste = false,
}: LandingContentProps) {
  return (
    <div>
      <PersonaHero
        eyebrow="Ihr lokaler Marktkenner"
        headline={`Immobilie in ${ortName} verkaufen?`}
        subheadline={`Kostenlose, unverbindliche Einschätzung durch einen lokalen Marktkenner${intro ? ` – ${intro}` : "."} Ganz in Ruhe, ohne Verpflichtung und ohne Drucksprache.`}
        ctaLabel="Jetzt kostenlos einschätzen lassen"
        ctaHref="#einschaetzung"
      />

      <Reveal>
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h2
                className={`${personaSerif.className} text-xl font-bold text-[#23282A]`}
              >
                Lokale Marktkenntnis
              </h2>
              <p className="mt-2 text-lg text-[#5C6660]">
                Wir kennen die Lagen, Preise und Besonderheiten in {ortName}{" "}
                und der Region – keine anonyme Bewertung von der Stange.
              </p>
            </div>
            <div>
              <h2
                className={`${personaSerif.className} text-xl font-bold text-[#23282A]`}
              >
                Unverbindlich & kostenlos
              </h2>
              <p className="mt-2 text-lg text-[#5C6660]">
                Die Einschätzung ist für Sie komplett kostenlos. Sie
                entscheiden danach in Ruhe, ob und wie es weitergeht.
              </p>
            </div>
            <div>
              <h2
                className={`${personaSerif.className} text-xl font-bold text-[#23282A]`}
              >
                Persönliches Gespräch
              </h2>
              <p className="mt-2 text-lg text-[#5C6660]">
                Statt Formular-Automatik erhalten Sie ein persönliches
                Gespräch mit einem Ansprechpartner vor Ort.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <PersonaAblaufSection />
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
          <h2
            className={`${personaSerif.className} text-2xl font-bold text-[#23282A]`}
          >
            Für wen wir da sind
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-[#5C6660]">
            Besonders häufig sprechen wir mit Eigentümerinnen und
            Eigentümern, die eine Immobilie geerbt haben oder im Ruhestand
            über einen Verkauf nachdenken. Auch bei einem Umzug oder einer
            Scheidung sind wir gerne ein ruhiger, verlässlicher
            Ansprechpartner – ohne Zeitdruck und ohne aufdringliche Anrufe.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-8">
            <Link
              href="/immobilie-verkaufen/erbschaft"
              className="text-lg text-[#2F5D50] underline"
            >
              Haben Sie geerbt? Hier speziell für Erben →
            </Link>
            <Link
              href="/immobilie-verkaufen/ruhestand"
              className="text-lg text-[#2F5D50] underline"
            >
              Planen Sie Ihren Ruhestand? Hier speziell für Sie →
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <PersonaFormSection
          ortSeite={ortSlug}
          heading="Kostenlose Einschätzung anfordern"
          intro="Füllen Sie das Formular aus – wir melden uns persönlich bei Ihnen."
        />
      </Reveal>

      <Reveal>
        <PersonaFaqSection items={faqItems} />
      </Reveal>

      {zeigeOrtsliste && (
        <Reveal>
          <section className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
            <h2
              className={`${personaSerif.className} text-2xl font-bold text-[#23282A]`}
            >
              Wir sind in Ihrer Region aktiv
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/immobilie-verkaufen/${location.slug}`}
                    className="text-lg text-[#2F5D50] underline"
                  >
                    Immobilie verkaufen in {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}
    </div>
  );
}
