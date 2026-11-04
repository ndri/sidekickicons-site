<script lang="ts">
  import { ArrowDownTrayIcon } from "@sidekickicons/svelte/20/solid";
  import type { FullHeroicon, HeroiconType } from "../types";
  import { track } from "../util/analytics";
  import { iconTypeNames } from "../util/constants";
  import { coloredSvg, svgToPng } from "../util/download";
  import Button from "./Button.svelte";
  import ButtonSelect from "./ButtonSelect.svelte";
  import DropdownSelect from "./DropdownSelect.svelte";

  // The icon in a color, size and background of your choosing, to download as SVG or PNG

  let { icon, type }: { icon: FullHeroicon; type: HeroiconType } = $props();

  const nativeSizes: Record<HeroiconType, number> = {
    outline24: 24,
    solid24: 24,
    solid20: 20,
    solid16: 16,
  };
  const sizes = ["16", "20", "24", "32", "48", "64", "96", "128", "256", "512"];

  // "Default" keeps currentColor in the SVG, so it takes the text color where it's used
  const presetColors = [
    { name: "Default", value: "currentColor" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Slate", value: "#62748e" },
    { name: "Indigo", value: "#4f39f6" },
    { name: "Red", value: "#e7000b" },
  ];

  type Background = "None" | "White" | "Black";
  const backgroundColors: Record<Background, string | null> = {
    None: null,
    White: "#ffffff",
    Black: "#000000",
  };

  let chosenSize: string | null = $state(null);
  const size = $derived(chosenSize ?? String(nativeSizes[type]));
  let color = $state("currentColor");
  let customColor = $state("#0ea5e9");
  let background = $state<Background>("None");
  const isCustom = $derived(!presetColors.some((preset) => preset.value === color));

  // The color the default shows as, in the preview and in PNGs
  const shownColor = $derived(
    color !== "currentColor" ? color : background === "Black" ? "#ffffff" : "#000000",
  );

  const svgFor = (iconColor: string) =>
    coloredSvg(icon[type], {
      color: iconColor,
      size: Number(size),
      background: backgroundColors[background],
    });

  const fileName = $derived(
    `${icon.kebabName}-${iconTypeNames[type].toLowerCase()}-${size}`,
  );

  function save(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function trackDownload(format: "SVG" | "PNG") {
    track({
      name: "download",
      data: {
        icon: icon.kebabName,
        iconset: icon.iconset,
        style: iconTypeNames[type],
        format,
        size: Number(size),
        color: presetColors.find((preset) => preset.value === color)?.name ?? "Custom",
        background,
      },
    });
  }

  function downloadSvg() {
    save(new Blob([svgFor(color)], { type: "image/svg+xml" }), `${fileName}.svg`);
    trackDownload("SVG");
  }

  async function downloadPng() {
    save(await svgToPng(svgFor(shownColor), Number(size)), `${fileName}.png`);
    trackDownload("PNG");
  }

  // Shown at its real size up to 192 px, so small sizes look as they will
  const previewSize = $derived(Math.min(Number(size), 192));
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
  <div
    class="flex h-64 items-center justify-center rounded-lg ring-1 ring-slate-200 ring-inset dark:ring-slate-700 {background ===
    'None'
      ? 'checkerboard'
      : ''}"
    style:background-color={backgroundColors[background]}
  >
    <img
      src="data:image/svg+xml;charset=utf-8,{encodeURIComponent(svgFor(shownColor))}"
      alt="{icon.kebabName} icon preview"
      width={previewSize}
      height={previewSize}
    />
  </div>

  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium">Color</p>
      <div
        class="flex flex-wrap items-center gap-2"
        role="radiogroup"
        aria-label="Color"
      >
        {#each presetColors as preset (preset.value)}
          <label class="cursor-pointer" title={preset.name}>
            <input
              type="radio"
              class="peer sr-only"
              name="preview-color"
              value={preset.value}
              checked={color === preset.value}
              onchange={() => (color = preset.value)}
            />
            <span
              class="flex size-8 items-center justify-center rounded-full ring-1 ring-slate-300 peer-checked:ring-2 peer-checked:ring-indigo-600 peer-checked:ring-offset-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-indigo-600 dark:ring-slate-600 dark:ring-offset-slate-900 dark:peer-checked:ring-indigo-400"
              style:background-color={preset.value === "currentColor"
                ? undefined
                : preset.value}
            >
              {#if preset.value === "currentColor"}
                <span class="text-xs font-semibold">Aa</span>
              {/if}
              <span class="sr-only">{preset.name}</span>
            </span>
          </label>
        {/each}
        <!-- Selected when the color isn't a preset -->
        <label
          class="relative flex size-8 cursor-pointer items-center justify-center overflow-hidden rounded-full ring-1 ring-slate-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-indigo-600 dark:ring-slate-600 dark:ring-offset-slate-900 {isCustom
            ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-indigo-400'
            : ''}"
          style:background-color={customColor}
          title="Custom color"
        >
          <input
            type="color"
            class="absolute inset-0 cursor-pointer opacity-0"
            value={customColor}
            oninput={(event) => {
              customColor = event.currentTarget.value;
              color = customColor;
            }}
            aria-label="Custom color"
          />
        </label>
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Default keeps <code>currentColor</code> in the SVG, so it takes the color of the text
        around it.
      </p>
    </div>

    <div class="flex flex-wrap gap-x-8 gap-y-5">
      <div class="flex flex-col gap-2">
        <p class="text-sm font-medium">Size in pixels</p>
        <DropdownSelect
          label="Size in pixels"
          selectedValue={size}
          setSelectedValue={(value) => (chosenSize = value)}
          values={sizes}
        />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-sm font-medium">Background</p>
        <ButtonSelect
          label="Background"
          selectedValue={background}
          setSelectedValue={(value) => (background = value)}
          values={["None", "White", "Black"] as Background[]}
        />
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Button text="Download SVG" Icon={ArrowDownTrayIcon} onclick={downloadSvg} />
      <Button
        text="Download PNG"
        Icon={ArrowDownTrayIcon}
        style="light"
        onclick={downloadPng}
      />
    </div>
  </div>
</div>

<style>
  .checkerboard {
    background-image: conic-gradient(
      var(--color-slate-100) 25%,
      transparent 0 50%,
      var(--color-slate-100) 0 75%,
      transparent 0
    );
    background-size: 16px 16px;
  }
  :global(.dark) .checkerboard {
    background-image: conic-gradient(
      var(--color-slate-800) 25%,
      transparent 0 50%,
      var(--color-slate-800) 0 75%,
      transparent 0
    );
  }
</style>
