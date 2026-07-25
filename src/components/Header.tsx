import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="text-xl font-semibold text-slate-900">
          Rhein-Sieg Immobilienberatung
        </Link>
        <a
          href="#einschaetzung"
          className="hidden rounded-lg bg-blue-700 px-4 py-2 text-base font-medium text-white hover:bg-blue-800 sm:inline-block"
        >
          Kostenlose Einschätzung
        </a>
      </div>
    </header>
  );
}
