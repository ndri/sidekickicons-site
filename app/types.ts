export type Heroicon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export type NamedHeroicons = Record<string, Heroicon>;

export interface FullHeroicon {
  kebabName: string;
  pascalName: string;
  componentName: string;
  keywords: string[];
  iconset: "Heroicons" | "Sidekickicons";
  outline24: Heroicon;
  solid24: Heroicon;
  solid20: Heroicon;
  solid16: Heroicon;
}
