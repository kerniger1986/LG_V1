import type { MetadataRoute } from "next";
import { locations } from "@/lib/locations";
import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site-url";

// publishDate-gesteuerte Ratgeber-Beitraege muessen ohne Redeploy aus der
// Sitemap verschwinden/erscheinen koennen, daher bei jedem Request neu bauen.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const statischeSeiten = [
    "",
    "/immobilie-verkaufen/erbschaft",
    "/immobilie-verkaufen/ruhestand",
    ...locations.map((l) => `/immobilie-verkaufen/${l.slug}`),
    "/ratgeber",
    "/impressum",
    "/datenschutz",
  ].map((pfad) => ({
    url: `${base}${pfad}`,
    lastModified: new Date(),
  }));

  const ratgeberSeiten = getAllPosts().map((post) => ({
    url: `${base}/ratgeber/${post.slug}`,
    lastModified: new Date(post.publishDate),
  }));

  return [...statischeSeiten, ...ratgeberSeiten];
}
