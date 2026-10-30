import { expect, test } from "vitest";
import icons from "../icons/allicons";
import { iconDescription, iconTitle, relatedIcons } from "./iconPages";
import { sidekickiconDescriptions } from "../data/descriptions";

const icon = (name: string) => icons.find((icon) => icon.kebabName === name)!;

test("iconTitle capitalises each word", () => {
  expect(iconTitle("arrow-path-clock")).toBe("Arrow Path Clock");
  expect(iconTitle("h4")).toBe("H4");
  expect(iconTitle("squares-2x2")).toBe("Squares 2x2");
});

test("every written description belongs to a Sidekickicon", () => {
  const sidekickicons = icons.filter((icon) => icon.iconset === "Sidekickicons");
  for (const name of Object.keys(sidekickiconDescriptions)) {
    expect(icon(name)?.iconset, name).toBe("Sidekickicons");
  }
  for (const { kebabName } of sidekickicons) {
    expect(sidekickiconDescriptions[kebabName], kebabName).toBeDefined();
  }
});

test("generated descriptions mention the iconset", () => {
  expect(iconDescription(icon("chart-bar"))).toContain("Heroicons");
  expect(iconDescription(icon("chart-bar"))).toContain("analytics");
});

test("related icons share keywords or name parts", () => {
  const related = relatedIcons(icon("pin"), icons).map((icon) => icon.kebabName);
  expect(related[0]).toBe("pin-slash");
  expect(related).not.toContain("pin");
  expect(relatedIcons(icon("arrow-down"), icons).length).toBe(12);
});
