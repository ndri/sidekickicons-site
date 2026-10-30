<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import IconSearch from "$lib/components/IconSearch.svelte";
  import Ad from "$lib/components/Ad.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
</script>

<PageMeta
  title="Sidekickicons"
  description="Fanmade icons to complement Heroicons"
  path="/"
/>

<div class="flex flex-col items-center">
  <Header />
  <main class="flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-8">
    <Ad />
    <IconSearch />
  </main>
  <Footer />
</div>
