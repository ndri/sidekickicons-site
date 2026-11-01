import { iconPagePath, siteUrl } from "$lib/util/iconPages";
import {
  listsAddedIcons,
  noteSegments,
  sidekickiconReleases,
  type Release,
} from "$lib/util/releaseHistory";

// An Atom feed of Sidekickicons releases, one entry per release, linking to /whats-new
export const prerender = true;

const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const iconLinks = (names: string[]) =>
  names
    .map((name) => `<a href="${siteUrl}${iconPagePath(name)}">${escape(name)}</a>`)
    .join(", ");

const noteHtml = (note: string) =>
  noteSegments(note)
    .map((segment) =>
      segment.kind === "code"
        ? `<code>${escape(segment.text)}</code>`
        : segment.kind === "link"
          ? `<a href="${escape(segment.href)}">${escape(segment.text)}</a>`
          : escape(segment.text),
    )
    .join("");

function title(release: Release) {
  const redrawn = release.changed.filter((change) => change.visible).length;
  const parts = [
    release.added.length &&
      `${release.added.length} new icon${release.added.length === 1 ? "" : "s"}`,
    redrawn && `${redrawn} redrawn`,
  ].filter(Boolean);
  return `Sidekickicons ${release.version}${parts.length ? `: ${parts.join(", ")}` : ""}`;
}

function content(release: Release) {
  const redrawn = release.changed.filter((change) => change.visible).map((c) => c.name);
  const notes = release.notes.filter((note) => !listsAddedIcons(note.text));
  return [
    release.added.length && `<p>New icons: ${iconLinks(release.added)}</p>`,
    redrawn.length && `<p>Redrawn: ${iconLinks(redrawn)}</p>`,
    notes.length &&
      `<ul>${notes.map((note) => `<li>${note.section ? `${escape(note.section)}: ` : ""}${noteHtml(note.text)}</li>`).join("")}</ul>`,
    `<p><a href="${escape(release.url)}">Changelog</a></p>`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function GET() {
  const page = `${siteUrl}/whats-new`;
  const entries = sidekickiconReleases.map((release) => {
    const link = `${page}#sidekickicons-${release.version}`;
    return `<entry>
<title>${escape(title(release))}</title>
<link href="${link}"/>
<id>${link}</id>
<updated>${release.date}T00:00:00Z</updated>
<content type="html">${escape(content(release))}</content>
</entry>`;
  });

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>Sidekickicons releases</title>
<subtitle>New and redrawn icons in every Sidekickicons release</subtitle>
<link href="${siteUrl}/whats-new.xml" rel="self"/>
<link href="${page}"/>
<id>${page}</id>
<updated>${sidekickiconReleases[0].date}T00:00:00Z</updated>
<author><name>Andri Soone</name></author>
${entries.join("\n")}
</feed>
`;

  return new Response(feed, { headers: { "Content-Type": "application/atom+xml" } });
}
