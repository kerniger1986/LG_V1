# Persona-Landingpages & Ratgeber-Strategie

## 1. Recherche: Was diese beiden Gruppen wirklich beschäftigt

### Persona "Erbschaft" (Erbengemeinschaften, meist 45–60 Jahre)

- **Uneinigkeit unter Miterben** ist der häufigste Streitpunkt: einer will behalten/selbst nutzen, einer will vermieten, einer will schnell verkaufen. Rechtlich braucht der Verkauf einer zum Nachlass gehörenden Immobilie die Zustimmung aller Miterben.
- **Wenn ein Miterbe blockiert**: der eigene Erbanteil kann nach § 2033 BGB einzeln verkauft werden, allerdings haben die übrigen Miterben ein Vorkaufsrecht (2 Monate Frist). Letzter Ausweg ist die Teilungsversteigerung – meist deutlich unter Marktwert und löst die Erbengemeinschaft nicht einmal auf.
- **Kostenverteilung**: Instandhaltung, Grundsteuer, Versicherung und Räumung werden nach Erbquote verteilt – unklare Dokumentation ist ein häufiger Streitauslöser.
- **Spekulationssteuer**: Die 10-Jahres-Frist des Erblassers wird auf die Erben übertragen und kann beim Verkauf überraschend zuschlagen, wenn die Immobilie nicht selbst genutzt wurde.
- **Emotionale Komponente**: Elternhaus, Kindheitserinnerungen – Verkaufsentscheidungen sind selten rein rational.

### Persona "Ruhestand" (Eigentümer im Alter, meist 65+)

- **Rente reicht nicht** für Instandhaltung, Pflegekosten oder größere Reparaturen.
- **Haus zu groß** nach Auszug der Kinder – Einsamkeit, körperliche Belastung durch Haus und Garten.
- **Pflegefall/Pflegeheim**: Das Sozialamt prüft bei Sozialhilfeantrag verwertbares Vermögen inklusive Immobilie – für viele ein unangenehmes, unbekanntes Thema.
- **Angst vor Überstürzung** und Verlust der Selbstbestimmung – hohe emotionale Bindung ans Zuhause.
- **Unwissen über Alternativen zum klassischen Verkauf**: Wohnrecht, Nießbrauch, Leibrente/Immobilienrente und Teilverkauf ermöglichen, im Haus wohnen zu bleiben und trotzdem Kapital freizusetzen – viele kennen diese Optionen nicht.
- **Überschätzung des eigenen Immobilienwerts**, oft aus emotionaler Bindung heraus.

## 2. Content-Kalender: erste 12 Ratgeber-Beiträge

Start ca. 4 Wochen vor dem ersten Ad-Klick, damit Google Zeit hat, die Seiten zu erfassen. Danach fester Wochenrhythmus, alternierend zwischen den Personas. Nach den ersten 12 Wochen auf 14-tägigen Rhythmus umstellen.

| Woche | Persona | Titel |
|---|---|---|
| 1 | Erbschaft | Erbengemeinschaft: Wenn ein Miterbe nicht verkaufen will – Ihre Optionen |
| 2 | Ruhestand | Haus verkaufen und trotzdem wohnen bleiben: Wohnrecht und Nießbrauch erklärt |
| 3 | Erbschaft | Teilungsversteigerung: Was sie bedeutet und warum sie meist die letzte Wahl sein sollte |
| 4 | Ruhestand | Immobilienrente und Teilverkauf: Lohnt sich das im Ruhestand? |
| 5 | Erbschaft | Erbanteil verkaufen: So funktioniert es, wenn ein Miterbe blockiert |
| 6 | Ruhestand | Wenn das Haus zu groß wird: Anzeichen, dass ein Verkauf sinnvoll sein könnte |
| 7 | Erbschaft | Spekulationssteuer bei geerbten Immobilien: Wann Sie wirklich zahlen müssen |
| 8 | Ruhestand | Pflegeheim finanzieren: Muss das Elternhaus wirklich verkauft werden? |
| 9 | Erbschaft | Kosten nach dem Erbfall: Wer zahlt was bis zum Verkauf? |
| 10 | Ruhestand | Immobilie und Sozialamt: Was bei Pflegebedürftigkeit mit dem Eigenheim passiert |
| 11 | Erbschaft | Erbengemeinschaft einigen, ohne vor Gericht zu landen |
| 12 | Ruhestand | Hausverkauf im Alter ohne Zeitdruck: So gelingt der Abschied in Ruhe |

Die eigentlichen Texte schreiben wir im nächsten Schritt gemeinsam – hier steht erstmal das Gerüst, auf das der Claude-Code-Prompt unten referenziert.

## 3. Technischer Mechanismus für automatisches Ausspielen

