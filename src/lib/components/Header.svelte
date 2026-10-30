<script lang="ts">
  import { MaskIcon } from "@sidekickicons/svelte/24/solid";
  import { ShieldIcon } from "@sidekickicons/svelte/24/outline";
  import ThemeSelector from "./ThemeSelector.svelte";
  import Link from "./Link.svelte";
</script>

<!-- h-24 w-24 rather than size-24, which loses to the icons' built-in size-6 -->
<header class="flex w-full max-w-7xl flex-col items-center gap-4 px-4 pt-8 sm:px-8">
  <div class="flex w-full justify-end">
    <ThemeSelector />
  </div>
  <h1 class="flex items-center gap-3 text-lg font-bold sm:text-3xl">
    <div class="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
      <ShieldIcon class="h-24 w-24 text-indigo-600 sm:size-12" />
      <span>heroicons</span>
    </div>
    <span class="text-3xl">+</span>
    <div class="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
      <MaskIcon class="h-24 w-24 text-indigo-600 sm:size-12" />
      <span>sidekickicons</span>
    </div>
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
