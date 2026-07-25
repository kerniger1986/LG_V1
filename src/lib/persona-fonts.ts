import { Source_Serif_4, Public_Sans } from "next/font/google";

// Sitewide-Design (urspruenglich fuer die Persona-Landingpages entworfen,
// siehe Design-Briefing Abschnitt 4, inzwischen auf die ganze Seite
// ausgeweitet).
export const personaSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-persona-serif",
});

export const personaSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-persona-sans",
});
