export const prerender = true;

const pages = [
  { url: "https://sidekickicons.com", changeFrequency: "monthly", priority: 1 },
];

export function GET() {
  const lastModified = new Date().toISOString();
  const urls = pages.map(
    (page) => `<url>
<loc>${page.url}</loc>
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
