import { matchSorter } from "match-sorter";
import type { FullHeroicon } from "../types";
import { dashesToSpaces } from "./util";

// Icons matching a search by name or keyword, best matches first
export const searchIcons = (list: readonly FullHeroicon[], query: string) =>
  matchSorter(list, dashesToSpaces(query), {
    keys: [(icon) => dashesToSpaces(icon.kebabName), "keywords"],
  });
