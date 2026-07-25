import { personaSerif } from "@/lib/persona-fonts";
import { LeadForm } from "@/components/LeadForm";

interface PersonaFormSectionProps {
  ortSeite: string;
  heading: string;
  intro?: string;
  large?: boolean;
}

export function PersonaFormSection({
  ortSeite,
  heading,
  intro,
  large,
}: PersonaFormSectionProps) {
  return (
    <section id="einschaetzung" className="border-t border-[#23282A]/10 bg-[#e4e9e2]">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h2
          className={`${personaSerif.className} font-bold text-[#23282A] ${large ? "text-3xl" : "text-2xl"}`}
        >
          {heading}
        </h2>
        {intro && (
          <p className={`mt-3 text-[#5C6660] ${large ? "text-xl" : "text-lg"}`}>
            {intro}
          </p>
        )}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <LeadForm ortSeite={ortSeite} variant="persona" />
        </div>
      </div>
    </section>
  );
}
