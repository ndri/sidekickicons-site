<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import IconSearch from "$lib/components/IconSearch.svelte";
  import Ad from "$lib/components/Ad.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import icons from "$lib/icons/allicons";

  const sidekickiconCount = icons.filter(
    (icon) => icon.iconset === "Sidekickicons",
  ).length;
</script>

<PageMeta
  title="Sidekickicons · {sidekickiconCount} icons Heroicons is missing, for React, Vue & Svelte"
  description="Browse Heroicons and Sidekickicons, {sidekickiconCount} fanmade icons in the Heroicons style for the icons Heroicons doesn't have. Copy SVG, React, Vue, Svelte or React Native code."
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
