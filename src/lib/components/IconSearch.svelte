<script lang="ts">
  import icons from "../icons/allicons";
  import { matchSorter } from "match-sorter";
  import IconCard from "./IconCard.svelte";
  import type {
    HeroiconType,
    IconCodeType,
    IconSize,
    IconsetSelection,
  } from "../types";
  import {
    codeTypes,
    iconTypeNames,
    iconTypes,
    iconsetSelections,
  } from "../util/constants";
  import SearchInput from "./SearchInput.svelte";
  import ButtonSelect from "./ButtonSelect.svelte";
  import { dashesToSpaces } from "../util/util";
  import { urlState } from "../util/urlState.svelte";
  import VerticalRule from "./VerticalRule.svelte";
  import DropdownSelect from "./DropdownSelect.svelte";
  import IconDetailsDialog from "./IconDetailsDialog.svelte";
  import EmptyState from "./EmptyState.svelte";
  import Button from "./Button.svelte";

  const DEFAULT_ICON_COUNT = 36;

  const searchQuery = urlState("q");
  let showAll = $state(false);
  const selectedType = urlState<HeroiconType>("type", { defaultValue: "outline24" });
  const selectedIconSet = urlState<IconsetSelection>("iconset", {
    defaultValue: "All",
  });
  const selectedSize = urlState<IconSize>("size", { defaultValue: "1×" });
  const selectedCodeType = urlState<IconCodeType>("code", {
    defaultValue: codeTypes[0],
  });
  const openIconKey = urlState<string>("icon", { historyEntry: true });

  const openIcon = $derived(
    openIconKey.value
      ? icons.find((icon) => icon.kebabName === openIconKey.value)
      : null,
  );

  const iconsetIcons = $derived(
    icons.filter(
      (icon) =>
        icon.iconset === selectedIconSet.value || selectedIconSet.value === "All",
    ),
  );
  const filteredIcons = $derived(
    searchQuery.value
      ? matchSorter(iconsetIcons, dashesToSpaces(searchQuery.value), {
          keys: [(icon) => dashesToSpaces(icon.kebabName), "keywords"],
        })
      : iconsetIcons,
  );

  const slicedIcons = $derived(
    showAll ? filteredIcons : filteredIcons.slice(0, DEFAULT_ICON_COUNT),
  );
  const showShowAllButton = $derived(
    filteredIcons.length > DEFAULT_ICON_COUNT && !showAll,
  );
</script>

<div class="flex flex-col gap-6">
  <div class="sticky top-0 z-20 flex flex-col gap-2 bg-white py-2 dark:bg-slate-900">
    <SearchInput
      searchQuery={searchQuery.value}
      setSearchQuery={(query) => (searchQuery.value = query)}
      placeholder="Search all icons..."
    />
    <div
      class="flex flex-col flex-wrap items-center justify-center gap-2 xs:flex-row xs:items-stretch"
    >
      <ButtonSelect
        label="Icon type"
        selectedValue={selectedType.value}
        setSelectedValue={(value) => (selectedType.value = value)}
        values={iconTypes}
        labels={iconTypeNames}
      />
      <VerticalRule />
      <ButtonSelect
        label="Iconset"
        selectedValue={selectedIconSet.value}
        setSelectedValue={(value) => (selectedIconSet.value = value)}
        values={iconsetSelections}
      />
      <VerticalRule />
      <ButtonSelect
        label="Size"
        selectedValue={selectedSize.value}
        setSelectedValue={(value) => (selectedSize.value = value)}
        values={["1×", "1.5×", "2×"]}
      />
      <VerticalRule />
      <DropdownSelect
        label="Code to copy"
        selectedValue={selectedCodeType.value}
        setSelectedValue={(value) => (selectedCodeType.value = value)}
        values={codeTypes}
      />
    </div>
  </div>
  <div
    class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
  >
    {#each slicedIcons as fullHeroicon (fullHeroicon.kebabName)}
      <IconCard
        type={selectedType.value}
        {fullHeroicon}
        size={selectedSize.value}
        codeType={selectedCodeType.value}
        openDialog={() => (openIconKey.value = fullHeroicon.kebabName)}
      />
    {:else}
      <EmptyState searchQuery={searchQuery.value} />
    {/each}
  </div>
  <div class="flex justify-center">
    {#if showShowAllButton}
      <Button
        text="Show all {filteredIcons.length} icons"
        style="light"
        size="lg"
        onclick={() => (showAll = true)}
      />
    {/if}
  </div>
  {#if openIcon}
    <IconDetailsDialog
      fullHeroicon={openIcon}
      closeDialog={() => (openIconKey.value = "")}
    />
  {/if}
</div>
