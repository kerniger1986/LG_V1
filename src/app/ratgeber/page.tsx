import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Ratgeber – Immobilienverkauf im Rhein-Sieg-Kreis",
  description:
    "Verständliche Beiträge rund um Erbschaft, Ruhestand und Immobilienverkauf im Rhein-Sieg-Kreis.",
};

// publishDate wird bei jedem Request geprueft (siehe src/lib/posts.ts),
// daher darf diese Seite nicht zur Build-Zeit eingefroren werden.
export const dynamic = "force-dynamic";

export default function RatgeberPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8">
      <h1 className="text-3xl font-semibold text-slate-900">Ratgeber</h1>
      <p className="mt-3 text-lg text-slate-700">
        Verständliche Beiträge rund um Erbschaft, Ruhestand und
        Immobilienverkauf in Bad Honnef und dem Rhein-Sieg-Kreis.
      </p>

      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-slate-200 pb-8">
            <Link
              href={`/ratgeber/${post.slug}`}
              className="text-2xl font-semibold text-blue-800 hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-2 text-lg text-slate-700">{post.metaDescription}</p>
          </li>
        ))}
        {posts.length === 0 && (
          <p className="text-slate-500">Noch keine Beiträge vorhanden.</p>
        )}
      </ul>
    </div>
  );
}
