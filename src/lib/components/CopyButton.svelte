<script lang="ts">
  import { CheckCircleIcon } from "@sidekickicons/svelte/20/solid";
  import { DocumentDuplicateIcon } from "@sidekickicons/svelte/20/solid";
  import { track, type AnalyticsEvent } from "../util/analytics";
  import Button from "./Button.svelte";

  let { textToCopy, event }: { textToCopy: string; event?: AnalyticsEvent } = $props();

  let copied = $state(false);

  // Only a copy that worked says so and counts. The clipboard can be blocked, for
  // example in an iframe or without permission.
  async function copyText() {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      return;
    }
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
