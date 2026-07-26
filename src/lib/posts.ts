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

export type ContentSegment =
  | { type: "html"; html: string }
  | { type: "component"; token: string };

export interface Post extends PostMeta {
  segments: ContentSegment[];
}

const personaLabels: Record<Persona, string> = {
  erbschaft: "Für Erben",
  ruhestand: "Für den Ruhestand",
};

/** Anzeigename fuer das Kategorie-Badge - "Allgemein" fuer Beitraege ohne Persona. */
export function getPersonaLabel(persona?: Persona): string {
  return persona ? personaLabels[persona] : "Allgemein";
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
  const segments = parseSegments(content);

  return { ...meta, segments };
}

// Markdown-Body kann Marker der Form [[COMPONENT:token]] auf eigener Zeile
// enthalten, um an dieser Stelle eine interaktive React-Komponente statt
// reinem HTML einzublenden (siehe src/components/ratgeber/article-embeds.tsx).
const COMPONENT_MARKER = /^\[\[COMPONENT:([a-z0-9-]+)\]\]$/;

function parseSegments(content: string): ContentSegment[] {
  const zeilen = content.split("\n");
  const segments: ContentSegment[] = [];
  let puffer: string[] = [];

  function pufferSchreiben() {
    const markdown = puffer.join("\n").trim();
    if (markdown) {
      segments.push({
        type: "html",
        html: marked.parse(markdown, { async: false }) as string,
      });
    }
    puffer = [];
  }

  for (const zeile of zeilen) {
    const match = zeile.trim().match(COMPONENT_MARKER);
    if (match) {
      pufferSchreiben();
      segments.push({ type: "component", token: match[1] });
    } else {
      puffer.push(zeile);
    }
  }
  pufferSchreiben();

  return segments;
}
