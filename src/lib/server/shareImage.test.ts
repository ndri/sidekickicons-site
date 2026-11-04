import { expect, test } from "vitest";
import { PNG } from "pngjs";
import icons from "../icons/allicons";
import { defaultShareImage, iconShareImage, shareImageSize } from "./shareImage";

test("share images are PNGs of the size the meta tags promise", async () => {
  const icon = icons.find(
    (icon) => icon.kebabName === "arrow-path-single-counterclockwise",
  )!;
  for (const image of [await iconShareImage(icon), await defaultShareImage()]) {
    const png = PNG.sync.read(Buffer.from(image));
    expect({ width: png.width, height: png.height }).toEqual(shareImageSize);
  }
});
