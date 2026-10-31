import { expect, test } from "vitest";
import icons from "./allicons";
import { iconTypes } from "../util/constants";
import {
  iconReactNativePlusImportCode,
  iconSvgCode,
  iconsetInstallCode,
  svgWithClass,
} from "../util/code";

test("every icon has SVG markup for every type", () => {
  expect(icons.some((icon) => icon.iconset === "Heroicons")).toBe(true);
  expect(icons.some((icon) => icon.iconset === "Sidekickicons")).toBe(true);
  for (const icon of icons) {
    for (const type of iconTypes) {
      expect(icon[type], `${icon.kebabName} ${type}`).toMatch(
        /^<svg [^>]*>[\s\S]*<\/svg>$/,
      );
      expect(icon[type]).not.toContain("class=");
      expect(icon[type]).not.toMatch(/^<svg[^>]* (width|height)=/);
    }
  }
});

test("svgWithClass adds the class to the svg element only", () => {
  const svg = '<svg viewBox="0 0 24 24">\n  <path d="M0 0"/>\n</svg>';
  expect(svgWithClass(svg, "size-6")).toBe(
    '<svg viewBox="0 0 24 24" class="size-6">\n  <path d="M0 0"/>\n</svg>',
  );
});

test("SVG code includes the size class", () => {
  const crown = icons.find((icon) => icon.kebabName === "crown")!;
  expect(iconSvgCode(crown, "solid16")).toContain('class="size-4"');
});

test("React Native code uses the package that includes Heroicons", () => {
  const academicCap = icons.find((icon) => icon.kebabName === "academic-cap")!;
  expect(iconReactNativePlusImportCode(academicCap, "solid20")).toBe(
    'import { AcademicCapIcon } from "@sidekickicons/react-native/20/solid";\n\n<AcademicCapIcon color="#64748b" />',
  );
  expect(iconsetInstallCode("Heroicons", "react-native")).toBe(
    "npm install @sidekickicons/react-native react-native-svg",
  );
  expect(iconsetInstallCode("Heroicons", "react")).toBe("npm install @heroicons/react");
});
