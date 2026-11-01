import type { FullHeroicon, HeroiconType, IconCodeType } from "../types";
import { iconTypeNames } from "./constants";

// Custom events for Umami, whose tracker is loaded in app.html. Plausible only counts
// pageviews. window.umami is missing when the tracker is blocked or hasn't loaded yet,
// so tracking never throws. Umami stores the page path with every event.

type EventData = Record<string, string | number | boolean>;
export type AnalyticsEvent = { name: string; data?: EventData };

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

export function track({ name, data }: AnalyticsEvent) {
  try {
    window.umami?.track(name, data);
  } catch {}
}

export function copyIconEvent(
  icon: FullHeroicon,
  type: HeroiconType,
  format: IconCodeType,
  from: "grid" | "dialog" | "icon page",
): AnalyticsEvent {
  return {
    name: "copy",
    data: {
      icon: icon.kebabName,
      iconset: icon.iconset,
      style: iconTypeNames[type],
      format,
      from,
    },
  };
}
