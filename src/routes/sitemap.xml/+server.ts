import icons from "$lib/icons/allicons";
import { iconPagePath, siteUrl } from "$lib/util/iconPages";
import { iconHistory, releases } from "$lib/util/releaseHistory";

export const prerender = true;

// The last change to the icon page itself. Move it forward when every icon page gets new
// content, so search engines know to look at them again.
const iconPagesUpdated = "2026-11-02";

// Pages that list icons change with each release
const latestRelease = releases
  .map((release) => release.date)
  .sort()
  .at(-1)!;

const latest = (...dates: string[]) => dates.sort().at(-1)!;

const pages = [
  { path: "", lastModified: latestRelease, changeFrequency: "monthly", priority: 1 },
  {
    path: "/icons",
    lastModified: latestRelease,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/missing-heroicons",
    lastModified: latestRelease,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/svelte",
    lastModified: latestRelease,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/react-native",
    lastModified: latestRelease,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/whats-new",
    lastModified: latestRelease,
    changeFrequency: "weekly",
    priority: 0.6,
  },
  ...icons.map((icon) => ({
    path: iconPagePath(icon.kebabName),
    // The icon's newest release event: added, renamed, redrawn or a new style
    lastModified: latest(iconPagesUpdated, iconHistory(icon)[0].release.date),
    changeFrequency: "monthly",
    priority: icon.iconset === "Sidekickicons" ? 0.7 : 0.5,
  })),
];

export function GET() {
  const urls = pages.map(
    (page) => `<url>
<loc>${siteUrl}${page.path}</loc>
<lastmod>${page.lastModified}</lastmod>
<changefreq>${page.changeFrequency}</changefreq>
<priority>${page.priority}</priority>
</url>`,
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, { headers: { "Content-Type": "application/xml" } });
}
