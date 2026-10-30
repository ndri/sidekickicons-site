<script lang="ts">
  import { ArrowTopRightOnSquareIcon, ScaleIcon } from "@sidekickicons/svelte/16/solid";
  import { MaskIcon } from "@sidekickicons/svelte/24/solid";
  import { ShieldIcon } from "@sidekickicons/svelte/24/outline";
  import { roadmapUrl, suggestIconUrl } from "../data/missingHeroicons";
  import Link from "./Link.svelte";

  const columns: { title: string; links: { text: string; href: string }[] }[] = [
    {
      title: "Icons",
      links: [
        { text: "Search icons", href: "/" },
        { text: "All icons", href: "/icons" },
        { text: "Missing from Heroicons", href: "/missing-heroicons" },
      ],
    },
    {
      title: "Packages",
      links: [
        { text: "React", href: "https://www.npmjs.com/package/@sidekickicons/react" },
        { text: "Vue", href: "https://www.npmjs.com/package/@sidekickicons/vue" },
        { text: "Svelte", href: "https://www.npmjs.com/package/@sidekickicons/svelte" },
        {
          text: "React Native",
          href: "https://www.npmjs.com/package/@sidekickicons/react-native",
        },
      ],
    },
    {
      title: "Project",
      links: [
        { text: "GitHub", href: "https://github.com/ndri/sidekickicons" },
        { text: "Roadmap", href: roadmapUrl },
        {
          text: "Changelog",
          href: "https://github.com/ndri/sidekickicons/blob/main/CHANGELOG.md",
        },
        { text: "Suggest an icon", href: suggestIconUrl },
        { text: "Website source", href: "https://github.com/ndri/sidekickicons-site" },
      ],
    },
  ];
</script>

<footer class="mt-8 w-full border-t border-slate-200 dark:border-slate-800">
  <div class="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-8">
    <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div class="col-span-2 flex flex-col gap-3 md:col-span-1">
        <a
          href="/"
          class="flex items-center gap-2 self-start rounded-sm font-bold focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          <ShieldIcon class="text-indigo-600" />
          <span>+</span>
          <MaskIcon class="text-indigo-600" />
          <span>sidekickicons</span>
        </a>
        <p class="max-w-64 text-sm text-slate-500 dark:text-slate-400">
          Fanmade icons in the Heroicons style, for the icons Heroicons doesn't have.
        </p>
      </div>

      {#each columns as column (column.title)}
        <nav class="flex flex-col gap-3" aria-label={column.title}>
          <h2 class="text-sm font-semibold">{column.title}</h2>
          <ul class="flex flex-col gap-2 text-sm">
            {#each column.links as link (link.href)}
              {@const external = link.href.startsWith("http")}
              <li>
                <a
                  href={link.href}
                  target={external ? "_blank" : "_self"}
                  rel={external ? "noopener noreferrer" : ""}
                  class="inline-flex items-center gap-0.5 rounded-sm text-slate-600 hover:text-slate-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-slate-400 dark:hover:text-white"
                >
                  {link.text}
                  {#if external}
                    <ArrowTopRightOnSquareIcon
                      class="text-slate-400 dark:text-slate-500"
                    />
                  {/if}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      {/each}
    </div>

    <div
      class="flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:justify-between dark:border-slate-800 dark:text-slate-400"
    >
      <p>
        <Link href="https://github.com/tailwindlabs/heroicons" newTab>Heroicons</Link>
        are created by
        <Link href="https://www.steveschoger.com/" newTab>Steve Schoger</Link>
        and the
        <Link href="https://tailwindcss.com/" newTab>TailwindCSS</Link>
        team.
        <Link href="https://github.com/ndri/sidekickicons" newTab>Sidekickicons</Link>
        are created by
        <Link href="https://andri.io/" newTab>Andri Soone</Link>.
      </p>
      <p class="flex items-center gap-1">
        Both iconsets are MIT-licensed. <ScaleIcon />
      </p>
    </div>
  </div>
</footer>
