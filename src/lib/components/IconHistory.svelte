<script lang="ts">
  import type { HeroiconType } from "../types";
  import { iconTypeNames } from "../util/constants";
  import { formatDate, type HistoryEvent } from "../util/releaseHistory";
  import ChangelogNote from "./ChangelogNote.svelte";
  import IconRedraw from "./IconRedraw.svelte";
  import Link from "./Link.svelte";

  // What happened to an icon in each release, newest first
  let { events }: { events: HistoryEvent[] } = $props();

  // ["solid20", "solid16"] -> "Mini and micro"
  function styles(types: HeroiconType[]) {
    const names = types.map((type) => iconTypeNames[type].toLowerCase());
    const text =
      names.length > 1
        ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`
        : names[0];
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
</script>

{#snippet release(event: HistoryEvent)}
  <Link href={event.release.url} newTab
    >{event.release.iconset} {event.release.version}</Link
  >
{/snippet}

<ol class="flex flex-col gap-6 border-l border-slate-200 pl-6 dark:border-slate-700">
  {#each events as event, i (i)}
    <li class="relative flex flex-col gap-2">
      <span
        class="absolute top-1.5 -left-[1.8rem] size-2.5 rounded-full bg-indigo-600 ring-4 ring-white dark:bg-indigo-400 dark:ring-slate-900"
        aria-hidden="true"
      ></span>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        <time datetime={event.release.date}>{formatDate(event.release.date)}</time>
      </p>
      <p>
        {#if event.kind === "added"}
          {#if event.release.first && event.release.iconset === "Heroicons"}
            Part of the first release of Heroicons 2, {@render release(event)}.
          {:else if event.release.first}
            Added in the first release of Sidekickicons, {@render release(event)}.
          {:else}
            Added in {@render release(event)}.
          {/if}
        {:else if event.kind === "renamed"}
          Renamed from <code
            class="rounded-sm bg-slate-100 px-1 text-[0.9em] dark:bg-slate-800"
            >{event.from}</code
          >
          in {@render release(event)}.
        {:else if event.kind === "newStyle"}
          {styles(event.types)} style added in {@render release(event)}.
        {:else if event.drawings.length}
          {styles(event.drawings.map((drawing) => drawing.type))}
          {event.drawings.length > 1 ? "styles" : "style"} redrawn in {@render release(
            event,
          )}.
        {:else}
          Updated in {@render release(event)}, without a visible change.
        {/if}
      </p>
      {#if event.kind === "changed"}
        {#each event.notes as note (note)}
          <p class="text-sm text-slate-600 dark:text-slate-300">
            <ChangelogNote {note} />
          </p>
        {/each}
        {#if event.drawings.length}
          <IconRedraw drawings={event.drawings} />
        {/if}
      {/if}
    </li>
  {/each}
</ol>
