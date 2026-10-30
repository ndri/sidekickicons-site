<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/inter";
  import { afterNavigate } from "$app/navigation";
  import { syncUrlState } from "$lib/util/urlState.svelte";

  let { data, children } = $props();

  afterNavigate(syncUrlState);
</script>

<svelte:head>
  {#if data.plausibleDomain}
    <script
      defer
      data-domain={data.plausibleDomain}
      data-api="/api/event"
      src="/js/script.js"
    ></script>
  {/if}
</svelte:head>

<svelte:window onpopstate={syncUrlState} />

{@render children()}
