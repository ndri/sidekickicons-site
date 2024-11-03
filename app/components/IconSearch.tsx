"use client";

import icons from "../icons/allicons";
import { useState } from "react";
import { matchSorter } from "match-sorter";
import IconCard from "./IconCard";
import { HeroiconType } from "../types";
import { iconTypeNames, iconTypes } from "../util/constants";
import SearchInput from "./SearchInput";
import ButtonSelect from "./ButtonSelect";
import { dashesToSpaces } from "../util/util";

export default function IconSearch({}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<HeroiconType>(iconTypes[0]);

  const filteredIcons = matchSorter(icons, searchQuery, {
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
        <ButtonSelect<HeroiconType>
          selectedValue={selectedType}
          setSelectedValue={setSelectedType}
          values={iconTypes}
          labels={iconTypeNames}
        />
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
