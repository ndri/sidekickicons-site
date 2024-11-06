"use client";

import icons from "../icons/allicons";
import { useState } from "react";
import { matchSorter } from "match-sorter";
import IconCard from "./IconCard";
import {
  FullHeroicon,
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
import SearchInput from "./SearchInput";
import ButtonSelect from "./ButtonSelect";
import { dashesToSpaces } from "../util/util";
import VerticalRule from "./VerticalRule";
import DropdownSelect from "./DropdownSelect";
import useStoredState from "../util/useStoredState";
import IconDetailsDialog from "./IconDetailsDialog";

export default function IconSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useStoredState<HeroiconType>(
    "selectedType",
    "outline24",
  );
  const [selectedIconSet, setSelectedIconSet] = useStoredState<IconsetSelection>(
    "selectedIconSet",
    "All",
  );
  const [selectedSize, setSelectedSize] = useStoredState<IconSize>(
    "selectedSize",
    "1×",
  );
  const [selectedCodeType, setSelectedCodeType] = useStoredState<IconCodeType>(
    "selectedCodeType",
    "SVG",
  );

  const [openIcon, setOpenIcon] = useState<FullHeroicon | null>(null);

  const iconsetIcons = icons.filter(
    (icon) => icon.iconset === selectedIconSet || selectedIconSet === "All",
  );
  const filteredIcons = matchSorter(iconsetIcons, searchQuery, {
    keys: [(icon) => dashesToSpaces(icon.kebabName), "keywords"],
  });

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
        {filteredIcons.map((fullHeroicon) => (
          <IconCard
            key={fullHeroicon.kebabName}
            type={selectedType}
            fullHeroicon={fullHeroicon}
            size={selectedSize}
            codeType={selectedCodeType}
            openDialog={() => setOpenIcon(fullHeroicon)}
          />
        ))}
      </div>
      {openIcon && (
        <IconDetailsDialog
          fullHeroicon={openIcon}
          defaultType={selectedType}
          defaultCodeType={selectedCodeType}
          closeDialog={() => setOpenIcon(null)}
        />
      )}
    </div>
  );
}
