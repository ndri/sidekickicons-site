<script lang="ts">
  import { MagnifyingGlassIcon } from "@sidekickicons/svelte/20/solid";
  import { goto } from "$app/navigation";
  import type { FullHeroicon } from "../types";
  import { track } from "../util/analytics";
  import { svgWithClass } from "../util/code";
  import { iconPagePath } from "../util/iconPages";
  import { searchIcons } from "../util/search";

  // Search from any page: the best matches open their icon page, and the last option
  // opens the full search on the homepage. The icons load on first focus, so pages that
  // don't need them stay small.

  const MAX_RESULTS = 8;

  let icons: readonly FullHeroicon[] = $state([]);
  let query = $state("");
  let open = $state(false);
  let activeIndex = $state(0);

  const matches = $derived(query.trim() ? searchIcons(icons, query.trim()) : []);
  const results = $derived(matches.slice(0, MAX_RESULTS));
  // The icons, then "See all results"
  const optionCount = $derived(results.length + 1);
  const showList = $derived(open && !!query.trim() && icons.length > 0);

  async function loadIcons() {
    if (icons.length) return;
    icons = (await import("../icons/allicons")).default;
  }

  const allResultsPath = $derived(`/?q=${encodeURIComponent(query.trim())}`);

  // Tracked like the homepage search, once typing has stopped for 1.5 seconds, so
  // searches people give up on count too
  $effect(() => {
    const trimmed = query.trim();
    if (!trimmed || !icons.length) return;
    const data = {
      query: trimmed.slice(0, 100),
      results: matches.length,
      iconset: "All",
      foundInIconset: true,
      from: "header",
    };
    const timeout = setTimeout(() => track({ name: "search", data }), 1500);
    return () => clearTimeout(timeout);
  });

  function choose(index: number) {
    const icon = results[index];
    open = false;
    goto(icon ? iconPagePath(icon.kebabName) : allResultsPath);
    query = "";
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (showList) open = false;
      else (event.currentTarget as HTMLInputElement).blur();
    } else if (!showList) {
      return;
    } else if (event.key === "ArrowDown") {
      activeIndex = (activeIndex + 1) % optionCount;
    } else if (event.key === "ArrowUp") {
      activeIndex = (activeIndex - 1 + optionCount) % optionCount;
    } else if (event.key === "Enter") {
      choose(activeIndex);
    } else {
      return;
    }
    event.preventDefault();
  }
</script>

<div class="relative w-full">
  <label for="search" class="sr-only">Search icons</label>
  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
    <MagnifyingGlassIcon class="size-5 text-slate-400" />
  </div>
  <input
    id="search"
    type="text"
    autocomplete="off"
    placeholder="Search icons..."
    role="combobox"
    aria-expanded={showList}
    aria-controls="header-search-results"
    aria-autocomplete="list"
    aria-activedescendant={showList ? `header-search-option-${activeIndex}` : undefined}
    class="peer block w-full rounded-md border-0 py-1.5 pr-9 pl-10 text-slate-900 shadow-xs ring-1 ring-slate-300 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm/6 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
    bind:value={query}
    maxlength={32}
    onfocus={() => {
      loadIcons();
      open = true;
    }}
    onblur={() => (open = false)}
    oninput={() => {
      open = true;
      activeIndex = 0;
    }}
    {onkeydown}
  />
  {#if !query}
    <kbd
      class="pointer-events-none absolute inset-y-0 right-2 my-auto hidden h-5 items-center rounded-sm border border-slate-300 px-1.5 font-sans text-xs text-slate-400 peer-focus:hidden sm:flex dark:border-slate-600"
      >/</kbd
    >
  {/if}
  {#if showList}
    <ul
      id="header-search-results"
      role="listbox"
      aria-label="Icons"
      class="absolute right-0 z-30 mt-2 w-full min-w-80 overflow-hidden rounded-md bg-white py-1 shadow-lg ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
    >
      {#each results as icon, i (icon.kebabName)}
        <!-- The input keeps focus and handles the keyboard, so options only need clicks -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li
          id="header-search-option-{i}"
          role="option"
          aria-selected={i === activeIndex}
          class="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm {i ===
          activeIndex
            ? 'bg-slate-100 dark:bg-slate-700'
            : ''}"
          onmousedown={(event) => event.preventDefault()}
          onmouseenter={() => (activeIndex = i)}
          onclick={() => choose(i)}
        >
          {@html svgWithClass(
            icon.outline24,
            "size-5 shrink-0 text-slate-700 dark:text-slate-200",
          )}
          <span class="truncate">{icon.kebabName}</span>
          <span class="ml-auto shrink-0 text-xs text-slate-500 dark:text-slate-400"
            >{icon.iconset}</span
          >
        </li>
      {/each}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <li
        id="header-search-option-{results.length}"
        role="option"
        aria-selected={activeIndex === results.length}
        class="cursor-pointer border-t border-slate-200 px-3 py-2 text-sm text-indigo-700 dark:border-slate-700 dark:text-indigo-400 {activeIndex ===
        results.length
          ? 'bg-slate-100 dark:bg-slate-700'
          : ''}"
        onmousedown={(event) => event.preventDefault()}
        onmouseenter={() => (activeIndex = results.length)}
        onclick={() => choose(results.length)}
      >
        {#if matches.length}
          See all {matches.length} {matches.length === 1 ? "result" : "results"}
        {:else}
          No icons match. Search on the homepage
        {/if}
      </li>
    </ul>
  {/if}
</div>
