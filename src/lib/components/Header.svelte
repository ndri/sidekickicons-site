<script lang="ts">
  import { MaskIcon } from "@sidekickicons/svelte/24/solid";
  import { ShieldIcon } from "@sidekickicons/svelte/24/outline";
  import ThemeSelector from "./ThemeSelector.svelte";
  import Link from "./Link.svelte";

  // The homepage shows the full header; other pages get a compact one linking home
  let { compact = false }: { compact?: boolean } = $props();
</script>

{#snippet logo()}
  <div class="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
    <ShieldIcon class="size-24 text-indigo-600 sm:size-12" />
    <span>heroicons</span>
  </div>
  <span class="text-3xl">+</span>
  <div class="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
    <MaskIcon class="size-24 text-indigo-600 sm:size-12" />
    <span>sidekickicons</span>
  </div>
{/snippet}

{#if compact}
  <header
    class="flex w-full max-w-7xl flex-wrap-reverse items-center justify-between gap-4 px-4 pt-8 sm:px-8"
  >
    <a
      href="/"
      class="flex items-center gap-2 rounded-sm font-bold focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600 sm:text-lg"
    >
      <ShieldIcon class="text-indigo-600" />
      <span>heroicons</span>
      <span>+</span>
      <MaskIcon class="text-indigo-600" />
      <span>sidekickicons</span>
    </a>
    <!-- Wraps above the logo on narrow screens -->
    <div class="ml-auto">
      <ThemeSelector />
    </div>
  </header>
{:else}
  <header class="flex w-full max-w-7xl flex-col items-center gap-4 px-4 pt-8 sm:px-8">
    <div class="flex w-full justify-end">
      <ThemeSelector />
    </div>
    <h1 class="flex items-center gap-3 text-lg font-bold sm:text-3xl">
      {@render logo()}
    </h1>
    <p class="text-center text-slate-500 dark:text-slate-400">
      Browse
      <Link href="https://github.com/tailwindlabs/heroicons" newTab
        >your favourite icons</Link
      >
      and
      <Link href="https://github.com/ndri/sidekickicons" newTab
        >their fanmade companions</Link
      >.
    </p>
  </header>
{/if}
