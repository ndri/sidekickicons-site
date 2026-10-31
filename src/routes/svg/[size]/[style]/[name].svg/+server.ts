import { error } from "@sveltejs/kit";
import icons from "$lib/icons/allicons";
import type { HeroiconType } from "$lib/types";
import { iconDirectories, iconTypes } from "$lib/util/constants";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
  icons.flatMap((icon) =>
    iconTypes.map((type) => {
      const [size, style] = iconDirectories[type].split("/");
      return { size, style, name: icon.kebabName };
    }),
  );

export const GET: RequestHandler = ({ params }) => {
  const type = iconTypes.find(
    (type) => iconDirectories[type] === `${params.size}/${params.style}`,
  ) as HeroiconType | undefined;
  const icon = icons.find((icon) => icon.kebabName === params.name);
  if (!type || !icon) error(404, "Icon not found");

  return new Response(icon[type] + "\n", {
    headers: { "Content-Type": "image/svg+xml" },
  });
};
