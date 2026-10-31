<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/inter";
  import { afterNavigate } from "$app/navigation";
  import { syncUrlState } from "$lib/util/urlState.svelte";

  let { children } = $props();

  afterNavigate(syncUrlState);
</script>

<svelte:window onpopstate={syncUrlState} />

{@render children()}
