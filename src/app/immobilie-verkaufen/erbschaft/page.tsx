import type { Metadata } from "next";
import { PersonaTheme } from "@/components/persona/PersonaTheme";
import { PersonaHero } from "@/components/persona/PersonaHero";
import { PersonaProblemSection } from "@/components/persona/PersonaProblemSection";
import { PersonaFaqSection } from "@/components/persona/PersonaFaqSection";
import { PersonaFormSection } from "@/components/persona/PersonaFormSection";
import { PersonaAblaufSection } from "@/components/persona/PersonaAblaufSection";

export const metadata: Metadata = {
  title: "Geerbte Immobilie verkaufen im Rhein-Sieg-Kreis – kostenlose Einschätzung",
  description:
    "Kostenlose, unverbindliche Einschätzung für geerbte Immobilien – auch wenn sich die Erbengemeinschaft noch nicht einig ist.",
};

const problemPunkte = [
  "Ein Miterbe will verkaufen, ein anderer nicht? Wir zeigen Ihnen, welche Optionen es zwischen Einigung und Teilungsversteigerung wirklich gibt.",
  "Unsicher, was mit Spekulationssteuer oder Kosten bis zum Verkauf ist? Wir ordnen Ihre Situation ein, bevor Sie sich festlegen.",
  "Kein Zeitdruck, keine Drucksprache – Sie entscheiden in Ihrem Tempo.",
];

const faqItems = [
  {
    q: "Müssen alle Miterben einverstanden sein, bevor wir uns melden?",
    a: "Nein. Auch wenn die Erbengemeinschaft noch uneinig ist, können Sie sich unverbindlich informieren – das hilft oft schon, die Situation für alle Beteiligten zu klären.",
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

export default function ErbschaftPage() {
  return (
    <PersonaTheme>
      <PersonaHero
        eyebrow="Für Erbengemeinschaften im Rhein-Sieg-Kreis"
        headline="Geerbte Immobilie im Rhein-Sieg-Kreis? Wir helfen, ohne Familienstreit."
        subheadline="Kostenlose, unverbindliche Einschätzung – auch wenn sich die Erbengemeinschaft noch nicht einig ist."
        ctaLabel="Jetzt kostenlos einschätzen lassen"
        ctaHref="#einschaetzung"
      />
      <PersonaProblemSection points={problemPunkte} />
      <PersonaFaqSection items={faqItems} />
      <PersonaFormSection
        ortSeite="erbschaft"
        heading="Kostenlose Einschätzung anfordern"
        intro="Füllen Sie das Formular aus – wir melden uns persönlich bei Ihnen, unabhängig davon, wie weit die Erbengemeinschaft in ihrer Entscheidung schon ist."
      />
      <PersonaAblaufSection />
    </PersonaTheme>
  );
}
