import { expect, test } from "vitest";
import icons from "../icons/allicons";
import { coloredSvg } from "./download";

const crown = icons.find((icon) => icon.kebabName === "crown")!;

test("downloaded SVGs get the chosen color and size", () => {
  const svg = coloredSvg(crown.outline24, {
    color: "#4f39f6",
    size: 64,
    background: null,
  });
  expect(svg).not.toContain("currentColor");
  expect(svg).toContain('stroke="#4f39f6"');
  expect(svg).toMatch(/^<svg width="64" height="64"/);
  expect(svg).not.toContain("<rect");
});

test("a background doesn't take the icon's stroke", () => {
  const svg = coloredSvg(crown.outline24, {
    color: "currentColor",
    size: 24,
    background: "#ffffff",
  });
  expect(svg).toContain('stroke="currentColor"');
  expect(svg).toMatch(/^<svg[^>]*><rect [^>]*fill="#ffffff" stroke="none"\/>/);
});
