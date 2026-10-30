import icons from "$lib/icons/allicons";
import { iconPagePath, siteUrl } from "$lib/util/iconPages";

export const prerender = true;

const pages = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/icons", changeFrequency: "monthly", priority: 0.8 },
  { path: "/missing-heroicons", changeFrequency: "monthly", priority: 0.9 },
  ...icons.map((icon) => ({
    path: iconPagePath(icon.kebabName),
    changeFrequency: "monthly",
    priority: icon.iconset === "Sidekickicons" ? 0.7 : 0.5,
  })),
];

export function GET() {
  const lastModified = new Date().toISOString();
  const urls = pages.map(
    (page) => `<url>
<loc>${siteUrl}${page.path}</loc>
<lastmod>${lastModified}</lastmod>
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
