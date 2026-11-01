#!/usr/bin/env node
// Writes src/lib/data/releaseHistory.json: for every Sidekickicons and Heroicons 2 release,
// which icons were added, renamed, redrawn or got a new style, with the changelog lines that
// explain it. The icon pages' history sections and the What's new page are built from it.
//
// Run it after each Sidekickicons release: node scripts/release-history.mjs
// Sources: the git tags of ../sidekickicons (built SVGs in optimized/), and every
// heroicons 2.x package from npm (downloaded once into node_modules/.cache).
//
// Icons are compared by rendering them at twice their intended size, as on a retina
// screen. Regenerating paths without changing the drawing (Sidekickicons 0.16.0 did that
// to every icon) then doesn't count as a change, while a visible redraw does.

import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const sidekickiconsRepo = resolve(process.env.SIDEKICKICONS_REPO ?? "../sidekickicons");
const cacheDir = resolve("node_modules/.cache/release-history");
const outFile = resolve("src/lib/data/releaseHistory.json");

const types = {
  outline24: "24/outline",
  solid24: "24/solid",
  solid20: "20/solid",
  solid16: "16/solid",
};
const renderWidth = { outline24: 48, solid24: 48, solid20: 40, solid16: 32 };
// Total alpha difference, in fully changed pixels, above which a redraw is visible
const visibleChange = 10;

const run = (cmd, args, options = {}) =>
  execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 1 << 28, ...options });

// ---------------------------------------------------------------- changelogs

