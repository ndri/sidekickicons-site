// SVG markup of a single icon, without a class attribute
export type Heroicon = string;

export type NamedHeroicons = Record<string, Heroicon>;

export type HeroiconType = "outline24" | "solid24" | "solid20" | "solid16";

export type Iconset = "Heroicons" | "Sidekickicons";

export type IconsetSelection = Iconset | "All";

export type IconSize = "1×" | "1.5×" | "2×" | "4×";

export type IconCodeType =
  | "SVG"
  | "JSX"
  | "React"
  | "React + import"
  | "Vue"
  | "Vue + import"
  | "Svelte"
  | "Svelte + import";

export type Framework = "react" | "vue" | "svelte";

export interface FullHeroicon {
  kebabName: string;
  pascalName: string;
  componentName: string;
  keywords: readonly string[];
  iconset: Iconset;
  outline24: Heroicon;
  solid24: Heroicon;
  solid20: Heroicon;
  solid16: Heroicon;
}
