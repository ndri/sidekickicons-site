import icons from "$lib/icons/allicons";
import { iconsets } from "$lib/util/constants";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({
  iconsets: iconsets.map((iconset) => ({
    iconset,
    icons: icons
      .filter((icon) => icon.iconset === iconset)
      .map((icon) => ({ kebabName: icon.kebabName, svg: icon.outline24 })),
  })),
});
