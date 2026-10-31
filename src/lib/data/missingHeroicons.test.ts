import { expect, test } from "vitest";
import icons from "../icons/allicons";
import {
  comingNext,
  heroiconsPairings,
  heroiconsRequests,
  sidekickiconGroups,
} from "./missingHeroicons";

const sidekickicons = icons
  .filter((icon) => icon.iconset === "Sidekickicons")
  .map((icon) => icon.kebabName);

test("every Sidekickicon is in exactly one group", () => {
  const grouped = sidekickiconGroups.flatMap((group) => group.icons);
  expect(grouped.toSorted()).toEqual(sidekickicons.toSorted());
});

test("pairing notes and Heroicons requests are for Sidekickicons", () => {
  for (const name of [
    ...Object.keys(heroiconsPairings),
    ...Object.keys(heroiconsRequests),
  ]) {
    expect(sidekickicons, name).toContain(name);
  }
});

test("icons listed as coming next don't exist yet", () => {
  const names = icons.map((icon) => icon.kebabName);
  for (const { name } of comingNext) expect(names, name).not.toContain(name);
});
