<script lang="ts">
  import { siteUrl } from "../util/iconPages";

  let {
    title,
    description,
    path,
  }: {
    title: string;
    description: string;
    path: string;
  } = $props();

  const image = `${siteUrl}/opengraph-image.png`;
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
  <meta property="og:image" content={image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>
