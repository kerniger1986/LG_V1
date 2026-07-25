import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingContent } from "@/components/LandingContent";
import { getLocationBySlug, locations } from "@/lib/locations";

interface PageProps {
  params: Promise<{ ort: string }>;
}

export function generateStaticParams() {
  return locations.map((location) => ({ ort: location.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { ort } = await params;
  const location = getLocationBySlug(ort);
  if (!location) return {};

  return {
    title: `Immobilie verkaufen in ${location.name} – kostenlose Einschätzung`,
    description: `Kostenlose, unverbindliche Einschätzung Ihrer Immobilie in ${location.name} durch einen lokalen Marktkenner.`,
  };
}

export default async function OrtLandingPage({ params }: PageProps) {
  const { ort } = await params;
  const location = getLocationBySlug(ort);

  if (!location) {
    notFound();
  }

  return (
    <LandingContent
      ortName={location.name}
      ortSlug={location.slug}
      intro={location.intro}
    />
  );
}
