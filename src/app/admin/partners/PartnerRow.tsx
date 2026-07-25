"use client";

import { useState } from "react";
import type { MaklerPartner } from "@/db/schema";
import { updatePartnerAction, deletePartnerAction } from "./actions";

export function PartnerRow({ partner }: { partner: MaklerPartner }) {
  const [bearbeiten, setBearbeiten] = useState(false);

  if (!bearbeiten) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
        <div>
          <p className="font-medium text-slate-900">{partner.name}</p>
          <p className="text-sm text-slate-500">
            {[
              partner.kontaktEmail,
              partner.kontaktTelefon,
              partner.provisionssatzProzent
                ? `${partner.provisionssatzProzent} % Provision`
                : null,
            ]
              .filter(Boolean)
              .join(" · ") || "Keine Kontaktdaten hinterlegt"}
          </p>
        </div>
        <button
          onClick={() => setBearbeiten(true)}
          className="text-blue-700 underline text-sm"
        >
          Bearbeiten
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-4">
      <form action={updatePartnerAction} className="grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="id" value={partner.id} />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name *
          </label>
          <input
            name="name"
            defaultValue={partner.name}
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
            defaultValue={partner.provisionssatzProzent ?? ""}
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
            defaultValue={partner.kontaktEmail ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Kontakt Telefon
          </label>
          <input
            name="kontaktTelefon"
            defaultValue={partner.kontaktTelefon ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Notizen
          </label>
          <textarea
            name="notizen"
            rows={2}
            defaultValue={partner.notizen ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              type="submit"
              onClick={() => setBearbeiten(false)}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Speichern
            </button>
            <button
              type="button"
              onClick={() => setBearbeiten(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </form>
      <form
        action={deletePartnerAction}
        className="mt-2"
        onSubmit={(event) => {
          if (!confirm(`Partner "${partner.name}" wirklich löschen?`)) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={partner.id} />
        <button type="submit" className="text-sm text-red-700 underline">
          Partner löschen
        </button>
      </form>
    </div>
  );
}
