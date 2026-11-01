<script lang="ts">
  import { siteUrl } from "../util/iconPages";

  let {
    title,
    description,
    path,
    image = {
      path: "/opengraph-image.png",
      alt: "Heroicons + Sidekickicons: browse your favourite icons and their fanmade companions",
    },
  }: {
    title: string;
    description: string;
    path: string;
    // A 1200 × 630 PNG
    image?: { path: string; alt: string };
  } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={siteUrl + path} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={siteUrl + path} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image" content={siteUrl + image.path} />
  <meta property="og:image:alt" content={image.alt} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={siteUrl + image.path} />
  <meta name="twitter:image:alt" content={image.alt} />
</svelte:head>
