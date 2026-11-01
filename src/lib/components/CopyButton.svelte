<script lang="ts">
  import { CheckCircleIcon } from "@sidekickicons/svelte/20/solid";
  import { DocumentDuplicateIcon } from "@sidekickicons/svelte/20/solid";
  import { track, type AnalyticsEvent } from "../util/analytics";
  import Button from "./Button.svelte";

  let { textToCopy, event }: { textToCopy: string; event?: AnalyticsEvent } = $props();

  let copied = $state(false);

  function copyText() {
    navigator.clipboard.writeText(textToCopy);
    if (event) track(event);
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
