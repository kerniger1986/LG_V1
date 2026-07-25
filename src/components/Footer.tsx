import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-base text-slate-600 sm:px-8">
        <p className="mb-4">
          Rhein-Sieg Immobilienberatung ist ein Angebot der FSCF Holding GmbH.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/ratgeber" className="underline">
            Ratgeber
          </Link>
          <Link href="/impressum" className="underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="underline">
            Datenschutzerklärung
          </Link>
        </nav>
      </div>
    </footer>
  );
}
