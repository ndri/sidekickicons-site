import type { FullHeroicon, HeroiconType } from "../types";
import { iconDirectories, iconTypes } from "./constants";
import { iconDescription, iconPagePath, siteUrl } from "./iconPages";

// Text and data for AI assistants and other tools: /llms.txt, /llms-full.txt, /icons.json
// and the plain SVG files under /svg

// The text files are plain ASCII, so they read correctly even when a tool fetches them
// without a charset. Icon descriptions can contain "×", as in "2×2".
const ascii = (text: string) => text.replaceAll("×", "x");

export function svgPath(kebabName: string, type: HeroiconType) {
  return `/svg/${iconDirectories[type]}/${kebabName}.svg`;
}

function counts(icons: FullHeroicon[]) {
  const sidekickicons = icons.filter((icon) => icon.iconset === "Sidekickicons").length;
  return {
    total: icons.length,
    sidekickicons,
    heroicons: icons.length - sidekickicons,
  };
}

function overview(icons: FullHeroicon[], version: string) {
  const { total, sidekickicons, heroicons } = counts(icons);

  return `# Sidekickicons

> Sidekickicons are ${sidekickicons} fanmade icons in the Heroicons style, for icons Heroicons doesn't have, like keyboard, H4 to H6, video call states and loading spinners. They come in the same four styles and sizes as Heroicons and work next to it in React, Vue, Svelte and React Native.

Heroicons hasn't added new icons since version 2.2.0. ${siteUrl} lets you search all ${total} icons: ${heroicons} Heroicons and ${sidekickicons} Sidekickicons. The current Sidekickicons version is ${version}. Sidekickicons are MIT-licensed like Heroicons, and are made by Andri Soone, not by Tailwind Labs.

## Styles

Every icon comes in four styles. Each style is a directory in every package:

- Outline: 24x24, 1.5 px stroke, \`24/outline\`. Use at 24 px (Tailwind \`size-6\`).
- Solid: 24x24, solid fill, \`24/solid\`. Use at 24 px (\`size-6\`).
- Mini: 20x20, solid fill, \`20/solid\`. Use at 20 px (\`size-5\`), for buttons and inputs.
- Micro: 16x16, solid fill, \`16/solid\`. Use at 16 px (\`size-4\`), for badges and small text.

Component names are the icon name in PascalCase followed by \`Icon\`: \`crown\` is \`CrownIcon\`, \`arrow-path-clock\` is \`ArrowPathClockIcon\`.

## Using the icons

### React

Heroicons and Sidekickicons are separate packages with the same API:

\`\`\`bash
npm install @heroicons/react @sidekickicons/react
\`\`\`

\`\`\`jsx
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { CrownIcon } from "@sidekickicons/react/24/outline";

<CrownIcon className="size-6 text-slate-500" />
\`\`\`

### Vue

\`\`\`bash
npm install @heroicons/vue @sidekickicons/vue
\`\`\`

\`\`\`vue
<script setup>
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import { CrownIcon } from "@sidekickicons/vue/24/outline";
</script>

<template>
  <CrownIcon class="size-6 text-slate-500" />
</template>
\`\`\`

### Svelte

Heroicons has no official Svelte package, so \`@sidekickicons/svelte\` includes both Heroicons and Sidekickicons. It needs Svelte 5.19 or later. The components already have their default size.

\`\`\`bash
npm install @sidekickicons/svelte
\`\`\`

\`\`\`svelte
<script>
  import { ChartBarIcon, CrownIcon } from "@sidekickicons/svelte/24/outline";
</script>

<CrownIcon class="text-slate-500" />
\`\`\`

### React Native

Heroicons has no official React Native package either, so \`@sidekickicons/react-native\` includes both. It draws icons with react-native-svg (in Expo, install it with \`npx expo install react-native-svg\`).

\`\`\`bash
npm install @sidekickicons/react-native react-native-svg
\`\`\`

\`\`\`jsx
import { ChartBarIcon, CrownIcon } from "@sidekickicons/react-native/24/outline";

<CrownIcon size={24} color="#64748b" />
\`\`\`

### Plain SVG

Every icon is available as an SVG file at \`${siteUrl}/svg/{style directory}/{icon name}.svg\`, for example ${siteUrl}${svgPath("crown", "outline24")}. The SVGs use \`currentColor\`, so they take the surrounding text color.`;
}

export function llmsTxt(icons: FullHeroicon[], version: string) {
  return `${overview(icons, version)}

## Icons

- [Full icon list](${siteUrl}/llms-full.txt): every icon with its component name, keywords and description
- [icons.json](${siteUrl}/icons.json): the same as machine-readable JSON, with links to each icon's SVG files
- [All icons](${siteUrl}/icons): a page for every icon, with code and examples
- [Icons missing from Heroicons](${siteUrl}/missing-heroicons): every Sidekickicon, grouped by use

## Optional

- [Sidekickicons on GitHub](https://github.com/ndri/sidekickicons): source, changelog and roadmap
- [Suggest an icon](https://github.com/ndri/sidekickicons/discussions/new?category=icon-suggestions)
- [Heroicons](https://heroicons.com): the official Heroicons site
`;
}

function iconLine(icon: FullHeroicon, withDescription: boolean) {
  const keywords = icon.keywords.length
    ? ` Keywords: ${icon.keywords.join(", ")}.`
    : "";
  const description = withDescription ? ` ${ascii(iconDescription(icon))}` : "";
  return `- \`${icon.kebabName}\` (${icon.componentName}):${description}${keywords} ${siteUrl}${iconPagePath(icon.kebabName)}`;
}

export function llmsFullTxt(icons: FullHeroicon[], version: string) {
  const { sidekickicons, heroicons } = counts(icons);
  const sidekickiconLines = icons
    .filter((icon) => icon.iconset === "Sidekickicons")
    .map((icon) => iconLine(icon, true));
  const heroiconLines = icons
    .filter((icon) => icon.iconset === "Heroicons")
    .map((icon) => iconLine(icon, false));

  return `${overview(icons, version)}

## All Sidekickicons (${sidekickicons})

Import these from \`@sidekickicons/*\` in every framework.

${sidekickiconLines.join("\n")}

## All Heroicons (${heroicons})

Import these from \`@heroicons/react\` or \`@heroicons/vue\`, or from \`@sidekickicons/svelte\` or \`@sidekickicons/react-native\`.

${heroiconLines.join("\n")}
`;
}

export function iconsJson(icons: FullHeroicon[], version: string) {
  return {
    version,
    site: siteUrl,
    styles: Object.fromEntries(iconTypes.map((type) => [type, iconDirectories[type]])),
    icons: icons.map((icon) => ({
      name: icon.kebabName,
      component: icon.componentName,
      iconset: icon.iconset,
      keywords: icon.keywords,
      description: iconDescription(icon),
      page: siteUrl + iconPagePath(icon.kebabName),
      svg: Object.fromEntries(
        iconTypes.map((type) => [type, siteUrl + svgPath(icon.kebabName, type)]),
      ),
    })),
  };
}
