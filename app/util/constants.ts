import { HeroiconType, Iconset, IconsetSelection } from "../types";

export const iconTypes: HeroiconType[] = [
  "outline24",
  "solid24",
  "solid20",
  "solid16",
] as const;

export const iconTypeNames: Record<HeroiconType, string> = {
  outline24: "Outline",
  solid24: "Solid",
  solid20: "Mini",
  solid16: "Micro",
} as const;

export const iconsets: Iconset[] = ["Heroicons", "Sidekickicons"] as const;

export const iconsetSelections: IconsetSelection[] = ["All", ...iconsets];

export const iconsetSelectionLabels: Record<IconsetSelection, string> = {
  All: "All",
  Heroicons: "Heroicons",
  Sidekickicons: "Sidekickicons",
} as const;
