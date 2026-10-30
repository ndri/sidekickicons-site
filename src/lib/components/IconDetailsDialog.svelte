<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import type { FullHeroicon, HeroiconType, IconCodeType } from "../types";
  import DescriptionList from "./DescriptionList.svelte";
  import CodeBlock from "./CodeBlock.svelte";
  import {
    codeTypes,
    iconSizeClasses4x,
    iconTypeExplanations,
    iconTypeNames,
    iconTypes,
  } from "../util/constants";
  import {
    iconReactCode,
    iconReactPlusImportCode,
    iconSvelteCode,
    iconSveltePlusImportCode,
    iconSvgCode,
    iconSvgToJsx,
    iconVueCode,
    iconVuePlusImportCode,
    iconsetInstallCode,
    svgWithClass,
  } from "../util/code";
  import type { Framework } from "../types";
  import { urlState } from "../util/urlState.svelte";
  import ButtonSelect from "./ButtonSelect.svelte";
  import Button from "./Button.svelte";
  import Link from "./Link.svelte";
  import authorsData from "../data/authors.json";

  let {
    fullHeroicon,
    closeDialog,
  }: {
    fullHeroicon: FullHeroicon;
    closeDialog: () => void;
  } = $props();

  const selectedType = urlState<HeroiconType>("type", { defaultValue: "outline24" });
  const selectedCodeType = urlState<IconCodeType>("code", {
    defaultValue: codeTypes[0],
  });

  let dialog: HTMLDialogElement;
  let panel: HTMLDivElement;

  onMount(() => {
    dialog.showModal();
    // showModal focuses the first radio button, which shows a focus ring
    panel.focus();
  });

  // Get author data if available
  const authorInfo = $derived(
    (authorsData as Record<string, { author: string; authorLink: string; pr: string }>)[
      fullHeroicon.kebabName
    ],
  );

  const prettySvgCode = $derived(iconSvgCode(fullHeroicon, selectedType.value));
  const prettyJsxCode = $derived(iconSvgToJsx(prettySvgCode));
  const reactCode = $derived(iconReactCode(fullHeroicon, selectedType.value));
  const reactPlusImportCode = $derived(
    iconReactPlusImportCode(fullHeroicon, selectedType.value),
  );
  const vueCode = $derived(iconVueCode(fullHeroicon, selectedType.value));
  const vuePlusImportCode = $derived(
    iconVuePlusImportCode(fullHeroicon, selectedType.value),
  );
  const svelteCode = $derived(iconSvelteCode(fullHeroicon, selectedType.value));
  const sveltePlusImportCode = $derived(
    iconSveltePlusImportCode(fullHeroicon, selectedType.value),
  );
</script>

{#snippet author()}
  <Link href={authorInfo.authorLink} newTab>{authorInfo.author}</Link>
  (<Link href={authorInfo.pr} newTab>PR</Link>)
{/snippet}

{#snippet installCode(framework: Framework)}
  <CodeBlock
    code={iconsetInstallCode(fullHeroicon.iconset, framework)}
    language="bash"
  />
{/snippet}

{#snippet svelteNotes(code: string)}
  <div class="text-xs text-slate-700 dark:text-slate-300">
    There is no official Svelte package for Heroicons, so the Sidekickicons package
    includes them too.
  </div>
  {@render installCode("svelte")}
  <div class="text-xs text-slate-700 dark:text-slate-300">
    The Svelte components already include the size class.
  </div>
  <CodeBlock {code} language="jsx" />
{/snippet}

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  class="fixed inset-0 z-50 m-0 h-screen max-h-none w-screen max-w-none overflow-y-auto bg-transparent p-0 outline-none backdrop:bg-slate-500 backdrop:bg-opacity-75 dark:backdrop:bg-slate-900 dark:backdrop:bg-opacity-80"
  aria-labelledby="icon-details-title"
  oncancel={(e) => {
    e.preventDefault();
    closeDialog();
  }}
  onclick={(e) => {
    if (!panel.contains(e.target as Node)) closeDialog();
  }}
>
  <div class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
    <div
      bind:this={panel}
      tabindex="-1"
      in:fly={{ y: 16, duration: 300 }}
      out:fade={{ duration: 200 }}
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-slate-800 shadow-xl outline-none transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 dark:bg-slate-800 dark:text-slate-100"
    >
      <div class="flex flex-col items-center gap-6">
        <h3 id="icon-details-title" class="text-center text-lg font-semibold">
          {fullHeroicon.kebabName}
        </h3>
        <div
          class="flex h-36 w-36 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700"
        >
          {@html svgWithClass(
            fullHeroicon[selectedType.value],
            iconSizeClasses4x[selectedType.value],
          )}
        </div>
        <ButtonSelect
          label="Icon type"
          selectedValue={selectedType.value}
          setSelectedValue={(value) => (selectedType.value = value)}
          values={iconTypes}
          labels={iconTypeNames}
        />
        <DescriptionList
          rows={[
            ["Component", fullHeroicon.componentName],
            ["Intended size", iconTypeExplanations[selectedType.value]],
            ["Iconset", fullHeroicon.iconset],
            ["Keywords", fullHeroicon.keywords.join(", ")],
            ...(authorInfo ? [["Author", author] as [string, typeof author]] : []),
          ]}
        />

        <div class="flex w-full flex-col gap-2">
          <ButtonSelect
            label="Code to copy"
            selectedValue={selectedCodeType.value}
            setSelectedValue={(value) => (selectedCodeType.value = value)}
            values={codeTypes}
          />
          {#if selectedCodeType.value === "SVG"}
            <CodeBlock code={prettySvgCode} language="svg" />
          {:else if selectedCodeType.value === "JSX"}
            <CodeBlock code={prettyJsxCode} language="jsx" />
          {:else if selectedCodeType.value === "React"}
            {@render installCode("react")}
            <CodeBlock code={reactCode} language="jsx" />
          {:else if selectedCodeType.value === "React + import"}
            {@render installCode("react")}
            <CodeBlock code={reactPlusImportCode} language="jsx" />
          {:else if selectedCodeType.value === "Vue"}
            {@render installCode("vue")}
            <CodeBlock code={vueCode} language="jsx" />
          {:else if selectedCodeType.value === "Vue + import"}
            {@render installCode("vue")}
            <CodeBlock code={vuePlusImportCode} language="jsx" />
          {:else if selectedCodeType.value === "Svelte"}
            {@render svelteNotes(svelteCode)}
          {:else if selectedCodeType.value === "Svelte + import"}
            {@render svelteNotes(sveltePlusImportCode)}
          {/if}
        </div>
      </div>
      <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
        <Button text="Close" style="light" onclick={closeDialog} />
      </div>
    </div>
  </div>
</dialog>
