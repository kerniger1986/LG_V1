import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const immobilientypEnum = pgEnum("immobilientyp", [
  "haus",
  "wohnung",
  "grundstueck",
]);

export const zustandEnum = pgEnum("zustand", [
  "renoviert",
  "normal",
  "sanierungsbeduerftig",
]);

export const verkaufsgrundEnum = pgEnum("verkaufsgrund", [
  "erbschaft",
  "alter",
  "umzug",
  "scheidung",
  "sonstiges",
]);

export const zeitrahmenEnum = pgEnum("zeitrahmen", [
  "sofort",
  "drei_bis_sechs_monate",
  "unklar",
]);

export const ampelEnum = pgEnum("ampel", ["gruen", "gelb", "rot"]);

export const leadStatusEnum = pgEnum("lead_status", [
  "neu",
  "in_pruefung",
  "an_makler_uebergeben",
  "eigener_ankauf",
  "abgeschlossen",
  "abgelehnt",
]);

export const maklerPartners = pgTable("makler_partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  kontaktEmail: text("kontakt_email"),
  kontaktTelefon: text("kontakt_telefon"),
  provisionssatzProzent: numeric("provisionssatz_prozent", {
    precision: 5,
    scale: 2,
  }),
  notizen: text("notizen"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),

  // Kontaktdaten
  name: text("name").notNull(),
  telefon: text("telefon").notNull(),
  email: text("email").notNull(),
  plzOrt: text("plz_ort").notNull(),

  // Objektdaten
  immobilientyp: immobilientypEnum("immobilientyp").notNull(),
  wohnflaeche: numeric("wohnflaeche", { precision: 10, scale: 2 }).notNull(),
  baujahr: integer("baujahr"),
  zustand: zustandEnum("zustand"),
  verkaufsgrund: verkaufsgrundEnum("verkaufsgrund").notNull(),
  vermietet: boolean("vermietet").notNull(),
  kaltmiete: numeric("kaltmiete", { precision: 10, scale: 2 }),
  preisvorstellung: numeric("preisvorstellung", { precision: 12, scale: 2 }),
  zeitrahmen: zeitrahmenEnum("zeitrahmen").notNull(),

  // Einwilligung
  datenschutzZustimmung: boolean("datenschutz_zustimmung").notNull(),

  // Tracking
  utmQuelle: text("utm_quelle"),
  ortSeite: text("ort_seite"),

  // Berechnete Ampel-Werte
  kaufpreisProM2: numeric("kaufpreis_pro_m2", { precision: 10, scale: 2 }),
  mietrenditeProzent: numeric("mietrendite_prozent", {
    precision: 6,
    scale: 2,
  }),
  ampel: ampelEnum("ampel").notNull(),

  // Admin-Workflow
  status: leadStatusEnum("status").notNull().default("neu"),
  notizen: text("notizen"),
  maklerPartnerId: integer("makler_partner_id").references(
    () => maklerPartners.id,
    { onDelete: "set null" },
  ),

  // Loeschkonzept (DSGVO): empfohlenes Loeschdatum, sobald ein Lead
  // abgeschlossen/abgelehnt ist. Loeschung selbst erfolgt manuell im Admin.
  loeschenAm: timestamp("loeschen_am", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type MaklerPartner = typeof maklerPartners.$inferSelect;
export type NewMaklerPartner = typeof maklerPartners.$inferInsert;
