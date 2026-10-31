import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // The whole site is prerendered to static files and served by Caddy on Andri's VPS
    // (~/Projects/vps-agent). 404.html is an SPA fallback: Caddy serves it for unknown paths
    // and the client renders +error.svelte.
    adapter: adapter({ fallback: "404.html" }),
  },
};

export default config;
