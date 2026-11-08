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

export type SearchGroup = "direct" | "name" | "keyword";

// Titles for the groups, shown when a search has more than one
export const searchGroupTitles: Record<SearchGroup, string> = {
  direct: "Best matches",
  name: "Similar names",
  keyword: "Similar keywords",
};

const groupOrder: SearchGroup[] = ["direct", "name", "keyword"];

// Icons matching a search by name or keyword, in three groups: direct matches on the name
// or a keyword (exact, starts with, contains), then loose matches on the name (acronyms and
// letters in order, like "trsh" for trash), then loose matches on a keyword only. Within a
// group, closer matches come first and name matches beat keyword matches.
export function searchIconsGrouped(list: readonly FullHeroicon[], query: string) {
  const value = americanSpelling(dashesToSpaces(query));
  const nameMatches = (icon: FullHeroicon) =>
    matchSorter([termsFor(icon).name], value).length > 0;
  const groups = new Map<FullHeroicon, SearchGroup>();

  const icons = matchSorter(list, value, {
    keys: [(icon) => termsFor(icon).name, (icon) => termsFor(icon).keywords],
    sorter: (ranked) => {
      for (const { item, rank } of ranked)
        groups.set(
          item,
          rank >= rankings.CONTAINS ? "direct" : nameMatches(item) ? "name" : "keyword",
        );
      const order = (icon: FullHeroicon) => groupOrder.indexOf(groups.get(icon)!);
      return ranked.sort(
        (a, b) =>
          order(a.item) - order(b.item) ||
          b.rank - a.rank ||
          a.keyIndex - b.keyIndex ||
          String(a.rankedValue).localeCompare(String(b.rankedValue)),
      );
    },
  });
  return icons.map((icon) => ({ icon, group: groups.get(icon)! }));
}

export const searchIcons = (list: readonly FullHeroicon[], query: string) =>
  searchIconsGrouped(list, query).map(({ icon }) => icon);

export type Range = [start: number, end: number];

// The parts of a name or keyword to highlight for a search: the whole search where it
// appears, else the initials it spells, else (when `loose`) its letters in order. Dashes count
// as spaces, and a British spelling also tries its American one.
export function matchRanges(
  text: string,
  query: string,
  { loose = true } = {},
): Range[] {
  const haystack = dashesToSpaces(text).toLowerCase();
  const raw = dashesToSpaces(query).toLowerCase().trim();
  if (!raw) return [];
  const candidates = [...new Set([raw, americanSpelling(raw)])];

  for (const candidate of candidates) {
    const start = haystack.indexOf(candidate);
    if (start >= 0) return [[start, start + candidate.length]];
  }

  const letters = raw.replace(/ /g, "");
  const wordStarts = [...haystack.matchAll(/\S+/g)].map((word) => word.index!);
  if (letters.length > 1 && letters.length <= wordStarts.length) {
    const initials = wordStarts.map((i) => haystack[i]).join("");
    const at = initials.indexOf(letters);
    if (at >= 0)
      return wordStarts.slice(at, at + letters.length).map((i): Range => [i, i + 1]);
  }

  if (!loose) return [];
  for (const candidate of candidates) {
    const ranges: Range[] = [];
    let from = 0;
    for (const letter of candidate.replace(/ /g, "")) {
      const i = haystack.indexOf(letter, from);
      if (i < 0) break;
      const last = ranges.at(-1);
      if (last && last[1] === i) last[1] = i + 1;
      else ranges.push([i, i + 1]);
      from = i + 1;
    }
    if (
      from > 0 &&
      ranges.reduce((sum, [s, e]) => sum + e - s, 0) ===
        candidate.replace(/ /g, "").length
    )
      return ranges;
  }
  return [];
}

// Highlights for an icon's name. Loose letters only show when the icon was found by a loose
// match on its name, not in the name of an icon found through a keyword.
export const nameMatchRanges = (name: string, query: string, group?: SearchGroup) =>
  matchRanges(name, query, { loose: group === "name" });

// Highlights for each of an icon's keywords: every keyword the search appears in, or, for an
// icon found by a loose keyword match, the letters of the first keyword that matches loosely
export function keywordMatchRanges(
  keywords: readonly string[],
  query: string,
  group?: SearchGroup,
) {
  const direct = keywords.map((keyword) =>
    matchRanges(keyword, query, { loose: false }),
  );
  if (group !== "keyword" || direct.some((ranges) => ranges.length)) return direct;
  let found = false;
  return keywords.map((keyword) => {
    if (found) return [];
    const ranges = matchRanges(keyword, query);
    found = ranges.length > 0;
    return ranges;
  });
}
