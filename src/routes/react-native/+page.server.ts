import icons from "$lib/icons/allicons";
import type { PageServerLoad } from "./$types";

// A few Sidekickicons that React Native apps often need
const featured = [
  "video-camera-x-mark",
  "video-camera-arrow-down-left",
  "camera-rotate",
  "microphone-slash",
  "headphones",
  "keyboard",
  "pin",
  "check-double",
  "face-smile-plus",
  "photo-plus",
  "arc-third",
  "sidebar-left",
];

export const load: PageServerLoad = () => ({
  sidekickiconCount: icons.filter((icon) => icon.iconset === "Sidekickicons").length,
  heroiconCount: icons.filter((icon) => icon.iconset === "Heroicons").length,
  featured: featured.map((name) => {
    const icon = icons.find((icon) => icon.kebabName === name)!;
    return { kebabName: name, svg: icon.outline24 };
  }),
});
