let loadPromise: Promise<void> | null = null;

declare global {
  interface Window {
    __onGooglePlacesLoaded?: () => void;
  }
}

/**
 * Laedt die Google Maps JavaScript API (Places-Bibliothek) genau einmal.
 * Ohne API-Key wird gar nichts geladen - das Adressfeld bleibt dann ein
 * normales Textfeld.
 */
export function loadGooglePlaces(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    window.__onGooglePlacesLoaded = () => resolve();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=places&loading=async&callback=__onGooglePlacesLoaded`;
    script.async = true;
    script.onerror = () =>
      reject(new Error("Google Places konnte nicht geladen werden."));
    document.head.appendChild(script);
  });

  return loadPromise;
}

// Grober Suchbereich um den Rhein-Sieg-Kreis, nur zur Gewichtung der
// Vorschlaege (keine harte Einschraenkung).
export const RHEIN_SIEG_BOUNDS = {
  north: 50.85,
  south: 50.55,
  west: 6.95,
  east: 7.55,
};
