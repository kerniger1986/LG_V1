"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { loadGooglePlaces, RHEIN_SIEG_BOUNDS } from "@/lib/google-places";

interface LeadFormProps {
  ortSeite: string;
  variant?: "default" | "persona";
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function LeadForm({ ortSeite, variant = "default" }: LeadFormProps) {
  const isPersona = variant === "persona";

  const feldLabel = isPersona
    ? "block text-lg font-medium text-[#23282A] mb-2"
    : "block text-lg font-medium text-slate-800 mb-2";
  const feldInput = isPersona
    ? "w-full rounded-lg border border-[#23282A]/25 px-4 py-3 text-lg text-[#23282A] focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/20 outline-none accent-[#2F5D50]"
    : "w-full rounded-lg border border-slate-300 px-4 py-3 text-lg text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none";
  const submitButton = isPersona
    ? "w-full rounded-lg bg-[#C08A2E] px-6 py-4 text-xl font-semibold text-[#23282A] transition-colors hover:brightness-95 disabled:opacity-60"
    : "w-full rounded-lg bg-blue-700 px-6 py-4 text-xl font-semibold text-white hover:bg-blue-800 disabled:opacity-60";

  const [vermietet, setVermietet] = useState<"ja" | "nein" | "">("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [fehlerText, setFehlerText] = useState<string | null>(null);
  const [utmQuelle, setUtmQuelle] = useState("");
  const [koordinaten, setKoordinaten] = useState({ lat: "", lng: "" });
  const adresseInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quelle =
      params.get("utm_source") ??
      params.get("utm_campaign") ??
      params.get("gclid") ??
      "";
    // window.location ist nur im Browser verfuegbar, daher erst nach dem Mount lesbar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUtmQuelle(quelle);
  }, []);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !adresseInputRef.current) return;

    let autocomplete: google.maps.places.Autocomplete | undefined;
    let listener: google.maps.MapsEventListener | undefined;

    loadGooglePlaces(GOOGLE_MAPS_API_KEY)
      .then(() => {
        if (!adresseInputRef.current) return;
        autocomplete = new google.maps.places.Autocomplete(
          adresseInputRef.current,
          {
            fields: ["formatted_address", "geometry"],
            componentRestrictions: { country: "de" },
            bounds: RHEIN_SIEG_BOUNDS,
          },
        );
        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete?.getPlace();
          const location = place?.geometry?.location;
          if (location) {
            setKoordinaten({
              lat: location.lat().toString(),
              lng: location.lng().toString(),
            });
          }
        });
      })
      .catch((error) => {
        console.warn("Google Places nicht verfügbar:", error);
      });

    return () => {
      listener?.remove();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFehlerText(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      telefon: formData.get("telefon"),
      email: formData.get("email"),
      plzOrt: formData.get("plzOrt"),
      lat: formData.get("lat") || undefined,
      lng: formData.get("lng") || undefined,
      immobilientyp: formData.get("immobilientyp"),
      wohnflaeche: formData.get("wohnflaeche"),
      baujahr: formData.get("baujahr") || undefined,
      zustand: formData.get("zustand") || undefined,
      verkaufsgrund: formData.get("verkaufsgrund"),
      vermietet: formData.get("vermietet") === "ja",
      kaltmiete: formData.get("kaltmiete") || undefined,
      preisvorstellung: formData.get("preisvorstellung") || undefined,
      zeitrahmen: formData.get("zeitrahmen"),
      datenschutzZustimmung: formData.get("datenschutzZustimmung") === "on",
      utmQuelle: formData.get("utmQuelle") || undefined,
      ortSeite,
      website: formData.get("website") || "",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setFehlerText(
          body?.error ??
            "Da ist etwas schiefgelaufen. Bitte versuche es noch einmal.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setFehlerText(
        "Da ist etwas schiefgelaufen. Bitte versuche es noch einmal oder ruf uns direkt an.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-2xl font-semibold text-green-800 mb-2">
          Vielen Dank!
        </h3>
        <p className="text-lg text-green-900">
          Wir haben Ihre Angaben erhalten und melden uns in der Regel noch
          am selben oder nächsten Werktag persönlich bei Ihnen –
          unverbindlich und kostenlos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot - fuer Menschen unsichtbar */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Firma</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="utmQuelle" value={utmQuelle} />
      <input type="hidden" name="lat" value={koordinaten.lat} />
      <input type="hidden" name="lng" value={koordinaten.lng} />

      <div>
        <label className={feldLabel} htmlFor="name">
          Ihr Name *
        </label>
        <input
          className={feldInput}
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={feldLabel} htmlFor="telefon">
            Telefon *
          </label>
          <input
            className={feldInput}
            id="telefon"
            name="telefon"
            type="tel"
            required
            autoComplete="tel"
          />
        </div>
        <div>
          <label className={feldLabel} htmlFor="email">
            E-Mail *
          </label>
          <input
            className={feldInput}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label className={feldLabel} htmlFor="plzOrt">
          Adresse der Immobilie *
        </label>
        <input
          ref={adresseInputRef}
          className={feldInput}
          id="plzOrt"
          name="plzOrt"
          type="text"
          required
          autoComplete="off"
          placeholder="z. B. Musterstraße 1, 53604 Bad Honnef"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={feldLabel} htmlFor="immobilientyp">
            Immobilientyp *
          </label>
          <select
            className={feldInput}
            id="immobilientyp"
            name="immobilientyp"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Bitte wählen
            </option>
            <option value="haus">Haus</option>
            <option value="wohnung">Wohnung</option>
            <option value="grundstueck">Grundstück</option>
          </select>
        </div>
        <div>
          <label className={feldLabel} htmlFor="wohnflaeche">
            Wohnfläche (m²) *
          </label>
          <input
            className={feldInput}
            id="wohnflaeche"
            name="wohnflaeche"
            type="number"
            min={1}
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={feldLabel} htmlFor="baujahr">
            Baujahr (optional)
          </label>
          <input
            className={feldInput}
            id="baujahr"
            name="baujahr"
            type="number"
            min={1800}
            max={2100}
          />
        </div>
        <div>
          <label className={feldLabel} htmlFor="zustand">
            Zustand (optional)
          </label>
          <select className={feldInput} id="zustand" name="zustand" defaultValue="">
            <option value="">Bitte wählen</option>
            <option value="renoviert">Renoviert</option>
            <option value="normal">Normal</option>
            <option value="sanierungsbeduerftig">Sanierungsbedürftig</option>
          </select>
        </div>
      </div>

      <div>
        <label className={feldLabel} htmlFor="verkaufsgrund">
          Anlass für den Verkauf *
        </label>
        <select
          className={feldInput}
          id="verkaufsgrund"
          name="verkaufsgrund"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Bitte wählen
          </option>
          <option value="erbschaft">Erbschaft</option>
          <option value="alter">Alter / Ruhestand</option>
          <option value="umzug">Umzug</option>
          <option value="scheidung">Scheidung</option>
          <option value="sonstiges">Sonstiges</option>
        </select>
      </div>

      <fieldset>
        <legend className={feldLabel}>Ist die Immobilie aktuell vermietet? *</legend>
        <div className="flex gap-8 text-lg">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="vermietet"
              value="ja"
              required
              onChange={() => setVermietet("ja")}
            />
            Ja
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="vermietet"
              value="nein"
              required
              onChange={() => setVermietet("nein")}
            />
            Nein
          </label>
        </div>
      </fieldset>

      {vermietet === "ja" && (
        <div>
          <label className={feldLabel} htmlFor="kaltmiete">
            Kaltmiete (€/Monat) *
          </label>
          <input
            className={feldInput}
            id="kaltmiete"
            name="kaltmiete"
            type="number"
            min={1}
            required
          />
        </div>
      )}

      <div>
        <label className={feldLabel} htmlFor="preisvorstellung">
          Ihre Preisvorstellung (€, optional)
        </label>
        <input
          className={feldInput}
          id="preisvorstellung"
          name="preisvorstellung"
          type="number"
          min={1}
        />
      </div>

      <div>
        <label className={feldLabel} htmlFor="zeitrahmen">
          Gewünschter Zeitrahmen für den Verkauf *
        </label>
        <select
          className={feldInput}
          id="zeitrahmen"
          name="zeitrahmen"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Bitte wählen
          </option>
          <option value="sofort">Sofort</option>
          <option value="drei_bis_sechs_monate">In 3–6 Monaten</option>
          <option value="unklar">Noch unklar</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="datenschutzZustimmung"
          name="datenschutzZustimmung"
          required
          className={`mt-1.5 h-5 w-5 ${isPersona ? "accent-[#2F5D50]" : ""}`}
        />
        <label
          htmlFor="datenschutzZustimmung"
          className={isPersona ? "text-base text-[#23282A]" : "text-base text-slate-700"}
        >
          Ich habe die{" "}
          <a href="/datenschutz" className="underline" target="_blank">
            Datenschutzerklärung
          </a>{" "}
          gelesen und bin damit einverstanden, dass meine Angaben zur
          Kontaktaufnahme und kostenlosen Einschätzung verarbeitet werden. *
        </label>
      </div>

      {fehlerText && (
        <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {fehlerText}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className={submitButton}>
        {status === "submitting"
          ? "Wird gesendet …"
          : "Kostenlose Einschätzung anfordern"}
      </button>
    </form>
  );
}
