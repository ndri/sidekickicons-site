<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import Link from "$lib/components/Link.svelte";
  import IconLinkList from "$lib/components/IconLinkList.svelte";

  let { data } = $props();
</script>

<PageMeta
  title="All icons – Heroicons and Sidekickicons"
  description="Every Sidekickicons and Heroicons icon, with code for React, Vue, Svelte and SVG."
  path="/icons"
/>

<div class="flex flex-col items-center">
  <Header compact />
  <main class="flex w-full max-w-7xl flex-col gap-10 p-4 sm:p-8">
    <div class="flex flex-col gap-3">
      <p class="text-sm"><Link href="/">← Search icons</Link></p>
      <h1 class="text-2xl font-bold sm:text-3xl">All icons</h1>
      <p class="text-slate-500 dark:text-slate-400">
        Sidekickicons are fanmade icons in the Heroicons style, for the icons Heroicons
        doesn't have. Every icon comes in outline, solid, mini and micro styles.
      </p>
    </div>

    {#each data.iconsets as { iconset, icons } (iconset)}
      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">
          {iconset}
          <span class="font-normal text-slate-500 dark:text-slate-400">
            ({icons.length})
          </span>
        </h2>
        <IconLinkList {icons} />
      </section>
    {/each}
  </main>
  <Footer />
</div>
