CREATE TYPE "public"."ampel" AS ENUM('gruen', 'gelb', 'rot');--> statement-breakpoint
CREATE TYPE "public"."immobilientyp" AS ENUM('haus', 'wohnung', 'grundstueck');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('neu', 'in_pruefung', 'an_makler_uebergeben', 'eigener_ankauf', 'abgeschlossen', 'abgelehnt');--> statement-breakpoint
CREATE TYPE "public"."verkaufsgrund" AS ENUM('erbschaft', 'alter', 'umzug', 'scheidung', 'sonstiges');--> statement-breakpoint
CREATE TYPE "public"."zeitrahmen" AS ENUM('sofort', 'drei_bis_sechs_monate', 'unklar');--> statement-breakpoint
CREATE TYPE "public"."zustand" AS ENUM('renoviert', 'normal', 'sanierungsbeduerftig');--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"telefon" text NOT NULL,
	"email" text NOT NULL,
	"plz_ort" text NOT NULL,
	"immobilientyp" "immobilientyp" NOT NULL,
	"wohnflaeche" numeric(10, 2) NOT NULL,
	"baujahr" integer,
	"zustand" "zustand",
	"verkaufsgrund" "verkaufsgrund" NOT NULL,
	"vermietet" boolean NOT NULL,
	"kaltmiete" numeric(10, 2),
	"preisvorstellung" numeric(12, 2),
	"zeitrahmen" "zeitrahmen" NOT NULL,
	"datenschutz_zustimmung" boolean NOT NULL,
	"utm_quelle" text,
	"ort_seite" text,
	"kaufpreis_pro_m2" numeric(10, 2),
	"mietrendite_prozent" numeric(6, 2),
	"ampel" "ampel" NOT NULL,
	"status" "lead_status" DEFAULT 'neu' NOT NULL,
	"notizen" text,
	"makler_partner_id" integer,
	"loeschen_am" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "makler_partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"kontakt_email" text,
	"kontakt_telefon" text,
	"provisionssatz_prozent" numeric(5, 2),
	"notizen" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_makler_partner_id_makler_partners_id_fk" FOREIGN KEY ("makler_partner_id") REFERENCES "public"."makler_partners"("id") ON DELETE set null ON UPDATE no action;