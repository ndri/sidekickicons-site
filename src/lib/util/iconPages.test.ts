import { expect, test } from "vitest";
import icons from "../icons/allicons";
import {
  iconDescription,
  iconStructuredData,
  iconTitle,
  jsonForScript,
  relatedIcons,
} from "./iconPages";
import { sidekickiconDescriptions } from "../data/descriptions";
import { exampleText } from "../data/exampleText";

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

test("every icon has example text, and every example text belongs to an icon", () => {
  const names = new Set(icons.map((icon) => icon.kebabName));
  for (const name of Object.keys(exampleText)) expect(names.has(name), name).toBe(true);
  for (const name of names) expect(exampleText[name], name).toBeDefined();
});

test("structured data credits the right creator and escapes the JSON for a script", () => {
  const creator = (name: string) => {
    const [image] = iconStructuredData(icon(name), "https://example.com/x.svg")[
      "@graph"
    ];
    return image && "creator" in image ? image.creator?.name : undefined;
  };
  expect(creator("academic-cap")).toBe("Tailwind Labs");
  expect(creator("face-meh")).toBe("schoberg");
  expect(creator("crown")).toBe("Andri Soone");
  expect(jsonForScript({ text: "</script>" })).not.toContain("</");
});
