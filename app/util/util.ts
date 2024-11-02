import { NamedHeroicons, FullHeroicon } from "../types";

export function toPascalCase(str: string) {
  return str
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

export function toKebabCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .map((part) => part.toLowerCase())
    .join("-");
}

export function sortedByStringKey<T>(array: readonly T[], key: keyof T) {
  return array.toSorted((a, b) => String(a[key]).localeCompare(String(b[key])));
}

export function generateFullHeroicons(
  icons: {
    outline24: NamedHeroicons;
    solid24: NamedHeroicons;
    solid20: NamedHeroicons;
    solid16: NamedHeroicons;
  },
  keywords: { [key: string]: string[] },
  iconset: FullHeroicon["iconset"]
) {
  const fullIcons = Object.keys(icons.outline24).map((componentName) => {
    const pascalName = componentName.replace("Icon", "");
    const kebabName = toKebabCase(pascalName);
    return {
      kebabName,
      pascalName,
      componentName,
      keywords: keywords[kebabName] || [],
      iconset,
      outline24: icons.outline24[componentName],
      solid24: icons.solid24[componentName],
      solid20: icons.solid20[componentName],
      solid16: icons.solid16[componentName],
    };
  });

  return fullIcons;
}
