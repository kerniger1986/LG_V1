import { personaSerif } from "@/lib/persona-fonts";

interface ProcessStepsProps {
  title?: string;
  steps: string[];
}

/** Vertikales Ablaufdiagramm im Signatur-Stil - fuer Prozesse, Fristen-Zeitleisten. */
export function ProcessSteps({ title, steps }: ProcessStepsProps) {
  return (
    <div className="not-prose my-8 rounded-xl border border-[#23282A]/10 bg-[#EFF2ED] p-6 sm:p-8">
      {title && (
        <h3
          className={`${personaSerif.className} mb-6 text-xl font-bold text-[#23282A]`}
        >
          {title}
        </h3>
      )}
      <ol className="space-y-0">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2F5D50] text-sm font-bold text-[#EFF2ED]">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="w-px flex-1 bg-[#2F5D50]/30" aria-hidden="true" />
              )}
            </div>
            <p className="pb-6 pt-1 text-[#23282A]">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
