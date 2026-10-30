<script lang="ts">
  import { svgWithClass } from "../util/code";
  import { iconPagePath } from "../util/iconPages";

  let { icons }: { icons: { kebabName: string; svg: string }[] } = $props();
</script>

<ul
  class="grid grid-cols-1 gap-x-4 gap-y-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
  {#each icons as icon (icon.kebabName)}
    <li>
      <a
        href={iconPagePath(icon.kebabName)}
        class="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        {@html svgWithClass(icon.svg, "size-6 shrink-0")}
        <span class="truncate">{icon.kebabName}</span>
      </a>
    </li>
  {/each}
</ul>
