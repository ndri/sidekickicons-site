import { expect, test } from "vitest";
import icons from "../icons/allicons";
import { sidekickiconsVersion } from "../server/version";
import { iconHistory, noteSegments, sidekickiconReleases } from "./releaseHistory";

const icon = (name: string) => icons.find((icon) => icon.kebabName === name)!;
const rerun = "run `node scripts/release-history.mjs` after a Sidekickicons release";

test("the release history covers the installed Sidekickicons version", () => {
  expect(sidekickiconReleases[0].version, rerun).toBe(sidekickiconsVersion());
});

test("every icon was added in some release", () => {
  for (const icon of icons) {
    const added = iconHistory(icon).filter((event) => event.kind === "added");
    expect(added, `${icon.kebabName}: ${rerun}`).toHaveLength(1);
  }
});

test("redraws show each changed style before and after", () => {
  const dice = iconHistory(icon("dice")).find(
    (event) => event.kind === "changed" && event.release.version === "0.16.0",
  );
  expect(dice?.kind === "changed" && dice.drawings.map((d) => d.type)).toEqual([
    "outline24",
    "solid24",
    "solid20",
    "solid16",
  ]);
  // The latest redraw ends at the icon as it is now
  if (dice?.kind === "changed")
    expect(dice.drawings[0].after).toBe(icon("dice").outline24);
});

test("renames are followed back to the old name", () => {
  const events = iconHistory(icon("exclamation-triangle"));
  expect(events.find((event) => event.kind === "renamed")).toMatchObject({
    from: "exclaimation-triangle",
  });
  expect(events[0]).toMatchObject({ kind: "added", release: { version: "2.0.0" } });
});

test("changelog lines become text, code and links", () => {
  expect(
    noteSegments("Fix `minus` alignment ([0a88242](https://example.com))"),
  ).toEqual([
    { kind: "text", text: "Fix " },
    { kind: "code", text: "minus" },
    { kind: "text", text: " alignment (" },
    { kind: "link", text: "0a88242", href: "https://example.com" },
    { kind: "text", text: ")" },
  ]);
});
