<script lang="ts">
  import { HomeIcon, Squares2X2Icon } from "@sidekickicons/svelte/24/outline";
  import type { FullHeroicon } from "../types";
  import { svgWithClass } from "../util/code";
  import { spinningIcons } from "../data/exampleText";

  // Shows the icon in common, working UI patterns, each using the variant Heroicons
  // intends for that size: outline for navigation, mini for buttons and inputs, micro
  // for badges
  let {
    fullHeroicon,
    text,
  }: {
    fullHeroicon: FullHeroicon;
    text: { button: string; input: string; badge: string; nav: string };
  } = $props();

  let toggled = $state(false);
  // The navigation example has a Home item above this icon's page, which starts active
  let activeNavItem = $state(1);
  const isHome = $derived(text.nav === "Home");

  const spin = $derived(spinningIcons.includes(fullHeroicon.kebabName));

  const icon = (
    type: "outline24" | "solid24" | "solid20" | "solid16",
    className: string,
  ) => svgWithClass(fullHeroicon[type], spin ? `${className} animate-spin` : className);
</script>

{#snippet example(caption: string)}
  <p class="text-xs text-slate-500 dark:text-slate-400">{caption}</p>
{/snippet}

<div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <button
      type="button"
      class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-700"
    >
      {@html icon("solid20", "-ml-0.5 size-5")}
      {text.button}
    </button>
    {@render example("Button · Mini")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <button
      type="button"
      class="group inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700 dark:active:bg-slate-600"
    >
      {@html icon(
        "solid20",
        "-ml-0.5 size-5 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300",
      )}
      {text.button}
    </button>
    {@render example("Secondary button · Mini")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span class="flex items-center gap-2">
      <button
        type="button"
        class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-700"
        aria-label={text.button}
      >
        {@html icon("solid20", "size-5")}
      </button>
      <button
        type="button"
        class={[
          "rounded-md p-1.5 ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
          toggled
            ? "bg-indigo-50 text-indigo-600 ring-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:ring-indigo-700"
            : "text-slate-500 ring-slate-300 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-300",
        ]}
        aria-label={text.button}
        aria-pressed={toggled}
        onclick={() => (toggled = !toggled)}
      >
        {@html icon(toggled ? "solid24" : "outline24", "size-6")}
      </button>
    </span>
    {@render example("Icon buttons · Mini, and an Outline toggle that turns Solid")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <label class="relative block w-full max-w-60">
      <span class="sr-only">{text.input}</span>
      <span
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
      >
        {@html icon("solid20", "size-5")}
      </span>
      <input
        type="text"
        placeholder="{text.input}…"
        class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-sm/6 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700"
      />
    </label>
    {@render example("Input · Mini")}
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-50 p-4 text-center sm:p-6 dark:bg-slate-800"
  >
    <span class="flex w-full max-w-60 flex-col gap-1">
      {#each [0, 1] as item (item)}
        {@const active = activeNavItem === item}
        {@const iconClass = [
          "size-6 shrink-0",
          !active &&
            "text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
        ]}
        <button
          type="button"
          class={[
            "group flex items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600",
            active
              ? "bg-white text-indigo-600 dark:bg-slate-900 dark:text-indigo-400"
              : "text-slate-700 hover:bg-white hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-indigo-400",
          ]}
          aria-current={active ? "page" : undefined}
          onclick={() => (activeNavItem = item)}
        >
          {#if item === 1}
            {@html icon("outline24", iconClass.filter(Boolean).join(" "))}
            {text.nav}
          {:else if isHome}
            <Squares2X2Icon class={iconClass} />
            Dashboard
          {:else}
            <HomeIcon class={iconClass} />
            Home
          {/if}
        </button>
      {/each}
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
        {text.badge}
      </span>
      <span
        class="inline-flex items-center gap-x-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300"
      >
        {@html icon("solid16", "size-3.5")}
        {text.badge}
      </span>
    </span>
    {@render example("Badges · Micro")}
  </div>
</div>
