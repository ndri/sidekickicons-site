<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import type { FullHeroicon, HeroiconType, IconCodeType } from "../types";
  import {
    codeTypes,
    iconSizeClasses4x,
    iconTypeNames,
    iconTypes,
  } from "../util/constants";
  import { svgWithClass } from "../util/code";
  import { iconPagePath } from "../util/iconPages";
  import { urlState } from "../util/urlState.svelte";
  import ButtonSelect from "./ButtonSelect.svelte";
  import Button from "./Button.svelte";
  import Link from "./Link.svelte";
  import IconInfoList from "./IconInfoList.svelte";
  import IconCode from "./IconCode.svelte";

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
</script>

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
        <Link href={iconPagePath(fullHeroicon.kebabName)}>View icon page</Link>
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
        <IconInfoList {fullHeroicon} type={selectedType.value} />
        <IconCode
          {fullHeroicon}
          type={selectedType.value}
          codeType={selectedCodeType.value}
          setCodeType={(value) => (selectedCodeType.value = value)}
        />
      </div>
      <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
        <Button text="Close" style="light" onclick={closeDialog} />
      </div>
    </div>
  </div>
</dialog>
