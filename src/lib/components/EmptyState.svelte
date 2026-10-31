<script lang="ts">
  import { XCircleIcon } from "@sidekickicons/svelte/24/outline";
  import Link from "./Link.svelte";

  let { searchQuery }: { searchQuery: string } = $props();
</script>

<div class="col-span-full flex flex-col gap-2 p-12 text-center">
  <XCircleIcon class="size-10 self-center text-slate-400 dark:text-slate-500" />
  <p>
    No icons found for <span class="font-bold">{searchQuery}</span>.
  </p>
  <p>
    <Link
      href="https://github.com/ndri/sidekickicons/discussions/new?category=icon-suggestions"
      newTab
    >
      Make a suggestion on GitHub.
    </Link>
  </p>
</div>
