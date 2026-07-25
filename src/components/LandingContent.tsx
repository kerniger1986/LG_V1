import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { locations } from "@/lib/locations";

interface LandingContentProps {
  ortName: string;
  ortSlug: string;
  intro?: string;
  zeigeOrtsliste?: boolean;
}

export function LandingContent({
  ortName,
  ortSlug,
  intro,
  zeigeOrtsliste = false,
}: LandingContentProps) {
  return (
    <div>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-20">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Immobilie in {ortName} verkaufen?
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-slate-700">
            Kostenlose, unverbindliche Einschätzung durch einen lokalen
            Marktkenner{intro ? ` – ${intro}` : ""} Ganz in Ruhe, ohne
            Verpflichtung und ohne Drucksprache.
          </p>
          <a
            href="#einschaetzung"
            className="mt-8 inline-block rounded-lg bg-blue-700 px-8 py-4 text-xl font-semibold text-white hover:bg-blue-800"
          >
            Jetzt kostenlos einschätzen lassen
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Lokale Marktkenntnis
            </h2>
            <p className="mt-2 text-lg text-slate-700">
              Wir kennen die Lagen, Preise und Besonderheiten in {ortName}{" "}
              und der Region – keine anonyme Bewertung von der Stange.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Unverbindlich & kostenlos
            </h2>
            <p className="mt-2 text-lg text-slate-700">
              Die Einschätzung ist für Sie komplett kostenlos. Sie entscheiden
              danach in Ruhe, ob und wie es weitergeht.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Persönliches Gespräch
            </h2>
            <p className="mt-2 text-lg text-slate-700">
              Statt Formular-Automatik erhalten Sie ein persönliches Gespräch
              mit einem Ansprechpartner vor Ort.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            So läuft es ab
          </h2>
          <ol className="mt-6 grid gap-8 sm:grid-cols-3">
            <li>
              <div className="text-3xl font-bold text-blue-700">1</div>
              <p className="mt-2 text-lg text-slate-700">
                Sie füllen das kurze Formular mit ein paar Eckdaten zu Ihrer
                Immobilie aus.
              </p>
            </li>
            <li>
              <div className="text-3xl font-bold text-blue-700">2</div>
              <p className="mt-2 text-lg text-slate-700">
                Wir melden uns telefonisch bei Ihnen für ein kurzes,
                unverbindliches Gespräch.
              </p>
            </li>
            <li>
              <div className="text-3xl font-bold text-blue-700">3</div>
              <p className="mt-2 text-lg text-slate-700">
                Sie erhalten eine ehrliche Einschätzung und mögliche nächste
                Schritte – ganz ohne Verpflichtung.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">
          Für wen wir da sind
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Besonders häufig sprechen wir mit Eigentümerinnen und Eigentümern,
          die eine Immobilie geerbt haben oder im Ruhestand über einen Verkauf
          nachdenken. Auch bei einem Umzug oder einer Scheidung sind wir
          gerne ein ruhiger, verlässlicher Ansprechpartner – ohne Zeitdruck
          und ohne aufdringliche Anrufe.
        </p>
      </section>

      <section
        id="einschaetzung"
        className="bg-white border-t border-slate-200"
      >
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Kostenlose Einschätzung anfordern
          </h2>
          <p className="mt-3 text-lg text-slate-700">
            Füllen Sie das Formular aus – wir melden uns persönlich bei
            Ihnen.
          </p>
          <div className="mt-8">
            <LeadForm ortSeite={ortSlug} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">Häufige Fragen</h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Bin ich nach dem Formular zu etwas verpflichtet?
              </h3>
              <p className="mt-1 text-lg text-slate-700">
                Nein. Die Einschätzung ist unverbindlich. Sie entscheiden
                danach in Ruhe, ob Sie weitere Schritte gehen möchten.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Was passiert mit meinen Daten?
              </h3>
              <p className="mt-1 text-lg text-slate-700">
                Ihre Angaben werden ausschließlich zur Kontaktaufnahme und
                Einschätzung genutzt. Details finden Sie in unserer{" "}
                <Link href="/datenschutz" className="underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Wie schnell melden Sie sich?
              </h3>
              <p className="mt-1 text-lg text-slate-700">
                In der Regel innerhalb von 1–2 Werktagen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {zeigeOrtsliste && (
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Wir sind in Ihrer Region aktiv
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/immobilie-verkaufen/${location.slug}`}
                  className="text-lg text-blue-700 underline"
                >
                  Immobilie verkaufen in {location.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
