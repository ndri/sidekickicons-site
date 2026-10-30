import type { RequestHandler } from "./$types";

// Proxies Plausible events, forwarding the visitor's IP and user agent so unique
// visitors are still counted correctly
export const prerender = false;

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const response = await fetch("https://plausible.io/api/event", {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("Content-Type") ?? "text/plain",
      "User-Agent": request.headers.get("User-Agent") ?? "",
      "X-Forwarded-For": getClientAddress(),
    },
    body: await request.text(),
  });
  return new Response(response.body, { status: response.status });
};
