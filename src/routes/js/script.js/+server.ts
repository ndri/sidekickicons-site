// Proxies the Plausible script so ad blockers don't block it
export const prerender = false;

export async function GET() {
  const response = await fetch("https://plausible.io/js/script.js");
  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
