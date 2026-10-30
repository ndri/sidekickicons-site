<script lang="ts">
  import type { Snippet } from "svelte";
  import { ArrowTopRightOnSquareIcon } from "@sidekickicons/svelte/16/solid";

  let {
    href,
    newTab = false,
    children,
  }: {
    href: string;
    newTab?: boolean;
    children: Snippet;
  } = $props();
</script>

<a
  {href}
  target={newTab ? "_blank" : "_self"}
  rel={newTab ? "noopener noreferrer" : ""}
  class="inline-flex items-center gap-0.5 rounded-sm text-indigo-700 hover:text-indigo-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-indigo-400"
>
  {@render children()}
  {#if newTab}
    <ArrowTopRightOnSquareIcon class="size-4" />
  {/if}
</a>