Kein Cron-Job und keine erneute Bereitstellung nötig. Lösung: jeder Ratgeber-Beitrag bekommt ein `publishDate`-Feld im Frontmatter. Die Blog-Übersicht und die Sitemap filtern serverseitig zur Laufzeit: Nur Beiträge mit `publishDate <= heute` werden gelistet, verlinkt und in die Sitemap aufgenommen. Ein für später geplanter Beitrag liegt also schon fertig im Repository, ist aber unsichtbar und nicht indexierbar, bis sein Datum erreicht ist – er erscheint automatisch, ohne dass du manuell etwas veröffentlichen musst.

## 4. Design-Briefing für die zwei Persona-Landingpages

Ein gemeinsames Marken-Fundament für beide Seiten, mit persona-spezifischen Gewichtungen statt komplett unterschiedlicher Systeme.

**Farben:**
- `#EFF2ED` – Oberfläche/Hintergrund (kühles, ruhiges Off-White, an Flussnebel/Siebengebirge angelehnt – bewusst kein warmes Creme-Orange-Schema)
- `#2F5D50` – Primärfarbe (tiefes Waldgrün, Rhein/Siebengebirge – steht für Vertrauen, Ruhe, Bodenständigkeit)
- `#C08A2E` – Akzent für CTA-Buttons (gedecktes Ocker, sparsam einsetzen, nicht als Flächenfarbe)
- `#23282A` – Primärtext (dunkles Schiefergrau statt reinem Schwarz)
- `#5C6660` – Sekundärtext

**Typografie:**
- Display/Headlines: eine seriöse Serif (z. B. Source Serif 4 oder Lora) – vermittelt Tradition und Vertrauen, wirkt weniger "Tech-Startup"
- Fließtext: eine klare, große Groteskschrift (z. B. Public Sans oder Inter), Basisgröße 18–19px statt der üblichen 16px – bessere Lesbarkeit für eine ältere Zielgruppe
- Keine dekorativen Schriften, keine engen Laufweiten

**Layout-Konzept:**
- Editorial, einspaltig, großzügiger Weißraum, ein einziger klarer CTA pro Bildschirmabschnitt (keine konkurrierenden Buttons)
- **Ruhestand-Seite**: noch größere Schrift, kürzere Absätze, Telefonnummer mit Klick-zum-Anrufen prominent im oberen Bereich, Formular erst nach dem Vertrauensaufbau (Referenzen, Ablauf-Erklärung)
- **Erbschaft-Seite**: etwas höhere Informationsdichte, FAQ weiter oben, Formular schneller erreichbar (diese Zielgruppe recherchiert aktiv und will zügig vorankommen)

**Signaturelement:** eine schlichte Strichzeichnung der Siebengebirge-Silhouette mit dem Drachenfels als dünne Horizontlinie im Hero-Bereich bzw. als Abschnittstrenner – verankert "lokale Marktkenntnis" visuell in einem echten, wiedererkennbaren Ort statt generischer Immobilien-Stockfotos.

## 5. Seitentexte

### 5a. Landingpage "Erbschaft"

**Hero:**
- Headline: "Geerbte Immobilie im Rhein-Sieg-Kreis? Wir helfen, ohne Familienstreit."
- Subheadline: "Kostenlose, unverbindliche Einschätzung – auch wenn sich die Erbengemeinschaft noch nicht einig ist."
- CTA: "Jetzt kostenlos einschätzen lassen"

**Problem-Sektion (3 Punkte):**
1. "Ein Miterbe will verkaufen, ein anderer nicht? Wir zeigen Ihnen, welche Optionen es zwischen Einigung und Teilungsversteigerung wirklich gibt."
2. "Unsicher, was mit Spekulationssteuer oder Kosten bis zum Verkauf ist? Wir ordnen Ihre Situation ein, bevor Sie sich festlegen."
3. "Kein Zeitdruck, keine Drucksprache – Sie entscheiden in Ihrem Tempo."

**Ablauf (identisch zur bestehenden Seite, unverändert übernehmen):**
1. Formular mit Eckdaten ausfüllen
2. Kurzes, unverbindliches Telefonat
3. Ehrliche Einschätzung und mögliche nächste Schritte

**FAQ (ergänzend zu den bestehenden Fragen):**
- "Müssen alle Miterben einverstanden sein, bevor wir uns melden?" – "Nein. Auch wenn die Erbengemeinschaft noch uneinig ist, können Sie sich unverbindlich informieren – das hilft oft schon, die Situation für alle Beteiligten zu klären."
- "Wie schnell melden Sie sich?" – "In der Regel noch am selben oder nächsten Werktag."

### 5b. Landingpage "Ruhestand"

**Hero:**
- Headline: "Ihr Zuhause in Bad Honnef & Umgebung verkaufen – in Ruhe, ohne Eile."
- Subheadline: "Kostenlose, unverbindliche Einschätzung durch einen Ansprechpartner vor Ort. Auch am Telefon: [Telefonnummer]."
- CTA: "Kostenlos beraten lassen"

