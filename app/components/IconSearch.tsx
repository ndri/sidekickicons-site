"use client";

import icons from "../icons/allicons";
import { useEffect, useState } from "react";
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

export default function IconSearch({}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<HeroiconType>(
    (localStorage.getItem("selectedType") as HeroiconType) || "outline24",
  );
  const [selectedIconSet, setSelectedIconSet] = useState<IconsetSelection>(
    (localStorage.getItem("selectedIconSet") as IconsetSelection) || "All",
  );
  const [selectedSize, setSelectedSize] = useState<IconSize>(
    (localStorage.getItem("selectedSize") as IconSize) || "1x",
  );
  const [selectedCodeType, setSelectedCodeType] = useState<IconCodeType>(
    (localStorage.getItem("selectedCodeType") as IconCodeType) || "SVG",
  );

  const iconsetIcons = icons.filter(
    (icon) => icon.iconset === selectedIconSet || selectedIconSet === "All",
  );

  const filteredIcons = matchSorter(iconsetIcons, searchQuery, {
    keys: [(icon) => dashesToSpaces(icon.kebabName), "keywords"],
  });

  useEffect(() => {
    localStorage.setItem("selectedType", selectedType);
    localStorage.setItem("selectedIconSet", selectedIconSet);
    localStorage.setItem("selectedSize", selectedSize);
    localStorage.setItem("selectedCodeType", selectedCodeType);
  }, [selectedType, selectedIconSet, selectedSize, selectedCodeType]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
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
            values={["1x", "1.5x", "2x"]}
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
          />
        ))}
      </div>
    </div>
  );
}
