<script lang="ts">
  import { noteSegments } from "../util/releaseHistory";
  import Link from "./Link.svelte";

  // A line from a changelog, with its `code` and [links](...) rendered
  let { note }: { note: string } = $props();
</script>

{#each noteSegments(note) as segment, i (i)}
  {#if segment.kind === "code"}
    <code class="rounded-sm bg-slate-100 px-1 text-[0.9em] dark:bg-slate-800"
      >{segment.text}</code
    >
  {:else if segment.kind === "link"}
    <Link href={segment.href} newTab>{segment.text}</Link>
  {:else}
    {segment.text}
  {/if}
{/each}
