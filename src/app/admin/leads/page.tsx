import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { leads } from "@/db/schema";
import { AdminNav } from "@/components/AdminNav";
import { AmpelPunkt } from "@/components/AmpelPunkt";
import {
  ampelKurzLabel,
  immobilientypLabel,
  statusLabel,
} from "@/lib/labels";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const alleLeads = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt));

  return (
    <div>
      <AdminNav />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Leads ({alleLeads.length})
        </h1>

        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Ampel</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Ort</th>
                <th className="px-4 py-3">Typ</th>
                <th className="px-4 py-3">€/m²</th>
                <th className="px-4 py-3">Rendite</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alleLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <AmpelPunkt ampel={lead.ampel} />
                      {ampelKurzLabel[lead.ampel]}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.plzOrt}</td>
                  <td className="px-4 py-3">
                    {immobilientypLabel[lead.immobilientyp]}
                  </td>
                  <td className="px-4 py-3">
                    {lead.kaufpreisProM2 ? `${lead.kaufpreisProM2} €` : "–"}
                  </td>
                  <td className="px-4 py-3">
                    {lead.mietrenditeProzent
                      ? `${lead.mietrenditeProzent} %`
                      : "–"}
                  </td>
                  <td className="px-4 py-3">{statusLabel[lead.status]}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="text-blue-700 underline"
                    >
                      Öffnen
                    </Link>
                  </td>
                </tr>
              ))}
              {alleLeads.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                    Noch keine Leads eingegangen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
