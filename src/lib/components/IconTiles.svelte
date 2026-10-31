<script lang="ts">
  import { svgWithClass } from "../util/code";
  import { iconPagePath } from "../util/iconPages";

  // A grid of icons linking to their pages, optionally with a short note under each
  let { icons }: { icons: { kebabName: string; svg: string; note?: string }[] } =
    $props();
</script>

<div
  class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
>
  {#each icons as icon (icon.kebabName)}
    <a
      href={iconPagePath(icon.kebabName)}
      class="flex min-h-28 flex-col items-center justify-center gap-2 rounded-lg bg-slate-50 p-4 text-center hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      {@html svgWithClass(icon.svg, "size-6 text-slate-700 dark:text-slate-100")}
      <span class="max-w-full truncate text-xs text-slate-500 dark:text-slate-400">
        {icon.kebabName}
      </span>
      {#if icon.note}
        <span class="text-xs text-slate-500 dark:text-slate-400">{icon.note}</span>
      {/if}
    </a>
  {/each}
</div>
