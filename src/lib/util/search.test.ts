import { expect, test } from "vitest";
import icons from "../icons/allicons";
import { americanSpelling, searchIcons } from "./search";

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
