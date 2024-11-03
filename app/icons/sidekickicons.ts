// Don't do this in your project unless you want to ship all icons in your bundle
import * as sidekickiconsOutline24 from "@sidekickicons/react/24/outline";
import * as sidekickiconsSolid24 from "@sidekickicons/react/24/solid";
import * as sidekickiconsSolid20 from "@sidekickicons/react/20/solid";
import * as sidekickiconsSolid16 from "@sidekickicons/react/16/solid";
import { NamedHeroicons } from "../types";
import { generateFullHeroicons } from "../util/util";
import { sidekickiconKeywords } from "../data/keywords";

const sidekickicons = {
  outline24: sidekickiconsOutline24 as NamedHeroicons,
  solid24: sidekickiconsSolid24 as NamedHeroicons,
  solid20: sidekickiconsSolid20 as NamedHeroicons,
  solid16: sidekickiconsSolid16 as NamedHeroicons,
};

const fullSidekickicons = generateFullHeroicons(
  sidekickicons,
  sidekickiconKeywords,
  "Sidekickicons",
);

export default fullSidekickicons;
