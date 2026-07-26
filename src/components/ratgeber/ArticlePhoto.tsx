import fs from "fs";
import path from "path";
import Image from "next/image";

interface ArticlePhotoProps {
  /** Dateiname unter public/images/, z. B. "rhein-sieg-wohnstrasse.jpg" */
  file: string;
  alt: string;
  className?: string;
}

/**
 * Generisches Foto-Element mit Platzhalter-Fallback, solange die Datei noch
 * nicht im Repository liegt (public/images/<file>). Wird fuer Ratgeber-
 * Artikel genutzt, die noch auf ein Foto vom Kunden warten.
 */
export function ArticlePhoto({ file, alt, className = "" }: ArticlePhotoProps) {
  const vorhanden = fs.existsSync(path.join(process.cwd(), "public", "images", file));

  if (!vorhanden) {
    return (
      <div
        className={`not-prose flex aspect-[3/2] items-center justify-center rounded-xl border border-[#23282A]/10 bg-[#23282A]/5 text-center text-sm text-[#5C6660] ${className}`}
      >
        Foto folgt
      </div>
    );
  }

  return (
    <Image
      src={`/images/${file}`}
      alt={alt}
      width={800}
      height={533}
      sizes="(min-width: 1024px) 700px, 100vw"
      className={`not-prose h-auto w-full rounded-xl object-cover ${className}`}
    />
  );
}
