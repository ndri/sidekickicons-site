<script lang="ts">
  import Button from "./Button.svelte";
  import { storedState } from "$lib/util/storedState.svelte";

  const dismissed = storedState<"true" | "false">("clankerViewDismissed", "false");
</script>

{#if dismissed.value !== "true"}
  <div
    class="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100 [[data-clanker-view-dismissed]_&]:hidden"
  >
    <img src="/clankerview.svg" alt="ClankerView logo" width="64" height="64" />
    <div class="flex grow flex-col gap-4 sm:flex-row sm:items-center">
      <div class="flex grow flex-col gap-1">
        <p class="text-xs text-amber-700 dark:text-amber-500">
          From the developer of Sidekickicons
        </p>
        <h2 class="font-semibold">Stop waiting weeks for user feedback</h2>
        <p class="text-sm">
          Iterate faster than ever before by unleashing agentic AI personas on your
          product. Get brutally honest UX feedback in minutes with ClankerView.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <Button
          text="Try ClankerView"
          style="amber"
          size="lg"
          href="https://clankerview.com?utm_source=sidekickicons"
          class="whitespace-nowrap"
        />
        <Button
          text="Dismiss"
          style="light"
          size="sm"
          onclick={() => (dismissed.value = "true")}
          class="whitespace-nowrap"
        />
      </div>
    </div>
  </div>
{/if}
