"use client";

import icons from "../icons/allicons";
import { useState } from "react";
import { matchSorter } from "match-sorter";
import IconCard from "./IconCard";
import { HeroiconType, IconSize, IconsetSelection } from "../types";
import { iconTypeNames, iconTypes, iconsetSelections } from "../util/constants";
import SearchInput from "./SearchInput";
import ButtonSelect from "./ButtonSelect";
import { dashesToSpaces } from "../util/util";
import VerticalRule from "./VerticalRule";

export default function IconSearch({}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<HeroiconType>(iconTypes[0]);
  const [selectedIconSet, setSelectedIconSet] = useState<IconsetSelection>("All");
  const [selectedSize, setSelectedSize] = useState<IconSize>("1x");

  const iconsetIcons = icons.filter(
    (icon) => icon.iconset === selectedIconSet || selectedIconSet === "All",
  );

  const filteredIcons = matchSorter(iconsetIcons, searchQuery, {
    keys: [(icon) => dashesToSpaces(icon.kebabName), "keywords"],
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search all icons..."
        />
        <div className="flex gap-2">
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
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {filteredIcons.map((fullHeroicon) => (
          <IconCard
            key={fullHeroicon.kebabName}
            type={selectedType}
            fullHeroicon={fullHeroicon}
            size={selectedSize}
          />
        ))}
      </div>
    </div>
  );
}
