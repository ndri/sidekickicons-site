import { expect, test } from "vitest";
import icons from "../icons/allicons";
import {
  americanSpelling,
  keywordMatchRanges,
  matchRanges,
  nameMatchRanges,
  searchIcons,
  searchIconsGrouped,
} from "./search";

const names = (query: string) =>
  searchIcons(icons, query).map((icon) => icon.kebabName);

test("British and American spellings find the same icons", () => {
  for (const [british, american] of [
    ["favourite", "favorite"],
    ["colour", "color"],
    ["grey", "gray"],
    ["cancelled", "canceled"],
    ["harbour", "harbor"],
    ["centre", "center"],
  ]) {
    expect(names(british), british).toEqual(names(american));
    expect(names(british).length, british).toBeGreaterThan(0);
  }
});

test("words that only look British are left alone", () => {
  for (const word of [
    "hour",
    "four",
    "your",
    "tour",
    "analysis",
    "promise",
    "exercise",
  ])
    expect(americanSpelling(word)).toBe(word);
});

test("spellings are changed inside longer queries", () => {
  expect(americanSpelling("Favourite Colours")).toBe("favorite colors");
  expect(americanSpelling("organise travelling")).toBe("organize traveling");
  expect(americanSpelling("grey dialogue centre")).toBe("gray dialog center");
});

test("direct matches come first, then loose name matches, then loose keyword matches", () => {
  const results = names("heart");
  expect(results.slice(0, 2)).toEqual(["heart", "heart-slash"]);
  // battery-75 only matches "heart" loosely through a keyword, so it comes after the
  // icons whose names match loosely
  expect(results.indexOf("battery-75")).toBeGreaterThan(
    results.indexOf("phone-arrow-up-right"),
  );
  expect(names("trsh").slice(0, 3)).toEqual([
    "trash",
    "trash-arrow-up",
    "trash-x-mark",
  ]);
});

test("each result says which group it's in", () => {
  const groups = searchIconsGrouped(icons, "heart").map(({ group }) => group);
  expect(groups).toEqual(["direct", "direct", "name", "name", "keyword"]);
  expect(new Set(searchIconsGrouped(icons, "cloud").map(({ group }) => group))).toEqual(
    new Set(["direct"]),
  );
});

// The highlighted parts of a text, in brackets
const marked = (text: string, ranges: [number, number][]) =>
  ranges.reduceRight(
    (out, [start, end]) =>
      out.slice(0, start) + "[" + out.slice(start, end) + "]" + out.slice(end),
    text,
  );

test("matches are highlighted where the search appears in a name", () => {
  expect(marked("calendar-plus", matchRanges("calendar-plus", "cal"))).toBe(
    "[cal]endar-plus",
  );
  expect(marked("user-check", matchRanges("user-check", "user check"))).toBe(
    "[user-check]",
  );
  expect(marked("user-check", matchRanges("user-check", "CHECK"))).toBe("user-[check]");
});

test("initials and loose letters are highlighted when the search isn't in the name", () => {
  expect(marked("academic-cap", matchRanges("academic-cap", "ac"))).toBe(
    "[ac]ademic-cap",
  );
  expect(marked("arrow-uturn-left", matchRanges("arrow-uturn-left", "aul"))).toBe(
    "[a]rrow-[u]turn-[l]eft",
  );
  expect(marked("trash", matchRanges("trash", "trsh"))).toBe("[tr]a[sh]");
  expect(marked("favourite", matchRanges("favourite", "favorite"))).toBe(
    "[favo]u[rite]",
  );
});

test("loose letters only show where the loose match happened", () => {
  expect(nameMatchRanges("trash", "trsh", "name")).not.toEqual([]);
  expect(nameMatchRanges("trash", "trsh", "direct")).toEqual([]);
  const keywords = ["power", "charge", "charging"];
  expect(keywordMatchRanges(keywords, "charg", "direct").map((r) => r.length)).toEqual([
    0, 1, 1,
  ]);
  expect(keywordMatchRanges(keywords, "pwr", "direct")).toEqual([[], [], []]);
  expect(keywordMatchRanges(keywords, "pwr", "keyword")[0]).not.toEqual([]);
});
