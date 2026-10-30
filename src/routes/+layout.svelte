<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/inter";

  let { data, children } = $props();
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

{@render children()}
