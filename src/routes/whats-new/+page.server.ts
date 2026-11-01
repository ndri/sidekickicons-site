import icons from "$lib/icons/allicons";
import type { HeroiconType } from "$lib/types";
import { iconHistory, listsAddedIcons, releases } from "$lib/util/releaseHistory";
import type { PageServerLoad } from "./$types";

// Releases that added more icons than this show a count instead of every icon
const maxTiles = 40;

export const load: PageServerLoad = () => {
  const onSite = (name: string) => icons.find((icon) => icon.kebabName === name);

  return {
    releases: releases.map((release) => {
      const added = release.added.map(onSite).filter((icon) => icon !== undefined);
      return {
        id: `${release.iconset}-${release.version}`.toLowerCase(),
        iconset: release.iconset,
        version: release.version,
        date: release.date,
        url: release.url,
        first: release.first,
        // The added icons are shown as icons, so the line listing them is left out
        notes: release.notes.filter((note) => !listsAddedIcons(note.text)),
        addedCount: added.length,
        added:
          added.length <= maxTiles
            ? added.map((icon) => ({ kebabName: icon.kebabName, svg: icon.outline24 }))
            : [],
        renamed: release.renamed,
        newStyles: (Object.keys(release.newStyles) as HeroiconType[]).map((type) => ({
          type,
          names: release.newStyles[type]!,
        })),
        redrawn: release.changed
          .filter((change) => change.visible && onSite(change.name))
          .map((change) => {
            const event = iconHistory(onSite(change.name)!).find(
              (event) =>
                event.kind === "changed" &&
                event.release.iconset === release.iconset &&
                event.release.version === release.version,
            );
            return {
              name: change.name,
              drawings: event?.kind === "changed" ? event.drawings : [],
            };
          }),
        updated: release.changed
          .filter((change) => !change.visible)
          .map((change) => change.name),
      };
    }),
  };
};
