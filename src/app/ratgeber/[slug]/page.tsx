import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPersonaLabel } from "@/lib/posts";
import { personaSerif } from "@/lib/persona-fonts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// publishDate wird bei jedem Request geprueft (siehe src/lib/posts.ts): ein
// fuer die Zukunft geplanter Beitrag liegt zwar schon im Repository, liefert
// aber bis zu seinem Datum ganz normal einen 404 - kein Redeploy noetig.
export const dynamic = "force-dynamic";

// Farben der Typography-Plugin-Vorgaben (--tw-prose-*) auf das
// Siebengebirge-Farbschema umstellen, statt der Slate-Standardpalette.
const proseFarben = {
  "--tw-prose-body": "#23282A",
  "--tw-prose-headings": "#23282A",
  "--tw-prose-lead": "#5C6660",
  "--tw-prose-links": "#2F5D50",
  "--tw-prose-bold": "#23282A",
  "--tw-prose-counters": "#2F5D50",
  "--tw-prose-bullets": "#2F5D50",
  "--tw-prose-hr": "#23282A1a",
  "--tw-prose-quotes": "#23282A",
  "--tw-prose-quote-borders": "#2F5D50",
  "--tw-prose-captions": "#5C6660",
  "--tw-prose-code": "#23282A",
} as CSSProperties;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.metaDescription };
}

export default async function RatgeberArtikelPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <Link href="/ratgeber" className="text-[#2F5D50] underline">
          ← Zurück zum Ratgeber
        </Link>

        <span className="mt-6 mb-2 inline-block rounded-full bg-[#EFF2ED] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2F5D50]">
          {getPersonaLabel(post.persona)}
        </span>

        <h1
          className={`${personaSerif.className} text-balance mt-3 text-3xl font-bold leading-tight text-[#23282A] sm:text-4xl`}
        >
          {post.title}
        </h1>

        <div
          className="prose prose-lg mt-8 max-w-none"
          style={proseFarben}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </>
  );
}
