import type { Heroicon } from "../types";

// Icon files to download from the icon pages, made in the browser

// The icon's SVG in one color, at a size, optionally on a solid background
export function coloredSvg(
  svg: Heroicon,
  {
    color,
    size,
    background,
  }: { color: string; size: number; background: string | null },
) {
  const sized = svg
    .replaceAll("currentColor", color)
    .replace(/^<svg/, `<svg width="${size}" height="${size}"`);
  if (!background) return sized;
  return sized.replace(
    /^(<svg[^>]*>)/,
    `$1<rect width="100%" height="100%" fill="${background}" stroke="none"/>`,
  );
}

// An SVG drawn onto a canvas of size × size pixels, as a PNG
export async function svgToPng(svg: string, size: number): Promise<Blob> {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas.getContext("2d")!.drawImage(image, 0, 0, size, size);
    return await new Promise((resolve, reject) =>
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("No PNG"))),
        "image/png",
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}
