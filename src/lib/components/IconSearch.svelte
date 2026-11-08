<script lang="ts">
  import icons from "../icons/allicons";
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
  import {
    searchGroupTitles,
    searchIcons as search,
    searchIconsGrouped,
    type SearchGroup,
  } from "../util/search";
  import { urlState } from "../util/urlState.svelte";
  import VerticalRule from "./VerticalRule.svelte";
  import DropdownSelect from "./DropdownSelect.svelte";
  import IconDetailsDialog from "./IconDetailsDialog.svelte";
  import EmptyState from "./EmptyState.svelte";
  import Button from "./Button.svelte";
  import { track } from "../util/analytics";

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
  const iconsetResults = $derived(
    searchQuery.value ? searchIconsGrouped(iconsetIcons, searchQuery.value) : null,
  );

  // When a search in one iconset finds nothing, show matches from all icons instead,
  // with a note above them. The iconset filter itself stays as it is.
  const showingAllIconsets = $derived(
    !!iconsetResults && !iconsetResults.length && selectedIconSet.value !== "All",
  );
  const results = $derived(
    showingAllIconsets ? searchIconsGrouped(icons, searchQuery.value) : iconsetResults,
  );
  const filteredIcons = $derived(
    results ? results.map(({ icon }) => icon) : iconsetIcons,
  );

  // A search's results get group titles when they fall into more than one group
  const groupOf = $derived(new Map(results?.map(({ icon, group }) => [icon, group])));
  const groupCounts = $derived(
    (results ?? []).reduce(
      (counts, { group }) => counts.set(group, (counts.get(group) ?? 0) + 1),
      new Map<SearchGroup, number>(),
    ),
  );
  const showGroupTitles = $derived(groupCounts.size > 1);

  // When it does find some, a note under the results says how many more the other
  // iconset has, so they aren't missed
  const otherIconset = $derived(
    selectedIconSet.value === "Heroicons" ? "Sidekickicons" : "Heroicons",
  );
  const otherIconsetMatchCount = $derived(
    searchQuery.value && selectedIconSet.value !== "All" && !showingAllIconsets
      ? search(
          icons.filter((icon) => icon.iconset !== selectedIconSet.value),
          searchQuery.value,
        ).length
      : 0,
  );

  // A search is tracked once typing has stopped for 1.5 seconds. Searches with no
  // results in the chosen iconset show which icons people look for but don't find.
  // Only typed searches count: one arriving in the URL, from the header search or a
  // shared link, was tracked where it was typed or isn't a new search.
  let typed = $state(false);
  $effect(() => {
    const query = searchQuery.value.trim();
    if (!query || !typed) return;
    const data = {
      query: query.slice(0, 100),
      results: filteredIcons.length,
      iconset: selectedIconSet.value,
      foundInIconset: !showingAllIconsets,
    };
    const timeout = setTimeout(() => track({ name: "search", data }), 1500);
    return () => clearTimeout(timeout);
  });

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
      setSearchQuery={(query) => {
        typed = true;
        searchQuery.value = query;
      }}
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
  {#if showingAllIconsets && filteredIcons.length}
    <p class="-mb-2 text-center text-sm text-slate-500 dark:text-slate-400">
      No {selectedIconSet.value} match
      <span class="font-semibold text-slate-700 dark:text-slate-200"
        >{searchQuery.value}</span
      >, so these are results from all icons.
    </p>
  {/if}
  <div
    class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
  >
    {#each slicedIcons as fullHeroicon, i (fullHeroicon.kebabName)}
      {@const group = groupOf.get(fullHeroicon)}
      {#if showGroupTitles && group && group !== groupOf.get(slicedIcons[i - 1])}
        <h2
          class="col-span-full flex items-baseline gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 {i >
          0
            ? 'mt-4'
            : ''}"
        >
          {searchGroupTitles[group]}
          <span class="font-normal text-slate-500 dark:text-slate-400"
            >{groupCounts.get(group)}</span
          >
        </h2>
      {/if}
      <IconCard
        type={selectedType.value}
        {fullHeroicon}
        size={selectedSize.value}
        codeType={selectedCodeType.value}
        query={searchQuery.value}
        group={groupOf.get(fullHeroicon)}
        openDialog={() => {
          openIconKey.value = fullHeroicon.kebabName;
          track({
            name: "icon-details",
            data: { icon: fullHeroicon.kebabName, iconset: fullHeroicon.iconset },
          });
        }}
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
  {#if otherIconsetMatchCount}
    <div
      class="-mt-2 flex flex-col items-center gap-3 text-center text-sm text-slate-500 dark:text-slate-400"
    >
      <p>
        {otherIconsetMatchCount} more
        {otherIconsetMatchCount === 1 ? "icon" : "icons"} in {otherIconset} match
        <span class="font-semibold text-slate-700 dark:text-slate-200"
          >{searchQuery.value}</span
        >.
      </p>
      <Button
        text="Show results from all icons"
        style="light"
        onclick={() => (selectedIconSet.value = "All")}
      />
    </div>
  {/if}
  {#if openIcon}
    <IconDetailsDialog
      fullHeroicon={openIcon}
      query={searchQuery.value}
      group={groupOf.get(openIcon)}
      closeDialog={() => (openIconKey.value = "")}
    />
  {/if}
</div>
