<script lang="ts">
  import { ArrowLeftIcon, RssIcon } from "@sidekickicons/svelte/16/solid";
  import ChangelogNote from "$lib/components/ChangelogNote.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import IconRedraw from "$lib/components/IconRedraw.svelte";
  import IconTiles from "$lib/components/IconTiles.svelte";
  import Link from "$lib/components/Link.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import { iconTypeNames } from "$lib/util/constants";
  import { iconPagePath } from "$lib/util/iconPages";
  import { formatDate, type ReleaseNote } from "$lib/util/releaseHistory";

  let { data } = $props();

  // Changelog lines grouped under their section, in the changelog's order
  function sections(notes: ReleaseNote[]) {
    const groups: { section: string; notes: ReleaseNote[] }[] = [];
    for (const note of notes) {
      const section = note.section ?? "";
      const group = groups.find((group) => group.section === section);
      if (group) group.notes.push(note);
      else groups.push({ section, notes: [note] });
    }
    return groups;
  }

  const plural = (count: number, word: string) =>
    `${count} ${word}${count === 1 ? "" : "s"}`;
</script>

<PageMeta
  title="What's new in Sidekickicons · New and redrawn icons in every release"
  description="Every Sidekickicons release and every Heroicons 2 release that changed icons: new icons, redrawn icons and renames, newest first."
  path="/whats-new"
/>

<svelte:head>
  <link
    rel="alternate"
    type="application/atom+xml"
    title="Sidekickicons releases"
    href="/whats-new.xml"
  />
</svelte:head>

{#snippet iconLinks(names: string[])}
  {#each names as name, i (name)}
    {#if i > 0}{", "}{/if}<Link href={iconPagePath(name)}>{name}</Link>
  {/each}
{/snippet}

<div class="flex flex-col items-center">
  <Header compact />
  <main class="flex w-full max-w-7xl flex-col gap-12 p-4 sm:p-8">
    <div class="flex max-w-3xl flex-col gap-4">
      <p class="text-sm">
        <Link href="/"><ArrowLeftIcon class="mr-0.5" />Search icons</Link>
      </p>
      <h1 class="text-2xl font-bold sm:text-3xl">What's new</h1>
      <p>
        New and redrawn icons in every Sidekickicons release, and in every Heroicons 2
        release that changed icons. Heroicons' last release was 2.2.0, in November 2024.
      </p>
      <p class="text-sm">
        <Link href="/whats-new.xml"
          ><RssIcon class="mr-1" />Follow new releases in a feed reader</Link
        >
      </p>
    </div>

    {#each data.releases as release (release.id)}
      <section
        id={release.id}
        class="flex scroll-mt-8 flex-col gap-4 border-t border-slate-200 pt-8 dark:border-slate-700"
      >
        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-semibold">{release.iconset} {release.version}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            <time datetime={release.date}>{formatDate(release.date)}</time> ·
            <Link href={release.url} newTab>Changelog</Link>
          </p>
        </div>

        {#if release.first && release.iconset === "Heroicons"}
          <p>
            The first release of Heroicons 2, a completely new set of
            {release.addedCount} icons in outline, solid and mini.
            <Link href="/icons">See all icons</Link>.
          </p>
        {:else if release.added.length}
          <h3 class="text-sm font-medium">{plural(release.addedCount, "new icon")}</h3>
          <IconTiles icons={release.added} />
        {/if}

        {#each release.newStyles as { type, names } (type)}
          <p>
            {iconTypeNames[type]} style added to
            {#if names.length > 10}
              {names.length} icons.
            {:else}
              {@render iconLinks(names)}.
            {/if}
          </p>
        {/each}

        {#each release.renamed as { from, to } (from)}
          <p>
            Renamed <code
              class="rounded-sm bg-slate-100 px-1 text-[0.9em] dark:bg-slate-800"
              >{from}</code
            >
            to <Link href={iconPagePath(to)}>{to}</Link>.
          </p>
        {/each}

        {#if release.redrawn.length}
          <h3 class="text-sm font-medium">Redrawn</h3>
          <div class="flex flex-col gap-4">
            {#each release.redrawn as { name, drawings } (name)}
              <div class="flex flex-col gap-2">
                <p class="text-sm"><Link href={iconPagePath(name)}>{name}</Link></p>
                <IconRedraw {drawings} />
              </div>
            {/each}
          </div>
        {/if}

        {#if release.updated.length}
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Updated without a visible change: {@render iconLinks(release.updated)}.
          </p>
        {/if}

        {#each sections(release.notes) as { section, notes } (section)}
          <div
            class="flex max-w-3xl flex-col gap-1 text-sm text-slate-600 dark:text-slate-300"
          >
            {#if section}<p class="font-medium">{section}</p>{/if}
            <ul class="flex list-disc flex-col gap-1 pl-5">
              {#each notes as note, i (i)}
                <li class={note.nested ? "ml-5 list-[circle]" : ""}>
                  <ChangelogNote note={note.text} />
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </section>
    {/each}
  </main>
  <Footer />
</div>
