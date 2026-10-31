import { expect, test } from "vitest";
import icons from "../icons/allicons";
import { iconsJson, llmsFullTxt, llmsTxt, svgPath } from "./llms";

test("the full list and icons.json include every icon", () => {
  const full = llmsFullTxt(icons, "1.0.0");
  for (const icon of icons) {
    expect(full, icon.kebabName).toContain(
      `\`${icon.kebabName}\` (${icon.componentName})`,
    );
  }
  const json = iconsJson(icons, "1.0.0");
  expect(json.icons.length).toBe(icons.length);
  expect(json.icons.find((icon) => icon.name === "crown")?.svg.solid16).toBe(
    "https://sidekickicons.com/svg/16/solid/crown.svg",
  );
});

test("SVG paths follow the package directories", () => {
  expect(svgPath("arrow-path-clock", "outline24")).toBe(
    "/svg/24/outline/arrow-path-clock.svg",
  );
});

test("the text files are plain ASCII", () => {
  for (const text of [llmsTxt(icons, "1.0.0"), llmsFullTxt(icons, "1.0.0")]) {
    expect(text.match(/[^\x00-\x7F]/g)).toBeNull();
  }
});
