// Don't do this in your project unless you want to ship all icons in your bundle
import * as heroiconsOutline24 from "@heroicons/react/24/outline";
import * as heroiconsSolid24 from "@heroicons/react/24/solid";
import * as heroiconsSolid20 from "@heroicons/react/20/solid";
import * as heroiconsSolid16 from "@heroicons/react/16/solid";
import { NamedHeroicons } from "../types";
import { generateFullHeroicons, toKebabCase } from "../util/util";
import { heroiconKeywords } from "../data/keywords";

const heroicons = {
  outline24: heroiconsOutline24 as NamedHeroicons,
  solid24: heroiconsSolid24 as NamedHeroicons,
  solid20: heroiconsSolid20 as NamedHeroicons,
  solid16: heroiconsSolid16 as NamedHeroicons,
};

const fullHeroicons = generateFullHeroicons(heroicons, heroiconKeywords, "Heroicons");

export default fullHeroicons;
