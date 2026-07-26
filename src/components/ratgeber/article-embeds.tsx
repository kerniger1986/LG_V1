import type { ReactNode } from "react";
import { ProcessSteps } from "./ProcessSteps";
import { ComparisonCards } from "./ComparisonCards";
import { FristenRechner } from "./FristenRechner";
import { KostenaufteilungRechner } from "./KostenaufteilungRechner";
import { ChecklistSelfTest } from "./ChecklistSelfTest";
import { ArticlePhoto } from "./ArticlePhoto";

type EmbedMap = Record<string, ReactNode>;

const embeds: Record<string, EmbedMap> = {
  "jemand-ist-gestorben-was-tue-ich-nun": {
    "checkliste-sofort": (
      <ChecklistSelfTest
        title="Checkliste: die ersten Wochen"
        items={[
          "Arzt/Notdienst verständigt, Totenschein liegt vor",
          "Bestattungsinstitut beauftragt",
          "Mehrere beglaubigte Sterbeurkunden bestellt",
          "Nach einem Testament gesucht (und ggf. beim Nachlassgericht abgegeben)",
          "Ausschlagungsfrist von 6 Wochen im Kalender notiert",
          "Prüfen, ob eine Meldung ans Finanzamt nötig ist (3 Monate, bei Immobilien im Nachlass)",
          "Wohngebäude-/Hausratversicherung über den Todesfall informiert",
          "Grundbuchberichtigung angestoßen (innerhalb von 2 Jahren gebührenfrei)",
        ]}
      />
    ),
  },

  "erbengemeinschaft-miterbe-will-nicht-verkaufen": {
    "ablauf-optionen": (
      <ProcessSteps
        title="Ihre Optionen – in dieser Reihenfolge sinnvoll"
        steps={[
          "Gespräch suchen: die meisten Erbengemeinschaften einigen sich, wenn die Interessen offen auf dem Tisch liegen.",
          "Eigenen Anteil verkaufen (§ 2033 BGB): möglich, auch ohne Zustimmung der übrigen Erben – die haben allerdings ein Vorkaufsrecht.",
          "Teilungsversteigerung (letzter Ausweg): langwierig und meist mit einem Erlös deutlich unter Marktwert – keine gleichwertige Alternative zu den ersten beiden Wegen.",
        ]}
      />
    ),
  },

  "wohnrecht-niessbrauch-haus-verkaufen": {
    "vergleich-wohnrecht-niessbrauch": (
      <ComparisonCards
        criteria={["Nutzung", "Vermietung erlaubt?", "Grundbucheintrag", "Vererbbar?", "Kosten/Instandhaltung"]}
        options={[
          {
            title: "Wohnrecht",
            values: [
              "Nur persönliche Bewohnung",
              "Nein, nicht ohne Weiteres",
              "Ja, als beschränkte persönliche Dienstbarkeit",
              "Nein, erlischt mit dem Tod des Berechtigten",
              "Meist beim Eigentümer",
            ],
          },
          {
            title: "Nießbrauch",
            values: [
              "Bewohnen oder vermieten",
              "Ja, Mieteinnahmen stehen dem Nießbraucher zu",
              "Ja, als eigenes dingliches Recht",
              "Nein, aber übertragbar zu Lebzeiten möglich",
              "Meist beim Nießbraucher",
            ],
          },
        ]}
      />
    ),
  },

  "teilungsversteigerung-erklaert": {
    "ablauf-teilungsversteigerung": (
      <ProcessSteps
        title="Ablauf einer Teilungsversteigerung"
        steps={[
          "Antrag eines Miterben beim zuständigen Amtsgericht",
          "Gerichtliches Wertgutachten zur Feststellung des Verkehrswerts",
          "Versteigerungstermin wird öffentlich bekannt gemacht und durchgeführt",
          "Zuschlag an den Meistbietenden",
          "Verteilung des Erlöses unter den Miterben entsprechend ihrer Erbquote",
        ]}
      />
    ),
  },

  "immobilienrente-teilverkauf-ruhestand": {
    "vergleich-verkaufsmodelle": (
      <ComparisonCards
        criteria={["Wer bleibt Eigentümer?", "Einmalzahlung oder Rente?", "Laufende Kosten für wen?", "Risiken"]}
        options={[
          {
            title: "Klassischer Verkauf",
            values: [
              "Käufer, vollständig",
              "Einmalzahlung",
              "Käufer",
              "Kein Wohnrecht mehr, außer separat vereinbart",
            ],
          },
          {
            title: "Leibrente / Immobilienrente",
            values: [
              "Käufer, gegen Wohnrecht",
              "Meist monatliche Rente, oft plus Einmalbetrag",
              "Je nach Vertrag unterschiedlich geregelt",
              "Rentenhöhe hängt auch von der Lebenserwartung ab",
            ],
          },
          {
            title: "Teilverkauf",
            values: [
              "Verkäufer und Käufer gemeinsam",
              "Einmalzahlung für den verkauften Anteil",
              "Verkäufer zahlt meist ein monatliches Nutzungsentgelt",
              "Nutzungsentgelt läuft dauerhaft, Endabrechnung oft komplex",
            ],
          },
        ]}
      />
    ),
  },

  "erbanteil-verkaufen-miterbe-blockiert": {
    "zeitleiste-vorkaufsrecht": (
      <ProcessSteps
        title="Die Vorkaufsrecht-Frist der Miterben"
        steps={[
          "Tag 0: Der Verkauf Ihres Erbanteils wird notariell beurkundet.",
          "Tag 60: Das Vorkaufsrecht der übrigen Miterben erlischt, wenn es nicht ausgeübt wurde.",
        ]}
      />
    ),
  },

  "haus-zu-gross-anzeichen-verkauf": {
    "foto-region-1": (
      <ArticlePhoto
        file="rhein-sieg-wohnstrasse.jpg"
        alt="Ruhige Wohnstraße im Rhein-Sieg-Kreis"
      />
    ),
    "selbsttest-anzeichen": (
      <ChecklistSelfTest
        title="Trifft das auf Sie zu?"
        items={[
          "Mehrere Zimmer werden kaum noch genutzt",
          "Garten- und Hausarbeit wird körperlich beschwerlich",
          "Treppen im Haus werden zunehmend zur Herausforderung",
          "Die Nebenkosten für das ganze Haus fühlen sich unverhältnismäßig an",
          "Sie denken öfter daran, wie es wäre, kleiner und ebenerdig zu wohnen",
          "Instandhaltung und Reparaturen stauen sich auf",
        ]}
      />
    ),
  },

  "spekulationssteuer-geerbte-immobilie": {
    fristenrechner: <FristenRechner />,
  },

  "pflegeheim-finanzieren-elternhaus-verkaufen": {
    "stufen-wer-zahlt": (
      <ProcessSteps
        title="Wer zahlt zuerst?"
        steps={[
          "Die Pflegeversicherung übernimmt einen Grundbetrag der Pflegeheimkosten.",
          "Danach werden eigenes Einkommen und Vermögen der pflegebedürftigen Person herangezogen.",
          "Reicht das nicht, springt die Sozialhilfe (Hilfe zur Pflege) ein.",
          "Erst danach werden Kinder herangezogen – und das auch nur ab einem Bruttojahreseinkommen von 100.000 € pro Kind.",
        ]}
      />
    ),
  },

  "kosten-nach-dem-erbfall": {
    kostenrechner: <KostenaufteilungRechner />,
  },

  "immobilie-sozialamt-pflegebeduerftigkeit": {
    "ja-nein-sozialamt": (
      <ComparisonCards
        criteria={["Rechtsfolge"]}
        options={[
          {
            title: "Ja, bewohnt",
            values: [
              "Das selbstgenutzte Eigenheim ist in der Regel als Schonvermögen geschützt.",
            ],
          },
          {
            title: "Nein, nicht mehr bewohnt",
            values: [
              "Die Immobilie kann als verwertbares Vermögen herangezogen werden.",
            ],
          },
        ]}
      />
    ),
  },

  "erbengemeinschaft-einigen-ohne-gericht": {
    "ablauf-einigung": (
      <ProcessSteps
        title="Der Weg zur Einigung"
        steps={[
          "Interessen aller Miterben offenlegen – wer will behalten, vermieten oder verkaufen?",
          "Gemeinsame, neutrale Wertermittlung als sachliche Grundlage",
          "Optionen vergleichen: Verkauf an Dritte, Übernahme durch einen Miterben, Vermietung",
          "Auseinandersetzungsvertrag notariell beurkunden",
        ]}
      />
    ),
  },

  "hausverkauf-im-alter-ohne-zeitdruck": {
    "foto-region-2": (
      <ArticlePhoto
        file="rhein-sonnenuntergang.jpg"
        alt="Rheinufer bei Sonnenuntergang im Rhein-Sieg-Kreis"
      />
    ),
  },
};

export function getArticleEmbed(slug: string, token: string): ReactNode | null {
  return embeds[slug]?.[token] ?? null;
}
