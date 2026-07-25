import { z } from "zod";

export const leadFormSchema = z
  .object({
    name: z.string().trim().min(2, "Bitte gib deinen Namen an."),
    telefon: z
      .string()
      .trim()
      .min(6, "Bitte gib eine Telefonnummer an.")
      .max(30),
    email: z.string().trim().email("Bitte gib eine gültige E-Mail an."),
    plzOrt: z.string().trim().min(3, "Bitte gib die Adresse an."),
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    immobilientyp: z.enum(["haus", "wohnung", "grundstueck"]),
    wohnflaeche: z.coerce
      .number()
      .positive("Bitte gib die Wohnfläche in m² an."),
    baujahr: z.coerce.number().int().min(1800).max(2100).optional(),
    zustand: z.enum(["renoviert", "normal", "sanierungsbeduerftig"]).optional(),
    verkaufsgrund: z.enum([
      "erbschaft",
      "alter",
      "umzug",
      "scheidung",
      "sonstiges",
    ]),
    vermietet: z.coerce.boolean(),
    kaltmiete: z.coerce.number().positive().optional(),
    preisvorstellung: z.coerce.number().positive().optional(),
    zeitrahmen: z.enum(["sofort", "drei_bis_sechs_monate", "unklar"]),
    datenschutzZustimmung: z.literal(true, {
      message: "Bitte stimme der Datenverarbeitung zu.",
    }),
    utmQuelle: z.string().trim().optional(),
    ortSeite: z.string().trim().optional(),
    // Honeypot: muss leer bleiben, nur fuer Bots sichtbar
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((data) => !data.vermietet || data.kaltmiete != null, {
    message: "Bitte gib die Kaltmiete an, wenn die Immobilie vermietet ist.",
    path: ["kaltmiete"],
  });

export type LeadFormValues = z.infer<typeof leadFormSchema>;
