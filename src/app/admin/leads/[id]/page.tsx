import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { db } from "@/db/client";
import { leads, maklerPartners } from "@/db/schema";
import { AdminNav } from "@/components/AdminNav";
import { AmpelPunkt } from "@/components/AmpelPunkt";
import { DeleteLeadButton } from "@/components/DeleteLeadButton";
import { updateLeadAction, deleteLeadAction } from "../actions";
import {
  ampelLabel,
  immobilientypLabel,
  statusLabel,
  verkaufsgrundLabel,
  zeitrahmenLabel,
  zustandLabel,
} from "@/lib/labels";

interface PageProps {
  params: Promise<{ id: string }>;
}

const statusOptionen = Object.entries(statusLabel);

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const leadId = Number(id);
  if (!leadId) notFound();

  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId));
  if (!lead) notFound();

  const partner = await db.select().from(maklerPartners);

  async function speichern(formData: FormData) {
    "use server";
    await updateLeadAction(formData);
  }

  async function loeschen(formData: FormData) {
    "use server";
    await deleteLeadAction(formData);
    redirect("/admin/leads");
  }

  return (
    <div>
      <AdminNav />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <div className="flex items-center gap-3">
          <AmpelPunkt ampel={lead.ampel} />
          <h1 className="text-2xl font-semibold text-slate-900">
            {lead.name}
          </h1>
        </div>
        <p className="mt-1 text-slate-600">{ampelLabel[lead.ampel]}</p>

        <div className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm sm:grid-cols-2">
          <div>
            <span className="text-slate-500">Telefon</span>
            <p className="text-slate-900">{lead.telefon}</p>
          </div>
          <div>
            <span className="text-slate-500">E-Mail</span>
            <p className="text-slate-900">{lead.email}</p>
          </div>
          <div>
            <span className="text-slate-500">Adresse</span>
            <p className="text-slate-900">
              {lead.plzOrt}
              {lead.lat && lead.lng && (
                <>
                  {" "}
                  ·{" "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${lead.lat},${lead.lng}`}
                    target="_blank"
                    className="text-blue-700 underline"
                  >
                    auf Karte anzeigen
                  </a>
                </>
              )}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Immobilientyp</span>
            <p className="text-slate-900">
              {immobilientypLabel[lead.immobilientyp]}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Wohnfläche</span>
            <p className="text-slate-900">{lead.wohnflaeche} m²</p>
          </div>
          <div>
            <span className="text-slate-500">Baujahr</span>
            <p className="text-slate-900">{lead.baujahr ?? "–"}</p>
          </div>
          <div>
            <span className="text-slate-500">Zustand</span>
            <p className="text-slate-900">
              {lead.zustand ? zustandLabel[lead.zustand] : "–"}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Verkaufsgrund</span>
            <p className="text-slate-900">
              {verkaufsgrundLabel[lead.verkaufsgrund]}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Vermietet</span>
            <p className="text-slate-900">{lead.vermietet ? "Ja" : "Nein"}</p>
          </div>
          <div>
            <span className="text-slate-500">Kaltmiete</span>
            <p className="text-slate-900">
              {lead.kaltmiete ? `${lead.kaltmiete} €/Monat` : "–"}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Preisvorstellung</span>
            <p className="text-slate-900">
              {lead.preisvorstellung ? `${lead.preisvorstellung} €` : "keine Angabe"}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Zeitrahmen</span>
            <p className="text-slate-900">{zeitrahmenLabel[lead.zeitrahmen]}</p>
          </div>
          <div>
            <span className="text-slate-500">Kaufpreis/m²</span>
            <p className="text-slate-900">
              {lead.kaufpreisProM2 ? `${lead.kaufpreisProM2} €` : "–"}
            </p>
          </div>
          <div>
            <span className="text-slate-500">Mietrendite</span>
            <p className="text-slate-900">
              {lead.mietrenditeProzent ? `${lead.mietrenditeProzent} %` : "–"}
            </p>
          </div>
          <div>
            <span className="text-slate-500">UTM-Quelle</span>
            <p className="text-slate-900">{lead.utmQuelle || "–"}</p>
          </div>
          <div>
            <span className="text-slate-500">Landingpage</span>
            <p className="text-slate-900">{lead.ortSeite || "–"}</p>
          </div>
          <div>
            <span className="text-slate-500">Eingegangen am</span>
            <p className="text-slate-900">
              {new Date(lead.createdAt).toLocaleString("de-DE")}
            </p>
          </div>
        </div>

        <form action={speichern} className="mt-8 space-y-5">
          <input type="hidden" name="id" value={lead.id} />

          <div>
            <label className="block text-base font-medium text-slate-800 mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={lead.status}
              className="w-full max-w-sm rounded-lg border border-slate-300 px-4 py-2.5 text-base outline-none focus:border-blue-600"
            >
              {statusOptionen.map(([wert, label]) => (
                <option key={wert} value={wert}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-base font-medium text-slate-800 mb-1"
              htmlFor="maklerPartnerId"
            >
              Maklerpartner (bei Rot)
            </label>
            <select
              id="maklerPartnerId"
              name="maklerPartnerId"
              defaultValue={lead.maklerPartnerId ?? ""}
              className="w-full max-w-sm rounded-lg border border-slate-300 px-4 py-2.5 text-base outline-none focus:border-blue-600"
            >
              <option value="">– keiner zugewiesen –</option>
              {partner.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-slate-800 mb-1" htmlFor="notizen">
              Notizen
            </label>
            <textarea
              id="notizen"
              name="notizen"
              defaultValue={lead.notizen ?? ""}
              rows={5}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-base outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-base font-medium text-white hover:bg-blue-800"
            >
              Speichern
            </button>
          </div>
        </form>

        {lead.loeschenAm && (
          <p className="mt-6 text-sm text-slate-500">
            Empfohlenes Löschdatum: {new Date(lead.loeschenAm).toLocaleDateString("de-DE")}
          </p>
        )}

        <form action={loeschen} className="mt-3">
          <input type="hidden" name="id" value={lead.id} />
          <DeleteLeadButton />
        </form>
      </div>
    </div>
  );
}