**Problem-Sektion (3 Punkte):**
1. "Reicht die Rente nicht mehr für Instandhaltung oder Pflege? Wir zeigen Ihnen, was Ihr Zuhause heute wert ist."
2. "Sie möchten am liebsten wohnen bleiben? Wir erklären auch Alternativen wie Wohnrecht oder Teilverkauf, nicht nur den klassischen Verkauf."
3. "Keine Eile, kein Druck – Sie entscheiden, wann und ob es weitergeht."

**Ablauf:** identisch zur bestehenden Seite.

**FAQ (ergänzend):**
- "Muss ich nach dem Gespräch ausziehen?" – "Nein. Wir informieren Sie auch über Modelle, bei denen Sie in Ihrem Zuhause wohnen bleiben und trotzdem Kapital freisetzen können."
- "Wie schnell melden Sie sich?" – "In der Regel noch am selben oder nächsten Werktag."

## 6. Claude-Code-Prompt: Persona-Landingpages erstellen

```
Kontext: Bestehende Next.js-Seite unter [Projektpfad]. Aktuell gibt es eine
generische Landingpage plus Orts-Unterseiten (Bad Honnef, Hennef, Eitorf,
Windeck, Much, Ruppichteroth). Lies die Datei
persona-pages-content-strategie.md im Projektverzeichnis vollständig,
bevor du beginnst.

Aufgabe:
1. Erstelle zwei neue Landingpages unter /immobilie-verkaufen/erbschaft
   und /immobilie-verkaufen/ruhestand, mit den Texten aus Abschnitt 5
   der Datei (Hero, Problem-Sektion, Ablauf, FAQ, CTA). Übernimm das
   bestehende Formular und die Ampel-Logik unverändert - nur Copy und
   Layout-Gewichtung ändern sich pro Persona, nicht der Funktionsumfang.
2. Wende das Design-Briefing aus Abschnitt 4 an: Farben, Typografie,
   Layout-Unterschiede zwischen den beiden Seiten (Ruhestand: größere
   Schrift, Telefonnummer prominent oben, Formular später im Scroll-
   verlauf. Erbschaft: höhere Informationsdichte, FAQ weiter oben).
3. Baue das Siebengebirge-Signaturelement (einfache SVG-Strichzeichnung,
   Drachenfels-Silhouette) als Hero-Trenner auf beiden Seiten ein.
4. Die bestehenden Orts-Unterseiten bleiben unverändert. Verlinke von
   jeder Orts-Seite kontextabhängig auf die passende Persona-Seite
   (z. B. ein Textlink "Haben Sie geerbt? Hier speziell für Erben").
5. Aktualisiere auf allen Seiten die FAQ-Antwort zur Reaktionszeit auf
   "in der Regel noch am selben oder nächsten Werktag" (ersetzt "1-2
   Werktage").
6. Responsive, Tastaturfokus sichtbar, reduzierte Bewegungseffekte
   respektieren. Zeig mir Screenshots beider Seiten (Desktop + Mobile)
   zur Prüfung, bevor du sie live schaltest.
```

## 7. Claude-Code-Prompt: Ratgeber-System mit automatisiertem Zeitplan

```
Kontext: Gleiches Projekt. Lies persona-pages-content-strategie.md,
Abschnitt 2 (Content-Kalender) und Abschnitt 3 (technischer Mechanismus).

Aufgabe:
1. Baue einen Ratgeber-Bereich unter /ratgeber mit einzelnen Beiträgen
   unter /ratgeber/[slug]. Jeder Beitrag ist eine Markdown/MDX-Datei mit
   Frontmatter: title, slug, persona (erbschaft|ruhestand), publishDate
   (ISO-Datum), metaDescription.
2. Implementiere die Sichtbarkeitslogik serverseitig: Ein Beitrag wird
   nur in der Ratgeber-Übersicht, in der Sitemap und über direkten
   Seitenaufruf angezeigt, wenn publishDate <= aktuelles Datum. Vor dem
   Datum liefert die Route einen 404. Kein Cron-Job nötig, die Prüfung
   läuft bei jedem Request.
3. Lege für die 12 Beiträge aus dem Content-Kalender (Abschnitt 2) die
   Datei-Gerüste mit korrektem Frontmatter und publishDate laut Tabelle
   an (Woche 1 = [Startdatum einsetzen], danach wöchentlich). Den
   eigentlichen Fließtext liefere ich dir nach und nach nach - lege für
   jeden Titel vorerst einen Platzhalter-Body an, den ich ersetze.
4. Verlinke veröffentlichte Ratgeber-Beiträge automatisch von der
   jeweils passenden Persona-Landingpage (Erbschafts-Beiträge auf der
   Erbschafts-Seite, Ruhestands-Beiträge auf der Ruhestands-Seite).
5. Zeig mir die Ratgeber-Übersichtsseite und einen Beispiel-Beitrag zur
   Prüfung.
```
