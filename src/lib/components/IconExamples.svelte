<script lang="ts">
  import type { FullHeroicon } from "../types";
  import { svgWithClass } from "../util/code";

  // Shows the icon in common UI patterns, each using the variant Heroicons intends
  // for that size: outline for navigation, mini for buttons and inputs, micro for badges
  let { fullHeroicon, label }: { fullHeroicon: FullHeroicon; label: string } = $props();

  const icon = (
    type: "outline24" | "solid24" | "solid20" | "solid16",
    className: string,
  ) => svgWithClass(fullHeroicon[type], className);
</script>

{#snippet example(caption: string)}
  <p class="text-xs text-slate-500 dark:text-slate-400">{caption}</p>
{/snippet}

<div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span
      class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
    >
      {@html icon("solid20", "-ml-0.5 size-5")}
      {label}
    </span>
    {@render example("Button · Mini")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span
      class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700"
    >
      {@html icon("solid20", "-ml-0.5 size-5 text-slate-400")}
      {label}
    </span>
    {@render example("Secondary button · Mini")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span class="flex items-center gap-2">
      <span
        class="rounded-full bg-indigo-600 p-2 text-white shadow-sm"
        role="img"
        aria-label={label}
      >
        {@html icon("solid20", "size-5")}
      </span>
      <span
        class="rounded-md p-1.5 text-slate-500 ring-1 ring-inset ring-slate-300 dark:text-slate-400 dark:ring-slate-700"
        role="img"
        aria-label={label}
      >
        {@html icon("outline24", "size-6")}
      </span>
    </span>
    {@render example("Icon buttons · Mini and Outline")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span
      class="flex w-full max-w-60 items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm text-slate-400 ring-1 ring-inset ring-slate-300 dark:bg-slate-900 dark:ring-slate-700"
    >
      {@html icon("solid20", "size-5 shrink-0")}
      {label}…
    </span>
    {@render example("Input · Mini")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span class="flex w-full max-w-60 flex-col gap-1">
      <span
        class="flex items-center gap-x-3 rounded-md bg-white p-2 text-sm font-semibold text-indigo-600 dark:bg-slate-900 dark:text-indigo-400"
      >
        {@html icon("outline24", "size-6 shrink-0")}
        {label}
      </span>
      <span
        class="flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {@html icon("outline24", "size-6 shrink-0 text-slate-400")}
        {label}
      </span>
    </span>
    {@render example("Navigation · Outline")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span class="flex flex-wrap items-center justify-center gap-2">
      <span
        class="inline-flex items-center gap-x-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-900 dark:text-indigo-100 dark:ring-indigo-400/20"
      >
        {@html icon("solid16", "size-4")}
        {label}
      </span>
      <span
        class="inline-flex items-center gap-x-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300"
      >
        {@html icon("solid16", "size-3.5")}
        {label}
      </span>
    </span>
    {@render example("Badges · Micro")}
  </div>
</div>
