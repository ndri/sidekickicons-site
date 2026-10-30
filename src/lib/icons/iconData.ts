import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";
import type { HeroiconType, Iconset } from "../types";
import { removeEnd, toKebabCase } from "../util/util";

// Extracts the SVG markup of every icon from @sidekickicons/svelte at build time and
// serves it as the virtual:icon-data module. The package also contains Heroicons, so
// the official heroicons package is used to tell the two iconsets apart.

const virtualId = "virtual:icon-data";
const resolvedVirtualId = "\0" + virtualId;

const svelteDirectories: Record<HeroiconType, string> = {
  outline24: "24/outline",
  solid24: "24/solid",
  solid20: "20/solid",
  solid16: "16/solid",
};

function svgMarkup(svelteSource: string) {
  const svg = svelteSource.match(/<svg[\s\S]*<\/svg>/)?.[0];
  if (!svg) throw new Error("No <svg> element found");
  return svg.replace(/ class=\{[^}]*\}/, "");
}

function heroiconNames() {
  const directory = resolve("node_modules/heroicons/24/outline");
  return new Set(readdirSync(directory).map((file) => file.replace(/\.svg$/, "")));
}

function loadIcons() {
  const heroicons = heroiconNames();
  const icons: Record<Iconset, Record<HeroiconType, Record<string, string>>> = {
    Heroicons: { outline24: {}, solid24: {}, solid20: {}, solid16: {} },
    Sidekickicons: { outline24: {}, solid24: {}, solid20: {}, solid16: {} },
  };

  for (const [type, path] of Object.entries(svelteDirectories)) {
    const directory = resolve("node_modules/@sidekickicons/svelte/dist", path);
    for (const file of readdirSync(directory)) {
      if (!file.endsWith(".svelte")) continue;
      const componentName = file.replace(/\.svelte$/, "");
      const svg = svgMarkup(readFileSync(resolve(directory, file), "utf8"));
      const kebabName = toKebabCase(removeEnd(componentName, "Icon"));
      const iconset = heroicons.has(kebabName) ? "Heroicons" : "Sidekickicons";
      icons[iconset][type as HeroiconType][componentName] = svg;
    }
  }

  return icons;
}

export default function iconData(): Plugin {
  return {
    name: "icon-data",
    resolveId(id) {
      if (id === virtualId) return resolvedVirtualId;
    },
    load(id) {
      if (id === resolvedVirtualId)
        return `export default ${JSON.stringify(loadIcons())};`;
    },
  };
}
