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

export function dashesToSpaces(str: string) {
  return str.replace(/-/g, " ");
}

export function sortedByStringKey<T>(array: readonly T[], key: keyof T) {
  return array.toSorted((a, b) => String(a[key]).localeCompare(String(b[key])));
}

export function removeEnd(str: string, end: string) {
  return str.endsWith(end) ? str.slice(0, -end.length) : str;
}

export function generateFullHeroicons(
  icons: {
    outline24: NamedHeroicons;
    solid24: NamedHeroicons;
    solid20: NamedHeroicons;
    solid16: NamedHeroicons;
  },
  keywords: { [key: string]: readonly string[] },
  iconset: FullHeroicon["iconset"],
): FullHeroicon[] {
  const fullIcons = Object.keys(icons.outline24).map((componentName) => {
    const pascalName = removeEnd(componentName, "Icon");
    const kebabName = toKebabCase(pascalName);
    return {
      kebabName,
      pascalName,
      componentName,
      keywords: keywords[kebabName] || ([] as string[]),
      iconset,
      outline24: icons.outline24[componentName],
      solid24: icons.solid24[componentName],
      solid20: icons.solid20[componentName],
      solid16: icons.solid16[componentName],
    };
  });

  return fullIcons;
}

export function omitKeys<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}
