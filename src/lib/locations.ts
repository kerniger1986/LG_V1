export interface Location {
  slug: string;
  name: string;
  intro: string;
}

export const locations: Location[] = [
  {
    slug: "bad-honnef",
    name: "Bad Honnef",
    intro:
      "von Rhöndorf bis zur Insel Grafenwerth – wir kennen den Markt in Bad Honnef aus erster Hand.",
  },
  {
    slug: "hennef",
    name: "Hennef",
    intro:
      "von der Kernstadt bis in die Ortsteile – wir kennen den Immobilienmarkt in Hennef gut.",
  },
  {
    slug: "eitorf",
    name: "Eitorf",
    intro: "wir kennen die Lagen und Preise rund um Eitorf an der Sieg.",
  },
  {
    slug: "windeck",
    name: "Windeck",
    intro:
      "von Rosbach bis Schladern – wir kennen die vielen Ortsteile Windecks.",
  },
  {
    slug: "much",
    name: "Much",
    intro: "wir kennen den ländlich geprägten Immobilienmarkt in Much.",
  },
  {
    slug: "ruppichteroth",
    name: "Ruppichteroth",
    intro: "wir kennen die Lagen und Ortsteile rund um Ruppichteroth.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
