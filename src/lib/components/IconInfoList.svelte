<script lang="ts">
  import type { FullHeroicon, HeroiconType } from "../types";
  import { iconTypeExplanations } from "../util/constants";
  import DescriptionList from "./DescriptionList.svelte";
  import Link from "./Link.svelte";
  import authorsData from "../data/authors.json";
  import { keywordMatchRanges, type SearchGroup } from "../util/search";
  import Highlighted from "./Highlighted.svelte";

  let {
    fullHeroicon,
    type,
    query = "",
    group,
  }: {
    fullHeroicon: FullHeroicon;
    type: HeroiconType;
    // A search to highlight in the keywords
    query?: string;
    group?: SearchGroup;
  } = $props();

  const keywordRanges = $derived(
    keywordMatchRanges(fullHeroicon.keywords, query, group),
  );

  // Get author data if available
  const authorInfo = $derived(
    (authorsData as Record<string, { author: string; authorLink: string; pr: string }>)[
      fullHeroicon.kebabName
    ],
  );
</script>

{#snippet keywords()}
  {#each fullHeroicon.keywords as keyword, i (keyword)}{#if i > 0}{", "}{/if}<Highlighted
      text={keyword}
      ranges={keywordRanges[i]}
    />{/each}
{/snippet}

{#snippet author()}
  <Link href={authorInfo.authorLink} newTab>{authorInfo.author}</Link>
  (<Link href={authorInfo.pr} newTab>PR</Link>)
{/snippet}

<DescriptionList
  rows={[
    ["Component", fullHeroicon.componentName],
    ["Intended size", iconTypeExplanations[type]],
    ["Iconset", fullHeroicon.iconset],
    ["Keywords", keywords],
    ...(authorInfo ? [["Author", author] as [string, typeof author]] : []),
  ]}
/>
