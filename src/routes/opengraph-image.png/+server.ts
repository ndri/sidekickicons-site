import { defaultShareImage } from "$lib/server/shareImage";

// The share image of every page without its own (PageMeta), rendered at build time
export const prerender = true;

export async function GET() {
  return new Response(new Uint8Array(await defaultShareImage()), {
    headers: { "Content-Type": "image/png" },
  });
}
