import { Source_Serif_4, Public_Sans } from "next/font/google";

// Nur fuer die zwei Persona-Landingpages (Erbschaft/Ruhestand) genutzt,
// bewusst nicht global eingebunden - siehe Design-Briefing Abschnitt 4.
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
