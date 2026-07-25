# Lead-Generator Immobilienverkauf – Bad Honnef & Rhein-Sieg-Kreis

Schlanke Eigenentwicklung (Next.js) zur Qualifizierung von Immobilien-Verkaufsleads:
ortsspezifische Landingpages mit Formular, automatische Ampel-Vorqualifizierung
(Direktankauf vs. Maklerpartner), Admin-Bereich für Lead- und Partnerverwaltung.

## Tech-Stack

- **Next.js** (App Router, TypeScript, Tailwind CSS)
- **Postgres** via [Neon](https://neon.tech) – **EU-Region (Frankfurt)** wählen
- **Drizzle ORM** für Datenbankzugriff/Migrationen
- **Auth.js (NextAuth v5)** für den Admin-Login (ein Admin-Account)
- **Resend** für E-Mail-Benachrichtigung bei neuen Leads
- Deployment auf **Vercel**, ebenfalls **EU-Region (Frankfurt)**

## Lokale Einrichtung

```bash
npm install
cp .env.example .env.local
```

`.env.local` befüllen:

- `DATABASE_URL` – Connection-String einer Neon-Postgres-Datenbank (EU/Frankfurt-Region)
- `ADMIN_EMAIL` – E-Mail für den Admin-Login
- `ADMIN_PASSWORD_HASH` – erzeugen mit:
  ```bash
  npm run hash-password -- "dein-passwort"
  ```
- `AUTH_SECRET` – erzeugen mit `npx auth secret` oder `openssl rand -base64 32`
- `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `LEAD_NOTIFICATION_FROM` – für die
  E-Mail-Benachrichtigung bei neuen Leads (Resend-Konto + verifizierte Absenderdomain nötig)
- `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GA4_MEASUREMENT_ID`,
  `NEXT_PUBLIC_META_PIXEL_ID` – optional, erst eintragen, sobald die
  entsprechenden Werbekonten angelegt sind. Ohne diese Werte lädt die Seite
  keinerlei Tracking-Skripte.

Datenbankschema anlegen:

```bash
npm run db:push
```

Entwicklungsserver starten:

```bash
npm run dev
```

Tests (Ampel-Logik):

```bash
npm test
```

## Projektstruktur

```
src/
  app/
    immobilie-verkaufen/[ort]/   Ortsspezifische Landingpages (Bad Honnef, Hennef, ...)
    ratgeber/                    Blog/SEO-Content (liest content/ratgeber/*.md)
    impressum/, datenschutz/     Rechtstexte (Platzhalter, siehe unten)
    admin/                       Admin-Bereich (login, leads, partners)
    api/leads/                   Formular-Endpoint
    api/auth/[...nextauth]/      Auth.js-Endpoint
  components/                    UI-Komponenten (Formular, Consent-Banner, ...)
  db/                            Drizzle-Schema & DB-Client
  lib/
    ampel.ts                     Ampel-Vorqualifizierungs-Logik (mit Tests)
    locations.ts                 Liste der bedienten Orte
    email.ts                     Lead-Benachrichtigung per E-Mail
    consent.ts                   Cookie-Consent-Helper (Google Consent Mode v2)
content/ratgeber/*.md            Blog-Artikel (Markdown mit Frontmatter)
scripts/hash-password.ts         Erzeugt den Admin-Passwort-Hash
```

## Ampel-Logik

Siehe `src/lib/ampel.ts`. Ankaufsraster: ≤ 2.000 €/m² und ≥ 6,5 % Mietrendite → GRÜN.
Grundstücke werden nicht automatisch berechnet (immer GELB). Bei nicht vermieteten
Immobilien wird nur der Kaufpreis/m² geprüft (keine Mietrendite nötig). Um die
Schwellenwerte liegt ein 25-%-Toleranzband, das statt ROT auf GELB entscheidet.

## Deployment (Vercel)

1. Neon-Projekt in der **EU-Region (Frankfurt)** anlegen, `DATABASE_URL` kopieren.
2. Vercel-Projekt aus diesem Repo erstellen, Region auf **Frankfurt (fra1)**
   stellen (Project Settings → Functions → Region).
3. Alle Variablen aus `.env.example` in den Vercel-Projekteinstellungen setzen.
4. `npm run db:push` einmalig gegen die Produktions-Datenbank laufen lassen
   (lokal mit Produktions-`DATABASE_URL`, oder via `db:migrate` mit generierten
   Migrationsdateien über `npm run db:generate`).
5. Deploy auslösen.

## Offene Punkte vor dem Go-Live (nicht Teil dieses Codes)

- [ ] Domain registrieren und mit Vercel verbinden
- [ ] Impressum (`src/app/impressum/page.tsx`) und Datenschutzerklärung
      (`src/app/datenschutz/page.tsx`) mit echten Daten befüllen und
      **juristisch prüfen lassen** (alle `[PLATZHALTER]`-Stellen)
- [ ] § 34c GewO-Erlaubnis final klären (Impressum verweist darauf)
- [ ] Auftragsverarbeitungsverträge mit Vercel, Neon und Resend abschließen
- [ ] Google Ads- und Meta-Business-Konto anlegen, IDs in den Env-Variablen ergänzen
- [ ] Tippgeberverträge mit Maklerpartnern schriftlich fixieren
- [ ] Ersten Admin-Zugang per `npm run hash-password` erzeugen und
      `ADMIN_EMAIL`/`ADMIN_PASSWORD_HASH` produktiv setzen
