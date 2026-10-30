<script lang="ts">
  import { MagnifyingGlassIcon } from "@sidekickicons/svelte/20/solid";
  import { XMarkIcon } from "@sidekickicons/svelte/20/solid";

  let {
    searchQuery,
    setSearchQuery,
    placeholder,
  }: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder: string;
  } = $props();
</script>

<div>
  <label for="search" class="sr-only">Search</label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <MagnifyingGlassIcon class="h-5 w-5 text-slate-400" />
    </div>
    <input
      id="search"
      name="search"
      type="text"
      autocomplete="off"
      {placeholder}
      class="dark:placeholder-text-slate-400 block w-full rounded-md border-0 px-10 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700"
      value={searchQuery}
      oninput={(e) => setSearchQuery(e.currentTarget.value)}
      maxlength={32}
    />
    {#if searchQuery}
      <button
        class="absolute inset-y-0 right-0 flex items-center rounded-md px-3 text-slate-400 hover:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-100 dark:hover:text-slate-200"
        onclick={() => setSearchQuery("")}
        aria-label="Clear search"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    {/if}
  </div>
</div>
