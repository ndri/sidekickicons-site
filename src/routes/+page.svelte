<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import IconSearch from "$lib/components/IconSearch.svelte";
  import Ad from "$lib/components/Ad.svelte";

  const title = "Sidekickicons";
  const description = "Fanmade icons to complement Heroicons";
  const image = "https://sidekickicons.com/opengraph-image.png";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image" content={image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>

<div class="flex flex-col items-center">
  <Header />
  <main class="flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-8">
    <Ad />
    <IconSearch />
  </main>
  <Footer />
</div>
