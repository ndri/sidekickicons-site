<script lang="ts">
  import { ArrowRightIcon } from "@sidekickicons/svelte/16/solid";
  import type { HeroiconType } from "../types";
  import { svgWithClass } from "../util/code";
  import { iconSizeClasses2x, iconTypeNames } from "../util/constants";

  // Each redrawn style of an icon, before and after, at twice its intended size
  let {
    drawings,
  }: { drawings: { type: HeroiconType; before: string; after: string }[] } = $props();
</script>

<div class="flex flex-wrap gap-3">
  {#each drawings as { type, before, after } (type)}
    <figure
      class="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-3 dark:bg-slate-800"
    >
      <div class="flex items-center gap-3">
        <span class="flex size-12 items-center justify-center" title="Before">
          {@html svgWithClass(
            before,
            `${iconSizeClasses2x[type]} text-slate-400 dark:text-slate-500`,
          )}
        </span>
        <ArrowRightIcon class="size-4 text-slate-400" />
        <span class="sr-only">became</span>
        <span class="flex size-12 items-center justify-center" title="After">
          {@html svgWithClass(
            after,
            `${iconSizeClasses2x[type]} text-slate-700 dark:text-slate-100`,
          )}
        </span>
      </div>
      <figcaption class="text-xs text-slate-500 dark:text-slate-400">
        {iconTypeNames[type]}
      </figcaption>
    </figure>
  {/each}
</div>
