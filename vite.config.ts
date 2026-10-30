import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import iconData from "./src/lib/icons/iconData";

export default defineConfig({
  plugins: [iconData(), sveltekit()],
});