// Keep a Changelog sections: version, date and the bullet lines (nested ones flattened)
function parseChangelog(text) {
  const releases = new Map();
  let current = null;
  let section = null;
  for (const line of text.split("\n")) {
    const heading = line.match(/^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})/);
    if (heading) {
      current = { version: heading[1], date: heading[2], notes: [] };
      releases.set(current.version, current);
      continue;
    }
    if (line.startsWith("## ")) current = null;
    const sub = line.match(/^### (\w+)/);
    if (sub) section = sub[1];
    const bullet = line.match(/^(\s*)- (.+)/);
    if (current && bullet) {
      const text = bullet[2].replace(/\(\[#\d+\]\([^)]*\)\)/g, "").trim();
      current.notes.push({ section, text, nested: bullet[1].length > 0 });
    }
  }
  return releases;
}

// The icon names a changelog line mentions: `name`, `name-*`, `solid/name`
function mentions(note, name) {
  for (const [, token] of note.text.matchAll(/`([^`]+)`/g)) {
    const bare = token.replace(/^(solid|outline|mini|micro)\//, "");
    if (bare === name) return true;
    if (bare.endsWith("*") && name.startsWith(bare.slice(0, -1))) return true;
  }
  return false;
}
// Lines about redrawing icons in general, used when no line names the icon itself: they
// name no icon, or name some and cover "a few others"
const generalRedraw = (note) =>
  /rebuil|redraw|redesign|stroke|clarity|consisten|pixel|grid|chevrons|gaps/i.test(
    note.text,
  ) &&
  (!/`[a-z0-9-]+\*?`/.test(note.text) || /\bothers\b|some icons/i.test(note.text));
const addsIcons = (note) => /^Add(ed)? (new|first|missing) icons/i.test(note.text);

// GitHub's anchor for "## [0.19.0] - 2026-11-01"
const changelogUrl = (base, release) =>
  `${base}#${release.version.replaceAll(".", "")}---${release.date}`;

// ---------------------------------------------------------------- icon sources

// Sidekickicons: { version: { type: { name: svg } } } from the git tags
function sidekickiconVersions() {
  const tags = run("git", ["-C", sidekickiconsRepo, "tag", "--sort=v:refname"])
    .split("\n")
    .filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag));
  const blobs = new Map();
  const versions = {};
  for (const tag of tags) {
    const version = {};
    for (const [type, dir] of Object.entries(types)) {
      version[type] = {};
      const listing = run("git", [
        "-C",
        sidekickiconsRepo,
        "ls-tree",
        "-r",
        tag,
        `optimized/${dir}`,
      ]);
      for (const line of listing.split("\n").filter(Boolean)) {
        const [meta, path] = line.split("\t");
        const id = meta.split(" ")[2];
        if (!blobs.has(id))
          blobs.set(id, run("git", ["-C", sidekickiconsRepo, "cat-file", "-p", id]));
        version[type][
          path
            .split("/")
            .pop()
            .replace(/\.svg$/, "")
        ] = blobs.get(id);
      }
    }
    versions[tag.slice(1)] = version;
  }
  return versions;
}

// Heroicons 2.x: the same shape, from the npm packages
function heroiconVersions() {
  const all = JSON.parse(run("npm", ["view", "heroicons", "versions", "--json"]));
  const versions = {};
  for (const v of all.filter((v) => /^2\.\d+\.\d+$/.test(v))) {
    const dir = join(cacheDir, `heroicons-${v}`);
    if (!existsSync(join(dir, "package"))) {
      mkdirSync(dir, { recursive: true });
      const file = run("npm", [
        "pack",
        `heroicons@${v}`,
        "--silent",
        "--pack-destination",
        dir,
      ]).trim();
      run("tar", ["-xzf", join(dir, file), "-C", dir]);
    }
    const version = {};
    for (const [type, typeDir] of Object.entries(types)) {
      version[type] = {};
      const path = join(dir, "package", typeDir);
      if (!existsSync(path)) continue; // micro arrived in 2.1.0
      for (const file of readdirSync(path).filter((f) => f.endsWith(".svg")))
        version[type][file.replace(/\.svg$/, "")] = readFileSync(
          join(path, file),
          "utf8",
        );
    }
    versions[v] = version;
  }
  return versions;
}

// ---------------------------------------------------------------- comparing

// Some old drawings have a hard-coded color (Heroicons 2.1.0's broken mini chevrons);
// the site draws them in its own colors like every other icon
const themeColored = (svg) =>
  svg.replace(/(fill|stroke)="#[0-9a-fA-F]{3,8}"/g, '$1="currentColor"');

const renders = new Map();
function alpha(svg, type) {
  const key = type + svg;
  if (!renders.has(key)) {
    // Icons have no text, and loading the system fonts for every render is slow
    const { pixels } = new Resvg(svg, {
      fitTo: { mode: "width", value: renderWidth[type] },
      font: { loadSystemFonts: false },
    }).render();
    const out = new Uint8Array(pixels.length / 4);
    for (let i = 0; i < out.length; i++) out[i] = pixels[i * 4 + 3];
    renders.set(key, out);
  }
  return renders.get(key);
}
function difference(a, b, type) {
  if (a === b) return 0;
  const x = alpha(a, type);
  const y = alpha(b, type);
  let sum = 0;
  for (let i = 0; i < x.length; i++) sum += Math.abs(x[i] - y[i]);
  return sum / 255;
}

function compare(iconset, versions, changelog, changelogBase) {
  const releases = [];
  const ordered = Object.keys(versions);
  for (let i = 0; i < ordered.length; i++) {
    const version = ordered[i];
    const now = versions[version];
    const before = i ? versions[ordered[i - 1]] : null;
    const log = changelog.get(version) ?? { version, date: null, notes: [] };
    const names = (v) => new Set(Object.keys(v?.outline24 ?? {}));
    const nowNames = names(now);
    const beforeNames = names(before);

    let added = [...nowNames].filter((n) => !beforeNames.has(n));
    let removed = [...beforeNames].filter((n) => !nowNames.has(n));

    // A removed and an added icon that look the same are a rename
    const renamed = [];
    for (const from of [...removed]) {
      const to = added.find(
        (n) =>
          difference(before.outline24[from], now.outline24[n], "outline24") <
          visibleChange,
      );
      if (to) {
        renamed.push({ from, to });
        added = added.filter((n) => n !== to);
        removed = removed.filter((n) => n !== from);
      }
    }

    const changed = [];
    const newStyles = {};
    for (const name of nowNames) {
      const previousName = renamed.find((r) => r.to === name)?.from ?? name;
      if (!beforeNames.has(previousName)) continue;
      const specific = log.notes.filter(
        (note) => mentions(note, name) && !addsIcons(note),
      );
      const visible = [];
      const invisible = [];
      for (const type of Object.keys(types)) {
        const a = before[type][previousName];
        const b = now[type][name];
        if (!b) continue;
        if (!a) {
          (newStyles[type] ??= []).push(name);
          continue;
        }
        if (a === b) continue;
        (difference(a, b, type) >= visibleChange ? visible : invisible).push(type);
      }
      if (!visible.length && !(invisible.length && specific.length)) continue;
      const notes = specific.length ? specific : log.notes.filter(generalRedraw);
      changed.push({
        name,
        types: visible.length ? visible : invisible,
        visible: visible.length > 0,
        notes: notes.map((note) => note.text),
        // The drawing before the change, for a before and after on the icon page
        before: Object.fromEntries(
          visible.map((type) => [type, themeColored(before[type][previousName])]),
        ),
      });
    }

    if (
      !added.length &&
      !removed.length &&
      !renamed.length &&
      !changed.length &&
      !Object.keys(newStyles).length
    )
      continue;
    releases.push({
      iconset,
      version,
      date: log.date,
      url: log.date ? changelogUrl(changelogBase, log) : null,
      first: i === 0,
      // With their changelog section: Added, Changed, Fixed, Removed
      notes: log.notes,
      added: added.sort(),
      removed: removed.sort(),
      renamed,
      newStyles,
      changed,
    });
  }
  return releases;
}

// ---------------------------------------------------------------- main

mkdirSync(cacheDir, { recursive: true });
const heroiconsChangelog = join(cacheDir, "heroicons-CHANGELOG.md");
if (!existsSync(heroiconsChangelog)) {
  const response = await fetch(
    "https://raw.githubusercontent.com/tailwindlabs/heroicons/master/CHANGELOG.md",
  );
  if (!response.ok) throw new Error(`Heroicons changelog: HTTP ${response.status}`);
  writeFileSync(heroiconsChangelog, await response.text());
}

const releases = [
  ...compare(
    "Sidekickicons",
    sidekickiconVersions(),
    parseChangelog(readFileSync(join(sidekickiconsRepo, "CHANGELOG.md"), "utf8")),
    "https://github.com/ndri/sidekickicons/blob/main/CHANGELOG.md",
  ),
  ...compare(
    "Heroicons",
    heroiconVersions(),
    parseChangelog(readFileSync(heroiconsChangelog, "utf8")),
    "https://github.com/tailwindlabs/heroicons/blob/master/CHANGELOG.md",
  ),
].sort(
  (a, b) =>
    (b.date ?? "").localeCompare(a.date ?? "") ||
    b.version.localeCompare(a.version, undefined, { numeric: true }),
);

writeFileSync(outFile, JSON.stringify({ releases }, null, 1) + "\n");
for (const r of releases)
  console.log(
    `${r.iconset} ${r.version} ${r.date}: +${r.added.length} -${r.removed.length} renamed ${r.renamed.length} changed ${r.changed.length} (${r.changed.filter((c) => c.visible).length} visible) newStyles ${Object.entries(
      r.newStyles,
    )
      .map(([t, n]) => `${t}:${n.length}`)
      .join(",")}`,
  );
