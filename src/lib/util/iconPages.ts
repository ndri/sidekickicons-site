import type { FullHeroicon } from "../types";
import authors from "../data/authors.json";
import { sidekickiconDescriptions } from "../data/descriptions";
import { exampleText } from "../data/exampleText";
import { dashesToSpaces } from "./util";

export const siteUrl = "https://sidekickicons.com";

export function iconPagePath(kebabName: string) {
  return `/icons/${kebabName}`;
}

export function iconShareImagePath(kebabName: string) {
  return `/og/icons/${kebabName}.png`;
}

// "arrow-path-clock" -> "Arrow Path Clock", "h4" -> "H4"
export function iconTitle(kebabName: string) {
  return kebabName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function listToText(items: readonly string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

export function iconDescription(icon: FullHeroicon) {
  const written = sidekickiconDescriptions[icon.kebabName];
  if (written) return written.description;

  const name = iconTitle(icon.kebabName).toLowerCase();
  const uses = icon.keywords.length
    ? ` Use it for ${listToText(icon.keywords.slice(0, 4).map(dashesToSpaces))}.`
    : "";
  return `The ${name} icon from ${icon.iconset}, in outline, solid, mini and micro styles.${uses}`;
}

export function iconExampleText(icon: FullHeroicon) {
  const title = iconTitle(icon.kebabName);
  const [button, input, badge, nav] = exampleText[icon.kebabName] ?? [
    title,
    title,
    title,
    title,
  ];
  return { button, input, badge, nav };
}

export function iconMetaDescription(icon: FullHeroicon) {
  const packages =
    icon.iconset === "Sidekickicons"
      ? "a fanmade companion to Heroicons"
      : "with unofficial Svelte and React Native packages";
  return `${iconTitle(icon.kebabName)} icon (${icon.componentName}) for React, Vue, Svelte, React Native and SVG, ${packages}. ${iconDescription(icon)}`;
}

// Icons that share keywords or name parts with the given icon, best matches first
export function relatedIcons(icon: FullHeroicon, icons: FullHeroicon[], count = 12) {
  const keywords = new Set(icon.keywords);
  const nameParts = icon.kebabName.split("-");
  const firstNamePart = nameParts[0];

  return icons
    .filter((other) => other.kebabName !== icon.kebabName)
    .map((other) => {
      const otherParts = other.kebabName.split("-");
      const sharedKeywords = other.keywords.filter((k) => keywords.has(k)).length;
      const sharedNameParts = otherParts.filter((part) =>
        nameParts.includes(part),
      ).length;
      const sameFirstPart = otherParts[0] === firstNamePart ? 1 : 0;
      return { other, score: sharedKeywords * 2 + sharedNameParts + sameFirstPart };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) => b.score - a.score || a.other.kebabName.localeCompare(b.other.kebabName),
    )
    .slice(0, count)
    .map(({ other }) => other);
}

const iconAuthors = authors as Record<string, { author: string; authorLink: string }>;

// schema.org data for an icon page: the icon as an image with its license and creator,
// and the page's place in the site
export function iconStructuredData(icon: FullHeroicon, svgUrl: string) {
  const pageUrl = siteUrl + iconPagePath(icon.kebabName);
  const author = iconAuthors[icon.kebabName];
  const creator =
    icon.iconset === "Heroicons"
      ? {
          "@type": "Organization",
          name: "Tailwind Labs",
          url: "https://tailwindcss.com",
        }
      : author
        ? { "@type": "Person", name: author.author, url: author.authorLink }
        : { "@type": "Person", name: "Andri Soone", url: "https://andri.io" };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageObject",
        name: `${iconTitle(icon.kebabName)} icon`,
        description: iconDescription(icon),
        contentUrl: svgUrl,
        thumbnailUrl: siteUrl + iconShareImagePath(icon.kebabName),
        encodingFormat: "image/svg+xml",
        license: "https://opensource.org/licenses/MIT",
        acquireLicensePage: pageUrl,
        creditText: icon.iconset,
        creator,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Icons", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "All icons",
            item: `${siteUrl}/icons`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${iconTitle(icon.kebabName)} icon`,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

// JSON for a <script type="application/ld+json">: "<" can't end the script element early
export const jsonForScript = (data: unknown) =>
  JSON.stringify(data).replaceAll("<", "\\u003c");
