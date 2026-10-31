import { json } from "@sveltejs/kit";
import icons from "$lib/icons/allicons";
import { sidekickiconsVersion } from "$lib/server/version";
import { iconsJson } from "$lib/util/llms";

export const prerender = true;

export function GET() {
  return json(iconsJson(icons, sidekickiconsVersion()));
}
