import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import icons from "../icons/allicons";
import type { FullHeroicon, Heroicon, HeroiconType } from "../types";
import { iconTypeNames, iconTypes } from "../util/constants";
import { iconTitle } from "../util/iconPages";

// Share images (og:image) for the icon pages, rendered at build time: satori lays the
// image out and turns text into paths, resvg turns that into a PNG. Same look as
// static/opengraph-image.png: white, slate text, indigo accents.

export const shareImageSize = { width: 1200, height: 630 };

const colors = {
  text: "#1e293b", // slate-800
  muted: "#64748b", // slate-500
  icon: "#334155", // slate-700
  tile: "#f1f5f9", // slate-100
  accent: "#4f46e5", // indigo-600
};

const fontFile = (weight: number) =>
  readFileSync(
    resolve(`node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`),
  );
const fonts = [400, 700].map((weight) => ({
  name: "Inter",
  data: fontFile(weight),
  weight: weight as 400 | 700,
  style: "normal" as const,
}));

type Element = { type: string; props: Record<string, unknown> };

const div = (style: Record<string, unknown>, children: unknown): Element => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

// The icon markup uses currentColor, which an <img> can't inherit
function iconImage(svg: Heroicon, size: number, color: string): Element {
  const colored = svg.replaceAll("currentColor", color);
  const src = `data:image/svg+xml;base64,${Buffer.from(colored).toString("base64")}`;
  return { type: "img", props: { src, width: size, height: size } };
}

const icon = (name: string) => icons.find((icon) => icon.kebabName === name)!;

function logo(): Element {
  return div(
    {
      position: "absolute",
      left: 80,
      bottom: 56,
      alignItems: "center",
      gap: 14,
      fontSize: 30,
      fontWeight: 700,
    },
    [
      iconImage(icon("shield").outline24, 36, colors.accent),
      div({}, "heroicons"),
      div({ margin: "0 4px" }, "+"),
      iconImage(icon("mask").solid24, 36, colors.accent),
      div({}, "sidekickicons"),
    ],
  );
}

// Each style at twice its intended size, so their proportions stay true
const styleSizes: Record<HeroiconType, number> = {
  outline24: 48,
  solid24: 48,
  solid20: 40,
  solid16: 32,
};

function styleRow(fullHeroicon: FullHeroicon): Element {
  return div(
    { gap: 40 },
    iconTypes.map((type) =>
      div({ flexDirection: "column", alignItems: "center", gap: 12 }, [
        div({ width: 48, height: 48, alignItems: "center", justifyContent: "center" }, [
          iconImage(fullHeroicon[type], styleSizes[type], colors.icon),
        ]),
        div({ fontSize: 22, color: colors.muted }, iconTypeNames[type]),
      ]),
    ),
  );
}

// The text column is about 590 px wide: short titles fit on one line, long ones wrap
function titleSize(title: string) {
  if (title.length > 28) return 48;
  if (title.length > 13) return 56;
  return 72;
}

export async function iconShareImage(fullHeroicon: FullHeroicon) {
  const title = `${iconTitle(fullHeroicon.kebabName)} icon`;
  const element = div(
    {
      width: "100%",
      height: "100%",
      // satori adds padding on top of a 100% size, so the content is placed absolutely
      position: "relative",
      backgroundColor: "#ffffff",
      color: colors.text,
      fontFamily: "Inter",
    },
    [
      div(
        {
          position: "absolute",
          left: 80,
          right: 80,
          top: 72,
          alignItems: "center",
          gap: 72,
        },
        [
          div(
            {
              width: 380,
              height: 380,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
              backgroundColor: colors.tile,
            },
            [iconImage(fullHeroicon.outline24, 220, colors.icon)],
          ),
          div({ flexDirection: "column", gap: 20 }, [
            div(
              { fontSize: 28, fontWeight: 700, color: colors.accent },
              fullHeroicon.iconset,
            ),
            div(
              {
                fontSize: titleSize(title),
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -1,
                textWrap: "balance",
              },
              title,
            ),
            div({ marginTop: 28 }, [styleRow(fullHeroicon)]),
          ]),
        ],
      ),
      logo(),
    ],
  );

  // satori's element type expects React nodes; plain objects with type and props work
  const svg = await satori(element as never, { ...shareImageSize, fonts });
  return new Resvg(svg, { fitTo: { mode: "width", value: shareImageSize.width } })
    .render()
    .asPng();
}
