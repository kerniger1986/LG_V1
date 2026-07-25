import Link from "next/link";
import { signOut } from "@/auth";

export function AdminNav() {
  return (
    <div className="border-b border-slate-200 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <nav className="flex gap-6 text-base text-slate-200">
          <Link href="/admin/leads" className="hover:text-white">
            Leads
          </Link>
          <Link href="/admin/partners" className="hover:text-white">
            Maklerpartner
          </Link>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button className="text-base text-slate-300 hover:text-white">
            Abmelden
          </button>
        </form>
      </div>
    </div>
  );
}
