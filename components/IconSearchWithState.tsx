"use client";

import { useState } from "react";
import { HeroiconType, IconCodeType, IconSize, IconsetSelection } from "../types";
import { codeTypes } from "../util/constants";
import useUrlState from "@/util/useUrlState";
import IconSearch, { IconSearchProps } from "./IconSearch";

export default function IconSearchWithState() {
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

  const [openIconKey, setOpenIconKey] = useUrlState<string>("icon", {
    historyEntry: true,
  });

  const props: IconSearchProps = {
    searchQuery,
    setSearchQuery,
    showAll,
    setShowAll,
    selectedType,
    setSelectedType,
    selectedIconSet,
    setSelectedIconSet,
    selectedSize,
    setSelectedSize,
    selectedCodeType,
    setSelectedCodeType,
    openIconKey,
    setOpenIconKey,
  };

  return <IconSearch {...props} />;
}
