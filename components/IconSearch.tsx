"use client";

import icons from "../icons/allicons";
import { useState } from "react";
import { matchSorter } from "match-sorter";
import IconCard from "./IconCard";
import { HeroiconType, IconCodeType, IconSize, IconsetSelection } from "../types";
import {
  codeTypes,
  iconTypeNames,
  iconTypes,
  iconsetSelections,
} from "../util/constants";
import SearchInput from "./SearchInput";
import ButtonSelect from "./ButtonSelect";
import { dashesToSpaces } from "../util/util";
import VerticalRule from "./VerticalRule";
import DropdownSelect from "./DropdownSelect";
import IconDetailsDialog from "./IconDetailsDialog";
import useUrlState from "@/util/useUrlState";
import EmptyState from "./EmptyState";
import Button from "./Button";

const DEFAULT_SLICE_SIZE = 36;

export default function IconSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedType, setSelectedType] = useUrlState<HeroiconType>("type", {
    defaultValue: "outline24",
  });
  const [selectedIconSet, setSelectedIconSet] = useUrlState<IconsetSelection>(
    "iconset",
    { defaultValue: "All" },
  );
  const [selectedSize, setSelectedSize] = useUrlState<IconSize>("size", {
    defaultValue: "1×",
  });
  const [selectedCodeType, setSelectedCodeType] = useUrlState<IconCodeType>("code", {
    defaultValue: codeTypes[0],
  });

  type IconKey = (typeof icons)[number]["kebabName"];
  const [openIconKey, setOpenIconKey] = useUrlState<IconKey | "">("icon", {
    historyEntry: true,
  });
  const openIcon = openIconKey
    ? icons.find((icon) => icon.kebabName === openIconKey)
    : null;

  const iconsetIcons = icons.filter(
    (icon) => icon.iconset === selectedIconSet || selectedIconSet === "All",
  );
  const filteredIcons = searchQuery
    ? matchSorter(iconsetIcons, dashesToSpaces(searchQuery), {
        keys: [(icon) => dashesToSpaces(icon.kebabName), "keywords"],
      })
    : iconsetIcons;

  const slicedIcons = showAll
    ? filteredIcons
    : filteredIcons.slice(0, DEFAULT_SLICE_SIZE);
  const showShowAllButton = filteredIcons.length > DEFAULT_SLICE_SIZE && !showAll;

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-20 flex flex-col gap-2 bg-white py-2 dark:bg-slate-900">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search all icons..."
        />
        <div className="flex flex-col flex-wrap items-center justify-center gap-2 xs:flex-row xs:items-stretch">
          <ButtonSelect<HeroiconType>
            label="Icon type"
            selectedValue={selectedType}
            setSelectedValue={setSelectedType}
            values={iconTypes}
            labels={iconTypeNames}
          />
          <VerticalRule />
          <ButtonSelect<IconsetSelection>
            label="Iconset"
            selectedValue={selectedIconSet}
            setSelectedValue={setSelectedIconSet}
            values={iconsetSelections}
          />
          <VerticalRule />
          <ButtonSelect<IconSize>
            label="Size"
            selectedValue={selectedSize}
            setSelectedValue={setSelectedSize}
            values={["1×", "1.5×", "2×"]}
          />
          <VerticalRule />
          <DropdownSelect<IconCodeType>
            label="Code to copy"
            selectedValue={selectedCodeType}
            setSelectedValue={setSelectedCodeType}
            values={codeTypes}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {slicedIcons.length ? (
          slicedIcons.map((fullHeroicon) => (
            <IconCard
              key={fullHeroicon.kebabName}
              type={selectedType}
              fullHeroicon={fullHeroicon}
              size={selectedSize}
              codeType={selectedCodeType}
              openDialog={() => setOpenIconKey(fullHeroicon.kebabName)}
            />
          ))
        ) : (
          <EmptyState searchQuery={searchQuery} />
        )}
      </div>
      <div className="flex justify-center">
        {showShowAllButton && (
          <Button
            text={`Show all ${filteredIcons.length} icons`}
            style="light"
            size="lg"
            onClick={() => setShowAll(true)}
          />
        )}
      </div>
      {openIcon && (
        <IconDetailsDialog
          fullHeroicon={openIcon}
          closeDialog={() => setOpenIconKey("")}
        />
      )}
    </div>
  );
}
