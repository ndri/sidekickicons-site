<script lang="ts">
  import type { FullHeroicon, HeroiconType } from "../types";
  import { iconTypeExplanations } from "../util/constants";
  import DescriptionList from "./DescriptionList.svelte";
  import Link from "./Link.svelte";
  import authorsData from "../data/authors.json";

  let { fullHeroicon, type }: { fullHeroicon: FullHeroicon; type: HeroiconType } =
    $props();

  // Get author data if available
  const authorInfo = $derived(
    (authorsData as Record<string, { author: string; authorLink: string; pr: string }>)[
      fullHeroicon.kebabName
    ],
  );
</script>

{#snippet author()}
  <Link href={authorInfo.authorLink} newTab>{authorInfo.author}</Link>
  (<Link href={authorInfo.pr} newTab>PR</Link>)
{/snippet}

<DescriptionList
  rows={[
    ["Component", fullHeroicon.componentName],
    ["Intended size", iconTypeExplanations[type]],
    ["Iconset", fullHeroicon.iconset],
    ["Keywords", fullHeroicon.keywords.join(", ")],
    ...(authorInfo ? [["Author", author] as [string, typeof author]] : []),
  ]}
/>
