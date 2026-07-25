import fs from "fs";
import path from "path";
import Image from "next/image";

const IMAGE_SRC = "/images/siebengebirge.jpg";
const IMAGE_ALT =
  "Blick auf den Drachenfels im Siebengebirge mit dem Rhein bei Bad Honnef";

// Datei wird separat ins Repository gelegt (public/images/siebengebirge.jpg).
// Solange sie fehlt, zeigt die Komponente einen dezenten Platzhalter statt
// eines kaputten Bildes.
const bildVorhanden = fs.existsSync(
  path.join(process.cwd(), "public", "images", "siebengebirge.jpg"),
);

interface RegionPhotoProps {
  className?: string;
}

export function RegionPhoto({ className = "" }: RegionPhotoProps) {
  if (!bildVorhanden) {
    return (
      <div
        className={`flex aspect-[3/4] items-center justify-center rounded-xl border border-[#23282A]/10 bg-[#23282A]/5 text-center text-sm text-[#5C6660] ${className}`}
      >
        Foto folgt
      </div>
    );
  }

  return (
    <Image
      src={IMAGE_SRC}
      alt={IMAGE_ALT}
      width={600}
      height={800}
      sizes="(min-width: 1024px) 42vw, 100vw"
      className={`h-auto w-full rounded-xl object-cover ${className}`}
    />
  );
}
