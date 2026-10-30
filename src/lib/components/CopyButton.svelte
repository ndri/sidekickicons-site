<script lang="ts">
  import { CheckCircleIcon } from "@sidekickicons/svelte/20/solid";
  import { DocumentDuplicateIcon } from "@sidekickicons/svelte/20/solid";
  import Button from "./Button.svelte";

  let { textToCopy }: { textToCopy: string } = $props();

  let copied = $state(false);

  function copyText() {
    navigator.clipboard.writeText(textToCopy);
    copied = true;
    setTimeout(() => (copied = false), 1337);
  }
</script>

<Button
  text={copied ? "Copied!" : "Copy"}
  Icon={copied ? CheckCircleIcon : DocumentDuplicateIcon}
  style="light"
  onclick={copyText}
/>
