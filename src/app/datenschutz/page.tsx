import type { Metadata } from "next";
import { RechtstextHinweis } from "@/components/RechtstextHinweis";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
      <h1 className="text-3xl font-semibold text-slate-900">
        Datenschutzerklärung
      </h1>
      <RechtstextHinweis />

      <div className="space-y-8 text-lg text-slate-800">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            1. Verantwortlicher
          </h2>
          <p className="mt-2">
            FSCF Holding GmbH
            <br />
            [PLATZHALTER: Anschrift]
            <br />
            E-Mail: [PLATZHALTER]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            2. Welche Daten wir verarbeiten und warum
          </h2>
          <p className="mt-2">
            Wenn Sie unser Kontaktformular ausfüllen, verarbeiten wir die von
            Ihnen angegebenen Daten (Name, Telefon, E-Mail, PLZ/Ort,
            Angaben zur Immobilie, Verkaufsgrund, Zeitrahmen), um mit Ihnen
            Kontakt aufzunehmen und Ihnen eine kostenlose, unverbindliche
            Einschätzung Ihrer Immobilie zu geben.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines
            Vertrags) sowie, soweit keine Vertragsanbahnung vorliegt, Art. 6
            Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung
            Ihrer Anfrage).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            3. Weitergabe an Maklerpartner
          </h2>
          <p className="mt-2">
            Passt Ihre Immobilie nicht in unser eigenes Ankaufsraster, kann
            Ihre Anfrage mit Ihren Kontakt- und Objektdaten an einen unserer
            Maklerpartner weitergegeben werden, damit dieser sich bei Ihnen
            meldet. Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b bzw.
            f DSGVO. [PLATZHALTER: Prüfen, ob mit den jeweiligen
            Maklerpartnern zusätzlich eine Vereinbarung zur gemeinsamen
            Verantwortlichkeit (Art. 26 DSGVO) oder ein Auftragsverarbeitungsvertrag
            erforderlich ist.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            4. Speicherdauer
          </h2>
          <p className="mt-2">
            Wir speichern Ihre Daten, solange dies zur Bearbeitung Ihrer
            Anfrage erforderlich ist. Führt eine Anfrage nicht zu einem
            Geschäft, löschen wir die Daten in der Regel spätestens
            [PLATZHALTER: {process.env.LEAD_RETENTION_MONTHS ?? "24"}] Monate
            nach Abschluss der Bearbeitung, sofern keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            5. Hosting und eingesetzte Dienstleister
          </h2>
          <p className="mt-2">
            Diese Website wird bei Vercel Inc. gehostet, unsere Datenbank bei
            Neon Inc. betrieben – beide mit Serverstandort in der EU
            (Frankfurt am Main). Für interne Benachrichtigungen bei neuen
            Anfragen nutzen wir Slack. Mit allen Dienstleistern, die
            personenbezogene Daten in unserem Auftrag verarbeiten, besteht
            bzw. wird ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO
            abgeschlossen. [PLATZHALTER: AVV mit Vercel, Neon und ggf. Slack
            abschließen und hier referenzieren.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            6. Cookies und Tracking
          </h2>
          <p className="mt-2">
            Beim Besuch dieser Website werden zunächst nur technisch
            notwendige Cookies gesetzt. Optionale Cookies für Werbe- und
            Analysezwecke (Google Ads, Google Analytics 4, Meta Pixel)
            werden erst aktiviert, wenn Sie im Cookie-Banner ausdrücklich
            zustimmen. Ihre Einwilligung können Sie jederzeit mit Wirkung
            für die Zukunft widerrufen.
          </p>
          <ul className="mt-2 list-disc pl-6">
            <li>
              <strong>Google Ads / Google Analytics 4</strong>: Anbieter
              Google Ireland Limited. Wir nutzen den Google Consent Mode,
              sodass diese Dienste erst nach Ihrer Zustimmung Daten
              erheben.
            </li>
            <li>
              <strong>Meta Pixel</strong>: Anbieter Meta Platforms Ireland
              Limited. Wird nur nach Ihrer Zustimmung geladen.
            </li>
          </ul>
          <p className="mt-2">
            [PLATZHALTER: Sobald die entsprechenden Konten angelegt sind,
            hier die genauen Datenkategorien, Übermittlungen in Drittländer
            (z. B. USA, ggf. Standardvertragsklauseln) und Widerspruchsmöglichkeiten
            ergänzen.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            7. Ihre Rechte
          </h2>
          <p className="mt-2">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und
            Widerspruch gegen die Verarbeitung Ihrer Daten. Wenden Sie sich
            dazu an die oben genannte Kontaktadresse. Außerdem haben Sie das
            Recht, sich bei einer Datenschutzaufsichtsbehörde zu
            beschweren.
          </p>
        </section>
      </div>
    </div>
  );
}
