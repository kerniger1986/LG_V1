import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#23282A]/10 bg-[#e4e9e2]">
      <div className="mx-auto max-w-5xl px-4 py-8 text-base text-[#5C6660] sm:px-8">
        <p className="mb-4">
          Rhein-Sieg Immobilienberatung ist ein Angebot der FSCF Holding GmbH.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/ratgeber" className="text-[#2F5D50] underline">
            Ratgeber
          </Link>
          <Link href="/impressum" className="text-[#2F5D50] underline">
            Impressum
          </Link>
          <Link href="/datenschutz" className="text-[#2F5D50] underline">
            Datenschutzerklärung
          </Link>
        </nav>
      </div>
    </footer>
  );
}
