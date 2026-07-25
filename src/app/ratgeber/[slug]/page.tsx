import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// publishDate wird bei jedem Request geprueft (siehe src/lib/posts.ts): ein
// fuer die Zukunft geplanter Beitrag liegt zwar schon im Repository, liefert
// aber bis zu seinem Datum ganz normal einen 404 - kein Redeploy noetig.
export const dynamic = "force-dynamic";

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
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
      <h1 className="text-3xl font-semibold text-slate-900">{post.title}</h1>
      <div
        className="prose prose-lg prose-slate mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
