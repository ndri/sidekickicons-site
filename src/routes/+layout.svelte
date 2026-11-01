<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/inter";
  import { afterNavigate } from "$app/navigation";
  import { syncUrlState } from "$lib/util/urlState.svelte";
  import { track } from "$lib/util/analytics";

  let { children } = $props();

  afterNavigate(syncUrlState);

  // Clicks on links to other sites, including middle clicks
  function trackOutboundLink(event: MouseEvent) {
    const link = (event.target as Element | null)?.closest?.("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;
    if (link.origin === window.location.origin) return;
    track({ name: "outbound", data: { link: link.href.slice(0, 300) } });
  }
</script>

<svelte:window onpopstate={syncUrlState} />
<svelte:document onclick={trackOutboundLink} onauxclick={trackOutboundLink} />

{@render children()}
