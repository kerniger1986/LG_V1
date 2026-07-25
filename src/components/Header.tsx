import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[#23282A]/10 bg-[#EFF2ED]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-8">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo-lockup-horizontal.svg"
            alt="Rhein-Sieg Immobilienberatung"
            className="h-14 w-auto sm:h-16"
          />
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
