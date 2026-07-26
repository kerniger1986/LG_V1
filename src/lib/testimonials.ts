export interface Testimonial {
  name: string;
  ort: string;
  zitat: string;
}

/**
 * Platzhalter fuer 1-2 echte Kundenstimmen. Liste ist absichtlich leer, bis
 * echte Referenzen vorliegen - der Abschnitt erscheint automatisch, sobald
 * hier mindestens ein Eintrag ergaenzt wird, z. B.:
 * { name: "M. Schmidt", ort: "Bad Honnef", zitat: "..." }
 */
export const testimonials: Testimonial[] = [];
