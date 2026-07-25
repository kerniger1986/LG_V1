import Link from "next/link";
import { personaSerif } from "@/lib/persona-fonts";

export function Header() {
  return (
    <header className="border-b border-[#23282A]/10 bg-[#EFF2ED]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <Link
          href="/"
          className={`${personaSerif.className} text-xl font-bold text-[#23282A]`}
        >
          Rhein-Sieg Immobilienberatung
        </Link>
        <a
          href="#einschaetzung"
          className="hidden rounded-lg bg-[#C08A2E] px-4 py-2 text-base font-semibold text-[#23282A] transition-colors hover:brightness-95 sm:inline-block"
        >
          Kostenlose Einschätzung
        </a>
      </div>
    </header>
  );
}
