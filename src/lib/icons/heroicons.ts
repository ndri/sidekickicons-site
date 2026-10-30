import iconData from "virtual:icon-data";
import { omitKeys } from "../util/util";
import { heroiconKeywords } from "../data/keywords";
import { generateFullHeroicons } from "../util/icons";
import { deprecatedHeroicons } from "../util/constants";

const icons = iconData.Heroicons;

const heroicons = {
  outline24: omitKeys(icons.outline24, deprecatedHeroicons),
  solid24: omitKeys(icons.solid24, deprecatedHeroicons),
  solid20: omitKeys(icons.solid20, deprecatedHeroicons),
  solid16: omitKeys(icons.solid16, deprecatedHeroicons),
};

const fullHeroicons = generateFullHeroicons(heroicons, heroiconKeywords, "Heroicons");

export default fullHeroicons;
