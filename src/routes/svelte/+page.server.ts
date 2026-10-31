import icons from "$lib/icons/allicons";
import type { PageServerLoad } from "./$types";

// A few Sidekickicons that web apps often need
const featured = [
  "keyboard",
  "h4",
  "italic-slash",
  "eraser",
  "check-square",
  "star-half",
  "target",
  "percent",
  "infinity",
  "arc-third",
  "sidebar-left",
  "cookie",
];

export const load: PageServerLoad = () => ({
  sidekickiconCount: icons.filter((icon) => icon.iconset === "Sidekickicons").length,
  heroiconCount: icons.filter((icon) => icon.iconset === "Heroicons").length,
  featured: featured.map((name) => {
    const icon = icons.find((icon) => icon.kebabName === name)!;
    return { kebabName: name, svg: icon.outline24 };
  }),
});
