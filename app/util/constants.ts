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

export const iconSizeClasses: Record<HeroiconType, string> = {
  outline24: "size-6",
  solid24: "size-6",
  solid20: "size-5",
  solid16: "size-4",
} as const;

export const iconSizeClasses2x: Record<HeroiconType, string> = {
  outline24: "size-12",
  solid24: "size-12",
  solid20: "size-10",
  solid16: "size-8",
} as const;

export const iconSizeClasses4x: Record<HeroiconType, string> = {
  outline24: "size-24",
  solid24: "size-24",
  solid20: "size-20",
  solid16: "size-16",
} as const;
