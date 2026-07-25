import type { Metadata } from "next";
import { RechtstextHinweis } from "@/components/RechtstextHinweis";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
      <h1 className="text-3xl font-semibold text-slate-900">Impressum</h1>
      <RechtstextHinweis />

      <div className="space-y-6 text-lg text-slate-800">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Angaben gemäß § 5 DDG
          </h2>
          <p className="mt-2">
            FSCF Holding GmbH
            <br />
            [PLATZHALTER: Straße und Hausnummer]
            <br />
            [PLATZHALTER: PLZ und Ort]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Vertreten durch</h2>
          <p className="mt-2">[PLATZHALTER: Name der/des Geschäftsführer(s)]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Kontakt</h2>
          <p className="mt-2">
            Telefon: [PLATZHALTER]
            <br />
            E-Mail: [PLATZHALTER, z. B. kontakt@domain.de]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Registereintrag</h2>
          <p className="mt-2">
            Eintragung im Handelsregister
            <br />
            Registergericht: [PLATZHALTER]
            <br />
            Registernummer: [PLATZHALTER]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Umsatzsteuer-ID</h2>
          <p className="mt-2">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            <br />
            [PLATZHALTER, falls vorhanden]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Erlaubnis nach § 34c GewO
          </h2>
          <p className="mt-2">
            [PLATZHALTER: Angabe zur Maklererlaubnis nach § 34c
            Gewerbeordnung inkl. zuständiger Erlaubnisbehörde, sobald die
            Erlaubnis erteilt ist. Bis dahin: Hinweis, dass keine
            gewerbsmäßige Vermittlung gegen Provision ohne diese Erlaubnis
            erfolgen darf – rechtlich vor Go-Live klären.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-2">
            [PLATZHALTER: Name, Anschrift wie oben]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            EU-Streitschlichtung
          </h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="underline"
              target="_blank"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Wir sind nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen. [PLATZHALTER: mit Anwalt/Anwältin abstimmen]
          </p>
        </section>
      </div>
    </div>
  );
}
