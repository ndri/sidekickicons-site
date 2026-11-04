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

  // "/" or Cmd/Ctrl+K focuses the page's search, unless the user is typing somewhere
  function focusSearch(event: KeyboardEvent) {
    const commandK = event.key === "k" && (event.metaKey || event.ctrlKey);
    if (event.key !== "/" && !commandK) return;
    const target = event.target as HTMLElement;
    if (!commandK && target.closest("input, textarea, select, [contenteditable]"))
      return;
    // Not behind an open dialog
    const search = document.getElementById("search");
    if (!search || document.querySelector("dialog[open]")) return;
    event.preventDefault();
    search.focus();
  }
</script>

<svelte:window onpopstate={syncUrlState} onkeydown={focusSearch} />
<svelte:document onclick={trackOutboundLink} onauxclick={trackOutboundLink} />

{@render children()}
