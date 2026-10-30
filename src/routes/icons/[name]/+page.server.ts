import { error } from "@sveltejs/kit";
import icons from "$lib/icons/allicons";
import { relatedIcons } from "$lib/util/iconPages";
import type { FullHeroicon } from "$lib/types";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = () =>
  icons.map((icon) => ({ name: icon.kebabName }));

// Loading the icon here keeps the full icon list out of the page's JavaScript
export const load: PageServerLoad = ({ params }) => {
  const icon = icons.find((icon) => icon.kebabName === params.name);
  if (!icon) error(404, "Icon not found");

  const related = relatedIcons(icon, icons);
  const link = (icon: FullHeroicon) => ({
    kebabName: icon.kebabName,
    svg: icon.outline24,
  });

  return {
    icon,
    related: related.map(link),
    // Sidekickicons often have no close match in Heroicons, so their pages also link
    // to every other Sidekickicon
    otherSidekickicons:
      icon.iconset === "Sidekickicons"
        ? icons
            .filter((other) => other.iconset === "Sidekickicons" && other !== icon)
            .filter((other) => !related.includes(other))
            .map(link)
        : [],
  };
};
