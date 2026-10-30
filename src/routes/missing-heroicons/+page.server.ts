import { error } from "@sveltejs/kit";
import icons from "$lib/icons/allicons";
import { heroiconsPairings, sidekickiconGroups } from "$lib/data/missingHeroicons";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({
  sidekickiconCount: icons.filter((icon) => icon.iconset === "Sidekickicons").length,
  groups: sidekickiconGroups.map((group) => ({
    title: group.title,
    icons: group.icons.map((name) => {
      const icon = icons.find((icon) => icon.kebabName === name);
      if (!icon) error(500, `Unknown icon in sidekickiconGroups: ${name}`);
      return { kebabName: name, svg: icon.outline24, note: heroiconsPairings[name] };
    }),
  })),
});
