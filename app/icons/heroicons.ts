// Don't do this in your project unless you want to ship all icons in your bundle
import * as heroiconsOutline24 from "@heroicons/react/24/outline";
import * as heroiconsSolid24 from "@heroicons/react/24/solid";
import * as heroiconsSolid20 from "@heroicons/react/20/solid";
import * as heroiconsSolid16 from "@heroicons/react/16/solid";
import { NamedHeroicons } from "../types";
import { generateFullHeroicons, omitKeys } from "../util/util";
import { heroiconKeywords } from "../data/keywords";

const deprecated = [
  "ArrowLeftOnRectangleIcon",
  "ArrowRightOnRectangleIcon",
  "ArrowSmallDownIcon",
  "ArrowSmallLeftIcon",
  "ArrowSmallRightIcon",
  "ArrowSmallUpIcon",
  "MinusSmallIcon",
  "PlusSmallIcon",
];

const heroicons = {
  outline24: omitKeys(heroiconsOutline24 as NamedHeroicons, deprecated),
  solid24: omitKeys(heroiconsSolid24 as NamedHeroicons, deprecated),
  solid20: omitKeys(heroiconsSolid20 as NamedHeroicons, deprecated),
  solid16: omitKeys(heroiconsSolid16 as NamedHeroicons, deprecated),
};

const fullHeroicons = generateFullHeroicons(heroicons, heroiconKeywords, "Heroicons");

export default fullHeroicons;
