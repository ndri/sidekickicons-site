# sidekickicons-site

The website for [Sidekickicons](https://github.com/ndri/sidekickicons), built with
[SvelteKit](https://svelte.dev/docs/kit) and deployed on Vercel.

## Development

```bash
pnpm install
pnpm dev
```

- `pnpm check` type-checks the project.
- `pnpm test` runs the unit tests.
- `pnpm build` builds the site. Pages are prerendered; only the Plausible proxy
  (`/js/script.js` and `/api/event`) runs as a serverless function.

The icon SVGs are extracted from `@sidekickicons/svelte` at build time by the Vite plugin
in `src/lib/icons/iconData.ts`. The `heroicons` package is only used to tell Heroicons
and Sidekickicons apart.

## Analytics

Plausible is enabled when the `PLAUSIBLE_DOMAIN` environment variable is set.
