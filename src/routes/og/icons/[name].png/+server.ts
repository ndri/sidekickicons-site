import { error } from "@sveltejs/kit";
import icons from "$lib/icons/allicons";
import { iconShareImage } from "$lib/server/shareImage";
import type { EntryGenerator, RequestHandler } from "./$types";

// The share image of every icon page (iconShareImagePath), rendered at build time
export const prerender = true;

export const entries: EntryGenerator = () =>
  icons.map((icon) => ({ name: icon.kebabName }));

export const GET: RequestHandler = async ({ params }) => {
  const icon = icons.find((icon) => icon.kebabName === params.name);
  if (!icon) error(404, "No such icon");

  return new Response(new Uint8Array(await iconShareImage(icon)), {
    headers: { "Content-Type": "image/png" },
  });
};
