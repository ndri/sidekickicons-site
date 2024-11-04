export function toPascalCase(str: string) {
  return str
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

export function toKebabCase(str: string) {
  return str
    .split(/(?=[A-Z])|(?<=[a-z])(?=[0-9])/)
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

export function omitKeys<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}
