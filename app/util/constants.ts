import {
  FullHeroicon,
  HeroiconType,
  IconCodeType,
  IconSize,
  Iconset,
  IconsetSelection,
} from "../types";
import {
  iconJsxCode,
  iconReactCode,
  iconReactPlusImportCode,
  iconSvgCode,
  iconVueCode,
  iconVuePlusImportCode,
} from "./code";

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

export const iconSizeClasses15x: Record<HeroiconType, string> = {
  outline24: "size-9",
  solid24: "size-9",
  solid20: "size-[1.875rem]",
  solid16: "size-6",
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

export const allIconSizeClasses: Record<IconSize, Record<HeroiconType, string>> = {
  "1x": iconSizeClasses,
  "1.5x": iconSizeClasses15x,
  "2x": iconSizeClasses2x,
  "4x": iconSizeClasses4x,
} as const;

export const iconDirectories: Record<HeroiconType, string> = {
  outline24: "24/outline",
  solid24: "24/solid",
  solid20: "20/solid",
  solid16: "16/solid",
} as const;

export const iconCodeFunctions: Record<
  IconCodeType,
  (fullHeroicon: FullHeroicon, type: HeroiconType) => string
> = {
  SVG: iconSvgCode,
  JSX: iconJsxCode,
  React: iconReactCode,
  Vue: iconVueCode,
  "React + import": iconReactPlusImportCode,
  "Vue + import": iconVuePlusImportCode,
} as const;

export const deprecatedHeroicons = [
  "ArrowLeftOnRectangleIcon",
  "ArrowRightOnRectangleIcon",
  "ArrowSmallDownIcon",
  "ArrowSmallLeftIcon",
  "ArrowSmallRightIcon",
  "ArrowSmallUpIcon",
  "MinusSmallIcon",
  "PlusSmallIcon",
] as const;
