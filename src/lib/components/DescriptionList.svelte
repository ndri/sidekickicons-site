<script lang="ts">
  import type { Snippet } from "svelte";

  let { rows }: { rows: [string, string | Snippet][] } = $props();
</script>

<dl class="w-full divide-y divide-slate-100 dark:divide-slate-700">
  {#each rows as [dt, dd] (dt)}
    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt class="text-sm font-medium">{dt}</dt>
      <dd
        class="mt-1 text-sm/6 text-slate-600 sm:col-span-2 sm:mt-0 dark:text-slate-300"
      >
        {#if typeof dd === "string"}
          {dd}
        {:else}
          {@render dd()}
        {/if}
      </dd>
    </div>
  {/each}
</dl>
