<script lang="ts">
  import { InformationCircleIcon } from "@sidekickicons/svelte/20/solid";
  import type { FullHeroicon, HeroiconType, IconCodeType, IconSize } from "../types";
  import { allIconSizeClasses, iconCodeFunctions } from "../util/constants";
  import { svgWithClass } from "../util/code";
  import CopyButton from "./CopyButton.svelte";
  import Button from "./Button.svelte";

  let {
    type,
    fullHeroicon,
    size,
    codeType,
    openDialog,
  }: {
    type: HeroiconType;
    fullHeroicon: FullHeroicon;
    size: IconSize;
    codeType: IconCodeType;
    openDialog: () => void;
  } = $props();

  let expanded = $state(false);
  let card: HTMLDivElement;

  const iconClasses = $derived(allIconSizeClasses[size][type]);
  const name = $derived(fullHeroicon.kebabName);
  const codeToCopy = $derived(iconCodeFunctions[codeType](fullHeroicon, type));

  // Handle clicking outside and tabbing away
  $effect(() => {
    if (!expanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!card.contains(event.target as Node)) {
        expanded = false;
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!card.contains(event.relatedTarget as Node)) {
        expanded = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusout", handleFocusOut);
    };
  });
</script>

<div
  bind:this={card}
  class="grid min-h-28 grid-cols-1 grid-rows-1"
  role="group"
  onmouseenter={() => (expanded = true)}
  onmouseleave={() => (expanded = false)}
>
  <button
    class="col-span-full row-span-full rounded-lg bg-slate-50 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:bg-slate-800"
    aria-expanded={expanded}
    aria-haspopup="true"
    aria-label="{name} icon options"
    onkeydown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Prevent space from scrolling
        expanded = true;
      }
      if (e.key === "Escape" && expanded) {
        expanded = false;
      }
    }}
  >
    <div class="flex flex-col items-center justify-center">
      {@html svgWithClass(
        fullHeroicon[type],
        `${iconClasses} text-slate-700 dark:text-slate-100`,
      )}
      <p
        class="mt-2 max-w-full truncate text-xs text-slate-500 dark:text-slate-400"
        title={name}
      >
        {name}
      </p>
    </div>
  </button>
  {#if expanded}
    <div
      class="z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col justify-center gap-1 p-4"
      role="menu"
      aria-label="{name} icon options"
    >
      <CopyButton textToCopy={codeToCopy} />
      <Button
        text="Info"
        Icon={InformationCircleIcon}
        style="light"
        onclick={openDialog}
      />
    </div>
  {/if}
</div>
