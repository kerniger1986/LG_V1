import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PersonaTheme } from "@/components/persona/PersonaTheme";
import { personaSerif } from "@/lib/persona-fonts";
import { SiebengebirgeDivider } from "@/components/persona/SiebengebirgeDivider";

export const metadata: Metadata = {
  title: "Ratgeber – Immobilienverkauf im Rhein-Sieg-Kreis",
  description:
    "Verständliche Beiträge rund um Erbschaft, Ruhestand und Immobilienverkauf im Rhein-Sieg-Kreis.",
};

// publishDate wird bei jedem Request geprueft (siehe src/lib/posts.ts),
// daher darf diese Seite nicht zur Build-Zeit eingefroren werden.
export const dynamic = "force-dynamic";

const personaLabel: Record<string, string> = {
  erbschaft: "Für Erben",
  ruhestand: "Für den Ruhestand",
};

export default function RatgeberPage() {
  const posts = getAllPosts();

  return (
    <PersonaTheme>
      <section className="bg-[#2F5D50] text-[#EFF2ED]">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#C9DCD3]">
            Ratgeber
          </p>
          <h1
            className={`${personaSerif.className} text-balance text-4xl font-bold leading-tight sm:text-5xl`}
          >
            Verständlich erklärt, ohne Fachchinesisch
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-[#EFF2ED]/90">
            Beiträge rund um Erbschaft, Ruhestand und Immobilienverkauf in Bad
            Honnef und dem Rhein-Sieg-Kreis.
          </p>
        </div>
        <SiebengebirgeDivider className="h-16 w-full text-[#EFF2ED] sm:h-24" />
      </section>

      <div className="mx-auto max-w-3xl px-6 py-14">
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/ratgeber/${post.slug}`}
                className="block rounded-lg border border-[#23282A]/10 bg-white px-6 py-5 transition-colors hover:border-[#2F5D50]/40"
              >
                {post.persona && (
                  <span className="mb-2 inline-block rounded-full bg-[#EFF2ED] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2F5D50]">
                    {personaLabel[post.persona] ?? post.persona}
                  </span>
                )}
                <h2
                  className={`${personaSerif.className} text-2xl font-bold text-[#23282A]`}
                >
                  {post.title}
                </h2>
                <p className="mt-2 text-lg text-[#5C6660]">
                  {post.metaDescription}
                </p>
              </Link>
            </li>
          ))}
          {posts.length === 0 && (
            <p className="text-[#5C6660]">Noch keine Beiträge vorhanden.</p>
          )}
        </ul>
      </div>
    </PersonaTheme>
  );
}
