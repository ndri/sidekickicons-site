export function toKebabCase(str: string): string {
  return (
    str
      // First handle the 2X2 pattern by converting X to x
      .replace(/(\d)[X](\d)/g, "$1x$2")
      // Convert dimension suffixes (2D, 3D) to lowercase without space
      .replace(/(\d)(D)$/g, "$1d")
      // Add space before capital letters, except in heading tags
      .replace(/(?!^H\d$)([A-Z])/g, " $1")
      // Add space before numbers unless preceded by x or in heading tags
      .replace(/(?<!x)(?<!^H)(\d)/g, " $1")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
  );
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

export function omitKeys<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}
