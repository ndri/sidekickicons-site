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
