import icons from "$lib/icons/allicons";
import { sidekickiconsVersion } from "$lib/server/version";
import { llmsTxt } from "$lib/util/llms";

export const prerender = true;

export function GET() {
  return new Response(llmsTxt(icons, sidekickiconsVersion()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
