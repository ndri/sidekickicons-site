export type Heroicon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export type NamedHeroicons = Record<string, Heroicon>;

export type HeroiconType = "outline24" | "solid24" | "solid20" | "solid16";

export type Iconset = "Heroicons" | "Sidekickicons";

export type IconsetSelection = Iconset | "All";

export type IconSize = "1x" | "1.5x" | "2x" | "4x";

export type IconCodeType =
  | "SVG"
  | "JSX"
  | "React"
  | "React + imports"
  | "Vue"
  | "Vue + imports";

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
