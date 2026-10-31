<script lang="ts">
  import { page } from "$app/state";
  import { FaceFrownIcon } from "@sidekickicons/svelte/24/outline";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Link from "$lib/components/Link.svelte";

  const notFound = $derived(page.status === 404);
</script>

<svelte:head>
  <title>{notFound ? "Page not found" : "Something went wrong"} · Sidekickicons</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="flex flex-col items-center">
  <Header compact />
  <main
    class="flex w-full max-w-7xl flex-col items-center gap-4 p-12 text-center sm:p-24"
  >
    <FaceFrownIcon class="size-10 text-slate-400 dark:text-slate-500" />
    <h1 class="text-2xl font-bold">
      {notFound ? "Page not found" : "Something went wrong"}
    </h1>
    <p>
      {notFound
        ? "There's no page at this address."
        : "This page couldn't be loaded. Try reloading it."}
    </p>
    <p>
      <Link href="/">Search all icons</Link> or <Link href="/icons"
        >browse the icon list</Link
      >.
    </p>
  </main>
  <Footer />
</div>
