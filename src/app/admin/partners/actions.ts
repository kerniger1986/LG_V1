"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { maklerPartners } from "@/db/schema";

function parseProvision(value: FormDataEntryValue | null) {
  if (!value || value === "") return null;
  return String(value);
}

export async function createPartnerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name ist erforderlich.");

  await db.insert(maklerPartners).values({
    name,
    kontaktEmail: String(formData.get("kontaktEmail") ?? "").trim() || null,
    kontaktTelefon:
      String(formData.get("kontaktTelefon") ?? "").trim() || null,
    provisionssatzProzent: parseProvision(formData.get("provisionssatzProzent")),
    notizen: String(formData.get("notizen") ?? "").trim() || null,
  });

  revalidatePath("/admin/partners");
}

export async function updatePartnerAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) throw new Error("Ungültige Eingabe.");

  await db
    .update(maklerPartners)
    .set({
      name,
      kontaktEmail: String(formData.get("kontaktEmail") ?? "").trim() || null,
      kontaktTelefon:
        String(formData.get("kontaktTelefon") ?? "").trim() || null,
      provisionssatzProzent: parseProvision(
        formData.get("provisionssatzProzent"),
      ),
      notizen: String(formData.get("notizen") ?? "").trim() || null,
    })
    .where(eq(maklerPartners.id, id));

  revalidatePath("/admin/partners");
}

export async function deletePartnerAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Ungültige Eingabe.");

  await db.delete(maklerPartners).where(eq(maklerPartners.id, id));

  revalidatePath("/admin/partners");
}
