<script lang="ts">
  import { ArrowLeftIcon } from "@sidekickicons/svelte/16/solid";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import Link from "$lib/components/Link.svelte";
  import { svgWithClass } from "$lib/util/code";
  import { iconPagePath } from "$lib/util/iconPages";
  import { comingNext, roadmapUrl, suggestIconUrl } from "$lib/data/missingHeroicons";

  let { data } = $props();
</script>

<PageMeta
  title="Icons missing from Heroicons · {data.sidekickiconCount} extra icons in the Heroicons style"
  description="Heroicons hasn't added icons since 2.2.0. Sidekickicons adds {data.sidekickiconCount} of the icons it's missing, like keyboard, H4 to H6, video call icons and loading spinners, in the same style and sizes, for React, Vue, Svelte and React Native."
  path="/missing-heroicons"
/>

<div class="flex flex-col items-center">
  <Header compact />
  <main class="flex w-full max-w-7xl flex-col gap-12 p-4 sm:p-8">
    <div class="flex max-w-3xl flex-col gap-4">
      <p class="text-sm">
        <Link href="/"><ArrowLeftIcon class="mr-0.5" />Search icons</Link>
      </p>
      <h1 class="text-2xl font-bold sm:text-3xl">Icons missing from Heroicons</h1>
      <p>
        Heroicons is a great icon set, but it hasn't added new icons since version
        2.2.0, and plenty of common icons were never part of it. Sidekickicons fills
        {data.sidekickiconCount} of those gaps in the same style, so they sit right next
        to Heroicons in your UI.
      </p>
      <ul class="flex list-disc flex-col gap-1 pl-5 text-slate-600 dark:text-slate-300">
        <li>
          Every icon comes in the same four styles: outline (24 px), solid (24 px), mini
          (20 px) and micro (16 px).
        </li>
        <li>
          The React and Vue packages have the same component API as Heroicons, so you
          import them the same way.
        </li>
        <li>
          The Svelte and React Native packages include all of Heroicons too, since
          Heroicons has no official package for either.
        </li>
        <li>
          Sidekickicons are made by a fan, not by Tailwind Labs, and are MIT-licensed
          like Heroicons.
        </li>
      </ul>
    </div>

    {#each data.groups as group (group.title)}
      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">{group.title}</h2>
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {#each group.icons as icon (icon.kebabName)}
            <a
              href={iconPagePath(icon.kebabName)}
              class="flex min-h-28 flex-col items-center justify-center gap-2 rounded-lg bg-slate-50 p-4 text-center hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {@html svgWithClass(
                icon.svg,
                "size-6 text-slate-700 dark:text-slate-100",
              )}
              <span
                class="max-w-full truncate text-xs text-slate-700 dark:text-slate-200"
              >
                {icon.kebabName}
              </span>
              {#if icon.note}
                <span class="text-xs text-slate-500 dark:text-slate-400"
                  >{icon.note}</span
                >
              {/if}
            </a>
          {/each}
        </div>
      </section>
    {/each}

    <section class="flex max-w-3xl flex-col gap-4">
      <h2 class="text-lg font-semibold">Coming next</h2>
      <p>
        These are the most requested icons that neither set has yet, by votes on
        Heroicons' GitHub discussions:
      </p>
      <ul class="flex flex-wrap gap-2">
        {#each comingNext as icon (icon.name)}
          <li
            class="rounded-md bg-slate-50 px-2 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <span class="font-mono">{icon.name}</span>
            <span class="text-slate-500 dark:text-slate-400">· {icon.votes} votes</span>
          </li>
        {/each}
      </ul>
      <p>
        See the full <Link href={roadmapUrl} newTab>roadmap</Link>, or
        <Link href={suggestIconUrl} newTab>suggest an icon</Link>.
      </p>
    </section>
  </main>
  <Footer />
</div>
