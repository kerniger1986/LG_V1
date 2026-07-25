import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content", "ratgeber");

export type Persona = "erbschaft" | "ruhestand";

export interface PostMeta {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  persona?: Persona;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function heuteIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function istVeroeffentlicht(publishDate: string): boolean {
  return publishDate <= heuteIso();
}

function leseFrontmatter(file: string): PostMeta {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    metaDescription: data.metaDescription ?? "",
    publishDate: data.publishDate ?? "1970-01-01",
    persona: data.persona,
  };
}

/** Nur veroeffentlichte Beitraege (publishDate <= heute), neueste zuerst. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(leseFrontmatter)
    .filter((post) => istVeroeffentlicht(post.publishDate))
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

/** Veroeffentlichte Beitraege zu einer bestimmten Persona, neueste zuerst. */
export function getPostsByPersona(persona: Persona): PostMeta[] {
  return getAllPosts().filter((post) => post.persona === persona);
}

/**
 * Liefert einen Beitrag nur, wenn er existiert UND sein publishDate bereits
 * erreicht ist - vorher soll die Route wie nicht vorhanden behandelt werden
 * (404), obwohl die Datei schon im Repository liegt.
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const meta = leseFrontmatter(`${slug}.md`);
  if (!istVeroeffentlicht(meta.publishDate)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const contentHtml = marked.parse(content, { async: false }) as string;

  return { ...meta, contentHtml };
}
