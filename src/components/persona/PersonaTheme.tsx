import type { ReactNode } from "react";
import { personaSans } from "@/lib/persona-fonts";

interface PersonaThemeProps {
  children: ReactNode;
}

/**
 * Eigenes, in sich geschlossenes Farb-/Typografie-System fuer die zwei
 * Persona-Landingpages (Design-Briefing Abschnitt 4). Bewusst nicht in
 * globals.css/Tailwind-Theme eingehaengt, damit die bestehenden
 * Orts-Seiten unveraendert im bisherigen Look bleiben.
 */
export function PersonaTheme({ children }: PersonaThemeProps) {
  return (
    <div className={`${personaSans.className} bg-[#EFF2ED] text-[#23282A]`}>
      {children}
    </div>
  );
}
