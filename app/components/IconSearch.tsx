"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import icons from "../icons/allicons";
import { useState } from "react";
import { matchSorter } from "match-sorter";

export default function IconSearch({}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = matchSorter(icons, searchQuery, {
    keys: [(icon) => icon.kebabName.replace(/-/g, " "), "keywords"],
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="sr-only">
          Search
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search all icons..."
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {filteredIcons.map((fullHeroicon) => (
          <div
            key={fullHeroicon.kebabName}
            className="bg-slate-50 p-4 rounded-md flex flex-col items-center"
          >
            <fullHeroicon.outline24 className="w-5 h-5 text-slate-700" />
            <p
              className="text-slate-500 text-xs mt-2 max-w-full truncate"
              title={fullHeroicon.kebabName}
            >
              {fullHeroicon.kebabName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
