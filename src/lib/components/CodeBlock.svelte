<script lang="ts">
  import Prism from "prismjs";
  import "prismjs/components/prism-jsx";
  import "prismjs/components/prism-bash";
  import "$lib/prism-themes.css";
  import CopyButton from "./CopyButton.svelte";

  let { code, language }: { code: string; language: string } = $props();

  const highlightedCode = $derived(
    Prism.highlight(code, Prism.languages[language], language),
  );
</script>

<div
  class="group/code relative w-full overflow-hidden rounded-md ring-1 ring-slate-200 dark:ring-slate-700"
>
  <pre
    class="language-{language} flex-grow rounded-md"
    style="font-size: 0.75rem; margin: 0; padding-top: 0.75rem; padding-bottom: 0.75rem"><code
      class="language-{language}">{@html highlightedCode}</code
    ></pre>
  <div
    class="absolute bottom-1 right-1 top-1 flex flex-row items-start gap-1 opacity-0 group-focus-within/code:opacity-100 group-hover/code:opacity-100 group-focus/code:opacity-100"
  >
    <CopyButton textToCopy={code} />
  </div>
</div>
