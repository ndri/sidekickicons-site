"use client";

import {
  DocumentDuplicateIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { FullHeroicon, HeroiconType, IconSize } from "../types";
import { useState } from "react";
import IconDetailsDialog from "./IconDetailsDialog";
import { allIconSizeClasses } from "../util/constants";

export default function IconCard({
  type,
  fullHeroicon,
  size,
}: {
  type: HeroiconType;
  fullHeroicon: FullHeroicon;
  size: IconSize;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const iconClasses = allIconSizeClasses[size][type];
  const Icon = fullHeroicon[type];
  const name = fullHeroicon.kebabName;

  return (
    <div className="group grid grid-cols-1 grid-rows-1 rounded-md bg-slate-50 p-4">
      <div className="col-span-full row-span-full flex flex-col items-center justify-center group-hover:opacity-25">
        <Icon className={`${iconClasses} text-slate-700`} />
        <p className="mt-2 max-w-full truncate text-xs text-slate-500" title={name}>
          {name}
        </p>
      </div>
      <div className="invisible z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col justify-center gap-1 group-hover:visible">
        <button className="flex justify-center gap-1 rounded bg-white px-2 py-1 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
          <DocumentDuplicateIcon className="h-5 w-5 text-slate-400" />
          Copy
        </button>
        <button
          className="flex justify-center gap-1 rounded bg-white px-2 py-1 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
          onClick={() => setShowDialog(true)}
        >
          <InformationCircleIcon className="h-5 w-5 text-slate-400" />
          Info
        </button>
      </div>
      <IconDetailsDialog
        open={showDialog}
        setOpen={setShowDialog}
        fullHeroicon={fullHeroicon}
        type={type}
      />
    </div>
  );
}
