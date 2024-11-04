import { NamedHeroicons, FullHeroicon } from "../types";
import { removeEnd, toKebabCase } from "./util";

export function generateFullHeroicons(
  icons: {
    outline24: NamedHeroicons;
    solid24: NamedHeroicons;
    solid20: NamedHeroicons;
    solid16: NamedHeroicons;
  },
  keywords: { [key: string]: readonly string[] },
  iconset: FullHeroicon["iconset"],
): FullHeroicon[] {
  const fullIcons = Object.keys(icons.outline24).map((componentName) => {
    const pascalName = removeEnd(componentName, "Icon");
    const kebabName = toKebabCase(pascalName);
    return {
      kebabName,
      pascalName,
      componentName,
      keywords: keywords[kebabName] || ([] as string[]),
      iconset,
      outline24: icons.outline24[componentName],
      solid24: icons.solid24[componentName],
      solid20: icons.solid20[componentName],
      solid16: icons.solid16[componentName],
    };
  });

  return fullIcons;
}
