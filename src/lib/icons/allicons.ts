import sidekickicons from "./sidekickicons";
import heroicons from "./heroicons";
import { sortedByStringKey } from "../util/util";

const allIcons = sidekickicons.concat(heroicons);
const sortedAllIcons = sortedByStringKey(allIcons, "kebabName");

export default sortedAllIcons;
