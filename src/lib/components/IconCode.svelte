<script lang="ts">
  import type { Framework, FullHeroicon, HeroiconType, IconCodeType } from "../types";
  import { codeTypes } from "../util/constants";
  import {
    iconReactCode,
    iconReactNativeCode,
    iconReactNativePlusImportCode,
    iconReactPlusImportCode,
    iconSvelteCode,
    iconSveltePlusImportCode,
    iconSvgCode,
    iconSvgToJsx,
    iconVueCode,
    iconVuePlusImportCode,
    iconsetInstallCode,
  } from "../util/code";
  import ButtonSelect from "./ButtonSelect.svelte";
  import CodeBlock from "./CodeBlock.svelte";

  let {
    fullHeroicon,
    type,
    codeType,
    setCodeType,
  }: {
    fullHeroicon: FullHeroicon;
    type: HeroiconType;
    codeType: IconCodeType;
    setCodeType: (codeType: IconCodeType) => void;
  } = $props();

  const prettySvgCode = $derived(iconSvgCode(fullHeroicon, type));
  const prettyJsxCode = $derived(iconSvgToJsx(prettySvgCode));
  const reactCode = $derived(iconReactCode(fullHeroicon, type));
  const reactPlusImportCode = $derived(iconReactPlusImportCode(fullHeroicon, type));
  const vueCode = $derived(iconVueCode(fullHeroicon, type));
  const vuePlusImportCode = $derived(iconVuePlusImportCode(fullHeroicon, type));
  const svelteCode = $derived(iconSvelteCode(fullHeroicon, type));
  const sveltePlusImportCode = $derived(iconSveltePlusImportCode(fullHeroicon, type));
  const reactNativeCode = $derived(iconReactNativeCode(fullHeroicon, type));
  const reactNativePlusImportCode = $derived(
    iconReactNativePlusImportCode(fullHeroicon, type),
  );
</script>

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
    The Svelte components have a default size, so you only need a size class to change
    it.
  </div>
  <CodeBlock {code} language="jsx" />
{/snippet}

{#snippet reactNativeNotes(code: string)}
  <div class="text-xs text-slate-700 dark:text-slate-300">
    There is no official React Native package for Heroicons, so the Sidekickicons
    package includes them too. It draws icons with react-native-svg.
  </div>
  {@render installCode("react-native")}
  <div class="text-xs text-slate-700 dark:text-slate-300">
    In an Expo app, install react-native-svg with
    <code>npx expo install react-native-svg</code> instead. Icons take
    <code>size</code> and <code>color</code> props.
  </div>
  <CodeBlock {code} language="jsx" />
{/snippet}

<div class="flex w-full flex-col gap-2">
  <ButtonSelect
    label="Code to copy"
    selectedValue={codeType}
    setSelectedValue={setCodeType}
    values={codeTypes}
  />
  {#if codeType === "SVG"}
    <CodeBlock code={prettySvgCode} language="svg" />
  {:else if codeType === "JSX"}
    <CodeBlock code={prettyJsxCode} language="jsx" />
  {:else if codeType === "React"}
    {@render installCode("react")}
    <CodeBlock code={reactCode} language="jsx" />
  {:else if codeType === "React + import"}
    {@render installCode("react")}
    <CodeBlock code={reactPlusImportCode} language="jsx" />
  {:else if codeType === "Vue"}
    {@render installCode("vue")}
    <CodeBlock code={vueCode} language="jsx" />
  {:else if codeType === "Vue + import"}
    {@render installCode("vue")}
    <CodeBlock code={vuePlusImportCode} language="jsx" />
  {:else if codeType === "Svelte"}
    {@render svelteNotes(svelteCode)}
  {:else if codeType === "Svelte + import"}
    {@render svelteNotes(sveltePlusImportCode)}
  {:else if codeType === "React Native"}
    {@render reactNativeNotes(reactNativeCode)}
  {:else if codeType === "React Native + import"}
    {@render reactNativeNotes(reactNativePlusImportCode)}
  {/if}
</div>
