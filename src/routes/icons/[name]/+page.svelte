<script lang="ts">
  import {
    ArrowLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  } from "@sidekickicons/svelte/16/solid";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import Link from "$lib/components/Link.svelte";
  import IconInfoList from "$lib/components/IconInfoList.svelte";
  import IconCode from "$lib/components/IconCode.svelte";
  import IconExamples from "$lib/components/IconExamples.svelte";
  import IconLinkList from "$lib/components/IconLinkList.svelte";
  import type { HeroiconType, IconCodeType } from "$lib/types";
  import {
    codeTypes,
    iconSizeClasses2x,
    iconTypeExplanations,
    iconTypeNames,
    iconTypes,
  } from "$lib/util/constants";
  import { svgWithClass } from "$lib/util/code";
  import {
    iconDescription,
    iconExampleText,
    iconMetaDescription,
    iconPagePath,
    iconTitle,
  } from "$lib/util/iconPages";
  import { urlState } from "$lib/util/urlState.svelte";
  import { heroiconsDiscussionUrl } from "$lib/data/missingHeroicons";

  let { data } = $props();

  const icon = $derived(data.icon);
  const title = $derived(iconTitle(icon.kebabName));

  const selectedType = urlState<HeroiconType>("type", { defaultValue: "outline24" });
  const selectedCodeType = urlState<IconCodeType>("code", {
    defaultValue: codeTypes[0],
  });
</script>

{#snippet neighbour(link: { kebabName: string; svg: string }, rel: "prev" | "next")}
  <a
    href={iconPagePath(link.kebabName)}
    {rel}
    class="group inline-flex items-center gap-x-1.5 rounded-md bg-white px-2 py-1 font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700"
    aria-label="{rel === 'prev' ? 'Previous' : 'Next'} icon: {link.kebabName}"
  >
    {#if rel === "prev"}
      <ChevronLeftIcon class="text-slate-400 group-hover:text-slate-500" />
    {/if}
    {@html svgWithClass(link.svg, "size-5 shrink-0")}
    <span class="max-w-28 truncate sm:max-w-56">{link.kebabName}</span>
    {#if rel === "next"}
      <ChevronRightIcon class="text-slate-400 group-hover:text-slate-500" />
    {/if}
  </a>
{/snippet}

<PageMeta
  title="{title} icon · {icon.iconset} for React, Vue & Svelte"
  description={iconMetaDescription(icon)}
  path={iconPagePath(icon.kebabName)}
/>

<div class="flex flex-col items-center">
  <Header compact />
  <main class="flex w-full max-w-7xl flex-col gap-12 p-4 sm:p-8">
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm">
        <Link href="/icons"><ArrowLeftIcon class="mr-0.5" />All icons</Link>
        <nav class="flex gap-2" aria-label="Previous and next icon">
          {#if data.previous}
            {@render neighbour(data.previous, "prev")}
          {/if}
          {#if data.next}
            {@render neighbour(data.next, "next")}
          {/if}
        </nav>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
        <div class="flex flex-col gap-3">
          <h1 class="text-2xl font-bold sm:text-3xl">{title} icon</h1>
          <p class="font-mono text-sm text-slate-500 dark:text-slate-400">
            {icon.kebabName}
          </p>
          <p>{iconDescription(icon)}</p>
          {#if data.heroiconsRequest}
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Missing from Heroicons, where it was requested with
              {data.heroiconsRequest.votes} votes in
              {#each data.heroiconsRequest.discussions as discussion, i (discussion)}
                {#if i > 0}{" and "}{/if}
                <Link href={heroiconsDiscussionUrl(discussion)} newTab
                  >#{discussion}</Link
                >
              {/each}.
            </p>
          {/if}
        </div>

        <div class="lg:col-start-1">
          <IconInfoList fullHeroicon={icon} type={selectedType.value} />
        </div>

        <!-- Second on small screens, right column on large ones -->
        <div
          class="row-start-2 grid grid-cols-2 gap-4 self-start lg:col-start-2 lg:row-span-2 lg:row-start-1"
          role="radiogroup"
          aria-label="Icon type"
        >
          {#each iconTypes as type (type)}
            <label class="cursor-pointer">
              <input
                type="radio"
                class="peer sr-only"
                name="icon-type"
                value={type}
                checked={type === selectedType.value}
                onchange={() => (selectedType.value = type)}
              />
              <span
                class="flex h-full flex-col items-center gap-3 rounded-lg bg-slate-50 p-6 ring-inset hover:bg-slate-100 peer-checked:ring-2 peer-checked:ring-indigo-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:peer-checked:ring-indigo-400"
              >
                <span class="flex h-12 items-center">
                  {@html svgWithClass(
                    icon[type],
                    `${iconSizeClasses2x[type]} text-slate-700 dark:text-slate-100`,
                  )}
                </span>
                <span class="text-center">
                  <span class="block text-sm font-medium">{iconTypeNames[type]}</span>
                  <span class="block text-xs text-slate-500 dark:text-slate-400">
                    {iconTypeExplanations[type]}
                  </span>
                </span>
              </span>
            </label>
          {/each}
        </div>
      </div>
    </div>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">Code</h2>
      <IconCode
        fullHeroicon={icon}
        type={selectedType.value}
        codeType={selectedCodeType.value}
        setCodeType={(value) => (selectedCodeType.value = value)}
      />
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{title} icon in UI elements</h2>
      <IconExamples fullHeroicon={icon} text={iconExampleText(icon)} />
    </section>

    {#if data.related.length}
      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">Related icons</h2>
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {#each data.related as related (related.kebabName)}
            <a
              href={iconPagePath(related.kebabName)}
              class="flex min-h-28 flex-col items-center justify-center rounded-lg bg-slate-50 p-4 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {@html svgWithClass(
                related.svg,
                "size-6 text-slate-700 dark:text-slate-100",
              )}
              <span
                class="mt-2 max-w-full truncate text-xs text-slate-500 dark:text-slate-400"
              >
                {related.kebabName}
              </span>
            </a>
          {/each}
        </div>
      </section>
    {/if}

    {#if data.otherSidekickicons.length}
      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">More Sidekickicons</h2>
        <IconLinkList icons={data.otherSidekickicons} />
      </section>
    {/if}
  </main>
  <Footer />
</div>
