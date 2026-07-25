import Link from "next/link";
import { personaSerif } from "@/lib/persona-fonts";
import type { PostMeta } from "@/lib/posts";

interface PersonaRatgeberSectionProps {
  posts: PostMeta[];
  large?: boolean;
}

export function PersonaRatgeberSection({
  posts,
  large,
}: PersonaRatgeberSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <h2
        className={`${personaSerif.className} font-bold text-[#23282A] ${large ? "text-3xl" : "text-2xl"}`}
      >
        Passende Ratgeber-Beiträge
      </h2>
      <ul className={large ? "mt-8 space-y-6" : "mt-6 space-y-4"}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/ratgeber/${post.slug}`}
              className={`font-semibold text-[#2F5D50] underline underline-offset-2 ${large ? "text-xl" : "text-lg"}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
