import { personaSerif } from "@/lib/persona-fonts";
import { testimonials } from "@/lib/testimonials";

interface PersonaTestimonialSectionProps {
  large?: boolean;
}

/** Rendert nichts, solange keine echten Kundenstimmen hinterlegt sind. */
export function PersonaTestimonialSection({
  large,
}: PersonaTestimonialSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8">
        <h2
          className={`${personaSerif.className} font-bold text-[#23282A] ${large ? "text-3xl" : "text-2xl"}`}
        >
          Das sagen unsere Kundinnen und Kunden
        </h2>
        <div
          className={`mt-8 grid gap-6 ${testimonials.length > 1 ? "sm:grid-cols-2" : "sm:max-w-xl"}`}
        >
          {testimonials.map((testimonial, i) => (
            <figure
              key={i}
              className="rounded-xl border border-[#23282A]/10 bg-[#EFF2ED] p-6 sm:p-8"
            >
              <blockquote
                className={`text-[#23282A] ${large ? "text-xl" : "text-lg"}`}
              >
                „{testimonial.zitat}“
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-[#5C6660]">
                {testimonial.name}, {testimonial.ort}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
