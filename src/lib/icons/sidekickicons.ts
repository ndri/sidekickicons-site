import iconData from "virtual:icon-data";
import { generateFullHeroicons } from "../util/icons";
import { sidekickiconKeywords } from "../data/keywords";

const fullSidekickicons = generateFullHeroicons(
  iconData.Sidekickicons,
  sidekickiconKeywords,
  "Sidekickicons",
);

export default fullSidekickicons;
