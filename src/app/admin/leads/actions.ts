"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { leads } from "@/db/schema";

const RETENTION_MONTHS = Number(process.env.LEAD_RETENTION_MONTHS ?? 24);

const statusWerte = [
  "neu",
  "in_pruefung",
  "an_makler_uebergeben",
  "eigener_ankauf",
  "abgeschlossen",
  "abgelehnt",
] as const;

type LeadStatus = (typeof statusWerte)[number];

function istEndstatus(status: LeadStatus) {
  return status === "abgeschlossen" || status === "abgelehnt";
}

export async function updateLeadAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status") as LeadStatus;
  const notizen = String(formData.get("notizen") ?? "");
  const maklerPartnerIdRaw = formData.get("maklerPartnerId");
  const maklerPartnerId =
    maklerPartnerIdRaw && maklerPartnerIdRaw !== ""
      ? Number(maklerPartnerIdRaw)
      : null;

  if (!id || !statusWerte.includes(status)) {
    throw new Error("Ungültige Eingabe.");
  }

  const loeschenAm = istEndstatus(status)
    ? new Date(Date.now() + RETENTION_MONTHS * 30 * 24 * 60 * 60 * 1000)
    : null;

  await db
    .update(leads)
    .set({
      status,
      notizen,
      maklerPartnerId,
      loeschenAm,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, id));

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function deleteLeadAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Ungültige Eingabe.");

  await db.delete(leads).where(eq(leads.id, id));

  revalidatePath("/admin/leads");
}
