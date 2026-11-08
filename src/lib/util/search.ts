import { matchSorter, rankings } from "match-sorter";
import type { FullHeroicon } from "../types";
import { dashesToSpaces } from "./util";

// British spellings and their American ones. Queries, icon names and keywords are all
// compared in American spelling, so "favourite" and "favorite" find the same icons, whichever
// spelling the keywords use.
const britishToAmerican: [RegExp, string][] = [
  // colour, favourite, harbour, behaviour, but not hour, four, tour or your
  [
    /\b(fav|col|harb|neighb|lab|hon|hum|flav|behavi|arm|rum|vap|endeav|savi|sav|parl)our/g,
    "$1or",
  ],
  // centre, metre, theatre
  [/\b((?:kilo|centi|milli)?met|(?:milli)?lit|cent|theat|fib)re(s)?\b/g, "$1er$2"],
  // cancelled, travelling, labelled
  [
    /\b(cancel|travel|label|model|signal|fuel|level|total|dial|channel|tunnel|jewel|pedal|panel|funnel)l(ed|ing|er|ers)\b/g,
    "$1$2",
  ],
  // organise, customisation, but not promise, exercise or analysis
  [
    /\b(organ|recogn|author|custom|personal|optim|synchron|minim|maxim|visual|categor|priorit|real|util|summar|final|initial|normal|sanit|standard|local|global|central|capital|critic)is(e|ed|es|er|ers|ing|ation|ations)\b/g,
    "$1iz$2",
  ],
  [/\banalys(e|ed|es|ing)\b/g, "analyz$1"],
  // catalogue, dialogue
  [/\b(catal|dial|anal|monol|prol|epil)ogue(s)?\b/g, "$1og$2"],
  // licence, defence
  [/\b(lic|def|off|pret)ence(s)?\b/g, "$1ense$2"],
  [/\bgrey(s|ed|ish)?\b/g, "gray$1"],
  [/\btyre(s)?\b/g, "tire$1"],
  [/\bprogramme(s)?\b/g, "program$1"],
  [/\b(enrol|fulfil)(s|ment|ments)?\b/g, "$1l$2"],
  [/\bjewellery\b/g, "jewelry"],
  [/\baluminium\b/g, "aluminum"],
  [/\baeroplane(s)?\b/g, "airplane$1"],
  [/\bmould(s|y)?\b/g, "mold$1"],
  [/\bplough(s)?\b/g, "plow$1"],
  [/\bpyjama(s)?\b/g, "pajama$1"],
  [/\bcosy\b/g, "cozy"],
  [/\bdraught(s)?\b/g, "draft$1"],
  [/\bmaths\b/g, "math"],
];

export function americanSpelling(text: string) {
  return britishToAmerican.reduce(
    (spelled, [british, american]) => spelled.replace(british, american),
    text.toLowerCase(),
  );
}

// An icon's name and keywords in American spelling, worked out once per icon
const searchTerms = new WeakMap<FullHeroicon, { name: string; keywords: string[] }>();
function termsFor(icon: FullHeroicon) {
  let terms = searchTerms.get(icon);
  if (!terms) {
    terms = {
      name: americanSpelling(dashesToSpaces(icon.kebabName)),
      keywords: icon.keywords.map(americanSpelling),
    };
    searchTerms.set(icon, terms);
  }
  return terms;
}

// Icons matching a search by name or keyword, in three groups: direct matches on the name
// or a keyword (exact, starts with, contains), then loose matches on the name (acronyms and
// letters in order, like "trsh" for trash), then loose matches on a keyword only. Within a
// group, closer matches come first and name matches beat keyword matches.
export function searchIcons(list: readonly FullHeroicon[], query: string) {
  const value = americanSpelling(dashesToSpaces(query));
  const nameMatches = (icon: FullHeroicon) =>
    matchSorter([termsFor(icon).name], value).length > 0;
  const group = ({ item, rank }: { item: FullHeroicon; rank: number }) =>
    rank >= rankings.CONTAINS ? 0 : nameMatches(item) ? 1 : 2;

  return matchSorter(list, value, {
    keys: [(icon) => termsFor(icon).name, (icon) => termsFor(icon).keywords],
    sorter: (ranked) => {
      const groups = new Map(ranked.map((match) => [match, group(match)]));
      return ranked.sort(
        (a, b) =>
          groups.get(a)! - groups.get(b)! ||
          b.rank - a.rank ||
          a.keyIndex - b.keyIndex ||
          String(a.rankedValue).localeCompare(String(b.rankedValue)),
      );
    },
  });
}
