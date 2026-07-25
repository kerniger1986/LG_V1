import { db } from "@/db/client";
import { maklerPartners } from "@/db/schema";
import { AdminNav } from "@/components/AdminNav";
import { createPartnerAction } from "./actions";
import { PartnerRow } from "./PartnerRow";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partner = await db.select().from(maklerPartners);

  return (
    <div>
      <AdminNav />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Maklerpartner
        </h1>

        <div className="mt-6 space-y-3">
          {partner.map((p) => (
            <PartnerRow key={p.id} partner={p} />
          ))}
          {partner.length === 0 && (
            <p className="text-slate-500">Noch keine Maklerpartner angelegt.</p>
          )}
        </div>

        <h2 className="mt-10 text-xl font-semibold text-slate-900">
          Neuen Partner anlegen
        </h2>
        <form action={createPartnerAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name *
            </label>
            <input
              name="name"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Provisionssatz (%)
            </label>
            <input
              name="provisionssatzProzent"
              type="number"
              step="0.1"
              min="0"
              max="100"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Kontakt E-Mail
            </label>
            <input
              name="kontaktEmail"
              type="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Kontakt Telefon
            </label>
            <input
              name="kontaktTelefon"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notizen
            </label>
            <textarea
              name="notizen"
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800"
            >
              Partner anlegen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
