import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// The installed Sidekickicons version, read at build time
export function sidekickiconsVersion(): string {
  const packageJson = resolve("node_modules/@sidekickicons/svelte/package.json");
  return JSON.parse(readFileSync(packageJson, "utf8")).version;
}
