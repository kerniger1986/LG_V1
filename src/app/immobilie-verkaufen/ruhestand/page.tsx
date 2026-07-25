import type { Metadata } from "next";
import { PersonaTheme } from "@/components/persona/PersonaTheme";
import { PersonaHero } from "@/components/persona/PersonaHero";
import { PersonaProblemSection } from "@/components/persona/PersonaProblemSection";
import { PersonaFaqSection } from "@/components/persona/PersonaFaqSection";
import { PersonaFormSection } from "@/components/persona/PersonaFormSection";
import { PersonaAblaufSection } from "@/components/persona/PersonaAblaufSection";

export const metadata: Metadata = {
  title: "Zuhause im Ruhestand verkaufen – Bad Honnef & Umgebung, kostenlose Einschätzung",
  description:
    "Kostenlose, unverbindliche Einschätzung für Eigentümerinnen und Eigentümer im Ruhestand – in Ruhe, ohne Eile, auch am Telefon.",
};

// TODO: Platzhalter - vor Go-Live durch die echte Telefonnummer ersetzen.
const telefon = { label: "[Telefonnummer einfügen]", href: "tel:" };

const problemPunkte = [
  "Reicht die Rente nicht mehr für Instandhaltung oder Pflege? Wir zeigen Ihnen, was Ihr Zuhause heute wert ist.",
  "Sie möchten am liebsten wohnen bleiben? Wir erklären auch Alternativen wie Wohnrecht oder Teilverkauf, nicht nur den klassischen Verkauf.",
  "Keine Eile, kein Druck – Sie entscheiden, wann und ob es weitergeht.",
];

const faqItems = [
  {
    q: "Muss ich nach dem Gespräch ausziehen?",
    a: "Nein. Wir informieren Sie auch über Modelle, bei denen Sie in Ihrem Zuhause wohnen bleiben und trotzdem Kapital freisetzen können.",
  },
  {
    q: "Bin ich nach dem Formular zu etwas verpflichtet?",
    a: "Nein. Die Einschätzung ist unverbindlich. Sie entscheiden danach in Ruhe, ob Sie weitere Schritte gehen möchten.",
  },
  {
    q: "Wie schnell melden Sie sich?",
    a: "In der Regel noch am selben oder nächsten Werktag.",
  },
];

export default function RuhestandPage() {
  return (
    <PersonaTheme>
      <PersonaHero
        large
        eyebrow="Für Eigentümerinnen und Eigentümer im Ruhestand"
        headline="Ihr Zuhause in Bad Honnef & Umgebung verkaufen – in Ruhe, ohne Eile."
        subheadline="Kostenlose, unverbindliche Einschätzung durch einen Ansprechpartner vor Ort."
        ctaLabel="Kostenlos beraten lassen"
        ctaHref="#einschaetzung"
        phone={telefon}
      />
      <PersonaProblemSection large points={problemPunkte} />
      <PersonaAblaufSection large />
      <PersonaFaqSection large items={faqItems} />
      <PersonaFormSection
        large
        ortSeite="ruhestand"
        heading="Kostenlos beraten lassen"
        intro="Wenn Sie so weit sind: Füllen Sie das Formular aus, oder rufen Sie uns einfach an – ganz wie es Ihnen lieber ist."
      />
    </PersonaTheme>
  );
}
