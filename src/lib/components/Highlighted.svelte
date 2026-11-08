<script lang="ts">
  import type { Range } from "../util/search";

  // Text with the parts that match a search in bold and underlined, so the match doesn't
  // rely on color alone
  let { text, ranges }: { text: string; ranges: Range[] } = $props();

  const parts = $derived.by(() => {
    const result: { text: string; match: boolean }[] = [];
    let at = 0;
    for (const [start, end] of ranges) {
      if (start > at) result.push({ text: text.slice(at, start), match: false });
      result.push({ text: text.slice(start, end), match: true });
      at = end;
    }
    if (at < text.length) result.push({ text: text.slice(at), match: false });
    return result;
  });
</script>

{#each parts as part, i (i)}{#if part.match}<mark
      class="bg-transparent font-semibold text-indigo-700 underline decoration-indigo-400 decoration-2 underline-offset-2 dark:text-indigo-300 dark:decoration-indigo-400"
      >{part.text}</mark
    >{:else}{part.text}{/if}{/each}
