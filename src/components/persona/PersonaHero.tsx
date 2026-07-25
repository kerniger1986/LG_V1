import { personaSerif } from "@/lib/persona-fonts";
import { SiebengebirgeDivider } from "./SiebengebirgeDivider";

interface PersonaHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  phone?: { label: string; href: string };
  large?: boolean;
}

export function PersonaHero({
  eyebrow,
  headline,
  subheadline,
  ctaLabel,
  ctaHref,
  phone,
  large,
}: PersonaHeroProps) {
  return (
    <section className="bg-[#2F5D50] text-[#EFF2ED]">
      <div
        className={`mx-auto max-w-3xl px-6 ${large ? "py-20 sm:py-24" : "py-16 sm:py-20"}`}
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#C9DCD3]">
          {eyebrow}
        </p>

        {phone && (
          <a
            href={phone.href}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#EFF2ED]/40 px-5 py-2.5 text-lg font-semibold text-[#EFF2ED] transition-colors hover:bg-[#3c6f60]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1z"
                strokeLinejoin="round"
              />
            </svg>
            {phone.label}
          </a>
        )}

        <h1
          className={`${personaSerif.className} text-balance font-bold leading-tight ${large ? "text-4xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}
        >
          {headline}
        </h1>
        <p
          className={`mt-6 max-w-2xl text-[#EFF2ED]/90 ${large ? "text-2xl" : "text-xl"}`}
        >
          {subheadline}
        </p>
        <a
          href={ctaHref}
          className={`mt-8 inline-block rounded-lg bg-[#C08A2E] px-8 py-4 font-semibold text-[#23282A] transition-colors hover:brightness-95 ${large ? "text-2xl" : "text-xl"}`}
        >
          {ctaLabel}
        </a>
      </div>
      <SiebengebirgeDivider className="h-16 w-full text-[#EFF2ED] sm:h-24" />
    </section>
  );
}
