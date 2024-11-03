"use client";

import icons from "../icons/allicons";
import { useState } from "react";
import { matchSorter } from "match-sorter";
import IconCard from "./IconCard";
import { HeroiconType, IconsetSelection } from "../types";
import { iconTypeNames, iconTypes, iconsetSelections } from "../util/constants";
import SearchInput from "./SearchInput";
import ButtonSelect from "./ButtonSelect";
import { dashesToSpaces } from "../util/util";
import VerticalRule from "./VerticalRule";

export default function IconSearch({}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<HeroiconType>(iconTypes[0]);
  const [selectedIconSet, setSelectedIconSet] = useState<IconsetSelection>("All");

  const iconsetIcons = icons.filter(
    (icon) => icon.iconset === selectedIconSet || selectedIconSet === "All"
  );

  const filteredIcons = matchSorter(iconsetIcons, searchQuery, {
    keys: [(icon) => dashesToSpaces(icon.kebabName), "keywords"],
  });

  return (
    <div className="flex flex-col gap-4">
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
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {filteredIcons.map((fullHeroicon) => (
          <IconCard
            key={fullHeroicon.kebabName}
            name={fullHeroicon.kebabName}
            type={selectedType}
            Icon={fullHeroicon[selectedType]}
          />
        ))}
      </div>
    </div>
  );
}
