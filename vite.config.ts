import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import iconData from "./src/lib/icons/iconData";

export default defineConfig({
  plugins: [tailwindcss(), iconData(), sveltekit()],
});
